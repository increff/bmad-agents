# Analyze Requirement Task - Simplified

## Purpose

Analyze requirement documents to identify correct modules, create implementation plans, and ensure proper module targeting.

## Steps

### 1. Requirement Analysis

1. **Read Requirement Document**: Load and parse the requirement document
2. **Extract Keywords**: Identify key terms, modules, and business concepts
3. **Parse Context**: Understand the business context and scope
4. **Identify Dependencies**: Find related requirements or dependencies

### 2. Module Identification

1. **Load Module Abbreviations**: Reference `module-abbreviations.md` for module mapping
2. **Keyword Matching**: Match requirement keywords to module abbreviations
3. **Context Validation**: Ensure identified modules make sense for the requirement
4. **Primary Module Selection**: Identify the main module to modify
5. **Secondary Modules**: Identify any additional modules that might be affected

#### Module Identification Rules

- **"ideal size"** → ISS (Ideal Size Set) module
- **"distribution"** → Distribution module
- **"buying" or "otb"** → OTB (Open To Buy) module
- **"end of season" or "eoss"** → EOSS module
- **"business intelligence" or "bi"** → BI module

#### Context-Based Identification

- **Store + Category + Size** → ISS module
- **Store + SKU + Allocation** → Distribution module
- **Buying + Procurement** → OTB module
- **Sale + Pricing** → EOSS module

### 3. Targeted File Discovery

1. **Get Repository Paths**: Load paths from configuration

   ```bash
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   LOADAPI_PATH=$(grep -A 5 "ms-loadapis-ril-final:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   CONFIG_PATH=$(grep -A 5 "irisx-config:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   ```

2. **Find Related Files**: Discover files related to the requirement

   ```bash
   # Find files in all repositories
   find $REPO_PATH -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"
   find $LOADAPI_PATH -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"
   find $CONFIG_PATH -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"

   # Find files containing requirement keywords
   grep -r "{REQUIREMENT_KEYWORD}" $REPO_PATH/src/ $LOADAPI_PATH/ $CONFIG_PATH/
   ```

### 4. File Operations Planning

1. **Identify File Operations**: Determine what needs to be edited, added, or deleted
   - **EDIT**: Existing files that need changes
   - **ADD**: New files that need to be created
   - **DELETE**: Files that need to be removed

2. **Determine Implementation Type**:
   - **NEW TABLE/DATA STRUCTURE**: Create new data classes, LoadAPIs, SQL views, templates
   - **MODIFY EXISTING**: Edit existing files to add fields or functionality
   - **DELETE/REMOVE**: Remove files or functionality

3. **For NEW TABLE/DATA STRUCTURE Requirements**:
   - **Algorithm Repository**: Create new data classes AND edit module classes to USE them
   - **LoadAPI Repository**: Create new LoadAPI classes AND register them
   - **Config Repository**: Create new SQL views, templates, sync, export files

4. **Impact Analysis**: Check dependencies and references
   ```bash
   # Check for references to files being modified
   for file in $(find $REPO_PATH $LOADAPI_PATH $CONFIG_PATH -name "*{MODULE_NAME}*" -type f); do
     grep -r "$(basename $file)" $REPO_PATH/ $LOADAPI_PATH/ $CONFIG_PATH/
   done
   ```

### 5. Database Operations Planning (Conditional)

**ONLY required when changing input/output files or data structures:**

#### When Database Operations ARE Required:

- Adding new input/output fields to existing modules
- Creating new input/output data structures
- Modifying existing input/output schemas
- Adding new modules with input/output requirements

#### When Database Operations are NOT Required:

- Pure business logic changes (formulas, calculations)
- Internal module refactoring without schema changes
- Bug fixes that don't affect data structures
- Performance optimizations without schema changes

#### Database Operations (if required):

1. **SQL Views**: Create/modify `view-creation/child-input-{component}.sql` and `child-output-{component}.sql`
2. **Templates**: Create/modify `template/export_{module}_input_{component}_template.tsv`
3. **Sync Operations**: Create/modify `sync/{module}_{component}.sql`
4. **Export Operations**: Create/modify `export/export_{module}_{type}_{component}.sql`
5. **Configuration Updates**: Update `module_input.json`, `module_output.json`, `upload-files.json`

### 6. Implementation Plan Creation

1. **File Operation Mapping**: Map requirements to specific file operations (edit/add/delete)
2. **File Identification**: Identify specific files to modify, create, or remove
3. **Pattern Matching**: Find existing patterns to follow from actual code
4. **Dependency Analysis**: Identify any cross-module dependencies
5. **Usage Analysis**: For NEW TABLE requirements, identify where new data will be USED in module logic
6. **Implementation Steps**: Create step-by-step implementation plan

#### For NEW TABLE/DATA STRUCTURE Requirements:

**Algorithm Repository Operations:**

- **CREATE**: New data classes (e.g., `StoreSkuRosOverrideData.java`, `StoreSkuRosOverrideRow.java`)
- **EDIT**: Registration files (`SchemaProvider.java`, `Filename.java`)
- **EDIT**: Module classes to USE new data (`{Module}Module.java`, `{Module}Service.java`, `{Module}Controller.java`)

**LoadAPI Repository Operations:**

- **CREATE**: New LoadAPI classes (e.g., `StoreSkuRosOverrideLoadApi.py`)
- **EDIT**: Registration files (`__init__.py` files)

**Config Repository Operations:**

- **CREATE**: New SQL views, templates, sync, export files
- **EDIT**: Configuration files (`module_input.json`, `module_output.json`)

### 7. Validation

1. **Module Correctness**: Verify identified modules are correct for the requirement
2. **File Existence**: Confirm target files exist in repositories
3. **Pattern Consistency**: Ensure implementation follows existing patterns
4. **Scope Validation**: Verify implementation scope matches requirement
5. **Architecture Validation**: Verify Java modules use `db().select()`, Python APIs handle file loading

## Success Criteria

- [ ] Correct modules identified based on requirement keywords and context
- [ ] Target files confirmed to exist in repositories
- [ ] Implementation plan created with clear steps
- [ ] Patterns identified for consistent implementation
- [ ] Validation completed successfully
- [ ] No incorrect module targeting (e.g., ISS vs Distribution)
- [ ] **Implementation type identified** - NEW TABLE vs MODIFY EXISTING vs DELETE
- [ ] **For NEW TABLE: Usage analysis completed** - Module classes identified to USE new data
- [ ] **CONDITIONAL: Database operations planned** - ONLY if input/output changes
- [ ] **CRITICAL: Data loading architecture validated** - Java modules use `db().select()`, Python APIs handle file loading
- [ ] **CRITICAL: Load API registration validated** - Any new Load API registered in `__init__.py` files
- [ ] **CRITICAL: Input schema registration validated** - Any new input registered in SchemaProvider
- [ ] **CRITICAL: Output sync registration validated** - Any new output registered in Util Output Sync Module

## Output

- **Identified Modules**: List of primary and secondary modules
- **Implementation Type**: NEW TABLE/DATA STRUCTURE vs MODIFY EXISTING vs DELETE
- **Target Files**: Specific files to modify, create, or delete in each module
- **Usage Analysis**: For NEW TABLE requirements, identify where new data will be USED
- **Implementation Plan**: Step-by-step implementation approach
- **Pattern References**: Existing patterns to follow
- **Validation Results**: Confirmation of module and file selection
