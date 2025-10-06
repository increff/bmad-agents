# Database Operations Task

## Overview

This task handles all essential database operations required for implementing requirements: view creation, sync operations, export configurations, and template queries.

## Prerequisites

- Repository paths configured in VIRAT configuration
- Access to irisx-config repository (contains all database operations)
- Understanding of existing SQL patterns and structures

## Database Operations

### 1. View Creation Operations

**Command**: `*create-views`

**Purpose**: Create SQL views for input and output data structures

**Steps**:

1. **Analyze Requirement for View Needs**:
   - Identify if new input views are needed (`child-input-*.sql`)
   - Identify if new output views are needed (`child-output-*.sql`)
   - Determine view structure based on data requirements

2. **Create Input Views**:

   ```sql
   -- Example: child-input-distribution-store-sku-ros-override.sql
   CREATE OR REPLACE VIEW child_input_distribution_store_sku_ros_override AS
   SELECT
       store_id,
       sku_id,
       ros_override_value,
       created_at,
       updated_at
   FROM distribution_store_sku_ros_override
   WHERE is_active = true;
   ```

3. **Create Output Views**:

   ```sql
   -- Example: child-output-distribution-store-sku-ros-override.sql
   CREATE OR REPLACE VIEW child_output_distribution_store_sku_ros_override AS
   SELECT
       store_id,
       sku_id,
       calculated_ros,
       override_ros,
       final_ros,
       calculation_date
   FROM distribution_ros_calculation_result
   WHERE calculation_date >= CURRENT_DATE - INTERVAL '30 days';
   ```

4. **Validate View Creation**:
   - Test view syntax and structure
   - Verify view returns expected data
   - Check view performance and optimization

### 2. Sync Operations

**Command**: `*setup-sync`

**Purpose**: Configure synchronization between repositories and database

**Steps**:

1. **Analyze Sync Requirements**:
   - Identify data synchronization needs
   - Map sync sources and destinations
   - Determine sync frequency and triggers

2. **Create Sync Configuration**:

   ```yaml
   # sync/distribution-store-sku-ros-override-sync.yaml
   sync_config:
     name: 'distribution_store_sku_ros_override_sync'
     source: 'irisx-algo'
     destination: 'irisx-config'
     frequency: 'hourly'
     triggers:
       - 'data_change'
       - 'manual_trigger'
     validation:
       - 'data_integrity_check'
       - 'schema_validation'
   ```

3. **Implement Sync Logic**:
   - Create sync scripts and procedures
   - Implement data validation and error handling
   - Set up monitoring and logging

4. **Test Sync Operations**:
   - Test sync functionality
   - Validate data consistency
   - Check error handling and recovery

### 3. Export Operations

**Command**: `*setup-export`

**Purpose**: Configure data export functionality for new requirements

**Steps**:

1. **Analyze Export Requirements**:
   - Identify data export needs
   - Determine export formats and destinations
   - Map export data sources

2. **Create Export Configuration**:

   ```yaml
   # export/distribution-store-sku-ros-override-export.yaml
   export_config:
     name: 'distribution_store_sku_ros_override_export'
     data_source: 'child_output_distribution_store_sku_ros_override'
     formats:
       - 'csv'
       - 'json'
       - 'excel'
     destinations:
       - 'file_system'
       - 'api_endpoint'
       - 'email'
     schedule: 'daily'
   ```

3. **Implement Export Logic**:
   - Create export scripts and procedures
   - Implement format conversion
   - Set up delivery mechanisms

4. **Test Export Operations**:
   - Test export functionality
   - Validate export data accuracy
   - Check delivery mechanisms

### 4. Template Queries

**Command**: `*create-template-queries`

**Purpose**: Create reusable query templates for common operations

**Steps**:

1. **Analyze Template Requirements**:
   - Identify common query patterns
   - Determine template parameters
   - Map template usage scenarios

2. **Create Query Templates**:

   ```sql
   -- template-queries/distribution-ros-override-template.sql
   -- Template: Get ROS override data for specific store and SKU
   -- Parameters: @store_id, @sku_id, @date_range

   SELECT
       store_id,
       sku_id,
       ros_override_value,
       effective_date,
       expiry_date
   FROM distribution_store_sku_ros_override
   WHERE store_id = @store_id
     AND sku_id = @sku_id
     AND effective_date <= @date_range
     AND (expiry_date IS NULL OR expiry_date >= @date_range)
   ORDER BY effective_date DESC;
   ```

