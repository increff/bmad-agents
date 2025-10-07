# Repository Pattern Analysis - Deep Understanding

## Overview

This document provides a comprehensive analysis of the patterns across all three repositories to guide proper implementation and prevent random file creation.

## LoadAPI Repository Patterns (`ms-loadapis-ril-final`)

### Directory Structure

```
loadapi/
├── common/                    # Shared base classes and utilities
│   ├── LoadApi.py            # Base LoadAPI class
│   ├── MsgErrors.py          # Error message definitions
│   └── __init__.py
├── {module}/                 # Module-specific LoadAPI implementations
│   ├── {ModuleName}LoadApi.py
│   └── __init__.py
└── __init__.py               # Main package initialization
```

### Key Patterns

#### 1. Module Organization

- **Each module has its own directory**: `iss/`, `otb/`, `reordering/`, etc.
- **Module directories contain**: LoadAPI classes and `__init__.py`
- **Naming convention**: `{ModuleName}LoadApi.py`

#### 2. LoadAPI Class Structure

```python
class {ModuleName}LoadApi(LoadApi):
    TSV_HEADER = ["field1", "field2", "field3"]
    DB_HEADER = ["field1", "field2", "field3"]

    def __init__(self):
        super().__init__()
        self.import_id = "{module_name}_{specific_name}"

    def validate_row(self, row_data):
        # Validation logic matching Row class fields
```

#### 3. Registration Pattern

- **loadapi_provider.py**: Registers all LoadAPI instances
- **Module **init**.py**: Exports LoadAPI classes
- **Main **init**.py**: Imports module packages

#### 4. Import ID Pattern

- **MUST match FileName constant**: `export_{module}_input_{specific_name}`
- **Example**: `store_category_pivotal_tag_override` matches `EXPORT_STORE_CATEGORY_PIVOTAL_TAG_OVERRIDE`

## Algorithm Repository Patterns (`irisx-algo`)

### Directory Structure

```
src/main/java/com/increff/irisx/
├── row/input/{module}/        # Row classes for data structures
├── file/input/{module}/       # File classes for TSV processing
├── module/{module}/           # Business logic modules
├── constants/
│   └── FileName.java         # File name constants
└── util/                     # Utility classes
```

### Key Patterns

#### 1. Row Class Structure

```java
package com.increff.irisx.row.input.{module};

public class {ModuleName}Row {
    public {type} {field1};
    public {type} {field2};
    // No constructors, getters, setters - just public fields
}
```

#### 2. File Class Structure

```java
package com.increff.irisx.file.input.{module};

public class {ModuleName}File extends AbstractTSVFile<{ModuleName}Row> {
    @Override
    protected {ModuleName}Row read(DataRow dataRow) throws Exception {
        {ModuleName}Row row = new {ModuleName}Row();
        row.{field1} = dataRow.get{Type}("{field1}");
        // Map all fields from DataRow to Row
        return row;
    }

    @Override
    protected String[] getHeaders() {
        return new String[]{"field1", "field2", "field3"};
    }
}
```

#### 3. FileName Constants

```java
public static final String EXPORT_{MODULE}_{TYPE}_{SPECIFIC_NAME} = "export_{module}_{type}_{specific_name}";
```

#### 4. Module Structure

- **Business logic modules**: Located in `module/{module}/`
- **Data processing**: Uses Row and File classes
- **Integration**: Connects with LoadAPI through FileName constants

## Config Repository Patterns (`irisx-config`)

### Directory Structure

```
├── template/                 # TSV templates for data upload
├── view-creation/           # SQL views for data processing
├── module_input.json        # Input configuration
├── module_output.json       # Output configuration
└── upload-files.json        # File upload configuration
```

### Key Patterns

#### 1. Template Files

- **Naming**: `export_{module}_{type}_{specific_name}_template.tsv`
- **Headers**: Must match Row class fields exactly
- **Purpose**: Define data structure for uploads

#### 2. SQL Views

- **Input views**: `child-input-export_{module}_{type}_{specific_name}.sql`
- **Output views**: `child-output-export_{module}_{type}_{specific_name}.sql`
- **Purpose**: Database views for data processing

#### 3. JSON Configuration

- **module_input.json**: Input module configuration
- **module_output.json**: Output module configuration
- **upload-files.json**: File upload configuration

## Cross-Repository Dependencies

### 1. FileName Constants → LoadAPI Import ID

