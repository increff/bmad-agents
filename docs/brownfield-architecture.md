# BMAD ADS Automation System - Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the three interconnected repositories that form the BMAD ADS Automation System: `irisx-algo` (Java/Spring Boot), `ms-loadapis-ril-final` (Python), and `irisx-config` (Configuration/SQL). It serves as a reference for AI agents working on automated development workflows.

### Document Scope

Focused on areas relevant to: BMAD ADS Automation System implementation for automated development workflows across three repositories.

### Change Log

| Date   | Version | Description                 | Author    |
| ------ | ------- | --------------------------- | --------- |
| 2024-12-19 | 1.0     | Initial brownfield analysis | Mary (Analyst) |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry (Java)**: `irisx-algo/src/main/java/com/increff/irisx/App.java`
- **Main Entry (Python)**: `ms-loadapis-ril-final/main.py`
- **Configuration**: `irisx-config/module_input.json`, `irisx-config/module_output.json`
- **Core Business Logic**: `irisx-algo/src/main/java/com/increff/irisx/module/`
- **Load APIs**: `ms-loadapis-ril-final/loadapi/`
- **Templates**: `irisx-config/template/`
- **SQL Views**: `irisx-config/view-creation/`

### Enhancement Impact Areas

Based on the PRD, these areas will be affected by the BMAD ADS Automation system:
- **Distribution Module**: `irisx-algo/src/main/java/com/increff/irisx/module/distribution/`
- **Load APIs**: `ms-loadapis-ril-final/loadapi/distribution/`
- **Templates**: `irisx-config/template/export_dist_*_template.tsv`
- **SQL Views**: `irisx-config/view-creation/child-input-input_dist_*.sql`

## High Level Architecture

### Technical Summary

The system consists of three interconnected repositories with a clear data flow:
```
Input Data → Load APIs (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

### Actual Tech Stack

| Category  | Technology | Version | Notes                      |
| --------- | ---------- | ------- | -------------------------- |
| Java Runtime | Java | 1.8 | Maven project with Spring Boot |
| Python Runtime | Python | 3.8+ | Azure-based load APIs |
| Database | Azure SQL | - | Data storage and processing |
| Build Tool | Maven | - | Java dependency management |
| Package Manager | pip | - | Python dependencies |
| Configuration | JSON | - | Module input/output configs |

### Repository Structure Reality Check

- Type: **Polyrepo** - Three separate repositories with clear boundaries
- Package Manager: **Maven** (Java), **pip** (Python)
- Notable: **Heavy Azure integration** for data processing and storage

## Source Tree and Module Organization

### Project Structure (Actual)

```text
irisx-algo/
├── src/main/java/com/increff/irisx/
│   ├── module/                    # Core business logic modules
│   │   ├── distribution/          # Distribution allocation logic
│   │   ├── depletion/            # Depletion calculation logic
│   │   ├── distributionCommons/  # Shared distribution components
│   │   └── validation/           # 25+ validation modules
│   ├── row/                      # Data row classes
│   │   ├── input/               # Input data structures
│   │   └── output/              # Output data structures
│   ├── constants/               # Application constants
│   ├── helper/                  # Utility classes
│   └── provider/                # Service providers
├── target/                      # Maven build output
└── docs/                        # Documentation

ms-loadapis-ril-final/
├── loadapi/                     # Load API implementations
│   ├── common/                  # Base classes and utilities
│   ├── distribution/            # Distribution-specific load APIs
│   ├── constant/                # Constants and error messages
│   └── [module]/                # Module-specific load APIs
├── commons/                     # Common utilities
└── main.py                      # Entry point

