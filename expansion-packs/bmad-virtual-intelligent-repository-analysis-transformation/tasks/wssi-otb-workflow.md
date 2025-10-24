# WSSI-OTB Workflow Implementation Task

## Overview
Execute the complete WSSI (Weekly Sales & Stock Intelligence) snapshot lifecycle to OTB (Open-to-Buy) workflow implementation for Reliance environment. This task coordinates data flow from LoadAPIs through WSSI snapshot management to OTB value submission.

## Environment Configuration
- **Environment**: Reliance
- **Base Branches**:
  - Algorithm: `master-ril`
  - MFP: `release-ril`
  - Config: `master-ril`
  - LoadAPIs: `caas-ril-uploads`

## Phase 1: LoadAPIs Data Processing

### 1.1 Data Ingestion
- [ ] **Upload Data Processing**: Process LoadAPIs upload data from caas-ril-uploads
- [ ] **Data Validation**: Validate data completeness, accuracy, and consistency
- [ ] **Data Transformation**: Transform data to standardized format
- [ ] **Quality Check**: Perform comprehensive data quality validation

### 1.2 Reliance-Specific Processing
- [ ] **Upload Rules Compliance**: Apply Reliance-specific upload rules (100MB limit, CSV/JSON/XLSX formats)
- [ ] **Processing Rules**: Apply Reliance processing constraints (300s timeout, 8GB memory, 10 concurrent uploads)
- [ ] **Data Standardization**: Standardize data for WSSI compatibility

## Phase 2: WSSI Snapshot Lifecycle Management

### 2.1 Snapshot Lifecycle Stages
- [ ] **NEW Stage**: Implement initial snapshot creation stage with create and view permissions
- [ ] **DRAFT Stage**: Implement editable snapshot stage with edit, view, and calculate permissions
- [ ] **APPROVED Stage**: Implement final approval stage for OTB generation with view and submit permissions
- [ ] **SUBMITTED Stage**: Implement OTB pipeline submission completed stage with view-only permissions

### 2.2 Stage Transitions
- [ ] **NEW to DRAFT**: Implement transition from NEW to DRAFT stage
- [ ] **DRAFT to APPROVED**: Implement transition from DRAFT to APPROVED stage
- [ ] **DRAFT to NEW**: Implement transition from DRAFT back to NEW stage
- [ ] **APPROVED to SUBMITTED**: Implement transition from APPROVED to SUBMITTED stage

### 2.3 KPI Calculations
- [ ] **Core KPIs**: Implement core KPI calculations
  - act_proj_asp: act_proj_sales_rev / act_proj_sales_qty
  - act_proj_mrp: (act_proj_discount_val + act_proj_sales_rev) / act_proj_sales_qty
  - act_proj_margins: (act_proj_mrp - act_proj_cogs) * 100 / act_proj_mrp
  - act_proj_discount_percentage: (act_proj_discount_val * 100) / (act_proj_discount_val + act_proj_sales_rev)
  - act_proj_cover_duration: act_proj_inv_qty / act_proj_sales_qty

- [ ] **Inventory KPIs**: Implement inventory KPI calculations
  - target_inv_qty: sum(act_proj_sales_qty for next cover_duration_target periods)
  - otb_inwards: max(0, target_inv_qty - act_proj_inv_qty - git_inwards - forced_inwards)
  - act_proj_inwards_cogs: aop_cogs_value * otb_inwards_value

- [ ] **COGS Calculation**: Implement COGS calculation methods
  - Optimized method: sum(act_proj_sales_qty_with_cogs) / sum(act_proj_sales_qty)
  - Traditional method: filtered_cogs_df[subperiod + '_cogs'].mean()

### 2.4 Data Processing
- [ ] **Filter Configuration**: Configure data processing filters
  - Channel filters: online, offline, wholesale, retail
  - Fashion grade filters: A, B, C, D
  - Brand segment filters: premium, mass, value
  - Family filters: family1, family2, family3
  - Brand filters: brand1, brand2, brand3
  - Sales channel filters: direct, indirect, online, offline

