# Brownfield Architecture Reference

## Overview

This document provides the brownfield architecture reference for the three interconnected repositories that form the BMAD ADS Automation System.

## Repository Architecture

### irisx-algo (Java/Spring Boot)
- **Purpose**: Core business logic and algorithms
- **Technology**: Java 1.8, Spring Boot, Maven
- **Key Components**:
  - Distribution modules
  - Depletion modules
  - Allocation modules
  - Validation modules (25+)
  - Abstract classes and shared components

### ms-loadapis-ril-final (Python)
- **Purpose**: Data ingestion and load APIs
- **Technology**: Python 3.8+, Azure integration
- **Key Components**:
  - Load API base classes
  - Distribution load APIs (25+)
  - Common utilities
  - Constants and error handling

### irisx-config (Configuration/SQL)
- **Purpose**: Configuration, SQL views, and templates
- **Technology**: JSON, TSV, SQL
- **Key Components**:
  - TSV input templates (100+)
  - SQL view definitions (200+)
  - Configuration files
  - Export definitions

## Data Flow Architecture

```
Input Data → Load APIs (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

## Key Technical Debt

### Shared Abstract Classes
- **AbstractAllocationModule**: Extended by 6+ modules
- **BaseIterationRunner**: Used by multiple modules
- **BaseDistributionData**: 100+ fields, core data structure

### Configuration Complexity
- **Large JSON configs**: Deep nesting and complex structures
- **TSV Processing**: All input data in TSV format
- **SQL View Dependencies**: 200+ views with complex dependencies

### Integration Constraints
- **Azure Integration**: All data processing through Azure SQL
- **Spring Dependency Injection**: Heavy use of @Autowired and @Qualifier
- **Schema Synchronization**: Must maintain consistency across Java, Python, and SQL

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
