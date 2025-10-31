# Migration Workflow - Expert Agent Integration Guide

## Overview

The migration workflow leverages VIRAT's specialized expert agents to intelligently resolve conflicts and pattern mismatches. Each expert agent brings deep domain knowledge for their specific repository type.

## When to Use Expert Agents

### Merge Conflicts During Migration

When git merge conflicts occur, **NEVER force-resolve them**. Instead:

1. **Identify** what type of code is conflicting
2. **Load** the relevant expert agent
3. **Get expert guidance** on resolution
4. **Apply** recommendations intelligently
5. **Document** the expert guidance used

### Pattern Mismatches

When source branch patterns don't match target branch patterns:

1. **Analyze** both source and target patterns
2. **Load** the expert agent for the repository type
3. **Request guidance** on adaptation strategy
4. **Plan adaptations** following target conventions
5. **Document** expert recommendations

### Validation Failures

When migrations fail validation:

1. **Identify** why validation failed
2. **Load expert agent** if business logic related
3. **Get expert analysis** of the failure
4. **Request remediation** recommendations
5. **Apply fixes** following expert guidance

## Expert Agents by Repository Type

### 1. Algorithm Pattern Expert

**Location**: `agents/algorithm-pattern-expert.md`

**Expertise**: Java/Spring Boot algorithm patterns, modules, and architecture

**Use For**:
- Module registration conflicts (ModuleProvider, ValidationModuleNames)
- Class inheritance and hierarchy conflicts
- Args class parameter conflicts
- Validation module registration conflicts
- Import and package organization conflicts
- AbstractUtilModuleGroup inheritance conflicts

**Conflict Resolution Process**:

```
Step 1: Identify Algorithm Conflict
  - Module class hierarchy mismatch
  - Args parameter conflicts
  - Validation module registration issues
  - Import statement conflicts

Step 2: Load Expert Agent
  Load agents/algorithm-pattern-expert.md

Step 3: Provide Context
  - Show conflicting Java code
  - Explain source branch pattern
  - Describe target branch pattern
  - Request adaptation guidance

Step 4: Get Expert Guidance
  - Expert analyzes class hierarchies
  - Expert recommends adaptation approach
  - Expert suggests Args class modifications
  - Expert validates against patterns

Step 5: Apply Recommendations
  - Adapt source code to target patterns
  - Ensure class hierarchy matches target
  - Update Args registration properly
  - Follow target conventions

Step 6: Validate Resolution
  - Compile Java code successfully
  - Verify module registration correct
  - Check no circular dependencies
  - Test validation logic

Step 7: Document
  - Log conflict details
  - Record expert recommendations
  - Explain adaptation rationale
  - Reference applicable BMAD rules (Rule 3, 25, 29)
```

**Key Rules to Validate Against**:
- Rule 3: New Module Creation
- Rule 25: Utility Class Management
- Rule 29: Abstract Class Modification

### 2. LoadAPI Pattern Expert

**Location**: `agents/loadapi-pattern-expert.md`

**Expertise**: Python LoadAPI patterns, validation, and data flow

**Use For**:
- LoadAPI class inheritance conflicts
- Validation rule and error handling conflicts
- Denormalization logic conflicts
- Python import and module organization conflicts
- loadapi_provider.py registration conflicts
- Constants and error message conflicts

**Conflict Resolution Process**:

```
Step 1: Identify LoadAPI Conflict
  - LoadAPI class hierarchy mismatch
  - Validation logic conflicts
  - Denormalization approach differences
  - Python import issues

Step 2: Load Expert Agent
  Load agents/loadapi-pattern-expert.md

Step 3: Provide Context
  - Show conflicting LoadAPI class
  - Explain source branch validation logic
  - Describe target branch validation approach
  - Request adaptation guidance

Step 4: Get Expert Guidance
  - Expert analyzes LoadAPI inheritance
  - Expert recommends validation logic adaptation
  - Expert suggests denormalization changes
  - Expert validates against patterns

Step 5: Apply Recommendations
  - Adapt LoadAPI class inheritance
  - Update validation logic for target patterns
  - Adjust denormalization approach
  - Follow target Python conventions

Step 6: Validate Resolution
  - Python syntax correct
  - All imports resolve
  - Validation logic works in target context
  - No dependency conflicts

Step 7: Document
  - Log conflict details
  - Record expert recommendations
  - Explain validation logic changes
  - Reference applicable BMAD rules (Rules 1, 7, 26)
```

