# WSSI-MFP Workflow Guide

## Overview

This guide provides comprehensive documentation for the WSSI (Weekly Sales & Stock Intelligence) to MFP (Monthly Forecast Planning) workflow in the Phoenix environment, built on the ARYA (Advanced Response Yield Assistant) framework.

## What is WSSI-MFP Workflow?

The WSSI-MFP workflow is a specialized Phoenix environment workflow that:

1. **Takes WSSI Requirements**: Converts business requirements into standardized WSSI format
2. **Standardizes WSSI Data**: Transforms WSSI data into MFP-compatible format
3. **Generates MFP Views**: Creates comprehensive MFP views and snapshots
4. **Integrates Cross-Repository**: Coordinates across all three repositories
5. **Ensures Phoenix Compliance**: Maintains Phoenix-specific business rules and constraints

## Architecture Overview

```
WSSI Requirements → WSSI Standardization → MFP Views & Snapshots → Cross-Repository Integration → Phoenix Compliance
```

### Key Components

- **WSSI Analysis**: Weekly sales and stock intelligence data analysis
- **MFP Implementation**: Monthly forecast planning view and snapshot generation
- **Cross-Repository Integration**: Algorithm, configuration, and MFP repository coordination
- **Phoenix Environment**: Phoenix-specific business rules and constraints

## WSSI Data Structure

### WSSI Views and Snapshots

WSSI provides several key data structures:

#### WSSI Views
- **Channel Output**: Weekly sales and stock data by channel
- **Periods Configuration**: Subperiod definitions (w1-w18)
- **Filter Configurations**: Channel, fashion grade, brand segment, brand, sales channel filters

#### KPI Groups
- **Sales Revenue**: Actual, last year, AOP, change over LY, achievement against AOP
- **Sales Quantity**: Actual, last year, AOP, change over LY, achievement against AOP
- **Inventory Quantity**: Actual, target, last year, change over LY
- **Cover Duration**: Actual, target, last year, change over LY
- **Inwards**: GIT, OTB, forced inwards
- **Inventory COGS**: Actual, last year, change over LY
- **Inwards COGS**: Actual inwards COGS

#### Subperiods (w1-w18)
- **w1-w2**: January (actual data)
- **w3-w4**: January (projected data)
- **w5-w8**: February (projected data)
- **w9-w12**: March (projected data)
- **w13-w16**: April (projected data)
- **w17-w18**: May (projected data)

## MFP Implementation

### MFP Views

MFP generates several types of views:

#### Overall View
- **Purpose**: Aggregated data across all dimensions
- **KPIs**: GSV, ASP, growth factor, seasonality
- **Aggregations**: Sum, mean, count

#### Channel View
- **Purpose**: Channel-specific data
- **Group By**: Channel
- **KPIs**: GSV, ASP, growth factor, seasonality
- **Aggregations**: Sum, mean, count

#### Category View
- **Purpose**: Category-specific data
- **Group By**: Category
- **KPIs**: GSV, ASP, growth factor, seasonality
- **Aggregations**: Sum, mean, count

#### Combined Views
- **Channel-Category View**: Combined channel and category data
- **Category-Channel View**: Combined category and channel data
- **Store View**: Store-specific data
- **Store-Category View**: Combined store and category data

### MFP Snapshots

MFP creates several types of snapshots:

#### Monthly KPI Snapshots
- **Channel-Category Monthly KPI**: Monthly KPI data by channel and category
- **Store-Subcategory Monthly KPI**: Monthly KPI data by store and subcategory
- **Store-Category Monthly KPI**: Monthly KPI data by store and category

#### Snapshot Management
- **Snapshot Creation**: Generate snapshots from WSSI data
- **Snapshot Validation**: Validate snapshot data integrity
- **Snapshot Storage**: Manage snapshot storage and retrieval
- **Snapshot Versioning**: Implement snapshot versioning and management

## Cross-Repository Integration

### Algorithm Repository (irisx-algo)
- **Business Logic**: KPI calculation business logic
- **Calculation Modules**: GSV, ASP, growth factor calculation modules
- **Validation Rules**: Data validation and business rule validation
- **Phoenix Algorithm Rules**: Phoenix-specific algorithm rules

### Configuration Repository (irisx-config)
- **SQL Views**: WSSI input views and MFP output views
- **Templates**: WSSI input templates and MFP output templates
- **Configuration Management**: Phoenix-specific configuration management
- **Export Definitions**: MFP export definitions

### MFP Repository (ms-mfp)
- **MFP Routes**: WSSI and MFP view routes
- **MFP Services**: WSSI and MFP view helper services
- **MFP Database**: MFP database operations and data management
- **Phoenix MFP Rules**: Phoenix-specific MFP rules

