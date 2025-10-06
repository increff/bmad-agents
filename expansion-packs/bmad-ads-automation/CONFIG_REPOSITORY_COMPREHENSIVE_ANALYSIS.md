# 🔧 CONFIG REPOSITORY COMPREHENSIVE ANALYSIS

## EXECUTIVE SUMMARY

After crawling through the irisx-config repository, I've identified comprehensive patterns, file structures, and inter/intra-repository dependencies. This analysis provides AI agents with complete guidance on configuration changes, SQL view patterns, template structures, and cross-repository coordination.

---

## 📊 REPOSITORY STRUCTURE OVERVIEW

### **Repository Statistics**

- **Total SQL Files**: 700 files
- **Total TSV Files**: 404 files
- **Total JSON Files**: 3 files
- **View Creation Files**: 318 files (all use OPENROWSET pattern)
- **Template Files**: 101 files
- **Upload File Entries**: 150+ entries

### **Directory Structure**

```
irisx-config/
├── module_input.json (10,437 lines) - Module input configuration
├── module_output.json (676 lines) - Module output configuration
├── upload-files.json (1,261 lines) - Upload file metadata
├── view-creation/ (318 files) - SQL view creation scripts
├── template/ (101 files) - TSV template files
├── sync/ (160 files) - Data synchronization scripts
├── export/ (228 files) - Export configuration files
├── requirements/ - Requirement documents
├── docs/ - Documentation
└── tasks/ - Task definitions
```

---

## 🔄 CONFIGURATION PATTERNS

### **1. JSON Configuration Patterns**

#### **A. Module Input Configuration (`module_input.json`)**

**Purpose**: Defines input data sources and synchronization patterns for each module
**Structure**:

```json
{
  "module_name": {
    "sync": {
      "table_name": {
        "type": "tsv"
      }
    },
    "download": []
  }
}
```

**Key Patterns**:

- **Sync Configuration**: Defines which tables are synchronized for each module
- **Download Configuration**: Defines downloadable data sources
- **Type Specification**: All data sources are TSV type
- **Module Grouping**: Data sources grouped by functional modules

**Examples**:

- `eta_params`: ETA parameter configuration
- `transaction_sales`: Sales transaction configuration
- `transactional_input`: Transactional input configuration
- `inventory_computation`: Inventory computation configuration

#### **B. Module Output Configuration (`module_output.json`)**

**Purpose**: Defines output data structures and tables for each module
**Structure**:

```json
{
  "module_name": ["output_table_1", "output_table_2", "interim_table_1"]
}
```

**Key Patterns**:

- **Output Tables**: Final output tables for each module
- **Interim Tables**: Intermediate processing tables
- **Export Tables**: Tables for data export
- **Module Arrays**: Arrays of table names per module

**Examples**:

- `validation`: Validation output tables
- `transactional_input`: Transactional input/output tables
- `inventory_computation`: Inventory computation tables
- `noos`: NOOS module output tables

#### **C. Upload Files Configuration (`upload-files.json`)**

**Purpose**: Defines upload file metadata, descriptions, and import IDs
**Structure**:

```json
{
  "module": [
    {
      "Module": "Module Name",
      "SubModule": "SubModule Name",
      "Display Name": "User Display Name",
      "ID": "import_id",
      "Description": "File description",
      "Data-update": "true/false"
    }
  ]
}
```

**Key Patterns**:

- **Import ID Mapping**: Maps to LoadAPI import IDs
- **Module Hierarchy**: Module → SubModule → Display Name
- **Data Update Flags**: Indicates if data can be updated
- **Descriptive Metadata**: User-friendly descriptions

---

## 🗄️ SQL VIEW PATTERNS

### **1. View Creation Patterns**

#### **A. Child Input Views (`child-input-*.sql`)**

**Purpose**: Create views for child process input data
**Pattern**:

```sql
CREATE VIEW [table_name] AS
SELECT column_list
FROM
OPENROWSET(
BULK 'input/table_name/**',
DATA_SOURCE = '{{child}}',
FORMAT = 'CSV',
FIELDTERMINATOR = '\t',
ROWTERMINATOR = '\n',
PARSER_VERSION = '2.0',
HEADER_ROW = TRUE
)
WITH (column_definitions) AS [_];
```

