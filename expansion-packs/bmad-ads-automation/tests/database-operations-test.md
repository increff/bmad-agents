# Database Operations Test - Sample Requirement

## Test Scenario

**Requirement**: "ADD a new input in distribution to store STORE SKU LEVEL ROS OVERRIDE"

## Expected Database Operations

### 1. View Creation Operations

#### Input View Creation

```sql
-- child-input-distribution-store-sku-ros-override.sql
CREATE OR REPLACE VIEW child_input_distribution_store_sku_ros_override AS
SELECT
    store_id,
    sku_id,
    ros_override_value,
    effective_date,
    expiry_date,
    is_active,
    created_at,
    updated_at
FROM distribution_store_sku_ros_override
WHERE is_active = true
  AND effective_date <= CURRENT_DATE
  AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE);
```

#### Output View Creation

```sql
-- child-output-distribution-store-sku-ros-override.sql
CREATE OR REPLACE VIEW child_output_distribution_store_sku_ros_override AS
SELECT
    store_id,
    sku_id,
    calculated_ros,
    override_ros,
    final_ros,
    calculation_date,
    calculation_method
FROM distribution_ros_calculation_result
WHERE calculation_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY store_id, sku_id, calculation_date DESC;
```

### 2. Sync Operations

#### Sync Configuration

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
    - 'schedule_trigger'
  validation:
    - 'data_integrity_check'
    - 'schema_validation'
    - 'business_rule_validation'
  error_handling:
    - 'retry_mechanism'
    - 'alert_on_failure'
    - 'rollback_on_error'
```

### 3. Export Operations

#### Export Configuration

```yaml
# export/distribution-store-sku-ros-override-export.yaml
export_config:
  name: 'distribution_store_sku_ros_override_export'
  data_source: 'child_output_distribution_store_sku_ros_override'
  formats:
    - 'csv'
    - 'json'
    - 'excel'
    - 'parquet'
  destinations:
    - 'file_system'
    - 'api_endpoint'
    - 'email'
    - 'sftp'
  schedule: 'daily'
  filters:
    - 'store_id'
    - 'sku_id'
    - 'date_range'
  compression: 'gzip'
```

### 4. Template Queries

#### Template Query 1: Get ROS Override by Store and SKU

```sql
-- template-queries/get-ros-override-by-store-sku.sql
-- Template: Get ROS override data for specific store and SKU
-- Parameters: @store_id, @sku_id, @date_range

SELECT
    store_id,
    sku_id,
    ros_override_value,
    effective_date,
    expiry_date,
    is_active
FROM distribution_store_sku_ros_override
WHERE store_id = @store_id
  AND sku_id = @sku_id
  AND effective_date <= @date_range
  AND (expiry_date IS NULL OR expiry_date >= @date_range)
  AND is_active = true
ORDER BY effective_date DESC;
```

#### Template Query 2: Get All Active ROS Overrides

```sql
-- template-queries/get-all-active-ros-overrides.sql
-- Template: Get all active ROS overrides
-- Parameters: @date_range

SELECT
    store_id,
    sku_id,
    ros_override_value,
    effective_date,
    expiry_date
FROM distribution_store_sku_ros_override
WHERE is_active = true
  AND effective_date <= @date_range
  AND (expiry_date IS NULL OR expiry_date >= @date_range)
ORDER BY store_id, sku_id, effective_date DESC;
```

### 5. Schema Updates

#### Migration Script

```sql
-- migrations/add_store_sku_ros_override.sql
-- Add new table for store SKU level ROS override

