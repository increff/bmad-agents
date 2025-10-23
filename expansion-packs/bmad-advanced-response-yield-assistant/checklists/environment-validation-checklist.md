# Environment Validation Checklist

## Overview
This checklist ensures proper environment setup, validation, and compliance for ARYA operations across Phoenix and Reliance environments.

## Pre-Installation Validation

### System Prerequisites
- [ ] **Node.js 16+** installed and accessible
- [ ] **Git** installed and configured with proper credentials
- [ ] **Java 1.8+** installed for irisx-algo repository operations
- [ ] **Maven** installed for Java build operations
- [ ] **Python 3.9+** installed for ms-mfp repository operations
- [ ] **pip** package manager available for Python dependencies
- [ ] **PostgreSQL client (psql)** installed for irisx-config operations

### Repository Access Validation
- [ ] **irisx-algo repository** accessible at specified path
- [ ] **ms-mfp repository** accessible at specified path (not ms-loadapis-ril-final)
- [ ] **irisx-config repository** accessible at specified path
- [ ] **Repository permissions** validated for read/write access
- [ ] **Git credentials** configured for all repositories

### Network and Connectivity
- [ ] **Internet connectivity** available for remote repository operations
- [ ] **Repository remote access** validated (fetch/pull operations)
- [ ] **Package manager access** validated (npm, pip, maven)
- [ ] **Database connectivity** validated for PostgreSQL operations

## Environment Configuration Validation

### Phoenix Environment Validation
- [ ] **Algorithm Repository Branch**: `master-adidas-reliance-prod` accessible
- [ ] **MFP Repository Branch**: `release-pheonix` accessible
- [ ] **Configuration Repository Branch**: `master-adidas-ril` accessible
- [ ] **Branch Permissions**: Write access to all Phoenix branches
- [ ] **Phoenix-Specific Configurations**: Environment settings validated

### Reliance Environment Validation
- [ ] **Algorithm Repository Branch**: `master-ril` accessible
- [ ] **MFP Repository Branch**: `release-ril` accessible
- [ ] **Configuration Repository Branch**: `master-ril` accessible
- [ ] **Branch Permissions**: Write access to all Reliance branches
- [ ] **Reliance-Specific Configurations**: Environment settings validated

### Cross-Environment Validation
- [ ] **Environment Selection**: Proper environment selected during installation
- [ ] **Branch Alignment**: All repositories aligned with selected environment
- [ ] **Configuration Consistency**: Environment configuration consistent across repositories
- [ ] **Access Validation**: Access validated for both environments if needed

## Post-Installation Validation

### ARYA Installation Validation
- [ ] **ARYA Directory**: `.bmad-advanced-response-yield-assistant/` created
- [ ] **Configuration File**: `config.yaml` properly configured
- [ ] **Agent Files**: All agent files present and accessible
- [ ] **Task Files**: All task files present and accessible
- [ ] **Template Files**: All template files present and accessible

### IDE Integration Validation
- [ ] **Cursor Integration**: ARYA rules properly installed in `.cursor/rules/bmad/`
- [ ] **Claude Code Integration**: ARYA commands properly installed in `.claude/commands/`
- [ ] **Agent Accessibility**: `@arya` command accessible in IDE
- [ ] **Expert Agent Accessibility**: Expert agent commands accessible

### Repository Configuration Validation
- [ ] **Repository Paths**: All repository paths correctly configured in config.yaml
- [ ] **Environment Setting**: Environment correctly set in configuration
- [ ] **Base Branches**: Base branches correctly configured for environment
- [ ] **Access Validation**: Repository access validated through ARYA

## Operational Validation

### Environment Operations Validation
- [ ] **Status Command**: `*status` command works correctly
- [ ] **Environment Validation**: `*validate-environment` command works
- [ ] **Branch Switching**: `*switch-to-base-branches` command works
- [ ] **Environment Switching**: `*switch-environment` command works (if applicable)

### Repository Operations Validation
- [ ] **Repository Access**: ARYA can access all configured repositories
- [ ] **Branch Operations**: ARYA can perform branch operations
- [ ] **File Operations**: ARYA can read and write files in repositories
- [ ] **Git Operations**: ARYA can perform git operations (commit, push, pull)

