# Command Reference: BMAD Algorithm Output Regression Testing

## Algorithm Output Tester
- `/test-algorithm-outputs` – Run algorithm output validation workflow
  - `--scope <all|recent>` – Test all files or only recently modified ones
  - `--validation <schema|quality|regression|performance>` – Specify validation type
  - `--report-only` – Generate report from latest run without executing new tests

## Validation Commands
- `/validate-schema` – Validate file schemas and structure
  - `--file-type <csv|json|xlsx|txt|tsv>` – Specify file type to validate
- `/check-data-quality` – Perform data quality validation
  - `--severity <critical|high|medium|low>` – Filter by issue severity
- `/detect-regressions` – Compare current outputs with baselines
  - `--baseline-path <path>` – Specify baseline directory
  - `--tolerance <percentage>` – Set regression tolerance threshold
- `/analyze-performance` – Analyze file performance characteristics
  - `--max-size <MB>` – Set maximum file size limit
  - `--max-rows <number>` – Set maximum row count limit
