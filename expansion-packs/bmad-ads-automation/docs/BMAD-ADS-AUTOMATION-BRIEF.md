# BMAD ADS Automation System - Project Brief

## Project Overview

**Project Name**: BMAD ADS (Automated Development System)  
**Framework**: BMAD (Breakthrough Method of Agile AI-driven Development)  
**Objective**: Automate development workflows across three interconnected repositories  
**Target**: Reduce development time from 2-3 days to 2 hours  

## Repository Architecture

### Core Repositories

#### 1. irisx-algo (Java/Spring Boot)
- **Purpose**: Core business logic and algorithms
- **Key Modules**: Distribution, Depletion, Allocation, Validation
- **Critical Components**:
  - `DistributionGroupModule.java` - Main distribution logic
  - `BaseDistributionData` - Data structures (100+ fields)
  - `AbstractAllocationModule` - Shared abstract classes
  - `BaseIterationRunner` - Iteration logic
  - 25+ validation modules

#### 2. ms-loadapis-ril-final (Python)
- **Purpose**: Data ingestion and load APIs
- **Key Components**:
  - Load APIs for data ingestion
  - Data processing pipelines
  - Schema validation
  - Input/output transformations

#### 3. irisx-config (Configuration/SQL)
- **Purpose**: Configuration, SQL views, and templates
- **Key Components**:
  - TSV input templates
  - SQL view definitions
  - Configuration files (module_input.json, module_output.json)
  - Export definitions

## Data Flow Architecture

