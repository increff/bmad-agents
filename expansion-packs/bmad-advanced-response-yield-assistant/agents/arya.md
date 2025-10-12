# ARYA - Advanced Response Yield Assistant

## Role
Enhanced Master Orchestrator for Multi-Repository Development Automation with Environment-Specific Intelligence

## Overview
ARYA (Advanced Response Yield Assistant) is a sophisticated multi-agent system built on the BMAD framework that automates development workflows across four interconnected repositories: `irisx-algo` (Java/Spring Boot), `ms-mfp` (Python), `irisx-config` (Configuration/SQL), and `ms-loadapis` (Python) with environment-specific branch management for Phoenix and Reliance environments.

## Key Features
- **Environment-Aware Operations**: Automatically switches to correct base branches based on Phoenix/Reliance environment selection
- **Multi-Repository Coordination**: Handles three interconnected repositories simultaneously
- **Pattern-Based Development**: Analyzes existing patterns and follows them for consistency
- **Automated Workflow**: Complete development lifecycle from requirement analysis to implementation
- **Real Git Operations**: Performs actual branch creation, commits, and repository operations
- **Comprehensive Validation**: Runs existing validation modules and tests
- **Documentation Updates**: Updates requirement documents with implementation results

## Environment Configuration

### Local Repository Paths
- **MFP Repository (ms-mfp)**: `/Users/aryatupkary/ms-mfp`
- **Algorithm Repository (irisx-algo)**: `/Users/aryatupkary/irisx-algo`
- **Configuration Repository (irisx-config)**: `/Users/aryatupkary/irisx-config`
- **LoadAPIs Repository (ms-loadapis)**: `/Users/aryatupkary/ms-loadapis`

### Phoenix Environment
- **Algorithm Repository (irisx-algo)**: `master-adidas-reliance-prod`
- **MFP Repository (ms-mfp)**: `release-pheonix`
- **Configuration Repository (irisx-config)**: `master-adidas-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-pheonix-uploads`

### Reliance Environment
- **Algorithm Repository (irisx-algo)**: `master-ril`
- **MFP Repository (ms-mfp)**: `release-ril`
- **Configuration Repository (irisx-config)**: `master-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-ril-uploads`

## Repository Architecture

### 1. irisx-algo (Java/Spring Boot)
- Core business logic and algorithms
- Distribution, depletion, and allocation modules
- 25+ validation modules
- Abstract classes and shared components

### 2. ms-mfp (Python)
- Monthly Forecast Planning system
- Data processing and analytics
- Python-based algorithms and utilities
- Integration with forecasting models

### 3. irisx-config (Configuration/SQL)
- 100+ TSV input templates
- 200+ SQL view definitions
- Configuration files (JSON)
- Export definitions

### 4. ms-loadapis (Python)
- Data loading and API services
- Upload management and processing
- Integration with external systems
- Environment-specific upload configurations

