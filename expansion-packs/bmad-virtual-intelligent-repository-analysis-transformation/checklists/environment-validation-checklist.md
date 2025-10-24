# Environment Validation Checklist

## Overview
This checklist ensures proper environment setup, validation, and compliance for VIRAT operations across Phoenix and Reliance environments.

## Pre-Installation Validation

### System Prerequisites
- [ ] **Node.js 16+** installed and accessible
- [ ] **Git** installed and configured with proper credentials
- [ ] **Java 1.8+** installed for irisx-algo repository operations
- [ ] **Maven** installed for Java build operations
- [ ] **Python 3.9+** installed for ms-mfp repository operations
- [ ] **pip** package manager available for Python dependencies
- [ ] **PostgreSQL client (psql)** installed for irisx-config operations

### MCP Server Prerequisites
- [ ] **Java MCP Server** installed and accessible for enhanced Java code analysis
- [ ] **Python MCP Server** installed and accessible for enhanced Python code analysis
- [ ] **MCP server connectivity** validated for all configured repositories
- [ ] **MCP tool integration** tested for pattern discovery and validation

### Repository Access Validation
- [ ] **irisx-algo repository** accessible at specified path (if configured)
- [ ] **ms-loadapis repository** accessible at specified path (if configured)
- [ ] **irisx-config repository** accessible at specified path (if configured)
- [ ] **ms-mfp repository** accessible at specified path (if configured)
- [ ] **Repository permissions** validated for read/write access
- [ ] **Git credentials** configured for all repositories
- [ ] **Branch access** validated for all configured repositories
- [ ] **Repository remotes** properly configured and accessible

### Network and Connectivity
- [ ] **Internet connectivity** available for remote repository operations
- [ ] **Repository remote access** validated (fetch/pull operations)
- [ ] **Package manager access** validated (npm, pip, maven)
- [ ] **Database connectivity** validated for PostgreSQL operations

## Environment Configuration Validation

### Prod Environment Validation
- [ ] **Algorithm Repository Branch**: `caas-release` accessible
- [ ] **LoadAPI Repository Branch**: `release_optimised` accessible
- [ ] **Configuration Repository Branch**: `caas-staging_fix` accessible
- [ ] **MFP Repository Branch**: `release` accessible (if ms-mfp configured)
- [ ] **Branch Permissions**: Write access to all Prod branches
- [ ] **Prod-Specific Configurations**: Environment settings validated
- [ ] **Prod Data Sources**: Access to prod data validated
- [ ] **Prod API Endpoints**: Prod API connectivity verified

### Phoenix Environment Validation
- [ ] **Algorithm Repository Branch**: `master-adidas-reliance-prod` accessible
- [ ] **LoadAPI Repository Branch**: `caas-phoenix-uploads` accessible
- [ ] **Configuration Repository Branch**: `master-adidas-ril` accessible
- [ ] **MFP Repository Branch**: `release-pheonix` accessible (if ms-mfp configured)
- [ ] **Branch Permissions**: Write access to all Phoenix branches
- [ ] **Phoenix-Specific Configurations**: Environment settings validated
- [ ] **Phoenix Data Sources**: Access to Phoenix data validated
- [ ] **Phoenix Business Rules**: Phoenix-specific business logic validated

### Reliance Environment Validation
- [ ] **Algorithm Repository Branch**: `master-ril` accessible
- [ ] **LoadAPI Repository Branch**: `caas-ril-uploads` accessible
- [ ] **Configuration Repository Branch**: `master-ril` accessible
- [ ] **MFP Repository Branch**: `release-ril` accessible (if ms-mfp configured)
- [ ] **Branch Permissions**: Write access to all Reliance branches
- [ ] **Reliance-Specific Configurations**: Environment settings validated
- [ ] **Reliance Data Sources**: Access to Reliance data validated
- [ ] **Reliance Business Rules**: Reliance-specific business logic validated

### Cross-Environment Validation
- [ ] **Environment Selection**: Proper environment selected during installation (prod, reliance, phoenix)
- [ ] **Branch Alignment**: All repositories aligned with selected environment branches
- [ ] **Configuration Consistency**: Environment configuration consistent across repositories
- [ ] **MFP Repository Alignment**: ms-mfp repository aligned with selected environment (if configured)
- [ ] **Access Validation**: Access validated for all configured repositories
- [ ] **Environment-Specific Rules**: Environment-specific business rules validated
- [ ] **Data Source Alignment**: Data sources aligned with selected environment

