# WSSI-OTB Workflow Task

## Environment Requirement
**⚠️ CRITICAL: This task should ONLY be invoked when the environment is Reliance.**

This task is specifically designed for the Reliance environment and should not be used for other environments. Before proceeding, verify that:
- The target environment is explicitly Reliance
- The requirement document specifies Reliance environment
- Repository branches are aligned with Reliance environment

**If the environment is NOT Reliance, DO NOT proceed with this task.**

## Overview
This task handles the complete WSSI (Weekly Sales & Stock Intelligence) snapshot lifecycle from creation to OTB (Open-to-Buy) value submission for the Reliance environment, including snapshot management, stage transitions, KPI calculations, audit tracking, and pipeline integration.

## Task Responsibilities
- WSSI snapshot creation and data preparation
- KPI calculations (MRP, COGS, margins) during snapshot processing
- Stage movement management (NEW → DRAFT → APPROVED)
- User operation audit tracking for all UI interactions
- OTB code generation and budget validity management
- Pipeline submission and status monitoring
- Comprehensive audit trail maintenance

## Complete WSSI Snapshot Lifecycle

### Phase 1: Snapshot Creation
1. **Initial Data Loading**: Load WSSI run algorithm output and periods data
2. **Snapshot Data Preparation**: Create snapshot data from base algorithm output
3. **Comments Generation**: Generate comments data for the snapshot
4. **KPI Computation at Creation**: Compute essential KPIs during snapshot creation
5. **Data Lake Upload**: Upload snapshot data, periods, and comments to Azure Data Lake
6. **Version Persistence**: Store version details (name, year, season, hit, drop) in wssi_versions table
7. **Initial Audit**: Create audit record with NEW stage and DEFAULT status
8. **User Audit**: Track user who created snapshot with timestamp

### Phase 2: KPI Calculations and Processing
1. **COGS Calculation**: 
   - Check for 'act_proj_sales_qty_with_cogs' KPI availability
   - Use optimized formula: sum(act_proj_sales_qty_with_cogs)/sum(act_proj_sales_qty)
   - Fallback to traditional calculation if new KPI unavailable
2. **MRP Calculation**: 
   - Dynamic calculation: (act_proj_discount_val + act_proj_sales_rev) / act_proj_sales_qty
   - Apply quantity weighting for proper aggregation
3. **Margin Calculation**: 
   - Formula: (MRP - COGS) * 100 / MRP
   - Handle both act_proj_sales_qty_with_cogs and act_proj_cogs scenarios
4. **ASP Calculation**: Calculate Average Selling Price (sales_rev / sales_qty)
5. **Discount Percentage**: Calculate discount percentages for all periods
6. **Cover Duration**: Calculate inventory cover duration (inv_qty / sales_qty)
7. **Dependency Management**: Process KPIs in correct order based on dependencies

### Phase 3: Stage Movement and Lifecycle Management
1. **Stage Validation**: Validate current stage before allowing transitions
2. **Permission Checks**: Verify user has appropriate permissions for stage changes
3. **Stage Transitions**:
   - **NEW → DRAFT**: User can edit and modify snapshot data
   - **DRAFT → APPROVED**: Final approval for OTB generation
   - **APPROVED → SUBMITTED**: After OTB pipeline submission
4. **Audit Logging**: Log all stage changes with user, timestamp, and reason
5. **Status Updates**: Update version status throughout lifecycle
6. **UI Interaction Tracking**: Track every user operation on UI with audit records

### Phase 4: Data Processing and Transformations
1. **Data Filtering**: Apply user-selected filters (channels, fashion grades, brand segments, families, brands, sales channels)
2. **Wide Format Conversion**: Convert long format data to wide format for processing
3. **Subperiod Processing**: Handle subperiod-specific calculations and filtering
4. **Aggregation Logic**: Group and aggregate data at appropriate levels
5. **Data Type Management**: Handle string conversions, leading zeros, numeric formatting

### Phase 5: View Generation and Management
1. **WSSI View Creation**: Generate filtered WSSI views based on user selections
2. **Subperiod Views**: Create subperiod-specific views with calculated KPIs
3. **Filter Management**: Provide dynamic filters based on available data
4. **Comments Integration**: Include user comments and annotations
5. **Data Validation**: Validate view data integrity and completeness

### Phase 6: OTB Code Generation (Final Stage)
1. **Approval Verification**: Ensure snapshot is in APPROVED stage
2. **Budget Validity Calculation**: 
   - Budget Valid From: 1st day of drop month
   - Budget Valid Till: Last day of drop month
   - Date format: DD-MM-YYYY or YYYY-MM-DD based on requirements
3. **OTB Code Generation**: Generate unique OTB codes using business rules
4. **Margin Calculations**: Calculate final margins for OTB records
5. **Data Formatting**: Format data for downstream systems integration