### Expert Agent Validation
- [ ] **Algorithm Expert**: Algorithm Pattern Expert accessible and functional
- [ ] **MFP Expert**: MFP Pattern Expert accessible and functional
- [ ] **Config Expert**: Configuration Pattern Expert accessible and functional
- [ ] **Expert Delegation**: Expert delegation from ARYA works correctly

## Environment-Specific Validation

### Phoenix Environment Operational Validation
- [ ] **Phoenix Branch Access**: All Phoenix branches accessible and operational
- [ ] **Phoenix Patterns**: Phoenix-specific patterns recognized and applied
- [ ] **Phoenix Validation**: Phoenix-specific validation rules working
- [ ] **Phoenix Integration**: Cross-repository integration working for Phoenix

### Reliance Environment Operational Validation
- [ ] **Reliance Branch Access**: All Reliance branches accessible and operational
- [ ] **Reliance Patterns**: Reliance-specific patterns recognized and applied
- [ ] **Reliance Validation**: Reliance-specific validation rules working
- [ ] **Reliance Integration**: Cross-repository integration working for Reliance

### Environment Switching Validation (if applicable)
- [ ] **Environment Detection**: Current environment properly detected
- [ ] **Switch Validation**: Environment switching validation works
- [ ] **Branch Alignment**: Branch alignment works after environment switch
- [ ] **Configuration Update**: Configuration properly updated after switch

## Quality Assurance Validation

### Code Quality Validation
- [ ] **Java Standards**: Java code quality validation working
- [ ] **Python Standards**: Python code quality validation working
- [ ] **SQL Standards**: SQL code quality validation working
- [ ] **Documentation Standards**: Documentation quality validation working

### Pattern Compliance Validation
- [ ] **Algorithm Patterns**: Algorithm pattern compliance validation working
- [ ] **MFP Patterns**: MFP pattern compliance validation working
- [ ] **Config Patterns**: Configuration pattern compliance validation working
- [ ] **Cross-Repository Patterns**: Cross-repository pattern validation working

### Testing Framework Validation
- [ ] **Unit Testing**: Unit test execution validation working
- [ ] **Integration Testing**: Integration test execution validation working
- [ ] **Environment Testing**: Environment-specific testing working
- [ ] **Cross-Repository Testing**: Cross-repository testing working

## Security and Compliance Validation

### Security Validation
- [ ] **Repository Security**: Repository access security validated
- [ ] **Credential Security**: Git credentials properly secured
- [ ] **Environment Security**: Environment-specific security measures validated
- [ ] **Data Security**: Data handling security measures validated

### Compliance Validation
- [ ] **Environment Compliance**: Environment-specific compliance validated
- [ ] **Pattern Compliance**: Pattern compliance validation working
- [ ] **Code Compliance**: Code compliance validation working
- [ ] **Documentation Compliance**: Documentation compliance validated

## Troubleshooting Validation

### Error Handling Validation
- [ ] **Error Detection**: Error detection mechanisms working
- [ ] **Error Reporting**: Error reporting mechanisms working
- [ ] **Error Recovery**: Error recovery procedures working
- [ ] **Manual Intervention**: Manual intervention procedures documented

### Recovery Validation
- [ ] **Rollback Procedures**: Rollback procedures validated
- [ ] **State Recovery**: State recovery procedures validated
- [ ] **Branch Recovery**: Branch recovery procedures validated
- [ ] **Configuration Recovery**: Configuration recovery procedures validated

## Final Validation

### Complete System Validation
- [ ] **End-to-End Testing**: Complete workflow tested successfully
- [ ] **Performance Validation**: System performance meets requirements
- [ ] **Reliability Validation**: System reliability validated
- [ ] **User Experience Validation**: User experience meets expectations

### Documentation Validation
- [ ] **Installation Documentation**: Installation documentation accurate and complete
- [ ] **Usage Documentation**: Usage documentation accurate and complete
- [ ] **Troubleshooting Documentation**: Troubleshooting documentation complete
- [ ] **Configuration Documentation**: Configuration documentation accurate

### Sign-Off
- [ ] **Technical Validation**: Technical validation completed successfully
- [ ] **Functional Validation**: Functional validation completed successfully
- [ ] **Environment Validation**: Environment validation completed successfully
- [ ] **Ready for Production**: System ready for production use

## Notes
- This checklist should be completed for each ARYA installation
- Environment-specific validation should be performed for the selected environment
- Any failed validation items should be resolved before proceeding
- Documentation should be updated based on validation results
- Regular re-validation should be performed for ongoing operations
