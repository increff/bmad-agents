# Detailed Workflow: BMAD Regression Testing

This document provides a detailed breakdown of the automated regression testing workflow.

## Phase 1: Identify High-Risk Areas
-   **Objective**: To find the parts of the codebase that are most likely to break.
-   **Process**:
    1.  The orchestrator scans the file structure of all three repositories to identify core components.
    2.  It then reviews the `git log` for each repository to find recently changed files.
    3.  This information is combined to create a list of potentially high-risk areas.

## Phase 2: Assess Likelihood of Failure
-   **Objective**: To quantify the risk associated with each identified component.
-   **Process**:
    1.  The orchestrator delegates the risk assessment to the expert agents.
    2.  **Java Expert**: Analyzes code complexity and Maven dependencies for `irisx-algo`.
    3.  **SQL Expert**: Analyzes the complexity of SQL scripts and migrations in `irisx-config`.
    4.  **Python Expert**: Analyzes code complexity and dependencies in `ms-loadapis`.
    5.  Each component is assigned a risk score.

## Phase 3: Prioritize Test Cases
-   **Objective**: To create a smart test plan that focuses on the highest-risk areas first.
-   **Process**:
    1.  The orchestrator uses the risk scores to categorize tests into four priority levels: P0 (Critical), P1 (High), P2 (Medium), and P3 (Low).
    2.  This prioritization ensures that if there are critical failures, they are found as quickly as possible.

## Phase 4: Optimize and Execute Tests
-   **Objective**: To run the tests in the most efficient way.
-   **Process**:
    1.  The orchestrator creates a test execution plan based on the priority levels.
    2.  It then delegates the execution to the expert agents.
    3.  **Java Expert**: Runs JUnit tests using `mvn test`.
    4.  **SQL Expert**: Runs SQL validation and migration scripts using `psql`.
    5.  **Python Expert**: Runs `unittest` tests.
    6.  The agents run tests in parallel where possible to speed up the process.

## Phase 5: Iterate and Refine
-   **Objective**: To learn from the test results and continuously improve the process.
-   **Process**:
    1.  The expert agents collect and analyze the results, including test failures and coverage gaps.
    2.  This information is sent back to the orchestrator.
    3.  The orchestrator generates a final report that summarizes the results and provides actionable recommendations for improving code quality and test coverage.
    4.  The risk assessment and test priorities are updated for future runs.
