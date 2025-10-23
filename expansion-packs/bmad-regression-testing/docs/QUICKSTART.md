# Quickstart Guide: BMAD Algorithm Output Regression Testing

## Installation
1.  **Run the Installer**:
    ```bash
    npx bmad-method install
    ```
2.  **Select the Pack**: Choose the `BMAD Algorithm Output Regression Testing` expansion pack from the list.
3.  **Configure Path**: When prompted, provide the absolute local path to your algorithm outputs folder. The installer will save this to `expansion-packs/bmad-regression-testing/config.yaml`.

## Usage
The primary way to use this expansion pack is through the `/test-algorithm-outputs` command, which is handled by the Algorithm Output Tester.

### Running the Full Workflow
To run the entire algorithm output testing workflow, simply execute the following command in your IDE:
```
/test-algorithm-outputs
```
This **single command** automatically executes the complete validation pipeline:
1. **Risk Assessment**: Identifies high-risk files requiring validation
2. **Failure Analysis**: Assesses likelihood of test failures
3. **Test Prioritization**: Prioritizes validation tasks by business impact
4. **Comprehensive Validation**: Runs schema, data quality, regression, and performance checks
5. **Dual Report Generation**: Creates both detailed markdown and interactive HTML reports
6. **Quality Gate Application**: Applies quality criteria and provides pass/fail recommendations

### Scoped Test Runs
You can control the scope of the test run using the following options:

-   **`--scope <all|recent>`**:
    -   `all`: (Default) Tests all algorithm output files in the configured directory.
    -   `recent`: Only tests files that have been modified recently.
-   **`--validation <schema|quality|regression|performance>`**:
    -   Allows you to run specific types of validation. For example, `--validation schema` will only perform schema validation.

**Example**:
```
/test-algorithm-outputs --scope recent --validation regression
```

### Validation Types
The system supports multiple validation types:

-   **Schema Validation**: Checks file structure, format, and required fields
-   **Data Quality**: Validates data integrity, completeness, and consistency
-   **Regression Detection**: Compares current outputs with baseline versions
-   **Performance Analysis**: Analyzes file sizes, processing times, and efficiency