3. **Create Template Documentation**:
   - Document template parameters
   - Provide usage examples
   - Create parameter validation rules

4. **Test Template Queries**:
   - Test with various parameters
   - Validate query performance
   - Check parameter validation

### 5. Database Schema Updates

**Command**: `*update-schema`

**Purpose**: Update database schema for new requirements

**Steps**:

1. **Analyze Schema Changes**:
   - Identify required table modifications
   - Determine column additions/modifications
   - Map foreign key relationships

2. **Create Schema Migration**:

   ```sql
   -- migrations/add_store_sku_ros_override.sql
   ALTER TABLE distribution_store_sku_ros_override
   ADD COLUMN IF NOT EXISTS ros_override_value DECIMAL(10,4),
   ADD COLUMN IF NOT EXISTS effective_date DATE,
   ADD COLUMN IF NOT EXISTS expiry_date DATE,
   ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

   CREATE INDEX IF NOT EXISTS idx_distribution_ros_override_store_sku
   ON distribution_store_sku_ros_override(store_id, sku_id);
   ```

3. **Validate Schema Changes**:
   - Test migration scripts
   - Verify data integrity
   - Check performance impact

### 6. Configuration Updates

**Command**: `*update-db-config`

**Purpose**: Update database configuration files

**Steps**:

1. **Update Module Input Configuration**:

   ```json
   // module_input.json
   {
     "distribution": {
       "store_sku_ros_override": {
         "table": "distribution_store_sku_ros_override",
         "view": "child_input_distribution_store_sku_ros_override",
         "columns": ["store_id", "sku_id", "ros_override_value", "effective_date", "expiry_date"],
         "validation": {
           "required": ["store_id", "sku_id", "ros_override_value"],
           "data_types": {
             "store_id": "integer",
             "sku_id": "integer",
             "ros_override_value": "decimal"
           }
         }
       }
     }
   }
   ```

2. **Update Module Output Configuration**:

   ```json
   // module_output.json
   {
     "distribution": {
       "store_sku_ros_override": {
         "table": "distribution_ros_calculation_result",
         "view": "child_output_distribution_store_sku_ros_override",
         "columns": ["store_id", "sku_id", "calculated_ros", "override_ros", "final_ros"],
         "export_formats": ["csv", "json", "excel"]
       }
     }
   }
   ```

3. **Update Upload Files Configuration**:
   ```json
   // upload-files.json
   {
     "distribution_store_sku_ros_override": {
       "file_types": ["csv", "xlsx"],
       "required_columns": ["store_id", "sku_id", "ros_override_value"],
       "validation_rules": {
         "store_id": "integer_range:1-9999",
         "sku_id": "integer_range:1-999999",
         "ros_override_value": "decimal_range:0-100"
       }
     }
   }
   ```

## Integration with Implementation Workflow

### Database Operations in Implementation Plan

1. **Pre-Implementation**:
   - Analyze database requirements
   - Plan schema changes
   - Design views and queries

2. **During Implementation**:
   - Create database schema changes
   - Implement views and queries
   - Set up sync and export operations

3. **Post-Implementation**:
   - Validate database operations
   - Test all database functionality
   - Update configuration files

### Success Criteria

- All required database views are created and functional
- Sync operations are configured and working
- Export operations are set up and tested
- Template queries are created and documented
- Database schema is updated correctly
- Configuration files are updated with new database operations
- All database operations are validated and tested

### Error Handling

- **View Creation Errors**: Validate SQL syntax and test views
- **Sync Errors**: Implement error handling and retry mechanisms
- **Export Errors**: Validate data and check delivery mechanisms
- **Schema Errors**: Test migrations and validate data integrity
- **Configuration Errors**: Validate JSON syntax and test configurations

## Expected Outcomes

- Complete database operations implementation
- Functional views, sync, export, and template queries
- Updated configuration files
- Validated and tested database functionality
- Comprehensive documentation of database operations
