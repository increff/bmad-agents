# Analyze Requirement Task (Simplified)

## Purpose

Analyze requirement documents and create implementation plans by intelligently selecting relevant steps from the comprehensive implementation steps list.

## Steps

### 1. Requirement Analysis

1. **Read and Understand Requirement**:

   ```bash
   # Read the requirement document
   cat $REQUIREMENT_FILE
   ```

2. **Requirement Classification**:
   - **Algorithm Requirements**: Business logic, modules, data structures, validation
   - **LoadAPI Requirements**: Data upload, denormalization, processing, import/export
   - **Configuration Requirements**: SQL views, templates, JSON configuration, schemas
   - **Cross-Repository Requirements**: Integration, data flow, pipeline coordination

3. **Keyword Analysis and Repository Impact Prediction**:
   - **Store Keywords** → Store denormalization, store modules, store validation, store configuration
   - **SKU Keywords** → SKU denormalization, EAN validation, SKU modules, SKU configuration
   - **Style Keywords** → Style denormalization, style_code validation, style modules, style configuration
   - **Inventory Keywords** → Inventory modules, warehouse denormalization, stock calculations, inventory configuration

4. **Identify Key Components**:
   - **Primary Module**: Main module affected by the requirement
   - **Secondary Modules**: Any additional modules that might be affected
   - **Data Structures**: Input/output data structures involved
   - **Business Logic**: Business rules and calculations involved
   - **Integration Points**: Any cross-module or external integrations
   - **Cross-Repository Impact**: Impact on Algorithm, LoadAPI, and Config repositories
   - **Registration Requirements**: What needs to be registered across repositories

### 2. Module Identification and Pattern Analysis

1. **Identify Target Modules**:

   ```bash
   # Find relevant modules based on requirement keywords
   grep -r "distribution\|iss\|otb\|eoss" $REPO_PATH/src/main/java/com/increff/irisx/module/ | head -10
   ```

2. **Analyze Module Dependencies**:

   ```bash
   # Check for cross-module dependencies
   grep -r "import.*module" $REPO_PATH/src/main/java/com/increff/irisx/module/
   ```

3. **Pattern Recognition Analysis**:

   ```bash
   # Check ModuleProvider patterns
   grep -r "ModuleProvider\|ModuleName\|ValidationModuleNames" $REPO_PATH/src/main/java/com/increff/irisx/

   # Check SchemaProvider and FileName patterns
   grep -r "SchemaProvider\|FileName" $REPO_PATH/src/main/java/com/increff/irisx/
   ```

````

### 3. LoadAPI Analysis Delegation

**CRITICAL**: For LoadAPI-specific analysis, delegate to the specialized LoadAPI Pattern Expert agent.

**LoadAPI Delegation Rules**:
- **LoadAPI Pattern Analysis**: Delegate to `loadapi-pattern-expert.md`
- **Denormalization Analysis**: Delegate to `loadapi-pattern-expert.md`
- **LoadAPI Implementation Guidance**: Delegate to `loadapi-pattern-expert.md`
- **Repository Structure Analysis**: Delegate to `loadapi-pattern-expert.md`

**LoadAPI Pattern Expert Commands**:
- `analyze-patterns`: Analyze LoadAPI repository for structural and naming patterns
- `analyze-denormalization`: Analyze denormalization patterns (user upload vs. database storage)
- `create-loadapi`: Provide guidance for creating a new LoadAPI
- `add-fields`: Provide guidance for adding new fields to an existing LoadAPI
- `get-denormalization-matrix`: Provide the denormalization field mapping matrix

**VIRAT's Role**: Identify when LoadAPI expertise is needed and delegate to the LoadAPI Pattern Expert agent.

### 4. Configuration Analysis Delegation

**CRITICAL**: For configuration-specific analysis, delegate to the specialized Configuration Pattern Expert agent.

**Configuration Delegation Rules**:
- **Configuration Pattern Analysis**: Delegate to `config-pattern-expert.md`
- **SQL View Creation**: Delegate to `config-pattern-expert.md`
- **Template Generation**: Delegate to `config-pattern-expert.md`
- **Cross-Repository Configuration**: Delegate to `config-pattern-expert.md`

**Configuration Pattern Expert Commands**:
- `analyze-json-config`: Analyze JSON configuration patterns (module_input.json, module_output.json, upload-files.json)
- `analyze-sql-views`: Analyze SQL view creation patterns and OPENROWSET usage
- `analyze-templates`: Analyze TSV template patterns and structure
- `create-module-config`: Provide guidance for creating new module configuration
- `create-sql-view`: Provide guidance for creating SQL views (child-input, child-output, parent-input)
- `create-template`: Provide guidance for creating TSV templates

**VIRAT's Role**: Identify when configuration expertise is needed and delegate to the Configuration Pattern Expert agent.

