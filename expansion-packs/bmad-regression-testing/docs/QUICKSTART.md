# Quickstart Guide: BMAD Regression Testing

## Installation
1.  **Run the Installer**:
    ```bash
    npx bmad-method install
    ```
2.  **Select the Pack**: Choose the `BMAD Regression Testing` expansion pack from the list.
3.  **Configure Paths**: When prompted, provide the absolute local paths to your `irisx-algo`, `irisx-config`, and `ms-loadapis` repositories. The installer will save these to `expansion-packs/bmad-regression-testing/config.yaml`.

## Usage
The primary way to use this expansion pack is through the `/regression-test` command, which is handled by the Regression Test Orchestrator.

### Running the Full Workflow
To run the entire regression testing workflow, simply execute the following command in your IDE:
```
/regression-test
```
This will trigger the five-step process:
1.  Identify High-Risk Areas
2.  Assess Likelihood of Failure
3.  Prioritize Test Cases
4.  Execute Tests
5.  Iterate and Refine

### Scoped Test Runs
You can control the scope of the test run using the following options:

-   **`--scope <full|changed>`**:
    -   `full`: (Default) Runs the full regression suite.
    -   `changed`: Analyzes the git history and only runs tests relevant to the changed files.
-   **`--priority <P0|P1|P2|P3>`**:
    -   Allows you to run tests only up to a certain priority level. For example, `--priority P0` will only execute the most critical tests for a very fast feedback loop.

**Example**:
```
/regression-test --scope changed --priority P0
```

### Expert Agents
While the orchestrator manages the overall workflow, you can also interact with the expert agents directly for repository-specific tasks.

-   **/run-java-tests**: For `irisx-algo`.
-   **/run-sql-tests**: For `irisx-config`.
-   **/run-python-tests**: For `ms-loadapis`.
