---
name: writing-plans
description: Converts specifications into detailed implementation plans. Use this after the brainstorming phase is complete and approved.
---

# Writing Implementation Plans

A good plan makes the implementation trivial. Focus on TDD and atomic tasks.

## When to use this skill
- After the specification is approved in the `brainstorming` phase.
- Before starting any coding.

## Workflow

1.  **Draft Tasks**: Break down the implementation into tasks that take 2-5 minutes.
2.  **Apply TDD**: For each task, define how it will be tested (e.g., "Create test for X, run test, see it fail, implement X, run test, see it pass").
3.  **Principles**:
    - **YAGNI**: Don't add features not in the spec.
    - **DRY**: Reuse existing logic/components.
4.  **Review**: Show the plan to the user for a final "Go" signal.

## Instructions
- Use a markdown checklist to track tasks.
- Keep tasks independent whenever possible.
- Update `task_plan.md` with the new detailed steps.

## Resources
- [Superpowers Methodology SOP](../../../architecture/superpowers-methodology.md)
