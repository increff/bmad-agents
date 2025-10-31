# Migration Workflow - Quick Reference Card

## Basic Command

```bash
*implement-migration {repository} {source-branch} {target-branch}
```

## Repository Names

| Abbreviation | Full Name | Type |
|---|---|---|
| `irisx-algo` | Algorithm Repository | Java/Spring Boot |
| `ms-loadapis-ril-final` | LoadAPI Repository | Python |
| `ms-mfp` | MFP Repository | Python |
| `irisx-config` | Configuration Repository | SQL/Templates |

## Common Scenarios

### 1. Backport from Production to Reliance

```bash
# Algorithm
*implement-migration irisx-algo caas-release master-ril

# LoadAPI
*implement-migration ms-loadapis-ril-final release_optimised caas-ril-uploads

# Config
*implement-migration irisx-config caas-staging_fix master-ril
```

### 2. Backport from Production to Phoenix

```bash
# Algorithm
*implement-migration irisx-algo caas-release master-adidas-reliance-prod

# LoadAPI
*implement-migration ms-loadapis-ril-final release_optimised caas-phoenix-uploads

# Config
*implement-migration irisx-config caas-staging_fix master-adidas-ril
```

### 3. Sync Feature Branch to Master

```bash
*implement-migration irisx-algo feature/my-feature master-ril
```

## Base Branches by Environment

### Production
- `irisx-algo` → `caas-release`
- `ms-loadapis-ril-final` → `release_optimised`
- `irisx-config` → `caas-staging_fix`

### Reliance (RIL)
- `irisx-algo` → `master-ril`
- `ms-loadapis-ril-final` → `caas-ril-uploads`
- `irisx-config` → `master-ril`

### Phoenix (Adidas)
- `irisx-algo` → `master-adidas-reliance-prod`
- `ms-loadapis-ril-final` → `caas-phoenix-uploads`
- `irisx-config` → `master-adidas-ril`

## Workflow Phases

1. ✅ **Setup** - Validate branches, identify commits
2. 🔍 **Analysis** - Analyze patterns, extract logic
3. 📋 **Planning** - Create implementation plan
4. 🌿 **Feature Branch** - Create feature branch
5. 🔧 **Execution** - Implement commits
6. ✔️ **Validation** - Test and validate
7. 📝 **Documentation** - Create reports
8. 🔀 **Finalization** - Merge and cleanup

## Analysis Commands

```bash
# Identify what needs to be migrated
*migration-analyze-commits

# Understand source and target patterns
*migration-analyze-patterns

# Extract business logic from commits
*migration-extract-logic

# Create migration strategy
*migration-plan-strategy

# Validate plan against rules
*migration-validate-plan
```

## Execution Commands

```bash
# Prepare for migration
*migration-prepare

# Execute migration
*migration-execute

# Validate results
*migration-validate

# Test migrated changes
*migration-test

# Create documentation
*migration-document
```

## Generated Documentation

The workflow creates these analysis documents:

| Document | Purpose |
|----------|---------|
| `migration-analysis.md` | Commit breakdown and categorization |
| `pattern-adaptation-mapping.md` | Source-to-target pattern mapping |
| `adaptation-strategy.md` | Branch-specific customizations |
| `migration-implementation-plan.md` | Step-by-step plan |
| `commit-dependency-graph.md` | Commit ordering |
| `testing-strategy.md` | Test plan |
| `risk-assessment.md` | Risk analysis |
| `pattern-compliance-report.md` | Pattern validation |
| `functional-test-results.md` | Feature tests |
| `integration-test-results.md` | Integration tests |
| `migration-integrity-report.md` | Completeness check |
| `quality-validation-report.md` | Quality metrics |
| `MIGRATION_REPORT.md` | Final comprehensive report |

## Success Indicators

✅ All commits successfully migrated
✅ Business logic correctly implemented
✅ No breaking changes
✅ All tests passing
✅ Complete documentation created
✅ Feature branch merged
✅ Changes pushed to origin

## Troubleshooting

### Problem: Branch not found
**Solution**: Verify branch name exists in repository

### Problem: Pattern conflicts
**Solution**: Review adaptation strategy, escalate to architect if needed

### Problem: Test failures
**Solution**: Investigate test, verify business logic implementation

### Problem: Validation failures
**Solution**: Review validation reports, address issues, revalidate

## Migration Strategies by Repository

### Algorithm (Java)
- Modules and registration patterns
- Class hierarchies and inheritance
- Args classes and DI
- Validation modules

### LoadAPI (Python)
- LoadAPI classes and inheritance
- Validation and normalization
- Python module imports
- Constants and error handling

### Config (SQL)
- SQL view creation
- TSV templates
- JSON configurations
- Export queries

### MFP (Python)
- Service classes and routes
- Database helpers
- Forecasting algorithms
- View and snapshot logic

## Key Files

| Path | Purpose |
|------|---------|
| `tasks/migration-workflow.md` | Complete task definition |
| `workflows/migration-workflow.yaml` | Workflow definition |
| `docs/MIGRATION_GUIDE.md` | Full user guide |
| `docs/MIGRATION_WORKFLOW_SUMMARY.md` | Feature summary |
| `agents/virat.md` | VIRAT commands and docs |

## Best Practices

1. ✅ Always run analysis before migration
2. ✅ Keep source and target branches updated
3. ✅ Migrate one repo at a time for clarity
4. ✅ Review feature branch before merging
5. ✅ Don't skip validation phases
6. ✅ Document manual decisions
7. ✅ Keep commits atomic and working

## Expert Agents for Conflict Resolution

When conflicts arise during migration, load the appropriate expert agent:

| Conflict Type | Expert Agent | File |
|---|---|---|
| Java Module/Class conflicts | Algorithm Pattern Expert | `agents/algorithm-pattern-expert.md` |
| LoadAPI/Python conflicts | LoadAPI Pattern Expert | `agents/loadapi-pattern-expert.md` |
| SQL/Template conflicts | Config Pattern Expert | `agents/config-pattern-expert.md` |
| Service/Route conflicts | MFP Pattern Expert | `agents/mfp-pattern-expert.md` |

**Conflict Resolution Process:**
1. ✅ Identify conflict type and repository
2. ✅ Load relevant expert agent
3. ✅ Provide conflict context to expert
4. ✅ Get expert guidance on resolution
5. ✅ Apply recommendations following target patterns
6. ✅ Validate against applicable BMAD rules
7. ✅ Document expert guidance used

## For More Information

- Full Guide: `docs/MIGRATION_GUIDE.md`
- Task Details: `tasks/migration-workflow.md`
- Workflow: `workflows/migration-workflow.yaml`
- Summary: `docs/MIGRATION_WORKFLOW_SUMMARY.md`

---

**Quick Tip**: Start with `*migration-analyze-commits` to see what needs migration before committing to the full process!
