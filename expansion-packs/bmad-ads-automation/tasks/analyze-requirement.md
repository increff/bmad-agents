# Analyze Requirement Task

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

### 3. Module Identification Rules

#### Primary Keyword Matching

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

#### Compound Requirements

- If requirement mentions multiple concepts, identify primary module
- Example: "Pivotal tag override in ideal size" → ISS module (not distribution)

### 4. Repository Discovery and Structure Analysis

#### 4.0 Initial Repository Discovery

1. **Discover All Available Modules**: First, discover all modules in irisx-algo
   ```bash
   # Get repository path from configuration
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   ls -la $REPO_PATH/src/main/java/com/increff/irisx/module/
   ```
2. **Discover All API Endpoints**: Understand the API structure in ms-loadapis-ril-final
   ```bash
   # Get repository path from configuration
   LOADAPI_PATH=$(grep -A 5 "ms-loadapis-ril-final:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   find $LOADAPI_PATH -name "*.py" | grep -E "(api|load)" | head -20
   ```
3. **Discover All Configuration Files**: Understand the configuration structure in irisx-config
   ```bash
   # Get repository path from configuration
   CONFIG_PATH=$(grep -A 5 "irisx-config:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   find $CONFIG_PATH -type f | head -20
   ```
4. **Map Repository Relationships**: Understand how the three repositories interact
5. **Identify Common Patterns**: Find patterns across all repositories

### 5. Targeted Repository Crawling and Structure Analysis

#### 5.1 Crawl irisx-algo Repository

1. **Discover All Modules**: First, discover all available modules
   ```bash
   # Get repository path from configuration
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   ls -la $REPO_PATH/src/main/java/com/increff/irisx/module/
   ```
2. **Navigate to Target Module**: Go to the identified module directory based on requirement analysis
3. **Examine Module Structure**:
   ```bash
   # Get repository path from configuration
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   ls -la $REPO_PATH/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/
   ```
4. **Analyze Key Classes**: Read main module classes to understand structure
   ```bash
   # Get repository path from configuration
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   find $REPO_PATH/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/ -name "*.java" | head -10
   ```
5. **Data Class Analysis**: Examine data classes and their fields
6. **Interface Analysis**: Check interfaces and abstract classes
7. **Dependency Analysis**: Identify imports and dependencies
8. **Pattern Discovery**: Find existing patterns for similar functionality
9. **Search for Related Files**: Look for files with similar functionality
   ```bash
   # Get repository path from configuration
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   grep -r "{REQUIREMENT_KEYWORD}" $REPO_PATH/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/
   ```

#### 5.2 Crawl ms-loadapis-ril-final Repository

1. **Discover API Structure**: First, understand the overall API structure
   ```bash
   ls -la /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final/
   ```
2. **Navigate to Related APIs**: Find corresponding Python API files based on requirement keywords
   ```bash
   find /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"
   ```
3. **Examine API Structure**: Understand API endpoints and methods
   ```bash
   ls -la /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final/loadapi/
   ```
4. **Data Flow Analysis**: Trace data flow from APIs to algorithms
5. **Configuration Analysis**: Check configuration and parameter handling
   ```bash
   find /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final -name "*.py" | grep -i config
   ```
6. **Pattern Discovery**: Find existing patterns for similar functionality
   ```bash
   grep -r "{REQUIREMENT_KEYWORD}" /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final/
   ```

#### 5.3 Crawl irisx-config Repository

1. **Discover Configuration Structure**: First, understand the overall configuration structure

   ```bash
   ls -la /Users/viratbansal/IdeaProjects/irisx-config/
   ```

2. **Targeted File Discovery**: Find all relevant files for the specific requirement

   ```bash
   # Get repository path from configuration
   CONFIG_PATH=$(grep -A 5 "irisx-config:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)

   # Find all files related to the requirement
   find $CONFIG_PATH -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"
   find $CONFIG_PATH -type f -exec grep -l "{REQUIREMENT_KEYWORD}" {} \;
   ```

