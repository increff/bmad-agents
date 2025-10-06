# Database Operations Task

## Overview

This task handles all database operations required for irisx-config repository including SQL view creation, synchronization, export operations, and template query management.

## Steps

### 1. SQL View Creation

- **Input Views**: Create `view-creation/child-input-*.sql` files for new input data structures
- **Output Views**: Create `view-creation/child-output-*.sql` files for new output data structures
- **View Patterns**: Follow existing SQL view patterns and naming conventions
- **Data Source Configuration**: Configure OPENROWSET with proper DATA_SOURCE and FORMAT settings
- **Field Mapping**: Map input/output fields to appropriate SQL data types

### 2. Synchronization Operations

- **Sync Logic**: Create synchronization logic in `sync/` directory
- **Data Consistency**: Ensure data consistency between repositories and database
- **Sync Patterns**: Follow existing synchronization patterns and configurations
- **Error Handling**: Implement proper error handling for sync operations
- **Performance Optimization**: Optimize sync operations for large datasets

### 3. Export Operations

- **Export Configuration**: Create export configurations in `export/` directory
- **Export Formats**: Support multiple export formats (CSV, TSV, JSON, etc.)
- **Export Templates**: Create reusable export templates for common operations
- **Data Transformation**: Handle data transformation during export operations
- **Export Validation**: Validate exported data for completeness and accuracy

### 4. Template Query Management

- **TSV Templates**: Create TSV input templates in `template/` directory
- **Query Templates**: Create reusable SQL query templates
- **Template Patterns**: Follow existing template patterns and naming conventions
- **Template Validation**: Validate template syntax and structure
- **Template Documentation**: Document template usage and parameters

### 5. Configuration Updates

- **Module Input Config**: Update `module_input.json` with new input configurations
- **Module Output Config**: Update `module_output.json` with new output configurations
- **Upload Files Config**: Update `upload-files.json` with new file upload configurations
- **Schema Provider**: Update SchemaProvider with new data schemas
- **Filename Configuration**: Update filename configurations for new data structures

## Expected Outcomes

- SQL views created for all input and output data structures
- Synchronization operations configured and tested
- Export operations set up with proper configurations
- Template queries created and validated
- All configuration files updated with new entries

## Validation Criteria

- All SQL views are syntactically correct and follow existing patterns
- Synchronization operations work correctly with existing data
- Export operations produce correct output formats
- Template queries are reusable and well-documented
- Configuration files are valid JSON and consistent across repositories

## Critical Patterns

### SQL View Pattern

```sql
CREATE VIEW [input_{module}_{component}] AS
SELECT field1, field2, COALESCE(field3, '') field3
FROM
OPENROWSET(
BULK 'input/input_{module}_{component}/**',
DATA_SOURCE = '{{child}}',
FORMAT = 'CSV',
FIELDTERMINATOR = '\t',
ROWTERMINATOR = '\n',
PARSER_VERSION = '2.0',
HEADER_ROW = TRUE
)
WITH (
[field1] bigint, [field2] BIT, [field3] VARCHAR(512) COLLATE Latin1_General_100_BIN2_UTF8
) AS [_];
```

### TSV Template Pattern

```tsv
field1	field2	field3
# Field 1 - Description of field 1
# Field 2 - Description of field 2
# Field 3 - Description of field 3
# Example:
# value1	value2	value3
# value4	value5	value6
```

### Configuration Update Pattern

```json
{
  "module_name": {
    "input": {
      "field_name": {
        "type": "data_type",
        "required": true,
        "description": "Field description"
      }
    },
    "output": {
      "field_name": {
        "type": "data_type",
        "description": "Output field description"
      }
    }
  }
}
```