### Phase 7: Pipeline Submission and Tracking
1. **Pre-submission Validation**: Check if pipeline is already running
2. **Pipeline Parameter Assembly**: Collect all required parameters for ETL pipeline
3. **WSSI Pipeline Trigger**: Trigger WSSI-specific pipeline using wssi_pipeline_helper
4. **Audit Record Creation**: Create comprehensive audit trail
5. **Status Tracking**: Track pipeline status from PROCESSING to SUCCESS/FAILED

### Phase 8: Comprehensive Audit Management
1. **User Operation Tracking**: Track every UI operation (create, edit, approve, submit)
2. **Stage Change Audit**: Log all stage transitions with detailed information
3. **Data Modification Audit**: Track all data changes and updates
4. **Pipeline Audit**: Maintain complete pipeline execution history
5. **Error Audit**: Capture and log all errors with context

### Phase 9: Scheduler Integration and Monitoring
1. **Background Scheduler**: APScheduler running every 10 seconds
2. **Pipeline Status Monitoring**: Check Azure Data Factory pipeline status
3. **Status Synchronization**: Update database status based on ADF pipeline status
4. **Error Handling**: Handle scheduler errors and connection timeouts
5. **Notification Management**: Handle success/failure notifications

## Mathematical Formulations and KPI Calculations

### Core KPI Calculation Formulas

#### 1. Average Selling Price (ASP) Calculations
```python
# Actual/Projected ASP
act_proj_asp = act_proj_sales_rev / act_proj_sales_qty

# Last Year ASP  
ly_asp = ly_sales_rev / ly_sales_qty

# Alternative ASP calculation (during updates)
act_proj_asp = act_proj_mrp * (1 - act_proj_discount_percentage / 100)
```

#### 2. Maximum Retail Price (MRP) Calculations
```python
# Actual/Projected MRP
act_proj_mrp = (act_proj_discount_val + act_proj_sales_rev) / act_proj_sales_qty

# Last Year MRP
ly_mrp = (ly_discount_val + ly_sales_rev) / ly_sales_qty

# Annual Operating Plan MRP
aop_mrp = (aop_discount_val + aop_sales_rev) / aop_sales_qty

# Alternative MRP calculation (during updates)
proj_mrp = (proj_disc + proj_gsv) / proj_qty
```

#### 3. Margin Calculations
```python
# All margin calculations use the same formula: (MRP - COGS) * 100 / MRP

# Actual/Projected Margins
act_proj_margins = (act_proj_mrp - act_proj_cogs) * 100 / act_proj_mrp

# Last Year Margins
ly_margins = (ly_mrp - ly_cogs) * 100 / ly_mrp

# Annual Operating Plan Margins
aop_margins = (aop_mrp - aop_cogs) * 100 / aop_mrp

# Alternative margin calculation (for MFP)
proj_margins = proj_gsv - proj_cogs
```

#### 4. Discount Percentage Calculations
```python
# Actual/Projected Discount Percentage
act_proj_discount_percentage = (act_proj_discount_val * 100) / (act_proj_discount_val + act_proj_sales_rev)

# Last Year Discount Percentage
ly_discount_percentage = (ly_discount_val * 100) / (ly_discount_val + ly_sales_rev)

# Alternative discount calculation (during updates)
act_proj_discount_val = (act_proj_discount_percentage / 100) * act_proj_mrp * act_proj_sales_qty
proj_disc = (proj_mrp * proj_qty) - proj_gsv
```

#### 5. Cover Duration Calculations
```python
# Actual/Projected Cover Duration
act_proj_cover_duration = act_proj_inv_qty / act_proj_sales_qty

# Last Year Cover Duration
ly_cover_duration = ly_inv_qty / ly_sales_qty

# Target Cover Duration (calculated from existing data)
target_cover_duration = target_inv_qty / aop_sales_qty
```

### Inventory Management Formulas

#### 6. Actual/Projected Inventory Quantity (Sequential Calculation)
```python
# For actual data periods: use original values
if is_actual_data == 1:
    act_proj_inv_qty = original_value
else:
    # Formula: max(0, prev_inv - prev_sales + prev_git + prev_forced)
    act_proj_inv_qty = max(0, prev_inv_act_proj - prev_sales_qty + prev_git_inwards + prev_forced_inwards)
```

#### 7. Target Inventory Quantity
```python
# Sum of future sales for cover duration periods
target_inv_qty = sum(act_proj_sales_qty for next cover_duration_target periods)

# Implementation:
sales_qty_sum = 0
for j in range(int(cover_duration_target)):
    if current_index + j < len(subperiods):
        future_period = subperiods[current_index + j]
        sales_qty_sum += get_safe_value(df, 'act_proj_sales_qty', future_period)
target_inv_qty = sales_qty_sum
```

