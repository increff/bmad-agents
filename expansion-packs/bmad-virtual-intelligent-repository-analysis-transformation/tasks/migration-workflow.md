<!-- Powered by BMAD™ Core -->

# Migration Workflow - Cross-Branch Commit Implementation

## Purpose

Execute a systematic code migration from one branch to another by analyzing all commits/changes in the source branch and intelligently implementing them in the target branch according to that branch's patterns and requirements. This is ideal for:

- Backporting features between environments (e.g., prod → reliance)
- Cherry-picking relevant changes across branches
- Maintaining consistency across multiple branch variants
- Migrating features with branch-specific customizations

## Task Instructions

### Phase 1: Setup and Validation

**Step 1: Load Configuration**

1. Parse source branch (branch with new commits to migrate)
2. Parse target branch (branch where changes should be implemented)
3. Parse source repository (which repository contains the changes)
4. Verify both branches exist in the specified repository
5. Validate current working directory and repository state

**Step 2: Analyze Branch Differences**

1. Fetch latest commits from both branches
2. Generate commit log comparing source and target branches
3. Identify all commits in source branch not yet in target branch
4. List all modified files across those commits
5. Categorize commits by type:
   - Feature additions (new functionality)
   - Bug fixes (corrections to existing code)
   - Configuration updates (settings, templates, SQL views)
   - Dependency updates (version changes)
   - Documentation updates (non-code changes)
6. Create comprehensive migration report with:
   - Total commits to process
   - Number of modified files
   - File categories and counts
   - Risk assessment per commit

### Phase 2: Requirement Analysis for Migration

**Step 3: Extract Migration Requirements**

1. For each commit, extract the intended change and business logic
2. Analyze what the commit is trying to accomplish
3. Identify business rules and implementation patterns used
4. Document dependencies between commits
5. Create migration plan document with:
   - Commit-by-commit breakdown
   - Business logic extracted from each change
   - Pattern analysis
   - Risk assessment

**Step 4: Analyze Target Branch Patterns**

1. Crawl target branch to understand current patterns and structure
2. Identify:
   - Module organization
   - Naming conventions
   - Code patterns and abstractions
   - Configuration structure
   - Dependencies and requirements
3. Document differences between source and target branch patterns
4. Create adaptation mapping (how source changes map to target patterns)

### Phase 3: Intelligent Implementation Planning

**Step 5: Create Migration Strategy**

For each commit in migration scope:

1. **Analyze Commit Impact**:
   - What business logic is being implemented?
   - Which files need modification?
   - What patterns does the change follow?
   - Are there dependencies on other changes?

2. **Map to Target Branch**:
   - How should this change be implemented in target branch?
   - What files need modification in target patterns?
   - Should change be split or combined with others?
   - Are there conflicts with target branch code?

3. **Identify Branch-Specific Considerations**:
   - Does target branch have different folder structures?
   - Are module names or file names different?
   - Are there environment-specific requirements?
   - Does configuration differ between branches?

4. **Create Implementation Plan**:
   - Step-by-step instructions for implementing business logic
   - Mapping of source files to target branch locations
   - Pattern-compliant implementation approach
   - Testing strategy for each change

**Step 6: Validate Migration Plan**

1. Review all 44 core implementation rules for applicability
2. Ensure no breaking changes to target branch
3. Verify all dependencies are understood
4. Cross-check with target branch patterns
5. Document any manual decisions or deviations

### Phase 4: Guided Implementation

**Step 7: Feature Branch Creation**

1. Create feature branch in target repository from target branch
2. Branch naming: `migration/{source-branch}-to-{target-branch}-{commit-count}-changes`
3. Document feature branch purpose and migration scope

**Step 8: Commit-by-Commit Implementation**

For each commit to be migrated:

1. **Understand the Change**:
   - Read commit message and understand business logic
   - Review changed files and modifications
   - Identify patterns used in source change
   - Understand why this change was made

2. **Adapt to Target Patterns**:
   - Map source patterns to target branch patterns
   - Identify corresponding files in target branch
   - Plan how to implement same business logic in target patterns
   - Prepare manual adaptations if needed

3. **Implement in Target**:
   - Make code changes in target branch following target patterns
   - Update all related files (configs, templates, tests)
   - Register changes in target structure
   - Maintain consistency with target branch conventions

4. **Validate Implementation**:
   - Verify business logic correctly implemented
   - Check all pattern compliance in target branch
   - Validate no breaking changes to existing code
   - Test implementation in target context

5. **Commit Change**:
   - Create atomic commit with clear message
   - Reference original commit from source branch
   - Document any pattern adaptations
   - Commit message: `[MIGRATION] Implement {business logic} from {source-branch} (original: {original-commit})`

