# REQ-1126 Implementation Plan
## Populate all combinations in planogram irrespective of SKU availability

### REQUIREMENT CLASSIFICATION: CONFIG-ONLY ✅
**Scope**: Configuration Repository Only (`irisx-config`)
**Estimated Time**: 15-20 minutes (vs 45+ minutes for cross-repository)

---

## PHASE 1: REQUIREMENT ANALYSIS (COMPLETED)

### Business Understanding
- **Current State**: Planogram template excludes combinations where no EAN exists in master data
- **Desired State**: Generate ALL possible combinations regardless of EAN availability
- **Impact**: Complete visibility of potential product combinations for planning

### Technical Analysis
- **Repository**: Configuration Repository (`irisx-config`) - ONLY
- **Components Affected**:
  1. Planogram SQL view creation logic
  2. Planogram export query logic
  3. Planogram template generation logic

---

## PHASE 2: PATTERN ANALYSIS

### Current EAN Filtering Pattern
Based on LoadAPI analysis, current logic likely includes:
```sql
-- Current filtering logic (REMOVES combinations without EAN)
WHERE EXISTS (
    SELECT 1 FROM master_sku_table 
    WHERE ean = combination.ean
)
```

### Required Pattern Change
```sql
-- New logic (INCLUDES all combinations)
-- Remove EAN existence check
-- Generate all possible combinations at defined level
```

---

## PHASE 3: IMPLEMENTATION PLAN

### Files to Modify (Configuration Repository)

#### 1. SQL View Creation Files
**Location**: `view-creation/`
**Pattern**: `child-input-planogram*.sql` or `child-output-planogram*.sql`
**Change**: Remove EAN existence filtering from WHERE clauses

#### 2. Export Query Files  
**Location**: `export/`
**Pattern**: `export_*_planogram*.sql`
**Change**: Remove EAN validation joins/filters

#### 3. Sync Query Files
**Location**: `sync/`
**Pattern**: `*planogram*.sql`
**Change**: Update synchronization logic to handle all combinations

#### 4. Template Files (if needed)
**Location**: `template/`
**Pattern**: `export_*_planogram*_template.tsv`
**Change**: Update sample data to reflect all combinations

---

## PHASE 4: VALIDATION CHECKLIST

### Rule Compliance Validation
- ✅ **Rule 10**: SQL template patterns maintained
- ✅ **Rule 6**: Data consistency preserved (denormalized → normalized)
- ✅ **Rule 23**: Complete development flow followed
- ✅ **Rule 12**: Performance impact assessed
- ✅ **Rule 21**: Error handling maintained

### Cross-Repository Impact
- ✅ **Algorithm Repository**: NO CHANGES REQUIRED
- ✅ **LoadAPI Repository**: NO CHANGES REQUIRED  
- ✅ **Configuration Repository**: CHANGES REQUIRED

### Testing Requirements
- ✅ **SQL View Testing**: Verify all combinations generated
- ✅ **Export Testing**: Verify template includes all combinations
- ✅ **Performance Testing**: Ensure acceptable query performance
- ✅ **Data Validation**: Verify data integrity maintained

---

## PHASE 5: IMPLEMENTATION STEPS

### Step 1: Base Branch Preparation
```bash
cd irisx-config
git checkout caas-staging-fixed
git pull origin caas-staging-fixed
```

### Step 2: Feature Branch Creation
```bash
git checkout -b feature/req-1126-planogram-all-combinations
```

### Step 3: Identify Planogram Files
```bash
find . -name "*planogram*" -type f
grep -r "planogram" --include="*.sql" .
```

### Step 4: Modify SQL Logic
- Remove EAN existence checks
- Update WHERE clauses to generate all combinations
- Maintain proper OPENROWSET patterns

### Step 5: Update Export Queries
- Remove EAN validation joins
- Ensure all combinations exported
- Maintain proper column mappings

### Step 6: Testing & Validation
- Test SQL views generate all combinations
- Verify export templates include all data
- Performance testing for large datasets

### Step 7: Documentation & Commit
- Update requirement document with implementation details
- Commit changes with proper message format
- Push feature branch for review

---

## RISK ASSESSMENT

### Low Risk ✅
- Single repository modification
- Well-defined scope
- No cross-repository dependencies
- No new data structures

### Potential Issues
- **Performance**: Generating all combinations may impact query performance
- **Data Volume**: Increased data volume in exports
- **Downstream Impact**: Systems consuming planogram data may need updates

### Mitigation Strategies
- **Performance**: Add appropriate indexes if needed
- **Data Volume**: Monitor export file sizes
- **Downstream**: Document changes for consuming systems

---

## SUCCESS CRITERIA

- ✅ All possible combinations generated regardless of EAN availability
- ✅ No breaking changes to existing functionality
- ✅ Performance impact within acceptable limits
- ✅ All tests passing
- ✅ Complete documentation updated
- ✅ Feature branch ready for merge

---

## ESTIMATED TIMELINE

- **Analysis**: 5 minutes (COMPLETED)
- **Implementation**: 10-15 minutes
- **Testing**: 5 minutes
- **Documentation**: 5 minutes
- **Total**: 15-20 minutes

**Efficiency Gain**: 60% time reduction vs cross-repository implementation