**Key Rules to Validate Against**:
- Rule 1: New Input Integration
- Rule 7: Data Consistency Structure
- Rule 26: ObjectMaps Usage

### 3. Configuration Pattern Expert

**Location**: `agents/config-pattern-expert.md`

**Expertise**: SQL views, templates, and configuration patterns

**Use For**:
- SQL view creation pattern conflicts
- Template header and column structure conflicts
- JSON configuration entry conflicts
- Export query and formatting conflicts
- OPENROWSET and data flow conflicts

**Conflict Resolution Process**:

```
Step 1: Identify Config Conflict
  - SQL view pattern mismatch
  - Template header/column conflicts
  - JSON configuration structure differences
  - OPENROWSET usage differences

Step 2: Load Expert Agent
  Load agents/config-pattern-expert.md

Step 3: Provide Context
  - Show conflicting SQL/template
  - Explain source branch structure
  - Describe target branch structure
  - Request adaptation guidance

Step 4: Get Expert Guidance
  - Expert analyzes SQL view patterns
  - Expert recommends template adaptation
  - Expert suggests JSON config changes
  - Expert validates OPENROWSET usage

Step 5: Apply Recommendations
  - Adapt SQL view creation
  - Update template headers/structure
  - Modify JSON configuration entries
  - Follow target naming conventions

Step 6: Validate Resolution
  - SQL syntax correct
  - Templates match expected format
  - JSON configuration valid
  - No configuration conflicts

Step 7: Document
  - Log conflict details
  - Record expert recommendations
  - Explain template/view changes
  - Reference applicable BMAD rules (Rules 10, 39)
```

**Key Rules to Validate Against**:
- Rule 10: SQL Template Rules
- Rule 39: Header Consistency Validation

### 4. MFP Pattern Expert

**Location**: `agents/mfp-pattern-expert.md`

**Expertise**: MFP services, routes, and forecasting algorithms

**Use For**:
- Service class and route definition conflicts
- Forecasting algorithm conflicts
- Database helper and utility conflicts
- View and snapshot generation conflicts
- Python module organization conflicts

**Conflict Resolution Process**:

```
Step 1: Identify MFP Conflict
  - Service class mismatch
  - Route definition differences
  - Algorithm logic conflicts
  - Python module organization differences

Step 2: Load Expert Agent
  Load agents/mfp-pattern-expert.md

Step 3: Provide Context
  - Show conflicting service/route
  - Explain source branch logic
  - Describe target branch approach
  - Request adaptation guidance

Step 4: Get Expert Guidance
  - Expert analyzes service patterns
  - Expert recommends route adaptation
  - Expert suggests algorithm changes
  - Expert validates against patterns

Step 5: Apply Recommendations
  - Adapt service class implementation
  - Update route definitions
  - Modify forecasting algorithm
  - Follow target Python conventions

Step 6: Validate Resolution
  - Python syntax correct
  - Routes properly defined
  - Database operations work
  - MFP-specific patterns maintained

Step 7: Document
  - Log conflict details
  - Record expert recommendations
  - Explain service/route changes
  - Reference applicable BMAD rules
```

**Key Rules to Validate Against**:
- Environment-specific rules for MFP patterns
- Cross-repository consistency (Rules 11-15)

## Intelligent Conflict Resolution Workflow

### Step 1: Conflict Detection

When a merge conflict occurs:
```
Merge conflict detected in: src/main/java/Module.java
Marker: >>>> HEAD (target branch)
<<<< (source branch)
```

### Step 2: Conflict Analysis

1. **Identify Repository Type**
   - Java code? → Algorithm Pattern Expert
   - Python/LoadAPI? → LoadAPI Pattern Expert
   - SQL/Template? → Config Pattern Expert
   - Python/Service? → MFP Pattern Expert

2. **Identify Conflict Scope**
   - Single file or multiple files?
   - Related to specific component (module/class/view)?
   - Cross-cutting concerns?

3. **Extract Context**
   - Show conflicting code segment
   - Document what source branch intended
   - Document what target branch has
   - Identify why they diverged

### Step 3: Expert Consultation

1. **Load Appropriate Expert Agent**
   ```
   Load {expert-agent}.md for {repository-type}
   ```

2. **Provide Conflict Context**
   - Conflicting code (both sides)
   - Repository type and component
   - Branch information
   - Business logic context

3. **Request Guidance**
   - How should patterns differ?
   - What adaptation is needed?
   - Which conventions to follow?
   - Any breaking changes to watch for?

### Step 4: Expert Recommendations

