# Comprehensive Code Review

## Purpose
Perform a thorough code review of Java algorithms focusing on code quality, maintainability, performance, and best practices.

## Prerequisites
- Access to the algorithm code
- Understanding of the business requirements
- Knowledge of the codebase structure

## Workflow

### Step 1: Code Review Scope
**elicit: true**
**format: structured**

Please provide the following information:

1. **Code Location**: What specific files/classes need to be reviewed?
2. **Review Focus**: What aspects should I focus on (performance, security, maintainability, etc.)?
3. **Business Context**: What is the business purpose of this code?
4. **Criticality**: How critical is this code to the system?
5. **Recent Changes**: Have there been recent modifications that need special attention?
6. **Known Issues**: Are there any known problems or concerns?
7. **Review Standards**: Any specific coding standards or guidelines to follow?

### Step 2: Code Structure Analysis
**elicit: false**

I will analyze the code structure:

1. **Architecture Review**
   - Class design and responsibilities
   - Package organization
   - Dependency relationships
   - Design pattern usage

2. **Code Organization**
   - Method size and complexity
   - Class cohesion and coupling
   - Interface design
   - Abstraction levels

3. **Naming Conventions**
   - Class, method, and variable naming
   - Constant and enum naming
   - Package naming consistency

### Step 3: Code Quality Assessment
**elicit: false**

I will evaluate code quality across multiple dimensions:

1. **Readability**
   - Code clarity and self-documentation
   - Comment quality and necessity
   - Variable and method naming
   - Code formatting and style

2. **Maintainability**
   - Code modularity
   - Ease of modification
   - Testability
   - Documentation quality

3. **Performance**
   - Algorithm efficiency
   - Memory usage patterns
   - I/O operations
   - Caching opportunities

4. **Security**
   - Input validation
   - SQL injection prevention
   - Authentication and authorization
   - Data protection

### Step 4: Best Practices Review
**elicit: false**

I will check for adherence to best practices:

1. **Java Best Practices**
   - Proper use of Java 8+ features
   - Exception handling
   - Resource management
   - Concurrency patterns

2. **Spring Framework Practices**
   - Dependency injection usage
   - Configuration management
   - Transaction handling
   - Bean lifecycle management

3. **Database Practices**
   - Query optimization
   - Connection management
   - Transaction boundaries
   - Data validation

4. **Testing Practices**
   - Test coverage
   - Test quality
   - Mock usage
   - Integration testing

### Step 5: Issue Identification and Recommendations
**elicit: false**

I will provide detailed feedback:

1. **Critical Issues**
   - Security vulnerabilities
   - Performance bottlenecks
   - Memory leaks
   - Logic errors

2. **Code Quality Issues**
   - Maintainability concerns
   - Readability problems
   - Design pattern violations
   - Code duplication

3. **Improvement Recommendations**
   - Refactoring suggestions
   - Performance optimizations
   - Security enhancements
   - Best practice implementations

## Output Format

The code review will be structured as:

```markdown
# Code Review Report: [Component Name]

## Review Summary
[Overall assessment and key findings]

## Architecture Assessment
[Analysis of code structure and design]

## Code Quality Analysis
[Detailed quality assessment]

## Best Practices Compliance
[Adherence to coding standards and practices]

## Critical Issues
[High-priority issues requiring immediate attention]

## Improvement Recommendations
[Specific suggestions for enhancement]

## Implementation Priority
[Recommended order for addressing issues]

## Testing Recommendations
[Suggestions for improving test coverage and quality]
```

## Success Criteria
- Code structure is thoroughly analyzed
- Quality issues are identified and prioritized
- Specific improvement recommendations are provided
- Best practices compliance is assessed
- Implementation priorities are established
