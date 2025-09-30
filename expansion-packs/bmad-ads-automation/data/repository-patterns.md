# Repository Patterns and Templates

## Overview

This document contains the actual patterns and templates discovered from crawling the three interconnected repositories: `irisx-algo`, `ms-loadapis-ril-final`, and `irisx-config`.

## Java Module Patterns (irisx-algo)

### Abstract Allocation Module Pattern
```java
@Component("{moduleName}Allocation")
public class {ModuleName}AllocationModule extends AbstractAllocationModule {
    
    @Autowired
    protected {ModuleName}OutputUtility {moduleName}OutputUtility;
    
    @Autowired
    protected {ModuleName} {moduleName};
    
    @Autowired
    @Qualifier("{moduleName}IterationRunner")
    protected {ModuleName}IterationRunner iterationRunner;
    
    @Autowired
    protected {ModuleName}Helper {moduleName}Helper;
    
    // Implementation methods
}
```

### Distribution Allocation Module Example
```java
@Component("distributionAllocation")
public class DistributionAllocationModule extends AbstractAllocationModule {
    
    @Autowired
    protected DistributionOutputUtility distributionOutputUtility;
    
    @Autowired
    protected Distribution distribution;
    
    @Autowired
    @Qualifier("distributionIterationRunner")
    protected DistributionIterationRunner iterationRunner;
    
    @Autowired
    protected DistributionHelper distributionHelper;
    
    @Autowired
    @Qualifier("distributionPlanogramIncrementer")
    protected DistributionPlanogramIncrementerModule distributionPlanogramIncrementer;
}
```

### Data Class Pattern
```java
public class {ModuleName}Data {
    // Fields with proper naming conventions
    private String fieldName;
    private Integer numericField;
    private Boolean flagField;
    
    // Getters and setters
    public String getFieldName() { return fieldName; }
    public void setFieldName(String fieldName) { this.fieldName = fieldName; }
}
```

### Row Class Pattern
```java
public class {ModuleName}Row {
    // Input/Output row structure
    private String column1;
    private String column2;
    private Integer column3;
    
    // Getters and setters following naming conventions
}
```

## Python Load API Patterns (ms-loadapis-ril-final)

### Base Load API Pattern
```python
class {ModuleName}LoadApi(LoadApi):
    {MODULE}_HEADER = ["field1", "field2", {"flag": "field3"}, "field4"]
    
    def __init__(self, parent, project, **kwargs):
        super().__init__(
            parent,
            project,
            {ModuleName}LoadApi.{MODULE}_HEADER,
            ["key1", "key2"],
            optional_header=["optional_field"],
            **kwargs
        )
```

### Distribution Store Load API Example
```python
class DistributionStoreLoadApi(LoadApi):
    DIST_STORE_HEADER = [
        "store",
        {"flag": "distribution_enabled"},
        "inward_flag",
        "outward_flag",
        "ist_group",
    ]
    
    def __init__(self, parent, project, **kwargs):
        super().__init__(
            parent,
            project,
            DistributionStoreLoadApi.DIST_STORE_HEADER,
            ["store"],
            optional_header=["store"],
            **kwargs
        )
```

### Store SKU ROS Override Load API Example
```python
class StoreSkuRosOverrideLoadApi(LoadApi):
    STORE_SKU_ROS_OVERRIDE_HEADER = [
        "store_id",
        "sku_id", 
        "ros_override"
    ]
    
    def __init__(self, parent, project, **kwargs):
        super().__init__(
            parent,
            project,
            StoreSkuRosOverrideLoadApi.STORE_SKU_ROS_OVERRIDE_HEADER,
            ["store_id", "sku_id"],
            **kwargs
        )
```

## Configuration Patterns (irisx-config)

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

### Distribution Store SKU ROS Override Template Example
```tsv
store_id	sku_id	ros_override
# Store ID - Unique identifier for the store
# SKU ID - Unique identifier for the SKU
# ROS Override - Manual override value for Rate of Sale (optional, leave empty for auto-calculation)
# Example:
# 1001	SKU001	2.5
# 1001	SKU002	
# 1002	SKU001	1.8
```

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

