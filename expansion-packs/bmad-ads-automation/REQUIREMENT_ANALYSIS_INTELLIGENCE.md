# 🧠 REQUIREMENT ANALYSIS INTELLIGENCE

## EXECUTIVE SUMMARY

This document provides VIRAT with comprehensive intelligence on requirement types, repository impact analysis, and change patterns. VIRAT can now intelligently analyze requirements, predict repository changes, and guide implementation across all three repositories.

---

## 📋 REQUIREMENT TYPE CLASSIFICATION

### **1. Algorithm Repository Requirements**

#### **A. New Module Requirements**

**Keywords**: "new module", "create module", "add module", "implement module"
**Repository Impact**: `irisx-algo` (Primary)
**Change Pattern**:

- **ModuleProvider.java**: Add new ModuleName constant
- **GroupModule.java**: Register new module
- **ValidationModuleNames.java**: Add validation constants
- **New Module Directory**: Create complete module structure
- **Row Classes**: Create data structure classes
- **File Classes**: Create file handling classes
- **Util Classes**: Create business logic classes

**Example**: "Create new ISS module for inventory management"
→ **Changes**: New ISS module directory, ModuleProvider registration, validation constants

#### **B. New Data Structure Requirements**

**Keywords**: "new data", "add field", "new table", "data structure"
**Repository Impact**: `irisx-algo` (Primary), `irisx-config` (Secondary)
**Change Pattern**:

- **FileName.java**: Add new file name constant
- **SchemaProvider.java**: Add new schema definition
- **Row Classes**: Create new data structure classes
- **File Classes**: Create file handling classes
- **Config JSONs**: Update module_input.json, module_output.json

**Example**: "Add new store performance data structure"
→ **Changes**: New Row class, File class, FileName constant, SchemaProvider entry

#### **C. Business Logic Requirements**

**Keywords**: "calculation", "algorithm", "business rule", "logic", "formula"
**Repository Impact**: `irisx-algo` (Primary)
**Change Pattern**:

- **Util Classes**: Add new calculation methods
- **AbstractUtilModuleGroup**: Extend with new functionality
- **Validation Logic**: Add business rule validation
- **Constants**: Add calculation constants

**Example**: "Implement new discount calculation algorithm"
→ **Changes**: New util class, calculation methods, validation logic

#### **D. Validation Requirements**

**Keywords**: "validation", "validate", "check", "verify", "constraint"
**Repository Impact**: `irisx-algo` (Primary)
**Change Pattern**:

- **ValidationModule**: Add new validation logic
- **ValidationConstants**: Add validation constants
- **ValidationUtil**: Add validation methods
- **Error Messages**: Add validation error messages

**Example**: "Add validation for store capacity limits"
→ **Changes**: ValidationModule updates, new validation methods, error messages

### **2. LoadAPI Repository Requirements**

#### **A. New LoadAPI Requirements**

**Keywords**: "new loadapi", "create loadapi", "add loadapi", "data upload"
**Repository Impact**: `ms-loadapis-ril-final` (Primary), `irisx-config` (Secondary)
**Change Pattern**:

- **LoadAPI Class**: Create new LoadAPI class
- **Module **init**.py**: Register new LoadAPI
- **Main **init**.py**: Add import_id mapping
- **loadapi_provider.py**: Add provider mapping
- **MsgErrors.py**: Add error messages
- **Config Templates**: Create TSV templates

**Example**: "Create new store SKU depth override LoadAPI"
→ **Changes**: StoreSkuDepthOverrideLoadApi.py, 3 registration files, error messages

#### **B. LoadAPI Field Requirements**

**Keywords**: "add field", "new field", "modify field", "update field"
**Repository Impact**: `ms-loadapis-ril-final` (Primary)
**Change Pattern**:

- **LoadAPI Headers**: Update MASTER_HEADER and HEADER
- **Validation Logic**: Add field validation
- **Conversion Logic**: Add field conversion
- **Error Messages**: Add field-specific errors

**Example**: "Add ROS override field to store SKU LoadAPI"
→ **Changes**: Header updates, validation logic, conversion logic

#### **C. Denormalization Requirements**

**Keywords**: "store", "sku", "style", "warehouse", "channel", "ean", "style_code"
**Repository Impact**: `ms-loadapis-ril-final` (Primary)
**Change Pattern**:

- **ObjectMaps Integration**: Use appropriate denormalization maps
- **Validation**: Validate denormalized fields
- **Conversion**: Convert denormalized to normalized data
- **Error Handling**: Handle denormalization errors

**Example**: "Add store and SKU fields to analysis LoadAPI"
→ **Changes**: Store + SKU denormalization pattern, ObjectMaps integration

### **3. Configuration Repository Requirements**

#### **A. SQL View Requirements**

