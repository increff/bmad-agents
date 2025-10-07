# Discover Existing Patterns - Repository Analysis

## Purpose

Discover existing patterns and implementations before creating new files. This prevents random file creation and ensures proper integration with existing systems.

## Task Instructions

### 1. LoadAPI Repository Analysis

**Step 1: Module Discovery**

1. **List All Modules**: `ls loadapi/ | grep -v __pycache__`
2. **Find Similar Modules**: Search for modules with similar keywords
3. **Check Module Structure**: Examine module directory structure
4. **Identify Patterns**: Understand how modules are organized

**Step 2: LoadAPI Class Discovery**

1. **Find LoadAPI Classes**: `find loadapi/ -name "*LoadApi.py"`
2. **Examine Class Structure**: Look at existing LoadAPI class patterns
3. **Check Registration**: Verify how LoadAPI classes are registered
4. **Understand Headers**: Examine TSV_HEADER and DB_HEADER patterns

**Step 3: Import ID Analysis**

1. **Find Import IDs**: Extract import_id values from existing LoadAPI classes
2. **Check FileName Constants**: Verify corresponding FileName constants exist
3. **Understand Naming**: Understand import_id naming patterns
4. **Verify Consistency**: Ensure import_id matches FileName constant

### 2. Algorithm Repository Analysis

**Step 1: Row Class Discovery**

1. **Find Row Classes**: `find row/input/ -name "*Row.java"`
2. **Examine Row Structure**: Look at existing Row class patterns
3. **Check Field Types**: Understand field type patterns
4. **Identify Naming**: Understand Row class naming patterns

**Step 2: File Class Discovery**

1. **Find File Classes**: `find file/input/ -name "*File.java"`
2. **Examine File Structure**: Look at existing File class patterns
3. **Check Headers**: Examine getHeaders() method patterns
4. **Understand Mapping**: Understand DataRow to Row mapping patterns

**Step 3: FileName Constants Discovery**

1. **Find FileName Constants**: `grep -r "public static final String" FileName.java`
2. **Examine Naming**: Understand FileName constant naming patterns
3. **Check Usage**: Verify how constants are used
4. **Understand Format**: Understand constant value format

### 3. Config Repository Analysis

**Step 1: Template Discovery**

1. **Find Templates**: `ls template/ | grep {module}`
2. **Examine Template Structure**: Look at existing template patterns
3. **Check Headers**: Verify template header patterns
4. **Understand Naming**: Understand template naming patterns

**Step 2: SQL View Discovery**

1. **Find SQL Views**: `ls view-creation/ | grep {module}`
2. **Examine View Structure**: Look at existing SQL view patterns
3. **Check Naming**: Understand SQL view naming patterns
4. **Understand Purpose**: Understand view purpose and structure

**Step 3: JSON Config Discovery**

1. **Find JSON Configs**: `ls *.json`
2. **Examine Config Structure**: Look at existing JSON config patterns
3. **Check Module References**: Verify module references in configs
4. **Understand Structure**: Understand JSON config structure

### 4. Cross-Repository Pattern Analysis

**Step 1: Module Directory Consistency**

1. **Check LoadAPI Modules**: `ls loadapi/`
2. **Check Algorithm Modules**: `ls row/input/`
3. **Check Config Modules**: `ls template/ | grep -o '^[^_]*' | sort | uniq`
4. **Verify Consistency**: Ensure modules exist in all repositories

**Step 2: Naming Pattern Consistency**

1. **LoadAPI Naming**: Understand LoadAPI class naming patterns
2. **Algorithm Naming**: Understand Row/File class naming patterns
3. **Config Naming**: Understand template/view naming patterns
4. **Cross-Reference**: Verify naming consistency across repositories

**Step 3: Dependency Pattern Analysis**

1. **FileName → LoadAPI**: Verify FileName constant to LoadAPI import_id mapping
2. **Row → LoadAPI**: Verify Row class fields to LoadAPI headers mapping
3. **File → Template**: Verify File class headers to template headers mapping
4. **Module → Config**: Verify module to config file mapping

### 5. Pattern Documentation

**Step 1: Document Discovered Patterns**

1. **LoadAPI Patterns**: Document LoadAPI class patterns
2. **Algorithm Patterns**: Document Row/File class patterns
3. **Config Patterns**: Document template/view patterns
4. **Cross-Repository Patterns**: Document cross-repository patterns

