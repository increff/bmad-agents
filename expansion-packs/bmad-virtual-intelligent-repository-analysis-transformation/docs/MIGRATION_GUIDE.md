# BMAD Migration Workflow Guide

## Overview

The BMAD Migration Workflow provides intelligent cross-branch commit migration with automatic pattern adaptation. It analyzes all new commits in a source branch and systematically implements them in a target branch while respecting the target branch's patterns, conventions, and structure.

## Use Cases

### 1. **Backporting Features Between Environments**
Migrate features from production to other environments (e.g., prod → reliance, prod → phoenix) with environment-specific customizations.

```bash
*implement-migration irisx-algo caas-release master-ril
*implement-migration ms-loadapis-ril-final release_optimised caas-ril-uploads
*implement-migration irisx-config caas-staging_fix master-ril
```

### 2. **Cherry-Picking Relevant Changes**
Select and migrate specific important changes from one branch variant to another without cherry-picking individual commits.

### 3. **Maintaining Branch Consistency**
Keep multiple branch variants (different environments) in sync with critical bug fixes and feature improvements.

### 4. **Feature Branch Synchronization**
Synchronize feature work from a feature branch back to multiple target branches after stabilization.

## Command Syntax

```bash
*implement-migration {repository} {source-branch} {target-branch}
```

### Parameters

| Parameter | Description | Examples |
|-----------|-------------|----------|
| `repository` | Target repository name | `irisx-algo`, `ms-loadapis-ril-final`, `ms-mfp`, `irisx-config` |
| `source-branch` | Branch containing commits to migrate | `caas-release`, `master-ril`, `feature/XYZ` |
| `target-branch` | Branch where commits should be implemented | `master-ril`, `caas-ril-uploads`, `caas-staging_fix` |

## Workflow Phases

### Phase 1: Migration Setup

**Validates that both branches exist and identifies all commits to migrate.**

- ✅ Verify repository is accessible
- ✅ Verify source and target branches exist
- ✅ Fetch latest branch data
- ✅ Identify all commits in source not in target
- ✅ Categorize commits by type
- 📊 Generate `migration-analysis.md`

**Output**: `migration-analysis.md` with detailed commit breakdown

### Phase 2: Migration Analysis

**Analyzes patterns in both branches and creates adaptation strategy.**

- 🔍 Analyze source branch patterns and structure
- 🔍 Analyze target branch patterns and structure
- 📋 Extract business logic from each commit
- 🗺️ Map source patterns to target patterns
- 🛠️ Identify necessary adaptations
- ✅ Validate against all 44 implementation rules

**Outputs**:
- `pattern-adaptation-mapping.md` - How to map patterns
- `adaptation-strategy.md` - Branch-specific customizations
- `rules-validation-report.md` - Rule compliance analysis

### Phase 3: Migration Planning

**Creates detailed implementation plan for migration.**

- 📝 Create step-by-step implementation plan for each commit
- 🔗 Identify commit dependencies and execution order
- 🧪 Plan testing strategy
- ⚠️ Identify and document risks

**Outputs**:
- `migration-implementation-plan.md` - Step-by-step plan
- `commit-dependency-graph.md` - Commit ordering
- `testing-strategy.md` - Test plan
- `risk-assessment.md` - Risk analysis

### Phase 4: Feature Branch Creation

**Creates feature branch for migration work.**

- 🌿 Create feature branch from target branch
- 📌 Branch naming: `migration/{source-branch}-to-{target-branch}-{count}-changes`

### Phase 5: Migration Execution

**Implements each commit in target branch following target patterns.**

For each commit to migrate:
1. **Understand** - Read commit message and analyze changes
2. **Adapt** - Plan implementation in target patterns
3. **Implement** - Make code changes following target conventions
4. **Validate** - Verify business logic correctly implemented
5. **Commit** - Create atomic commit with reference to source

**Output**: Feature branch with all migrated commits

### Phase 6: Validation and Testing

**Comprehensive validation of migrated changes.**

- ✅ Pattern compliance check
- ✅ Functional testing in target context
- ✅ Integration testing with target branch
- ✅ Migration integrity verification
- ✅ Comprehensive quality validation

**Outputs**:
- `pattern-compliance-report.md`
- `functional-test-results.md`
- `integration-test-results.md`
- `migration-integrity-report.md`
- `quality-validation-report.md`

### Phase 7: Migration Documentation

**Creates comprehensive migration documentation.**

- 📋 Migration summary with commits and adaptations
- 📝 Document manual decisions and deviations
- 📖 Update branch documentation
- 📊 Create final comprehensive report

**Output**: `MIGRATION_REPORT.md` with complete migration details

### Phase 8: Migration Finalization

**Merges migration feature branch and cleans up.**

