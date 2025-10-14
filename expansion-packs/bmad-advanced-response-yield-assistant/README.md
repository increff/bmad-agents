# BMAD Advanced Response Yield Assistant (ARYA) Extension Pack

## Overview

The BMAD Advanced Response Yield Assistant (ARYA) system is a sophisticated multi-agent system built on the BMAD framework that automates development workflows across four interconnected repositories: `irisx-algo` (Java/Spring Boot), `ms-mfp` (Python), `irisx-config` (Configuration/SQL), and `ms-loadapis` (Python) with environment-specific branch management for Phoenix and Reliance environments.

## Features

- **Environment-Aware Operations**: Automatically switches to correct base branches based on Phoenix/Reliance environment selection
- **Multi-Repository Coordination**: Handles three interconnected repositories simultaneously
- **Pattern-Based Development**: Analyzes existing patterns and follows them for consistency
- **Automated Workflow**: Complete development lifecycle from requirement analysis to implementation
- **Real Git Operations**: Performs actual branch creation, commits, and repository operations
- **Comprehensive Validation**: Runs existing validation modules and tests
- **Documentation Updates**: Updates requirement documents with implementation results
- **MFP Specialization**: Enhanced support for Monthly Forecast Planning (ms-mfp) repository
- **WSSI-MFP Workflow**: Specialized Phoenix environment workflow for WSSI to MFP transformation
- **WSSI-OTB Workflow**: Specialized Reliance environment workflow for WSSI snapshot lifecycle to OTB submission

## Architecture

### Repositories

1. **irisx-algo** (Java/Spring Boot)
   - Core business logic and algorithms
   - Distribution, depletion, and allocation modules
   - 25+ validation modules
   - Abstract classes and shared components

2. **ms-mfp** (Python)
   - Monthly Forecast Planning system
   - Data processing and analytics
   - Python-based algorithms and utilities
   - Integration with forecasting models

3. **irisx-config** (Configuration/SQL)
   - 100+ TSV input templates
   - 200+ SQL view definitions
   - Configuration files (JSON)
   - Export definitions

4. **ms-loadapis** (Python)
   - Data loading and API services
   - Upload management and processing
   - Integration with external systems
   - Environment-specific upload configurations

### Environment Configuration

#### Phoenix Environment
- **Algorithm Repository (irisx-algo)**: `master-adidas-reliance-prod`
- **MFP Repository (ms-mfp)**: `release-pheonix`
- **Configuration Repository (irisx-config)**: `master-adidas-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-pheonix-uploads`

#### Reliance Environment
- **Algorithm Repository (irisx-algo)**: `master-ril`
- **MFP Repository (ms-mfp)**: `release-ril`
- **Configuration Repository (irisx-config)**: `master-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-ril-uploads`

### Data Flow

