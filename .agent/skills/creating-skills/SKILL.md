---
name: creating-skills
description: Expert developer tool for creating new Antigravity Skills. Use this to generate high-quality, predictable, and efficient .agent/skills/ directories following strict YAML and structural standards.
---

# Antigravity Skill Creator

This skill enables the agent to build new capabilities for the ProjectPilot library.

## When to use this skill
- When you need to formalize a new repetitive task into a "Skill".
- When the user asks to "build a skill for [Task]".

## Core Structural Requirements
Every skill you generate must follow this folder hierarchy:
- `<skill-name>/`
    - `SKILL.md` (Required: Main logic and instructions)
    - `scripts/` (Optional: Helper scripts)
    - `examples/` (Optional: Reference implementations)
    - `resources/` (Optional: Templates or assets)

## YAML Frontmatter Standards
The `SKILL.md` must start with YAML frontmatter:
- **name**: Gerund form (e.g., `testing-code`, `managing-databases`).
- **description**: Written in **third person**. Must include specific triggers.

## Writing Principles
- **Conciseness**: Focus on unique logic.
- **Progressive Disclosure**: Keep `SKILL.md` under 500 lines.
- **Forward Slashes**: Always use `/` for paths.
- **Degrees of Freedom**: Use Bullet Points (heuristics), Code Blocks (templates), or Bash Commands (low-freedom).

## Workflow: Plan-Validate-Execute
1.  **Draft**: Diseña la estructura del skill según los requisitos.
2.  **Validate**: Asegura que el nombre sea un gerundio y la jerarquía sea correcta.
3.  **Implement**: Crea los archivos **SIEMPRE** en la ruta global:
    `c:/Users/alvar/Documents/Proyectos IA/ProjectPilot/.agent/skills/`

## Resources
- [Skill Creator SOP](../../../architecture/antigravity-skill-creator.md)
