#!/usr/bin/env python3
"""
memory_manager.py — Local Persistent Brain for ProjectPilot
Provides SQLite + FTS5 full-text search, session logs, and agent-agnostic command line interface.
"""

import os
import sys
import sqlite3
import argparse
import json
import uuid
from datetime import datetime

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".agent")
DB_PATH = os.path.join(DB_DIR, "memory.db")

def get_db_connection():
    """Establishes connection to the local database, ensuring parents exist."""
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database tables (sessions, observations) and FTS5 indexing."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON;")
    
    # 2. Create sessions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        project TEXT NOT NULL,
        started_at TEXT NOT NULL,
        ended_at TEXT,
        summary TEXT,
        status TEXT
    );
    """)
    
    # 3. Create observations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS observations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        type TEXT NOT NULL, -- e.g., 'decision', 'blockage', 'finding', 'requirement'
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        tags TEXT,
        FOREIGN KEY(session_id) REFERENCES sessions(id) ON DELETE SET NULL
    );
    """)
    
    # 4. Create FTS5 virtual table for lightning-fast indexing if available
    try:
        cursor.execute("""
        CREATE VIRTUAL TABLE IF NOT EXISTS observations_fts USING fts5(
            title,
            content,
            content='observations',
            content_rowid='id'
        );
        """)
        # Triggers to keep FTS table in sync
        cursor.execute("""
        CREATE TRIGGER IF NOT EXISTS observations_ai AFTER INSERT ON observations BEGIN
            INSERT INTO observations_fts(rowid, title, content) VALUES (new.id, new.title, new.content);
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER IF NOT EXISTS observations_ad AFTER DELETE ON observations BEGIN
            INSERT INTO observations_fts(observations_fts, rowid, title, content) VALUES('delete', old.id, old.title, old.content);
        END;
        """)
        cursor.execute("""
        CREATE TRIGGER IF NOT EXISTS observations_au AFTER UPDATE ON observations BEGIN
            INSERT INTO observations_fts(observations_fts, rowid, title, content) VALUES('delete', old.id, old.title, old.content);
            INSERT INTO observations_fts(rowid, title, content) VALUES (new.id, new.title, new.content);
        END;
        """)
        has_fts = True
    except sqlite3.OperationalError:
        # FTS5 not available in this Python SQLite package, fall back to standard text matching
        has_fts = False
        
    conn.commit()
    conn.close()
    return has_fts

def start_session(project):
    """Starts a new session, returning its unique UUID."""
    session_id = str(uuid.uuid4())
    started_at = datetime.utcnow().isoformat() + "Z"
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (id, project, started_at, status) VALUES (?, ?, ?, ?)",
        (session_id, project, started_at, "in_progress")
    )
    conn.commit()
    conn.close()
    return {"session_id": session_id, "started_at": started_at, "status": "in_progress"}

def end_session(session_id, summary, status):
    """Ends an existing session, recording summary and exit status."""
    ended_at = datetime.utcnow().isoformat() + "Z"
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE sessions SET ended_at = ?, summary = ?, status = ? WHERE id = ?",
        (ended_at, summary, status, session_id)
    )
    conn.commit()
    
    # Get details
    cursor.execute("SELECT * FROM sessions WHERE id = ?", (session_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return dict(row)
    return None

def store_observation(session_id, obs_type, title, content, tags=""):
    """Stores a fact or decision in memory."""
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO observations (session_id, type, title, content, timestamp, tags) VALUES (?, ?, ?, ?, ?, ?)",
        (session_id, obs_type, title, content, timestamp, tags)
    )
    obs_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "id": obs_id,
        "session_id": session_id,
        "type": obs_type,
        "title": title,
        "content": content,
        "timestamp": timestamp,
        "tags": tags
    }

