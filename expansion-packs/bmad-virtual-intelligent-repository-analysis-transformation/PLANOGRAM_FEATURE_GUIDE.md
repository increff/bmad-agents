# Planogram Dual Attribute Feature - Quick Start Guide

## 📋 Overview
The Planogram Creation module now supports computing planograms at either:
- **Single Attribute Level** (e.g., just COLOR) - Default, backward compatible
- **Dual Attribute Level** (e.g., COLOR + FABRIC) - New feature for more granular control

## 🎯 Use Cases

### When to Use Single Attribute Mode:
- Standard planogram management by one dimension (color, subcategory, brand, etc.)
- Simpler reporting and analysis needs
- Backward compatibility with existing processes

### When to Use Dual Attribute Mode:
- Need granular control over planogram by two attributes simultaneously
- Example: Manage planogram by COLOR × FABRIC (Blue Cotton, Blue Polyester, etc.)
- Example: Manage planogram by BRAND × PRICE_RANGE
- More detailed merchandising strategy

## 🚀 Quick Setup

### Step 1: Check Current Configuration
```sql
SELECT name, value 
FROM a_algo_properties 
WHERE name IN ('planogram_attribute', 'planogram_attribute_b', 'planogram_computation_level')
  AND project_id = '<your_project_id>';
```

### Step 2: Enable Dual Attribute Mode (if desired)
```sql
-- Set primary attribute (e.g., COLOR)
UPDATE a_algo_properties 
SET value = 'COLOR' 
WHERE name = 'planogram_attribute' 
  AND project_id = '<your_project_id>';

-- Set secondary attribute (e.g., FABRIC)
UPDATE a_algo_properties 
SET value = 'FABRIC' 
WHERE name = 'planogram_attribute_b' 
  AND project_id = '<your_project_id>';

-- Enable dual attribute computation
UPDATE a_algo_properties 
SET value = 'DUAL_ATTRIBUTE' 
WHERE name = 'planogram_computation_level' 
  AND project_id = '<your_project_id>';
```

### Step 3: Run Planogram Creation Module
The module will automatically detect the configuration and compute accordingly.

## 📊 Output Comparison

### Single Attribute Output (Default):
| store_code | category | attribute | attribute_b | quantity | front_options |
|------------|----------|-----------|-------------|----------|---------------|
| S001       | TOPS     | BLUE      | NULL        | 50       | 5             |
| S001       | TOPS     | RED       | NULL        | 40       | 4             |
| S001       | TOPS     | GREEN     | NULL        | 30       | 3             |

**Interpretation:** Store S001 should have 50 pieces across 5 options in BLUE tops.

### Dual Attribute Output:
| store_code | category | attribute | attribute_b | quantity | front_options |
|------------|----------|-----------|-------------|----------|---------------|
| S001       | TOPS     | BLUE      | COTTON      | 30       | 3             |
| S001       | TOPS     | BLUE      | POLYESTER   | 20       | 2             |
| S001       | TOPS     | RED       | COTTON      | 25       | 3             |
| S001       | TOPS     | RED       | POLYESTER   | 15       | 1             |
| S001       | TOPS     | GREEN     | COTTON      | 20       | 2             |
| S001       | TOPS     | GREEN     | POLYESTER   | 10       | 1             |

**Interpretation:** Store S001 should have 30 pieces across 3 options in BLUE COTTON tops, 20 pieces across 2 options in BLUE POLYESTER tops, etc.

## 🔧 Configuration Parameters

### `planogram_attribute`
- **Type:** String
- **Default:** `SUBCATEGORY`
- **Description:** Primary attribute for planogram computation
- **Valid Values:** Any attribute from AG table (COLOR, SUBCATEGORY, BRAND, FABRIC, GENDER, etc.)
- **Required:** Yes

### `planogram_attribute_b`
- **Type:** String  
- **Default:** Empty string (disabled)
- **Description:** Secondary attribute for dual-attribute planogram computation
- **Valid Values:** Any attribute from AG table, or empty to disable
- **Required:** No (only used in DUAL_ATTRIBUTE mode)

### `planogram_computation_level`
- **Type:** Enum
- **Default:** `SINGLE_ATTRIBUTE`
- **Description:** Controls computation granularity
- **Valid Values:**
  - `SINGLE_ATTRIBUTE` - Compute at single attribute level
  - `DUAL_ATTRIBUTE` - Compute at dual attribute level
- **Required:** Yes

## 📈 Data Flow

```
OW Output (Optimum Width)
         ↓
   [Check computation_level]
         ↓
    ┌────┴────┐
    ↓         ↓
Single Mode  Dual Mode
    ↓         ↓
Extract      Extract
attribute    attribute + attribute_b
    ↓         ↓
Compute      Compute
by attr      by attr×attr_b
    ↓         ↓
    └────┬────┘
         ↓
  Planogram Output
  (attribute + attribute_b)
```

## ⚠️ Important Notes

1. **Backward Compatibility:** Default mode is `SINGLE_ATTRIBUTE`, so existing implementations work without changes.

2. **Null Handling:** In single attribute mode, `attribute_b` will be NULL in the output.

3. **Quantity Split:** In dual mode, the total quantity is intelligently split across attribute combinations based on the OW output.

4. **Performance:** Dual attribute mode may result in more rows in the output (potentially multiplicative based on attribute cardinality).

5. **Validation:** Ensure both attributes are valid and exist in your attribute group configuration.

## 🧪 Testing

### Test Single Attribute Mode:
```sql
-- Set to single mode (default)
UPDATE a_algo_properties 
SET value = 'SINGLE_ATTRIBUTE' 
WHERE name = 'planogram_computation_level';

-- Run module and verify attribute_b is NULL
SELECT * FROM export_planogram_output LIMIT 10;
```

### Test Dual Attribute Mode:
```sql
-- Enable dual mode
UPDATE a_algo_properties 
SET value = 'COLOR' 
WHERE name = 'planogram_attribute';

UPDATE a_algo_properties 
SET value = 'FABRIC' 
WHERE name = 'planogram_attribute_b';

UPDATE a_algo_properties 
SET value = 'DUAL_ATTRIBUTE' 
WHERE name = 'planogram_computation_level';

-- Run module and verify both attributes are populated
SELECT attribute, attribute_b, COUNT(*), SUM(quantity) 
FROM export_planogram_output 
GROUP BY attribute, attribute_b;
```

## 📞 Support

For questions or issues:
1. Check the detailed implementation documentation: `PLANOGRAM_DUAL_ATTRIBUTE_IMPLEMENTATION.md`
2. Review the code in `PlanogramCreationModule.java`
3. Contact the development team

## ✅ Checklist for Implementation

- [ ] Understand business requirement (single vs dual attribute)
- [ ] Check available attributes in AG table
- [ ] Update configuration parameters
- [ ] Test in non-production environment
- [ ] Verify output format and quantities
- [ ] Update downstream reports/dashboards if needed
- [ ] Deploy to production
- [ ] Monitor initial runs
- [ ] Document business use case

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Production Ready ✅

