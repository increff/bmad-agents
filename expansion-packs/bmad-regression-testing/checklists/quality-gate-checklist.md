---
id: quality-gate-checklist
name: Quality Gate Checklist
description: Enforces quality gates and coverage requirements for regression testing.
---

# Quality Gate Checklist

## Gate Decision Criteria
- **PASS**: All P0 tests pass, no high-severity issues found.
- **CONCERNS**: Non-blocking issues are present; these should be tracked for future sprints.
- **FAIL**: One or more P0 tests fail, or high-severity issues are present.
- **WAIVED**: Known issues are explicitly accepted by the project owner or lead.

## Coverage Requirements

### P0 (Critical)
- **Unit Coverage**: >90%
- **Integration Coverage**: >80%
- **Paths Covered**: All critical execution paths.

### P1 (High)
- **Unit Coverage**: >80%
- **Integration Coverage**: >60%
- **Paths Covered**: Main happy paths and major error conditions.

### P2 (Medium)
- **Unit Coverage**: >60%
- **Integration Coverage**: >40%
- **Paths Covered**: Smoke tests for primary functionality.

### P3 (Low)
- **Coverage**: Best effort; manual testing is acceptable.
