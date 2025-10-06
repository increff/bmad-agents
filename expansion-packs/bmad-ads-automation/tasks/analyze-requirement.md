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
   ls -la /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/
   ```
2. **Discover All API Endpoints**: Understand the API structure in ms-loadapis-ril-final
   ```bash
   find /Users/viratbansal/IdeaProjects/ms-loadapis-ril-final -name "*.py" | grep -E "(api|load)" | head -20
   ```
3. **Discover All Configuration Files**: Understand the configuration structure in irisx-config
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-config -type f | head -20
   ```
4. **Map Repository Relationships**: Understand how the three repositories interact
5. **Identify Common Patterns**: Find patterns across all repositories

### 5. Targeted Repository Crawling and Structure Analysis

#### 5.1 Crawl irisx-algo Repository

1. **Discover All Modules**: First, discover all available modules
   ```bash
   ls -la /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/
   ```
2. **Navigate to Target Module**: Go to the identified module directory based on requirement analysis
3. **Examine Module Structure**:
   ```bash
   ls -la /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/
   ```
4. **Analyze Key Classes**: Read main module classes to understand structure
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/ -name "*.java" | head -10
   ```
5. **Data Class Analysis**: Examine data classes and their fields
6. **Interface Analysis**: Check interfaces and abstract classes
7. **Dependency Analysis**: Identify imports and dependencies
8. **Pattern Discovery**: Find existing patterns for similar functionality
9. **Search for Related Files**: Look for files with similar functionality
   ```bash
   grep -r "{REQUIREMENT_KEYWORD}" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/{TARGET_MODULE}/
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
2. **Navigate to Configuration Files**: Find relevant config files based on requirement keywords
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-config -name "*{REQUIREMENT_KEYWORD}*" -o -name "*{MODULE_NAME}*"
   ```
3. **Database Schema Analysis**: Examine SQL files and schema changes
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-config -name "*.sql" | head -10
   ```
4. **Configuration Patterns**: Understand configuration structure
5. **Dependency Analysis**: Check configuration dependencies
   ```bash
   grep -r "{REQUIREMENT_KEYWORD}" /Users/viratbansal/IdeaProjects/irisx-config/
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

1. **Module Mapping**: Map requirements to specific modules and files based on actual crawling
2. **File Identification**: Identify specific files to modify based on actual structure
3. **Pattern Matching**: Find existing patterns to follow from actual code
4. **Dependency Analysis**: Identify any cross-module dependencies from actual code
5. **Implementation Steps**: Create comprehensive step-by-step implementation plan based on real structure

#### 7.1 Dynamic Implementation Steps Generation

**CRITICAL**: Generate implementation steps dynamically based on requirement analysis and repository crawling results. Only include steps that are actually needed for the specific requirement.

**Step Generation Logic**:

1. **FIRST: Complete Requirement Analysis**:
   - Analyze requirement type and scope
   - Identify affected modules through crawling
   - Discover existing patterns and structures
   - Map dependencies and relationships

2. **SECOND: Repository Crawling Analysis**:
   - Crawl irisx-algo to understand current module structure
   - Crawl ms-loadapis-ril-final to understand LoadAPI patterns
   - Crawl irisx-config to understand configuration patterns
   - Identify what exists vs what needs to be created

3. **THIRD: Dynamic Step Generation**: Based on analysis and crawling results, identify which components need to be created/modified:
   - New input data → Steps 1-6, 7-8 (if LoadAPI needed), 9, 11-18 (if database operations needed)
   - New output data → Steps 11-18 (database operations), 19-24 (if module changes needed)
   - Existing module modification → Steps 19-24 (module implementation)
   - LoadAPI changes → Steps 7-8, 11-18 (database operations)
   - Configuration changes → Step 9
   - Business logic changes → Step 10, 19-24 (module implementation)

4. **FOURTH: Generate Targeted Step List**: Create a dynamic list of steps based on what's actually needed and what was discovered through crawling

**Available Implementation Steps** (use only as needed):

**Core Input Steps** (use when adding new input data):

- **Step 1: Create Input Row Class** - `{ModuleName}Row.java`
- **Step 2: Create File Handler** - `{ModuleName}File.java`
- **Step 3: Update Schema Provider Registration** - `SchemaProvider.java`
- **Step 4: Update Filename Constants** - `FileName.java`
- **Step 5: Data Loading Integration** - `{ModuleName}PrepareDataModule.java`
- **Step 6: Data Storage & Access** - `Base{ModuleName}Data.java`

**LoadAPI Steps** (use when creating new LoadAPIs):

- **Step 7: Create Load API** - `{ModuleName}LoadApi.py`
- **Step 8: Register Load API** - `__init__.py`

**Configuration Steps** (use when adding new configurations):

- **Step 9: Update Configuration Files** - Template files and JSON configs

**Business Logic Steps** (use when modifying business logic):

- **Step 10: Business Logic Integration** - Helper classes and iteration runners

**Database Operations Steps** (use when LoadAPIs are created/modified):

- **Step 11: Create Input View** - SQL input views
- **Step 12: Create Output View** - SQL output views
- **Step 13: Setup Sync** - Sync configuration
- **Step 14: Setup Export** - Export configuration
- **Step 15: Create Template Queries** - Reusable queries
- **Step 16: Update Schema** - Database schema modifications
- **Step 17: Update Module Output Configuration** - Output JSON configs
- **Step 18: Update Upload Files Configuration** - Upload file configs

**Module Implementation Steps** (use when modifying existing modules):

- **Step 19: Update Module Data Class** - Data classes
- **Step 20: Update Module Implementation** - Module logic
- **Step 21: Update Module Data Row** - Data row classes
- **Step 22: Create Validation Rules** - Validation classes
- **Step 23: Update Constants** - Constants classes
- **Step 24: Create Tests** - Test classes

**Step Selection Rules**:

- **New Input Requirement**: Include Steps 1-6, 7-8 (if LoadAPI needed), 9, 11-18 (if database operations needed)
- **New Output Requirement**: Include Steps 11-18 (database operations), 19-24 (if module changes needed)
- **Existing Module Modification**: Include Steps 19-24 (module implementation)
- **LoadAPI Changes**: Include Steps 7-8, 11-18 (database operations)
- **Configuration Changes**: Include Step 9
- **Business Logic Changes**: Include Step 10, 19-24 (module implementation)

### 7.2 Implementation Plan Output

**CRITICAL**: After completing the requirement analysis and repository crawling, output the implementation plan in the following format. The plan should be based on what was discovered through crawling, not hardcoded steps.

```
## Implementation Plan

