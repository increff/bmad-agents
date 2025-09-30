<!-- Powered by BMAD™ Core -->

# Implement Requirement - Complete Development Workflow

## Purpose

Execute the complete development workflow for implementing a requirement across three interconnected repositories: `irisx-algo` (Java/Spring Boot), `ms-loadapis-ril-final` (Python), and `irisx-config` (Configuration/SQL).

## Task Instructions

### 1. Initial Setup and Analysis

**CRITICAL:** This task implements the complete BMAD ADS Automation workflow as defined in the PRD.

**Prerequisites:**
- Requirement document must be provided
- All three repositories must be accessible
- BMAD core agents must be available

**Step 1: Load Requirement Document**
1. Read the requirement document provided by the user
2. Parse requirement ID, title, description, and technical requirements
3. Identify the type of change required (new column, new input, formula change, new module, etc.)

**Step 2: Repository Crawling - Stage 1 (Analysis Phase)**
1. **Crawl irisx-algo repository:**
   - Analyze Java modules, abstract classes, data structures, constants
   - Identify shared dependencies and inheritance patterns
   - Map existing distribution, depletion, and validation modules
   - Document current patterns and conventions

2. **Crawl ms-loadapis-ril-final repository:**
   - Analyze load API classes, common utilities, constants
   - Identify existing load API patterns and inheritance
   - Map distribution-specific load APIs
   - Document current Python patterns

3. **Crawl irisx-config repository:**
   - Analyze TSV templates, SQL views, configuration files
   - Identify existing template patterns and naming conventions
   - Map configuration structures and dependencies
   - Document current configuration patterns

### 2. Pattern Analysis and Requirement Enhancement

**Step 3: Pattern Discovery and Classification**
1. **Structural Patterns**: Analyze file organization, naming conventions, directory structures
2. **Code Patterns**: Identify coding patterns, design patterns, architectural patterns
3. **Data Patterns**: Analyze data flow patterns, schema patterns, transformation patterns
4. **Configuration Patterns**: Identify configuration patterns, parameter patterns, environment patterns
5. **Validation Patterns**: Analyze validation patterns, error handling patterns, testing patterns

**Step 4: Requirement Enhancement**
1. **Pattern Mapping**: Map discovered patterns to requirement types
2. **Requirement Enhancement**: Enhance requirements with specific implementation details
3. **Conflict Resolution**: Resolve conflicts between requirements and existing patterns
4. **Strategy Optimization**: Optimize implementation strategy based on pattern analysis

### 3. Dependency Analysis and Impact Assessment

**Step 5: Shared Dependency Analysis**
1. **Identify Shared Classes**: Find abstract classes like `AbstractAllocationModule`, `BaseIterationRunner`
2. **Map Dependencies**: Identify all modules that extend shared classes
3. **Impact Assessment**: Determine impact of changes on dependent modules
4. **Override Strategy**: Plan override strategy to avoid breaking changes

**Step 6: Repository Mapping**
1. **Direct Dependencies**: Identify modules that directly implement the requirement
2. **Data Dependencies**: Identify modules that consume/produce affected data
3. **Configuration Dependencies**: Identify modules that need config updates
4. **Create Change List**: Generate detailed repository change list

### 4. Story Creation and Planning

**Step 7: Create Implementation Story**
1. **Use SM Agent**: Transform to SM agent using `*agent sm`
2. **Execute Draft Command**: Use `*draft` command with `create-next-story.md` task
3. **Story Content**: Include enhanced requirements, dependency analysis, and implementation plan
4. **Acceptance Criteria**: Define clear acceptance criteria for implementation

### 5. Branch Creation and Repository Operations

**Step 8: Create Feature Branches**
1. **Branch Naming**: Use convention `feature/{req-id}-{title}`
2. **Multi-Repository Coordination**: Create branches in all affected repositories
3. **Handle Existing Branches**: Switch to existing branches if they exist
4. **Repository Status**: Ensure all repositories are on correct branches

### 6. Pre-Implementation Crawling - Stage 2

**Step 9: Pre-Implementation Analysis**
1. **Crawl Specific Modules**: Analyze modules identified for changes
2. **Related Modules**: Check related modules that might be affected
3. **Existing Templates**: Find and analyze existing templates to follow
4. **Shared Classes**: Analyze current implementations of shared classes

### 7. Implementation

**Step 10: Code Implementation**
1. **Use Dev Agent**: Transform to Dev agent using `*agent dev`
2. **Execute Develop Story**: Use `*develop-story` command
3. **Follow Patterns**: Implement changes following discovered patterns
4. **Template-Based Generation**: Use existing templates for code generation

**Implementation Details:**
- **Java Changes**: Modify classes, add fields, update methods following existing patterns
- **Python Changes**: Create load APIs following existing inheritance patterns
- **Configuration Changes**: Update JSON configs, create TSV templates, create SQL views
- **Schema Synchronization**: Maintain consistency across Java, Python, and SQL schemas

### 8. Validation Crawling - Stage 3

**Step 11: Validation Analysis**
1. **Crawl Validation Modules**: Analyze validation modules related to changes
2. **Test Patterns**: Find existing test structures and patterns
3. **Configuration Validation**: Analyze configuration validation patterns
4. **Integration Points**: Check integration points and dependencies

### 9. Validation and Testing

**Step 12: Execute Validation**
1. **Use QA Agent**: Transform to QA agent using `*agent qa`
2. **Run Review QA**: Use `*review-qa` command
3. **Run Tests**: Use `*run-tests` command
4. **Validation Modules**: Run existing validation modules (25+ validations)
5. **Schema Validation**: Validate data schemas and configurations

### 10. Documentation and Results

**Step 13: Update Documentation**
1. **Update Requirement Document**: Add implementation results to original document
2. **Document Branches**: List all branches created
3. **Document Files**: List all files modified with line counts
4. **Document Commits**: Include git commit information
5. **Next Steps**: Provide next steps and review instructions

## Success Criteria

- All three repositories have feature branches created
- All required code changes implemented following existing patterns
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

## Notes

- This task implements the complete BMAD ADS Automation workflow
- Follows BMAD agent specialization rules strictly
- Performs actual git operations and repository modifications
- Uses multi-stage repository crawling for accuracy
- Implements pattern-based requirement enhancement
- Maintains consistency across all three repositories
