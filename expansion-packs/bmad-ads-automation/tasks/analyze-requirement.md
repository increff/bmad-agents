# Analyze Requirement Task - Comprehensive Analysis & Change Identification

## Purpose

Comprehensively analyze requirement documents, crawl all repositories, identify ALL changes required, and create detailed implementation plans. This analysis phase determines exactly what will be modified before any implementation begins.

## Steps

### 1. Requirement Analysis & Understanding

1. **Read and Understand Requirement**:

   ```bash
   # Read the requirement document
   cat $REQUIREMENT_FILE
   ```

2. **Parse Requirement Details**:
   - **Requirement ID**: Extract requirement identifier
   - **Title**: Extract requirement title
   - **Description**: Parse detailed description
   - **Technical Requirements**: Identify specific technical needs
   - **Business Logic**: Extract business rules and calculations
   - **Data Requirements**: Identify input/output data structures
   - **Integration Points**: Identify cross-module or external integrations

3. **Requirement Classification**:
   - **Change Type**: NEW TABLE/DATA STRUCTURE, NEW MODULE/SUBMODULE, UPDATE EXISTING LOGIC, MODIFY EXISTING, NEW COLUMN/FIELD, DELETE/REMOVE, INTEGRATION, PERFORMANCE, VALIDATION, REPORTING, CONFIGURATION, TESTING
   - **Complexity Level**: Simple, Medium, Complex, Cross-Repository
   - **Impact Scope**: Single Module, Multiple Modules, Cross-Repository, System-Wide

### 2. Comprehensive Repository Crawling - Stage 1

**CRITICAL**: This comprehensive crawling identifies ALL changes that will be required before implementation begins.

#### **A. Algorithm Repository (irisx-algo) Crawling**

1. **Module Structure Analysis**:

   ```bash
   # Find relevant modules based on requirement keywords
   grep -r "distribution\|iss\|otb\|eoss\|allocation\|depletion" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/module/ | head -20

   # Analyze module structure and inheritance
   find $ALGO_REPO_PATH/src/main/java/com/increff/irisx/module/ -name "*.java" | xargs grep -l "extends\|implements"

   # Check abstract classes and shared dependencies
   grep -r "AbstractAllocationModule\|BaseIterationRunner\|AbstractUtilModuleGroup" $ALGO_REPO_PATH/src/main/java/
   ```

2. **Data Structure Analysis**:

   ```bash
   # Find Row classes and data structures
   find $ALGO_REPO_PATH/src/main/java/com/increff/irisx/ -name "*Row.java" | head -10

   # Find File classes and data structures
   find $ALGO_REPO_PATH/src/main/java/com/increff/irisx/ -name "*File.java" | head -10

   # Analyze existing data patterns
   grep -r "private.*String\|private.*Integer\|private.*Double" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/module/ | head -20
   ```

3. **Registration Pattern Analysis**:

   ```bash
   # Check ModuleProvider patterns
   grep -r "ModuleProvider\|ModuleName\|ValidationModuleNames" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/

   # Check SchemaProvider and FileName patterns
   grep -r "SchemaProvider\|FileName" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/

   # Check Args classes and constants
   find $ALGO_REPO_PATH/src/main/java/com/increff/irisx/ -name "*Args.java" | head -10
   find $ALGO_REPO_PATH/src/main/java/com/increff/irisx/ -name "*Constants.java" | head -10
   ```

#### **B. LoadAPI Repository (ms-loadapis-ril-final) Crawling**

1. **LoadAPI Structure Analysis**:

   ```bash
   # Find LoadAPI classes and inheritance patterns
   find $LOADAPI_REPO_PATH/loadapi/ -name "*.py" | xargs grep -l "LoadApi\|IntegrationLoadApi"

   # Check LoadAPI provider patterns
   grep -r "loadapi_provider\|__init__.py" $LOADAPI_REPO_PATH/loadapi/

   # Analyze existing LoadAPI patterns
   find $LOADAPI_REPO_PATH/loadapi/ -name "*.py" | xargs grep -l "pre_validate_initializer\|validate_row"
   ```