```
Input Data → LoadAPIs Processing (Python) → MFP Processing (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

## WSSI-MFP Workflow (Phoenix Environment)

ARYA provides specialized support for the Phoenix environment's WSSI (Weekly Sales & Stock Intelligence) to MFP (Monthly Forecast Planning) workflow:

### WSSI Analysis Phase
1. **WSSI Data Structure Analysis**: Analyze WSSI views, snapshots, and data structures
2. **KPI Group Mapping**: Map WSSI KPI groups to MFP-compatible formats
3. **Subperiod Configuration**: Analyze subperiod configurations and transformations
4. **Phoenix Environment Context**: Apply Phoenix-specific constraints and rules
5. **Standardization Rules**: Define WSSI data standardization rules for MFP compatibility

### MFP Implementation Phase
1. **MFP View Generation**: Generate MFP views (overall, channel, category, store, combined)
2. **MFP Snapshot Creation**: Create and manage MFP snapshots
3. **Cross-Repository Integration**: Integrate with algorithm, configuration, and LoadAPIs repositories
4. **Phoenix Compliance**: Ensure Phoenix-specific business rules and constraints
5. **Quality Validation**: Validate data flow and business logic compliance

### Key Commands
- `*wssi-mfp-workflow <requirement-document.md>`: Execute complete WSSI to MFP workflow
- `*analyze-wssi-requirements`: Analyze WSSI requirements and convert to MFP format
- `*standardize-wssi-data`: Standardize WSSI data for MFP compatibility
- `*generate-mfp-views`: Generate MFP views from WSSI data
- `*create-mfp-snapshots`: Create MFP snapshots from WSSI data
- `*validate-wssi-mfp-flow`: Validate complete WSSI to MFP data flow
- `*phoenix-wssi-compliance`: Validate Phoenix-specific WSSI compliance

## WSSI-OTB Workflow (Reliance Environment)

ARYA provides specialized support for the Reliance environment's WSSI (Weekly Sales & Stock Intelligence) snapshot lifecycle to OTB (Open-to-Buy) workflow:

### WSSI Snapshot Lifecycle Phase
1. **Snapshot Creation**: Create WSSI snapshots with data preparation and KPI calculations
2. **KPI Processing**: Calculate MRP, COGS, margins, ASP, discount percentages, and cover duration
3. **Stage Management**: Manage stage transitions (NEW → DRAFT → APPROVED → SUBMITTED)
4. **Audit Tracking**: Track all user operations and stage changes with comprehensive audit trail
5. **Data Processing**: Handle data filtering, transformations, and view generation

### OTB Implementation Phase
1. **OTB Code Generation**: Generate unique OTB codes using business rules with budget validity
2. **Pipeline Submission**: Submit OTB values to ETL pipeline with status monitoring
3. **Cross-Repository Integration**: Integrate with algorithm, configuration, and LoadAPIs repositories
4. **Reliance Compliance**: Ensure Reliance-specific business rules and constraints
5. **Quality Validation**: Validate complete snapshot lifecycle and OTB submission process

### Key Commands
- `*wssi-otb-workflow <requirement-document.md>`: Execute complete WSSI snapshot lifecycle to OTB workflow
- `*create-wssi-snapshot`: Create WSSI snapshot with data preparation and KPI calculations
- `*calculate-wssi-kpis`: Calculate KPIs (MRP, COGS, margins) during snapshot processing
- `*manage-snapshot-stages`: Manage stage transitions (NEW → DRAFT → APPROVED)
- `*generate-otb-codes`: Generate OTB codes with budget validity calculations
- `*submit-otb-values`: Submit OTB values to ETL pipeline with audit tracking
- `*validate-wssi-otb-flow`: Validate complete WSSI snapshot to OTB data flow
- `*reliance-wssi-compliance`: Validate Reliance-specific WSSI compliance

## Agents

### ARYA (Main Orchestrator)

- **Role**: Enhanced Master Orchestrator for Multi-Repository Development Automation
- **Commands**: `*implement`, `*analyze`, `*switch-environment`, `*validate-environment`, `*status`
- **Responsibilities**: Coordinate complete development workflow with environment-specific intelligence
- **Key Features**: Environment awareness, requirement classification, impact prediction, expert delegation

### MFP Pattern Expert

- **Role**: MFP (Monthly Forecast Planning) Architecture & Pattern Specialist
- **Commands**: `*analyze-mfp-patterns`, `*create-mfp-module`, `*validate-mfp-implementation`, `*switch-mfp-environment`
- **Responsibilities**: MFP repository patterns, forecasting algorithms, Python pattern recognition
- **Key Features**: Environment-specific MFP patterns, forecasting algorithm analysis, data processing workflows

### Configuration Pattern Expert

- **Role**: Configuration Repository & Pattern Specialist
- **Commands**: `*analyze-config`, `*create-sql-views`, `*generate-templates`, `*validate-config`
- **Responsibilities**: SQL view patterns, template generation, cross-repository configuration coordination
- **Key Features**: 200+ SQL views, 100+ TSV templates, JSON configuration patterns

### Algorithm Pattern Expert

- **Role**: Algorithm Repository & Pattern Specialist
- **Commands**: `*analyze-modules`, `*create-module`, `*analyze-dependencies`, `*validate-algorithm`
- **Responsibilities**: Java module patterns, validation frameworks, module dependency analysis
- **Key Features**: 1,174 Java files, 30+ modules, 25+ group modules, cascading impact analysis

### LoadAPIs Pattern Expert

- **Role**: LoadAPIs Repository & Pattern Specialist
- **Commands**: `*analyze-loadapis-patterns`, `*create-loadapis-module`, `*validate-loadapis-implementation`, `*switch-loadapis-environment`
- **Responsibilities**: LoadAPIs repository patterns, data loading algorithms, API service management
- **Key Features**: Environment-specific LoadAPIs patterns, upload processing workflows, API service integration

## Installation

### Prerequisites

Before installation, ensure you have:
- **Node.js 16+**
- **Git** installed and configured
- **Local clones** of the required repositories:
  - **irisx-algo** (Java, Maven, JDK 8/11)
  - **irisx-config** (PostgreSQL or compatible local DB client psql)
  - **ms-mfp** (Python 3.9+, pip)
  - **ms-loadapis** (Python 3.9+, pip)

### Installation Steps

1. **Run the BMAD Installer**:
   ```bash
   npx bmad-method install
   ```

2. **Select ARYA Extension Pack**:
   When prompted, choose the `BMAD Advanced Response Yield Assistant` expansion pack from the list.

3. **Configure Repository Paths**:
   The installer will prompt you to provide absolute local paths to your repositories:
   - `irisx-algo` repository path
   - `irisx-config` repository path  
   - `ms-mfp` repository path
   - `ms-loadapis` repository path

4. **Select Environment**:
   **ARYA-Specific Question**: Which environment?
   - **Phoenix**: Uses Phoenix-specific base branches
   - **Reliance**: Uses Reliance-specific base branches

5. **Verify Installation**:
   After installation, ARYA will automatically configure the correct base branches based on your environment selection.

## Usage

### Basic Usage

1. **Activate ARYA Orchestrator**:
   ```
   @arya
   ```

2. **Implement a Requirement**:
   ```
   *implement requirement-document.md
   ```

3. **Follow the prompts** to complete the workflow

### Environment Management

```bash
# Switch environment
*switch-environment reliance