**Keywords**: "sql view", "database view", "data view", "query"
**Repository Impact**: `irisx-config` (Primary)
**Change Pattern**:

- **SQL Views**: Create child-input, child-output, parent-input, interim views
- **OPENROWSET**: Use BULK file reading pattern with {{child}}/{{parent}} data sources
- **View Naming**: Follow established naming conventions
- **Template Integration**: Link to TSV templates

**Example**: "Create SQL view for store performance data"
→ **Changes**: New SQL view file, OPENROWSET pattern, template integration

#### **B. Template Requirements**

**Keywords**: "template", "tsv", "sample data", "export template"
**Repository Impact**: `irisx-config` (Primary)
**Change Pattern**:

- **TSV Templates**: Create export templates with headers and sample data
- **Template Naming**: Follow export*{module}*{type}\_template.tsv pattern
- **Sample Data**: Include realistic sample data
- **Header Mapping**: Map to database schema

**Example**: "Create template for store performance export"
→ **Changes**: New TSV template, sample data, header mapping

#### **C. Configuration JSON Requirements**

**Keywords**: "configuration", "config", "json", "settings"
**Repository Impact**: `irisx-config` (Primary)
**Change Pattern**:

- **module_input.json**: Add sync/download configuration (10,437 lines)
- **module_output.json**: Add module arrays (676 lines)
- **upload-files.json**: Add file metadata (1,261 lines)
- **Configuration Schema**: Update configuration schemas

**Example**: "Add configuration for new ISS module"
→ **Changes**: JSON configuration updates, schema updates

#### **D. Module Configuration Requirements**

**Keywords**: "new module", "module config", "module setup"
**Repository Impact**: `irisx-config` (Primary)
**Change Pattern**:

- **Module Input**: Add module to module_input.json with sync configuration
- **Module Output**: Add module to module_output.json with output tables
- **Upload Files**: Add module to upload-files.json with import ID mappings
- **Cross-Repository**: Coordinate with Algorithm and LoadAPI repositories

**Example**: "Configure new store performance module"
→ **Changes**: All three JSON files, cross-repository coordination

### **4. Cross-Repository Requirements**

#### **A. Integration Requirements**

**Keywords**: "integration", "connect", "link", "sync", "coordinate"
**Repository Impact**: All three repositories
**Change Pattern**:

- **Algorithm**: Business logic and data structures
- **LoadAPI**: Data upload and processing
- **Config**: Views, templates, and configuration
- **Cross-References**: Ensure consistency across repositories

**Example**: "Integrate store performance with inventory management"
→ **Changes**: All three repositories, cross-repository consistency

#### **B. Data Flow Requirements**

**Keywords**: "data flow", "pipeline", "process", "workflow"
**Repository Impact**: All three repositories
**Change Pattern**:

- **Algorithm**: Data processing logic
- **LoadAPI**: Data input/output handling
- **Config**: Data views and templates
- **Pipeline**: End-to-end data flow

**Example**: "Implement store performance data pipeline"
→ **Changes**: Complete data flow across all repositories

---

## 🔍 REPOSITORY IMPACT ANALYSIS

### **Requirement → Repository Mapping**

#### **Algorithm Repository (`irisx-algo`)**

**Triggers**:

- Business logic changes
- New modules or features
- Data structure modifications
- Validation requirements
- Calculation algorithms

**Change Patterns**:

- ModuleProvider.java updates
- New module directories
- Row/File class creation
- Util class modifications
- Validation logic updates

#### **LoadAPI Repository (`ms-loadapis-ril-final`)**

**Triggers**:

- Data upload requirements
- New data fields
- Denormalization needs
- Data processing changes
- Import/export functionality

**Change Patterns**:

- LoadAPI class creation
- Registration file updates
- ObjectMaps integration
- Validation logic updates
- Error message additions

#### **Configuration Repository (`irisx-config`)**

**Triggers**:

- Database view requirements
- Template needs
- Configuration changes
- Data export requirements
- Schema modifications

**Change Patterns**:

- SQL view creation
- TSV template creation
- JSON configuration updates
- Schema modifications
- Template integration

---

## 🎯 CHANGE PREDICTION MATRIX

### **Requirement Keywords → Predicted Changes**

#### **Store-Related Requirements**

**Keywords**: "store", "channel", "store_code"
**Predicted Changes**:

- **Algorithm**: Store-related modules, validation logic
- **LoadAPI**: Store denormalization pattern, ObjectMaps integration
- **Config**: Store views, store templates, store configuration

#### **SKU-Related Requirements**

**Keywords**: "sku", "ean", "product", "item"
**Predicted Changes**:

- **Algorithm**: SKU-related modules, SKU validation
- **LoadAPI**: SKU denormalization pattern, EAN validation
- **Config**: SKU views, SKU templates, SKU configuration

#### **Style-Related Requirements**

