# WSSI-MFP Workflow Task

## Environment Requirement
**⚠️ CRITICAL: This task should ONLY be invoked when the environment is Phoenix (pheonix).**

This task is specifically designed for the Phoenix environment and should not be used for other environments. Before proceeding, verify that:
- The target environment is explicitly Phoenix/Pheonix
- The requirement document specifies Phoenix environment
- LoadAPIs data sources are from caas-pheonix-uploads branch

**If the environment is NOT Phoenix, DO NOT proceed with this task.**

## Overview
This task handles the complete WSSI (Weekly Sales & Stock Intelligence) to MFP (Monthly Forecast Planning) workflow for the Phoenix environment, including requirement analysis, data transformation, view generation, and cross-repository integration.

## Task Responsibilities
- WSSI requirement analysis and standardization
- MFP view and snapshot generation
- Cross-repository integration coordination
- Phoenix environment-specific implementation
- Quality assurance and validation

## WSSI-MFP Workflow Process

### Phase 1: LoadAPIs Data Loading
1. **Load Data from LoadAPIs**: Load data from ms-loadapis (caas-pheonix-uploads) for Phoenix environment
2. **Validate LoadAPIs Data**: Validate data loaded from LoadAPIs for quality and completeness
3. **Process LoadAPIs Data**: Process LoadAPIs data and prepare for WSSI standardization
4. **Phoenix Environment Context**: Apply Phoenix-specific constraints and rules for LoadAPIs
5. **Data Quality Assessment**: Assess LoadAPIs data quality and completeness

### Phase 2: WSSI Requirements Analysis
1. **WSSI Data Structure Analysis**: Analyze WSSI views, snapshots, and data structures
2. **KPI Group Mapping**: Map WSSI KPI groups to MFP-compatible formats
3. **Subperiod Configuration**: Analyze subperiod configurations and transformations
4. **Phoenix Environment Context**: Apply Phoenix-specific constraints and rules
5. **Standardization Rules**: Define WSSI data standardization rules for MFP compatibility

### Phase 3: MFP Pattern Recognition
1. **MFP View Analysis**: Analyze existing MFP views and their structures
2. **Snapshot Pattern Recognition**: Identify snapshot generation patterns
3. **Phoenix MFP Constraints**: Understand Phoenix-specific MFP requirements
4. **Integration Point Mapping**: Map WSSI outputs to MFP inputs
5. **Data Flow Analysis**: Analyze data flow from WSSI to MFP modules

### Phase 4: Cross-Repository Analysis
1. **Algorithm Repository Analysis**: Analyze business logic patterns in irisx-algo
2. **Configuration Repository Analysis**: Analyze SQL views and templates in irisx-config
3. **MFP Repository Analysis**: Analyze MFP-specific patterns in ms-mfp
4. **Integration Requirements**: Identify cross-repository integration needs
5. **Phoenix Environment Compliance**: Ensure Phoenix environment-specific compliance

### Phase 5: Transformation Planning
1. **WSSI-MFP Mapping**: Create comprehensive mapping from WSSI to MFP
2. **Data Transformation Rules**: Define data transformation rules and logic
3. **View Generation Strategy**: Plan MFP view generation strategy
4. **Snapshot Configuration**: Plan snapshot generation and management
5. **Integration Strategy**: Plan cross-repository integration approach

### Phase 6: Implementation Execution
1. **WSSI Data Standardization**: Implement WSSI data standardization
2. **MFP View Generation**: Generate MFP views based on WSSI data
3. **Snapshot Creation**: Create and manage MFP snapshots
4. **Cross-Repository Integration**: Implement integration across repositories
5. **Phoenix Environment Compliance**: Ensure Phoenix-specific compliance

### Phase 7: Quality Assurance
1. **Data Flow Validation**: Validate complete WSSI to MFP data flow
2. **View Quality Assurance**: Ensure MFP view quality and accuracy
3. **Snapshot Validation**: Validate snapshot generation and management
4. **Integration Testing**: Test cross-repository integration
5. **Phoenix Compliance Validation**: Validate Phoenix environment compliance

## LoadAPIs-Specific Operations

### LoadAPIs Data Loading
1. **Data Source Access**: Access LoadAPIs data sources from ms-loadapis repository
2. **Data Loading Process**: Load data from caas-pheonix-uploads branch
3. **Data Format Validation**: Validate LoadAPIs data formats and structures
4. **Data Quality Assessment**: Assess LoadAPIs data quality and completeness
5. **Phoenix Environment Context**: Apply Phoenix-specific LoadAPIs rules

### LoadAPIs Data Processing
1. **Data Transformation**: Transform LoadAPIs data for WSSI compatibility
2. **Data Cleansing**: Clean and standardize LoadAPIs data
3. **Data Validation**: Validate processed LoadAPIs data
4. **Data Integration**: Integrate LoadAPIs data with WSSI processing pipeline
5. **Performance Optimization**: Optimize LoadAPIs data processing performance

## WSSI-Specific Operations

