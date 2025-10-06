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

2. **Select Relevant Steps**:
   - **Module Analysis & Identification**: Always needed
   - **Data Structure Operations**: If data structures are involved
   - **Module Structure Operations**: If modules are involved
   - **Validation Operations**: If validation is needed
   - **LoadAPI Operations**: If LoadAPIs are involved
   - **Configuration Operations**: If configuration changes are needed
   - **Registration Operations**: If new components need registration
   - **Business Logic Operations**: If business logic is involved
   - **Integration Operations**: If integration is needed
   - **Performance Operations**: If performance optimization is needed
   - **Reporting Operations**: If reporting is needed
   - **Testing Operations**: If testing is needed
   - **Cleanup Operations**: If cleanup is needed
   - **Validation & Testing**: Always needed
   - **Documentation Operations**: Always needed

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

1. **Analyze the requirement** to understand what needs to be implemented
2. **Determine the implementation type** based on the requirement content
3. **Select relevant steps** from comprehensive-implementation-steps.md based on:
   - Implementation type
   - File existence (create vs update)
   - Module dependencies
   - Data flow requirements
   - Business logic requirements
4. **Create a specific implementation plan** with:
   - Exact file paths
   - Specific class names
   - Specific method names
   - Specific configuration updates
5. **Skip irrelevant steps** to avoid unnecessary work
6. **Follow existing patterns** for consistency

This approach eliminates duplication while providing comprehensive coverage of all possible implementation scenarios.
