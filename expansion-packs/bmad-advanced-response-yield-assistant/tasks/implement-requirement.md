# Implement Requirement Task

## Overview
This task handles the complete implementation workflow for ARYA, including requirement analysis, environment-aware implementation, and cross-repository coordination for Phoenix and Reliance environments.

## Task Responsibilities
- Environment-aware requirement analysis
- Cross-repository implementation coordination
- Environment-specific pattern application
- Quality assurance and validation
- Documentation and reporting

## Implementation Workflow

### Phase 1: Environment Setup and Validation
1. **Environment Detection**: Detect and validate current environment (Phoenix/Reliance)
2. **Repository State Check**: Verify all repositories are on correct environment branches
3. **Dependency Validation**: Validate environment-specific dependencies and prerequisites
4. **Access Verification**: Verify access to all required repositories and branches

### Phase 2: Requirement Analysis
1. **Requirement Parsing**: Parse and analyze requirement document
2. **Environment Context**: Apply environment-specific context and constraints
3. **Impact Assessment**: Assess impact across irisx-algo, ms-mfp, and irisx-config repositories
4. **Pattern Recognition**: Identify existing patterns and templates to follow
5. **Expert Delegation**: Delegate to appropriate pattern experts for specialized analysis

### Phase 3: Implementation Planning
1. **Change Prediction**: Predict required changes across all repositories
2. **Dependency Analysis**: Analyze cross-repository dependencies and impacts
3. **Implementation Strategy**: Create environment-aware implementation plan
4. **Risk Assessment**: Identify potential risks and mitigation strategies
5. **Resource Planning**: Plan required resources and timeline

### Phase 4: Implementation Execution
1. **Branch Management**: Create feature branches from correct environment base branches
2. **Algorithm Implementation**: Implement Java algorithm changes following patterns
3. **MFP Implementation**: Implement Python MFP changes with forecasting logic
4. **Configuration Implementation**: Implement configuration changes with SQL views and templates
5. **Cross-Repository Coordination**: Maintain consistency across all repositories

### Phase 5: Quality Assurance and Validation
1. **Pattern Validation**: Validate implementation against existing patterns
2. **Environment Compliance**: Verify environment-specific compliance
3. **Testing Execution**: Execute comprehensive test suites
4. **Integration Testing**: Test cross-repository integration
5. **Documentation Update**: Update requirement documents with implementation results

## Environment-Specific Implementation

### Phoenix Environment Implementation
- **Base Branches**: 
  - irisx-algo: `master-adidas-reliance-prod`
  - ms-mfp: `release-pheonix`
  - irisx-config: `master-adidas-ril`
- **Patterns**: Apply Phoenix-specific patterns and validations
- **Compliance**: Ensure Phoenix environment compliance
- **Integration**: Phoenix-specific cross-repository coordination

### Reliance Environment Implementation
- **Base Branches**:
  - irisx-algo: `master-ril`
  - ms-mfp: `release-ril`
  - irisx-config: `master-ril`
- **Patterns**: Apply Reliance-specific patterns and validations
- **Compliance**: Ensure Reliance environment compliance
- **Integration**: Reliance-specific cross-repository coordination

## Repository-Specific Implementation

### irisx-algo Repository Implementation
1. **Module Creation**: Create Java modules following existing patterns
2. **Business Logic**: Implement business logic and algorithms
3. **Validation Rules**: Implement validation frameworks
4. **Integration Points**: Create integration points with MFP and Config repositories
5. **Testing**: Implement unit and integration tests

### ms-mfp Repository Implementation
1. **MFP Modules**: Create Python MFP modules with forecasting logic
2. **Data Processing**: Implement data processing workflows
3. **Analytics**: Implement analytics and reporting functionality
4. **Integration**: Create integration with Algorithm and Config repositories
5. **Testing**: Implement Python unit and integration tests

### irisx-config Repository Implementation
1. **SQL Views**: Create SQL views following OPENROWSET patterns
2. **TSV Templates**: Generate TSV templates with proper structure
3. **JSON Configuration**: Update JSON configuration files
4. **Sync Scripts**: Create data synchronization scripts
5. **Validation**: Validate configuration integrity and compliance