3. **File Impact Analysis**: Identify all files that need to be edited, added, or deleted

   ```bash
   # Get repository path from configuration
   CONFIG_PATH=$(grep -A 5 "irisx-config:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)

   # Find files to EDIT (existing files that need changes)
   find $CONFIG_PATH -name "*{MODULE_NAME}*" -type f
   find $CONFIG_PATH -type f -exec grep -l "{REQUIREMENT_KEYWORD}" {} \;

   # Find files to ADD (new files that need to be created)
   # Based on requirement analysis, determine which new files are needed

   # Find files to DELETE (files that need to be removed)
   # Based on requirement analysis, determine which files are obsolete
   ```

4. **Change Impact Assessment**: Analyze the impact of edit/add/delete operations

   ```bash
   # Check dependencies for files to be edited
   for file in $(find $CONFIG_PATH -name "*{MODULE_NAME}*" -type f); do
     echo "Analyzing dependencies for: $file"
     grep -r "$(basename $file)" $CONFIG_PATH/
   done

   # Check for references to files to be deleted
   for file in $(find $CONFIG_PATH -name "*{OBSOLETE_PATTERN}*" -type f); do
     echo "Checking references to: $file"
     grep -r "$(basename $file)" $CONFIG_PATH/
   done
   ```

5. **Cross-Repository Impact**: Check impact on other repositories

   ```bash
   # Get other repository paths
   REPO_PATH=$(grep -A 5 "irisx-algo:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)
   LOADAPI_PATH=$(grep -A 5 "ms-loadapis-ril-final:" config/ads-orchestrator.yaml | grep "path:" | cut -d'"' -f2)

   # Check irisx-algo for references to config changes
   grep -r "{REQUIREMENT_KEYWORD}" $REPO_PATH/src/

   # Check ms-loadapis-ril-final for references to config changes
   grep -r "{REQUIREMENT_KEYWORD}" $LOADAPI_PATH/
   ```

6. **Validation Requirements**: Identify what needs to be validated after changes

   ```bash
   # Check for test files related to the requirement
   find $CONFIG_PATH -name "*test*" -o -name "*spec*" | grep -i "{REQUIREMENT_KEYWORD}"

   # Check for validation scripts
   find $CONFIG_PATH -name "*validate*" -o -name "*check*" | grep -i "{REQUIREMENT_KEYWORD}"
   ```

#### 5.4 Cross-Repository Analysis

1. **Data Flow Mapping**: Map data flow across all three repositories
2. **Interface Consistency**: Ensure interfaces are consistent
3. **Configuration Alignment**: Verify configuration alignment
4. **Pattern Consistency**: Ensure patterns are consistent across repositories

### 6. Comprehensive Pattern Discovery

1. **Discover All Override Patterns**: Find existing override mechanisms
   ```bash
   grep -r "override" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -20
   ```
2. **Discover All Tag Patterns**: Find existing tag-related functionality
   ```bash
   grep -r "tag" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -20
   ```
3. **Discover All Store-Category Patterns**: Find store-category level implementations
   ```bash
   grep -r "store.*cat\|category.*store" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -20
   ```
4. **Discover All Data Structure Patterns**: Find common data structure patterns
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ -name "*Data.java" | head -10
   ```
5. **Discover All Module Patterns**: Find common module structure patterns
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ -name "*Module.java" | head -10
   ```

### 6.1 CRITICAL: Data Loading Pattern Discovery

1. **Discover Java Data Loading Patterns**: Find how Java modules load data
   ```bash
   grep -r "db\(\)\.select" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -20
   ```
2. **Discover Python Load API Patterns**: Find how Python APIs handle file loading
   ```bash
   find /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final -name "*LoadApi.py" | head -10
   ```