def query_memory(search_term, limit=10):
    """Queries memories using FTS5 full-text search with a fallback to standard LIKE."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    results = []
    try:
        # Try FTS5 fast search
        cursor.execute("""
            SELECT o.id, o.session_id, o.type, o.title, o.content, o.timestamp, o.tags
            FROM observations o
            JOIN observations_fts f ON o.id = f.rowid
            WHERE observations_fts MATCH ?
            ORDER BY rank LIMIT ?
        """, (search_term, limit))
        results = [dict(row) for row in cursor.fetchall()]
    except sqlite3.OperationalError:
        # Fall back to standard LIKE search across title and content
        like_query = f"%{search_term}%"
        cursor.execute("""
            SELECT id, session_id, type, title, content, timestamp, tags
            FROM observations
            WHERE title LIKE ? OR content LIKE ? OR tags LIKE ?
            ORDER BY timestamp DESC LIMIT ?
        """, (like_query, like_query, like_query, limit))
        results = [dict(row) for row in cursor.fetchall()]
        
    conn.close()
    return results

def list_memories(obs_type=None, limit=20):
    """Lists all memories, optionally filtered by type."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if obs_type:
        cursor.execute(
            "SELECT * FROM observations WHERE type = ? ORDER BY timestamp DESC LIMIT ?",
            (obs_type, limit)
        )
    else:
        cursor.execute(
            "SELECT * FROM observations ORDER BY timestamp DESC LIMIT ?",
            (limit,)
        )
        
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results

def delete_memory(obs_id):
    """Deletes an observation by ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM observations WHERE id = ?", (obs_id,))
    conn.commit()
    conn.close()
    return {"status": "deleted", "id": obs_id}

def main():
    parser = argparse.ArgumentParser(description="ProjectPilot Local Memory Manager (Engram-inspired SQLite FTS5 Brain)")
    subparsers = parser.add_subparsers(dest="command", help="Available memory operations")
    
    # Init DB
    subparsers.add_parser("init", help="Initialize SQLite schema and directories")
    
    # Session Start
    start_parser = subparsers.add_parser("session-start", help="Start a new session")
    start_parser.add_argument("--project", required=True, help="Project name")
    
    # Session End
    end_parser = subparsers.add_parser("session-end", help="Close an active session")
    end_parser.add_argument("--session-id", required=True, help="UUID of the session")
    end_parser.add_argument("--summary", required=True, help="Summary of work completed")
    end_parser.add_argument("--status", choices=["success", "failed", "aborted"], default="success", help="Session completion status")
    
    # Store Observation
    store_parser = subparsers.add_parser("store", help="Store a decision or observation")
    store_parser.add_argument("--session-id", default=None, help="Associated session UUID (optional)")
    store_parser.add_argument("--type", required=True, choices=["decision", "blockage", "finding", "requirement", "general"], help="Type of observation")
    store_parser.add_argument("--title", required=True, help="Short summary title")
    store_parser.add_argument("--content", required=True, help="Detailed observation content")
    store_parser.add_argument("--tags", default="", help="Comma separated tags")
    
    # Query Memory
    query_parser = subparsers.add_parser("query", help="Query memories with full-text search")
    query_parser.add_argument("term", help="Search keyword or term")
    query_parser.add_argument("--limit", type=int, default=10, help="Maximum results to return")
    
    # List Memories
    list_parser = subparsers.add_parser("list", help="List recent observations")
    list_parser.add_argument("--type", help="Filter by observation type")
    list_parser.add_argument("--limit", type=int, default=20, help="Max items to list")
    
    # Delete Memory
    delete_parser = subparsers.add_parser("delete", help="Delete a specific memory by ID")
    delete_parser.add_argument("--id", type=int, required=True, help="Database ID of observation")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
        
    try:
        if args.command == "init":
            has_fts = init_db()
            print(json.dumps({"status": "initialized", "fts_enabled": has_fts, "db_path": DB_PATH}, indent=2))
            
        elif args.command == "session-start":
            res = start_session(args.project)
            print(json.dumps(res, indent=2))
            
        elif args.command == "session-end":
            res = end_session(args.session_id, args.summary, args.status)
            if res:
                print(json.dumps(res, indent=2))
            else:
                print(json.dumps({"error": f"Session {args.session_id} not found"}, indent=2))
                sys.exit(1)
                
        elif args.command == "store":
            res = store_observation(args.session_id, args.type, args.title, args.content, args.tags)
            print(json.dumps(res, indent=2))
            
        elif args.command == "query":
            res = query_memory(args.term, args.limit)
            print(json.dumps(res, indent=2))
            
        elif args.command == "list":
            res = list_memories(args.type, args.limit)
            print(json.dumps(res, indent=2))
            
        elif args.command == "delete":
            res = delete_memory(args.id)
            print(json.dumps(res, indent=2))
            
    except Exception as e:
        print(json.dumps({"error": str(e)}, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
