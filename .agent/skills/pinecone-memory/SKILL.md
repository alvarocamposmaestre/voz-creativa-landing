---
name: pinecone-memory
description: Provides infinite memory and knowledge retrieval capabilities using a hybrid memory model: project-local JSON storage for session tracking, and global semantic Pinecone vector database for cross-project learnings.
---

# 🧠 BLAST 4.0 Hybrid Memory System

ProjectPilot implements a **Hybrid Memory System** to maximize context retrieval efficiency, ensure offline reliability, and minimize LLM token overhead.

---

## 🗂️ The Memory Layer Division

```
                     ┌───────────────────────────────────┐
                     │     BLAST 4.0 Hybrid Memory       │
                     └─────────────────┬─────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
  ┌───────────────────────────┐                 ┌───────────────────────────┐
  │  Project-Local Memory     │                 │   Global Semantic Memory  │
  │  (Zero-Dependency JSON)   │                 │   (Pinecone Vector DB)    │
  ├───────────────────────────┤                 ├───────────────────────────┤
  │ - SQLite-style JSON Brain │                 │ - Multi-lingual Vector DB │
  │ - Session tracking & logs │                 │ - Cross-project patterns  │
  │ - Micro-decisions/Errors  │                 │ - High-level architectural│
  │ - Strict keyword search   │                 │   templates & frameworks  │
  │ - Works offline           │                 │ - Cloud semantic search   │
  └───────────────────────────┘                 └───────────────────────────┘
```

---

## 🟢 1. Project-Local Memory (`memory_manager.js`)

All project-specific context, active sessions, and local micro-decisions reside in the local directory under `.agent/memory.json`. Any agent can access and write to this database using standard Node.js command-line commands.

### Available CLI Commands

Ensure to run these commands in the terminal and parse their clean JSON outputs.

*   **Initialize database:**
    ```bash
    node tools/memory_manager.js init
    ```
*   **Start a session:**
    ```bash
    node tools/memory_manager.js session-start --project "<project_name>"
    ```
*   **End a session:**
    ```bash
    node tools/memory_manager.js session-end --session-id "<uuid>" --summary "<summary>" --status "success"
    ```
*   **Store observation (decision, blockage, finding, etc.):**
    ```bash
    node tools/memory_manager.js store --session-id "<uuid>" --type "decision" --title "Title" --content "Details" --tags "db,auth"
    ```
*   **Query local observations (case-insensitive keyword/relevance match):**
    ```bash
    node tools/memory_manager.js query "<keyword>" --limit 5
    ```
*   **List recent memories:**
    ```bash
    node tools/memory_manager.js list --type "decision" --limit 10
    ```

---

## 🔵 2. Global Semantic Memory (Pinecone DB)

High-level patterns, architectural precedents, and cross-project knowledge are stored in Pinecone to be shared globally between all developer work.

### Context & Security
*   **Security Invariant:** Never hardcode Pinecone API keys or host URLs. Always source `PINECONE_API_KEY`, `PINECONE_INDEX_HOST`, and `PINECONE_INDEX_NAME` from the local `.env` file.
*   **Model:** `multilingual-e5-large` (1024 dimensions, cosine similarity).

### Standard Retrieval and Upsert Flow

*   **Searching Global Memory:**
    ```bash
    # Step 1: Embed query
    export EMBEDDING=$(curl -s -X POST "https://api.pinecone.io/embed" \
      -H "Api-Key: $PINECONE_API_KEY" \
      -H "Content-Type: application/json" \
      -H "X-Pinecone-API-Version: 2025-01" \
      -d '{"model":"multilingual-e5-large","inputs":[{"text":"YOUR QUERY HERE"}],"parameters":{"input_type":"query","truncate":"END"}}' \
      | node -e "const fs = require('fs'); const data = JSON.parse(fs.readFileSync(0, 'utf-8')); console.log(JSON.stringify(data.data[0].values));")

    # Step 2: Query Pinecone
    curl -s -X POST "https://$PINECONE_INDEX_HOST/query" \
      -H "Api-Key: $PINECONE_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"vector\":$EMBEDDING,\"topK\":5,\"includeMetadata\":true}" | node -e "const fs = require('fs'); console.log(JSON.stringify(JSON.parse(fs.readFileSync(0, 'utf-8')), null, 2));"
    ```

*   **Upserting Global Learning (Phase 5):**
    ```bash
    # Step 1: Embed passage
    export EMBEDDING=$(curl -s -X POST "https://api.pinecone.io/embed" \
      -H "Api-Key: $PINECONE_API_KEY" \
      -H "Content-Type: application/json" \
      -H "X-Pinecone-API-Version: 2025-01" \
      -d '{"model":"multilingual-e5-large","inputs":[{"text":"TEXT TO STORE"}],"parameters":{"input_type":"passage","truncate":"END"}}' \
      | node -e "const fs = require('fs'); const data = JSON.parse(fs.readFileSync(0, 'utf-8')); console.log(JSON.stringify(data.data[0].values));")

    # Step 2: Upsert
    curl -s -X POST "https://$PINECONE_INDEX_HOST/vectors/upsert" \
      -H "Api-Key: $PINECONE_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"vectors\":[{\"id\":\"mem_$(date +%s)\",\"values\":$EMBEDDING,\"metadata\":{\"text\":\"TEXT TO STORE\",\"timestamp\":$(date +%s),\"source\":\"projectpilot\"}}]}"
    ```

---

## ⚠️ Memory Rules

1.  **Strict Isolation:** Local session logs MUST remain in the local `.agent/memory.json`. Do not upload raw local logs to Pinecone to prevent noise.
2.  **Synthesis Rule:** When completing a feature, the Auditor synthesizes the core learnings (e.g. "What worked, how we solved X") into a single, high-quality markdown summary and uploads that to Pinecone.
3.  **Privacy Safeguard:** Under no circumstances should database credentials, API keys, passwords, or personal data be uploaded to Pinecone or stored in the local memory. Keep all credentials in the `.env` file.
