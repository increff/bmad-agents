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

## MCP Excel Server Setup (Automatically Installed)

The MCP Excel Server is **automatically installed** when you install the `bmad-regression-testing` expansion pack. It provides accelerated parsing and analysis for TSV, CSV, and Excel files, significantly improving performance for large datasets.

### Manual Installation (if needed)

If you need to install the MCP Excel Server manually:

1. **Install uv (recommended package manager)**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. **Install MCP Excel Server**:
```bash
uv tool install mcp-excel-server
```

3. **Verify installation**:
```bash
uvx mcp-excel-server --help
```

### MCP Server Configuration

The MCP Excel Server is pre-configured in `config.yaml`. Key settings:

```yaml
mcp_excel_server:
  enabled: true
  command: "uvx"
  args: ["mcp-excel-server"]
  performance_mode: true  # Optimized for large files
  cache_enabled: true     # Cache parsed data
  max_file_size_mb: 500   # File size limit
  parallel_processing: true  # Process multiple files concurrently
```

### Claude Desktop Integration (Optional)

For direct MCP integration with Claude Desktop:

1. Open Claude Desktop Settings → Developer tab
2. Edit `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "mcp-excel-server": {
      "command": "uvx",
      "args": ["mcp-excel-server"]
    }
  }
}
```

### Performance Benefits

- **TSV Files**: Up to 10x faster parsing for large files
- **Excel Files**: Native Excel processing without format conversion
- **Caching**: Re-use parsed data across validation runs
- **Parallel Processing**: Concurrent file analysis
- **Memory Optimization**: Efficient handling of large datasets

### MCP Server Health Validation

The regression testing workflow automatically validates MCP Excel Server health before processing any files. The validation includes:

- **Installation Check**: Verifies MCP server is installed and accessible
- **Initialization Test**: Tests server startup and JSON-RPC communication
- **Tools Verification**: Confirms all 8 required tools are available
- **Functionality Test**: Tests TSV reading and data summary generation
- **Performance Check**: Measures initialization time and responsiveness

### Troubleshooting

- **Permission Issues**: Ensure `uvx` is in your PATH
- **Python Path**: Update `PYTHONPATH` in config.yaml if needed
- **File Size Limits**: Adjust `max_file_size_mb` for very large files
- **Fallback**: If MCP server fails validation, the system automatically falls back to standard pandas processing
- **Health Check Script**: Run `python templates/mcp-server-validation.py --verbose` for detailed diagnostics

### Manual Health Check

You can manually verify MCP server health anytime:

```bash
# Run comprehensive health check
python expansion-packs/bmad-regression-testing/templates/mcp-server-validation.py --verbose

# Quick check (exit codes: 0=PASS, 1=WARNING, 2=CRITICAL)
python expansion-packs/bmad-regression-testing/templates/mcp-server-validation.py
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
