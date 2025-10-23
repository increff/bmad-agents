# BMAD Algorithm Output Regression Testing Expansion Pack

## Overview
This expansion pack provides automated regression testing for algorithm output files. It analyzes, validates, and tests algorithm-generated files to detect regressions, data quality issues, and ensure consistency across algorithm runs.

## Contents
- `agents/`
  - `algorithm-output-tester.md` - Main agent for testing algorithm outputs
- `tasks/`
  - `1-identify-risk-areas.md` - Identify high-risk areas for testing
  - `2-assess-failure-likelihood.md` - Assess likelihood of test failures
  - `3-prioritize-test-cases.md` - Prioritize test cases by risk and impact
  - `4-generate-html-report.md` - Generate interactive HTML error visualization report
- `checklists/`
  - `quality-gate-checklist.md` - Quality gates for output validation
- `templates/`
  - `output-validation-templates.yaml` - Validation templates and rules
  - `test-generation-templates.md` - Code templates for validation
  - `regression-report-tmpl.md` - Report template
  - `error-visualization-report.html` - Interactive HTML error visualization report
  - `priority-matrix.yaml` - File priority matrix
  - `risk-assessment-matrix.yaml` - Risk assessment criteria
- `docs/`
  - `QUICKSTART.md` - Quick start guide
  - `COMMAND_REFERENCE.md` - Command reference
  - `SETUP.md` - Setup instructions
- `config.yaml` - Configure algorithm outputs path and validation settings

## Agent
- `algorithm-output-tester`: Analyzes and validates algorithm output files for regressions and data quality issues

## Configuration
Edit `config.yaml`:
- `algorithm_outputs_path`: absolute path to folder containing algorithm outputs
- `testing.output_file_types`: supported file types (CSV, JSON, TXT, XLSX, TSV)
- `testing.validation_methods`: validation types (schema, data_quality, regression, performance)
- `html_report.enabled`: enable/disable HTML report generation
- `html_report.output_file`: filename for the HTML report
- `html_report.output_dir`: directory to save HTML reports
- `html_report.include_charts`: include interactive charts in the report
- `html_report.embed_data`: create self-contained HTML file with embedded data
- `workflow.default_scope`: default scope for the single command (all/recent)
- `workflow.default_validation`: default validation types (all or specific types)
- `workflow.parallel_execution`: run validations in parallel when possible
- `workflow.fail_fast`: stop on first failure vs continue with all validations

## Quick Start
Run the complete algorithm validation workflow with a single command:

```bash
/test-algorithm-outputs
```

This single command will:
1. **Scan** your algorithm outputs directory
2. **Assess risks** and prioritize validation targets
3. **Run all validations** (schema, data quality, regression, performance)
4. **Generate reports** (both markdown and interactive HTML)
5. **Apply quality gates** and provide recommendations

## Usage Examples

### Basic Usage
```bash
/test-algorithm-outputs
```

### Advanced Options
```bash
# Test only recent files with specific validation types
/test-algorithm-outputs --scope recent --validation schema,regression

# Generate reports only (skip validation)
/test-algorithm-outputs --report-only

# Custom output directory
/test-algorithm-outputs --output-dir /path/to/custom/reports
```

See `docs/QUICKSTART.md` for detailed setup and `docs/COMMAND_REFERENCE.md` for all options.

## Quality Gates
Criteria are defined in `checklists/quality-gate-checklist.md`. Adjust thresholds to your needs.