3. **Discover Input Row Patterns**: Find existing input row classes
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/row/input -name "*Row.java" | head -20
   ```
4. **Validate Architecture Separation**: Ensure Java modules don't handle file loading
   ```bash
   grep -r "File\|TSV\|CSV" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -10
   ```
5. **CRITICAL: Discover Load API Registration Patterns**: Find how Load APIs are registered
   ```bash
   find /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final -name "__init__.py" | head -5
   ```
6. **CRITICAL: Check Load API Registration**: Verify new Load APIs are registered in `__init__.py` files
   ```bash
   grep -r "LoadApi\|import.*LoadApi" /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final/__init__.py
   ```
7. **CRITICAL: Discover Input Schema Patterns**: Find how inputs are registered in SchemaProvider
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src -name "*SchemaProvider*" | head -5
   ```
8. **CRITICAL: Discover Filename Patterns**: Find how filenames are configured
   ```bash
   grep -r "filename\|Filename" /Users/viratbansal/IdeaProjects/irisx-algo/src | head -10
   ```
9. **CRITICAL: Discover Input JSON Patterns**: Find how inputs are configured in JSON
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-config -name "*.json" | head -10
   ```
10. **CRITICAL: Discover Output Sync Patterns**: Find how outputs are registered in Util Output Sync Module
    ```bash
    find /Users/viratbansal/IdeaProjects/irisx-algo/src -name "*OutputSync*" -o -name "*Output*Sync*" | head -5
    ```
11. **CRITICAL: Discover Output CAAS JSON Patterns**: Find how outputs are configured in CAAS JSON
    ```bash
    find /Users/viratbansal/IdeaProjects/irisx-config -name "*caas*" -o -name "*CAAS*" | head -5
    ```
12. **CRITICAL: Discover Output Registration Patterns**: Find how outputs are registered
    ```bash
    grep -r "output\|Output" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/util/ | head -10
    ```

### 7. Implementation Plan Creation

1. **File Operation Mapping**: Map requirements to specific file operations (edit/add/delete)
2. **File Identification**: Identify specific files to modify, create, or remove based on actual structure
3. **Pattern Matching**: Find existing patterns to follow from actual code
4. **Dependency Analysis**: Identify any cross-module dependencies from actual code
5. **Change Impact Analysis**: Analyze impact of edit/add/delete operations
6. **Database Operations Planning**: Plan database operations for irisx-config repository
7. **Implementation Steps**: Create step-by-step implementation plan based on real structure

#### 7.1 Database Operations Planning

**CRITICAL**: Every implementation plan MUST include database operations for irisx-config repository based on edit/add/delete operations:

1. **SQL View Operations** (319+ existing views):
   - **EDIT**: Modify existing `view-creation/child-input-{component}.sql` and `child-output-{component}.sql` files
   - **ADD**: Create new `view-creation/child-input-{component}.sql` and `child-output-{component}.sql` files following pattern
   - **DELETE**: Remove obsolete `view-creation/child-{type}-{component}.sql` files
   - **Naming Convention**: Follow `child-{type}-{module}_{component}.sql` pattern
   - **OPENROWSET Configuration**: Use proper DATA_SOURCE and FORMAT settings
   - **Field Mapping**: Map input/output fields to appropriate SQL data types

2. **Synchronization Operations** (156+ existing sync files):
   - **EDIT**: Modify existing `sync/{module}_{component}.sql` files
   - **ADD**: Create new `sync/{module}_{component}.sql` files following pattern
   - **DELETE**: Remove obsolete `sync/{module}_{component}.sql` files
   - **Data Consistency**: Ensure data consistency between repositories and database
   - **Sync Patterns**: Follow existing synchronization patterns and configurations
   - **Module Mapping**: Use discovered module abbreviations (AG, BI, DISC, DIST, A, AP, DEP, EOSS, OTB, ISS, TRANSACTIONAL)

3. **Export Operations** (223+ existing export files):
   - **EDIT**: Modify existing `export/export_{module}_{type}_{component}.sql` files
   - **ADD**: Create new `export/export_{module}_{type}_{component}.sql` files following pattern
   - **DELETE**: Remove obsolete `export/export_{module}_{type}_{component}.sql` files
   - **Export Templates**: Create/modify `export/export_{module}_{type}_{component}_template.sql` files
   - **Multiple Formats**: Support CSV, TSV, JSON export formats
   - **Reusable Templates**: Create reusable export templates for common operations

4. **Template Query Management** (108+ existing templates):
   - **EDIT**: Modify existing `template/export_{module}_input_{component}_template.tsv` files
   - **ADD**: Create new `template/export_{module}_input_{component}_template.tsv` files following pattern
   - **DELETE**: Remove obsolete `template/export_{module}_input_{component}_template.tsv` files
   - **Template Structure**: Follow existing TSV template structure with field definitions and examples
   - **Naming Convention**: Use `export_{module}_{type}_{component}_template.tsv` pattern
   - **Field Documentation**: Include field descriptions and examples in templates

5. **Configuration Updates** (3 JSON config files):
   - **EDIT**: Modify existing entries in `module_input.json` (250KB), `module_output.json` (20KB), `upload-files.json` (60KB)
   - **ADD**: Add new entries to JSON configs following existing structure
   - **DELETE**: Remove obsolete entries from JSON configs
   - **SchemaProvider**: Update with new data schemas in irisx-algo repository
   - **Filename Configuration**: Update filename configurations for new data structures

6. **Change Impact Validation**:
   - **Dependency Check**: Verify no broken references after edit/add/delete operations
   - **Pattern Compliance**: Validate all modified/new files follow established naming patterns
   - **Module Consistency**: Ensure module abbreviations are consistent across all file types
   - **Cross-Repository Integration**: Verify irisx-config changes integrate with other repositories
   - **Rollback Plan**: Plan for rolling back changes if issues arise

### 8. Validation

1. **Module Correctness**: Verify identified modules are correct for the requirement
2. **File Existence**: Confirm target files exist in repositories
3. **Pattern Consistency**: Ensure implementation follows existing patterns
4. **Scope Validation**: Verify implementation scope matches requirement
5. **CRITICAL: Architecture Validation**:
   - Verify Java modules use `db().select()` pattern for data loading
   - Verify Python load APIs handle file-based data loading
   - STOP if any Java module tries to implement file-based loading
   - STOP if any Python API tries to use `db().select()` pattern
   - **CRITICAL: Load API Registration**: Verify any new Load API is registered in `__init__.py` files
   - **CRITICAL: Registration Pattern**: Check that Load API registration follows existing patterns
   - **CRITICAL: Input Schema Registration**: Verify any new input is registered in SchemaProvider
   - **CRITICAL: Filename Configuration**: Verify any new input has proper filename configuration
   - **CRITICAL: Input JSON Configuration**: Verify any new input is part of input JSON in config
   - **CRITICAL: Output Sync Registration**: Verify any new output is registered in Util Output Sync Module
   - **CRITICAL: Output CAAS JSON Configuration**: Verify any new output is part of Output CAAS JSON

## Module Identification Examples

### Example 1: ISS Module

**Requirement**: "ADD PIVOTAL TAG OVERRIDE IN IDEAL SIZE AT STORE CAT LEVEL"
**Keywords**: "pivotal tag", "override", "ideal size", "store cat level"
**Primary Module**: ISS (Ideal Size Set)
**Reasoning**:

- "Ideal size" → ISS module
- "Store cat level" → ISS handles store-category level data
- "Override" → ISS supports override mechanisms
  **Target Files**: `ISSTaggingModule.java`, `ISSData.java`, `ISSModuleData.java`

### Example 2: Distribution Module

**Requirement**: "ADD STORE-SKU ALLOCATION OVERRIDE"
**Keywords**: "store-sku", "allocation", "override"
**Primary Module**: Distribution
**Reasoning**:

- "Store-SKU allocation" → Distribution module handles SKU-level allocation
- "Override" → Distribution supports override mechanisms
  **Target Files**: `BaseDistributionData.java`, `DistributionAllocationModule.java`

### Example 3: OTB Module

**Requirement**: "MODIFY BUYING CALCULATIONS FOR NEW STORES"
**Keywords**: "buying", "calculations", "new stores"
**Primary Module**: OTB (Open To Buy)
**Reasoning**:

- "Buying calculations" → OTB module handles buying logic
- "New stores" → OTB supports store-specific calculations
  **Target Files**: `OtbHelper.java`, `OtbDataInputModule.java`

## Error Prevention

### Common Mistakes to Avoid

1. **Wrong Module Selection**: Don't confuse ISS with Distribution
2. **Context Ignorance**: Consider the full context, not just keywords
3. **Pattern Mismatch**: Ensure implementation follows existing patterns
4. **Scope Creep**: Stick to the requirement scope

### Validation Checks

1. **Module Existence**: Verify module exists in repository
2. **File Existence**: Confirm target files exist
3. **Pattern Consistency**: Check against existing patterns
4. **Business Logic**: Ensure implementation makes business sense

## Output

- **Identified Modules**: List of primary and secondary modules
- **Target Files**: Specific files to modify in each module
- **Implementation Plan**: Step-by-step implementation approach
- **Pattern References**: Existing patterns to follow
- **Validation Results**: Confirmation of module and file selection

## Success Criteria

- [ ] **All repositories discovered and mapped** through actual crawling
- [ ] **All available modules identified** in irisx-algo repository
- [ ] **All API endpoints discovered** in ms-loadapis-ril-final repository
- [ ] **All configuration files mapped** in irisx-config repository
- [ ] **Comprehensive patterns discovered** across all repositories
- [ ] Correct modules identified based on requirement keywords and actual structure
- [ ] Target files confirmed to exist in repositories through actual verification
- [ ] Implementation plan created with clear steps based on real patterns
- [ ] Patterns identified for consistent implementation from actual code
- [ ] Validation completed successfully
- [ ] No incorrect module targeting (e.g., ISS vs Distribution)
- [ ] **Repository structure fully understood** through dynamic discovery
- [ ] **CRITICAL: Data loading architecture validated** - Java modules use `db().select()`, Python APIs handle file loading
- [ ] **CRITICAL: No architectural violations** - No file loading in Java modules, no `db().select()` in Python APIs
- [ ] **CRITICAL: Load API registration validated** - Any new Load API registered in `__init__.py` files
- [ ] **CRITICAL: Registration patterns followed** - Load API registration follows existing patterns
- [ ] **CRITICAL: Input schema registration validated** - Any new input registered in SchemaProvider
- [ ] **CRITICAL: Filename configuration validated** - Any new input has proper filename configuration
- [ ] **CRITICAL: Input JSON configuration validated** - Any new input is part of input JSON in config
- [ ] **CRITICAL: Output sync registration validated** - Any new output registered in Util Output Sync Module
- [ ] **CRITICAL: Output CAAS JSON configuration validated** - Any new output is part of Output CAAS JSON
- [ ] **CRITICAL: Database operations planned** - SQL views, sync, export, and template queries included in implementation plan
- [ ] **CRITICAL: SQL view creation planned** - Input and output views planned for new data structures
- [ ] **CRITICAL: Synchronization operations planned** - Sync logic planned for data consistency
- [ ] **CRITICAL: Export operations planned** - Export configurations planned for new requirements
- [ ] **CRITICAL: Template queries planned** - TSV templates and SQL query templates planned
- [ ] **CRITICAL: Configuration updates planned** - All JSON configs planned for updates
- [ ] **CRITICAL: Dynamic structure discovery completed** - All irisx-config directories and files discovered programmatically
- [ ] **CRITICAL: File count analysis completed** - Accurate counts for templates (108), views (319), sync (156), export (223)
- [ ] **CRITICAL: Pattern recognition completed** - All naming patterns and conventions identified
- [ ] **CRITICAL: Module mapping completed** - All module abbreviations mapped to components and files
- [ ] **CRITICAL: Structure validation completed** - All new files follow established patterns and counts
- [ ] **CRITICAL: File operations mapped** - All edit/add/delete operations identified and planned
- [ ] **CRITICAL: Change impact analyzed** - Impact of all file operations assessed
- [ ] **CRITICAL: Dependencies validated** - No broken references after operations
- [ ] **CRITICAL: Rollback plan prepared** - Plan for rolling back changes if issues arise