**Keywords**: "style", "style_code", "fashion", "design"
**Predicted Changes**:

- **Algorithm**: Style-related modules, style validation
- **LoadAPI**: Style denormalization pattern, style_code validation
- **Config**: Style views, style templates, style configuration

#### **Inventory-Related Requirements**

**Keywords**: "inventory", "stock", "quantity", "warehouse"
**Predicted Changes**:

- **Algorithm**: Inventory modules, stock calculations
- **LoadAPI**: Inventory LoadAPIs, warehouse denormalization
- **Config**: Inventory views, stock templates, warehouse configuration

#### **Analysis-Related Requirements**

**Keywords**: "analysis", "report", "analytics", "insights"
**Predicted Changes**:

- **Algorithm**: Analysis modules, calculation logic
- **LoadAPI**: Analysis LoadAPIs, data processing
- **Config**: Analysis views, report templates, analytics configuration

---

## 🚀 IMPLEMENTATION GUIDANCE

### **VIRAT's Requirement Analysis Process**

#### **Step 1: Requirement Classification**

1. **Read Requirement**: Parse requirement document
2. **Identify Keywords**: Extract key terms and concepts
3. **Classify Type**: Determine requirement type (Algorithm/LoadAPI/Config/Cross-Repository)
4. **Predict Impact**: Identify affected repositories

#### **Step 2: Repository Impact Analysis**

1. **Primary Repository**: Identify main repository for changes
2. **Secondary Repositories**: Identify supporting repositories
3. **Cross-Repository Dependencies**: Identify integration points
4. **Change Scope**: Determine extent of changes needed

#### **Step 3: Pattern Recognition**

1. **Existing Patterns**: Identify similar existing implementations
2. **Template Selection**: Choose appropriate implementation templates
3. **Registration Requirements**: Identify what needs to be registered
4. **Validation Needs**: Determine validation requirements

#### **Step 4: Implementation Planning**

1. **File Changes**: List all files that need modification
2. **Registration Updates**: Identify registration requirements
3. **Dependency Analysis**: Check for cross-repository dependencies
4. **Testing Strategy**: Plan validation and testing approach

---

## 📊 REQUIREMENT EXAMPLES

### **Example 1: Store SKU ROS Override**

**Requirement**: "Add store SKU level ROS override functionality"
**Analysis**:

- **Type**: LoadAPI + Algorithm (Cross-Repository)
- **Keywords**: "store", "sku", "ros", "override"
- **Repositories**: `ms-loadapis-ril-final` (Primary), `irisx-algo` (Secondary)
- **Changes**:
  - **LoadAPI**: StoreSkuRosOverrideLoadApi.py, store+SKU denormalization
  - **Algorithm**: ROS calculation logic, validation rules
  - **Config**: ROS views, ROS templates

### **Example 2: New ISS Module**

**Requirement**: "Create new ISS module for inventory management"
**Analysis**:

- **Type**: Algorithm (Primary)
- **Keywords**: "new module", "iss", "inventory"
- **Repositories**: `irisx-algo` (Primary), `irisx-config` (Secondary)
- **Changes**:
  - **Algorithm**: New ISS module directory, ModuleProvider registration
  - **Config**: ISS views, ISS templates, ISS configuration

### **Example 3: Style Brand Grading**

**Requirement**: "Add style brand grading analysis"
**Analysis**:

- **Type**: LoadAPI + Algorithm (Cross-Repository)
- **Keywords**: "style", "brand", "grading", "analysis"
- **Repositories**: `ms-loadapis-ril-final` (Primary), `irisx-algo` (Secondary)
- **Changes**:
  - **LoadAPI**: BrandGradingLoadApi.py, style denormalization
  - **Algorithm**: Brand grading logic, analysis calculations
  - **Config**: Brand grading views, analysis templates

---

## ✅ SUCCESS CRITERIA

### **Requirement Analysis Intelligence**

- [x] **Requirement Classification**: Complete classification system for all requirement types
- [x] **Repository Impact Analysis**: Clear mapping of requirements to repository changes
- [x] **Change Prediction**: Accurate prediction of files and changes needed
- [x] **Pattern Recognition**: Identification of existing patterns and templates
- [x] **Implementation Guidance**: Clear guidance for implementation approach

### **VIRAT Intelligence Enhancement**

- [x] **Keyword Analysis**: Intelligent keyword extraction and analysis
- [x] **Repository Mapping**: Automatic repository impact assessment
- [x] **Change Prediction**: Accurate prediction of required changes
- [x] **Pattern Matching**: Recognition of existing patterns and templates
- [x] **Implementation Planning**: Comprehensive implementation planning

**Result**: VIRAT now has complete intelligence for requirement analysis, repository impact assessment, and change prediction across all three repositories.

**Status**: ✅ **REQUIREMENT ANALYSIS INTELLIGENCE COMPLETE**