2. **Validation and Error Handling Analysis**:

   ```bash
   # Check MsgErrors and validation patterns
   find $LOADAPI_REPO_PATH/ -name "MsgErrors.py" | xargs cat

   # Analyze validation methods
   grep -r "def validate\|def pre_validate" $LOADAPI_REPO_PATH/loadapi/ | head -20

   # Check constants and configuration
   find $LOADAPI_REPO_PATH/ -name "constants.py" | xargs cat
   ```

#### **C. Configuration Repository (irisx-config) Crawling**

1. **Template and View Analysis**:

   ```bash
   # Check TSV templates
   ls $CONFIG_REPO_PATH/template/ | grep -E "(export|child-input|child-output|parent-input|interim)"

   # Check SQL views
   find $CONFIG_REPO_PATH/ -name "*.sql" | head -10

   # Analyze template patterns
   find $CONFIG_REPO_PATH/template/ -name "*.tsv" | head -5 | xargs head -3
   ```

2. **Configuration File Analysis**:

   ```bash
   # Check JSON configuration files
   find $CONFIG_REPO_PATH/ -name "module_input.json" -o -name "module_output.json" -o -name "upload-files.json" | head -10

   # Analyze configuration patterns
   find $CONFIG_REPO_PATH/ -name "*.json" | head -5 | xargs cat
   ```

### 3. Pattern Discovery and Classification

#### **A. Algorithm Repository Patterns**

1. **Module Registration Patterns**:
   - ModuleProvider registration with ModuleName and ValidationModuleNames
   - File registration with FileName and SchemaProvider
   - Args class patterns for module parameters
   - Constants class patterns for module-specific constants

2. **Data Structure Patterns**:
   - Row class patterns with private fields and getters/setters
   - File class patterns for data file handling
   - Validation patterns in data classes
   - Business logic patterns in GroupModule and AbstractUtilModuleGroup

3. **Inheritance Patterns**:
   - AbstractAllocationModule inheritance patterns
   - BaseIterationRunner usage patterns
   - Shared utility class patterns

#### **B. LoadAPI Repository Patterns**

1. **LoadAPI Registration Patterns**:
   - **init**.py file patterns for module registration
   - loadapi_provider.py patterns for provider registration
   - MsgErrors.py patterns for error handling

2. **LoadAPI Structure Patterns**:
   - LoadApi and IntegrationLoadApi inheritance patterns
   - pre_validate_initializer method patterns
   - validate_row method patterns
   - Constants and configuration patterns

#### **C. Configuration Repository Patterns**

1. **SQL View Patterns**:
   - child-input, child-output, parent-input, interim view patterns
   - OPENROWSET and BULK file reading patterns
   - Database operation patterns

2. **Template Patterns**:
   - TSV format and export naming conventions
   - Template structure and column patterns
   - Export file naming patterns

3. **JSON Configuration Patterns**:
   - module_input.json, module_output.json, upload-files.json patterns
   - Configuration structure and naming conventions
   - Database configuration patterns

### 4. Dependency Analysis and Impact Assessment

#### **A. Shared Dependency Analysis**

1. **Identify Shared Classes**:

   ```bash
   # Find abstract classes and shared dependencies
   grep -r "AbstractAllocationModule\|BaseIterationRunner\|AbstractUtilModuleGroup" $ALGO_REPO_PATH/src/main/java/

   # Map all modules that extend shared classes
   grep -r "extends AbstractAllocationModule\|extends BaseIterationRunner" $ALGO_REPO_PATH/src/main/java/
   ```

2. **Impact Assessment**:
   - **Direct Dependencies**: Modules that directly implement the requirement
   - **Data Dependencies**: Modules that consume/produce affected data
   - **Configuration Dependencies**: Modules that need config updates
   - **Cascading Impact**: Secondary and tertiary impacts of changes

#### **B. Cross-Repository Dependency Mapping**