- [ ] **Data Transformations**: Implement data transformations
  - Wide to long format conversion using pandas.melt
  - Long to wide format conversion using pandas.pivot_table
  - Subperiod year combination: subperiod + '_' + year.astype(str)

## Phase 3: OTB Implementation

### 3.1 OTB Code Generation
- [ ] **Code Generation Formula**: Implement OTB code generation formula
  - Brand Id: max 4 chars
  - Segment code: max 2 chars
  - Fashion Grade: max 4 chars
  - Family: max 4 chars
  - Season Name: max 4 chars
  - Season Year: max 4 chars
  - Hit Name: max 2 chars
  - Purchase Group: max 3 chars

- [ ] **Character Limits**: Apply character limits for each component
- [ ] **Code Uniqueness**: Ensure OTB codes are unique across the system

### 3.2 Budget Validity
- [ ] **Budget Date Calculation**: Implement budget validity date calculations
  - budget_valid_from: datetime(int(year), drop_month, 1).strftime('%Y-%m-%d')
  - budget_valid_till: (datetime(int(year), drop_month + 1, 1) - timedelta(days=1)).strftime('%Y-%m-%d')

- [ ] **Validation Rules**: Implement budget validity validation
  - Drop month timing: 30-60 days prior to drop start
  - Date formats: DD-MM-YYYY, YYYY-MM-DD

### 3.3 Margin Calculations
- [ ] **OTB Value Assignment**: Implement OTB value assignment (otb_code_df['otb_value'] = otb_code_df['act_proj_inwards_cogs'])
- [ ] **Margin Formula**: Implement margin formula (safe_divide((mrp_sum - cogs_sum) * 100, mrp_sum))
- [ ] **Matching Criteria**: Apply matching criteria (fashion_grade, sales_channel, brand_segment, brand, family)

## Phase 4: Pipeline Configuration

### 4.1 Submission Pre-Validation
- [ ] **Version Existence Check**: Implement version existence validation
- [ ] **Approval Status Check**: Implement approval status validation
- [ ] **Pipeline Availability Check**: Implement pipeline availability validation
- [ ] **Data Completeness Check**: Implement data completeness validation

### 4.2 Submission Parameters
- [ ] **Version Name**: Configure version name parameter
- [ ] **Project ID**: Configure project ID parameter
- [ ] **User ID**: Configure user ID parameter
- [ ] **Submission Timestamp**: Configure submission timestamp parameter
- [ ] **OTB Data Location**: Configure OTB data location parameter
- [ ] **Audit Trail ID**: Configure audit trail ID parameter

### 4.3 Status Tracking
- [ ] **Initial Status**: Set initial status to "PROCESSING"
- [ ] **Final Statuses**: Configure final statuses ["SUCCESS", "FAILED"]
- [ ] **Monitoring Interval**: Set monitoring interval to 10 seconds

### 4.4 Azure Integration
- [ ] **Data Factory**: Configure Azure Data Factory integration
  - Pipeline name: wssi_otb_pipeline
  - Timeout: 90 seconds
  - Retry attempts: 3

- [ ] **Blob Storage**: Configure Azure Blob Storage integration
  - Container: wssi-otb-data
  - Timeout: 90 seconds
  - Connection string: configured in environment

## Phase 5: Audit Configuration

### 5.1 Tracking Levels
- [ ] **User Operations**: Track snapshot creation, data editing, stage transitions, OTB submission
- [ ] **Stage Changes**: Track stage_from, stage_to, user_id, timestamp, reason
- [ ] **Data Modifications**: Track field_name, old_value, new_value, user_id, timestamp
- [ ] **Pipeline Execution**: Track pipeline_id, status, start_time, end_time, parameters, error_details

