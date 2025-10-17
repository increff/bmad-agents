# Planogram Creation Dual Attribute Implementation

## Overview
This document describes the implementation of the dual-attribute feature in the Planogram Creation module. This feature allows the planogram computation to work at either a single attribute level (e.g., COLOR) or a dual attribute level (e.g., COLOR + FABRIC).

## Changes Made

### 1. Java Backend (irisx-algo)

#### 1.1 Output File Updates
**Files Modified:**
- `src/main/java/com/increff/irisx/file/output/planogramCreation/ExportPlanogramOutputFile.java`
- `src/main/java/com/increff/irisx/file/output/planogramCreation/PlanogramOutputFile.java`

**Changes:**
- Added `attribute_b` field to the Parquet schema in `ExportPlanogramOutputFile.java`
- Added `attribute_b` column to the TSV headers in `PlanogramOutputFile.java`
- Updated the `write()` methods to include the `attribute_b` value in the output

**Impact:**
- The export output files (both Parquet and TSV formats) now include the `attribute_b` column
- When computation level is set to `SINGLE_ATTRIBUTE`, the `attribute_b` field will be `null`
- When computation level is set to `DUAL_ATTRIBUTE`, the `attribute_b` field will contain the second attribute value

#### 1.2 Existing Infrastructure (Already Present)
The following components were already implemented in the codebase:

- **Data Models:**
  - `PlanogramOutputRow.java` - Has `attributeB` field and dual constructors
  - `ExportPlanogramOutputRow.java` - Has `attributeB` field
  - `AttributeKey.java` - Wrapper class for single/dual attributes

- **Module Logic:**
  - `PlanogramCreationModule.java` - Logic to handle dual attribute computation
  - `CommonArgs.java` - Properties for `planogramAttribute`, `planogramAttributeB`, and `computationLevel`
  - `PlanogramComputationLevel.java` - Enum with `SINGLE_ATTRIBUTE` and `DUAL_ATTRIBUTE` options

- **Database Migration:**
  - `V65__REQ1176_PlanogramDualAttribute.sql` - Added `attribute_b` column to database tables

### 2. Database Configuration (irisx-config)

#### 2.1 Post-Deployment Configuration
**File Modified:**
- `export/post_deployment.sql`

**Changes Added:**
```sql
('planogram_attribute','${project_id}','SUBCATEGORY','1'),
('planogram_attribute_b','${project_id}','','1'),
('planogram_computation_level','${project_id}','SINGLE_ATTRIBUTE','1'),
```

**Parameters:**
1. **`planogram_attribute`** (existing)
   - Default: `SUBCATEGORY`
   - Description: Primary attribute for planogram computation
   - Valid values: Any attribute from the attribute group (e.g., COLOR, SUBCATEGORY, BRAND, FABRIC)

2. **`planogram_attribute_b`** (new)
   - Default: Empty string (disabled)
   - Description: Secondary attribute for dual-attribute planogram computation
   - Valid values: Any attribute from the attribute group, or empty to disable
   - Only used when `planogram_computation_level` is set to `DUAL_ATTRIBUTE`

3. **`planogram_computation_level`** (new)
   - Default: `SINGLE_ATTRIBUTE`
   - Description: Controls whether planogram computation uses single or dual attributes
   - Valid values:
     - `SINGLE_ATTRIBUTE` - Compute at single attribute level (backward compatible)
     - `DUAL_ATTRIBUTE` - Compute at dual attribute level (attributeA + attributeB)

#### 2.2 View Definitions (Already Present)
The following view definitions already include the `attribute_b` column:
- `view-creation/child-output-output_planogram.sql`
- `view-creation/child-output-export_planogram_output.sql`
- `export/export_planogram_output.sql`

## Usage

### Configuration Steps

1. **Set Primary Attribute** (existing behavior):
   ```sql
   UPDATE a_algo_properties 
   SET value = 'COLOR' 
   WHERE name = 'planogram_attribute' 
   AND project_id = '<project_id>';
   ```

2. **Enable Dual Attribute Mode** (new):
   ```sql
   -- Set secondary attribute
   UPDATE a_algo_properties 
   SET value = 'FABRIC' 
   WHERE name = 'planogram_attribute_b' 
   AND project_id = '<project_id>';
   
   -- Enable dual attribute computation
   UPDATE a_algo_properties 
   SET value = 'DUAL_ATTRIBUTE' 
   WHERE name = 'planogram_computation_level' 
   AND project_id = '<project_id>';
   ```