- **Algorithm**: `EXPORT_STORE_CATEGORY_PIVOTAL_TAG_OVERRIDE = "export_iss_input_store_category_pivotal_tag_override"`
- **LoadAPI**: `self.import_id = "store_category_pivotal_tag_override"`
- **MUST MATCH**: The LoadAPI import_id must be extracted from the FileName constant

### 2. Row Class → LoadAPI Headers

- **Algorithm**: Row class fields define data structure
- **LoadAPI**: TSV_HEADER and DB_HEADER must match Row class fields exactly
- **Validation**: LoadAPI validation must match Row class field types

### 3. File Class → Template Headers

- **Algorithm**: File class getHeaders() method
- **Config**: Template file headers must match File class headers
- **Consistency**: All three must be identical

### 4. Module Directory Structure

- **LoadAPI**: `loadapi/{module}/`
- **Algorithm**: `row/input/{module}/`, `file/input/{module}/`, `module/{module}/`
- **Config**: `template/export_{module}_*`, `view-creation/*{module}*`

## Implementation Guidelines

### 1. BEFORE Creating New Files

1. **Check if module directory exists** in all three repositories
2. **Find existing similar implementations** to understand patterns
3. **Verify FileName constants** exist in Algorithm repository
4. **Check if LoadAPI already exists** for the same data structure

### 2. Module Discovery Process

1. **Search existing modules**: `find . -name "*{keyword}*" -type d`
2. **Check LoadAPI modules**: `ls loadapi/`
3. **Check Algorithm modules**: `ls src/main/java/com/increff/irisx/row/input/`
4. **Check Config templates**: `ls template/ | grep {module}`

### 3. File Creation Rules

1. **NEVER create new module directories** without checking existing ones
2. **ALWAYS check for existing LoadAPI** before creating new ones
3. **VERIFY FileName constants** exist before creating LoadAPI
4. **MATCH existing patterns** exactly in structure and naming

### 4. Validation Requirements

1. **Import ID matching**: LoadAPI import_id must match FileName constant
2. **Header consistency**: Row fields, File headers, LoadAPI headers, Template headers must all match
3. **Registration completeness**: LoadAPI must be registered in provider and **init**.py
4. **Type consistency**: Validation logic must match actual data types

## Common Mistakes to Avoid

### 1. Random File Creation

- **DON'T**: Create new module directories without checking existing ones
- **DO**: Find existing similar modules and follow their patterns

### 2. Inconsistent Naming

- **DON'T**: Use different naming conventions across repositories
- **DO**: Follow established patterns exactly

### 3. Missing Dependencies

- **DON'T**: Create LoadAPI without corresponding FileName constant
- **DO**: Verify all dependencies exist before implementation

### 4. Incomplete Registration

- **DON'T**: Create LoadAPI without proper registration
- **DO**: Register in both loadapi_provider.py and **init**.py

## Business Story Creation Process

### 1. Requirement Analysis

1. **Parse requirement** to understand business need
2. **Identify data structure** required
3. **Determine module** based on business domain
4. **Map to existing patterns** in repositories

### 2. Change Identification

1. **Check existing implementations** for similar functionality
2. **Identify missing components** (Row, File, LoadAPI, Config)
3. **Plan implementation order** based on dependencies
4. **Validate against existing patterns**

### 3. Implementation Planning

1. **Create business story** explaining the requirement
2. **Map to technical changes** needed
3. **Identify cross-repository impacts**
4. **Plan testing and validation**

## Search Commands for Pattern Discovery

### LoadAPI Discovery

```bash
# Find existing LoadAPI classes
find loadapi/ -name "*LoadApi.py" | head -5

# Find module directories
ls loadapi/ | grep -v __pycache__

# Find specific module LoadAPIs
find loadapi/ -name "*{module}*LoadApi.py"
```

### Algorithm Discovery

```bash
# Find Row classes
find row/input/ -name "*Row.java" | head -5

# Find File classes
find file/input/ -name "*File.java" | head -5

# Find FileName constants
grep -r "public static final String" FileName.java | head -10

# Find specific module files
find . -path "*/input/{module}/*" -name "*.java"
```

### Config Discovery

```bash
# Find templates
ls template/ | grep {module}

# Find SQL views
ls view-creation/ | grep {module}

# Find JSON configurations
grep -r "{module}" *.json
```

## Conclusion

The key to proper implementation is **understanding existing patterns** and **following them exactly**. Before creating any new files, always:

1. **Search for existing similar implementations**
2. **Understand the patterns and dependencies**
3. **Create business stories to understand requirements**
4. **Plan changes based on existing patterns**
5. **Validate consistency across all repositories**

This approach prevents random file creation and ensures proper integration with the existing system.