### Distribution Store SQL View Example
```sql
CREATE VIEW [input_dist_store] AS
SELECT store, flag, inward_flag, outward_flag, COALESCE(ist_group, '') ist_group , consider_store_empty_while_inwards
FROM
OPENROWSET(
BULK 'input/input_dist_store/**',
DATA_SOURCE = '{{child}}',
FORMAT = 'CSV',
FIELDTERMINATOR = '\t',
ROWTERMINATOR = '\n',
PARSER_VERSION = '2.0',
HEADER_ROW = TRUE
)
WITH (
[store] bigint, [flag] BIT, [inward_flag] BIT, [outward_flag] BIT, [ist_group] VARCHAR(512) COLLATE Latin1_General_100_BIN2_UTF8, [consider_store_empty_while_inwards] BIT
) AS [_];
```

## Naming Conventions

### Java Naming Conventions
- **Modules**: `{ModuleName}AllocationModule.java`
- **Components**: `@Component("{moduleName}Allocation")`
- **Qualifiers**: `@Qualifier("{moduleName}IterationRunner")`
- **Fields**: camelCase (e.g., `distributionOutputUtility`)
- **Methods**: camelCase (e.g., `getFieldName()`)

### Python Naming Conventions
- **Load APIs**: `{ModuleName}LoadApi.py`
- **Classes**: `{ModuleName}LoadApi`
- **Headers**: `{MODULE}_HEADER`
- **Methods**: snake_case (e.g., `load_data()`)

### Configuration Naming Conventions
- **TSV Templates**: `export_{module}_input_{component}_template.tsv`
- **SQL Views**: `child-input-input_{module}_{component}.sql`
- **Configuration Keys**: snake_case (e.g., `module_input`)

## Shared Dependencies

### Abstract Classes
- **AbstractAllocationModule**: Extended by 6+ modules
- **BaseIterationRunner**: Used by multiple iteration-based modules
- **BaseDistributionData**: Core data structure with 100+ fields
- **BaseHelper**: Shared helper utilities

### Shared Constants
- **GenericConstants**: Common constants used across modules
- **DistributionConstants**: Distribution-specific constants
- **ValidationUtilConstants**: Validation constants

### Shared Utilities
- **ValidationUtil**: Shared validation logic
- **ConversionUtil**: Shared conversion logic
- **ObjectMaps**: Shared object mapping utilities
- **ErrorUtil**: Shared error handling utilities

## Change Patterns

### Pattern 1: New Column Addition
1. **Java**: Add field to data classes, update getters/setters
2. **Python**: Update load API schemas
3. **Config**: Update TSV templates, SQL views

### Pattern 2: New Input Creation
1. **Python**: Create new load API class
2. **Config**: Create TSV template, update module_input.json

### Pattern 3: Formula/Calculation Changes
1. **Java**: Update calculation methods in relevant modules
2. **Consider**: Shared abstract class impacts

### Pattern 4: New Module Creation
1. **Java**: Create new module classes
2. **Python**: Create supporting load APIs
3. **Config**: Create configuration entries

### Pattern 5: Override Mechanisms
1. **Java**: Add override fields and logic
2. **Python**: Create override load APIs
3. **Config**: Create override input templates

## Integration Points

### Data Flow
```
Input Data → Load APIs (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

### Dependencies
- **Spring**: Heavy use of `@Autowired` and `@Qualifier`
- **Azure**: All data processing through Azure SQL
- **TSV**: All input data in TSV format
- **SQL Views**: 200+ SQL views with complex dependencies

## Validation Patterns

### Java Validation
- **Validation Modules**: 25+ validation modules
- **Error Handling**: Consistent error handling patterns
- **Testing**: Maven-based testing framework

### Python Validation
- **Load API Validation**: Built-in validation in LoadApi base class
- **Schema Validation**: TSV header validation
- **Error Handling**: Consistent error handling patterns

### Configuration Validation
- **JSON Validation**: Configuration file validation
- **Schema Validation**: Data schema validation
- **Integration Validation**: Cross-repository validation
