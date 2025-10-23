# Pull Request Generation Example for ARYA

This document provides an example of how ARYA generates pull request descriptions for a multi-repository implementation.

## Example Scenario

**Requirement**: "Add WSSI snapshot KPI calculation enhancements for Phoenix environment"
**Environment**: Phoenix
**Affected Repositories**: irisx-algo, ms-mfp, irisx-config

---

## Generated Output: PULL_REQUEST_DESCRIPTIONS.md

```markdown
# Pull Request Descriptions for WSSI Snapshot KPI Calculation Enhancements

## Implementation Environment: Phoenix

---

## 1. irisx-algo Pull Request

### Title:
**Phoenix | WSSI-KPI-001: Implement WSSI Snapshot KPI Calculation Enhancements in Algorithm Repository**

### Description:
This PR implements WSSI snapshot KPI calculation enhancements in the Algorithm repository (irisx-algo) for the Phoenix environment. The implementation adds optimized COGS calculation methods and enhanced margin calculation support for WSSI snapshots.

### Changes:

**New Classes:**
- `WSSIKpiCalculationModule.java` - Core KPI calculation module for WSSI snapshots
- `WSSIMrpCalculationModule.java` - MRP calculation with quantity weighting
- `WSSICOGSCalculationModule.java` - Optimized COGS calculation with fallback methods
- `WSSIMarginCalculationModule.java` - Margin calculation module
- `WSSIKpiCalculationTest.java` - Comprehensive test coverage for KPI calculations

**Modified Classes:**
- `WSSISnapshotModule.java` - Integrated new KPI calculation modules
- `WSSIValidationModule.java` - Added validation for new KPI calculations
- `WSSIConstants.java` - Added new constants for KPI calculations

**Business Logic:**
- Optimized COGS calculation: `sum(act_proj_sales_qty_with_cogs)/sum(act_proj_sales_qty)`
- MRP calculation with quantity weighting: `(discount_val + sales_rev) / sales_qty`
- Margin calculation: `(MRP - COGS) * 100 / MRP`
- Dependency-aware KPI processing order

### Environment Context:
- **Environment**: Phoenix
- **Base Branch**: `master-adidas-reliance-prod`
- **Feature Branch**: `feature/wssi-kpi-001-snapshot-kpi-enhancements`
- **Environment-Specific Rules**: Phoenix-specific KPI calculation rules and validation

### Features:
- Optimized COGS calculation with new KPI `act_proj_sales_qty_with_cogs`
- Fallback mechanism for traditional COGS calculation
- MRP calculation with proper quantity weighting
- Enhanced margin calculation with safe division
- Dependency-aware KPI calculation ordering
- Phoenix-specific business rule compliance

### Testing:
- ✅ All existing algorithm tests pass
- ✅ New KPI calculation tests pass (12 test cases)
- ✅ Phoenix environment-specific validation complete
- ✅ Maven compilation successful
- ✅ No regressions detected
- ✅ Integration with validation framework tested

### Cross-Repository Impact:

**MFP Integration:**
- KPI calculation results consumed by MFP snapshot generation
- Integration with MFP KPI display and filtering
- Data flow validated from algorithm to MFP repository

**Configuration Dependencies:**
- SQL views updated to support new KPI calculations
- Configuration templates updated for new KPI fields
- Export definitions updated for enhanced KPI data

**LoadAPIs Dependencies:**
- No direct dependencies on LoadAPIs repository for this change
- KPI calculation happens after data loading phase

---

## 2. ms-mfp Pull Request

### Title:
**Phoenix | WSSI-KPI-001: Implement WSSI Snapshot KPI Display and Management in MFP Repository**

### Description:
This PR implements WSSI snapshot KPI display and management capabilities in the MFP repository (ms-mfp) for the Phoenix environment. The implementation adds enhanced KPI calculation display, subperiod processing, and Phoenix-specific business logic.

### Changes:

**New Modules:**
- `wssi_kpi_helper.py` - Helper module for WSSI KPI processing and display
- `wssi_calculation_service.py` - Service layer for KPI calculations
- `wssi_margin_calculator.py` - Margin calculation utilities

**Modified Modules:**
- `wssi_views_helper.py` - Enhanced with new KPI calculation display
- `wssi_snapshot_service.py` - Integrated KPI calculation enhancements
- `mfp_views_helper.py` - Updated to consume enhanced KPI data

**Routes:**
- `GET /api/wssi/kpis` - Get calculated KPIs for snapshot
- `GET /api/wssi/kpis/:kpi_name` - Get specific KPI data
- `POST /api/wssi/kpis/recalculate` - Trigger KPI recalculation

**Services:**
- `calculate_optimized_cogs()` - Optimized COGS calculation
- `calculate_weighted_mrp()` - MRP with quantity weighting
- `calculate_margins()` - Margin calculation with safe division
- `get_kpi_dependencies()` - KPI dependency resolution

### Environment Context:
- **Environment**: Phoenix
- **Base Branch**: `release-pheonix`
- **Feature Branch**: `feature/wssi-kpi-001-snapshot-kpi-enhancements`
- **MFP-Specific Rules**: Phoenix environment KPI display and processing rules

### Features:
- Enhanced KPI calculation display in UI
- Optimized COGS calculation method support
- MRP calculation with quantity weighting display
- Margin calculation with safe division handling
- Subperiod-specific KPI filtering
- Phoenix-specific business rule validation
- Real-time KPI recalculation support

### Testing:
- ✅ Python syntax validation successful (PEP 8 compliant)
- ✅ Unit tests pass (18 test cases)
- ✅ Integration with MFP framework validated
- ✅ Phoenix environment-specific validation complete
- ✅ KPI calculation logic tested with edge cases
- ✅ API endpoints functional and tested

### Cross-Repository Impact:

**Algorithm Integration:**
- Consumes KPI calculation results from irisx-algo
- Validates KPI data format and completeness
- Integration tested with algorithm repository changes

**Configuration Dependencies:**
- Uses SQL views for KPI data retrieval
- Relies on configuration templates for KPI metadata
- Database schema alignment validated

**LoadAPIs Dependencies:**
- No direct dependencies on LoadAPIs for this feature
- KPI display happens after data loading completion

---

## 3. irisx-config Pull Request

### Title:
**Phoenix | WSSI-KPI-001: Add Configuration Support for WSSI Snapshot KPI Enhancements**

### Description:
This PR adds configuration support for WSSI snapshot KPI calculation enhancements in the Configuration repository (irisx-config) for the Phoenix environment. The implementation includes SQL views, templates, and export definitions for enhanced KPI data.

### Changes:

**New Files:**
- `child-output-wssi_kpi_calculations.sql` - SQL view for KPI calculation results
- `child-output-wssi_mrp_data.sql` - SQL view for MRP calculation data
- `child-output-wssi_cogs_data.sql` - SQL view for COGS calculation data
- `child-output-wssi_margin_data.sql` - SQL view for margin calculation data

**SQL Views:**
- `wssi_kpi_calculations` - Main KPI calculation output view
- `wssi_mrp_calculations` - MRP calculation output view
- `wssi_cogs_optimized` - Optimized COGS calculation view
- `wssi_margin_calculations` - Margin calculation output view

**Templates:**
- `export_wssi_kpi_output_template.tsv` - Template for KPI calculation output
- Updated existing WSSI templates with new KPI fields

**JSON Configurations:**
- `module_output.json` - Added new KPI calculation outputs
- Updated export configurations for enhanced KPI data

### Environment Context:
- **Environment**: Phoenix
- **Base Branch**: `master-adidas-ril`
- **Feature Branch**: `feature/wssi-kpi-001-snapshot-kpi-enhancements`
- **Configuration Rules**: Phoenix-specific SQL view patterns and export definitions

### Features:
- SQL views for all KPI calculation outputs
- Optimized query performance for KPI data retrieval
- Proper indexing for KPI lookup fields
- Phoenix-specific data filtering
- Export templates for KPI data
- Configuration file updates for new KPI outputs

### Testing:
- ✅ SQL syntax validation successful
- ✅ View creation tested on Phoenix database
- ✅ Template structure validation complete
- ✅ JSON schema validation passed
- ✅ Integration with existing configuration framework validated
- ✅ Phoenix environment-specific validation complete

### Cross-Repository Impact:

**Algorithm Dependencies:**
- SQL views consume algorithm KPI calculation outputs
- View structure aligned with algorithm data models
- Data type compatibility validated

**MFP Dependencies:**
- SQL views provide data sources for MFP KPI display
- Query performance optimized for MFP usage patterns
- Phoenix-specific filtering applied

**LoadAPIs Dependencies:**
- Configuration changes do not affect LoadAPIs operations
- Export definitions available for downstream systems

---

## Implementation Summary

### Requirement:
**"Add WSSI snapshot KPI calculation enhancements for Phoenix environment"**

### Environment: Phoenix ⚠️

### Status: ✅ COMPLETE

### Key Achievements:
- ✅ Phoenix environment-specific implementation
- ✅ Optimized COGS calculation with fallback mechanism
- ✅ MRP calculation with quantity weighting
- ✅ Enhanced margin calculation with safe division
- ✅ Cross-repository integration validated
- ✅ Comprehensive test coverage (30+ tests)
- ✅ All repositories updated consistently

### Repository Status:

| Repository    | Branch                                                | Environment | Status   | Commits |
| ------------- | ----------------------------------------------------- | ----------- | -------- | ------- |
| irisx-algo    | `feature/wssi-kpi-001-snapshot-kpi-enhancements`      | Phoenix     | ✅ Ready | 5       |
| ms-mfp        | `feature/wssi-kpi-001-snapshot-kpi-enhancements`      | Phoenix     | ✅ Ready | 4       |
| irisx-config  | `feature/wssi-kpi-001-snapshot-kpi-enhancements`      | Phoenix     | ✅ Ready | 3       |
| ms-loadapis   | N/A - Not affected by this requirement               | Phoenix     | ⊗ Skip   | 0       |

### Next Steps:

#### 1. Push Feature Branches
```bash
# Algorithm Repository
cd /Users/aryatupkary/irisx-algo
git push origin feature/wssi-kpi-001-snapshot-kpi-enhancements