**Step 9: Cross-Repository Sync (if applicable)**

If migration affects multiple repositories:

1. Identify cross-repository dependencies
2. Ensure all repositories receive coordinated changes
3. Maintain version alignment
4. Update registration across all repositories

### Phase 5: Validation and Testing

**Step 10: Comprehensive Validation**

1. **Pattern Compliance**:
   - Verify all changes follow target branch patterns
   - Check naming conventions match target
   - Validate structure aligns with target organization
   - Ensure no anti-patterns introduced

2. **Functional Testing**:
   - Test each implemented feature in target context
   - Verify business logic works correctly
   - Test interactions with existing code
   - Run all relevant test suites

3. **Integration Testing**:
   - Test integration with target branch codebase
   - Verify no breaking changes
   - Test cross-module dependencies
   - Validate data consistency

4. **Migration Integrity**:
   - Verify all commits properly implemented
   - Check completeness of migration
   - Validate no changes skipped or lost
   - Confirm all files properly updated

**Step 11: Documentation**

1. Create migration summary document including:
   - Source and target branches
   - Number of commits migrated
   - Business logic implemented
   - Pattern adaptations made
   - Testing results
   - Commit references

2. Document any manual decisions or deviations from patterns

3. Update target branch documentation with:
   - Changes introduced
   - New features or bug fixes
   - Breaking changes (if any)
   - Migration notes

### Phase 6: Finalization

**Step 12: Merge and Cleanup**

1. Review all commits in feature branch
2. Verify quality checks pass
3. Merge feature branch to target branch with migration commit message
4. Delete feature branch
5. Push changes to origin

**Step 13: Validation and Sign-off**

1. Verify changes successfully merged
2. Test merged code in target branch
3. Confirm no regression issues
4. Document successful migration

## Migration Strategy for Different Repository Types

### Algorithm Repository (Java)

- Identify Module classes and Registration patterns
- Adapt class hierarchies and inheritance
- Update ModuleProvider and SchemaProvider registrations
- Handle import statements and package organization
- Adapt validation module registrations

### LoadAPI Repository (Python)

- Identify LoadAPI class patterns
- Adapt module structure and imports
- Update loadapi_provider.py registrations
- Handle Python import conventions
- Adapt validation and normalization logic

### Configuration Repository (SQL/Templates)

- Adapt SQL view creation patterns
- Update template naming and structure
- Migrate JSON configuration entries
- Handle environment-specific configurations
- Update export query patterns

## Key Features

- **Commit-by-Commit Analysis**: Systematically reviews each commit
- **Pattern Intelligence**: Understands source patterns and adapts to target
- **Branch-Aware Implementation**: Respects branch-specific structure and conventions
- **Comprehensive Validation**: Multi-layer validation ensures quality
- **Atomic Changes**: Each migration step is a clean, testable commit
- **Full Documentation**: Complete traceability of migration process

## Expert Agent Integration for Conflict Resolution

When merge conflicts or pattern mismatches arise during migration, leverage VIRAT's specialized expert agents for intelligent, context-aware resolution:

### Algorithm Pattern Expert for Java Conflicts

**Load**: `agents/algorithm-pattern-expert.md`

**Use for:**
- Module registration conflicts (ModuleProvider, ValidationModuleNames)
- Class inheritance and hierarchy conflicts
- Args parameter and validation conflicts
- Import and package organization conflicts
- Validation module registration conflicts

**How to Leverage:**
```
When Java/Algorithm merge conflicts detected:
1. Load algorithm-pattern-expert.md
2. Provide conflicting class/module context
3. Request guidance on class hierarchy adaptation
4. Get expert knowledge on AbstractUtilModuleGroup patterns
5. Apply recommendations following target branch patterns
6. Validate against Rule 3 (New Module Creation)
7. Document expert guidance used
```

### LoadAPI Pattern Expert for Python Conflicts

**Load**: `agents/loadapi-pattern-expert.md`

**Use for:**
- LoadAPI class inheritance conflicts
- Validation rule and error handling conflicts
- Denormalization logic conflicts
- Python import and module organization conflicts
- loadapi_provider.py registration conflicts
- Constants and error message conflicts

**How to Leverage:**
```
When Python/LoadAPI merge conflicts detected:
1. Load loadapi-pattern-expert.md
2. Provide conflicting LoadAPI class context
3. Request guidance on validation logic adaptation
4. Get expert knowledge on denormalization patterns
5. Apply recommendations following target patterns
6. Validate against Rules 1, 7, and 26 (LoadAPI patterns)
7. Document expert guidance used
```

### Configuration Pattern Expert for SQL/Template Conflicts

**Load**: `agents/config-pattern-expert.md`