irisx-config/
├── template/                    # TSV input templates (100+ files)
├── view-creation/               # SQL view definitions (200+ files)
├── sync/                        # Synchronization logic
├── export/                      # Export configurations
├── module_input.json            # Input configuration
├── module_output.json           # Output configuration
└── upload-files.json            # File upload configuration
```

### Key Modules and Their Purpose

- **Distribution Module**: `irisx-algo/src/main/java/com/increff/irisx/module/distribution/DistributionAllocationModule.java` - Main distribution logic
- **Abstract Allocation Module**: `irisx-algo/src/main/java/com/increff/irisx/module/distributionCommons/AbstractAllocationModule.java` - Shared base class
- **Load API Base**: `ms-loadapis-ril-final/loadapi/common/abstract_loadapi.py` - Base class for all load APIs
- **Distribution Load APIs**: `ms-loadapis-ril-final/loadapi/distribution/` - 25+ distribution-specific load APIs
- **TSV Templates**: `irisx-config/template/` - 100+ input templates
- **SQL Views**: `irisx-config/view-creation/` - 200+ SQL view definitions

## Data Models and APIs

### Data Models

- **Distribution Data**: `irisx-algo/src/main/java/com/increff/irisx/module/distribution/data/` - Core data structures
- **Row Classes**: `irisx-algo/src/main/java/com/increff/irisx/row/` - Input/output data structures
- **Base Distribution Data**: Contains 100+ fields for distribution calculations

### API Specifications

- **Load API Pattern**: All load APIs extend `LoadApi` base class
- **Module Pattern**: All modules extend `AbstractAllocationModule`
- **Configuration Pattern**: All inputs/outputs defined in JSON configs

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Shared Abstract Classes**: `AbstractAllocationModule` extended by 6+ modules - changes require careful analysis
2. **Base Distribution Data**: 100+ fields in core data structure - modifications impact multiple modules
3. **Validation Modules**: 25+ validation modules with complex interdependencies
4. **Configuration Complexity**: Large JSON configs with deep nesting

### Workarounds and Gotchas

- **Spring Dependency Injection**: Heavy use of `@Autowired` and `@Qualifier` - must maintain proper bean definitions
- **Azure Integration**: All data processing through Azure SQL - requires proper credentials and connection strings
- **TSV Processing**: All input data in TSV format - must maintain proper header mappings
- **SQL View Dependencies**: 200+ SQL views with complex dependencies - changes require careful validation

## Integration Points and External Dependencies

### External Services

| Service  | Purpose  | Integration Type | Key Files                      |
| -------- | -------- | ---------------- | ------------------------------ |
| Azure SQL | Data Storage | Database Connection | `ms-loadapis-ril-final/commons/azure_sql.py` |
| Azure Storage | File Storage | REST API | `ms-loadapis-ril-final/commons/file_client.py` |
| Spring Framework | Dependency Injection | Framework | `irisx-algo/src/main/java/com/increff/irisx/spring/` |

### Internal Integration Points

- **Java-Python Integration**: Java modules consume data loaded by Python load APIs
- **Configuration Integration**: All three repositories share configuration patterns
- **Data Flow Integration**: Clear pipeline from input → processing → output

## Development and Deployment

### Local Development Setup

1. **Java Development**: Maven-based with Spring Boot
2. **Python Development**: Virtual environment with Azure dependencies
3. **Configuration Management**: JSON-based configuration files
4. **Database Setup**: Azure SQL with proper connection strings

### Build and Deployment Process

- **Java Build**: `mvn clean package` - Creates fat JAR
- **Python Deployment**: Azure-based with Docker support
- **Configuration Deployment**: JSON files deployed to Azure storage

## Testing Reality

### Current Test Coverage

- **Unit Tests**: Maven-based testing in `irisx-algo/src/test/`
- **Integration Tests**: Limited integration testing
- **Load API Tests**: `ms-loadapis-ril-final/loadapitest/`
- **Manual Testing**: Primary validation method

### Running Tests

```bash
# Java tests
mvn test

# Python tests
python -m pytest loadapitest/
```

## Enhancement Impact Analysis

### Files That Will Need Modification

Based on the BMAD ADS Automation requirements, these files will be affected:

- `irisx-algo/src/main/java/com/increff/irisx/module/distribution/DistributionAllocationModule.java` - Add new allocation logic
- `irisx-algo/src/main/java/com/increff/irisx/module/distributionCommons/AbstractAllocationModule.java` - Shared class modifications
- `ms-loadapis-ril-final/loadapi/distribution/` - New load APIs for new inputs
- `irisx-config/template/` - New TSV templates for new inputs
- `irisx-config/view-creation/` - New SQL views for new outputs
- `irisx-config/module_input.json` - Configuration updates

### New Files/Modules Needed

- New load API classes for new input types
- New TSV templates for new input formats
- New SQL views for new output formats
- New validation modules for new business rules

### Integration Considerations

- Must maintain Spring dependency injection patterns
- Must follow existing load API inheritance patterns
- Must maintain TSV header consistency
- Must follow SQL view naming conventions
- Must update configuration files consistently

## Key Patterns and Conventions

### Naming Conventions

- **Java Modules**: `{Module}{Component}Module.java`
- **Load APIs**: `{Module}{Component}LoadApi.py`
- **TSV Templates**: `export_{module}_input_{component}_template.tsv`
- **SQL Views**: `child-input-input_{module}_{component}.sql`

### Inheritance Patterns

- **Load APIs**: All extend `LoadApi` base class
- **Modules**: All extend `AbstractAllocationModule`
- **Data Classes**: Follow consistent naming and structure patterns

### Configuration Patterns

- **Module Input**: Defined in `module_input.json`
- **Module Output**: Defined in `module_output.json`
- **File Uploads**: Defined in `upload-files.json`

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Java development
mvn clean package
mvn test

# Python development
python main.py
python -m pytest

# Configuration management
# Edit JSON files directly
```

### Debugging and Troubleshooting

- **Logs**: Check application logs for errors
- **Configuration**: Verify JSON configuration files
- **Dependencies**: Check Maven and pip dependencies
- **Azure**: Verify Azure credentials and connections

## Critical Implementation Notes

### For BMAD ADS Automation System

1. **Repository Coordination**: Must handle three repositories simultaneously
2. **Pattern Recognition**: Must identify existing patterns before making changes
3. **Dependency Analysis**: Must understand shared class impacts
4. **Configuration Consistency**: Must maintain consistency across all three repositories
5. **Validation Integration**: Must work with existing 25+ validation modules
6. **Azure Integration**: Must maintain Azure SQL and storage connections
7. **Template Management**: Must follow existing TSV and SQL view patterns

### Success Factors

- Understanding the shared abstract class hierarchy
- Maintaining configuration consistency across repositories
- Following existing naming and structural patterns
- Proper integration with Azure services
- Comprehensive validation of changes
- Clear documentation of modifications
