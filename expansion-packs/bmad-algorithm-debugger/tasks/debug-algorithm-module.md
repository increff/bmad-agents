# Debug Algorithm Module

## Purpose
Systematically debug a specific algorithm module, identify issues, and provide resolution strategies.

## Prerequisites
- Access to the algorithm code
- Understanding of the expected behavior
- Knowledge of the business requirements

## Workflow

### Step 1: Problem Definition
**elicit: true**
**format: structured**

Please provide the following information about the algorithm you want to debug:

1. **Algorithm Name/Module**: What specific algorithm or module needs debugging?
2. **Problem Description**: What is the current issue or unexpected behavior?
3. **Expected Behavior**: What should the algorithm do correctly?
4. **Actual Behavior**: What is it currently doing wrong?
5. **Error Messages**: Any specific error messages or exceptions?
6. **Input Data**: What kind of input data is causing the issue?
7. **Environment**: What environment (dev, test, prod) is this occurring in?

### Step 2: Code Analysis
**elicit: false**

Based on the provided information, I will:

1. **Examine the algorithm structure**
   - Review the main algorithm logic
   - Identify key components and dependencies
   - Map the execution flow

2. **Analyze potential issue areas**
   - Check for common Java pitfalls (null pointers, array bounds, etc.)
   - Review business logic implementation
   - Examine data validation and edge cases
   - Look for performance bottlenecks

3. **Identify debugging points**
   - Key variables to monitor
   - Critical decision points
   - Data transformation steps
   - External dependencies

### Step 3: Debugging Strategy
**elicit: false**

I will provide a systematic debugging approach:

1. **Logging Strategy**
   - Key points to add debug logs
   - Variables to monitor
   - Exception handling improvements

2. **Testing Approach**
   - Unit tests to create/modify
   - Integration test scenarios
   - Edge case testing

3. **Code Review Points**
   - Potential logic errors
   - Performance concerns
   - Code quality improvements

### Step 4: Resolution Plan
**elicit: false**

Based on the analysis, I will provide:

1. **Immediate Fixes**
   - Quick fixes for obvious issues
   - Error handling improvements
   - Input validation enhancements

2. **Long-term Improvements**
   - Code refactoring suggestions
   - Performance optimizations
   - Maintainability improvements

3. **Testing Strategy**
   - Test cases to implement
   - Validation scenarios
   - Regression testing approach

### Step 5: Implementation Guidance
**elicit: false**

I will provide:

1. **Code Changes**
   - Specific code modifications
   - Before/after comparisons
   - Implementation steps

2. **Verification Steps**
   - How to test the fixes
   - Success criteria
   - Rollback plan if needed

## Output Format

The debugging analysis will be structured as:

```markdown
# Algorithm Debug Report: [Algorithm Name]

## Problem Summary
[Brief description of the issue]

## Root Cause Analysis
[Detailed analysis of the underlying cause]

## Debugging Strategy
[Systematic approach to resolve the issue]

## Code Changes Required
[Specific modifications needed]

## Testing Plan
[How to validate the fixes]

## Performance Impact
[Any performance implications]

## Recommendations
[Long-term improvements and best practices]
```

## Success Criteria
- Issue is clearly identified and understood
- Root cause is determined
- Specific resolution steps are provided
- Testing strategy is defined
- Performance impact is assessed
