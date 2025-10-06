# Comprehensive Implementation Steps

## Purpose

A single comprehensive list of all possible implementation steps across all requirement types. The AI will intelligently select which steps are needed for each specific requirement, eliminating the need for separate agent files for each requirement type.

## All Possible Implementation Steps

### 1. **Module Analysis & Identification**

- [ ] **Identify Primary Module**: Determine the main module affected by the requirement
- [ ] **Identify Secondary Modules**: Determine any secondary modules that might be affected
- [ ] **Analyze Module Dependencies**: Check for cross-module dependencies
- [ ] **Determine Module Type**: Identify if it's a new module, existing module, or module modification

### 2. **Data Structure Operations**

- [ ] **Create New Row Classes**: Create new data row classes in `row/input/` or `row/output/`
- [ ] **Create New File Classes**: Create new file classes in `file/input/` or `file/output/`
- [ ] **Update Existing Row Classes**: Modify existing data row classes to add/remove/change fields
- [ ] **Update Existing File Classes**: Modify existing file classes to handle new columns or logic
- [ ] **Create New Data Classes**: Create new data classes in module directories
- [ ] **Update Existing Data Classes**: Modify existing data classes with new fields or methods

### 3. **Module Structure Operations**

- [ ] **Create New Module Directory**: Create complete new module directory structure
- [ ] **Create Group Module Class**: Create `{Module}GroupModule.java` extending `AbstractUtilModuleGroup`
- [ ] **Create Main Module Class**: Create main module class (e.g., `{Module}AllocationModule.java`)
- [ ] **Create Helper Module Class**: Create helper class (e.g., `{Module}Helper.java`)
- [ ] **Update Existing Module Classes**: Modify existing module classes with new logic
- [ ] **Update Existing Helper Classes**: Modify existing helper classes with new methods

### 4. **Validation Operations**

- [ ] **Create New Validation Module**: Create `{Module}InputValidationModule.java` extending `AbstractValidationModule`
- [ ] **Update Existing Validation Module**: Modify existing validation modules with new rules
- [ ] **Add Validation Rules**: Add new validation rules to existing validation classes
- [ ] **Update Validation Logic**: Modify existing validation logic

### 5. **LoadAPI Operations**

- [ ] **Create New LoadAPI Directory**: Create new LoadAPI module directory
- [ ] **Create Main LoadAPI Class**: Create main LoadAPI class (e.g., `{Module}LoadApi.py`)
- [ ] **Create Input LoadAPI Class**: Create input LoadAPI class (e.g., `{Module}InputLoadApi.py`)
- [ ] **Create Output LoadAPI Class**: Create output LoadAPI class (e.g., `{Module}OutputLoadApi.py`)
- [ ] **Update Existing LoadAPI Classes**: Modify existing LoadAPI classes with new logic
- [ ] **Register LoadAPI Classes**: Update `__init__.py` files to register new LoadAPI classes
- [ ] **Create Integration LoadAPI Classes**: Create integration LoadAPI classes (e.g., `{system}_integration_api.py`)
- [ ] **Create Common LoadAPI Classes**: Create common LoadAPI classes in `common/` directory
- [ ] **Create Constant LoadAPI Classes**: Create constant LoadAPI classes in `constant/` directory
- [ ] **Create Master Config LoadAPI Classes**: Create master config LoadAPI classes in `master_config/` directory
- [ ] **Create WSSI LoadAPI Classes**: Create WSSI (Warehouse Store Stock Integration) LoadAPI classes
- [ ] **Create Transactional LoadAPI Classes**: Create transactional LoadAPI classes for data transactions

### 6. **Configuration Operations**

