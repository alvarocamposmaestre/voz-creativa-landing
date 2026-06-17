---
name: using-superpowers
description: Orchestrates the Superpowers methodology. Use this skill at the beginning of any project or significant task to ensure the agent follows the Spec-Plan-Exec-Verify cycle.
---

# Using Superpowers

This is the orchestrator skill. It ensures you are working systematically.

## When to use this skill
- At the start of a new project.
- When beginning a new feature or complex bug fix.
- Whenever you feel "lost" in the task and need to reset your workflow.

## Workflow

1.  **Announce**: Start your response with "I'm using Superpowers ⚡".
2.  **State Check**: Determine where you are in the cycle:
    - No clear spec? 👉 Use `brainstorming`.
    - Spec approved but no technical tasks? 👉 Use `writing-plans`.
    - Plan ready but not implemented? 👉 Use `executing-plans`.
    - Task done but not verified? 👉 Use `verifying-work`.
3.  **Load SOP**: Read `architecture/superpowers-methodology.md` if you need a refresher on the principles.

## Instructions
- Always prioritize **Brainstorming** before writing any code.
- Ensure all plans follow **TDD** (Test-Driven Development).
- Never skip the **Verification** phase.

## Resources
- [Superpowers Methodology SOP](../../../architecture/superpowers-methodology.md)
