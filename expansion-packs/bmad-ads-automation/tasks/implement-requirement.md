<!-- Powered by BMAD™ Core -->

# Implement Requirement - Execution Based on Analysis

## Purpose

Execute the implementation of a requirement based on the comprehensive analysis results from the analyze-requirement task. This task focuses on actual code implementation, testing, and validation using the detailed change plan created during analysis.

## Task Instructions

### 1. Automatic Analysis Phase

**CRITICAL:** This task automatically triggers comprehensive analysis before implementation.

**Step 1: Trigger Comprehensive Analysis**

1. **Auto-Call Analyze Task**: Automatically execute analyze-requirement task first
2. **Comprehensive Repository Crawling**: Crawl all three repositories to identify patterns and dependencies
3. **Change Identification**: Identify ALL changes that will be required
4. **Pattern Analysis**: Analyze existing patterns across all repositories
5. **Dependency Mapping**: Map all dependencies and impacts
6. **Implementation Planning**: Create detailed implementation plan
7. **Risk Assessment**: Assess implementation risks and mitigation strategies

**Step 2: Analysis Results Validation**

1. **Review Analysis Results**: Review the comprehensive analysis results
2. **Validate Change List**: Confirm all identified changes are accurate and complete
3. **Review Implementation Plan**: Confirm implementation strategy and order
4. **Validate Dependencies**: Confirm all dependencies are correctly identified
5. **Review Risk Assessment**: Understand implementation risks and mitigation strategies

**Step 3: Pre-Implementation Validation**

1. **Pattern Compliance Check**: Verify all changes follow established patterns
2. **Dependency Validation**: Ensure all dependencies are correctly identified
3. **Syntax Validation**: Validate that all code will compile successfully
4. **Repository Status Check**: Ensure all repositories are in correct state
5. **Branch Validation**: Confirm feature branches are created and ready

### 2. Story Creation and Planning

**Step 4: Create Implementation Story**

1. **Use SM Agent**: Transform to SM agent using `*agent sm`
2. **Execute Draft Command**: Use `*draft` command with `create-next-story.md` task
3. **Story Content**: Include analysis results, detailed change list, and implementation plan
4. **Acceptance Criteria**: Define clear acceptance criteria based on analysis results
5. **Update Requirement Document**: Add story content to the requirement document itself

### 3. Branch Creation and Repository Operations

**Step 5: Create Feature Branches**

1. **Execute Git Operations**: Use `*git-branch` command to create actual feature branches
2. **Branch Naming**: Use convention `feature/{req-id}-{title}`
3. **Base Branch**: Create branches from `caas-release` branch in each repository
4. **Multi-Repository Coordination**: Create branches in all affected repositories
5. **Handle Existing Branches**: Switch to existing branches if they exist
6. **Repository Status**: Ensure all repositories are on correct branches
7. **Update Requirement Document**: Add branch URLs and repository information to requirement document

### 4. Implementation Execution

**Step 6: Use @dev.md for Code Implementation**

1. **Activate @dev.md**: Use the developer persona to implement changes
2. **Execute Develop Story**: Use `*develop-story` command
3. **Follow Analysis Results**: Implement changes based on detailed change list from analysis
4. **Template-Based Generation**: Use existing templates identified during analysis
5. **Reference Existing Files**: Before creating any new file, crawl repository to find existing similar files and copy their exact structure and patterns
6. **Make Actual File Changes**: Modify actual repository files (Java, Python, Config) as identified in analysis, following existing patterns
7. **Create Tests**: Create unit tests for new functionality
8. **Document Changes**: Update documentation with implementation details and usage examples
9. **Commit Changes**: Use `*git-commit` to commit changes to feature branches
10. **Update Requirement Document**: Add implementation details and code changes to requirement document

**Implementation Details Based on Analysis:**

- **Algorithm Repository Changes**: Implement changes identified in analysis (new/modified classes, methods, registrations)
- **LoadAPI Repository Changes**: Implement LoadAPI changes identified in analysis (new/modified LoadAPI classes, validation, registration)
- **Configuration Repository Changes**: Implement configuration changes identified in analysis (templates, views, JSON configs)
- **Schema Synchronization**: Maintain consistency across Java, Python, and SQL schemas as planned in analysis

### 5. Testing and Validation

**Step 7: Use @qa.md for Basic Testing**

1. **Activate @qa.md**: Use the QA persona to create and execute basic tests
2. **Create Unit Tests**: Generate unit tests for new functionality identified in analysis
3. **Test New Data Classes**: Create tests for new data structures identified in analysis
4. **Test Static Methods**: Create tests for calculation logic identified in analysis
5. **Test LoadAPI Methods**: Create tests for new LoadAPI functionality identified in analysis
6. **Execute Tests**: Run basic unit tests to validate implementation
7. **Document Test Results**: Include test results in the final documentation

**Step 8: Execute Validation**

1. **Use QA Agent**: Transform to QA agent using `*agent qa`
2. **Run Review QA**: Use `*review-qa` command
3. **Run Tests**: Use `*run-tests` command
4. **Validation Modules**: Run existing validation modules (25+ validations)
5. **Schema Validation**: Validate data schemas and configurations
6. **Update Requirement Document**: Add test cases, test results, and validation outcomes to requirement document

### 6. Documentation and Results

**Step 9: Push Changes**

1. **Push Feature Branches**: Use `*git-push` to push all feature branches to remote repositories
2. **Verify Remote Branches**: Confirm all branches are available on remote
3. **Update Branch URLs**: Add remote branch URLs to requirement document