## Expert Delegation Strategy

### Algorithm Pattern Expert Delegation
- **When**: Algorithm repository changes required
- **Tasks**: Java module analysis, business logic implementation, validation frameworks
- **Coordination**: Coordinate with MFP and Config experts for integration

### MFP Pattern Expert Delegation
- **When**: MFP repository changes required
- **Tasks**: Python module analysis, forecasting logic implementation, data processing
- **Coordination**: Coordinate with Algorithm and Config experts for integration

### Configuration Pattern Expert Delegation
- **When**: Configuration repository changes required
- **Tasks**: SQL view creation, template generation, JSON configuration updates
- **Coordination**: Coordinate with Algorithm and MFP experts for integration

## Quality Assurance Framework

### Code Quality Validation
- **Java Standards**: Validate Java code against coding standards
- **Python Standards**: Validate Python code against PEP 8 and best practices
- **SQL Standards**: Validate SQL code against database standards
- **Documentation**: Ensure comprehensive documentation

### Pattern Compliance Validation
- **Existing Patterns**: Validate against existing repository patterns
- **Environment Patterns**: Validate against environment-specific patterns
- **Cross-Repository Patterns**: Validate cross-repository integration patterns
- **Best Practices**: Ensure adherence to development best practices

### Environment Compliance Validation
- **Branch Alignment**: Validate correct branch usage for environment
- **Configuration Compliance**: Validate environment-specific configurations
- **Integration Compliance**: Validate environment-specific integrations
- **Security Compliance**: Validate security requirements for environment

## Error Handling and Recovery

### Implementation Errors
- **Code Errors**: Handle compilation and runtime errors gracefully
- **Pattern Violations**: Provide clear guidance for pattern compliance
- **Integration Errors**: Handle cross-repository integration issues
- **Environment Errors**: Handle environment-specific configuration issues

### Recovery Procedures
- **Rollback Strategy**: Implement rollback procedures for failed implementations
- **State Recovery**: Recover repository states on implementation failures
- **Branch Management**: Handle branch conflicts and merging issues
- **Manual Intervention**: Provide clear guidance for manual intervention when needed

## Success Criteria

### Implementation Success
- [ ] All required changes implemented across repositories
- [ ] Implementation follows existing patterns and standards
- [ ] Environment-specific compliance achieved
- [ ] Cross-repository integration working correctly
- [ ] All tests passing successfully

### Quality Success
- [ ] Code quality standards met
- [ ] Pattern compliance validated
- [ ] Environment compliance verified
- [ ] Documentation complete and accurate
- [ ] Performance requirements satisfied

### Process Success
- [ ] Implementation completed within target timeframe
- [ ] Expert delegation executed effectively
- [ ] Error handling and recovery procedures tested
- [ ] Stakeholder communication maintained
- [ ] Knowledge transfer completed

## Integration Points
- **ARYA Main Orchestrator**: Receives implementation requests and reports progress
- **Algorithm Pattern Expert**: Delegates algorithm-specific implementation tasks
- **MFP Pattern Expert**: Delegates MFP-specific implementation tasks
- **Configuration Pattern Expert**: Delegates configuration-specific implementation tasks

## Usage Examples

### Complete Implementation
```
*implement requirement-document.md
```

### Environment-Specific Implementation
```
*implement requirement-document.md --environment phoenix
*implement requirement-document.md --environment reliance
```

### Repository-Specific Implementation
```
*implement requirement-document.md --repository irisx-algo
*implement requirement-document.md --repository ms-mfp
*implement requirement-document.md --repository irisx-config
```

## Dependencies
- **ARYA Configuration**: Proper ARYA setup and configuration
- **Repository Access**: Access to all three repositories
- **Environment Configuration**: Valid environment setup (Phoenix/Reliance)
- **Expert Agents**: Access to all pattern expert agents
- **Development Tools**: Java, Python, SQL development environments
- **Testing Frameworks**: Unit and integration testing frameworks