#### 8. Open-to-Buy (OTB) Inwards Calculation
```python
# Formula: max(0, target_inv_qty - act_proj_inv_qty - git_inwards - forced_inwards)
otb_inwards = max(0, target_inv_qty - act_proj_inv_qty - git_inwards - forced_inwards)

# Vectorized calculation (wide format)
otb_inwards = (target_inv_qty.fillna(0) - act_proj_inv_qty.fillna(0) - 
               git_inwards.fillna(0) - forced_inwards.fillna(0)).clip(lower=0)
```

#### 9. Actual/Projected Inwards COGS
```python
# Formula: aop_cogs * otb_inwards
act_proj_inwards_cogs = aop_cogs_value * otb_inwards_value

# Vectorized calculation
act_proj_inwards_cogs = aop_cogs.fillna(0) * otb_inwards.fillna(0)
```

### COGS Calculation Methods

#### 10. COGS Calculation (Optimized Method)
```python
# Calculate COGS using combinations with non-zero aop_sales_rev
non_zero_aop_sales_rev_df = filtered_wssi_view_df[
    (filtered_wssi_view_df['kpi'] == 'aop_sales_rev') & 
    (filtered_wssi_view_df[subperiod] > 0)
]
aop_cogs_df = filtered_wssi_view_df[filtered_wssi_view_df['kpi'] == 'aop_cogs']
filtered_cogs_df = pd.merge(non_zero_aop_sales_rev_df, aop_cogs_df, 
                           on=['channel', 'fashion_grade', 'brand_segment', 'family', 'brand', 'sales_channel'], 
                           how='left', suffixes=('_sales_rev', '_cogs'))

cogs = filtered_cogs_df[subperiod + '_cogs'].mean() if len(filtered_cogs_df) > 0 else 0.0

# New optimized formula (if available)
if 'act_proj_sales_qty_with_cogs' in filtered_wssi_view_df['kpi'].values:
    cogs = sum(act_proj_sales_qty_with_cogs) / sum(act_proj_sales_qty)
```

### OTB Code Generation Formula
```python
# OTB Code concatenation (max character limits)
otb_code = (
    brand_id.astype(str).str[:4] +      # Brand Id: max 4 chars
    segment_id.astype(str).str[:2] +    # Segment code: max 2 chars
    fashion_grade_code.astype(str).str[:4] +  # Fashion Grade: max 4 chars
    family.astype(str).str[:4] +        # Family: max 4 chars
    season.astype(str).str[:4] +        # Season Name: max 4 chars
    year.astype(str).str[:4] +          # Season Year: max 4 chars
    hit.astype(str).str[:2] +           # Hit Name: max 2 chars
    purchase_group.astype(str).str[:3]  # Purchase Group: max 3 chars
)
```

### Budget Validity Logic
```python
# Calculate budget_valid_from as start date of drop month
budget_valid_from = datetime(int(year), drop_month, 1).strftime('%Y-%m-%d')

# Calculate budget_valid_till as last date of drop month
budget_valid_till = (datetime(int(year), drop_month + 1, 1) - timedelta(days=1)).strftime('%Y-%m-%d')
```

## Reliance Environment-Specific Operations

### Reliance WSSI Requirements
1. **Reliance Data Sources**: Handle Reliance-specific data sources
2. **Reliance Business Rules**: Apply Reliance-specific business rules
3. **Reliance KPI Requirements**: Implement Reliance-specific KPI requirements
4. **Reliance Subperiod Rules**: Apply Reliance-specific subperiod rules
5. **Reliance Filter Requirements**: Implement Reliance-specific filter requirements

### Reliance OTB Implementation
1. **Reliance OTB Requirements**: Implement Reliance-specific OTB requirements
2. **Reliance Pipeline Rules**: Apply Reliance-specific pipeline rules
3. **Reliance Business Logic**: Implement Reliance-specific business logic
4. **Reliance Performance Requirements**: Meet Reliance-specific performance requirements
5. **Reliance Compliance**: Ensure Reliance environment compliance

## Expert Agent Delegation

### MFP Pattern Expert Delegation
- **WSSI Analysis**: Delegate WSSI pattern analysis to MFP Pattern Expert
- **OTB Implementation**: Delegate OTB view and snapshot generation
- **Data Transformation**: Delegate WSSI to OTB data transformation
- **Reliance MFP Rules**: Delegate Reliance-specific MFP rule implementation

### Algorithm Pattern Expert Delegation
- **Business Logic**: Delegate business logic implementation to Algorithm Pattern Expert
- **Calculation Modules**: Delegate calculation module integration
- **Validation Rules**: Delegate validation rule implementation
- **Reliance Algorithm Rules**: Delegate Reliance-specific algorithm rules

