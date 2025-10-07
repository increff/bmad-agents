# Create Business Story - Requirement Understanding

## Purpose

Create a comprehensive business story to understand the requirement properly before implementation. This prevents random file creation and ensures proper understanding of what needs to be built.

## Task Instructions

### 1. Requirement Analysis

**Step 1: Parse Requirement Document**

1. **Read Requirement**: Read the complete requirement document
2. **Extract Key Information**:
   - **Requirement ID**: Extract requirement identifier
   - **Title**: Extract requirement title
   - **Description**: Parse detailed description
   - **Business Context**: Understand the business purpose
   - **Data Requirements**: Identify what data is needed
   - **Functional Requirements**: Identify what functionality is required

**Step 2: Business Context Understanding**

1. **Business Purpose**: Understand why this requirement exists
2. **User Story**: Create user story format
3. **Business Value**: Identify the business value this provides
4. **Success Criteria**: Define what success looks like

### 2. Data Structure Analysis

**Step 1: Identify Data Elements**

1. **Input Data**: What data will be provided?
2. **Output Data**: What data will be produced?
3. **Data Relationships**: How does the data relate to existing data?
4. **Data Validation**: What validation rules apply?

**Step 2: Map to Existing Patterns**

1. **Search Existing Data**: Look for similar data structures
2. **Identify Module**: Determine which module this belongs to
3. **Check Dependencies**: Verify what already exists
4. **Plan Integration**: How will this integrate with existing systems?

### 3. Technical Analysis

**Step 1: Repository Impact Analysis**

1. **LoadAPI Repository**: Will this need LoadAPI classes?
2. **Algorithm Repository**: Will this need Row/File classes?
3. **Config Repository**: Will this need templates/views?
4. **Cross-Repository Dependencies**: What dependencies exist?

**Step 2: Implementation Planning**

1. **Existing Components**: What already exists that can be reused?
2. **New Components**: What new components need to be created?
3. **Integration Points**: How will new components integrate?
4. **Testing Strategy**: How will this be tested?

### 4. Business Story Creation

**Step 1: Create User Story**

```
As a [user type]
I want [functionality]
So that [business value]

Acceptance Criteria:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]
```

**Step 2: Create Technical Story**

```
Technical Implementation:
- Data Structure: [Description]
- Module: [Module Name]
- Dependencies: [List of dependencies]
- Integration: [How it integrates]

Components to Create/Modify:
- LoadAPI: [Yes/No - Details]
- Row Class: [Yes/No - Details]
- File Class: [Yes/No - Details]
- Config: [Yes/No - Details]
```

**Step 3: Create Implementation Plan**

```
Implementation Steps:
1. [Step 1 - Analysis]
2. [Step 2 - Data Structure Creation]
3. [Step 3 - Business Logic Implementation]
4. [Step 4 - Integration]
5. [Step 5 - Testing]
6. [Step 6 - Validation]
```

### 5. Validation and Verification

**Step 1: Cross-Repository Verification**

1. **Check LoadAPI**: Verify if LoadAPI already exists
2. **Check Algorithm**: Verify if Row/File classes already exist
3. **Check Config**: Verify if templates/views already exist
4. **Check Dependencies**: Verify all dependencies are available

**Step 2: Pattern Compliance**

1. **Naming Conventions**: Verify naming follows existing patterns
2. **Structure Compliance**: Verify structure follows existing patterns
3. **Integration Compliance**: Verify integration follows existing patterns
4. **Validation Compliance**: Verify validation follows existing patterns

## Business Story Template

### User Story

```
As a [business user]
I want to [specific functionality]
So that [business value/outcome]

Acceptance Criteria:
- [Specific criterion 1]
- [Specific criterion 2]
- [Specific criterion 3]
```

### Technical Story

```
Technical Implementation:
- Data Structure: [Description of data structure]
- Module: [Module name and location]
- Dependencies: [List of existing dependencies]
- Integration: [How it integrates with existing systems]

Components Analysis:
- LoadAPI: [Analysis of LoadAPI requirements]
- Row Class: [Analysis of Row class requirements]
- File Class: [Analysis of File class requirements]
- Config: [Analysis of Config requirements]
- Business Logic: [Analysis of business logic requirements]
```

### Implementation Plan

```
Phase 1: Analysis and Planning
- [ ] Analyze requirement thoroughly
- [ ] Identify existing components
- [ ] Plan new components
- [ ] Verify dependencies

Phase 2: Data Structure Implementation
- [ ] Create/modify Row class
- [ ] Create/modify File class
- [ ] Create/modify LoadAPI class
- [ ] Create/modify Config files

Phase 3: Business Logic Implementation
- [ ] Implement business logic
- [ ] Implement validation logic
- [ ] Implement integration logic
- [ ] Implement error handling

Phase 4: Testing and Validation
- [ ] Create unit tests
- [ ] Test integration
- [ ] Validate against requirements
- [ ] Performance testing

Phase 5: Documentation and Deployment
- [ ] Update documentation
- [ ] Create deployment plan
- [ ] Validate deployment
- [ ] Monitor and support
```

## Critical Rules

### 1. NEVER Create Files Without Analysis

- **ALWAYS** analyze the requirement thoroughly first
- **ALWAYS** check for existing similar implementations
- **ALWAYS** understand the business context
- **ALWAYS** plan the implementation before starting

### 2. ALWAYS Follow Existing Patterns

- **ALWAYS** find existing similar implementations
- **ALWAYS** follow existing naming conventions
- **ALWAYS** follow existing structure patterns
- **ALWAYS** follow existing integration patterns

### 3. ALWAYS Verify Dependencies

- **ALWAYS** check cross-repository dependencies
- **ALWAYS** verify FileName constants exist
- **ALWAYS** verify module directories exist
- **ALWAYS** verify registration requirements

### 4. ALWAYS Create Business Stories

- **ALWAYS** understand the business purpose
- **ALWAYS** create user stories
- **ALWAYS** create technical stories
- **ALWAYS** create implementation plans

## Success Criteria

- **Complete Understanding**: Full understanding of requirement and business context
- **Pattern Compliance**: All implementations follow existing patterns
- **Dependency Verification**: All dependencies are verified and available
- **Implementation Plan**: Clear, detailed implementation plan created
- **Business Story**: Comprehensive business story with user and technical stories
- **Validation Plan**: Clear validation and testing strategy

## Notes

- **Business Focus**: This task focuses on understanding the business context and requirements
- **Pattern Recognition**: Emphasizes finding and following existing patterns
- **Dependency Analysis**: Ensures all dependencies are understood and available
- **Implementation Planning**: Creates detailed plans before implementation begins