# Validate current environment
*validate-environment

# Switch to correct base branches
*switch-to-base-branches

# Check repository status
*status
```

### Advanced Usage

#### Analysis Commands
- **Analyze Requirements**: `*analyze requirement-document.md`
- **Classify Requirement**: `*classify-requirement`
- **Predict Changes**: `*predict-changes`
- **Analyze Dependencies**: `*analyze-dependencies`

#### Expert Delegation
- **MFP Expert**: `*mfp-expert`
- **Configuration Expert**: `*config-expert`
- **Algorithm Expert**: `*algorithm-expert`
- **LoadAPIs Expert**: `*loadapis-expert`

#### Quality Assurance
- **Run Tests**: `*run-tests`
- **Validate Implementation**: `*validate-implementation`
- **Quality Check**: `*quality-check`

#### Pull Request Management
- **Generate PR Descriptions**: `*generate-pr-descriptions`
- **Create PR File**: `*create-pr-file`
- **Link Related PRs**: `*link-related-prs`
- **Validate PR Readiness**: `*validate-pr-readiness`

## Workflow

### Complete Development Workflow

1. **Environment Setup**: Automatic environment-specific branch configuration
2. **Requirement Analysis**: Parse and analyze requirement documents with environment context
3. **Repository Crawling**: Understand current repository state across all three repositories
4. **Pattern Analysis**: Classify patterns using specialized expert agents
5. **Dependency Analysis**: Analyze shared dependencies and cascading impacts
6. **Expert Delegation**: Delegate to MFP, Configuration, and Algorithm Pattern Experts
7. **Implementation Planning**: Create environment-aware implementation plan
8. **Branch Creation**: Create feature branches from correct environment base branches
9. **Implementation**: Implement changes following existing patterns with environment compliance
10. **Validation**: Run comprehensive tests and validations
11. **Documentation**: Update requirement documents with results
12. **PR Generation**: Generate comprehensive PR descriptions with environment-specific context

## Key Differences from VIRAT

### Repository Changes
- **ms-mfp** for Monthly Forecast Planning
- **ms-loadapis** for data loading and API services
- **MFP Pattern Expert** for forecasting algorithms
- **Environment-Specific Branch Management**

### Environment Awareness
- **Phoenix Environment**: Specific base branches and patterns
- **Reliance Environment**: Specific base branches and patterns
- **Automatic Environment Configuration**

### Enhanced MFP Support
- **Monthly Forecast Planning**: Specialized MFP algorithm support
- **Python Pattern Recognition**: Enhanced Python pattern analysis
- **Forecasting Workflows**: Specialized forecasting workflow support

## Configuration

### Repository Paths
```yaml
repositories:
  irisx-algo: '{ALGO_REPO_PATH}'
  ms-mfp: '{MFP_REPO_PATH}'
  irisx-config: '{CONFIG_REPO_PATH}'
  ms-loadapis: '{LOADAPIS_REPO_PATH}'