## Phoenix Environment-Specific Features

### Phoenix WSSI Requirements
- **Phoenix Data Sources**: Phoenix-specific data sources
- **Phoenix Business Rules**: Phoenix-specific business rules
- **Phoenix KPI Requirements**: Phoenix-specific KPI requirements
- **Phoenix Subperiod Rules**: Phoenix-specific subperiod rules
- **Phoenix Filter Requirements**: Phoenix-specific filter requirements

### Phoenix MFP Implementation
- **Phoenix View Requirements**: Phoenix-specific view requirements
- **Phoenix Snapshot Rules**: Phoenix-specific snapshot rules
- **Phoenix Business Logic**: Phoenix-specific business logic
- **Phoenix Performance Requirements**: Phoenix-specific performance requirements
- **Phoenix Compliance**: Phoenix environment compliance

## Workflow Commands

### Core WSSI-MFP Commands
- `*wssi-mfp-workflow <requirement-document.md>`: Execute complete WSSI to MFP workflow
- `*analyze-wssi-requirements`: Analyze WSSI requirements and convert to MFP format
- `*standardize-wssi-data`: Standardize WSSI data for MFP compatibility
- `*generate-mfp-views`: Generate MFP views from WSSI data
- `*create-mfp-snapshots`: Create MFP snapshots from WSSI data
- `*validate-wssi-mfp-flow`: Validate complete WSSI to MFP data flow
- `*phoenix-wssi-compliance`: Validate Phoenix-specific WSSI compliance

### Expert Delegation Commands
- `*mfp-expert`: Delegate to MFP Pattern Expert for WSSI analysis and MFP implementation
- `*algorithm-expert`: Delegate to Algorithm Pattern Expert for business logic integration
- `*config-expert`: Delegate to Configuration Pattern Expert for SQL views and templates

## Workflow Process

### Phase 1: WSSI Requirements Analysis
1. **WSSI Data Structure Analysis**: Analyze WSSI views, snapshots, and data structures
2. **KPI Group Mapping**: Map WSSI KPI groups to MFP-compatible formats
3. **Subperiod Configuration**: Analyze subperiod configurations and transformations
4. **Phoenix Environment Context**: Apply Phoenix-specific constraints and rules
5. **Standardization Rules**: Define WSSI data standardization rules for MFP compatibility

### Phase 2: MFP Pattern Recognition
1. **MFP View Analysis**: Analyze existing MFP views and their structures
2. **Snapshot Pattern Recognition**: Identify snapshot generation patterns
3. **Phoenix MFP Constraints**: Understand Phoenix-specific MFP requirements
4. **Integration Point Mapping**: Map WSSI outputs to MFP inputs
5. **Data Flow Analysis**: Analyze data flow from WSSI to MFP modules

### Phase 3: Cross-Repository Analysis
1. **Algorithm Repository Analysis**: Analyze business logic patterns in irisx-algo
2. **Configuration Repository Analysis**: Analyze SQL views and templates in irisx-config
3. **MFP Repository Analysis**: Analyze MFP-specific patterns in ms-mfp
4. **Integration Requirements**: Identify cross-repository integration needs
5. **Phoenix Environment Compliance**: Ensure Phoenix environment-specific compliance

### Phase 4: Transformation Planning
1. **WSSI-MFP Mapping**: Create comprehensive mapping from WSSI to MFP
2. **Data Transformation Rules**: Define data transformation rules and logic
3. **View Generation Strategy**: Plan MFP view generation strategy
4. **Snapshot Configuration**: Plan snapshot generation and management
5. **Integration Strategy**: Plan cross-repository integration approach

### Phase 5: Implementation Execution
1. **WSSI Data Standardization**: Implement WSSI data standardization
2. **MFP View Generation**: Generate MFP views based on WSSI data
3. **Snapshot Creation**: Create and manage MFP snapshots
4. **Cross-Repository Integration**: Implement integration across repositories
5. **Phoenix Environment Compliance**: Ensure Phoenix-specific compliance

### Phase 6: Quality Assurance
1. **Data Flow Validation**: Validate complete WSSI to MFP data flow
2. **View Quality Assurance**: Ensure MFP view quality and accuracy
3. **Snapshot Validation**: Validate snapshot generation and management
4. **Integration Testing**: Test cross-repository integration
5. **Phoenix Compliance Validation**: Validate Phoenix environment compliance

## Quality Assurance Framework

