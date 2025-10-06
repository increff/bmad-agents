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

2. **Identify Key Components**:
   - **Primary Module**: Main module affected by the requirement
   - **Secondary Modules**: Any additional modules that might be affected
   - **Data Structures**: Input/output data structures involved
   - **Business Logic**: Business rules and calculations involved
   - **Integration Points**: Any cross-module or external integrations

### 2. Module Identification

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
   - **Data Structure Operations**: If data structures need to be created, modified, or deleted
   - **Module Structure Operations**: If new modules need to be created or existing modules restructured
   - **Validation Operations**: If validation rules need to be added, modified, or removed
   - **LoadAPI Operations**: If data loading, processing, or integration logic needs changes
   - **Configuration Operations**: If SQL views, templates, or configuration files need changes
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
   - **"Add new field to existing table"**: Steps 1, 2, 6, 8, 14, 15
   - **"Update calculation formula"**: Steps 1, 8, 14, 15
   - **"Add new input file"**: Steps 1, 2, 5, 6, 7, 14, 15
   - **"Create new module"**: Steps 1, 2, 3, 4, 5, 6, 7, 14, 15
   - **"Update existing logic"**: Steps 1, 8, 14, 15 (plus others based on what actually changes)
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

### 6. Pattern Recognition

1. **Find Existing Patterns**:

   ```bash
   # Look for similar implementations to follow patterns
   find $REPO_PATH -name "*{SIMILAR_MODULE}*" -type f | head -5
   ```

2. **Analyze Naming Conventions**:
   ```bash
   # Check existing naming patterns
   ls $REPO_PATH/src/main/java/com/increff/irisx/module/ | grep -E "(Module|Group)"
   ```

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

## Success Criteria

- [ ] **Requirement understood** - Key components and objectives identified
- [ ] **Implementation type determined** - Correct type selected from 12 options
- [ ] **Relevant steps selected** - Appropriate steps chosen from comprehensive list
- [ ] **Files identified** - Target files for modification/creation identified
- [ ] **Patterns recognized** - Existing patterns identified for consistency
- [ ] **Implementation plan created** - Step-by-step plan with specific details
- [ ] **Dependencies analyzed** - Cross-module dependencies identified
- [ ] **Validation planned** - Validation and testing steps included

## Output

- **Implementation Type**: Selected from 12 possible types
- **Selected Steps**: List of relevant steps from comprehensive-implementation-steps.md
- **Target Files**: Specific files to modify, create, or delete
- **Implementation Plan**: Step-by-step plan with specific details
- **Pattern References**: Existing patterns to follow
- **Dependencies**: Cross-module dependencies identified
- **Validation Plan**: Validation and testing approach

## AI Decision Logic

The AI will:

1. **Analyze the Complete Requirement Context**:
   - What specific changes are needed?
   - Which files/modules are affected?
   - What data structures are involved?
   - What business logic needs modification?
   - Are there any cross-repository dependencies?

2. **Determine Impact Scope**:
   - **Algorithm Repository**: Does the change affect Java classes, data structures, business logic?
   - **LoadAPI Repository**: Does the change require new data loading, processing, or integration?
   - **Configuration Repository**: Does the change require new views, templates, or configurations?

3. **Select Steps Based on Actual Impact**:
   - **Always Include**: Module Analysis, Validation & Testing, Documentation
   - **Conditionally Include**: All other steps based on what actually needs to be changed
   - **No Hardcoded Mappings**: Each requirement is analyzed individually

4. **Create a Specific Implementation Plan** with:
   - Exact file paths
   - Specific class names
   - Specific method names
   - Specific configuration updates

5. **Adapt Based on Context**:
   - File existence (create vs update)
   - Module dependencies
   - Data flow requirements
   - Business logic requirements
   - Cross-repository impact

6. **Follow Existing Patterns** for consistency

**Key Principle**: The AI should focus on **understanding the complete requirement context** and then intelligently select steps based on what actually needs to be changed, rather than following predetermined step mappings.