# MFP Repository
cd /Users/aryatupkary/ms-mfp
git push origin feature/wssi-kpi-001-snapshot-kpi-enhancements

# Configuration Repository
cd /Users/aryatupkary/irisx-config
git push origin feature/wssi-kpi-001-snapshot-kpi-enhancements
```

#### 2. Create Pull Requests
Use the descriptions above for each repository. Create PRs in this order:
1. **irisx-config** (configuration changes) - Get reviewed first
2. **irisx-algo** (algorithm changes) - Depends on config
3. **ms-mfp** (MFP changes) - Depends on both above

#### 3. Link Related PRs
In each PR description, add:
```markdown
## Related PRs
- Algorithm: [Link to irisx-algo PR]
- MFP: [Link to ms-mfp PR]  
- Configuration: [Link to irisx-config PR]
```

#### 4. Phoenix Environment-Specific Review
- ✅ Verify Phoenix base branches are correct
- ✅ Ensure Phoenix-specific business rules validated
- ✅ Test with Phoenix data sources
- ✅ Validate Phoenix environment compliance
- ✅ Check Phoenix-specific KPI calculation rules

#### 5. Merge Strategy
```
Step 1: Merge irisx-config to master-adidas-ril
Step 2: Merge irisx-algo to master-adidas-reliance-prod
Step 3: Merge ms-mfp to release-pheonix
Step 4: Deploy to Phoenix staging environment
Step 5: Validate in Phoenix staging
Step 6: Deploy to Phoenix production
```

#### 6. Post-Merge Validation
- [ ] Phoenix staging deployment successful
- [ ] KPI calculations validated in Phoenix staging
- [ ] Performance benchmarks met
- [ ] User acceptance testing complete
- [ ] Phoenix production deployment ready

### Important Notes:
- 🔴 **Phoenix Environment Only**: These changes are specific to Phoenix environment
- 🔴 **Cross-Repository Coordination**: All three PRs must be merged in order
- 🔴 **Database Changes**: irisx-config changes require database migration
- 🔴 **Testing Required**: Comprehensive Phoenix environment testing before production
```