**Step 2: Create Pattern Reference**

1. **Naming Conventions**: Document naming conventions
2. **Structure Patterns**: Document structure patterns
3. **Integration Patterns**: Document integration patterns
4. **Validation Patterns**: Document validation patterns

**Step 3: Create Implementation Guidelines**

1. **File Creation Rules**: Document file creation rules
2. **Registration Rules**: Document registration rules
3. **Validation Rules**: Document validation rules
4. **Integration Rules**: Document integration rules

## Discovery Commands

### LoadAPI Discovery

```bash
# Find all modules
ls loadapi/ | grep -v __pycache__

# Find LoadAPI classes
find loadapi/ -name "*LoadApi.py"

# Find specific module LoadAPIs
find loadapi/ -name "*{module}*LoadApi.py"

# Check LoadAPI registration
grep -r "import.*LoadApi" loadapi_provider.py
```

### Algorithm Discovery

```bash
# Find Row classes
find row/input/ -name "*Row.java"

# Find File classes
find file/input/ -name "*File.java"

# Find FileName constants
grep -r "public static final String" FileName.java

# Find specific module files
find . -path "*/input/{module}/*" -name "*.java"
```

### Config Discovery

```bash
# Find templates
ls template/ | grep {module}

# Find SQL views
ls view-creation/ | grep {module}

# Find JSON configurations
grep -r "{module}" *.json
```

### Cross-Repository Discovery

```bash
# Check module consistency
echo "LoadAPI modules:" && ls loadapi/ | grep -v __pycache__
echo "Algorithm modules:" && ls row/input/
echo "Config modules:" && ls template/ | grep -o '^[^_]*' | sort | uniq

# Check naming consistency
find loadapi/ -name "*LoadApi.py" | sed 's/.*\///' | sed 's/LoadApi\.py//'
find row/input/ -name "*Row.java" | sed 's/.*\///' | sed 's/Row\.java//'
```

## Pattern Analysis Checklist

### LoadAPI Patterns

- [ ] Module directory structure
- [ ] LoadAPI class structure
- [ ] Import ID patterns
- [ ] Header patterns (TSV_HEADER, DB_HEADER)
- [ ] Registration patterns
- [ ] Validation patterns

### Algorithm Patterns

- [ ] Row class structure
- [ ] File class structure
- [ ] FileName constant patterns
- [ ] Package structure
- [ ] Field type patterns
- [ ] Header method patterns

### Config Patterns

- [ ] Template file patterns
- [ ] SQL view patterns
- [ ] JSON config patterns
- [ ] Naming conventions
- [ ] Header consistency
- [ ] Module references

### Cross-Repository Patterns

- [ ] Module directory consistency
- [ ] Naming pattern consistency
- [ ] Dependency pattern consistency
- [ ] Integration pattern consistency
- [ ] Validation pattern consistency

## Critical Rules

### 1. ALWAYS Discover Before Creating

- **ALWAYS** search for existing similar implementations
- **ALWAYS** understand existing patterns
- **ALWAYS** verify what already exists
- **ALWAYS** follow existing patterns exactly

### 2. ALWAYS Verify Dependencies

- **ALWAYS** check cross-repository dependencies
- **ALWAYS** verify FileName constants exist
- **ALWAYS** verify module directories exist
- **ALWAYS** verify registration requirements

### 3. ALWAYS Document Patterns

- **ALWAYS** document discovered patterns
- **ALWAYS** create pattern references
- **ALWAYS** create implementation guidelines
- **ALWAYS** maintain pattern consistency

## Success Criteria

- **Complete Discovery**: All existing patterns discovered and documented
- **Pattern Understanding**: Full understanding of existing patterns
- **Dependency Verification**: All dependencies verified and documented
- **Implementation Guidelines**: Clear guidelines for following patterns
- **Consistency Check**: All patterns verified for consistency
- **Reference Creation**: Comprehensive pattern reference created

## Notes

- **Discovery Focus**: This task focuses on discovering existing patterns before implementation
- **Pattern Recognition**: Emphasizes understanding and following existing patterns
- **Dependency Analysis**: Ensures all dependencies are discovered and understood
- **Implementation Guidance**: Provides clear guidance for following existing patterns