1. **Data Flow Dependencies**:
   - Algorithm → LoadAPI data flow patterns
   - LoadAPI → Configuration data flow patterns
   - Configuration → Algorithm data flow patterns

2. **Registration Dependencies**:
   - Module registration dependencies across repositories
   - File registration dependencies across repositories
   - Configuration registration dependencies across repositories

### 5. Detailed Change Identification

#### **A. Algorithm Repository Changes**

1. **Module Changes**:
   - **New Modules**: Identify if new modules need to be created
   - **Existing Module Modifications**: Identify specific files to modify
   - **Registration Updates**: Identify ModuleProvider, SchemaProvider, FileName updates needed

2. **Data Structure Changes**:
   - **New Row Classes**: Identify new data classes needed
   - **New File Classes**: Identify new file handling classes needed
   - **Existing Class Modifications**: Identify fields to add/modify/remove

3. **Business Logic Changes**:
   - **New Methods**: Identify new methods to implement
   - **Modified Methods**: Identify existing methods to modify
   - **New Calculations**: Identify new business logic to implement

#### **B. LoadAPI Repository Changes**

1. **LoadAPI Changes**:
   - **New LoadAPI Classes**: Identify new LoadAPI classes needed
   - **Existing LoadAPI Modifications**: Identify LoadAPI classes to modify
   - **Registration Updates**: Identify **init**.py and loadapi_provider.py updates

2. **Validation Changes**:
   - **New Validation Methods**: Identify new validation logic needed
   - **Modified Validation**: Identify existing validation to modify
   - **Error Handling Updates**: Identify MsgErrors.py updates needed

#### **C. Configuration Repository Changes**

1. **Template Changes**:
   - **New TSV Templates**: Identify new templates needed
   - **Modified Templates**: Identify existing templates to modify
   - **Export File Updates**: Identify export file changes needed

2. **SQL View Changes**:
   - **New SQL Views**: Identify new views needed
   - **Modified Views**: Identify existing views to modify
   - **Database Schema Updates**: Identify schema changes needed

3. **Configuration File Changes**:
   - **JSON Config Updates**: Identify module_input.json, module_output.json, upload-files.json updates
   - **New Configuration Files**: Identify new configuration files needed

### 6. Implementation Plan Creation

#### **A. Change Summary**

1. **Repository Impact Summary**:
   - **Algorithm Repository**: List all files to be created/modified/deleted
   - **LoadAPI Repository**: List all files to be created/modified/deleted
   - **Configuration Repository**: List all files to be created/modified/deleted

2. **Change Complexity Assessment**:
   - **Simple Changes**: Single file modifications
   - **Medium Changes**: Multiple file modifications in single repository
   - **Complex Changes**: Cross-repository changes
   - **System-Wide Changes**: Changes affecting multiple modules

#### **B. Implementation Strategy**

1. **Implementation Order**:
   - **Phase 1**: Algorithm repository changes (core business logic)
   - **Phase 2**: LoadAPI repository changes (data loading)
   - **Phase 3**: Configuration repository changes (templates and views)
   - **Phase 4**: Integration testing and validation

2. **Risk Assessment**:
   - **Low Risk**: Simple additions without breaking changes
   - **Medium Risk**: Modifications to existing functionality
   - **High Risk**: Changes to shared classes or core functionality

3. **Testing Strategy**:
   - **Unit Tests**: Tests for new methods and classes
   - **Integration Tests**: Tests for cross-repository integration
   - **Validation Tests**: Tests for data validation and business logic
   - **Regression Tests**: Tests to ensure no existing functionality is broken

### 7. Final Analysis Report

#### **A. Comprehensive Change List**

1. **Detailed File Changes**:
   - **Algorithm Repository**: Complete list of files to create/modify/delete with specific changes
   - **LoadAPI Repository**: Complete list of files to create/modify/delete with specific changes
   - **Configuration Repository**: Complete list of files to create/modify/delete with specific changes