- 👀 Review all commits in feature branch
- 🔀 Merge feature branch to target branch
- 🗑️ Delete feature branch
- 📤 Push changes to origin

## Migration Strategies by Repository Type

### Algorithm Repository (Java - irisx-algo)

**What gets migrated:**
- Module classes and GroupModules
- Algorithm implementations
- Validation modules
- Constants and configuration

**Key adaptations:**
- Module registration (ModuleProvider, ValidationModuleNames)
- Class inheritance and hierarchy
- Import statements and package organization
- Args classes and their registration

**Validation:**
- Maven compilation succeeds
- All modules properly registered
- No circular dependencies
- Validation logic intact

### LoadAPI Repository (Python - ms-loadapis-ril-final)

**What gets migrated:**
- LoadAPI classes
- Validation and normalization logic
- Module structure
- Constants and error handling

**Key adaptations:**
- LoadAPI class inheritance
- Python module imports
- loadapi_provider.py registration
- Validation rules and error messages

**Validation:**
- Python syntax correct
- All imports resolve
- Validation logic works in target context
- No dependency conflicts

### Configuration Repository (SQL/Templates - irisx-config)

**What gets migrated:**
- SQL view creation scripts
- TSV templates
- JSON configuration entries
- Export query definitions

**Key adaptations:**
- OPENROWSET pattern usage
- SQL naming conventions
- Template column headers
- Configuration structure

**Validation:**
- SQL syntax correct
- Templates match expected format
- JSON configuration valid
- No configuration conflicts

### MFP Repository (Python - ms-mfp)

**What gets migrated:**
- Service classes and routes
- Forecasting algorithms
- Helper utilities
- View and snapshot logic

**Key adaptations:**
- Python module organization
- Flask route definitions
- Database helper patterns
- Computation logic

**Validation:**
- Python syntax correct
- Routes properly defined
- Database operations work
- MFP-specific patterns maintained

## Example: Backporting from Production to Reliance

```bash
# Step 1: Migrate Algorithm Repository
*implement-migration irisx-algo caas-release master-ril

# Step 2: Migrate LoadAPI Repository
*implement-migration ms-loadapis-ril-final release_optimised caas-ril-uploads

# Step 3: Migrate Configuration Repository
*implement-migration irisx-config caas-staging_fix master-ril
```

### Expected Outcome

✅ All new features from production backported to reliance
✅ All patterns adapted to reliance conventions
✅ All validations pass in reliance context
✅ Complete documentation of migration
✅ No breaking changes to reliance functionality

## Key Features

### 1. **Intelligent Pattern Adaptation**
The migration workflow understands patterns in both source and target branches and intelligently adapts implementations to match target conventions.

### 2. **Commit-by-Commit Analysis**
Each commit is systematically analyzed and implemented, ensuring no changes are lost or skipped.

### 3. **Comprehensive Validation**
Multi-layer validation ensures:
- Pattern compliance in target branch
- Business logic correctly implemented
- No breaking changes to existing code
- Full integration with target branch

### 4. **Complete Traceability**
All migration steps are documented with clear references to source commits and adaptations made.

### 5. **Atomic Changes**
Each migrated change is a clean, testable commit that can be individually reviewed or reverted.

### 6. **Rule-Based Validation**
Migration is validated against all 44 BMAD implementation rules to ensure quality.

## Success Criteria

A successful migration will:

✅ Successfully migrate all identified commits from source to target
✅ Implement business logic correctly in target branch patterns
✅ Pass all validations in target branch context
✅ Introduce no breaking changes to existing target functionality
✅ Maintain complete documentation of migration process
✅ Fully respect target branch patterns and conventions
✅ Maintain cross-repository consistency (if applicable)
✅ Pass all tests in target branch post-merge
✅ Successfully merge feature branch and clean up

## Error Handling

### Using Expert Agents for Conflict Resolution

When merge conflicts or pattern mismatches arise, leverage VIRAT's specialized expert agents for intelligent resolution:

#### Algorithm Pattern Expert (Java Conflicts)
**Load**: `agents/algorithm-pattern-expert.md`

**Use when encountering:**
- Module registration or class hierarchy conflicts
- Args parameter adaptation conflicts
- Validation module conflicts
- Import and package organization issues

**Process:**
1. Identify conflict involves Java/Algorithm code
2. Load algorithm-pattern-expert.md
3. Provide conflicting module/class context
4. Request guidance on class hierarchy adaptation
5. Apply expert recommendations
6. Validate against BMAD Rule 3
7. Document expert guidance

#### LoadAPI Pattern Expert (Python Conflicts)
**Load**: `agents/loadapi-pattern-expert.md`

**Use when encountering:**
- LoadAPI class inheritance conflicts
- Validation or denormalization logic conflicts
- Python import organization issues
- loadapi_provider.py registration conflicts