```
Input Data → Load APIs (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

## Identified Change Patterns

### Pattern 1: New Column Addition
**Example**: Add "cover_days" column with formula `alloc_ttl/ros`
- **irisx-algo**: Add field to `BaseDistributionData`, update calculation logic
- **ms-loadapis-ril-final**: Update load API schemas
- **irisx-config**: Update TSV templates, SQL views, export definitions

### Pattern 2: New Input Creation
**Example**: Create "DISTRIBUTION ROS OVERRIDE" input
- **irisx-algo**: Add override field and logic to distribution modules
- **ms-loadapis-ril-final**: Create new load API (`StoreSkuRosOverrideLoadApi.py`)
- **irisx-config**: Create TSV template (`dist_input_store_sku_ros_override.tsv`)

### Pattern 3: Formula/Calculation Changes
**Example**: Dynamic quantity allocation for new launches
- **irisx-algo**: Modify allocation logic in `DistributionGroupModule`
- **ms-loadapis-ril-final**: Update data processing logic
- **irisx-config**: Update configuration parameters

### Pattern 4: New Module Creation
**Example**: MRP prediction module
- **irisx-algo**: Create new module classes
- **ms-loadapis-ril-final**: Create supporting load APIs
- **irisx-config**: Create configuration entries and SQL views

### Pattern 5: Override Mechanisms
**Example**: Store SKU ROS override
- **irisx-algo**: Add override fields and precedence logic
- **ms-loadapis-ril-final**: Create override load APIs
- **irisx-config**: Create override input templates

## Shared Dependencies and Complexity

### Critical Shared Components

#### Abstract Classes (High Impact)
- **AbstractAllocationModule**: Extended by 6 modules (Distribution, Depletion, etc.)
- **BaseIterationRunner**: Used by multiple iteration-based modules
- **BaseDistributionData**: Core data structure with 100+ fields

#### Shared Constants and Utilities
- **GenericConstants**: Common constants used across modules
- **DistributionConstants**: Distribution-specific constants
- **Validation utilities**: Shared validation logic

### Impact Analysis Strategy
1. **Override Strategy**: Add new abstract methods instead of modifying existing ones
2. **Signature Changes**: Require updates to all implementing classes
3. **Cascading Impact**: Changes in shared components affect multiple dependent modules

## System Requirements

### Functional Requirements

#### FR1: Requirement Analysis
- Parse requirement documents (markdown/text files)
- Extract requirement ID, title, description, technical specifications
- Identify affected repositories and modules
- Map business requirements to technical implementations

#### FR2: Repository Mapping
- Identify direct dependencies (modules that directly implement the requirement)
- Identify data dependencies (modules that consume/produce affected data)
- Identify configuration dependencies (modules that need config updates)
- Create comprehensive change list

#### FR3: Branch Management
- Create feature branches with consistent naming: `feature/{req-id}-{title}`
- Handle existing branches gracefully
- Ensure all repositories are on the correct branch

#### FR4: Code Implementation
- Modify Java classes with new fields and methods
- Create Python load APIs with proper schemas
- Create TSV templates and SQL views
- Update configuration files

#### FR5: Validation and Testing
- Run existing validation modules (25+ validations)
- Execute unit tests where available
- Validate data schemas and configurations
- Check for compilation errors

#### FR6: Documentation Updates
- Update requirement documents with implementation results
- Document all branches created and files modified
- Include git commit information
- Provide next steps and review instructions

### Non-Functional Requirements

#### Performance
- **Target**: Complete requirement implementation in 2 hours or less
- **Measurement**: End-to-end execution time

#### Reliability
- **Target**: 95%+ success rate in requirement implementation
- **Measurement**: Successful completion without manual intervention

#### Scalability
- **Target**: Handle 10+ concurrent requirements
- **Measurement**: System performance under concurrent load

## BMAD Framework Integration

**CRITICAL REQUIREMENT**: The system MUST follow BMAD framework patterns and learn from existing BMAD agents in `/Users/viratbansal/IdeaProjects/BMAD-METHOD-main/bmad-core`.

### Brownfield Development Approach
- **Use BMAD Brownfield Workflows**: Follow `brownfield-service.yaml` and `brownfield-fullstack.yaml` patterns
- **Document-First Strategy**: Use `document-project.md` task to analyze existing repositories
- **Agent Specialization**: Follow BMAD's agent specialization rules:
  - **ALWAYS use SM agent for story creation** - Never use orchestrator for implementation
  - **ALWAYS use Dev agent for implementation** - Never use orchestrator for coding
  - **Use specialized agents for planning**: PM, Architect, and UX Expert have tuned personas

### Actual Branch Creation and Repository Operations
- **Real Git Operations**: System MUST perform actual git operations, not simulations
- **Branch Naming Convention**: `feature/{req-id}-{title}` (following BMAD patterns)
- **Repository Coordination**: Handle existing branches gracefully, switch to existing branches if they exist
- **Claude/Cursor Integration**: Use Claude/Cursor for actual code modifications and file operations

### Template-Based Code Generation
- **Use Actual Templates**: Reference real templates from `bmad-core/templates/` to prevent hallucination
- **Story Template**: Use `story-tmpl.yaml` for requirement documentation
- **Architecture Template**: Use `architecture-tmpl.yaml` for technical specifications
- **Code Templates**: Create specific templates for Java, Python, and SQL code generation

### Actual Repository Templates and Patterns

#### Python Load API Templates (ms-loadapis-ril-final)
- **Base Load API**: `loadapi/common/abstract_loadapi.py` - Base class for all load APIs
- **Distribution Load APIs**: `loadapi/distribution/` - 25+ distribution-specific load APIs
- **Load API Pattern**: 
  ```python
  class DistributionStoreLoadApi(LoadApi):
      DIST_STORE_HEADER = ["store", {"flag": "distribution_enabled"}, "inward_flag", "outward_flag", "ist_group"]
      def __init__(self, parent, project, **kwargs):
          super().__init__(parent, project, header, key, optional_header, **kwargs)
  ```

#### Java Module Templates (irisx-algo)
- **Abstract Allocation Module**: `AbstractAllocationModule.java` - Base class for allocation modules
- **Distribution Allocation Module**: `DistributionAllocationModule.java` - Extends AbstractAllocationModule
- **Module Pattern**:
  ```java
  @Component("distributionAllocation")
  public class DistributionAllocationModule extends AbstractAllocationModule {
      @Autowired protected DistributionOutputUtility distributionOutputUtility;
      @Autowired protected Distribution distribution;
      @Autowired @Qualifier("distributionIterationRunner") protected DistributionIterationRunner iterationRunner;
  }
  ```

#### Configuration Templates (irisx-config)
- **TSV Input Templates**: `template/export_dist_input_*_template.tsv` - 100+ input templates
- **SQL View Creation**: `view-creation/child-input-*.sql` and `child-output-*.sql` - 200+ SQL views
- **Module Configuration**: `module_input.json` and `module_output.json` - Configuration files
- **TSV Template Pattern**:
  ```tsv
  store_id	sku_id	ros_override
  # Store ID - Unique identifier for the store
  # SKU ID - Unique identifier for the SKU
  # ROS Override - Manual override value for Rate of Sale
  ```
- **SQL View Pattern**:
  ```sql
  CREATE VIEW [input_dist_store] AS
  SELECT store, flag, inward_flag, outward_flag, COALESCE(ist_group, '') ist_group
  FROM OPENROWSET(BULK 'input/input_dist_store/**', DATA_SOURCE = '{{child}}', FORMAT = 'CSV')
  ```

## Agent Architecture (7 Agents)

### 1. ADS Orchestrator (Main Interface)
- **Role**: Primary user interface and workflow coordination
- **Commands**: `*implement`, `*analyze`, `*help`
- **Responsibilities**: Command processing, agent coordination, result aggregation

### 2. Analysis Agent
- **Role**: Requirement analysis and repository mapping
- **Responsibilities**: Parse requirements, identify affected modules, create change lists
- **Output**: Detailed technical specifications and repository mapping

### 3. Shared Dependency Agent
- **Role**: Analyze shared dependencies and impact
- **Responsibilities**: Identify shared class impacts, suggest override strategies
- **Output**: Dependency analysis and modification recommendations

### 4. Implementation Agent
- **Role**: Code generation and modification
- **Responsibilities**: Generate Java, Python, and SQL code
- **Output**: Modified source files with new functionality

### 5. Validation Agent
- **Role**: Quality assurance and testing
- **Responsibilities**: Run validations, execute tests, check schemas
- **Output**: Validation reports and test results

### 6. Repository Agent
- **Role**: Git operations and repository management
- **Responsibilities**: Branch creation, commits, repository operations
- **Output**: Git operations results and branch information

### 7. Documentation Agent
- **Role**: Documentation generation and updates
- **Responsibilities**: Update requirement documents, generate reports
- **Output**: Updated documentation with implementation details

## Workflow Architecture

### BMAD-Compliant Workflow
```
Requirement Document → Document Project → Analysis → Dependency Analysis → Story Creation → Implementation → Validation → Documentation
```

### Detailed Workflow Steps
1. **Document Project**: Use `document-project.md` task to analyze existing repositories
2. **Requirement Analysis**: Parse and analyze requirement documents
3. **Dynamic Repository Crawling**: Crawl through all three repositories to understand current state
4. **Dependency Analysis**: Identify shared dependencies and impact based on actual repository analysis
5. **Template Discovery**: Find existing templates and patterns in repositories
6. **Story Creation**: Use SM agent with `story-tmpl.yaml` for story creation
7. **Branch Creation**: Create actual git branches using real git operations
8. **Pre-Implementation Crawling**: Crawl repositories again before implementation to ensure accuracy
9. **Implementation**: Use Dev agent for actual code modifications based on discovered patterns
10. **Validation**: Run existing validation modules and tests
11. **Documentation**: Update requirement documents with results

### BMAD Agent Integration
- **PM Agent**: For requirement analysis and PRD creation
- **Architect Agent**: For technical architecture and dependency analysis
- **SM Agent**: For story creation (MANDATORY - never use orchestrator)
- **Dev Agent**: For implementation (MANDATORY - never use orchestrator)
- **QA Agent**: For validation and testing
- **Analyst Agent**: For project documentation and analysis

## Implementation Strategy

### Phase 1: BMAD Integration and Core Infrastructure
1. **Study Existing BMAD Agents**: Analyze `/Users/viratbansal/IdeaProjects/BMAD-METHOD-main/bmad-core` agents
2. **Implement BMAD Workflows**: Follow `brownfield-service.yaml` and `brownfield-fullstack.yaml` patterns
3. **Create BMAD Extension Pack**: Set up proper BMAD extension pack structure
4. **Implement Document Project Task**: Use `document-project.md` for repository analysis
5. **Create Agent Definitions**: Follow BMAD agent patterns and specialization rules

### Phase 2: Template-Based Code Generation
1. **Study BMAD Templates**: Analyze `story-tmpl.yaml`, `architecture-tmpl.yaml` patterns
2. **Create Code Templates**: Develop Java, Python, and SQL templates based on actual patterns
3. **Implement Template Processing**: Use BMAD template processing system
4. **Prevent Hallucination**: Reference actual templates and patterns, not generated ones

### Phase 3: Real Repository Operations
1. **Implement Actual Git Operations**: Real branch creation, commits, and repository operations
2. **Claude/Cursor Integration**: Use Claude/Cursor for actual file modifications
3. **Repository Coordination**: Handle multi-repository operations with proper error handling
4. **Branch Management**: Implement proper branch naming and existing branch handling

### Phase 4: Validation and Testing
1. **Integrate Existing Validation**: Use actual validation modules from repositories
2. **Implement Test Execution**: Run real tests and validation
3. **Schema Validation**: Validate against actual schemas and configurations
4. **Error Handling and Recovery**: Implement robust error handling with rollback capabilities

### Phase 5: Documentation and Integration
1. **Implement Document Updates**: Update actual requirement documents with results
2. **Add Comprehensive Logging**: Track all operations and results
3. **Create Monitoring and Reporting**: Monitor system performance and success rates
4. **Performance Optimization**: Optimize for 2-hour target completion time

## Risk Assessment

### High Risk
- **Shared Class Modifications**: Changes to abstract classes can break multiple modules
- **Schema Synchronization**: Inconsistencies between Java, Python, and SQL schemas
- **Validation Failures**: Complex validation rules may fail with new implementations

### Medium Risk
- **Repository Coordination**: Ensuring all repositories are in sync
- **Performance**: Large requirements may take longer than 2-hour target
- **Error Recovery**: Handling partial failures in multi-repository operations

### Low Risk
- **Documentation Updates**: Straightforward file modification
- **Branch Management**: Standard git operations
- **Basic Code Generation**: Template-based code creation

## Success Criteria

### Primary Success Criteria
1. **Functional**: System successfully implements 80% of typical requirements
2. **Performance**: Average implementation time under 2 hours
3. **Quality**: 95%+ success rate without manual intervention
4. **Usability**: Single command execution for complete workflow

### Secondary Success Criteria
1. **Extensibility**: Easy to add new requirement patterns
2. **Maintainability**: Clear code structure and documentation
3. **Reliability**: Robust error handling and recovery
4. **Integration**: Seamless integration with existing development workflow

## Technical Implementation Details

### Repository Paths
```javascript
const REPOSITORIES = {
  'irisx-algo': '/Users/viratbansal/IdeaProjects/irisx-algo',
  'ms-loadapis-ril-final': '/Users/viratbansal/IdeaProjects/ms-loadapis-ril-final',
  'irisx-config': '/Users/viratbansal/IdeaProjects/irisx-config',
};
```

### BMAD Template References (Prevent Hallucination)
**CRITICAL**: Always reference actual templates from `/Users/viratbansal/IdeaProjects/BMAD-METHOD-main/bmad-core/templates/`:

#### Story Template
- **File**: `story-tmpl.yaml`
- **Usage**: For requirement documentation and story creation
- **Key Sections**: Status, Story, Acceptance Criteria, Tasks/Subtasks, Dev Notes, Testing, Change Log

#### Architecture Template
- **File**: `architecture-tmpl.yaml`
- **Usage**: For technical architecture and dependency analysis
- **Key Sections**: Introduction, High Level Architecture, Technical Summary, Project Diagram

#### Document Project Task
- **File**: `document-project.md`
- **Usage**: For analyzing existing repositories
- **Key Features**: Project structure discovery, technology stack identification, existing documentation review

### Key Implementation Functions
1. **Requirement Parsing**: Extract structured data from markdown files using BMAD patterns
2. **Repository Crawling**: Dynamic analysis of all three repositories at multiple stages
3. **Branch Creation**: Consistent naming (`feature/{req-id}-{title}`) and error handling
4. **Code Modification**: Template-based code generation using actual patterns found during crawling
5. **Validation**: Integration with existing validation modules from repositories
6. **Documentation**: Automated document updates following BMAD documentation patterns

## Repository Crawling Requirements

### CRITICAL: Dynamic Repository Analysis
**The system MUST crawl through repositories at multiple stages to ensure accuracy and completeness.**

#### Stage 1: Initial Repository Crawling (Analysis Phase)
- **Purpose**: Understand current repository state and patterns
- **When**: After requirement analysis, before dependency analysis
- **What to Crawl**:
  - **irisx-algo**: All Java modules, abstract classes, data structures, constants
  - **ms-loadapis-ril-final**: All load API classes, common utilities, constants
  - **irisx-config**: All TSV templates, SQL views, configuration files
- **Output**: Current repository state map with all existing patterns and templates

#### Stage 2: Pre-Implementation Crawling (Implementation Phase)
- **Purpose**: Ensure implementation follows actual existing patterns
- **When**: Before code generation, after branch creation
- **What to Crawl**:
  - **Specific modules** identified for changes
  - **Related modules** that might be affected
  - **Existing templates** and patterns to follow
  - **Shared classes** and their current implementations
- **Output**: Implementation patterns and templates to follow

#### Stage 3: Validation Crawling (Validation Phase)
- **Purpose**: Verify changes against existing validation patterns
- **When**: After implementation, before final validation
- **What to Crawl**:
  - **Validation modules** related to changes
  - **Test patterns** and existing test structures
  - **Configuration validation** patterns
- **Output**: Validation patterns and test structures to follow

### Crawling Implementation Strategy
1. **Use BMAD Document Project Task**: Leverage `document-project.md` for comprehensive analysis
2. **File System Analysis**: Use file system tools to discover actual file structures
3. **Code Pattern Analysis**: Analyze actual code patterns, not assumptions
4. **Template Discovery**: Find and analyze existing templates in each repository
5. **Dependency Mapping**: Map actual dependencies between modules and files
6. **Configuration Analysis**: Analyze actual configuration files and their structures

### Error Handling Strategy
1. **Graceful Degradation**: Continue with partial success
2. **Rollback Capability**: Revert changes on failure
3. **Comprehensive Logging**: Track all operations and errors
4. **User Notification**: Clear error messages and next steps

## Future Enhancements

### Phase 2 Features
- Integration with Notion for requirement management
- Advanced ML-based requirement analysis
- Automated testing generation
- Performance monitoring and optimization

### Phase 3 Features
- Multi-environment support (dev, staging, prod)
- Advanced rollback capabilities
- Integration with CI/CD pipelines
- Real-time collaboration features

## Conclusion

The BMAD ADS Automation System represents a significant advancement in automated development workflows. By leveraging the BMAD framework and understanding the complex interdependencies between the three repositories, the system can dramatically reduce development time while maintaining code quality and consistency.

The key to success lies in the careful analysis of shared dependencies, robust validation mechanisms, and comprehensive error handling. With proper implementation, this system can transform the development process from a manual, error-prone workflow to an automated, reliable, and efficient process.

## Next Steps

1. **Review and Approve**: Review this brief and approve the approach
2. **Environment Setup**: Set up development environment and repositories
3. **Agent Development**: Begin development of the 7 agents
4. **Testing and Validation**: Implement comprehensive testing
5. **Deployment**: Deploy and integrate with existing workflow
