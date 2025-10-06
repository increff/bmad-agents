<!-- Powered by BMAD™ Core -->

# Module Identification Task

## Purpose

Identify target modules and patterns from requirements to determine which modules need to be created, modified, or enhanced across the three interconnected repositories.

## Task Instructions

### 1. Module Keyword Analysis

**Step 1: Extract Module Keywords from Requirement**

1. **Parse Requirement Text**:
   - Extract all technical keywords
   - Identify domain-specific terms
   - Map business concepts to technical modules

2. **Keyword Classification**:
   - **Domain Keywords**: distribution, inventory, analysis, etc.
   - **Technical Keywords**: module, class, file, configuration, etc.
   - **Business Keywords**: store, sku, style, channel, etc.

### 2. Module Mapping Analysis

**Step 2: Map Keywords to Module Abbreviations**

1. **Load Module Abbreviations**:

   ```bash
   # Reference module abbreviations mapping
   cat $MODULE_ABBREVIATIONS_FILE
   ```

2. **Keyword to Module Mapping**:
   - **"distribution"** → `dist` module
   - **"inventory"** → `iss` module
   - **"analysis"** → `analysis` module
   - **"discount"** → `dynamicdiscounting` module
   - **"reorder"** → `reordering` module
   - **"otb"** → `otb` module
   - **"master"** → `master` module

3. **Context Validation**:
   - Ensure identified modules make sense for the requirement
   - Validate module choice against requirement context
   - Prevent incorrect targeting (e.g., ISS vs Distribution)

### 3. Primary Module Selection

**Step 3: Identify Primary Module**

1. **Primary Module Criteria**:
   - **Main Functionality**: Module that contains primary business logic
   - **Data Ownership**: Module that owns the primary data structures
   - **Business Impact**: Module with highest business impact
   - **Technical Complexity**: Module with most technical changes

2. **Primary Module Validation**:

   ```bash
   # Verify primary module exists and is accessible
   ls -la $REPO_PATH/src/main/java/com/increff/irisx/module/$PRIMARY_MODULE/
   ```

3. **Primary Module Documentation**:
   - Record why specific module was chosen
   - Document module's current state and capabilities
   - Identify module's existing patterns and conventions

### 4. Secondary Module Identification

**Step 4: Identify Secondary Modules**

1. **Dependent Modules**:
   - Modules that depend on primary module
   - Modules that share data with primary module
   - Modules that use primary module's functionality

2. **Related Modules**:
   - Modules in same domain or business area
   - Modules that share similar patterns
   - Modules that might be affected by changes

3. **Validation Modules**:
   - Modules that validate primary module data
   - Modules that provide validation rules
   - Modules that enforce business constraints

### 5. Cross-Repository Module Mapping

**Step 5: Map Modules Across Repositories**

1. **Algorithm Repository Modules**:

   ```bash
   # Find Java modules
   find $REPO_PATH/src/main/java/com/increff/irisx/module/ -name "*.java" | grep -E "(Module|Group)" | head -10
   ```

2. **LoadAPI Repository Modules**:

   ```bash
   # Find Python modules
   find $LOADAPI_PATH/loadapi/ -name "*.py" | grep -v __init__ | head -10
   ```

3. **Config Repository Modules**:
   ```bash
   # Find configuration modules
   find $CONFIG_PATH/ -name "*.json" -o -name "*.sql" | head -10
   ```

### 6. Pattern Recognition

**Step 6: Identify Existing Patterns**

1. **Module Registration Patterns**:

   ```bash
   # Check ModuleProvider patterns
   grep -r "ModuleProvider\|ModuleName\|ValidationModuleNames" $REPO_PATH/src/main/java/com/increff/irisx/
   ```

2. **File Registration Patterns**:

   ```bash
   # Check SchemaProvider and FileName patterns
   grep -r "SchemaProvider\|FileName" $REPO_PATH/src/main/java/com/increff/irisx/
   ```

3. **LoadAPI Registration Patterns**:
   ```bash
   # Check LoadAPI provider patterns
   grep -r "loadapi_provider\|__init__.py" $LOADAPI_PATH/loadapi/
   ```

### 7. Registration Analysis

**Step 7: Analyze Registration Requirements**

1. **Module Registration**:
   - **ModuleProvider**: Register new modules in ModuleProvider.java
   - **ModuleName**: Add module name constants
   - **ValidationModuleNames**: Add validation module names

2. **File Registration**:
   - **SchemaProvider**: Register new file classes
   - **FileName**: Add new file name constants
   - **File Headers**: Define file headers and structure

3. **LoadAPI Registration**:
   - **LoadAPI Provider**: Register new LoadAPI classes
   - **Import ID**: Define import ID mappings
   - **Module Init**: Update module **init**.py files

## Output

### 1. Module Identification Report

- **Primary Module**: Identified primary module with justification
- **Secondary Modules**: List of secondary modules with relationships
- **Cross-Repository Mapping**: Module mapping across all repositories
- **Pattern Analysis**: Existing patterns and conventions
- **Registration Requirements**: Complete registration requirements

### 2. Module Impact Assessment

- **Files to Create**: New files required for each module
- **Files to Modify**: Existing files to be modified
- **Dependencies**: Module dependencies and relationships
- **Risks**: Potential risks and mitigation strategies

### 3. Implementation Strategy

- **Module Priority**: Implementation priority for each module
- **Dependency Order**: Order of implementation based on dependencies
- **Testing Strategy**: Testing approach for each module
- **Validation Strategy**: Validation approach for each module

## Success Criteria

- [ ] All module keywords extracted and classified
- [ ] Primary module identified and validated
- [ ] Secondary modules identified with relationships
- [ ] Cross-repository module mapping completed
- [ ] Existing patterns identified and documented
- [ ] Registration requirements analyzed
- [ ] Module impact assessment completed
- [ ] Implementation strategy defined

## Error Handling

- **Ambiguous Keywords**: Handle unclear or ambiguous keywords
- **Missing Modules**: Handle references to non-existent modules
- **Conflicting Modules**: Handle conflicting module choices
- **Complex Dependencies**: Handle complex module dependencies

## Notes

- Module identification should be thorough and accurate
- All identified modules should be validated against existing codebase
- Pattern recognition should be comprehensive
- Registration requirements should be complete
- Implementation strategy should be realistic and achievable
