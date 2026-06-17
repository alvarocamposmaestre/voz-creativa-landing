# 🧠 Navigator Map & Bootloader for ProjectPilot Agents

> **Welcome, Agent.** You are bound by the **BLAST 4.0 (The Hybrid Engram Harness)** protocol. This file is your navigator bootloader. Follow these instructions strictly before taking any actions in this codebase.

---

## 🟢 1. Booting Your Context (Mandatory JIT Steps)

Whenever you begin a new conversation, or are assigned a new task in this repository:

1.  **Initialize/Query Local Brain:** Sync your context with the project's persistent local memory. Run a keyword query related to your active feature to load past micro-decisions and observations:
    ```bash
    node tools/memory_manager.js query "<keyword_related_to_task>"
    ```
2.  **Verify Active State & Phase DAG:** Read `progress/state.json` or run the PowerShell/Bash status helper:
    *   **PowerShell:** `powershell -ExecutionPolicy Bypass -File tools/shell/pilot.ps1 status`
    *   **Bash:** `./tools/shell/pilot.sh status`
3.  **Read the Sovereign Rules:** You **MUST** read and obey [CONSTITUTION.md](file:///c:/Users/alvar/Documents/Proyectos%20IA/ProjectPilot/CONSTITUTION.md) before making any modifications.
4.  **Confirm Active Feature Backlog:** Read [feature_list.json](file:///c:/Users/alvar/Documents/Proyectos%20IA/ProjectPilot/feature_list.json). You are restricted to working on the SINGLE feature marked as `"status": "in_progress"`.

---

## 🗺️ 2. Repository Architecture Map

| Path | Content | When to Read |
| :--- | :--- | :--- |
| `AGENTS.md` | Navigator Map & Bootloader | First step for any agent session |
| `CONSTITUTION.md` | Core Sovereign & Security Rules | **Mandatory** before any action |
| `BLAST.md` | Upgraded BLAST 4.0 Core Protocol | To understand the phase gates and roles |
| `feature_list.json` | Feature backlog and state tracking | At the start of a session |
| `progress/state.json` | Enforceable Phase DAG state tracker | To check lock state and active phase |
| `specs/<feature>/` | EARS requirements, design trade-offs, and result contracts | Before writing any code |
| `tools/` | Database managers and operational helpers | To interact with project memory |
| `tools/shell/` | Cross-platform terminal status/gate hooks | To verify quality gates and state |
| `CHECKPOINTS.md` | Quality standards for "Done" | Before transitioning phases |

---

## 🛡️ 3. Sovereign Hard Rules (Non-Negotiable)

*   **Rule of Spec First (SDD):** No code changes without an approved specification folder under `specs/<feature>/`. Requirements **must** use EARS notation (*When, If, The system shall...*).
*   **Strict Phase DAG Locking:** You are strictly forbidden from writing code for a phase until `progress/state.json` is signed-off and unlocked for that phase.
*   **Surgical Implementations:** Touch only what you must. Write the absolute minimum code to solve the problem (Simplicity First).
*   **Zero Secrets:** Never hardcode passwords, API keys, or security tokens. Source all credentials from the `.env` file.
*   **Continuous Local Logging:** Whenever you make a significant design decision, discover a bug, or solve an error, record it in local memory:
    ```bash
    node tools/memory_manager.js store --type "decision" --title "<Title>" --content "<Details>"
    ```

---

## ⚡ 4. The BLAST 4.0 Operational Loop

1.  **B - Blueprint:** Query memory → Run discovery → Create `requirements.md` in EARS syntax + `design.md` → Wait for Human Sign-off.
2.  **L - Link:** Audit `.env` and verify third-party connections in safe environments.
3.  **A - Architect:** Build tests matching EARS IDs → Incrementally implement code -> Auditor runs gate check:
    ```bash
    powershell -ExecutionPolicy Bypass -File tools/shell/pilot.ps1 gate
    ```
4.  **S - Stylize:** Format output payloads beautifully using CSS / brand guidelines.
5.  **T - Trigger:** Upload generic learnings to Pinecone global memory → End local session → Reset lock.

---
*Follow the map. Respect the harness. Ensure deterministic excellence.*