### WSSI Data Quality
- **Data Completeness**: Validate WSSI data completeness
- **Data Accuracy**: Validate WSSI data accuracy
- **Data Consistency**: Validate WSSI data consistency
- **Format Compliance**: Validate WSSI data format compliance
- **Business Rule Compliance**: Validate WSSI business rule compliance

### MFP Implementation Quality
- **View Accuracy**: Validate MFP view accuracy
- **Snapshot Integrity**: Validate MFP snapshot integrity
- **Performance Metrics**: Validate MFP performance metrics
- **Business Logic Compliance**: Validate MFP business logic compliance
- **Phoenix Compliance**: Validate Phoenix environment compliance

### Cross-Repository Integration Quality
- **Data Flow Integrity**: Validate cross-repository data flow
- **Integration Consistency**: Validate integration consistency
- **Performance Integration**: Validate cross-repository performance
- **Business Logic Integration**: Validate business logic integration
- **Phoenix Integration**: Validate Phoenix environment integration

## Success Criteria

### Technical Success
- [ ] WSSI data successfully standardized for MFP compatibility
- [ ] MFP views and snapshots generated correctly
- [ ] Cross-repository integration working seamlessly
- [ ] Phoenix environment compliance maintained
- [ ] Performance requirements satisfied

### Business Success
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
@arya
*wssi-mfp-workflow wssi-requirement.md
```

### WSSI-Specific Operations
```
@arya
*analyze-wssi-requirements
*standardize-wssi-data
*validate-wssi-format
```

### MFP-Specific Operations
```
@arya
*generate-mfp-views
*create-mfp-snapshots
*validate-mfp-data
```

### Cross-Repository Operations
```
@arya
*integrate-algorithm-repository
*integrate-configuration-repository
*validate-cross-repository-integration
```

### Phoenix-Specific Operations
```
@arya
*phoenix-wssi-compliance
*phoenix-mfp-implementation
*phoenix-environment-validation
```

## Error Handling

### WSSI Data Errors
- **Data Format Errors**: Handle WSSI data format errors
- **Data Quality Errors**: Handle WSSI data quality issues
- **Transformation Errors**: Handle WSSI data transformation errors
- **Validation Errors**: Handle WSSI data validation errors
- **Phoenix Data Errors**: Handle Phoenix-specific data errors

### MFP Implementation Errors
- **View Generation Errors**: Handle MFP view generation errors
- **Snapshot Errors**: Handle MFP snapshot creation errors
- **Data Processing Errors**: Handle MFP data processing errors
- **Business Logic Errors**: Handle MFP business logic errors
- **Phoenix MFP Errors**: Handle Phoenix-specific MFP errors

### Integration Errors
- **Cross-Repository Errors**: Handle cross-repository integration errors
- **Data Flow Errors**: Handle data flow errors
- **Consistency Errors**: Handle consistency errors
- **Performance Errors**: Handle performance-related errors
- **Phoenix Integration Errors**: Handle Phoenix-specific integration errors

## Best Practices

### WSSI Data Management
- **Data Quality**: Ensure high-quality WSSI data input
- **Standardization**: Follow consistent WSSI data standardization
- **Validation**: Implement comprehensive WSSI data validation
- **Phoenix Compliance**: Maintain Phoenix-specific WSSI compliance

### MFP Implementation
- **View Design**: Design MFP views for optimal performance
- **Snapshot Management**: Implement efficient snapshot management
- **Business Logic**: Apply correct business logic in MFP implementation
- **Phoenix Rules**: Follow Phoenix-specific MFP rules

### Cross-Repository Integration
- **Data Consistency**: Maintain data consistency across repositories
- **Performance**: Optimize cross-repository performance
- **Business Logic**: Ensure business logic consistency
- **Phoenix Integration**: Maintain Phoenix-specific integration

## Troubleshooting

### Common Issues
1. **WSSI Data Format Issues**: Check WSSI data format and standardization
2. **MFP View Generation Issues**: Verify MFP view generation logic and data
3. **Cross-Repository Integration Issues**: Check data flow and consistency
4. **Phoenix Compliance Issues**: Verify Phoenix-specific rules and constraints

### Resolution Steps
1. **Validate Data**: Check data quality and format
2. **Check Configuration**: Verify configuration and settings
3. **Review Logs**: Check error logs and debug information
4. **Test Components**: Test individual components and integration
5. **Consult Documentation**: Refer to documentation and best practices

## Conclusion

The WSSI-MFP workflow provides a comprehensive solution for converting WSSI requirements into MFP implementations in the Phoenix environment. By following the workflow process, using the appropriate commands, and maintaining quality standards, you can achieve successful WSSI to MFP transformations with full Phoenix environment compliance.
