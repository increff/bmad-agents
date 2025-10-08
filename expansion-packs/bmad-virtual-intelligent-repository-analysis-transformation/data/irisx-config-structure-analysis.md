# Irisx-Config Repository Structure Analysis

## Overview

This document provides a comprehensive analysis of the irisx-config repository structure based on dynamic crawling and discovery.

## Repository Structure

### Root Directory Structure

```
irisx-config/
├── .cicd/                          # CI/CD configuration
├── .claude/                        # Claude AI configuration
├── .cursor/                        # Cursor IDE configuration
├── .git/                           # Git repository
├── .idea/                          # IntelliJ IDEA configuration
├── .taskmaster/                    # TaskMaster configuration
├── docs/                           # Documentation
├── export/                         # Export configurations (223 files)
├── regression/                     # Regression testing
├── requirements/                   # Requirement documents
├── sync/                           # Synchronization logic (156 files)
├── tasks/                          # Task definitions
├── template/                       # TSV input templates (108 files)
├── venv/                           # Python virtual environment
├── view-creation/                  # SQL view definitions (319 files)
├── bitbucket-pipelines.yml         # CI/CD pipeline
├── module_input.json               # Input configuration (250KB)
├── module_output.json              # Output configuration (20KB)
└── upload-files.json               # File upload configuration (60KB)
```

## File Count Analysis

### Template Directory (108 files)

- **Purpose**: TSV input templates for data ingestion
- **Naming Pattern**: `export_{module}_{type}_{component}_template.tsv`
- **Examples**:
  - `export_ag_input_product_attribute_hierarchy_template.tsv`
  - `export_bi_input_buy_quantity_template.tsv`
  - `export_disc_input_discount_rules_template.tsv`
  - `export_dist_input_store_template.tsv`

### View-Creation Directory (319 files)

- **Purpose**: SQL view definitions for database operations
- **Input Views**: `child-input-{component}.sql` (e.g., `child-input-a_aop.sql`)
- **Output Views**: `child-output-{component}.sql` (e.g., `child-output-a_ag_id.sql`)
- **Pattern**: Views follow module-component naming convention

### Sync Directory (156 files)

- **Purpose**: Synchronization logic between repositories and database
- **Naming Pattern**: `{module}_{component}.sql`
- **Examples**:
  - `a_ag_id.sql`
  - `a_aop.sql`
  - `a_attribute.sql`
  - `a_channel_style_exclusions.sql`

### Export Directory (223 files)

- **Purpose**: Export configurations and templates
- **Naming Pattern**: `export_{module}_{type}_{component}.sql`
- **Examples**:
  - `export_ag_input_product_attribute_hierarchy.sql`
  - `export_bi_input_buy_quantity.sql`
  - `export_bi_output_sell_through_report.sql`

## Module Identification Patterns

### Module Abbreviations

Based on file analysis, the following module abbreviations are identified:

- **AG**: Attribute Groups
- **BI**: Business Intelligence
- **DISC**: Discounting
- **DIST**: Distribution
- **A**: Allocation (general)
- **AP**: Allocation Planning
- **DEP**: Depletion
- **EOSS**: End of Season Sale
- **OTB**: Open To Buy
- **ISS**: Ideal Size Set
- **TRANSACTIONAL**: Transactional data

### File Type Patterns

#### Input Templates

- **Pattern**: `export_{module}_input_{component}_template.tsv`
- **Purpose**: Define input data structure and format
- **Location**: `template/` directory

#### SQL Views

- **Input Views**: `child-input-{component}.sql`
- **Output Views**: `child-output-{component}.sql`
- **Purpose**: Database view definitions for data access
- **Location**: `view-creation/` directory

#### Sync Operations

- **Pattern**: `{module}_{component}.sql`
- **Purpose**: Synchronization logic between systems
- **Location**: `sync/` directory

#### Export Operations

- **Pattern**: `export_{module}_{type}_{component}.sql`
- **Purpose**: Export configuration and data extraction
- **Location**: `export/` directory

## Configuration Files

### module_input.json (250KB)

- **Purpose**: Defines input configurations for all modules
- **Structure**: JSON configuration with module-specific input definitions
- **Usage**: Referenced by LoadAPIs and Java modules for input validation

### module_output.json (20KB)

- **Purpose**: Defines output configurations for all modules
- **Structure**: JSON configuration with module-specific output definitions
- **Usage**: Referenced by Java modules for output generation

### upload-files.json (60KB)

- **Purpose**: Defines file upload configurations and mappings
- **Structure**: JSON configuration with file upload specifications
- **Usage**: Referenced by LoadAPIs for file processing

## Dynamic Discovery Commands

### Template Discovery

```bash
# Count template files
ls {CONFIG_REPO_PATH}/template/ | wc -l

# List template files by module
ls {CONFIG_REPO_PATH}/template/ | grep -E "export_(.*)_input_.*_template\.tsv" | sed 's/export_\(.*\)_input_.*/\1/' | sort | uniq -c
```

### View Discovery

```bash
# Count view files
ls {CONFIG_REPO_PATH}/view-creation/ | wc -l

# List input views
ls {CONFIG_REPO_PATH}/view-creation/ | grep -E "child-input-.*\.sql"

# List output views
ls {CONFIG_REPO_PATH}/view-creation/ | grep -E "child-output-.*\.sql"
```

### Sync Discovery

```bash
# Count sync files
ls {CONFIG_REPO_PATH}/sync/ | wc -l

# List sync files by module
ls {CONFIG_REPO_PATH}/sync/ | sed 's/\(.*\)_.*/\1/' | sort | uniq -c
```

### Export Discovery

```bash
# Count export files
ls {CONFIG_REPO_PATH}/export/ | wc -l

# List export files by module
ls {CONFIG_REPO_PATH}/export/ | grep -E "export_(.*)_" | sed 's/export_\(.*\)_.*/\1/' | sort | uniq -c
```

## Implementation Implications

### For Requirement Analysis

1. **Module Identification**: Use file patterns to identify affected modules
2. **Component Mapping**: Map requirements to specific components within modules
3. **File Dependencies**: Identify all files that need to be created/modified
4. **Pattern Following**: Follow existing naming and structure patterns

### For Implementation Planning

1. **Template Creation**: Create TSV templates following `export_{module}_input_{component}_template.tsv` pattern
2. **View Creation**: Create SQL views following `child-input-{component}.sql` and `child-output-{component}.sql` patterns
3. **Sync Operations**: Create sync files following `{module}_{component}.sql` pattern
4. **Export Operations**: Create export files following `export_{module}_{type}_{component}.sql` pattern
5. **Configuration Updates**: Update JSON configs with new entries

### For Validation

1. **File Existence**: Verify all required files exist in correct directories
2. **Pattern Compliance**: Ensure all files follow established naming patterns
3. **Configuration Consistency**: Verify JSON configs are updated consistently
4. **Cross-Repository Integration**: Ensure irisx-config changes integrate with other repositories

## Success Criteria

- [ ] **Complete Structure Discovery**: All directories and file types identified
- [ ] **Pattern Recognition**: All naming patterns and conventions documented
- [ ] **Module Mapping**: All module abbreviations and components mapped
- [ ] **File Count Analysis**: Accurate counts for all file types
- [ ] **Dynamic Commands**: Commands for discovering structure programmatically
- [ ] **Implementation Guidelines**: Clear guidelines for following patterns
- [ ] **Validation Framework**: Framework for validating structure compliance
