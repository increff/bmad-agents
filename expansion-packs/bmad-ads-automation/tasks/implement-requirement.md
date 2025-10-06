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

**Step 1.5: Module Identification**

1. **Load Module Abbreviations**: Reference `module-abbreviations.md` for module mapping
2. **Keyword Matching**: Match requirement keywords to module abbreviations
3. **Context Validation**: Ensure identified modules make sense for the requirement
4. **Primary Module Selection**: Identify the main module to modify
5. **Secondary Modules**: Identify any additional modules that might be affected
6. **Validate Module Choice**: Prevent incorrect targeting (e.g., ISS vs Distribution)
7. **Document Module Selection**: Record why specific modules were chosen

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
5. **Update Requirement Document**: Add story content to the requirement document itself

### 5. Branch Creation and Repository Operations

**Step 8: Create Feature Branches**

1. **Execute Git Operations**: Use `*git-branch` command to create actual feature branches
2. **Branch Naming**: Use convention `feature/{req-id}-{title}`
3. **Base Branch**: Create branches from `caas-release` branch in each repository
4. **Multi-Repository Coordination**: Create branches in all affected repositories
5. **Handle Existing Branches**: Switch to existing branches if they exist
6. **Repository Status**: Ensure all repositories are on correct branches
7. **Update Requirement Document**: Add branch URLs and repository information to requirement document

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
5. **Make Actual File Changes**: Modify actual repository files (Java, Python, Config)
6. **Commit Changes**: Use `*git-commit` to commit changes to feature branches
7. **Update Requirement Document**: Add implementation details and code changes to requirement document

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
6. **Update Requirement Document**: Add test cases, test results, and validation outcomes to requirement document

### 10. Documentation and Results

**Step 13: Database Operations**

1. **Create Database Views**:
   - Use `*create-views` command to create SQL views
   - Create input views (`child-input-*.sql`) for new data structures
   - Create output views (`child-output-*.sql`) for result data
   - Validate view syntax and functionality

2. **Setup Sync Operations**:
   - Use `*setup-sync` command to configure synchronization
   - Create sync configurations for data flow
   - Implement sync triggers and schedules
   - Test sync functionality

3. **Setup Export Operations**:
   - Use `*setup-export` command to configure exports
   - Create export configurations for multiple formats
   - Set up export destinations and schedules
   - Test export functionality

4. **Create Template Queries**:
   - Use `*create-template-queries` command to create reusable queries
   - Create parameterized query templates
   - Document template usage and parameters
   - Test template queries

5. **Update Database Schema**:
   - Use `*update-schema` command to modify database schema
   - Create migration scripts for schema changes
   - Add new columns, indexes, and constraints
   - Validate schema changes

6. **Update Database Configuration**:
   - Use `*update-db-config` command to update configuration files
   - Update `module_input.json` with new input configurations
   - Update `module_output.json` with new output configurations
   - Update `upload-files.json` with new file configurations

**Step 14: Push Changes**

1. **Push Feature Branches**: Use `*git-push` to push all feature branches to remote repositories
2. **Verify Remote Branches**: Confirm all branches are available on remote
3. **Update Branch URLs**: Add remote branch URLs to requirement document

**Step 15: Update Documentation**

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
- **All database operations completed**: views, sync, export, template queries, schema updates
- **Database configuration files updated**: module_input.json, module_output.json, upload-files.json
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
- **CRITICAL: Input Schema Registration**: If agent creates new input, MUST register it in SchemaProvider and Filename
- **CRITICAL: Input JSON Configuration**: If agent creates new input, MUST add it to input JSON in config
- **CRITICAL: Input Pattern Discovery**: If agent doesn't follow existing input registration pattern, STOP and check existing SchemaProvider, Filename, and input JSON patterns
- **CRITICAL: Output Sync Registration**: If agent creates new output, MUST register it in Util Output Sync Module
- **CRITICAL: Output CAAS JSON Configuration**: If agent creates new output, MUST add it to Output CAAS JSON
- **CRITICAL: Output Pattern Discovery**: If agent doesn't follow existing output registration pattern, STOP and check existing Util Output Sync Module and Output CAAS JSON patterns
- **CRITICAL: Database Operations Required**: If agent creates/modifies LoadAPIs, MUST create corresponding database operations (views, sync, export, template queries)
- **CRITICAL: View Creation**: If agent creates new LoadAPI, MUST create corresponding input/output views in irisx-config
- **CRITICAL: Sync Configuration**: If agent creates new LoadAPI, MUST configure sync operations for data flow
- **CRITICAL: Export Setup**: If agent creates new LoadAPI, MUST setup export operations for data delivery
- **CRITICAL: Template Queries**: If agent creates new LoadAPI, MUST create reusable query templates
- **CRITICAL: Schema Updates**: If agent creates new LoadAPI, MUST update database schema and configuration files

## Notes

- This task implements the complete BMAD ADS Automation workflow
- Follows BMAD agent specialization rules strictly
- Performs actual git operations and repository modifications
- Uses multi-stage repository crawling for accuracy
- Implements pattern-based requirement enhancement
- Maintains consistency across all three repositories
