---
id: regression-report-template
name: Algorithm Output Validation Report Template
description: A template for generating the final algorithm output validation report.
---

# Algorithm Output Validation Report

## Summary
- **Date**: {{date}}
- **Overall Status**: {{status}}
- **Scope**: {{scope}}
- **Total Files Analyzed**: {{total_files}}
- **Files Passed**: {{passed_files}}
- **Files Failed**: {{failed_files}}

---

## High-Level Metrics

| File Type | Files Analyzed | Schema Issues | Data Quality Issues | Regressions Detected |
|-----------|----------------|---------------|---------------------|---------------------|
| CSV       | {{csv_count}}  | {{csv_schema}}| {{csv_quality}}     | {{csv_regressions}}  |
| JSON      | {{json_count}} | {{json_schema}}| {{json_quality}}    | {{json_regressions}} |
| XLSX      | {{xlsx_count}} | {{xlsx_schema}}| {{xlsx_quality}}   | {{xlsx_regressions}} |
| TXT       | {{txt_count}}  | {{txt_schema}}| {{txt_quality}}     | {{txt_regressions}} |
| TSV       | {{tsv_count}}  | {{tsv_schema}}| {{tsv_quality}}     | {{tsv_regressions}} |

---

## Detailed Findings

### Critical Issues
{{#each critical_issues}}
- **File**: `{{this.file_path}}`
- **Issue Type**: {{this.issue_type}}
- **Severity**: {{this.severity}}
- **Description**: `{{this.description}}`
{{/each}}

### Data Quality Issues
{{#each data_quality_issues}}
- **File**: `{{this.file_path}}`
- **Issue**: {{this.issue}}
- **Impact**: {{this.impact}}
- **Recommendation**: {{this.recommendation}}
{{/each}}

### Regression Analysis
{{#each regressions}}
- **File**: `{{this.file_path}}`
- **Baseline**: `{{this.baseline_file}}`
- **Change Percentage**: {{this.change_percentage}}%
- **Significance**: {{this.significance}}
{{/each}}

### Performance Analysis
{{#each performance_issues}}
- **File**: `{{this.file_path}}`
- **Size**: {{this.size_mb}}MB
- **Processing Time**: {{this.processing_time}}s
- **Issue**: {{this.issue}}
{{/each}}

### Recommendations
- **Actionable Items**:
  {{#each recommendations}}
  - {{this}}
  {{/each}}

---

## Raw Data
- **Validation Log**: [Link to validation log]
- **Performance Metrics**: [Link to performance data]
- **Regression Comparison**: [Link to comparison data]
