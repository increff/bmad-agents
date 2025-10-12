---
id: quality-gate-checklist
name: Quality Gate Checklist
description: Enforces quality gates and validation requirements for algorithm output testing.
---

# Quality Gate Checklist

## Gate Decision Criteria
- **PASS**: All critical validations pass, no high-severity data quality issues found.
- **CONCERNS**: Non-blocking issues are present; these should be tracked for future algorithm runs.
- **FAIL**: One or more critical validations fail, or high-severity data quality issues are present.
- **WAIVED**: Known issues are explicitly accepted by the algorithm owner or lead.

## Validation Requirements

### P0 (Critical Files)
- **Schema Validation**: 100% compliance with expected schema
- **Data Quality**: No missing required fields, no null values in critical columns
- **Regression Detection**: No significant changes from baseline (tolerance < 1%)
- **File Integrity**: All files are readable and properly formatted

### P1 (High Priority Files)
- **Schema Validation**: >95% compliance with expected schema
- **Data Quality**: <5% missing values, no critical data type mismatches
- **Regression Detection**: Changes within acceptable tolerance (< 5%)
- **File Integrity**: Files are readable with minor format issues

### P2 (Medium Priority Files)
- **Schema Validation**: >90% compliance with expected schema
- **Data Quality**: <10% missing values, minor data type issues acceptable
- **Regression Detection**: Changes within moderate tolerance (< 10%)
- **File Integrity**: Files are readable with some format inconsistencies

### P3 (Low Priority Files)
- **Validation**: Best effort; basic file integrity checks only.