CREATE TABLE IF NOT EXISTS distribution_store_sku_ros_override (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL,
    sku_id INTEGER NOT NULL,
    ros_override_value DECIMAL(10,4) NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_distribution_ros_override_store_sku
ON distribution_store_sku_ros_override(store_id, sku_id);

CREATE INDEX IF NOT EXISTS idx_distribution_ros_override_effective_date
ON distribution_store_sku_ros_override(effective_date);

CREATE INDEX IF NOT EXISTS idx_distribution_ros_override_active
ON distribution_store_sku_ros_override(is_active);

-- Add constraints
ALTER TABLE distribution_store_sku_ros_override
ADD CONSTRAINT chk_ros_override_value
CHECK (ros_override_value >= 0 AND ros_override_value <= 100);

ALTER TABLE distribution_store_sku_ros_override
ADD CONSTRAINT chk_effective_expiry_date
CHECK (expiry_date IS NULL OR expiry_date > effective_date);
```

### 6. Configuration Updates

#### Module Input Configuration

```json
{
  "distribution": {
    "store_sku_ros_override": {
      "table": "distribution_store_sku_ros_override",
      "view": "child_input_distribution_store_sku_ros_override",
      "columns": [
        "store_id",
        "sku_id",
        "ros_override_value",
        "effective_date",
        "expiry_date",
        "is_active"
      ],
      "validation": {
        "required": ["store_id", "sku_id", "ros_override_value", "effective_date"],
        "data_types": {
          "store_id": "integer",
          "sku_id": "integer",
          "ros_override_value": "decimal",
          "effective_date": "date",
          "expiry_date": "date",
          "is_active": "boolean"
        },
        "constraints": {
          "ros_override_value": "0-100",
          "effective_date": "not_null",
          "expiry_date": "greater_than_effective_date"
        }
      },
      "indexes": ["store_id, sku_id", "effective_date", "is_active"]
    }
  }
}
```

#### Module Output Configuration

```json
{
  "distribution": {
    "store_sku_ros_override": {
      "table": "distribution_ros_calculation_result",
      "view": "child_output_distribution_store_sku_ros_override",
      "columns": [
        "store_id",
        "sku_id",
        "calculated_ros",
        "override_ros",
        "final_ros",
        "calculation_date",
        "calculation_method"
      ],
      "export_formats": ["csv", "json", "excel", "parquet"],
      "export_destinations": ["file_system", "api_endpoint", "email", "sftp"],
      "export_schedule": "daily",
      "export_filters": ["store_id", "sku_id", "date_range"]
    }
  }
}
```

#### Upload Files Configuration

```json
{
  "distribution_store_sku_ros_override": {
    "file_types": ["csv", "xlsx", "xls"],
    "required_columns": ["store_id", "sku_id", "ros_override_value", "effective_date"],
    "optional_columns": ["expiry_date", "is_active"],
    "validation_rules": {
      "store_id": "integer_range:1-9999",
      "sku_id": "integer_range:1-999999",
      "ros_override_value": "decimal_range:0-100",
      "effective_date": "date_format:YYYY-MM-DD",
      "expiry_date": "date_format:YYYY-MM-DD",
      "is_active": "boolean"
    },
    "file_size_limit": "10MB",
    "row_limit": 10000,
    "encoding": "UTF-8"
  }
}
```

## Test Validation

### Database Operations Validation

- [ ] Input view created and functional
- [ ] Output view created and functional
- [ ] Sync configuration created and tested
- [ ] Export configuration created and tested
- [ ] Template queries created and documented
- [ ] Schema migration executed successfully
- [ ] Configuration files updated correctly

### Integration Validation

- [ ] LoadAPI integration with database operations
- [ ] Data flow from LoadAPI to views
- [ ] Sync operations working correctly
- [ ] Export operations functional
- [ ] Template queries returning correct data
- [ ] Configuration validation working

### Performance Validation

- [ ] Views optimized for performance
- [ ] Indexes created and functional
- [ ] Query performance acceptable
- [ ] Export performance within limits
- [ ] Sync performance optimized

## Expected Results

When VIRAT processes the sample requirement "ADD a new input in distribution to store STORE SKU LEVEL ROS OVERRIDE", it should:

1. **Create LoadAPI**: New LoadAPI for handling ROS override data
2. **Create Database Views**: Input and output views for the new data structure
3. **Setup Sync Operations**: Configure data synchronization
4. **Setup Export Operations**: Configure data export functionality
5. **Create Template Queries**: Reusable queries for common operations
6. **Update Schema**: Add new table and indexes
7. **Update Configuration**: Update all configuration files

This ensures that the new LoadAPI is fully integrated with the database operations and can handle data loading, processing, and delivery effectively.
