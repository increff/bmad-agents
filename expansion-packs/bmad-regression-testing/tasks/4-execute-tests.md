---
id: execute-tests
name: Optimize and Execute Tests
description: Executes tests efficiently with maximum coverage and minimal time investment.
---

# Task: Optimize and Execute Tests

## Objective
To execute the prioritized tests efficiently, maximizing coverage while minimizing execution time.

## Actions
1.  **Define Test Level Strategy**:
    -   **`irisx-algo`**: Differentiate between Unit, Integration, and Regression tests.
    -   **`irisx-config`**: Differentiate between SQL Unit, Integration, and Regression tests.
    -   **`ms-loadapis`**: Differentiate between Unit, Integration, and E2E tests.
2.  **Determine Execution Order**:
    -   Execute P0 tests first to fail fast on critical issues.
    -   Follow with P1, and then P2/P3 as time and scope permit.
3.  **Apply Optimization Techniques**:
    -   Utilize parallel test execution where possible.
    -   Mock external dependencies for unit and integration tests.
    -   Use test containers for database integration tests.
4.  **Delegate Execution**: The orchestrator will delegate the actual test execution to the expert agents based on the repository.

## Implementation Details
-   **Java Expert**: Executes `mvn test` commands with appropriate profiles or test group specifications.
-   **SQL Expert**: Executes `psql` commands to run validation, migration, and regression test scripts.
-   **Python Expert**: Executes `unittest` and `coverage.py` commands.
-   Each expert agent is responsible for capturing the results and reporting back to the orchestrator.
