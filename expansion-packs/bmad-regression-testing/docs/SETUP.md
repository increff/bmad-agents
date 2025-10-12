# Setup: BMAD Algorithm Output Regression Testing

## Prerequisites
- Node.js 16+
- Python 3.8+ (for data analysis and validation)
- Access to algorithm output files in a local directory

## Tooling
- Python: `pandas`, `numpy`, `jsonschema`, `openpyxl` (for Excel files)
- Data Analysis: `pandas` for CSV/TSV analysis, `json` for JSON validation
- File Processing: Standard Python libraries for file operations

## Configure Algorithm Outputs Path
Edit `expansion-packs/bmad-regression-testing/config.yaml`:
```yaml
algorithm_outputs_path: "/absolute/path/to/algorithm/outputs"
testing:
  output_file_types: [".csv", ".json", ".txt", ".xlsx", ".tsv"]
  validation_methods: ["schema", "data_quality", "regression", "performance"]
```

## Python Environment Setup
```bash
python -m venv .venv && source .venv/bin/activate
pip install -U pip
pip install pandas numpy jsonschema openpyxl
```

## Algorithm Outputs Directory Structure
Ensure your algorithm outputs directory contains:
- Output files in supported formats (CSV, JSON, TXT, XLSX, TSV)
- Baseline files for regression comparison (optional)
- Schema definitions for validation (optional)

## Supported File Types
- **CSV**: Comma-separated values with headers
- **JSON**: Structured JSON data with optional schema validation
- **TXT**: Plain text files for log analysis
- **XLSX**: Excel files with multiple sheets
- **TSV**: Tab-separated values

## Sanity Checks
- `python --version` (3.8+)
- `pip list` (check for required packages)
- Verify algorithm outputs directory exists and contains files

## First Run
See `docs/QUICKSTART.md` to run `/test-algorithm-outputs`.