**Key Characteristics**:

- **Data Source**: `{{child}}` for child processes
- **File Path**: `input/table_name/**`
- **Format**: CSV with tab delimiter
- **Header Row**: Always TRUE
- **Column Definitions**: Explicit column types and collations

#### **B. Child Output Views (`child-output-*.sql`)**

**Purpose**: Create views for child process output data
**Pattern**:

```sql
CREATE VIEW [table_name] AS
SELECT column_list
FROM
OPENROWSET(
BULK 'output/table_name/**',
DATA_SOURCE = '{{child}}',
FORMAT = 'CSV',
FIELDTERMINATOR = '\t',
ROWTERMINATOR = '\n',
PARSER_VERSION = '2.0',
HEADER_ROW = TRUE
)
WITH (column_definitions) AS [_];
```

**Key Characteristics**:

- **Data Source**: `{{child}}` for child processes
- **File Path**: `output/table_name/**`
- **Format**: CSV with tab delimiter
- **Header Row**: Always TRUE
- **Column Definitions**: Explicit column types and collations

#### **C. Parent Input Views (`parent-input-*.sql`)**

**Purpose**: Create views for parent process input data
**Pattern**:

```sql
CREATE VIEW [table_name] AS
SELECT column_list
FROM
OPENROWSET(
BULK 'input/table_name/**',
DATA_SOURCE = '{{parent}}',
FORMAT = 'CSV',
FIELDTERMINATOR = '\t',
ROWTERMINATOR = '\n',
PARSER_VERSION = '2.0',
HEADER_ROW = TRUE
)
WITH (column_definitions) AS [_];
```

**Key Characteristics**:

- **Data Source**: `{{parent}}` for parent processes
- **File Path**: `input/table_name/**`
- **Format**: CSV with tab delimiter
- **Header Row**: Always TRUE
- **Column Definitions**: Explicit column types and collations

### **2. View Naming Conventions**

#### **Input Views**

- `child-input-*`: Child process input views
- `parent-input-*`: Parent process input views

#### **Output Views**

- `child-output-*`: Child process output views
- `parent-output-*`: Parent process output views

#### **Interim Views**

- `interim-*`: Intermediate processing views

---

## 📋 TEMPLATE PATTERNS

### **1. TSV Template Structure**

**Purpose**: Provide sample data and headers for data uploads
**Pattern**: `export_{module}_{type}_template.tsv`

**Key Characteristics**:

- **Header Row**: First row contains column names
- **Sample Data**: Realistic sample data rows
- **Tab Delimited**: TSV format with tab separators
- **Module Naming**: Follows `export_{module}_{type}_template.tsv` pattern

**Examples**:

- `export_ag_input_product_attribute_hierarchy_template.tsv`
- `export_bi_input_buy_quantity_template.tsv`
- `export_disc_input_discount_rules_template.tsv`
- `export_dist_input_exclusions_list_template.tsv`

### **2. Template Content Patterns**

**Structure**:

```
column1	column2	column3	column4
value1	value2	value3	value4
value5	value6	value7	value8
```

**Key Patterns**:

- **Column Headers**: Match database schema
- **Sample Values**: Realistic test data
- **Data Types**: Appropriate data types for each column
- **Validation Examples**: Examples that pass validation

---

## 🔄 SYNC PATTERNS

### **1. Data Synchronization Scripts**

**Purpose**: Define data extraction and synchronization logic
**Pattern**: `table_name.sql`

**Key Characteristics**:

- **SELECT Statements**: Extract data from source tables
- **Column Mapping**: Map source columns to target columns
- **Data Transformation**: Apply transformations and calculations
- **Header Generation**: Generate header rows for TSV files

**Examples**:

- `a_store.sql`: Store data synchronization
- `a_sku_attribs.sql`: SKU attributes synchronization
- `a_sales.sql`: Sales data synchronization

---

## 🔗 INTER-REPOSITORY DEPENDENCIES