### 5.2 Audit Tables
- [ ] **WSSI Pipeline Audit**: Create wssi_pipeline_audit table with fields [pipeline_id, status, user_id, timestamp, parameters]
- [ ] **WSSI Stage Audit**: Create wssi_stage_audit table with fields [version_id, stage_from, stage_to, user_id, timestamp, reason]
- [ ] **WSSI Data Audit**: Create wssi_data_audit table with fields [version_id, field_name, old_value, new_value, user_id, timestamp]

## Phase 6: Cross-Repository Integration

### 6.1 Algorithm Repository Integration
- [ ] **KPI Calculation Logic**: Integrate KPI calculation business logic
- [ ] **MRP Calculation Module**: Integrate MRP calculation module
- [ ] **COGS Calculation Module**: Integrate COGS calculation module
- [ ] **Margin Calculation Module**: Integrate Margin calculation module

### 6.2 Configuration Repository Integration
- [ ] **WSSI Snapshot View**: Create WSSI snapshot SQL view
- [ ] **OTB Code View**: Create OTB code SQL view
- [ ] **WSSI Audit View**: Create WSSI audit SQL view
- [ ] **WSSI Input Template**: Create WSSI input template
- [ ] **OTB Output Template**: Create OTB output template

### 6.3 LoadAPIs Repository Integration
- [ ] **Upload Routes**: Integrate LoadAPIs upload routes (/upload, /upload/validate, /upload/process, /upload/status)
- [ ] **Data Routes**: Integrate LoadAPIs data routes (/data/load, /data/validate, /data/transform, /data/export)
- [ ] **Upload Service**: Integrate LoadAPIs upload service functions
- [ ] **Data Service**: Integrate LoadAPIs data service functions

### 6.4 MFP Repository Integration
- [ ] **WSSI Views Routes**: Integrate WSSI views routes (/wssi_snapshot, /wssi_kpis, /otb_codes, /pipeline_submit)
- [ ] **WSSI Audit Routes**: Integrate WSSI audit routes (/audit_trail, /stage_history, /user_operations)
- [ ] **WSSI Views Helper**: Integrate WSSI views helper service functions
- [ ] **WSSI Pipeline Helper**: Integrate WSSI pipeline helper service functions

## Phase 7: Reliance Environment Compliance

### 7.1 Reliance-Specific Business Rules
- [ ] **KPI Calculation Rules**: Apply Reliance-specific KPI calculation rules
  - MRP calculation: (discount_val + sales_rev) / sales_qty
  - Margin calculation: (mrp - cogs) * 100 / mrp
  - Cover duration: inv_qty / sales_qty

- [ ] **Validation Rules**: Apply Reliance-specific validation rules
  - MRP validation: mrp > 0
  - Margin validation: margin >= 0
  - Cover duration validation: cover_duration >= 0

### 7.2 Reliance-Specific Constraints
- [ ] **Performance Constraints**: Apply Reliance performance constraints
  - Max processing time: 300 seconds
  - Max memory usage: 8GB
  - Max concurrent requests: 100

- [ ] **Data Constraints**: Apply Reliance data constraints
  - Max data size: 1TB
  - Max records per batch: 1,000,000
  - Max columns per view: 1,000

## Phase 8: Quality Assurance

### 8.1 Data Validation
- [ ] **WSSI Data Validation**: Validate WSSI data completeness, accuracy, and consistency
- [ ] **OTB Data Validation**: Validate OTB code generation accuracy, budget validity accuracy, and margin calculation accuracy
- [ ] **Integration Validation**: Validate cross-repository data flow integrity, business logic integration, and performance integration

### 8.2 Reliance Validation
- [ ] **Reliance Rules Compliance**: Validate Reliance environment rules compliance
- [ ] **Reliance Data Compliance**: Validate Reliance data compliance

## Phase 9: Success Criteria Validation

### 9.1 Technical Success Criteria
- [ ] **WSSI Snapshot Lifecycle Success**: WSSI snapshot lifecycle implemented correctly
- [ ] **OTB Implementation Success**: OTB code generation and submission working correctly
- [ ] **Cross-Repository Integration Success**: Cross-repository integration working seamlessly
- [ ] **Reliance Compliance Success**: Reliance environment compliance maintained