### 5. Change Prediction and Repository Impact Analysis

1. **Predict Algorithm Repository Changes**:
   ```bash
   # Check for module-related changes
   grep -r "new module\|create module\|add module" $REQUIREMENT_FILE

   # Check for data structure changes
   grep -r "new data\|add field\|new table" $REQUIREMENT_FILE

   # Check for business logic changes
   grep -r "calculation\|algorithm\|business rule" $REQUIREMENT_FILE
````

2. **Predict LoadAPI Repository Changes**:

   ```bash
   # Check for LoadAPI-related changes
   grep -r "new loadapi\|create loadapi\|data upload" $REQUIREMENT_FILE

   # Check for denormalization needs
   grep -r "store\|sku\|style\|warehouse\|channel\|ean\|style_code" $REQUIREMENT_FILE
   ```

3. **Predict Configuration Repository Changes**:

   ```bash
   # Check for SQL view requirements
   grep -r "sql view\|database view\|data view" $REQUIREMENT_FILE

   # Check for template requirements
   grep -r "template\|tsv\|sample data" $REQUIREMENT_FILE
   ```

4. **Cross-Repository Impact Assessment**:
   - **Integration Requirements**: Changes across all three repositories
   - **Data Flow Requirements**: End-to-end pipeline changes
   - **Registration Requirements**: What needs to be registered in each repository
   - **Dependency Analysis**: Cross-repository dependencies and consistency requirements

### 6. Implementation Planning

1. **File Change Prediction**:
   - **Algorithm Repository**: ModuleProvider.java, new modules, Row/File classes, validation logic
   - **LoadAPI Repository**: LoadAPI classes, registration files, ObjectMaps, denormalization
   - **Configuration Repository**: SQL views, TSV templates, JSON configuration, schemas

2. **Registration Requirements**:
   - **Algorithm**: ModuleProvider, ValidationModule, GroupModule registrations
   - **LoadAPI**: **init**.py, loadapi_provider.py, MsgErrors.py registrations
   - **Configuration**: JSON configuration, schema updates, template integration

3. **Implementation Sequence**:
   - **Phase 1**: Algorithm repository changes (business logic, data structures)
   - **Phase 2**: LoadAPI repository changes (data processing, denormalization)
   - **Phase 3**: Configuration repository changes (views, templates, configuration)
   - **Phase 4**: Cross-repository integration and validation

   # Check LoadAPI provider patterns

   grep -r "loadapi_provider\|**init**.py" $LOADAPI_PATH/loadapi/

   # Check configuration patterns

   ls $CONFIG_PATH/template/ | grep -E "(export|child-input|child-output)"

   ```

   ```

4. **Registration Analysis**:
   - **Algorithm Repository**: ModuleProvider, ModuleName, ValidationModuleNames, SchemaProvider, FileName
   - **LoadAPI Repository**: **init**.py files, loadapi_provider.py, MsgErrors.py
   - **Configuration Repository**: module_input.json, module_output.json, upload-files.json

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

## Comprehensive Implementation Steps Reference

### All Possible Implementation Steps

The following is a comprehensive list of all possible implementation steps across all requirement types. The AI will intelligently select which steps are needed for each specific requirement.

#### 1. **Module Analysis & Identification**

- [ ] **Identify Primary Module**: Determine the main module affected by the requirement
- [ ] **Identify Secondary Modules**: Determine any secondary modules that might be affected
- [ ] **Analyze Module Dependencies**: Check for cross-module dependencies
- [ ] **Determine Module Type**: Identify if it's a new module, existing module, or module modification

#### 2. **Data Structure Operations**

- [ ] **Create New Row Classes**: Create new data row classes in `row/input/` or `row/output/` (simple POJOs with public fields)
- [ ] **Create New File Classes**: Create new file classes in `file/input/` or `file/output/` extending `AbstractTSVFile<RowClass>`
- [ ] **Update Existing Row Classes**: Modify existing data row classes to add/remove/change fields
- [ ] **Update Existing File Classes**: Modify existing file classes to handle new columns or logic (update getHeaders() and read() methods)
- [ ] **Create New Data Classes**: Create new data classes in module directories
- [ ] **Update Existing Data Classes**: Modify existing data classes with new fields or methods
- [ ] **Update FileName Constants**: Add new file name constants in `FileName.java` (snake_case, no extensions)
- [ ] **Update SchemaProvider**: Register new file classes in `SchemaProvider.java` with proper imports

#### 3. **Module Structure Operations**

- [ ] **Create New Module Directory**: Create complete new module directory structure
- [ ] **Create Group Module Class**: Create `{Module}GroupModule.java` extending `AbstractUtilModuleGroup`
- [ ] **Create Main Module Class**: Create main module class (e.g., `{Module}AllocationModule.java`)
- [ ] **Create Helper Module Class**: Create helper class (e.g., `{Module}Helper.java`)
- [ ] **Update Existing Module Classes**: Modify existing module classes with new logic
- [ ] **Update Existing Helper Classes**: Modify existing helper classes with new methods

#### 4. **Validation Operations**

- [ ] **Create New Validation Module**: Create `{Module}ValidationModule.java` extending `AbstractValidationModule`
- [ ] **Create Validation Constants**: Create `{Module}ValidationConstants.java` extending `AbstractConstants` with error messages
- [ ] **Update Existing Validation Module**: Modify existing validation modules with new rules
- [ ] **Add Validation Rules**: Add new validation rules to existing validation classes
- [ ] **Update Validation Logic**: Modify existing validation logic
- [ ] **Register Validation Module**: Add validation module to GroupModule and register in ModuleProvider

#### 5. **LoadAPI Operations**

- [ ] **Create New LoadAPI Directory**: Create new LoadAPI module directory (e.g., `{module}/`)
- [ ] **Create Main LoadAPI Class**: Create main LoadAPI class extending `LoadApi` (e.g., `{Module}LoadApi.py`)
- [ ] **Create Integration LoadAPI Class**: Create integration LoadAPI class extending `IntegrationLoadApi` (e.g., `{System}IntegrationApi.py`)
- [ ] **Update Existing LoadAPI Classes**: Modify existing LoadAPI classes with new logic
- [ ] **Register LoadAPI**: Register new LoadAPI in appropriate provider files
- [ ] **Update LoadAPI Constants**: Add new constants for LoadAPI configuration
- [ ] **Create LoadAPI Tests**: Create test files for new LoadAPI functionality

#### 6. **Configuration Operations**

- [ ] **Update Module Input JSON**: Add new input configurations to `module_input.json`
- [ ] **Update Module Output JSON**: Add new output configurations to `module_output.json`
- [ ] **Update CAAS JSON**: Add new configurations to CAAS JSON files
- [ ] **Update Export Definitions**: Add new export definitions
- [ ] **Update SQL Views**: Create or update SQL view definitions
- [ ] **Update TSV Templates**: Create or update TSV input templates
- [ ] **Update Configuration Files**: Update any other configuration files as needed

#### 7. **Cross-Repository Integration**

- [ ] **Algorithm Repository Changes**: Implement changes in `irisx-algo` repository
- [ ] **LoadAPI Repository Changes**: Implement changes in `ms-loadapis-ril-final` repository
- [ ] **Config Repository Changes**: Implement changes in `irisx-config` repository
- [ ] **Cross-Repository Validation**: Ensure consistency across all repositories
- [ ] **Cross-Repository Testing**: Test integration between repositories
- [ ] **Cross-Repository Documentation**: Update documentation across repositories

#### 8. **Testing and Validation**

- [ ] **Create Unit Tests**: Create unit tests for new functionality
- [ ] **Create Integration Tests**: Create integration tests for cross-module functionality
- [ ] **Run Existing Tests**: Ensure existing tests still pass
- [ ] **Validate Implementation**: Validate implementation against requirements
- [ ] **Performance Testing**: Test performance impact of changes
- [ ] **Regression Testing**: Ensure no existing functionality is broken

#### 9. **Documentation and Registration**

- [ ] **Update ModuleProvider**: Register new modules in `ModuleProvider.java`
- [ ] **Update SchemaProvider**: Register new schemas in `SchemaProvider.java`
- [ ] **Update FileName**: Add new file names to `FileName.java`
- [ ] **Update Constants**: Add new constants as needed
- [ ] **Update Documentation**: Update relevant documentation
- [ ] **Create Change Log**: Document all changes made

#### 10. **Pattern Recognition and Consistency**

- [ ] **Analyze Existing Patterns**: Study existing patterns in the codebase
- [ ] **Follow Naming Conventions**: Ensure consistent naming across all files
- [ ] **Follow Code Structure**: Maintain consistent code structure
- [ ] **Follow Registration Patterns**: Use consistent registration patterns
- [ ] **Follow Testing Patterns**: Use consistent testing patterns
- [ ] **Follow Documentation Patterns**: Use consistent documentation patterns

### Intelligent Step Selection

The AI should analyze the requirement and select only the relevant steps from the above comprehensive list. For example:

- **New Column Addition**: Steps 2, 4, 6, 8, 9
- **New Module Creation**: Steps 1, 3, 4, 5, 6, 7, 8, 9, 10
- **Formula Change**: Steps 2, 3, 4, 8, 9
- **New Input File**: Steps 2, 5, 6, 8, 9
- **New Output File**: Steps 2, 6, 8, 9

This approach eliminates the need for separate agent files for each requirement type while providing comprehensive coverage of all possible implementation scenarios.