```

### Environment Configuration
```yaml
environment: '{ENVIRONMENT}'  # phoenix or reliance

base_branches:
  phoenix:
    irisx-algo: "master-adidas-reliance-prod"
    ms-mfp: "release-pheonix"
    irisx-config: "master-adidas-ril"
    ms-loadapis: "caas-pheonix-uploads"
  reliance:
    irisx-algo: "master-ril"
    ms-mfp: "release-ril"
    irisx-config: "master-ril"
    ms-loadapis: "caas-ril-uploads"
```

## Success Metrics

- **Development Velocity**: 2 hours per requirement
- **Accuracy**: 95%+ success rate
- **Coverage**: 80% of typical business requirements
- **Quality**: Maintain existing code quality standards
- **Environment Compliance**: 100% environment-specific branch management

## Dependencies

- **BMAD Core**: Requires BMAD framework
- **Git**: For repository operations
- **Java 1.8+**: For irisx-algo repository
- **Python 3.9+**: For ms-mfp and ms-loadapis repositories
- **PostgreSQL**: For irisx-config repository operations

## Error Handling

### Environment-Specific Errors
- **Invalid Environment Selection**: Graceful handling with clear error messages
- **Branch Access Issues**: Automatic fallback and comprehensive error reporting
- **Environment Mismatch**: Detection and resolution of environment inconsistencies

### Repository Errors
- **Access Issues**: Graceful handling with fallback options
- **Branch Conflicts**: Automatic resolution of existing branches
- **Validation Failures**: Comprehensive error reporting and fixes
- **Pattern Conflicts**: Resolution between requirements and existing patterns

## Quick Start Guide

### 🚀 **QUICK START (5 Minutes)**

#### **Step 1: Activate ARYA**
```
@arya
```

#### **Step 2: Check Environment**
```
*status
```

#### **Step 3: Validate Configuration**
```
*validate-environment
```

#### **Step 4: Run Your First Command**
```
*implement your-requirement.md
```

## Support

For issues or questions, please refer to the BMAD documentation or contact the development team.

## Notes

- This extension pack implements the complete BMAD Advanced Response Yield Assistant system with environment-specific intelligence
- Follows BMAD agent specialization rules strictly with mandatory enforcement
- Performs actual git operations and repository modifications with comprehensive validation
- Uses environment-aware repository crawling for accuracy with pattern recognition
- Implements pattern-based requirement enhancement with expert delegation
- Maintains consistency across all three repositories with cross-repository coordination
- Features specialized expert agents for MFP, Configuration, and Algorithm patterns
- Includes comprehensive requirement intelligence with impact prediction
- Provides environment-specific branch management and validation
- Implements strict enforcement to prevent skipping critical steps
