# Command Reference: BMAD Regression Testing

## Orchestrator
- `/regression-test` – Run end-to-end regression workflow
  - `--scope <full|changed>` – Full suite or only changed-areas
  - `--priority <P0|P1|P2|P3>` – Max priority to execute
  - `--report-only` – Generate report from latest run

## Java Test Expert
- `/run-java-tests` – Execute Maven tests
  - `--priority <P0|P1|P2|P3>` – Filter by priority mapping
  - `--coverage` – Generate JaCoCo report
- `/generate-java-test` – Generate JUnit file
  - `--module <name>`
  - `--type <unit|integration>`

## SQL Test Expert
- `/run-sql-tests` – Execute SQL tests
  - `--type <migration|validation|regression>`
- `/generate-sql-test` – Generate SQL test script
  - `--component <name>`

## Python Test Expert
- `/run-python-tests` – Execute Python tests
  - `--priority <P0|P1|P2|P3>`
  - `--coverage` – Generate coverage report
- `/generate-python-test` – Generate Python test file
  - `--component <name>`
  - `--type <unit|integration>`
