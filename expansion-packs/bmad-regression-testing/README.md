# BMAD Algorithm Output Regression Testing Expansion Pack

## Overview
This expansion pack provides automated regression testing for algorithm output files. It analyzes, validates, and tests algorithm-generated files to detect regressions, data quality issues, and ensure consistency across algorithm runs.

## Contents
- `agents/`
  - `algorithm-output-tester.md` - Main agent for testing algorithm outputs
- `tasks/`
  - `1-analyze-output-files.md` - Analyze algorithm output files
  - `2-validate-outputs.md` - Validate outputs for regressions and quality
  - `3-generate-report.md` - Generate comprehensive validation reports
- `checklists/`
  - `quality-gate-checklist.md` - Quality gates for output validation
- `templates/`
  - `output-validation-templates.yaml` - Validation templates and rules
  - `test-generation-templates.yaml` - Code templates for validation
  - `regression-report-tmpl.md` - Report template
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

## Usage
See `docs/QUICKSTART.md` for installation and `/test-algorithm-outputs` examples.
See `docs/COMMAND_REFERENCE.md` for all commands and flags.

## Quality Gates
Criteria are defined in `checklists/quality-gate-checklist.md`. Adjust thresholds to your needs.