3. **Run Planogram Creation Module**:
   - The module will automatically detect the computation level
   - In `DUAL_ATTRIBUTE` mode, planogram will be computed at COLOR+FABRIC level
   - Output will include both `attribute` and `attribute_b` columns

### Output Format

**Single Attribute Mode (default):**
```
store_code | category | attribute | attribute_b | quantity | front_options
-----------|----------|-----------|-------------|----------|---------------
S001       | TOPS     | BLUE      | null        | 50       | 5
S001       | TOPS     | RED       | null        | 40       | 4
```

**Dual Attribute Mode:**
```
store_code | category | attribute | attribute_b | quantity | front_options
-----------|----------|-----------|-------------|----------|---------------
S001       | TOPS     | BLUE      | COTTON      | 30       | 3
S001       | TOPS     | BLUE      | POLYESTER   | 20       | 2
S001       | TOPS     | RED       | COTTON      | 25       | 2
S001       | TOPS     | RED       | POLYESTER   | 15       | 2
```

## Technical Details

### Data Flow
1. **Input**: OW (Optimum Width) output with attribute group data
2. **Processing**:
   - `PlanogramCreationModule` reads `planogram_computation_level` from properties
   - Based on level, extracts single or dual attributes from AG (Attribute Group)
   - Computes quantities at the appropriate granularity
   - Creates `AttributeKey` objects (single or dual)
3. **Output**: 
   - Internal: `output_planogram` table
   - Export: `export_planogram_output` (Parquet format)

### Backward Compatibility
- Default configuration uses `SINGLE_ATTRIBUTE` mode
- Existing implementations will continue to work without changes
- The `attribute_b` field will be `null` in single attribute mode
- All existing views and exports handle nullable `attribute_b` column

## Testing Recommendations

1. **Single Attribute Mode** (regression test):
   - Verify existing behavior unchanged
   - Confirm `attribute_b` is null/empty in output

2. **Dual Attribute Mode** (new feature):
   - Set both attributes and computation level
   - Verify output has granular data at dual attribute level
   - Check that quantities are split correctly across attribute combinations
   - Validate that `attribute_b` is populated correctly

3. **Edge Cases**:
   - Empty `planogram_attribute_b` with `DUAL_ATTRIBUTE` level (should handle gracefully)
   - Invalid attribute names (should validate)
   - Single attribute value for one of the attributes (still computes correctly)

## Related Files

### Java (irisx-algo)
- Module: `com.increff.irisx.module.planogramCreation.PlanogramCreationModule`
- Output Row: `com.increff.irisx.row.output.planogramCreation.PlanogramOutputRow`
- Export Row: `com.increff.irisx.row.output.planogramCreation.ExportPlanogramOutputRow`
- Output File: `com.increff.irisx.file.output.planogramCreation.PlanogramOutputFile`
- Export File: `com.increff.irisx.file.output.planogramCreation.ExportPlanogramOutputFile`
- Args: `com.increff.irisx.args.CommonArgs`
- Constants: `com.increff.irisx.constants.PlanogramComputationLevel`
- Helper: `com.increff.irisx.module.planogramCreation.AttributeKey`

### SQL (irisx-config)
- Configuration: `export/post_deployment.sql`
- Views: 
  - `view-creation/child-output-output_planogram.sql`
  - `view-creation/child-output-export_planogram_output.sql`
  - `export/export_planogram_output.sql`
- Migration: `irisx-algo/src/main/resources/db/migration/V65__REQ1176_PlanogramDualAttribute.sql`

## Implementation Status

✅ **Completed:**
- Export file schema updated with `attribute_b` field
- Output file headers updated with `attribute_b` column
- Configuration parameters added to post-deployment script
- Documentation created

✅ **Pre-existing (Already Implemented):**
- Data models with dual attribute support
- Module logic for dual attribute computation
- Database schema migration
- View definitions with attribute_b column

## Notes

- The feature provides flexibility for users to select computation granularity
- Useful for scenarios where planogram needs to be managed at a more detailed level (e.g., COLOR+FABRIC instead of just COLOR)
- The implementation maintains backward compatibility with existing single-attribute mode
- All database views and exports are already prepared to handle the new field

