---
name: handling-errors
description: Builds resilient applications with robust error handling strategies. Provides patterns for Retry, Circuit Breaker, and Async error handling to ensure reliability, fault tolerance, and excellent debugging experiences.
---

# Troubleshooting & Error Handling

Implement resilience patterns to ensure the system can recover from transient failures and provide meaningful feedback when terminal errors occur.

## When to use this skill
- When designing APIs or external service integrations.
- When implementing critical business logic that must be fault-tolerant.
- During debugging sessions to improve error visibility.
- To implement automated recovery (Retries, Fallbacks).

## Core Patterns

### 1. Retry with Exponential Backoff
Use this for transient failures (e.g., network timeouts, rate limits).
- **Strategy**: Wait for $2^n$ seconds between retries.
- **Implementation**: Wrap the tool call in a try/catch loop with a sleep timer.

### 2. Circuit Breaker
Use this to prevent "cascading failures" in distributed systems.
- **States**: 
  - `CLOSED`: Normal operation.
  - `OPEN`: Failures exceeded threshold; stop calling the service.
  - `HALF_OPEN`: Test the service with a single request.

### 3. Result & Option Types (Functional Error Handling)
Avoid throwing exceptions for "expected" failures. Return an object instead:
```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

## Workflow: The "Safe Call" Pattern

1.  **Analyze**: Is the failure transient (retryable) or permanent (invalid input)?
2.  **Execute**: Wrap the operation in a `safe_execute` wrapper.
3.  **Log**: Ensure the error is logged with full context in `progress.md`.
4.  **Fallback**: If all retries fail, provide a graceful degradation path (e.g., use cached data).

## Instructions
- Never leave a `catch` block empty.
- Always include the original error message in your custom exceptions.
- Prioritize **Circuit Breakers** when dealing with 3rd party MCPs or APIs.

## Resources
- [Superpowers Methodology SOP](../../../architecture/superpowers-methodology.md) (Self-Annealing section)
