<!-- Powered by BMAD™ Core -->

# Requirement Analysis Task

## Purpose

Parse and analyze requirement documents to understand the scope, impact, and implementation approach for requirements across three interconnected repositories.

## Task Instructions

### 1. Requirement Document Analysis

**Prerequisites:**

- Requirement document must be provided
- All three repositories must be accessible

**Step 1: Read and Parse Requirement Document**

1. **Read Requirement Document**:

   ```bash
   # Read the requirement document
   cat $REQUIREMENT_FILE
   ```

2. **Parse Key Components**:
   - **Requirement ID**: Extract unique identifier
   - **Title**: Extract requirement title
   - **Description**: Parse detailed description
   - **Technical Requirements**: Identify technical specifications
   - **Business Rules**: Extract business logic requirements
   - **Acceptance Criteria**: Identify success criteria

3. **Identify Change Type**:
   - **New Column Addition**: Adding new fields to existing data structures
   - **New Input File**: Creating new input data sources
   - **New Output File**: Creating new output data structures
   - **Formula Change**: Modifying calculation logic
   - **New Module**: Creating entirely new modules
   - **Module Modification**: Enhancing existing modules
   - **Configuration Change**: Updating configuration files
   - **Integration Change**: Modifying cross-repository integrations

### 2. Impact Analysis

**Step 2: Repository Impact Assessment**

1. **Algorithm Repository Impact**:
   - **Data Structures**: Identify affected Row classes, File classes
   - **Business Logic**: Identify affected modules and calculations
   - **Validation**: Identify validation requirements
   - **Registration**: Identify registration requirements

2. **LoadAPI Repository Impact**:
   - **LoadAPI Classes**: Identify affected or new LoadAPI classes
   - **Data Transformation**: Identify denormalization requirements
   - **Validation**: Identify LoadAPI validation requirements
   - **Registration**: Identify LoadAPI registration requirements

3. **Config Repository Impact**:
   - **Configuration Files**: Identify affected configuration files
   - **SQL Views**: Identify affected SQL views
   - **Templates**: Identify affected TSV templates
   - **Export Definitions**: Identify affected export definitions

### 3. Module Identification

**Step 3: Target Module Identification**

1. **Primary Module Identification**:

   ```bash
   # Find relevant modules based on requirement keywords
   grep -r "distribution\|iss\|otb\|eoss" $REPO_PATH/src/main/java/com/increff/irisx/module/ | head -10
   ```

2. **Secondary Module Identification**:
   - **Dependent Modules**: Identify modules that depend on primary module
   - **Related Modules**: Identify modules that share data or logic
   - **Validation Modules**: Identify validation modules that need updates

3. **Cross-Repository Module Mapping**:
   - **Algorithm Modules**: Map to Java module structure
   - **LoadAPI Modules**: Map to Python module structure
   - **Config Modules**: Map to configuration structure

### 4. Dependency Analysis

**Step 4: Dependency Mapping**

1. **Internal Dependencies**:

   ```bash
   # Check for cross-module dependencies
   grep -r "import.*module" $REPO_PATH/src/main/java/com/increff/irisx/module/
   ```

2. **External Dependencies**:
   - **Shared Classes**: Identify shared utility classes
   - **Constants**: Identify shared constants
   - **Validation**: Identify shared validation logic

3. **Cross-Repository Dependencies**:
   - **Data Flow**: Map data flow between repositories
   - **Registration Dependencies**: Identify registration dependencies
   - **Configuration Dependencies**: Identify configuration dependencies

### 5. Implementation Planning

**Step 5: Create Implementation Plan**

1. **Implementation Strategy**:
   - **Approach**: Determine implementation approach
   - **Sequence**: Define implementation sequence
   - **Dependencies**: Identify implementation dependencies
   - **Risks**: Identify potential risks and mitigation strategies

2. **Resource Requirements**:
   - **Files to Create**: List new files to be created
   - **Files to Modify**: List existing files to be modified
   - **Configuration Updates**: List configuration changes
   - **Testing Requirements**: List testing requirements

3. **Success Criteria**:
   - **Functional Criteria**: Define functional success criteria
   - **Technical Criteria**: Define technical success criteria
   - **Quality Criteria**: Define quality success criteria

## Output

### 1. Requirement Analysis Report

- **Requirement Summary**: High-level requirement summary
- **Impact Assessment**: Detailed impact analysis
- **Module Mapping**: Target module identification
- **Dependency Map**: Dependency analysis
- **Implementation Plan**: Detailed implementation strategy

### 2. Implementation Checklist

- **Files to Create**: Complete list of new files
- **Files to Modify**: Complete list of modified files
- **Configuration Changes**: Complete list of configuration updates
- **Testing Requirements**: Complete list of testing needs

### 3. Risk Assessment

- **Technical Risks**: Identified technical risks
- **Implementation Risks**: Identified implementation risks
- **Mitigation Strategies**: Risk mitigation approaches

## Success Criteria

- [ ] Requirement document fully parsed and understood
- [ ] All three repositories impact assessed
- [ ] Target modules identified and validated
- [ ] Dependencies mapped and analyzed
- [ ] Implementation plan created with clear strategy
- [ ] Risk assessment completed with mitigation strategies
- [ ] Implementation checklist created with all required changes
- [ ] Success criteria defined and measurable

## Error Handling

- **Invalid Requirement**: Handle malformed or incomplete requirements
- **Missing Dependencies**: Handle missing or inaccessible repositories
- **Ambiguous Requirements**: Handle unclear or conflicting requirements
- **Complex Dependencies**: Handle complex dependency chains

## Notes

- This task focuses on analysis and planning, not implementation
- All analysis should be thorough and comprehensive
- Dependencies should be mapped completely to avoid implementation issues
- Implementation plan should be detailed and actionable
- Risk assessment should be realistic and include mitigation strategies
