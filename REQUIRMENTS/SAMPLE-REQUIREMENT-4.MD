# UPDATE DISTRIBUTION ALLOCATION FORMULA TO INCLUDE SAFETY STOCK

## Business Context

The current distribution allocation formula is too simplistic and doesn't account for safety stock requirements. We need to update the allocation logic to consider safety stock levels when calculating allocations.

## Technical Requirements

### Current Logic
- **Current Formula**: `allocation = min(demand, stock)`
- **Issue**: Doesn't consider safety stock requirements
- **Impact**: May allocate more than available stock after safety stock deduction

### Updated Logic
- **New Formula**: `allocation = min(demand, max(0, stock - safetyStock))`
- **Safety Stock**: Must be maintained at store level
- **Validation**: Ensure safety stock is not negative

### Business Rules
1. **Safety Stock Priority**: Safety stock must be maintained before allocation
2. **Zero Allocation**: If stock is less than safety stock, allocation should be zero
3. **Validation**: Safety stock must be non-negative
4. **Logging**: Log when safety stock prevents allocation

## Implementation Plan

### Algorithm Repository (irisx-algo)
- **Update**: `DistributionAllocationModule.java` - Update allocation calculation method
- **Update**: `DistributionHelper.java` - Update utility calculation methods
- **Update**: `BaseDistributionData.java` - Add safety stock field and validation
- **Update**: `DistributionStoreFile.java` - Update file processing to handle safety stock

### LoadAPI Repository (ms-loadapis-ril-final)
- **Update**: `DistributionStoreLoadApi.py` - Update validation logic for safety stock
- **Update**: Validation methods to ensure safety stock is non-negative

### Config Repository (irisx-config)
- **Update**: `child-input-dist_store.sql` - Update SQL view to include safety stock
- **Update**: `export_dist_input_store_template.tsv` - Update template to include safety stock column
- **Update**: `module_input.json` - Add safety stock to input schema

## Code Changes

### Before (Current Logic)
```java
public double calculateAllocation(double demand, double stock) {
    return Math.min(demand, stock);
}
```

### After (Updated Logic)
```java
public double calculateAllocation(double demand, double stock, double safetyStock) {
    if (safetyStock < 0) {
        throw new IllegalArgumentException("Safety stock cannot be negative");
    }
    double availableStock = stock - safetyStock;
    double allocation = Math.min(demand, Math.max(0, availableStock));
    
    if (allocation == 0 && demand > 0) {
        logger.warn("Allocation prevented by safety stock requirement. Stock: {}, Safety Stock: {}, Demand: {}", 
                   stock, safetyStock, demand);
    }
    
    return allocation;
}
```

## Acceptance Criteria

- [ ] Allocation formula updated to include safety stock
- [ ] Safety stock validation implemented
- [ ] Logging added for safety stock prevention scenarios
- [ ] All existing functionality preserved
- [ ] No new files created (only existing files modified)
- [ ] All tests pass
- [ ] Safety stock field added to input schema
- [ ] SQL views updated to include safety stock

## Expected Files Modified

### Algorithm Repository
- `module/distribution/DistributionAllocationModule.java` - Update allocation logic
- `module/distribution/DistributionHelper.java` - Update utility methods
- `row/input/distribution/BaseDistributionData.java` - Add safety stock field
- `file/input/distribution/DistributionStoreFile.java` - Update file processing

### LoadAPI Repository
- `loadapi/distribution/DistributionStoreLoadApi.py` - Update validation logic

### Config Repository
- `view-creation/child-input-dist_store.sql` - Add safety stock column
- `template/export_dist_input_store_template.tsv` - Add safety stock column
- `module_input.json` - Add safety stock to schema

## Implementation Type
**UPDATE EXISTING LOGIC** - Modify existing business logic without creating new files
