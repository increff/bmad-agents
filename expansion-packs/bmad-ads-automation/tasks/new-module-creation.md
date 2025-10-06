# New Module Creation Task

## Purpose

Create entirely new modules/submodules with complete structure across all three repositories following existing patterns and conventions.

## Steps

### 1. Module Structure Analysis

1. **Analyze Existing Module Patterns**:

   ```bash
   # Analyze existing modules to understand structure
   find $REPO_PATH/src/main/java/com/increff/irisx/module/ -type d -name "*" | head -10
   find $LOADAPI_PATH/loadapi/ -type d -name "*" | head -10
   find $CONFIG_PATH/template/ -name "*_template.tsv" | head -10
   ```

2. **Identify Module Naming Conventions**:
   - **Java Modules**: PascalCase (e.g., `DistributionAllocationModule.java`)
   - **Python LoadAPIs**: PascalCase with LoadApi suffix (e.g., `DistributionLoadApi.py`)
   - **Config Files**: snake*case with module prefix (e.g., `export_dist*\*\_template.tsv`)

3. **Determine Module Dependencies**:
   - **Abstract Classes**: Identify which abstract classes to extend
   - **Common Dependencies**: Identify shared utilities and constants
   - **Cross-Module Dependencies**: Identify any inter-module dependencies

### 2. Algorithm Repository Module Creation

1. **Create Module Directory Structure**:

   ```bash
   # Create new module directory
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/module/{newModule}/
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/module/validation/
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/file/input/{newModule}/
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/file/output/{newModule}/
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/row/input/{newModule}/
   mkdir -p $REPO_PATH/src/main/java/com/increff/irisx/row/output/{newModule}/
   ```

2. **Create Group Module Class**:
   - **Group Module Class**: `{NewModule}GroupModule.java`
     - Extends `AbstractUtilModuleGroup`
     - Autowires all module components
     - Registers modules in `@PostConstruct` method
     - Implements `captureSnapshot()` and `uploadOutput()` methods

3. **Create Core Module Classes**:
   - **Main Module Class**: `{NewModule}AllocationModule.java`
     - Extends `AbstractAllocationModule`
     - Implements core business logic
     - Handles data processing and calculations
   - **Helper Class**: `{NewModule}Helper.java`
     - Contains utility methods
     - Handles data transformations
     - Implements business rules
   - **Data Classes**: `{NewModule}Data.java`, `{NewModule}ModuleData.java`
     - Define data structures
     - Include getters/setters
     - Handle data validation

4. **Create File Classes**:
   - **Input File Class**: `{NewModule}InputFile.java`
     - Handles input file processing
     - Extends appropriate base class
     - Implements file reading logic
   - **Output File Class**: `{NewModule}OutputFile.java`
     - Handles output file generation
     - Extends appropriate base class
     - Implements file writing logic

5. **Create Row Classes**:
   - **Input Row Class**: `{NewModule}InputRow.java`
     - Defines input data structure
     - Includes validation methods
     - Handles data parsing
   - **Output Row Class**: `{NewModule}OutputRow.java`
     - Defines output data structure
     - Includes serialization methods
     - Handles data formatting

6. **Create Validation Module**:
   - **Validation Module Class**: `{NewModule}InputValidationModule.java`
     - Extends `AbstractValidationModule`
     - Implements input validation logic
     - Sets `validationName` in `runInternal()` method
     - Validates module-specific input data

7. **Update Registration Files**:

   **ModuleName.java**:

   ```java
   // Add new module name constant
   public static final String {NEW_MODULE_UPPER} = "{new_module_lower}";
   ```

   **ValidationModuleNames.java**:

   ```java
   // Add new validation module name constant
   public static final String {NEW_MODULE_UPPER}_INPUT_VALIDATION = "{new_module_lower}_input_validation";
   ```

   **ModuleProvider.java**:

   ```java
   // Add autowired group module
   @Autowired
   private {NewModule}GroupModule {newModule}GroupModule;

   // Add autowired validation module
   @Autowired
   private {NewModule}InputValidationModule {newModule}InputValidationModule;

   // Register in @PostConstruct init() method
   add(ModuleName.{NEW_MODULE_UPPER}, {newModule}GroupModule);
   add(ValidationModuleNames.{NEW_MODULE_UPPER}_INPUT_VALIDATION, {newModule}InputValidationModule);
   ```

   **SchemaProvider.java**: Register new module inputs/outputs
   **FileName.java**: Add new module file names
   **Main Application**: Register new module in Spring context

### 3. LoadAPI Repository Module Creation

1. **Create Module Directory Structure**:

   ```bash
   # Create new LoadAPI module directory
   mkdir -p $LOADAPI_PATH/loadapi/{newModule}/
   ```

2. **Create LoadAPI Classes**:
   - **Main LoadAPI Class**: `{NewModule}LoadApi.py`
     - Extends `LoadApi` base class
     - Implements data loading logic
     - Handles validation and error processing
   - **Input LoadAPI Class**: `{NewModule}InputLoadApi.py`
     - Handles input data loading
     - Implements input validation
     - Processes input file data
   - **Output LoadAPI Class**: `{NewModule}OutputLoadApi.py`
     - Handles output data processing
     - Implements output validation
     - Processes output file generation