**Use for:**
- SQL view creation pattern conflicts
- Template header and column structure conflicts
- JSON configuration entry conflicts
- Export query and formatting conflicts
- OPENROWSET and data flow conflicts

**How to Leverage:**
```
When Config/SQL merge conflicts detected:
1. Load config-pattern-expert.md
2. Provide conflicting SQL view/template context
3. Request guidance on view structure adaptation
4. Get expert knowledge on OPENROWSET patterns
5. Apply recommendations following target patterns
6. Validate against Rules 10 and 39 (SQL/template patterns)
7. Document expert guidance used
```

### MFP Pattern Expert for Service Conflicts

**Load**: `agents/mfp-pattern-expert.md`

**Use for:**
- Service class and route definition conflicts
- Forecasting algorithm conflicts
- Database helper and utility conflicts
- View and snapshot generation conflicts
- Python module organization conflicts

**How to Leverage:**
```
When MFP/Python merge conflicts detected:
1. Load mfp-pattern-expert.md
2. Provide conflicting service/route context
3. Request guidance on forecasting algorithm adaptation
4. Get expert knowledge on MFP-specific patterns
5. Apply recommendations following target patterns
6. Validate compatibility with target environments
7. Document expert guidance used
```

### Intelligent Conflict Resolution Workflow

**Step 1: Identify Conflict Type**
- Determine which repository type (Java/Python/SQL/Config)
- Identify the component type (module/loadapi/view/service)
- Extract conflicting code segments from source and target
- Analyze which expert agent can provide best guidance

**Step 2: Load Relevant Expert Agent**
- Load appropriate pattern expert based on repository type
- Provide conflict context with both source and target code
- Include branch information and environment context
- Request pattern analysis and resolution guidance

**Step 3: Analyze Expert Guidance**
- Review expert's pattern recommendations
- Understand why source patterns may not fit target
- Identify necessary adaptations for target branch
- Cross-reference with applicable BMAD rules (Rules 1-44)

**Step 4: Apply Expert Recommendations**
- Follow expert guidance for conflict resolution
- Adapt source implementation to target patterns
- Ensure consistency with discovered target patterns
- Validate against Rule 24 (Complete Development Flow)

**Step 5: Validate Resolution**
- Verify conflict resolution follows target patterns
- Ensure no breaking changes to target branch functionality
- Run targeted tests for conflicting component
- Check cross-module dependencies
- Validate against all applicable rules

**Step 6: Document Resolution**
- Log conflict details (type, location, severity)
- Record expert agent guidance used
- Explain why this resolution was chosen
- Document applicable rules or patterns
- Create conflict resolution record in migration report

## Error Handling

### Merge Conflicts During Migration

When git merge conflicts occur:

1. **Do NOT force-resolve conflicts**
2. **Identify conflict type** and load relevant expert agent
3. **Use expert guidance** to resolve intelligently
4. **Document resolution** with expert justification
5. **Validate in target context** with appropriate tests
6. **Record in migration documentation**

### Pattern Conflicts (Source patterns don't match target)

When implementation patterns differ between branches:

1. **Analyze both patterns** using appropriate expert agent
2. **Request expert guidance** on adaptation strategy
3. **Plan adaptations** following target conventions
4. **Implement adaptations** with expert oversight
5. **Validate adaptations** against applicable rules
6. **Document adaptations** with expert recommendations

### Validation Failures

When validations fail during migration:

1. **Identify failure type** (pattern, functional, integration)
2. **Load expert agent** if pattern or business logic related
3. **Get expert analysis** of why validation failed
4. **Request remediation** recommendations
5. **Apply fixes** following expert guidance
6. **Re-validate** with full test suite

## Expert Agent Cross-Reference

| Conflict Type | Expert Agent | Rules to Validate |
|---|---|---|
| Module/Class hierarchy | algorithm-pattern-expert | Rules 3, 25, 29 |
| LoadAPI patterns | loadapi-pattern-expert | Rules 1, 6, 7, 26 |
| SQL/Template structure | config-pattern-expert | Rules 10, 39 |
| Service/Route definition | mfp-pattern-expert | Repo-specific rules |
| Cross-repository | All experts (coordinate) | Rules 11-15, 34 |

## Success Criteria

- ✅ All identified commits successfully migrated to target branch
- ✅ Business logic correctly implemented in target patterns
- ✅ All validations passing in target branch
- ✅ No breaking changes to existing target branch functionality
- ✅ Complete documentation of migration process
- ✅ Target branch patterns fully respected
- ✅ Cross-repository consistency maintained (if applicable)
- ✅ All tests passing in target branch context
- ✅ **Expert agent guidance documented for all conflicts**