---

## How to Use This Output

### 1. Copy PR Descriptions
Copy each repository's PR description section to use when creating the actual pull request.

### 2. Follow Merge Order
Ensure PRs are reviewed and merged in the specified order to maintain dependencies.

### 3. Link PRs
After creating all PRs, update each one with links to related PRs in other repositories.

### 4. Environment Validation
Use the environment-specific checklists to ensure Phoenix compliance.

### 5. Track Progress
Use the repository status table to track PR progress across all repositories.

---

## Automation Integration

ARYA automatically generates this file after successful implementation:

```bash
# Automatic generation (part of *implement workflow)
@arya
*implement requirement-document.md
# ... implementation happens ...
# PULL_REQUEST_DESCRIPTIONS.md automatically created

# Manual generation
@arya
*generate-pr-descriptions requirement-document.md

# Validate PR readiness
@arya
*validate-pr-readiness

# Create linked PRs
@arya
*link-related-prs
```

---

## Key Features of ARYA PR Generation

### ✅ Environment-Aware
- Automatically uses correct base branches for Phoenix/Reliance
- Includes environment-specific validation notes
- Applies environment-specific business rules context

### ✅ Cross-Repository Coordination
- Generates descriptions for all affected repositories
- Documents cross-repository dependencies
- Provides merge order recommendations

### ✅ Comprehensive Context
- Detailed change descriptions
- Testing status for each repository
- Feature documentation
- Cross-repository impact analysis

### ✅ Ready to Use
- Copy-paste ready PR descriptions
- Proper markdown formatting
- Professional structure and content

### ✅ Automated Workflow
- Integrated with ARYA implementation workflow
- Automatically updated with implementation progress
- Validates PR readiness before generation