3. **Create Module Registration**:
   - **Module `__init__.py`**: Register all LoadAPI classes
   - **Main `__init__.py`**: Import and register new module
   - **Update imports**: Add new module to main imports

### 4. Config Repository Module Creation

1. **Create Input Templates**:

   ```bash
   # Create input template files
   touch $CONFIG_PATH/template/export_{newModule}_input_*_template.tsv
   ```

2. **Create Output Templates**:

   ```bash
   # Create output template files
   touch $CONFIG_PATH/template/export_{newModule}_output_*_template.tsv
   ```

3. **Create SQL Views**:

   ```bash
   # Create input SQL views
   touch $CONFIG_PATH/view-creation/child-input-{newModule}_*.sql

   # Create output SQL views
   touch $CONFIG_PATH/view-creation/child-output-{newModule}_*.sql
   ```

4. **Create Sync Files**:

   ```bash
   # Create sync SQL files
   touch $CONFIG_PATH/sync/{newModule}_*.sql
   ```

5. **Create Export Files**:

   ```bash
   # Create export SQL files
   touch $CONFIG_PATH/export/export_{newModule}_*.sql
   ```

6. **Update Configuration Files**:
   - **module_input.json**: Add complete new module input configuration
   - **module_output.json**: Add complete new module output configuration
   - **upload-files.json**: Add new module file upload configuration

### 5. Pattern Following and Validation

1. **Follow Existing Patterns**:
   - **Java Patterns**: Follow existing module structure and naming
   - **Python Patterns**: Follow existing LoadAPI structure and inheritance
   - **Config Patterns**: Follow existing template and SQL view patterns

2. **Validate Module Structure**:
   - **Compilation Check**: Ensure all Java classes compile
   - **Import Check**: Ensure all Python imports resolve
   - **Config Validation**: Ensure all JSON configurations are valid
   - **SQL Validation**: Ensure all SQL views are syntactically correct

3. **Integration Testing**:
   - **Module Integration**: Test module integration with existing system
   - **Data Flow**: Test complete data flow from input to output
   - **Error Handling**: Test error handling and validation

## Output

- **New Module Structure**: Complete module structure across all repositories
- **Created Files**: List of all files created for the new module
- **Updated Files**: List of files updated to register the new module
- **Configuration**: Complete configuration setup for the new module
- **Validation Results**: Compilation, import, and configuration validation results

## Success Criteria

- [ ] New module directory structure created in all repositories
- [ ] Group module class created extending AbstractUtilModuleGroup
- [ ] Core module classes created following existing patterns
- [ ] File and row classes created with proper inheritance
- [ ] Validation module created extending AbstractValidationModule
- [ ] LoadAPI classes created with proper structure
- [ ] Configuration files created with proper templates and SQL views
- [ ] ModuleName.java updated with new module constant
- [ ] ValidationModuleNames.java updated with new validation constant
- [ ] ModuleProvider.java updated with new module and validation registration
- [ ] All registration files updated to include new module
- [ ] All Java classes compile successfully
- [ ] All Python imports resolve correctly
- [ ] All configuration files are valid
- [ ] All SQL views are syntactically correct
- [ ] Module integration tested successfully

## Example Module Creation

### For "CREATE NEW INVENTORY MANAGEMENT MODULE":

**Algorithm Repository:**

- `module/InventoryGroupModule.java` (Group module)
- `module/inventory/InventoryAllocationModule.java`
- `module/inventory/InventoryHelper.java`
- `module/inventory/InventoryData.java`
- `module/validation/InventoryInputValidationModule.java` (Validation module)
- `file/input/inventory/InventoryInputFile.java`
- `file/output/inventory/InventoryOutputFile.java`
- `row/input/inventory/InventoryInputRow.java`
- `row/output/inventory/InventoryOutputRow.java`
- `constants/ModuleName.java` (Add `INVENTORY_MANAGEMENT = "inventory_management"`)
- `constants/ValidationModuleNames.java` (Add `INVENTORY_MANAGEMENT_INPUT_VALIDATION = "inventory_management_input_validation"`)
- `provider/ModuleProvider.java` (Register group module and validation module)

**LoadAPI Repository:**

- `loadapi/inventory/InventoryLoadApi.py`
- `loadapi/inventory/InventoryInputLoadApi.py`
- `loadapi/inventory/InventoryOutputLoadApi.py`
- `loadapi/inventory/__init__.py`

**Config Repository:**

- `template/export_inventory_input_*_template.tsv`
- `template/export_inventory_output_*_template.tsv`
- `view-creation/child-input-inventory_*.sql`
- `view-creation/child-output-inventory_*.sql`
- `sync/inventory_*.sql`
- `export/export_inventory_*.sql`
- Updated `module_input.json`, `module_output.json`, `upload-files.json`
