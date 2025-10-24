---
id: validate-mcp-server
name: Validate MCP Excel Server Health
description: Performs health check on MCP Excel Server before regression testing workflow.
---

# Task: Validate MCP Excel Server Health

## Objective
To ensure the MCP Excel Server is properly installed, configured, and functional before proceeding with regression testing. This validation prevents workflow failures and ensures optimal performance for TSV/Excel file processing.

## Prerequisites
- MCP Excel Server must be installed via `uv tool install mcp-excel-server`
- Python 3.8+ with required dependencies
- Valid configuration in `config.yaml`

## Validation Steps

### 1. Installation Check
- Verify `mcp-excel-server` command is available in PATH
- Check that `uvx mcp-excel-server` can be executed
- Validate required Python packages are installed

### 2. Server Initialization Test
- Start MCP server process
- Send initialization JSON-RPC request
- Verify server responds with correct protocol version
- Confirm server capabilities (tools, resources, prompts)

### 3. Tool Availability Check
- Request available tools list
- Verify all expected tools are present:
  - `read_excel`
  - `analyze_excel`
  - `data_summary`
  - `filter_excel`
  - `pivot_table`
- Validate tool schemas are correct

### 4. Functionality Test
- Create test TSV file with known structure
- Test `read_excel` tool with TSV file
- Verify data is read correctly (column count, row count, data types)
- Test `data_summary` tool for statistical analysis
- Clean up test files

### 5. Performance Validation
- Measure server startup time (< 2 seconds)
- Test parsing speed on sample data
- Verify memory usage is within limits
- Check for any error conditions

## Error Handling

### Critical Failures (Stop Workflow)
- MCP server not installed
- Server fails to initialize
- Required tools missing
- Basic TSV reading fails

### Warning Conditions (Continue with Fallback)
- Performance slower than expected
- Some advanced tools unavailable
- Memory usage higher than optimal

### Recovery Actions
- **Server Not Found**: Attempt installation with `uv tool install mcp-excel-server`
- **Initialization Failure**: Check configuration and dependencies
- **Tool Missing**: Fall back to standard pandas processing
- **Performance Issues**: Continue with reduced parallelization

## Success Criteria
- ✅ Server initializes within 5 seconds
- ✅ All 8 core tools are available
- ✅ TSV file reading works correctly
- ✅ Data summary generation functional
- ✅ No critical errors detected

## Output
- Health check status (PASS/FAIL/WARNING)
- Detailed validation results
- Performance metrics
- Recommendations for any issues found
- Fallback strategy if MCP server unavailable

## Configuration Integration
This task reads from `config.yaml`:
```yaml
mcp_excel_server:
  enabled: true  # Must be true for MCP validation
  command: "uvx"
  args: ["mcp-excel-server"]
  # ... other settings
```

## Integration with Main Workflow
This validation runs automatically before any file processing begins. If MCP server validation fails:
1. Log detailed error information
2. Attempt fallback to standard processing
3. Continue with reduced functionality
4. Report MCP status in final summary