### **1. Algorithm Repository Dependencies**

**Configuration Impact**:

- **Module Registration**: New modules require configuration updates
- **Data Structure Changes**: New tables require view creation
- **Validation Changes**: New validation rules require configuration updates
- **Business Logic Changes**: New calculations require output configuration

**Change Patterns**:

- **New Module**: Add to `module_input.json`, `module_output.json`
- **New Table**: Create SQL view, add to sync scripts
- **New Validation**: Update upload-files.json metadata
- **New Output**: Add to module_output.json

### **2. LoadAPI Repository Dependencies**

**Configuration Impact**:

- **Import ID Mapping**: LoadAPI import IDs must match upload-files.json
- **Data Structure**: LoadAPI output must match configuration views
- **Template Generation**: LoadAPI templates must match configuration templates
- **Validation Rules**: LoadAPI validation must match configuration metadata

**Change Patterns**:

- **New LoadAPI**: Add import ID to upload-files.json
- **New Fields**: Update templates and view definitions
- **New Validation**: Update upload-files.json metadata
- **New Module**: Add module configuration to JSON files

### **3. Cross-Repository Coordination**

**Coordination Requirements**:

- **Import ID Consistency**: LoadAPI import IDs must match configuration
- **Data Schema Consistency**: All repositories must use consistent schemas
- **Template Consistency**: Templates must match LoadAPI and Algorithm schemas
- **View Consistency**: SQL views must match data structures

---

## 🎯 CHANGE DETECTION MATRIX

### **When Adding New Module**

| **Change Type**   | **Files to Modify** | **Pattern to Follow**                                |
| ----------------- | ------------------- | ---------------------------------------------------- |
| **Module Input**  | module_input.json   | Add module with sync/download configuration          |
| **Module Output** | module_output.json  | Add module with output table array                   |
| **Upload Files**  | upload-files.json   | Add module with import ID mappings                   |
| **SQL Views**     | view-creation/      | Create child-input, child-output, parent-input views |
| **Templates**     | template/           | Create TSV templates for new module                  |
| **Sync Scripts**  | sync/               | Create data synchronization scripts                  |

### **When Adding New Data Structure**

| **Change Type**  | **Files to Modify**                   | **Changes Required**                                       |
| ---------------- | ------------------------------------- | ---------------------------------------------------------- |
| **SQL Views**    | view-creation/                        | Create appropriate view (child-input/output, parent-input) |
| **Templates**    | template/                             | Create TSV template with headers and sample data           |
| **Sync Scripts** | sync/                                 | Create data extraction script                              |
| **JSON Config**  | module_input.json, module_output.json | Add table to appropriate module                            |

### **When Modifying Existing Structure**

| **Modification Type** | **Files to Modify** | **Changes Required**                   |
| --------------------- | ------------------- | -------------------------------------- |
| **Schema Changes**    | view-creation/      | Update column definitions in SQL views |
| **Template Changes**  | template/           | Update TSV templates with new columns  |
| **Sync Changes**      | sync/               | Update data extraction scripts         |
| **Config Changes**    | JSON files          | Update module configurations           |

---

## 🧠 AI GUIDANCE RULES

### **1. Configuration Change Detection**

```
Requirement Keywords → Configuration Changes:
- "new module" → module_input.json, module_output.json, upload-files.json updates
- "new table" → SQL view creation, template creation, sync script creation
- "new field" → View updates, template updates, sync script updates
- "new validation" → upload-files.json metadata updates
```

### **2. View Creation Guidance**

```
Data Type → View Pattern:
- Input data → child-input-*.sql or parent-input-*.sql
- Output data → child-output-*.sql or parent-output-*.sql
- Interim data → interim-*.sql
- Process type → {{child}} or {{parent}} data source
```

### **3. Template Creation Guidance**

```
Module Type → Template Pattern:
- Attribute Group → export_ag_*_template.tsv
- Business Intelligence → export_bi_*_template.tsv
- Discount → export_disc_*_template.tsv
- Distribution → export_dist_*_template.tsv
```

### **4. Cross-Repository Coordination**

