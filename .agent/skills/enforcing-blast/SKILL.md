---
name: enforcing-blast
description: Orchestrates the B.L.A.S.T. 2.0 protocol (Blueprint, Link, Architect, Stylize, Trigger). Use this at the start of any task or project to ensure structured, data-first development.
---

# B.L.A.S.T. 2.0 Protocol

This skill ensures you follow the 5 phases of structured automation.

## When to use this skill
- At the very beginning of a new project.
- When starting a major new feature.

## Workflow

### 🟢 Phase 1: Blueprint
Ask the 6 "Power Questions":
1. **North Star**: Goal?
2. **Aesthetic & Persona**: Style & User? (Consult `brand-identity` skill).
3. **Integrations**: MCPs needed? (Check `mcp_registry.json` in ProjectPilot).
4. **Source of Truth**: Data location & Schema?
5. **Resilience**: Failure tolerance? (Consult `handling-errors` skill).
6. **Delivery Payload**: Final destination?

### ⚡ Phase 2: Link
Validate only the required MCPs. Build handshake scripts.

### ⚙️ Phase 3: Architect
Use `writing-plans` skill for TDD planning. Build Layer 1 (SOPs) and Layer 3 (Tools).

### ✨ Phase 4: Stylize
Apply `brand-identity` and `ui-ux-intelligence` tokens.

### 🛰️ Phase 5: Trigger
Deploy and finalize Maintenance Log in `claude.md`.

## Instructions
- Do NOT skip the Discovery phase.
- Always sign-off the "Data Schema" before coding.
- Respect the **Just-in-Time Validation** for MCPs.

## Resources
- [Full BLAST 2.0 Protocol](../../../BLAST.md)