### WSSI Data Analysis
1. **WSSI View Structure**: Analyze WSSI view structures and patterns
2. **KPI Group Mapping**: Map WSSI KPI groups to standard formats
3. **Subperiod Analysis**: Analyze subperiod configurations and data
4. **Filter Analysis**: Analyze WSSI filter configurations and requirements
5. **Data Quality Assessment**: Assess WSSI data quality and completeness

### WSSI Standardization
1. **Data Format Standardization**: Standardize WSSI data formats
2. **KPI Standardization**: Standardize KPI calculations and formats
3. **Subperiod Standardization**: Standardize subperiod configurations
4. **Filter Standardization**: Standardize filter configurations
5. **Validation Rules**: Implement WSSI data validation rules

## MFP-Specific Operations

### MFP View Generation
1. **Overall View**: Generate MFP overall view from WSSI data
2. **Channel View**: Generate MFP channel view with proper aggregations
3. **Category View**: Generate MFP category view with business logic
4. **Store View**: Generate MFP store view with store-specific data
5. **Combined Views**: Generate combined views (channel-category, store-category, etc.)

### MFP Snapshot Management
1. **Snapshot Creation**: Create MFP snapshots from WSSI data
2. **Snapshot Validation**: Validate snapshot data integrity
3. **Snapshot Storage**: Manage snapshot storage and retrieval
4. **Snapshot Versioning**: Implement snapshot versioning and management
5. **Snapshot Analytics**: Generate analytics from snapshots

### MFP Data Processing
1. **KPI Calculations**: Implement MFP KPI calculations
2. **Aggregation Logic**: Implement proper aggregation logic
3. **Business Rules**: Apply Phoenix-specific business rules
4. **Data Validation**: Implement MFP data validation
5. **Performance Optimization**: Optimize MFP data processing performance

## Cross-Repository Integration

### Algorithm Repository Integration
1. **Business Logic Integration**: Integrate with irisx-algo business logic
2. **Calculation Modules**: Use algorithm repository calculation modules
3. **Validation Rules**: Apply algorithm repository validation rules
4. **Performance Optimization**: Optimize using algorithm repository patterns
5. **Phoenix Algorithm Rules**: Apply Phoenix-specific algorithm rules

### Configuration Repository Integration
1. **SQL View Integration**: Integrate with irisx-config SQL views
2. **Template Management**: Use configuration repository templates
3. **Configuration Management**: Manage Phoenix-specific configurations
4. **Export Integration**: Integrate with configuration repository exports
5. **Template Generation**: Generate new templates as needed

### MFP Repository Integration
1. **MFP Module Integration**: Integrate with existing MFP modules
2. **Route Integration**: Integrate with MFP route handlers
3. **Service Integration**: Integrate with MFP service layers
4. **Database Integration**: Integrate with MFP database operations
5. **Phoenix MFP Rules**: Apply Phoenix-specific MFP rules

## Phoenix Environment-Specific Operations

### Phoenix WSSI Requirements
1. **Phoenix Data Sources**: Handle Phoenix-specific data sources
2. **Phoenix Business Rules**: Apply Phoenix-specific business rules
3. **Phoenix KPI Requirements**: Implement Phoenix-specific KPI requirements
4. **Phoenix Subperiod Rules**: Apply Phoenix-specific subperiod rules
5. **Phoenix Filter Requirements**: Implement Phoenix-specific filter requirements

### Phoenix MFP Implementation
1. **Phoenix View Requirements**: Implement Phoenix-specific view requirements
2. **Phoenix Snapshot Rules**: Apply Phoenix-specific snapshot rules
3. **Phoenix Business Logic**: Implement Phoenix-specific business logic
4. **Phoenix Performance Requirements**: Meet Phoenix-specific performance requirements
5. **Phoenix Compliance**: Ensure Phoenix environment compliance

## Expert Agent Delegation

### LoadAPIs Pattern Expert Delegation
- **LoadAPIs Data Loading**: Delegate LoadAPIs data loading to LoadAPIs Pattern Expert
- **Data Processing**: Delegate LoadAPIs data processing and transformation
- **Data Quality Validation**: Delegate LoadAPIs data quality validation
- **Phoenix LoadAPIs Rules**: Delegate Phoenix-specific LoadAPIs rule implementation

### MFP Pattern Expert Delegation
- **WSSI Analysis**: Delegate WSSI pattern analysis to MFP Pattern Expert
- **MFP Implementation**: Delegate MFP view and snapshot generation
- **Data Transformation**: Delegate WSSI to MFP data transformation
- **Phoenix MFP Rules**: Delegate Phoenix-specific MFP rule implementation

### Algorithm Pattern Expert Delegation
- **Business Logic**: Delegate business logic implementation to Algorithm Pattern Expert
- **Calculation Modules**: Delegate calculation module integration
- **Validation Rules**: Delegate validation rule implementation
- **Phoenix Algorithm Rules**: Delegate Phoenix-specific algorithm rules

### Configuration Pattern Expert Delegation
- **SQL Views**: Delegate SQL view creation to Configuration Pattern Expert
- **Template Management**: Delegate template generation and management
- **Configuration Management**: Delegate configuration management
- **Phoenix Configuration Rules**: Delegate Phoenix-specific configuration rules