### Configuration Pattern Expert Delegation
- **SQL Views**: Delegate SQL view creation to Configuration Pattern Expert
- **Template Management**: Delegate template generation and management
- **Configuration Management**: Delegate configuration management
- **Reliance Configuration Rules**: Delegate Reliance-specific configuration rules

### LoadAPIs Pattern Expert Delegation
- **LoadAPIs Data Loading**: Delegate LoadAPIs data loading to LoadAPIs Pattern Expert
- **Data Processing**: Delegate LoadAPIs data processing and transformation
- **Data Quality Validation**: Delegate LoadAPIs data quality validation
- **Reliance LoadAPIs Rules**: Delegate Reliance-specific LoadAPIs rule implementation

## Quality Assurance Framework

### WSSI Data Quality
1. **Data Completeness**: Validate WSSI data completeness
2. **Data Accuracy**: Validate WSSI data accuracy
3. **Data Consistency**: Validate WSSI data consistency
4. **Format Compliance**: Validate WSSI data format compliance
5. **Business Rule Compliance**: Validate WSSI business rule compliance

### OTB Implementation Quality
1. **OTB Code Accuracy**: Validate OTB code generation accuracy
2. **Budget Validity**: Validate budget validity calculations
3. **Margin Calculations**: Validate margin calculation accuracy
4. **Pipeline Integration**: Validate pipeline integration quality
5. **Reliance Compliance**: Validate Reliance environment compliance

### Cross-Repository Integration Quality
1. **Data Flow Integrity**: Validate cross-repository data flow
2. **Integration Consistency**: Validate integration consistency
3. **Performance Integration**: Validate cross-repository performance
4. **Business Logic Integration**: Validate business logic integration
5. **Reliance Integration**: Validate Reliance environment integration

## Error Handling and Recovery

### WSSI Data Errors
1. **Data Format Errors**: Handle WSSI data format errors
2. **Data Quality Errors**: Handle WSSI data quality issues
3. **Transformation Errors**: Handle WSSI data transformation errors
4. **Validation Errors**: Handle WSSI data validation errors
5. **Reliance Data Errors**: Handle Reliance-specific data errors

### OTB Implementation Errors
1. **OTB Code Generation Errors**: Handle OTB code generation errors
2. **Budget Validity Errors**: Handle budget validity calculation errors
3. **Pipeline Submission Errors**: Handle pipeline submission errors
4. **Audit Trail Errors**: Handle audit trail errors
5. **Reliance OTB Errors**: Handle Reliance-specific OTB errors

### Integration Errors
1. **Cross-Repository Errors**: Handle cross-repository integration errors
2. **Data Flow Errors**: Handle data flow errors
3. **Consistency Errors**: Handle consistency errors
4. **Performance Errors**: Handle performance-related errors
5. **Reliance Integration Errors**: Handle Reliance-specific integration errors

## Success Criteria

### Technical Success
- [ ] WSSI snapshot lifecycle implemented correctly
- [ ] OTB code generation working with accurate margins
- [ ] Pipeline submission and monitoring functional
- [ ] Cross-repository integration working seamlessly
- [ ] Reliance environment compliance maintained
- [ ] Performance requirements satisfied

### Business Success
- [ ] WSSI snapshot requirements fully addressed
- [ ] OTB value submission capabilities enhanced
- [ ] Reliance-specific business rules implemented
- [ ] User experience improved
- [ ] Business value delivered

### Quality Success
- [ ] All quality gates passed
- [ ] Comprehensive testing completed
- [ ] Documentation complete and accurate
- [ ] Performance benchmarks met
- [ ] Reliance compliance verified

## Usage Examples

### Complete WSSI-OTB Workflow
```
*wssi-otb-workflow requirement-document.md
```

### WSSI-Specific Operations
```
*create-wssi-snapshot
*calculate-wssi-kpis
*validate-wssi-data
```

### OTB-Specific Operations
```
*generate-otb-codes
*calculate-budget-validity
*submit-otb-values
```

### Cross-Repository Operations
```
*integrate-algorithm-repository
*integrate-configuration-repository
*validate-cross-repository-integration
```

## Dependencies
- **⚠️ Reliance Environment (MANDATORY)**: This task ONLY works with Reliance environment - verify environment before proceeding
- **ARYA Configuration**: Proper ARYA setup and configuration
- **Reliance Environment Setup**: Valid Reliance environment setup and configuration
- **Repository Access**: Access to all four repositories (irisx-algo, irisx-config, ms-mfp, ms-loadapis)
- **WSSI Data**: Access to Reliance-specific WSSI data sources
- **MFP Modules**: Access to MFP modules and services
- **Expert Agents**: Access to all pattern expert agents
- **Cross-Repository Coordination**: Proper cross-repository coordination
- **Azure Integration**: Azure Data Factory and Blob Storage access
- **Database Access**: MySQL database connectivity
- **Pipeline Configuration**: ETL pipeline settings and credentials