- [ ] **Create New SQL Views**: Create new SQL view files in `view-creation/`
- [ ] **Update Existing SQL Views**: Modify existing SQL views with new columns or logic
- [ ] **Create New Templates**: Create new template files in `template/`
- [ ] **Update Existing Templates**: Modify existing templates with new columns
- [ ] **Create New Sync Files**: Create new sync SQL files in `sync/`
- [ ] **Update Existing Sync Files**: Modify existing sync files
- [ ] **Create New Export Files**: Create new export SQL files in `export/`
- [ ] **Update Existing Export Files**: Modify existing export files
- [ ] **Update Module Input JSON**: Update `module_input.json` with new input schemas
- [ ] **Update Module Output JSON**: Update `module_output.json` with new output schemas
- [ ] **Update Upload Files JSON**: Update `upload-files.json` with new file configurations
- [ ] **Create Child Input Views**: Create child input SQL views (e.g., `child-input-{module}_{table}.sql`)
- [ ] **Create Child Output Views**: Create child output SQL views (e.g., `child-output-{module}_{table}.sql`)
- [ ] **Create Parent Input Views**: Create parent input SQL views (e.g., `parent-input-{table}.sql`)
- [ ] **Create Interim Views**: Create interim calculation views (e.g., `interim_{module}_{calculation}.sql`)

### 7. **Registration Operations**

- [ ] **Update ModuleName.java**: Add new module name constant (snake_case)
- [ ] **Update ValidationModuleNames.java**: Add new validation module name constant (if validation needed)
- [ ] **Update ModuleProvider.java**: Register new GroupModule and ValidationModule in @PostConstruct init() method
- [ ] **Update SchemaProvider.java**: Register new module inputs/outputs
- [ ] **Update FileName.java**: Add new module file names
- [ ] **Create Module Constants**: Create new module-specific constants in `constants/{module}/`
- [ ] **Update Other Providers**: Update ContextProvider, DependentOutputProvider, DbSyncProvider, LocalDateProvider if needed

### 8. **Business Logic Operations**

- [ ] **Update Allocation Logic**: Modify distribution allocation calculations
- [ ] **Update Pricing Logic**: Modify pricing and discount calculations
- [ ] **Update Inventory Logic**: Modify inventory level calculations
- [ ] **Update Performance Metrics**: Modify KPI and metric calculations
- [ ] **Update Validation Logic**: Modify data validation and constraint rules
- [ ] **Update Processing Logic**: Modify data processing and transformation rules
- [ ] **Update Business Rules**: Modify core business logic and decision rules
- [ ] **Update Workflow Rules**: Modify workflow and process rules

### 9. **Integration Operations**

- [ ] **Add Cross-Module Integration**: Add integration logic between modules
- [ ] **Add External API Integration**: Add external system integration
- [ ] **Add Database Integration**: Add database schema integration
- [ ] **Add LoadAPI Integration**: Add Python LoadAPI integration
- [ ] **Add Config Integration**: Add configuration system integration
- [ ] **Add Validation Integration**: Add validation system integration
- [ ] **Add Output Integration**: Add output system integration

### 10. **Performance Operations**

- [ ] **Optimize Database Queries**: Optimize SQL queries for better performance
- [ ] **Optimize Data Processing**: Optimize data processing algorithms
- [ ] **Optimize Memory Usage**: Optimize memory consumption
- [ ] **Optimize Storage**: Optimize storage efficiency
- [ ] **Add Performance Monitoring**: Add performance monitoring capabilities
- [ ] **Add Caching**: Add caching mechanisms
- [ ] **Add Load Balancing**: Add load distribution capabilities

### 11. **Reporting Operations**

- [ ] **Create Report Generation Classes**: Create new report generation classes
- [ ] **Update Output Modules**: Add report functionality to existing output modules
- [ ] **Create Report Data Classes**: Create new report data classes
- [ ] **Create Report LoadAPI Classes**: Create new report LoadAPI classes
- [ ] **Create Report Templates**: Create new report templates
- [ ] **Create Report SQL Views**: Create new report SQL views
- [ ] **Update Report Configurations**: Add report settings to configurations

### 12. **Testing Operations**

- [ ] **Create Unit Test Classes**: Create new unit test classes for modules
- [ ] **Create Test Data Classes**: Create new test data classes
- [ ] **Update Existing Test Classes**: Add new test cases to existing test classes
- [ ] **Create Integration Test Classes**: Create new integration test classes
- [ ] **Create LoadAPI Test Classes**: Create new LoadAPI test classes
- [ ] **Create Test Configuration Files**: Create new test configuration files
- [ ] **Create Test Templates**: Create new test templates