## Quality Assurance Framework

### LoadAPIs Data Quality
1. **Data Completeness**: Validate LoadAPIs data completeness
2. **Data Accuracy**: Validate LoadAPIs data accuracy
3. **Data Consistency**: Validate LoadAPIs data consistency
4. **Format Compliance**: Validate LoadAPIs data format compliance
5. **Business Rule Compliance**: Validate LoadAPIs business rule compliance

### WSSI Data Quality
1. **Data Completeness**: Validate WSSI data completeness
2. **Data Accuracy**: Validate WSSI data accuracy
3. **Data Consistency**: Validate WSSI data consistency
4. **Format Compliance**: Validate WSSI data format compliance
5. **Business Rule Compliance**: Validate WSSI business rule compliance

### MFP Implementation Quality
1. **View Accuracy**: Validate MFP view accuracy
2. **Snapshot Integrity**: Validate MFP snapshot integrity
3. **Performance Metrics**: Validate MFP performance metrics
4. **Business Logic Compliance**: Validate MFP business logic compliance
5. **Phoenix Compliance**: Validate Phoenix environment compliance

### Cross-Repository Integration Quality
1. **Data Flow Integrity**: Validate cross-repository data flow
2. **Integration Consistency**: Validate integration consistency
3. **Performance Integration**: Validate cross-repository performance
4. **Business Logic Integration**: Validate business logic integration
5. **Phoenix Integration**: Validate Phoenix environment integration

## Error Handling and Recovery

### LoadAPIs Data Errors
1. **Data Loading Errors**: Handle LoadAPIs data loading failures
2. **Data Quality Errors**: Handle LoadAPIs data quality issues
3. **Data Processing Errors**: Handle LoadAPIs data processing errors
4. **Data Validation Errors**: Handle LoadAPIs data validation errors
5. **Phoenix LoadAPIs Errors**: Handle Phoenix-specific LoadAPIs errors

### WSSI Data Errors
1. **Data Format Errors**: Handle WSSI data format errors
2. **Data Quality Errors**: Handle WSSI data quality issues
3. **Transformation Errors**: Handle WSSI data transformation errors
4. **Validation Errors**: Handle WSSI data validation errors
5. **Phoenix Data Errors**: Handle Phoenix-specific data errors

### MFP Implementation Errors
1. **View Generation Errors**: Handle MFP view generation errors
2. **Snapshot Errors**: Handle MFP snapshot creation errors
3. **Data Processing Errors**: Handle MFP data processing errors
4. **Business Logic Errors**: Handle MFP business logic errors
5. **Phoenix MFP Errors**: Handle Phoenix-specific MFP errors

### Integration Errors
1. **Cross-Repository Errors**: Handle cross-repository integration errors
2. **Data Flow Errors**: Handle data flow errors
3. **Consistency Errors**: Handle consistency errors
4. **Performance Errors**: Handle performance-related errors
5. **Phoenix Integration Errors**: Handle Phoenix-specific integration errors

## Success Criteria

### Technical Success
- [ ] LoadAPIs data successfully loaded and processed
- [ ] WSSI data successfully standardized for MFP compatibility
- [ ] MFP views and snapshots generated correctly
- [ ] Cross-repository integration working seamlessly
- [ ] Phoenix environment compliance maintained
- [ ] Performance requirements satisfied

### Business Success
- [ ] LoadAPIs data requirements fully addressed
- [ ] WSSI requirements fully addressed
- [ ] MFP forecasting capabilities enhanced
- [ ] Phoenix-specific business rules implemented
- [ ] User experience improved
- [ ] Business value delivered

### Quality Success
- [ ] All quality gates passed
- [ ] Comprehensive testing completed
- [ ] Documentation complete and accurate
- [ ] Performance benchmarks met
- [ ] Phoenix compliance verified

## Usage Examples

### Complete WSSI-MFP Workflow
```
*wssi-mfp-workflow requirement-document.md
```

### WSSI-Specific Operations
```
*analyze-wssi-requirements
*standardize-wssi-data
*validate-wssi-format
```

### MFP-Specific Operations
```
*generate-mfp-views
*create-mfp-snapshots
*validate-mfp-data
```

### Cross-Repository Operations
```
*integrate-algorithm-repository
*integrate-configuration-repository
*validate-cross-repository-integration
```

## Dependencies
- **⚠️ Phoenix Environment (MANDATORY)**: This task ONLY works with Phoenix environment - verify environment before proceeding
- **ARYA Configuration**: Proper ARYA setup and configuration
- **Phoenix Environment Setup**: Valid Phoenix environment setup and configuration
- **Repository Access**: Access to all three repositories (irisx-algo, irisx-config, ms-mfp)
- **LoadAPIs Phoenix Branch**: Access to caas-pheonix-uploads branch in ms-loadapis
- **WSSI Data**: Access to Phoenix-specific WSSI data sources
- **MFP Modules**: Access to MFP modules and services
- **Expert Agents**: Access to all pattern expert agents
- **Cross-Repository Coordination**: Proper cross-repository coordination