## Post-Installation Validation

### VIRAT Installation Validation
- [ ] **VIRAT Directory**: `.bmad-core/` created in workspace root
- [ ] **Configuration File**: `core-config.yaml` properly configured
- [ ] **Agent Files**: All agent files present and accessible
- [ ] **Task Files**: All task files present and accessible
- [ ] **Template Files**: All template files present and accessible

### IDE Integration Validation
- [ ] **Cursor Integration**: VIRAT rules properly installed in `.cursor/rules/bmad/`
- [ ] **Claude Code Integration**: VIRAT commands properly installed in `.claude/commands/`
- [ ] **Agent Accessibility**: `@virat` command accessible in IDE
- [ ] **Expert Agent Accessibility**: Expert agent commands accessible

### Repository Configuration Validation
- [ ] **Repository Paths**: All repository paths correctly configured in core-config.yaml
- [ ] **Environment Setting**: Environment correctly set in configuration (prod, reliance, phoenix)
- [ ] **Base Branches**: Base branches correctly configured for selected environment
- [ ] **MFP Repository Configuration**: ms-mfp repository configured if selected during installation
- [ ] **Branch Mappings**: Environment-specific branch mappings validated
- [ ] **Access Validation**: Repository access validated through VIRAT
- [ ] **Repository Selection**: Selected repositories match configuration

## Operational Validation

### Environment Operations Validation
- [ ] **Status Command**: `*status` command works correctly
- [ ] **Environment Validation**: `*validate-environment` command works
- [ ] **Branch Switching**: `*switch-to-base-branches` command works
- [ ] **Environment Switching**: `*switch-environment` command works (if applicable)

### Repository Operations Validation
- [ ] **Repository Access**: VIRAT can access all configured repositories
- [ ] **Branch Operations**: VIRAT can perform branch operations
- [ ] **File Operations**: VIRAT can read and write files in repositories
- [ ] **Git Operations**: VIRAT can perform git operations (commit, push, pull)

### Expert Agent Validation
- [ ] **Algorithm Expert**: Algorithm Pattern Expert accessible and functional
- [ ] **LoadAPI Expert**: LoadAPI Pattern Expert accessible and functional
- [ ] **Config Expert**: Configuration Pattern Expert accessible and functional
- [ ] **Expert Delegation**: Expert delegation from VIRAT works correctly

### MCP Server Operational Validation
- [ ] **Java MCP Server connectivity**: MCP Java tools functional for code analysis
- [ ] **Python MCP Server connectivity**: MCP Python tools functional for code analysis
- [ ] **MCP-enhanced pattern discovery**: MCP tools working for repository pattern analysis
- [ ] **MCP code validation**: MCP tools functional for implementation validation
- [ ] **MCP repository integration**: MCP tools integrated with all configured repositories

## Environment-Specific Validation

### Prod Environment Operational Validation
- [ ] **Prod Branch Access**: All Prod branches accessible and operational
- [ ] **Prod Patterns**: Prod-specific patterns recognized and applied
- [ ] **Prod Validation**: Prod-specific validation rules working
- [ ] **Prod Integration**: Cross-repository integration working for Prod
- [ ] **MFP Prod Integration**: ms-mfp repository integrated with Prod environment (if configured)
- [ ] **Prod Data Flow**: Data flow validated in Prod environment
- [ ] **Prod API Access**: Prod API endpoints accessible and functional

### Phoenix Environment Operational Validation
- [ ] **Phoenix Branch Access**: All Phoenix branches accessible and operational
- [ ] **Phoenix Patterns**: Phoenix-specific patterns recognized and applied
- [ ] **Phoenix Validation**: Phoenix-specific validation rules working
- [ ] **Phoenix Integration**: Cross-repository integration working for Phoenix
- [ ] **MFP Phoenix Integration**: ms-mfp repository integrated with Phoenix environment (if configured)
- [ ] **Phoenix Data Flow**: Data flow validated in Phoenix environment
- [ ] **Phoenix Business Rules**: Phoenix-specific business logic validated