Expert provides:
- Pattern analysis of both versions
- Recommended adaptation approach
- Specific code changes needed
- References to applicable BMAD rules
- Validation approach

### Step 5: Apply Resolution

1. **Follow Expert Guidance**
   - Implement recommended adaptation
   - Ensure consistency with target patterns
   - Maintain code style and conventions
   - Preserve business logic intent

2. **Adapt Source Code**
   - Modify source implementation for target
   - Update imports/references as needed
   - Maintain consistency with target structure
   - Follow target naming conventions

3. **Validate Changes**
   - Syntax check for language
   - Pattern compliance check
   - Cross-reference checks
   - Build/compilation check

### Step 6: Comprehensive Validation

1. **Pattern Compliance**
   - Does resolution follow target patterns?
   - Are conventions consistent?
   - Any anti-patterns introduced?

2. **Functionality**
   - Does business logic work correctly?
   - Integration with target code?
   - No breaking changes?

3. **Rule Compliance**
   - Validate against applicable BMAD rules
   - Expert-recommended rules
   - Cross-repository consistency rules

### Step 7: Documentation

1. **Log Conflict Details**
   - What was conflicting?
   - Where did conflict occur?
   - Severity of conflict?

2. **Record Expert Guidance**
   - Which expert was consulted?
   - What guidance was provided?
   - Key recommendations applied?

3. **Explain Resolution**
   - Why was this approach chosen?
   - How does it serve target branch?
   - What rules were followed?
   - Any trade-offs made?

## Expert Agent Coordination

When conflicts span multiple repositories:

1. **Coordinate Expert Agents**
   - Algorithm expert for Java changes
   - LoadAPI expert for Python/LoadAPI changes
   - Config expert for SQL/Config changes
   - Ensure consistency across agents

2. **Validate Cross-Repository Consistency**
   - Changes align across all repositories
   - No breaking cross-repository dependencies
   - Version alignment maintained
   - Naming conventions consistent

3. **Document Coordination**
   - How experts coordinated
   - How cross-repository consistency maintained
   - Any trade-offs between repositories

## Success Indicators

A successful expert-guided resolution:

✅ Conflict resolved following expert guidance
✅ Resolution follows target branch patterns
✅ No breaking changes to target functionality
✅ All validations pass
✅ Expert recommendations documented
✅ Applicable BMAD rules followed
✅ Cross-repository consistency maintained (if applicable)

## Tips for Effective Expert Usage

1. **Be Specific**
   - Provide exact conflicting code
   - Explain repository and component type
   - Describe what source branch intended
   - Document what target branch has

2. **Get Full Context**
   - Don't just ask how to resolve
   - Ask about patterns and conventions
   - Ask about implications
   - Ask about validation approach

3. **Document Everything**
   - Save expert recommendations
   - Document why resolution chosen
   - Record any trade-offs
   - Reference applicable rules

4. **Validate Thoroughly**
   - Don't just compile/test
   - Validate pattern compliance
   - Check cross-module dependencies
   - Verify no breaking changes

5. **Learn from Experts**
   - Understand pattern differences
   - Learn adaptation strategies
   - Study expert recommendations
   - Apply learnings to future migrations

## Troubleshooting

### Issue: Conflicting Expert Recommendations

If different experts seem to recommend different approaches:
1. Coordinate between experts
2. Focus on target branch patterns
3. Prioritize target branch consistency
4. Document trade-offs clearly

### Issue: Unclear Conflict Context

If it's hard to provide context to expert:
1. Extract minimal reproducible example
2. Show both conflicting versions side-by-side
3. Explain repository type and component
4. Document divergence history if available

### Issue: Expert Guidance Doesn't Fit

If expert recommendations don't seem to fit:
1. Provide more context
2. Clarify target branch requirements
3. Discuss trade-offs with expert
4. Document decision rationale

## See Also

- [Migration Guide](MIGRATION_GUIDE.md)
- [Migration Task](../tasks/migration-workflow.md)
- [Migration Workflow](../workflows/migration-workflow.yaml)
- [Algorithm Pattern Expert](../agents/algorithm-pattern-expert.md)
- [LoadAPI Pattern Expert](../agents/loadapi-pattern-expert.md)
- [Config Pattern Expert](../agents/config-pattern-expert.md)
- [MFP Pattern Expert](../agents/mfp-pattern-expert.md)

---

**Key Principle**: Never force-resolve merge conflicts. Always get expert guidance for intelligent, pattern-aware resolution that maintains consistency and quality.