2. **Dependency Impact**:
   - **Affected Modules**: List of all modules that will be impacted
   - **Shared Class Impact**: Impact on abstract classes and shared utilities
   - **Cross-Repository Impact**: Impact on data flow and integration points

3. **Implementation Requirements**:
   - **New Classes**: List of all new classes to be created
   - **Modified Classes**: List of all existing classes to be modified
   - **New Methods**: List of all new methods to be implemented
   - **Modified Methods**: List of all existing methods to be modified

#### **B. Validation and Testing Plan**

1. **Pre-Implementation Validation**:
   - **Pattern Compliance**: Ensure all changes follow established patterns
   - **Dependency Validation**: Ensure all dependencies are correctly identified
   - **Syntax Validation**: Ensure all code will compile successfully

2. **Post-Implementation Testing**:
   - **Unit Testing**: Comprehensive unit tests for all new functionality
   - **Integration Testing**: Tests for cross-repository integration
   - **Validation Testing**: Tests for data validation and business logic
   - **Regression Testing**: Tests to ensure no existing functionality is broken

## Output

The output of this comprehensive analysis includes:

1. **Complete Change Identification**: Detailed list of ALL files that will be created, modified, or deleted
2. **Dependency Analysis**: Complete analysis of all dependencies and impacts
3. **Pattern Compliance**: Verification that all changes follow established patterns
4. **Implementation Plan**: Detailed step-by-step implementation plan
5. **Risk Assessment**: Assessment of implementation risks and mitigation strategies
6. **Testing Strategy**: Comprehensive testing plan for validation
7. **Validation Checklist**: Checklist to ensure all changes are properly implemented

## Integration

This comprehensive analysis phase integrates with the VIRAT agent to provide complete visibility into what changes will be made before any implementation begins, ensuring accurate and predictable development workflows.

### 3. Implementation Type Determination

**Determine the primary implementation type from these options:**

       - **NEW TABLE/DATA STRUCTURE**: Create new data classes, LoadAPIs, SQL views, templates
       - **NEW MODULE/SUBMODULE**: Create entirely new modules with complete structure
       - **UPDATE EXISTING LOGIC**: Modify existing business logic, formulas, calculations without creating new files
       - **MODIFY EXISTING**: Edit existing files to add fields, columns, or functionality
       - **NEW COLUMN/FIELD**: Add new fields to existing data structures with formulas/calculations
       - **DELETE/REMOVE**: Remove files or functionality
       - **INTEGRATION**: Cross-module or system integration requirements
       - **PERFORMANCE**: Optimization and scalability requirements
       - **VALIDATION**: Input/output validation requirements
       - **REPORTING**: Report generation and export requirements
       - **CONFIGURATION**: System and business configuration requirements
       - **TESTING**: Unit, integration, and end-to-end testing requirements
       - **CONSTANTS/CONFIGURATION**: Module constants, system configurations, configuration files
       - **PROVIDER/UTILITY**: Provider classes, utility functions, context management
       - **VIEW/TEMPLATE**: SQL views, export templates, interim calculations
       - **MASTER DATA**: Master data structures, reference data, lookup tables
       - **TRANSACTIONAL DATA**: Transaction data, sales data, inventory data
       - **ANALYSIS/REPORTING**: Analysis data structures, reporting outputs, business intelligence

### 4. Step Selection from Comprehensive List

**Use `comprehensive-implementation-steps.md` to intelligently select which steps are needed:**

1. **Analyze Requirement Context**:
   - What files need to be created/modified/deleted?
   - What modules are involved?
   - What data structures are affected?
   - What business logic needs to be implemented?