### 13. **Cleanup Operations**

- [ ] **Remove Obsolete Files**: Remove obsolete files and classes
- [ ] **Remove Obsolete Configurations**: Remove obsolete configurations
- [ ] **Remove Obsolete Templates**: Remove obsolete templates
- [ ] **Remove Obsolete SQL Views**: Remove obsolete SQL views
- [ ] **Update References**: Update references to removed components
- [ ] **Clean Up Imports**: Remove unused imports
- [ ] **Clean Up Dependencies**: Remove unused dependencies

### 14. **Validation & Testing**

- [ ] **Compile Java Classes**: Ensure all Java classes compile successfully
- [ ] **Resolve Python Imports**: Ensure all Python imports resolve correctly
- [ ] **Validate Configuration Files**: Ensure all configuration files are valid
- [ ] **Validate SQL Views**: Ensure all SQL views are syntactically correct
- [ ] **Run Unit Tests**: Execute unit tests for new/modified functionality
- [ ] **Run Integration Tests**: Execute integration tests
- [ ] **Validate Business Logic**: Test business logic with sample data
- [ ] **Validate Data Flow**: Test complete data flow from input to output

### 15. **Documentation Operations**

- [ ] **Update Implementation Plan**: Update implementation plan with actual changes
- [ ] **Update Branch URLs**: Update requirement document with branch URLs
- [ ] **Update Change Log**: Update requirement document with change log
- [ ] **Update Test Cases**: Update requirement document with test cases and results
- [ ] **Update PRD**: Update requirement document with short PRD updates
- [ ] **Update Code Review**: Update requirement document with code review results
- [ ] **Update Deployment Info**: Update requirement document with deployment information
- [ ] **Update Metrics**: Update requirement document with metrics and analytics

## AI Decision Logic

The AI will analyze each requirement and intelligently select which steps are needed based on:

### **Intelligent Step Selection Logic**

**The AI should NOT use hardcoded step mappings. Instead, it should:**

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
   - **Always Include**: Steps 1 (Module Analysis), 14 (Validation & Testing), 15 (Documentation)
   - **Conditionally Include**: All other steps based on what actually needs to be changed
   - **Example**: "UPDATE EXISTING LOGIC" might need:
     - Step 2 (Data Structure Operations) - if data structures change
     - Step 5 (LoadAPI Operations) - if data loading changes
     - Step 6 (Configuration Operations) - if views/templates change
     - Step 8 (Business Logic Operations) - if business logic changes
     - Step 7 (Registration Operations) - if new components need registration

4. **Context-Driven Selection Examples**:
   - **Simple Logic Update**: Steps 1, 8, 14, 15
   - **Logic Update + New Data Field**: Steps 1, 2, 6, 8, 14, 15
   - **Logic Update + New LoadAPI**: Steps 1, 5, 8, 14, 15
   - **Logic Update + New Views**: Steps 1, 6, 8, 14, 15
   - **Logic Update + New Module**: Steps 1, 2, 3, 4, 5, 6, 7, 8, 14, 15

### **Context Analysis**

- **File Existence**: Check if target files exist before deciding on create vs update operations
- **Module Dependencies**: Analyze dependencies to determine if cross-module changes are needed
- **Data Flow**: Analyze data flow to determine if input/output changes are needed
- **Business Logic**: Analyze business logic to determine if calculation changes are needed
- **Module Registration**: If creating new modules, must register in ModuleProvider.java with ModuleName constants

### **Pattern Recognition**

- **Existing Patterns**: Follow existing patterns for similar requirements
- **Naming Conventions**: Follow established naming conventions
- **File Structure**: Follow established file structure patterns
- **Registration Patterns**: Follow established registration patterns

## Usage

The AI will:

1. **Analyze the requirement** to understand what needs to be implemented
2. **Select relevant steps** from the comprehensive list based on requirement type and context
3. **Execute selected steps** in the appropriate order
4. **Skip irrelevant steps** to avoid unnecessary work
5. **Adapt the implementation** based on the specific context and existing patterns

This approach eliminates duplication while providing comprehensive coverage of all possible implementation scenarios.