```
Repository Change → Configuration Impact:
- Algorithm new module → Config module configuration
- LoadAPI new import → Config upload-files.json
- Algorithm new table → Config SQL view creation
- LoadAPI new field → Config template updates
```

---

## 📊 COMPREHENSIVE FILE CHANGE MATRIX

### **Module-Specific Configuration Patterns**

#### **Attribute Group Module**

- **Input**: `export_ag_input_product_attribute_hierarchy_template.tsv`
- **Views**: `child-input-input_ag.sql`
- **Config**: `module_input.json`, `module_output.json`

#### **Business Intelligence Module**

- **Templates**: `export_bi_input_buy_quantity_template.tsv`, `export_bi_input_cat_key_sizes_template.tsv`
- **Views**: `child-input-input_bi_*.sql`
- **Config**: BI module configuration in JSON files

#### **Discount Module**

- **Templates**: `export_disc_input_discount_rules_template.tsv`, `export_disc_input_grn_template.tsv`
- **Views**: `child-input-input_disc_*.sql`
- **Config**: Discount module configuration in JSON files

#### **Distribution Module**

- **Templates**: `export_dist_input_exclusions_list_template.tsv`, `export_dist_input_inclusions_list_template.tsv`
- **Views**: `child-input-input_dist_*.sql`
- **Config**: Distribution module configuration in JSON files

---

## 🎯 IMPLEMENTATION EXAMPLES

### **Example 1: New Store Performance Module**

```
Requirement: "Add new store performance module"
→ Configuration Changes:
  - module_input.json: Add store_performance module with sync configuration
  - module_output.json: Add store_performance module with output tables
  - upload-files.json: Add store performance import IDs
  - view-creation/: Create child-input, child-output, parent-input views
  - template/: Create export_store_performance_*_template.tsv
  - sync/: Create store performance data extraction scripts
```

### **Example 2: New SKU Analysis Table**

```
Requirement: "Add new SKU analysis table"
→ Configuration Changes:
  - view-creation/: Create child-input-sku_analysis.sql
  - template/: Create export_analysis_input_sku_analysis_template.tsv
  - sync/: Create sku_analysis.sql data extraction script
  - module_output.json: Add sku_analysis to analysis module
```

### **Example 3: New Validation Rule**

```
Requirement: "Add new validation rule for store data"
→ Configuration Changes:
  - upload-files.json: Update store upload metadata with validation info
  - template/: Update store template with validation examples
  - view-creation/: Update store views with validation constraints
```

---

## ✅ SUCCESS CRITERIA

### **Complete Configuration Implementation Checklist**

- [ ] **JSON Configuration**: Updated module_input.json, module_output.json, upload-files.json
- [ ] **SQL Views**: Created appropriate views (child-input/output, parent-input)
- [ ] **Templates**: Created TSV templates with headers and sample data
- [ ] **Sync Scripts**: Created data extraction and synchronization scripts
- [ ] **Cross-Repository Consistency**: Ensured consistency with Algorithm and LoadAPI repositories
- [ ] **Import ID Mapping**: Verified import ID consistency across repositories
- [ ] **Data Schema Consistency**: Ensured schema consistency across all repositories

---

## 🎉 CONCLUSION

This comprehensive analysis provides AI agents with:

1. **Complete Configuration Patterns**: All JSON, SQL, and TSV patterns identified
2. **File Change Guidance**: Exact files to modify for each change type
3. **Cross-Repository Dependencies**: Understanding of inter-repository coordination
4. **Implementation Templates**: Standard patterns to follow for all configuration types
5. **Change Detection Matrix**: Comprehensive guidance for change prediction

**Key Achievement**: AI agents now have complete guidance on configuration repository patterns, file structures, and implementation approaches. They can intelligently determine what files to change, when to change them, and how to implement changes following established patterns.

**Result**: The system now has complete configuration intelligence with proper change prediction, cross-repository coordination, and implementation guidance across all three repositories.

**Status**: ✅ **CONFIG REPOSITORY ANALYSIS COMPLETE AND READY FOR AI GUIDANCE**