2. **Select Relevant Steps Based on Actual Impact**:
   - **Module Analysis & Identification**: Always needed
   - **Data Structure Operations**: If data structures need to be created, modified, or deleted (Row classes, File classes, FileName constants, SchemaProvider registration)
   - **Module Structure Operations**: If new modules need to be created or existing modules restructured
   - **Validation Operations**: If validation rules need to be added, modified, or removed (most operations require validation)
   - **LoadAPI Operations**: If data loading, processing, or integration logic needs changes (LoadAPI classes, provider registration, constants, validation)
   - **Configuration Operations**: If SQL views, templates, or configuration files need changes (child-input/output views, TSV templates, JSON configs)
   - **Registration Operations**: If new components need to be registered in providers or constants (ModuleProvider, ModuleName, ValidationModuleNames)
   - **Business Logic Operations**: If business logic, calculations, or processing rules need changes
   - **Integration Operations**: If cross-module or external system integration is needed
   - **Performance Operations**: If performance optimization or monitoring is needed
   - **Reporting Operations**: If reporting functionality needs to be added or modified
   - **Testing Operations**: If new tests need to be created or existing tests modified
   - **Cleanup Operations**: If obsolete files, configurations, or code need to be removed
   - **Validation & Testing**: Always needed
   - **Documentation Operations**: Always needed

3. **Context-Driven Selection Examples**:
   - **"Add new field to existing table"**: Steps 1, 2, 4, 6, 8, 14, 15
   - **"Update calculation formula"**: Steps 1, 4, 8, 14, 15
   - **"Add new input file"**: Steps 1, 2, 4, 5, 6, 7, 14, 15
   - **"Create new module"**: Steps 1, 2, 3, 4, 5, 6, 7, 14, 15
   - **"Update existing logic"**: Steps 1, 4, 8, 14, 15 (plus others based on what actually changes)
   - **"Remove obsolete functionality"**: Steps 1, 13, 14, 15

### 5. File Impact Analysis

1. **Identify Files to Modify**:

   ```bash
   # Check for references to files being modified
   for file in $(find $REPO_PATH $LOADAPI_PATH $CONFIG_PATH -name "*{MODULE_NAME}*" -type f); do
     grep -r "$(basename $file)" $REPO_PATH/ $LOADAPI_PATH/ $CONFIG_PATH/
   done
   ```

2. **Check File Existence**:
   ```bash
   # Verify target files exist before deciding on create vs update operations
   ls -la $REPO_PATH/src/main/java/com/increff/irisx/module/{MODULE_NAME}/
   ls -la $LOADAPI_PATH/loadapi/{MODULE_NAME}/
   ls -la $CONFIG_PATH/template/export_{MODULE_NAME}_*
   ```

### 6. Comprehensive Pattern Recognition

1. **Algorithm Repository Patterns**:

   ```bash
   # Module registration patterns
   find $REPO_PATH -name "ModuleProvider.java" -exec cat {} \;
   find $REPO_PATH -name "ModuleName.java" -exec cat {} \;
   find $REPO_PATH -name "ValidationModuleNames.java" -exec cat {} \;

   # File registration patterns
   find $REPO_PATH -name "SchemaProvider.java" -exec cat {} \;
   find $REPO_PATH -name "FileName.java" -exec cat {} \;

   # Data structure patterns
   find $REPO_PATH -name "*Row.java" | head -5
   find $REPO_PATH -name "*File.java" | head -5
   ```

2. **LoadAPI Repository Patterns**:

   ```bash
   # LoadAPI registration patterns
   find $LOADAPI_PATH -name "__init__.py" -exec cat {} \;
   find $LOADAPI_PATH -name "loadapi_provider.py" -exec cat {} \;

   # LoadAPI structure patterns
   find $LOADAPI_PATH -name "*LoadApi.py" | head -5
   find $LOADAPI_PATH -name "*IntegrationApi.py" | head -5

   # Constants patterns
   find $LOADAPI_PATH -name "MsgErrors.py" -exec cat {} \;
   ```

3. **Configuration Repository Patterns**:

   ```bash
   # SQL view patterns
   ls $CONFIG_PATH/view-creation/ | grep -E "(child-input|child-output|parent-input|interim)"

   # Template patterns
   ls $CONFIG_PATH/template/ | grep -E "export.*template"

   # JSON configuration patterns
   cat $CONFIG_PATH/module_input.json | head -20
   cat $CONFIG_PATH/module_output.json | head -20
   cat $CONFIG_PATH/upload-files.json | head -20
   ```

