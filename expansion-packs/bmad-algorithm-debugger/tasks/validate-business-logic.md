# Validate Business Logic

## Purpose
Validate business logic implementation in algorithms to ensure they meet business requirements and handle edge cases correctly.

## Prerequisites
- Access to the algorithm code
- Business requirements documentation
- Understanding of the domain logic

## Workflow

### Step 1: Business Logic Context
**elicit: true**
**format: structured**

Please provide the following information:

1. **Business Domain**: What business domain does this algorithm serve (retail, finance, etc.)?
2. **Business Rules**: What are the key business rules that must be enforced?
3. **Input Requirements**: What are the valid input formats and constraints?
4. **Output Expectations**: What should the algorithm produce as output?
5. **Edge Cases**: Are there any known edge cases or special scenarios?
6. **Business Constraints**: What are the business constraints (time, cost, quality, etc.)?
7. **Validation Criteria**: How do you determine if the output is correct?

### Step 2: Business Rule Analysis
**elicit: false**

I will analyze the business logic implementation:

1. **Rule Mapping**
   - Map business rules to code implementation
   - Identify missing business rules
   - Check for rule conflicts or contradictions

2. **Data Validation**
   - Input data validation logic
   - Business constraint enforcement
   - Data integrity checks

3. **Calculation Logic**
   - Mathematical formulas and calculations
   - Business metric computations
   - Aggregation and summarization logic

4. **Decision Logic**
   - Conditional business rules
   - Workflow and state transitions
   - Approval and validation processes

### Step 3: Edge Case Analysis
**elicit: false**

I will identify and analyze edge cases:

1. **Boundary Conditions**
   - Minimum and maximum values
   - Empty or null inputs
   - Zero or negative values

2. **Data Quality Issues**
   - Missing or incomplete data
   - Invalid data formats
   - Data inconsistencies

3. **Business Scenarios**
   - Unusual business situations
   - Error conditions
   - Exception handling

4. **Performance Edge Cases**
   - Large data volumes
   - Concurrent operations
   - System resource constraints

### Step 4: Validation Testing
**elicit: false**

I will provide comprehensive validation testing:

1. **Unit Test Scenarios**
   - Normal case testing
   - Edge case testing
   - Error condition testing
   - Boundary value testing

2. **Integration Test Scenarios**
   - End-to-end business flows
   - Data consistency validation
   - Performance under load
   - Error recovery testing

3. **Business Acceptance Testing**
   - Business rule validation
   - User acceptance scenarios
   - Regression testing
   - Compliance testing

### Step 5: Compliance and Audit
**elicit: false**

I will assess compliance and audit requirements:

1. **Regulatory Compliance**
   - Industry standards adherence
   - Legal requirement compliance
   - Audit trail requirements

2. **Business Process Compliance**
   - Workflow compliance
   - Approval process validation
   - Documentation requirements

3. **Data Governance**
   - Data privacy compliance
   - Data retention policies
   - Data quality standards

## Output Format

The business logic validation will be structured as:

```markdown
# Business Logic Validation Report: [Component Name]

## Business Context
[Summary of business domain and requirements]

## Business Rule Analysis
[Analysis of implemented business rules]

## Edge Case Analysis
[Identification and analysis of edge cases]

## Validation Test Plan
[Comprehensive testing strategy]

## Compliance Assessment
[Regulatory and business compliance review]

## Recommendations
[Suggestions for improving business logic implementation]

## Risk Assessment
[Identified risks and mitigation strategies]
```

## Success Criteria
- Business rules are correctly implemented
- Edge cases are identified and handled
- Validation testing strategy is comprehensive
- Compliance requirements are met
- Risk assessment is complete