**Process:**
1. Identify conflict involves Python/LoadAPI code
2. Load loadapi-pattern-expert.md
3. Provide conflicting LoadAPI class context
4. Request guidance on validation logic adaptation
5. Apply expert recommendations
6. Validate against BMAD Rules 1, 7, 26
7. Document expert guidance

#### Configuration Pattern Expert (SQL/Template Conflicts)
**Load**: `agents/config-pattern-expert.md`

**Use when encountering:**
- SQL view creation pattern conflicts
- Template header or structure conflicts
- JSON configuration conflicts
- OPENROWSET or export query conflicts

**Process:**
1. Identify conflict involves SQL/Config code
2. Load config-pattern-expert.md
3. Provide conflicting SQL/template context
4. Request guidance on view/template adaptation
5. Apply expert recommendations
6. Validate against BMAD Rules 10, 39
7. Document expert guidance

#### MFP Pattern Expert (Service/Route Conflicts)
**Load**: `agents/mfp-pattern-expert.md`

**Use when encountering:**
- Service class or route definition conflicts
- Forecasting algorithm conflicts
- Database helper conflicts
- View or snapshot generation conflicts

**Process:**
1. Identify conflict involves MFP/Python code
2. Load mfp-pattern-expert.md
3. Provide conflicting service/route context
4. Request guidance on algorithm adaptation
5. Apply expert recommendations
6. Validate compatibility with target environment
7. Document expert guidance

### Commit Conflicts

When commits conflict with target branch code:
1. **Do NOT force-resolve** - analyze intelligently
2. **Identify conflict type** (Java/Python/SQL/Config)
3. **Load relevant expert agent** for context
4. **Use expert guidance** to resolve following target patterns
5. **Validate resolution** against applicable rules
6. **Document** with expert justification

### Pattern Mismatches

When source patterns don't match target patterns:
1. **Analyze both patterns** using appropriate expert agent
2. **Request expert guidance** on adaptation strategy
3. **Plan adaptations** following target conventions
4. **Implement adaptations** with expert oversight
5. **Validate adaptations** against all applicable rules
6. **Document** with expert recommendations

### Missing Dependencies

When migrations identify missing dependencies:
1. Identifies the missing dependency
2. Determines if it needs to be implemented
3. Implements if necessary or documents if not applicable
4. Validates dependency chain

### Validation Failures

When validations fail:
1. Stops migration process
2. Provides detailed failure description
3. Requests manual review
4. Provides guidance for resolution

## Best Practices

### 1. **Always Analyze First**
Run migration-analyze commands to understand the migration scope before starting.

### 2. **Keep Commits Atomic**
Ensure each source commit is a complete, working change so adaptations are clean.

### 3. **Document Decisions**
If manual adaptations are needed, document why and how the decision was made.

### 4. **Test Thoroughly**
Don't skip testing phases - they ensure migrated code works in target context.

### 5. **Review Before Merge**
Always review the feature branch commits before merging to ensure quality.

### 6. **Keep Branches Updated**
Keep source and target branches current before starting migration.

### 7. **Limit Scope**
Migrate one repository at a time for clarity, or coordinate cross-repository migrations carefully.

## Troubleshooting

### Issue: "Source branch not found"
**Solution**: Verify branch name and ensure it exists in the repository.

### Issue: "Target branch not found"
**Solution**: Verify target branch name and ensure it exists.

### Issue: Pattern adaptation conflicts
**Solution**: Review migration analysis, adjust adaptation strategy, or escalate for architect guidance.

### Issue: Validation failures
**Solution**: Review detailed validation reports, address issues, and revalidate.

### Issue: Test failures after migration
**Solution**: Investigate test failure, verify business logic implementation, and fix as needed.

## Commands Overview

### Analysis Commands
```bash
*migration-analyze-commits     # Identify commits to migrate
*migration-analyze-patterns    # Analyze source/target patterns
*migration-extract-logic       # Extract business logic
*migration-plan-strategy       # Create migration strategy
*migration-validate-plan       # Validate against rules
```

### Execution Commands
```bash
*migration-prepare             # Prepare for migration
*migration-execute             # Execute migration
*migration-validate            # Validate migration
*migration-test                # Test migrated changes
*migration-document            # Create documentation
```

### Main Command
```bash
*implement-migration {repo} {source} {target}  # Execute complete migration
```

## See Also

- [VIRAT Command Reference](VIRAT_COMMAND_REFERENCE.md)
- [Migration Workflow Task](../tasks/migration-workflow.md)
- [Migration Workflow YAML](../workflows/migration-workflow.yaml)
- [BMAD Implementation Rules](../data/core-implementation-rules.yaml)