4. **Cross-Repository Integration Patterns**:
   - **Data Flow**: How data flows between Algorithm, LoadAPI, and Config repositories
   - **Registration Dependencies**: What needs to be registered in each repository
   - **Naming Conventions**: Consistent naming across repositories
   - **Error Handling**: Validation and error handling patterns

### 7. Implementation Plan Creation

1. **Create Step-by-Step Plan**:
   - List selected steps from comprehensive-implementation-steps.md
   - Order steps logically (dependencies first)
   - Add specific file paths and operations
   - Include validation steps

2. **Add Context-Specific Details**:
   - Specific file names to create/modify
   - Specific class names and methods
   - Specific configuration updates
   - Specific validation requirements
   - Specific registration requirements (ModuleProvider, SchemaProvider, LoadAPI providers)
   - Specific pattern adherence requirements
   - Cross-repository integration requirements

## Success Criteria

- [ ] **Requirement understood** - Key components and objectives identified
- [ ] **Implementation type determined** - Correct type selected from 18 options
- [ ] **Relevant steps selected** - Appropriate steps chosen from comprehensive list
- [ ] **Files identified** - Target files for modification/creation identified
- [ ] **Patterns recognized** - Existing patterns identified for consistency across all repositories
- [ ] **Registration requirements identified** - All registration points across repositories identified
- [ ] **Cross-repository impact analyzed** - Impact on Algorithm, LoadAPI, and Config repositories assessed
- [ ] **Implementation plan created** - Step-by-step plan with specific details
- [ ] **Dependencies analyzed** - Cross-module dependencies identified
- [ ] **Validation planned** - Validation and testing steps included
- [ ] **Pattern adherence planned** - Consistency with existing patterns ensured

## Output

- **Implementation Type**: Selected from 18 possible types
- **Selected Steps**: List of relevant steps from comprehensive-implementation-steps.md
- **Target Files**: Specific files to modify, create, or delete
- **Implementation Plan**: Step-by-step plan with specific details
- **Pattern References**: Existing patterns to follow across all repositories
- **Registration Requirements**: All registration points across Algorithm, LoadAPI, and Config repositories
- **Cross-Repository Impact**: Impact assessment on all three repositories
- **Dependencies**: Cross-module dependencies identified
- **Validation Plan**: Validation and testing approach
- **Pattern Adherence Plan**: Consistency with existing patterns ensured

## AI Decision Logic

The AI will:

1. **Analyze the Complete Requirement Context**:
   - What specific changes are needed?
   - Which files/modules are affected?
   - What data structures are involved?
   - What business logic needs modification?
   - Are there any cross-repository dependencies?

2. **Determine Impact Scope**:
   - **Algorithm Repository**: Does the change affect Java classes, data structures, business logic, module registration, file registration?
   - **LoadAPI Repository**: Does the change require new data loading, processing, integration, LoadAPI registration, constants?
   - **Configuration Repository**: Does the change require new views, templates, configurations, JSON updates?

3. **Select Steps Based on Actual Impact**:
   - **Always Include**: Module Analysis, Validation & Testing, Documentation
   - **Conditionally Include**: All other steps based on what actually needs to be changed
   - **No Hardcoded Mappings**: Each requirement is analyzed individually

4. **Create a Specific Implementation Plan** with:
   - Exact file paths
   - Specific class names
   - Specific method names
   - Specific configuration updates
   - Specific registration requirements
   - Specific pattern adherence requirements

5. **Adapt Based on Context**:
   - File existence (create vs update)
   - Module dependencies
   - Data flow requirements
   - Business logic requirements
   - Cross-repository impact
   - Registration requirements
   - Pattern consistency requirements

6. **Follow Existing Patterns** for consistency

**Key Principle**: The AI should focus on **understanding the complete requirement context** and then intelligently select steps based on what actually needs to be changed, rather than following predetermined step mappings.