### 9.2 Business Success Criteria
- [ ] **WSSI Requirements Success**: WSSI snapshot requirements fully addressed
- [ ] **OTB Capabilities Success**: OTB value submission capabilities enhanced
- [ ] **Reliance Business Rules Success**: Reliance-specific business rules implemented
- [ ] **User Experience Success**: User experience improved

### 9.3 Quality Success Criteria
- [ ] **Quality Gates Success**: All quality gates passed
- [ ] **Testing Success**: Comprehensive testing completed
- [ ] **Documentation Success**: Documentation complete and accurate
- [ ] **Performance Success**: Performance requirements satisfied

## Expert Agent Coordination

### LoadAPI Pattern Expert
- [ ] **Data Processing Analysis**: Analyze LoadAPIs data processing patterns
- [ ] **Upload Workflow Analysis**: Analyze upload processing workflows
- [ ] **Reliance-Specific Rules**: Apply Reliance-specific upload and processing rules

### MFP Pattern Expert
- [ ] **WSSI Views Analysis**: Analyze WSSI views and snapshot patterns
- [ ] **OTB Pipeline Analysis**: Analyze OTB pipeline submission patterns
- [ ] **Reliance Environment Specialization**: Apply Reliance environment-specific MFP patterns

### Algorithm Pattern Expert
- [ ] **Business Logic Analysis**: Analyze KPI calculation business logic
- [ ] **Calculation Modules Analysis**: Analyze calculation module patterns
- [ ] **Integration Analysis**: Analyze cross-repository integration patterns

### Configuration Pattern Expert
- [ ] **SQL Views Analysis**: Analyze SQL view creation patterns
- [ ] **Template Analysis**: Analyze template creation patterns
- [ ] **Configuration Management**: Manage configuration repository integration

## Final Validation

### Comprehensive Testing
- [ ] **Unit Testing**: Complete unit testing for all components
- [ ] **Integration Testing**: Complete integration testing across repositories
- [ ] **End-to-End Testing**: Complete end-to-end testing of WSSI-OTB workflow
- [ ] **Performance Testing**: Complete performance testing under Reliance constraints

### Documentation
- [ ] **Technical Documentation**: Complete technical documentation
- [ ] **User Guides**: Complete user guides
- [ ] **API Documentation**: Complete API documentation
- [ ] **Configuration Guides**: Complete configuration guides

### Deployment Readiness
- [ ] **Reliance Environment Ready**: System ready for Reliance environment deployment
- [ ] **OTB Integration Ready**: OTB integration ready for production use
- [ ] **Cross-Repository Coordination**: All repositories coordinated and ready
- [ ] **Quality Gates Passed**: All quality gates passed successfully

## Success Metrics

### Technical Metrics
- **WSSI Snapshot Lifecycle**: 100% snapshot lifecycle success rate
- **OTB Implementation**: 100% OTB code generation and submission success rate
- **Cross-Repository Integration**: 100% integration success rate
- **Reliance Compliance**: 100% Reliance environment compliance

### Business Metrics
- **OTB Accuracy**: Improved OTB code generation accuracy
- **Pipeline Reliability**: Improved pipeline submission reliability
- **User Experience**: Enhanced user interface and workflow
- **System Reliability**: Improved system reliability and performance

### Quality Metrics
- **Test Coverage**: 100% test coverage achieved
- **Documentation Coverage**: 100% documentation coverage achieved
- **Performance Requirements**: All performance requirements met
- **Quality Gates**: All quality gates passed successfully

## Notes

- **Environment**: Reliance environment-specific implementation
- **Repositories**: All four repositories (irisx-algo, ms-mfp, irisx-config, ms-loadapis) involved
- **Expert Agents**: All expert agents (LoadAPI, MFP, Algorithm, Configuration) coordinated
- **Quality Assurance**: Comprehensive quality assurance across all phases
- **Success Criteria**: Clear success criteria for technical, business, and quality aspects
