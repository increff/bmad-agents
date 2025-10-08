<!-- Powered by BMAD™ Core -->

# Crawl Repositories - Multi-Stage Repository Analysis

## Purpose

Perform comprehensive repository crawling across three interconnected repositories to understand current state, patterns, and dependencies for accurate implementation planning.

## Task Instructions

### 1. Repository Crawling Strategy

**CRITICAL:** This task implements the multi-stage repository crawling strategy defined in the PRD.

**Three-Stage Crawling Process:**

1. **Stage 1: Initial Repository Crawling (Analysis Phase)**
2. **Stage 2: Pre-Implementation Crawling (Implementation Phase)**
3. **Stage 3: Validation Crawling (Validation Phase)**

### 2. Stage 1: Initial Repository Crawling (Analysis Phase)

**Purpose**: Understand current repository state and patterns
**When**: After requirement analysis, before dependency analysis

#### 2.1 Crawl irisx-algo Repository

**Target Directory**: `{ALGO_REPO_PATH}`

**What to Crawl:**

1. **Java Module Structure**:
   - `src/main/java/com/increff/irisx/module/` - All module directories
   - `src/main/java/com/increff/irisx/module/distribution/` - Distribution modules
   - `src/main/java/com/increff/irisx/module/distributionCommons/` - Shared distribution components
   - `src/main/java/com/increff/irisx/module/validation/` - Validation modules

2. **Abstract Classes and Shared Components**:
   - `AbstractAllocationModule.java` - Base class for allocation modules
   - `BaseIterationRunner.java` - Base class for iteration runners
   - `BaseDistributionData.java` - Core data structure with 100+ fields
   - `BaseHelper.java` - Shared helper utilities

3. **Data Structures**:
   - `src/main/java/com/increff/irisx/row/input/` - Input data structures
   - `src/main/java/com/increff/irisx/row/output/` - Output data structures
   - `src/main/java/com/increff/irisx/module/distribution/data/` - Distribution data classes

4. **Constants and Configuration**:
   - `src/main/java/com/increff/irisx/constants/` - Application constants
   - `src/main/java/com/increff/irisx/constants/distribution/` - Distribution constants
   - `src/main/java/com/increff/irisx/constants/GenericConstants.java` - Generic constants

**Output**: Current Java module state map with all existing patterns and templates

#### 2.2 Crawl ms-loadapis-ril-final Repository

**Target Directory**: `{LOADAPIS_REPO_PATH}`

**What to Crawl:**

1. **Load API Structure**:
   - `loadapi/common/` - Base classes and utilities
   - `loadapi/distribution/` - Distribution-specific load APIs
   - `loadapi/constant/` - Constants and error messages

2. **Base Classes**:
   - `loadapi/common/abstract_loadapi.py` - Base class for all load APIs
   - `loadapi/common/abstract_integration_api.py` - Base class for integration APIs
   - `loadapi/common/ValidationUtil.py` - Validation utilities
   - `loadapi/common/ConversionUtil.py` - Conversion utilities

3. **Distribution Load APIs**:
   - All files in `loadapi/distribution/` directory
   - Pattern analysis of load API implementations
   - Header definitions and key structures

4. **Constants and Utilities**:
   - `loadapi/constant/DistributionConstants.py` - Distribution constants
   - `loadapi/constant/ValidationUtilConstants.py` - Validation constants
   - `loadapi/constant/MsgErrors.py` - Error messages

**Output**: Current Python load API state map with all existing patterns and templates

#### 2.3 Crawl irisx-config Repository

**Target Directory**: `{CONFIG_REPO_PATH}`

**What to Crawl:**

1. **TSV Templates**:
   - `template/` directory - All 100+ TSV templates
   - `template/export_dist_*_template.tsv` - Distribution templates
   - Header patterns and comment conventions
   - Naming conventions and structure patterns

2. **SQL Views**:
   - `view-creation/` directory - All 200+ SQL views
   - `view-creation/child-input-*.sql` - Input views
   - `view-creation/child-output-*.sql` - Output views
   - SQL patterns and naming conventions

