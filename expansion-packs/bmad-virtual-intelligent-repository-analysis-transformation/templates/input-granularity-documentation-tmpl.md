# Input File Granularity Documentation Template

## Input: {INPUT_FILE_NAME}

### Overview
**Purpose**: {Brief description of what this input provides}
**Module**: {Module that consumes this input}
**Upload Frequency**: {How often this file is uploaded}

### Granularity Definition

**Natural Key**: ({dimension1}, {dimension2}, ..., {dimensionN})  
**Value Columns**: {value1}, {value2}, ..., {valueM}  
**Granularity Level**: {Dimension1}-{Dimension2}-...-{DimensionN} Level

### Schema

| Column Name | Data Type | Key/Value | Description | Example |
|-------------|-----------|-----------|-------------|---------|
| {column1}   | {type}    | KEY       | {description} | {example} |
| {column2}   | {type}    | KEY       | {description} | {example} |
| {column3}   | {type}    | VALUE     | {description} | {example} |

### Blanket/Wildcard Support

**Supported Blanket Dimensions**: 
- `{dimension1}` = {blanket_value} → {expansion_rule}
- `{dimension2}` = {blanket_value} → {expansion_rule}

**Expansion Rules**:
```
If {dimension} == {blanket_value}:
  Expand to all valid values of {dimension} that match {context}
  Preserve all other dimensions in expanded rows
```

### Data Examples

#### Valid Data
```
{dimension1},{dimension2},{value1},{value2}
{example_value1},{example_value2},{example_value3},{example_value4}
{example_value5},{example_value6},{example_value7},{example_value8}
```

#### Invalid Data (Dimension Loss)
```
# BAD: Same {dimension1} with different {dimension2} will cause overwrite
{dimension1},{dimension2},{value1}
1,A,100
1,B,200  # This will be lost if key uses only dimension1
```

### Storage in Algorithm

**Row Class**: `{RowClassName}`  
**File Class**: `{FileClassName}`  
**Data Class**: `{DataClassName}`

**Map Structure**:
```java
private Map<Key, {RowClassName}> {mapVariableName};

// Key construction MUST include ALL natural key dimensions
Key key = new Key({dimension1}, {dimension2}, ..., {dimensionN});
```

### Retrieval Pattern

**Getter Signature**:
```java
public {RowClassName} get{EntityName}({type1} {dimension1}, {type2} {dimension2}, ...)
```

**Usage Contract**:
- **MUST** provide all key dimensions when retrieving data
- **NEVER** omit dimensions even if context "suggests" a default
- **ALWAYS** resolve dimensions at call site before invoking getter

### Cross-Level Usage

**Defined At**: {Granularity Level where data is defined}  
**Used At**: {Granularity Level where data is consumed}

**Resolution Logic**:
```
If data defined at Level-A but used at Level-B:
  1. Identify mapping from Level-B → Level-A (e.g., store → channel)
  2. Resolve Level-A dimensions from Level-B context
  3. Pass ALL resolved dimensions to getter
  
Example:
  Defined: (channel, style) → coverDays
  Used at: (store, style)
  Resolution: store.channel → use getChannel(store) before lookup
```

### Validation Rules

**LoadAPI Validation**:
- [ ] Validate uniqueness of natural key combination
- [ ] Reject duplicate rows with same natural key
- [ ] Validate blanket entries don't conflict with explicit entries
- [ ] Ensure dimension values are valid references

**Algorithm Validation**:
- [ ] Verify map key includes ALL natural key dimensions
- [ ] Confirm getter signature matches map key structure
- [ ] Validate all call sites provide required dimensions
- [ ] Check for dimension resolution in cross-level usage

### Known Issues and Mitigations

**Issue**: {Description of any known granularity issues}  
**Mitigation**: {How the issue is prevented or handled}  
**Status**: {RESOLVED | MONITORING | ACCEPTED_RISK}

### Related Inputs/Outputs

**Dependent Inputs**:
- `{related_input_1}` - {relationship description}
- `{related_input_2}` - {relationship description}

**Generated Outputs**:
- `{output_1}` - {how this input affects the output}
- `{output_2}` - {how this input affects the output}

### Change History

| Date | Version | Change Description | Author |
|------|---------|-------------------|--------|
| {date} | {version} | {description} | {author} |

### Testing Checklist

- [ ] Unit test with single dimension value
- [ ] Unit test with multiple rows per reduced key (different omitted dimension)
- [ ] Unit test with blanket entries
- [ ] Integration test with cross-level usage
- [ ] Performance test with large datasets
- [ ] Negative test for duplicate natural keys

### References

- LoadAPI: `{LoadApiClassName}` in `{file_path}`
- Row Class: `{RowClassName}` in `{file_path}`
- Data Class: `{DataClassName}` in `{file_path}`
- Getter Method: `{getterName}()` in `{DataClassName}`

---

**Template Version**: 1.0  
**Last Updated**: {date}  
**Maintained By**: {team/person}

