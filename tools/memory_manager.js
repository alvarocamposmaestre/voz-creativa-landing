#!/usr/bin/env node
/**
 * memory_manager.js — Local Persistent Brain for ProjectPilot
 * Provides zero-dependency JSON-based persistent storage, session logs,
 * case-insensitive fuzzy/keyword search, and agent-agnostic CLI.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_DIR = path.join(__dirname, '..', '.agent');
const DB_PATH = path.join(DB_DIR, 'memory.json');

function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

function loadDb() {
  ensureDbDir();
  if (!fs.existsSync(DB_PATH)) {
    return { sessions: [], observations: [] };
  }
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data || '{"sessions": [], "observations": []}');
  } catch (error) {
    // If corruption occurs, backup and reset
    fs.writeFileSync(DB_PATH + '.bak', fs.readFileSync(DB_PATH));
    return { sessions: [], observations: [] };
  }
}

function saveDb(db) {
  ensureDbDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function initDb() {
  ensureDbDir();
  const db = loadDb();
  saveDb(db);
  return { status: 'initialized', db_path: DB_PATH, sessions_count: db.sessions.length, observations_count: db.observations.length };
}

function startSession(project) {
  const db = loadDb();
  const session = {
    id: crypto.randomUUID(),
    project,
    started_at: new Date().toISOString(),
    ended_at: null,
    summary: null,
    status: 'in_progress'
  };
  db.sessions.push(session);
  saveDb(db);
  return session;
}

function endSession(sessionId, summary, status) {
  const db = loadDb();
  const sessionIndex = db.sessions.findIndex(s => s.id === sessionId);
  if (sessionIndex === -1) return null;

  db.sessions[sessionIndex].ended_at = new Date().toISOString();
  db.sessions[sessionIndex].summary = summary;
  db.sessions[sessionIndex].status = status;
  
  saveDb(db);
  return db.sessions[sessionIndex];
}

function storeObservation(sessionId, type, title, content, tags = '') {
  const db = loadDb();
  const observation = {
    id: db.observations.length > 0 ? Math.max(...db.observations.map(o => o.id)) + 1 : 1,
    session_id: sessionId || null,
    type,
    title,
    content,
    timestamp: new Date().toISOString(),
    tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []
  };
  db.observations.push(observation);
  saveDb(db);
  return observation;
}

function queryMemory(searchTerm, limit = 10) {
  const db = loadDb();
  if (!searchTerm) return [];

  const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
  
  // Score and filter observations
  const scored = db.observations.map(obs => {
    let score = 0;
    const titleLower = obs.title.toLowerCase();
    const contentLower = obs.content.toLowerCase();
    const tagsLower = obs.tags.map(t => t.toLowerCase()).join(' ');

    terms.forEach(term => {
      // Direct exact match boosts
      if (titleLower.includes(term)) score += 10;
      if (contentLower.includes(term)) score += 5;
      if (tagsLower.includes(term)) score += 8;

      // Word boundary boosts
      const titleWords = titleLower.split(/\W+/);
      const contentWords = contentLower.split(/\W+/);
      
      if (titleWords.includes(term)) score += 15;
      if (contentWords.includes(term)) score += 7;
    });

    return { obs, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score || new Date(b.obs.timestamp) - new Date(a.obs.timestamp))
  .slice(0, limit)
  .map(item => item.obs);

  return scored;
}

function listMemories(type, limit = 20) {
  const db = loadDb();
  let observations = db.observations;
  
  if (type) {
    observations = observations.filter(o => o.type === type);
  }
  
  return observations
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}

function deleteMemory(id) {
  const db = loadDb();
  const initialLength = db.observations.length;
  db.observations = db.observations.filter(o => o.id !== id);
  
  if (db.observations.length === initialLength) {
    return null;
  }
  
  saveDb(db);
  return { status: 'deleted', id };
}

// CLI Dispatcher
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    printHelp();
    process.exit(1);
  }

  try {
    switch (command) {
      case 'init':
        console.log(JSON.stringify(initDb(), null, 2));
        break;

      case 'session-start': {
        const projArg = getArgValue(args, '--project');
        if (!projArg) {
          console.error(JSON.stringify({ error: 'Missing required argument: --project' }, null, 2));
          process.exit(1);
        }
        console.log(JSON.stringify(startSession(projArg), null, 2));
        break;
      }

      case 'session-end': {
        const idArg = getArgValue(args, '--session-id');
        const sumArg = getArgValue(args, '--summary');
        const statusArg = getArgValue(args, '--status') || 'success';
        if (!idArg || !sumArg) {
          console.error(JSON.stringify({ error: 'Missing required arguments: --session-id and --summary' }, null, 2));
          process.exit(1);
        }
        const res = endSession(idArg, sumArg, statusArg);
        if (!res) {
          console.error(JSON.stringify({ error: `Session ${idArg} not found` }, null, 2));
          process.exit(1);
        }
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'store': {
        const sessionArg = getArgValue(args, '--session-id');
        const typeArg = getArgValue(args, '--type');
        const titleArg = getArgValue(args, '--title');
        const contentArg = getArgValue(args, '--content');
        const tagsArg = getArgValue(args, '--tags') || '';
        
        if (!typeArg || !titleArg || !contentArg) {
          console.error(JSON.stringify({ error: 'Missing required arguments: --type, --title, --content' }, null, 2));
          process.exit(1);
        }
        
        console.log(JSON.stringify(storeObservation(sessionArg, typeArg, titleArg, contentArg, tagsArg), null, 2));
        break;
      }

      case 'query': {
        const term = args[1];
        const limitArg = parseInt(getArgValue(args, '--limit') || '10', 10);
        if (!term) {
          console.error(JSON.stringify({ error: 'Missing search term argument' }, null, 2));
          process.exit(1);
        }
        console.log(JSON.stringify(queryMemory(term, limitArg), null, 2));
        break;
      }

      case 'list': {
        const typeFilter = getArgValue(args, '--type');
        const limitVal = parseInt(getArgValue(args, '--limit') || '20', 10);
        console.log(JSON.stringify(listMemories(typeFilter, limitVal), null, 2));
        break;
      }

      case 'delete': {
        const idVal = parseInt(getArgValue(args, '--id'), 10);
        if (isNaN(idVal)) {
          console.error(JSON.stringify({ error: 'Missing or invalid required argument: --id' }, null, 2));
          process.exit(1);
        }
        const delRes = deleteMemory(idVal);
        if (!delRes) {
          console.error(JSON.stringify({ error: `Memory with ID ${idVal} not found` }, null, 2));
          process.exit(1);
        }
        console.log(JSON.stringify(delRes, null, 2));
        break;
      }

      default:
        console.error(JSON.stringify({ error: `Unknown command: ${command}` }, null, 2));
        printHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }, null, 2));
    process.exit(1);
  }
}

function getArgValue(args, flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

function printHelp() {
  console.error(`
ProjectPilot Local Memory Manager (Zero-Dependency CLI)
Usage:
  node tools/memory_manager.js <command> [options]

Commands:
  init                                                    Initialize memory store file
  session-start --project <name>                          Start a new session
  session-end --session-id <uuid> --summary <sum>         End session with summary
  store [--session-id <uuid>] --type <t> --title <t> \\
        --content <c> [--tags <tags>]                    Store a memory observation
  query <term> [--limit <n>]                              Query observations with indexing
  list [--type <type>] [--limit <n>]                      List recent memories
  delete --id <num>                                       Delete observation by ID
`);
}

main();