3. **Configuration Files**:
   - `module_input.json` - Input configuration
   - `module_output.json` - Output configuration
   - `upload-files.json` - File upload configuration
   - Configuration patterns and structures

4. **Sync and Export**:
   - `sync/` directory - Synchronization logic
   - `export/` directory - Export configurations
   - Integration patterns and dependencies

**Output**: Current configuration state map with all existing patterns and templates

### 3. Stage 2: Pre-Implementation Crawling (Implementation Phase)

**Purpose**: Ensure implementation follows actual existing patterns
**When**: Before code generation, after branch creation

#### 3.1 Crawl Specific Modules

**Target**: Modules identified for changes in Stage 1

**What to Crawl:**

1. **Specific Module Files**:
   - Exact files that need modification
   - Current implementation patterns
   - Method signatures and structures
   - Dependencies and imports

2. **Related Modules**:
   - Modules that might be affected by changes
   - Shared class implementations
   - Data structure usage patterns
   - Integration points

3. **Existing Templates**:
   - Templates that need to be followed
   - Code generation patterns
   - Configuration patterns
   - Validation patterns

**Output**: Implementation patterns and templates to follow

### 4. Stage 3: Validation Crawling (Validation Phase)

**Purpose**: Verify changes against existing validation patterns
**When**: After implementation, before final validation

#### 4.1 Crawl Validation Patterns

**What to Crawl:**

1. **Validation Modules**:
   - `irisx-algo/src/main/java/com/increff/irisx/module/validation/` - All validation modules
   - Validation patterns and structures
   - Error handling patterns
   - Test patterns

2. **Test Structures**:
   - `irisx-algo/src/test/` - Test directory structure
   - `ms-loadapis-ril-final/loadapitest/` - Load API tests
   - Test patterns and conventions
   - Validation test patterns

3. **Configuration Validation**:
   - Configuration validation patterns
   - Schema validation patterns
   - Data validation patterns
   - Integration validation patterns

**Output**: Validation patterns and test structures to follow

### 5. Pattern Analysis and Classification

#### 5.1 Structural Patterns

- File organization patterns
- Naming convention patterns
- Directory structure patterns
- Module organization patterns

#### 5.2 Code Patterns

- Java coding patterns
- Python coding patterns
- Design pattern usage
- Architectural patterns

#### 5.3 Data Patterns

- Data flow patterns
- Schema patterns
- Transformation patterns
- Validation patterns

#### 5.4 Configuration Patterns

- Configuration file patterns
- Parameter patterns
- Environment patterns
- Integration patterns

#### 5.5 Validation Patterns

- Validation rule patterns
- Error handling patterns
- Testing patterns
- Quality assurance patterns

### 6. Output Generation

#### 6.1 Repository State Map

- Current state of all three repositories
- All existing patterns and templates
- Dependencies and relationships
- Configuration structures

#### 6.2 Pattern Classification

- Structural patterns identified
- Code patterns identified
- Data patterns identified
- Configuration patterns identified
- Validation patterns identified

#### 6.3 Implementation Guidance

- Specific patterns to follow
- Templates to use
- Dependencies to consider
- Validation requirements
- Testing requirements

## Success Criteria

- All three repositories crawled comprehensively
- All existing patterns identified and classified
- All templates and structures documented
- All dependencies mapped
- All validation patterns identified
- Repository state map generated
- Pattern classification completed
- Implementation guidance provided

## Error Handling

- **Repository Access Issues**: Handle repository access problems gracefully
- **File Permission Issues**: Handle file permission problems
- **Pattern Recognition Issues**: Handle pattern recognition failures
- **Dependency Mapping Issues**: Handle dependency mapping problems
- **Configuration Issues**: Handle configuration parsing problems

## Notes

- This task implements the multi-stage repository crawling strategy from the PRD
- Uses actual file system analysis to discover real patterns
- Prevents hallucination by analyzing actual code
- Provides comprehensive understanding for accurate implementation
- Supports pattern-based requirement enhancement
- Enables template-based code generation
