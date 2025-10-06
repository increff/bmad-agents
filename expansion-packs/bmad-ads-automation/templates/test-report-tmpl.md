# Basic Test Report Template

## Test Report Summary

**Report ID**: TR-{DATE}-{MODULE}  
**Report Date**: {Date}  
**Test Period**: {Start Date} to {End Date}  
**Reported By**: {Tester Name}  
**Module**: {Module Name}

## Executive Summary

**Total Test Cases**: {Number}  
**Passed**: {Number}  
**Failed**: {Number}  
**Skipped**: {Number}  
**Pass Rate**: {Percentage}%

## Test Results Overview

### Static Method Test Results

| Method Name | Test Cases | Passed   | Failed   | Coverage      |
| ----------- | ---------- | -------- | -------- | ------------- |
| {Method1}   | {Number}   | {Number} | {Number} | {Percentage}% |
| {Method2}   | {Number}   | {Number} | {Number} | {Percentage}% |
| {Method3}   | {Number}   | {Number} | {Number} | {Percentage}% |

### Repository Test Results

| Repository            | Test Cases | Passed   | Failed   | Coverage      |
| --------------------- | ---------- | -------- | -------- | ------------- |
| irisx-algo            | {Number}   | {Number} | {Number} | {Percentage}% |
| ms-loadapis-ril-final | {Number}   | {Number} | {Number} | {Percentage}% |
| irisx-config          | {Number}   | {Number} | {Number} | {Percentage}% |

## Detailed Test Results

### Java Static Method Tests (irisx-algo)

#### Test Results

```bash
# Test execution summary
Tests run: {Number}, Failures: {Number}, Errors: {Number}, Skipped: {Number}
```

#### Coverage Analysis

- **Line Coverage**: {Percentage}%
- **Method Coverage**: {Percentage}%
- **Class Coverage**: {Percentage}%

#### Failed Tests

| Test Case | Method   | Error Message | Status |
| --------- | -------- | ------------- | ------ |
| {TC-ID}   | {Method} | {Error}       | Failed |

### Python Static Function Tests (ms-loadapis-ril-final)

#### Test Results

```bash
# Test execution summary
{Number} passed, {Number} failed in {Time}s
```

#### Coverage Analysis

- **Line Coverage**: {Percentage}%
- **Function Coverage**: {Percentage}%
- **Module Coverage**: {Percentage}%

#### Failed Tests

| Test Case | Function   | Error Message | Status |
| --------- | ---------- | ------------- | ------ |
| {TC-ID}   | {Function} | {Error}       | Failed |

### Configuration Validation (irisx-config)

#### Validation Results

- **JSON Files**: {Status}
- **SQL Files**: {Status}
- **Template Files**: {Status}
- **File Structure**: {Status}

## Test Coverage Analysis

### Overall Coverage

- **Total Lines**: {Number}
- **Covered Lines**: {Number}
- **Coverage Percentage**: {Percentage}%

### Coverage by Module

| Module    | Lines    | Covered  | Percentage    |
| --------- | -------- | -------- | ------------- |
| {Module1} | {Number} | {Number} | {Percentage}% |
| {Module2} | {Number} | {Number} | {Percentage}% |

## Quality Metrics

### Code Quality

- **Cyclomatic Complexity**: {Average}
- **Code Style Compliance**: {Percentage}%
- **Documentation Coverage**: {Percentage}%

### Static Analysis

- **Security Issues**: {Number}
- **Code Smells**: {Number}
- **Technical Debt**: {Hours}

## Issues and Recommendations

### Critical Issues

1. **Issue**: {Description}
   - **Impact**: {Impact description}
   - **Recommendation**: {Recommended action}

### Medium Issues

1. **Issue**: {Description}
   - **Impact**: {Impact description}
   - **Recommendation**: {Recommended action}

### Low Issues

1. **Issue**: {Description}
   - **Impact**: {Impact description}
   - **Recommendation**: {Recommended action}

## Test Environment

### Environment Details

- **Java Version**: {Version}
- **Python Version**: {Version}
- **Maven Version**: {Version}
- **Test Framework**: JUnit/pytest
- **Operating System**: {OS}

### Test Execution

- **Total Execution Time**: {Time}
- **Average Test Time**: {Time}
- **Slowest Test**: {Test Name} - {Time}

## Recommendations

### Immediate Actions

1. {Recommendation 1}
2. {Recommendation 2}
3. {Recommendation 3}

### Future Improvements

1. {Improvement 1}
2. {Improvement 2}
3. {Improvement 3}

## Appendices

### Appendix A: Test Case Details

{Detailed test case information}

### Appendix B: Coverage Reports

{Coverage report details}

### Appendix C: Error Logs

{Error log details}

---

**Report Generated**: {Date}  
**Next Review Date**: {Date}  
**Report Status**: Draft/Final