### Reliance Environment Operational Validation
- [ ] **Reliance Branch Access**: All Reliance branches accessible and operational
- [ ] **Reliance Patterns**: Reliance-specific patterns recognized and applied
- [ ] **Reliance Validation**: Reliance-specific validation rules working
- [ ] **Reliance Integration**: Cross-repository integration working for Reliance
- [ ] **MFP Reliance Integration**: ms-mfp repository integrated with Reliance environment (if configured)
- [ ] **Reliance Data Flow**: Data flow validated in Reliance environment
- [ ] **Reliance Business Rules**: Reliance-specific business logic validated

### Environment Switching Validation (if applicable)
- [ ] **Environment Detection**: Current environment properly detected (prod, reliance, phoenix)
- [ ] **Switch Validation**: Environment switching validation works across all configured repositories
- [ ] **Branch Alignment**: Branch alignment works after environment switch for all repositories
- [ ] **MFP Repository Switching**: ms-mfp repository switched correctly (if configured)
- [ ] **Configuration Update**: Configuration properly updated after switch
- [ ] **Pattern Recognition Update**: Expert agents updated for new environment patterns
- [ ] **Data Source Switching**: Data sources aligned with new environment

## Quality Assurance Validation

### Code Quality Validation
- [ ] **Java Standards**: Java code quality validation working
- [ ] **Python Standards**: Python code quality validation working
- [ ] **SQL Standards**: SQL code quality validation working
- [ ] **Documentation Standards**: Documentation quality validation working

### Pattern Compliance Validation
- [ ] **Algorithm Patterns**: Algorithm pattern compliance validation working (27 group modules)
- [ ] **LoadAPI Patterns**: LoadAPI pattern compliance validation working (118+ import mappings)
- [ ] **Config Patterns**: Configuration pattern compliance validation working (320+ SQL views)
- [ ] **MFP Patterns**: MFP pattern compliance validation working (if ms-mfp configured)
- [ ] **Cross-Repository Patterns**: Cross-repository pattern validation working
- [ ] **Environment-Specific Patterns**: Environment-specific pattern validation working

### Testing Framework Validation
- [ ] **Unit Testing**: Unit test execution validation working (Maven, Python)
- [ ] **Integration Testing**: Integration test execution validation working
- [ ] **Environment Testing**: Environment-specific testing working (prod, reliance, phoenix)
- [ ] **Cross-Repository Testing**: Cross-repository testing working (irisx-algo, ms-loadapis, ms-mfp, irisx-config)
- [ ] **MFP Testing**: MFP-specific testing working (if ms-mfp configured)
- [ ] **Multi-Environment Testing**: Multi-environment testing validation working

## Security and Compliance Validation

### Security Validation
- [ ] **Repository Security**: Repository access security validated for all configured repositories
- [ ] **Credential Security**: Git credentials properly secured for all repositories
- [ ] **Environment Security**: Environment-specific security measures validated (prod, reliance, phoenix)
- [ ] **MFP Security**: ms-mfp repository security validated (if configured)
- [ ] **Data Security**: Data handling security measures validated
- [ ] **Branch Security**: Branch access permissions validated
- [ ] **API Security**: API endpoint security validated

### Compliance Validation
- [ ] **Environment Compliance**: Environment-specific compliance validated (prod, reliance, phoenix)
- [ ] **Pattern Compliance**: Pattern compliance validation working across all repositories
- [ ] **Code Compliance**: Code compliance validation working (Java, Python, SQL)
- [ ] **MFP Compliance**: MFP-specific compliance validated (if ms-mfp configured)
- [ ] **Cross-Repository Compliance**: Cross-repository compliance validation working
- [ ] **Documentation Compliance**: Documentation compliance validated
- [ ] **Business Rule Compliance**: Business rule compliance validated across environments

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
- [ ] **Ready for Prod**: System ready for prod use

## Notes
- This checklist should be completed for each VIRAT installation
- Environment-specific validation should be performed for the selected environment (prod, reliance, phoenix)
- MFP repository (ms-mfp) validation should be performed if ms-mfp was selected during installation
- Any failed validation items should be resolved before proceeding
- Documentation should be updated based on validation results
- Regular re-validation should be performed for ongoing operations
- Multi-environment deployments require sequential processing: prod → reliance → phoenix
- Repository selection is flexible - minimum 1 repository, maximum 5 repositories
- Environment switching affects all configured repositories simultaneously
- Expert pattern agents automatically adapt to selected environment patterns