Step 1: Create Input Row Class
File: {ModuleName}Row.java
Location: /irisx-algo/src/main/java/com/increff/irisx/row/input/{module}/
Fields: {fields based on requirement analysis}
Pattern: Follow existing row class patterns

Step 2: Create Load API
File: {ModuleName}LoadApi.py
Location: /ms-loadapis-ril-final/loadapi/{module}/
Pattern: Follow existing LoadAPI structure
Reference: Use similar LoadAPI as template

Step 3: Register Load API
File: /ms-loadapis-ril-final/loadapi/__init__.py
Import ID: import_{module}_input_{feature_name}
Pattern: Follow existing registration patterns

Step 4: Update Configuration
File: /irisx-config/module_input.json
Input: input_{module}_{feature_name}
Pattern: Follow existing input configuration patterns

Step 5: Update Filename Constants
File: /irisx-algo/src/main/java/com/increff/irisx/constants/FileName.java
Constant: {MODULE}_{FEATURE_NAME}
Pattern: Follow existing filename constant patterns

Step 6: Update Schema Provider
File: /irisx-algo/src/main/java/com/increff/irisx/provider/SchemaProvider.java
Import: Add {module} input file import
Pattern: Follow existing schema provider patterns

Step 7: Database Operations - Create Input View
File: /irisx-config/view-creation/child-input-{module}-{feature}.sql
View: child_input_{module}_{feature}
Pattern: Follow existing input view patterns

Step 8: Database Operations - Create Output View
File: /irisx-config/view-creation/child-output-{module}-{feature}.sql
View: child_output_{module}_{feature}
Pattern: Follow existing output view patterns

Step 9: Database Operations - Setup Sync
File: /irisx-config/sync/{module}-{feature}-sync.yaml
Config: Sync configuration for data flow
Pattern: Follow existing sync configuration patterns

Step 10: Database Operations - Setup Export
File: /irisx-config/export/{module}-{feature}-export.yaml
Config: Export configuration for data delivery
Pattern: Follow existing export configuration patterns

Step 11: Database Operations - Create Template Queries
File: /irisx-config/template-queries/{module}-{feature}-queries.sql
Queries: Reusable parameterized queries
Pattern: Follow existing template query patterns

Step 12: Database Operations - Update Schema
File: /irisx-config/migrations/add_{module}_{feature}.sql
Schema: Database schema modifications
Pattern: Follow existing migration patterns

Step 13: Database Operations - Update Module Output Configuration
File: /irisx-config/module_output.json
Output: output_{module}_{feature_name}
Pattern: Follow existing output configuration patterns

Step 14: Database Operations - Update Upload Files Configuration
File: /irisx-config/upload-files.json
Config: File upload configuration for new feature
Pattern: Follow existing upload files configuration patterns

Step 15: Update Module Data Class
File: /irisx-algo/src/main/java/com/increff/irisx/data/{ModuleName}Data.java
Fields: Add new fields based on requirement
Pattern: Follow existing module data patterns

Step 16: Update Module Implementation
File: /irisx-algo/src/main/java/com/increff/irisx/module/{module}/{ModuleName}Module.java
Logic: Implement business logic for new feature
Pattern: Follow existing module implementation patterns

Step 17: Update Module Data Row
File: /irisx-algo/src/main/java/com/increff/irisx/row/{module}/{ModuleName}DataRow.java
Fields: Add new fields for data processing
Pattern: Follow existing module data row patterns

Step 18: Create Validation Rules
File: /irisx-algo/src/main/java/com/increff/irisx/module/validation/{ModuleName}Validation.java
Rules: Business validation rules for new feature
Pattern: Follow existing validation patterns

Step 19: Update Constants
File: /irisx-algo/src/main/java/com/increff/irisx/constants/{ModuleName}Constants.java
Constants: Add new constants for the feature
Pattern: Follow existing constants patterns

Step 20: Create Tests
File: /irisx-algo/src/test/java/com/increff/irisx/module/{module}/{ModuleName}ModuleTest.java
Tests: Unit tests for new functionality
Pattern: Follow existing test patterns
```

**CRITICAL**:

1. **FIRST**: Complete requirement analysis and repository crawling to understand what exists and what needs to be created
2. **SECOND**: Generate implementation steps dynamically based on analysis results - only include steps that are actually needed
3. **THIRD**: Each step must include the file path, purpose, and pattern reference based on what was discovered through crawling
4. **FOURTH**: Do not hardcode steps - use the dynamic step generation logic based on requirement type and crawling results

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
