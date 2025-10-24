---
id: quality-gate-checklist
name: Quality Gate Checklist
description: Enforces quality gates and validation requirements for algorithm output testing.
---

# Quality Gate Checklist

## Gate Decision Criteria
- **PASS**: All critical validations pass, MCP server health check passes, no high-severity data quality issues found.
- **CONCERNS**: Non-blocking issues are present; these should be tracked for future algorithm runs.
- **FAIL**: One or more critical validations fail, MCP server health check fails, or high-severity data quality issues are present.
- **WAIVED**: Known issues are explicitly accepted by the algorithm owner or lead.

## Prerequisites Check
- **MCP Server Health**: MCP Excel Server must pass all health checks before regression testing begins
- **Installation Verification**: All required tools and dependencies must be properly installed
- **Configuration Validation**: MCP server settings in config.yaml must be correct

## Validation Requirements

### P0 (Critical Files)
- **Schema Validation**: 100% compliance with expected schema
- **Data Quality**: No missing required fields, no null values in critical columns
- **Regression Detection**: No significant changes from baseline (tolerance < 1%)
- **File Integrity**: All files are readable and properly formatted
- **MCP Performance**: < 30 seconds parsing time for TSV/Excel files up to 100MB

### P1 (High Priority Files)
- **Schema Validation**: >95% compliance with expected schema
- **Data Quality**: <5% missing values, no critical data type mismatches
- **Regression Detection**: Changes within acceptable tolerance (< 5%)
- **File Integrity**: Files are readable with minor format issues
- **MCP Performance**: < 60 seconds parsing time for TSV/Excel files up to 500MB

### P2 (Medium Priority Files)
- **Schema Validation**: >90% compliance with expected schema
- **Data Quality**: <10% missing values, minor data type issues acceptable
- **Regression Detection**: Changes within moderate tolerance (< 10%)
- **File Integrity**: Files are readable with some format inconsistencies
- **MCP Performance**: < 120 seconds parsing time for large files, graceful fallback to standard parsing

### P3 (Low Priority Files)
- **Validation**: Best effort; basic file integrity checks only
- **MCP Performance**: Optional acceleration, standard parsing acceptable

## MCP Excel Server Quality Gates

### Performance Gates
- **Parsing Speed**: MCP server must provide >5x speedup over standard pandas for TSV files >10MB
- **Memory Efficiency**: Peak memory usage < 2x file size for large datasets
- **Caching Effectiveness**: >80% cache hit rate for repeated validations
- **Parallel Processing**: Successful concurrent processing of multiple files

### Reliability Gates
- **Fallback Mechanism**: Automatic fallback to standard parsing if MCP server fails
- **Data Consistency**: MCP and standard parsing produce identical validation results
- **Error Handling**: Graceful degradation with detailed error reporting
- **Resource Limits**: Respect configured file size and memory limits

### Feature Gates
- **TSV Support**: Full support for tab-separated value files with proper delimiter detection
- **Excel Support**: Native Excel format support (.xlsx, .xls) without conversion
- **Statistical Analysis**: Advanced statistical summaries and data quality assessments
- **Visualization**: Chart generation and data preview capabilities