## Summary

This implementation task automatically triggers comprehensive analysis and then executes the actual code changes. The workflow is:

- **Automatic Analysis Phase**: Automatically calls analyze-requirement task to identify ALL changes, dependencies, and impacts upfront
- **Implementation Phase**: Executes the changes based on the detailed analysis results
- **Complete Workflow**: Single command triggers the entire development lifecycle

This approach ensures:

- **Complete Visibility**: You know exactly what will be changed before implementation begins
- **Accurate Implementation**: All changes are based on thorough analysis and pattern recognition
- **Reduced Risk**: Dependencies and impacts are identified and planned for upfront
- **Predictable Results**: Implementation follows a detailed plan created during analysis
- **Single Command**: One command triggers analysis, planning, implementation, testing, and validation

## Prerequisites

- **MANDATORY**: Requirement document must be provided
- **MANDATORY**: All three repositories must be accessible
- **MANDATORY**: BMAD core agents must be available (@analyst.md, @dev.md, @qa.md)
- **AUTOMATIC**: Analysis phase is automatically triggered and completed first

## Output

The output of this implementation task includes:

- **Implemented Changes**: All code changes as identified in the analysis
- **Test Results**: Comprehensive test results for all implemented functionality
- **Validation Results**: Results from all validation modules and tests
- **Documentation Updates**: Updated requirement document with implementation details
- **Branch Information**: Feature branch URLs and repository information
- **Change Summary**: Summary of all implemented changes across all repositories

**Step 14: Update Documentation**

1. **Update Requirement Document**: Add implementation results to original document
2. **Add Changelog**: Update changelog section with development progress
3. **Add Test Cases**: Include all test cases and results in requirement document
4. **Add Short PRD**: Update PRD section with any requirement changes
5. **Add Branch URLs**: Include all branch URLs and repository information
6. **Add Code Review**: Include code review status and comments
7. **Add Deployment Info**: Include deployment status and steps
8. **Add Metrics**: Include development metrics and performance impact
9. **Document Branches**: List all branches created
10. **Document Files**: List all files modified with line counts
11. **Document Commits**: Include git commit information
12. **Next Steps**: Provide next steps and review instructions

## Success Criteria

- **Correct modules identified** using module abbreviation mapping
- **Module selection validated** to prevent incorrect targeting (e.g., ISS vs Distribution)
- All three repositories have feature branches created from caas-release
- All required code changes implemented following existing patterns
- All changes committed to feature branches
- Feature branches pushed to remote repositories
- All validation tests pass
- Configuration files updated consistently
- Documentation updated with complete implementation details
- Implementation completed within 2-hour target

## Error Handling

- **Repository Access Issues**: Handle repository access problems gracefully
- **Branch Conflicts**: Resolve existing branch conflicts
- **Validation Failures**: Address validation failures with appropriate fixes
- **Pattern Conflicts**: Resolve conflicts between requirements and existing patterns
- **Dependency Issues**: Handle shared class modification impacts
- **CRITICAL: Data Loading Errors**: If agent tries to implement file-based loading in Java modules, STOP and redirect to use `db().select()` pattern
- **CRITICAL: Architecture Violations**: If agent tries to handle file loading in Java modules, STOP and explain that Python load APIs handle file loading
- **CRITICAL: Load API Registration**: If agent creates new Load API, MUST register it in `__init__.py` files (there are 2 files)
- **CRITICAL: Registration Pattern**: If agent doesn't follow existing Load API registration pattern, STOP and check existing `__init__.py` files
- **CRITICAL: Input Schema Registration**: If agent creates new input for processing modules, MUST register it in SchemaProvider and Filename. For simple input file additions, basic file creation is sufficient
- **CRITICAL: Input JSON Configuration**: If agent creates new input for processing modules, MUST add it to input JSON in config. For simple input file additions, this is optional
- **CRITICAL: Input Pattern Discovery**: If agent doesn't follow existing input registration pattern, STOP and check existing SchemaProvider, Filename, and input JSON patterns
- **CRITICAL: Output Sync Registration**: If agent creates new output, MUST register it in Util Output Sync Module
- **CRITICAL: Output CAAS JSON Configuration**: If agent creates new output, MUST add it to Output CAAS JSON
- **CRITICAL: Output Pattern Discovery**: If agent doesn't follow existing output registration pattern, STOP and check existing Util Output Sync Module and Output CAAS JSON patterns
- **CRITICAL: File Creation Reference**: When creating new files, ALWAYS reference existing files for structure:
  - For ROW classes: Find existing Row classes in `row/input/{module}/` and copy their exact structure
  - For FILE classes: Find existing File classes in `file/input/{module}/` and copy their exact structure
  - For LOADAPI classes: Find existing LoadAPI classes and copy their exact structure
  - For TEMPLATE files: Find existing .tsv templates and copy their exact structure
  - For SQL VIEWS: Find existing SQL view files and copy their exact structure
- **CRITICAL: Complete Implementation**: Create comprehensive implementations with proper validation, error handling, and testing
- **CRITICAL: Reference Existing Files**: Always crawl repository to find similar files and follow their exact structure and patterns
- **CRITICAL: Error Prevention**: If any validation fails, STOP implementation and fix issues before proceeding

## Notes

- This task implements the complete BMAD ADS Automation workflow
- Follows BMAD agent specialization rules strictly
- Performs actual git operations and repository modifications
- Uses multi-stage repository crawling for accuracy
- Implements pattern-based requirement enhancement
- Maintains consistency across all three repositories
