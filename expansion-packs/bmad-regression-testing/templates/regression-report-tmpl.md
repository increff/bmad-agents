---
id: regression-report-template
name: Regression Test Report Template
description: A template for generating the final regression test report.
---

# Regression Test Report

## Summary
- **Date**: {{date}}
- **Overall Status**: {{status}}
- **Scope**: {{scope}}
- **Total Tests Run**: {{total_tests}}
- **Passed**: {{passed_tests}}
- **Failed**: {{failed_tests}}

---

## High-Level Metrics

| Repository      | P0 Tests (Pass/Fail) | P1 Tests (Pass/Fail) | Coverage |
|-----------------|----------------------|----------------------|----------|
| `irisx-algo`    | {{algo_p0_results}}  | {{algo_p1_results}}  | {{algo_coverage}}% |
| `irisx-config`  | {{config_p0_results}}| {{config_p1_results}}| N/A      |
| `ms-loadapis`   | {{py_p0_results}}    | {{py_p1_results}}    | {{py_coverage}}%   |

---

## Detailed Findings

### Failures and High-Severity Issues
{{#each failures}}
- **Test Case**: `{{this.name}}`
- **Repository**: `{{this.repo}}`
- **Priority**: {{this.priority}}
- **Error**: `{{this.error}}`
{{/each}}

### Coverage Gaps
{{#each coverage_gaps}}
- **File**: `{{this.file}}`
- **Repository**: `{{this.repo}}`
- **Missing Coverage**: {{this.missing}}
{{/each}}

### Recommendations
- **Actionable Items**:
  {{#each recommendations}}
  - {{this}}
  {{/each}}

---

## Raw Logs
- **`irisx-algo` Test Log**: [Link to log file]
- **`irisx-config` Test Log**: [Link to log file]
- **`ms-loadapis` Test Log**: [Link to log file]