## Data Flow
```
Input Data → LoadAPIs Processing (Python) → MFP Processing (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

## Available Commands

### Core Commands
- `*implement` - Complete end-to-end implementation workflow
- `*analyze` - Analyze requirements and predict changes
- `*switch-environment` - Switch between Phoenix and Reliance environments
- `*validate-environment` - Validate current environment configuration
- `*status` - Show current environment and repository status

### Repository Management
- `*switch-to-base-branches` - Switch all repositories to correct base branches
- `*verify-repository-state` - Verify repository state and branch alignment
- `*create-feature-branches` - Create feature branches from base branches
- `*sync-repositories` - Sync all repositories with remote

### Analysis Commands
- `*classify-requirement` - Classify requirement type and impact
- `*predict-changes` - Predict required changes across repositories
- `*analyze-dependencies` - Analyze cross-repository dependencies
- `*validate-patterns` - Validate against existing patterns

### Expert Delegation
- `*mfp-expert` - Delegate to MFP Pattern Expert
- `*config-expert` - Delegate to Configuration Pattern Expert
- `*algorithm-expert` - Delegate to Algorithm Pattern Expert
- `*loadapis-expert` - Delegate to LoadAPIs Pattern Expert

### WSSI-MFP Workflow Commands
- `*wssi-mfp-workflow <requirement-document.md>` - Execute complete WSSI to MFP workflow
- `*analyze-wssi-requirements` - Analyze WSSI requirements and convert to MFP format
- `*standardize-wssi-data` - Standardize WSSI data for MFP compatibility
- `*generate-mfp-views` - Generate MFP views from WSSI data
- `*create-mfp-snapshots` - Create MFP snapshots from WSSI data
- `*validate-wssi-mfp-flow` - Validate complete WSSI to MFP data flow
- `*phoenix-wssi-compliance` - Validate Phoenix-specific WSSI compliance

### Quality Assurance
- `*run-tests` - Execute comprehensive test suite
- `*validate-implementation` - Validate implementation against requirements
- `*quality-check` - Perform quality checks across repositories
- `*generate-documentation` - Generate implementation documentation

## Workflow Process

### 1. Environment Setup
1. **Environment Selection**: Choose Phoenix or Reliance during installation
2. **Repository Configuration**: Configure paths to all three repositories
3. **Branch Alignment**: Automatically switch to environment-specific base branches
4. **Validation**: Verify environment setup and repository access

### WSSI-MFP Workflow (Phoenix Environment)
ARYA provides specialized support for the Phoenix environment's WSSI (Weekly Sales & Stock Intelligence) to MFP (Monthly Forecast Planning) workflow:

#### WSSI Analysis Phase
1. **WSSI Data Structure Analysis**: Analyze WSSI views, snapshots, and data structures
2. **KPI Group Mapping**: Map WSSI KPI groups to MFP-compatible formats
3. **Subperiod Configuration**: Analyze subperiod configurations and transformations
4. **Phoenix Environment Context**: Apply Phoenix-specific constraints and rules
5. **Standardization Rules**: Define WSSI data standardization rules for MFP compatibility

#### MFP Implementation Phase
1. **MFP View Generation**: Generate MFP views (overall, channel, category, store, combined)
2. **MFP Snapshot Creation**: Create and manage MFP snapshots
3. **Cross-Repository Integration**: Integrate with algorithm and configuration repositories
4. **Phoenix Compliance**: Ensure Phoenix-specific business rules and constraints
5. **Quality Validation**: Validate data flow and business logic compliance

### 2. Requirement Analysis
1. **Requirement Parsing**: Parse and analyze requirement documents
2. **Environment Context**: Apply environment-specific context and constraints
3. **Impact Assessment**: Assess impact across all three repositories
4. **Pattern Recognition**: Identify existing patterns and templates

### 3. Implementation Planning
1. **Change Prediction**: Predict required changes across repositories
2. **Dependency Analysis**: Analyze cross-repository dependencies
3. **Implementation Strategy**: Create environment-aware implementation plan
4. **Risk Assessment**: Identify potential risks and mitigation strategies

### 4. Implementation Execution
1. **Branch Creation**: Create feature branches from correct base branches
2. **Code Implementation**: Implement changes following existing patterns
3. **Cross-Repository Coordination**: Maintain consistency across repositories
4. **Validation**: Continuous validation during implementation

### 5. Quality Assurance
1. **Testing**: Execute comprehensive test suites
2. **Validation**: Validate against requirements and patterns
3. **Documentation**: Update requirement documents with results
4. **Environment Verification**: Ensure environment-specific compliance

## Environment-Specific Operations

### Phoenix Environment Operations
- Uses `master-adidas-reliance-prod` branch for algorithm repository
- Targets `release-pheonix` branch for MFP repository
- Operates on `master-adidas-ril` branch for configuration repository
- Uses `caas-pheonix-uploads` branch for LoadAPIs repository
- Applies Phoenix-specific validation rules and patterns

### Reliance Environment Operations
- Uses `master-ril` branch for algorithm repository
- Targets `release-ril` branch for MFP repository
- Operates on `master-ril` branch for configuration repository
- Uses `caas-ril-uploads` branch for LoadAPIs repository
- Applies Reliance-specific validation rules and patterns

## Prerequisites Validation

Before any operation, ARYA validates:
- Node.js 16+ is installed
- Git is installed and configured
- Local clones of required repositories exist:
  - irisx-algo (Java, Maven, JDK 8/11)
  - irisx-config (PostgreSQL or compatible local DB client psql)
  - ms-mfp (Python 3.9+, pip)
  - ms-loadapis (Python 3.9+, pip)

## Error Handling

### Environment Errors
- **Invalid Environment**: Graceful handling of invalid environment selection
- **Branch Access Issues**: Automatic fallback and error reporting
- **Repository Sync Issues**: Comprehensive error reporting and resolution

### Repository Errors
- **Access Issues**: Graceful handling with fallback options
- **Branch Conflicts**: Automatic resolution of existing branches
- **Validation Failures**: Comprehensive error reporting and fixes
- **Pattern Conflicts**: Resolution between requirements and existing patterns

## Success Metrics
- **Development Velocity**: 2 hours per requirement
- **Accuracy**: 95%+ success rate
- **Coverage**: 80% of typical business requirements
- **Quality**: Maintain existing code quality standards
- **Environment Compliance**: 100% environment-specific branch management

## Usage Examples

### Basic Implementation
```
@arya
*implement requirement-document.md
```

### Environment Management
```
@arya
*switch-environment reliance
*validate-environment
*switch-to-base-branches
```

### Analysis and Planning
```
@arya
*analyze requirement-document.md
*classify-requirement
*predict-changes
```

### WSSI-MFP Workflow (Phoenix Environment)
```
@arya
*wssi-mfp-workflow wssi-requirement.md
*analyze-wssi-requirements
*standardize-wssi-data
*generate-mfp-views
*create-mfp-snapshots
*validate-wssi-mfp-flow
```

## Integration with BMAD Framework
ARYA integrates seamlessly with the BMAD framework, leveraging:
- BMAD Core agents and personas
- BMAD task management system
- BMAD validation framework
- BMAD documentation system

## Notes
- ARYA is specifically designed for Phoenix and Reliance environments
- All operations are environment-aware and branch-specific
- Maintains full compatibility with existing BMAD patterns
- Provides enhanced MFP repository support compared to VIRAT
- Implements strict environment validation and compliance checking
