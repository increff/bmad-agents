# VIRAT Branch Creation & Pull Request Guide

## Overview

This guide provides comprehensive instructions for creating feature branches and raising pull requests using the VIRAT (Virtual Intelligent Repository Analysis & Transformation) system across three repositories.

---

## Repository Configuration

### Base Branches

VIRAT works with three repositories, each with its designated base branch:

| Repository | Base Branch | Purpose |
|------------|-------------|---------|
| **irisx-algo** | `caas-release` | Algorithm implementations, business logic |
| **ms-loadapis** | `release_optimised` | Data loading APIs, file processing |
| **irisx-config** | `caas-staging_fix` | Configuration, SQL views, templates |

### Feature Branch Naming Convention

```
feature/{req-id}-{descriptive-name}
```

**Examples:**
- `feature/REQ-1234-inventory-validation`
- `feature/REQ-5678-distribution-calculation`
- `feature/REQ-9012-new-report-template`

---

## Prerequisites

### Before Creating Branches

1. **Ensure Correct Base Branches**
   ```bash
   *switch-to-base-branches
   ```
   - Switches all repositories to their correct base branches
   - Pulls latest changes from remote
   - Verifies working directories are clean

2. **Verify Repository State**
   ```bash
   *verify-repository-state
   ```
   - Confirms all repositories are on correct base branches
   - Checks for uncommitted changes or conflicts
   - Validates repository structure integrity

---

## Branch Creation Process

### Method 1: Automatic Branch Creation (Recommended)

Use the guided implementation command with branch creation flag:

```bash
*implement-guided --create-branches
```

**What This Does:**
- ✅ Creates feature branches in all affected repositories
- ✅ Branches from correct base branches automatically
- ✅ Uses standardized naming convention
- ✅ Maintains cross-repository consistency

**Example Output:**
```
Creating feature branches...
✓ Algorithm Repository: Created feature/REQ-1234-inventory-validation from caas-release
✓ LoadAPI Repository: Created feature/REQ-1234-inventory-validation from release_optimised
✓ Config Repository: Created feature/REQ-1234-inventory-validation from caas-staging_fix
```

### Method 2: Selective Branch Creation

If only specific repositories need changes (based on requirement analysis):

```bash
# For algorithm-only changes
*implement-guided --create-branches --repo=irisx-algo

# For loadapi-only changes
*implement-guided --create-branches --repo=ms-loadapis

# For config-only changes
*implement-guided --create-branches --repo=irisx-config
```

### Method 3: Manual Branch Creation

For advanced users who prefer manual control:

```bash
# Navigate to each repository and create branches manually
cd /path/to/irisx-algo
git checkout caas-release
git pull origin caas-release
git checkout -b feature/REQ-1234-inventory-validation

cd /path/to/ms-loadapis
git checkout release_optimised
git pull origin release_optimised
git checkout -b feature/REQ-1234-inventory-validation

cd /path/to/irisx-config
git checkout caas-staging_fix
git pull origin caas-staging_fix
git checkout -b feature/REQ-1234-inventory-validation
```

---

## Implementation Phase

After creating branches, implement your changes:

```bash
*implement-with-dev
```

**This Command:**
- Loads BMAD Dev persona for brownfield development
- Makes actual code changes following existing patterns
- Validates against all 33 VIRAT rules continuously
- Maintains cross-repository consistency
- Provides real-time validation feedback

**Continuous Validation:**
The system automatically validates:
- Pattern compliance
- Rule adherence
- Cross-repository consistency
- Code quality standards
- Dependency integrity

---

## Committing Changes

### Automatic Commit (Recommended)

```bash
*implement-guided --commit
```

**What This Does:**
- ✅ Commits changes in all affected repositories
- ✅ Uses standardized commit message format
- ✅ Includes requirement ID and description
- ✅ Groups related changes appropriately

**Commit Message Format:**
```
feat(REQ-{id}): {brief-description}

{detailed-description}

Changes:
- Repository: {repo-name}
- Module: {module-name}
- Files modified: {file-list}

Rule Compliance:
- Core Rules (1-10): ✓
- Repository Rules (11-15): ✓
- Pattern Rules (16-20): ✓
- Class Rules (24-33): ✓

Related Requirements: {related-reqs}
```

### Manual Commit

For fine-grained control over commits:

```bash
# Commit in each repository separately
cd /path/to/irisx-algo
git add .
git commit -m "feat(REQ-1234): Add inventory validation module"

cd /path/to/ms-loadapis
git add .
git commit -m "feat(REQ-1234): Add inventory validation LoadAPI"

cd /path/to/irisx-config
git add .
git commit -m "feat(REQ-1234): Add inventory validation SQL views"
```

---

## Pushing Feature Branches

### Automatic Push (Recommended)

```bash
*implement-guided --push
```

**What This Does:**
- ✅ Pushes all feature branches to remote repositories
- ✅ Sets upstream tracking automatically
- ✅ Verifies successful push for each repository
- ✅ Handles authentication and permissions

**Example Output:**
```
Pushing feature branches...
✓ Algorithm Repository: Pushed feature/REQ-1234-inventory-validation to origin
✓ LoadAPI Repository: Pushed feature/REQ-1234-inventory-validation to origin
✓ Config Repository: Pushed feature/REQ-1234-inventory-validation to origin
```

### Manual Push

```bash
# Push each repository separately
cd /path/to/irisx-algo
git push -u origin feature/REQ-1234-inventory-validation

cd /path/to/ms-loadapis
git push -u origin feature/REQ-1234-inventory-validation

cd /path/to/irisx-config
git push -u origin feature/REQ-1234-inventory-validation
```

---

## Creating Pull Requests

### Automatic PR Creation

If PR creation is configured:

```bash
*implement-guided --push
```

The system automatically creates PRs in all affected repositories.

### Manual PR Creation

If automatic PR creation is not configured, create PRs manually:

#### Algorithm Repository PR

**Target Branch:** `caas-release`

**PR Title:**
```
feat(REQ-{id}): {brief-description}
```

**PR Description Template:**
```markdown
## Requirement
- **ID:** REQ-{id}
- **Title:** {requirement-title}
- **Type:** [Algorithm/LoadAPI/Config/Cross-Repository]
- **Complexity:** [High/Medium/Low]

## Changes Overview
- Module(s) Added/Modified: {list}
- Classes Added/Modified: {list}
- Dependencies Added: {list}

## Implementation Details
{detailed-description}

## Rule Compliance
- [x] Core Rules (1-10): Verified
- [x] Repository Rules (11-15): Verified
- [x] Pattern Rules (16-20): Verified
- [x] Error Handling (Rule 21): Implemented
- [x] Testing (Rule 22): Complete
- [x] Class Rules (24-33): Verified

## Cross-Repository Impact
- **LoadAPI Changes:** {yes/no} - {description}
- **Config Changes:** {yes/no} - {description}
- **Related PRs:** {list-of-related-PRs}

## Testing
- [x] Unit Tests: {count} tests passing
- [x] Integration Tests: {count} tests passing
- [x] Cross-Repository Tests: Verified

## Documentation
- [x] Code comments added
- [x] Requirement document updated
- [x] Implementation details documented

## Deployment Notes
{any-special-deployment-considerations}

## Rollback Plan
{rollback-procedure}
```

#### LoadAPI Repository PR

**Target Branch:** `release_optimised`

Use similar template as above, focusing on LoadAPI-specific details.

#### Config Repository PR

**Target Branch:** `caas-staging_fix`

Use similar template as above, focusing on configuration-specific details.

---

## Complete End-to-End Workflow

### Single Command (Fully Automated)

```bash
*implement REQ-1234.md --auto-commit
```

**This Single Command:**
1. ✅ Analyzes requirement
2. ✅ Crawls repositories for patterns
3. ✅ Creates implementation plan
4. ✅ **Creates feature branches**
5. ✅ Implements changes
6. ✅ Runs tests
7. ✅ **Commits changes**
8. ✅ **Pushes branches**
9. ✅ **Creates PRs** (if configured)
10. ✅ Updates documentation

### Step-by-Step Workflow (Manual Control)

```bash
# 1. Repository Preparation
*switch-to-base-branches
*verify-repository-state

# 2. Requirement Analysis
*analyze-requirement-with-analyst REQ-1234.md

# 3. Repository Crawling
*crawl-repos-with-analyst

# 4. Create Feature Branches
*implement-guided --create-branches

# 5. Implementation
*implement-with-dev

# 6. Testing
*test-implementation

# 7. Validation
*validate-implementation

# 8. Commit Changes
*implement-guided --commit

# 9. Push Branches
*implement-guided --push

# 10. Create PRs (manual or automatic)
```

---

## Branch and PR Management Best Practices

### 1. Branch Naming

**Do:**
- ✅ Use consistent `feature/REQ-{id}-{description}` format
- ✅ Keep descriptions concise but meaningful
- ✅ Use hyphens (not underscores) in names
- ✅ Use lowercase for consistency

**Don't:**
- ❌ Use generic names like `feature/fix` or `feature/update`
- ❌ Include spaces in branch names
- ❌ Create branches without requirement IDs
- ❌ Use different names across repositories

### 2. Commit Practices

**Do:**
- ✅ Commit related changes together
- ✅ Use meaningful commit messages
- ✅ Include requirement ID in commits
- ✅ Commit frequently with logical groupings

**Don't:**
- ❌ Mix unrelated changes in one commit
- ❌ Commit untested code
- ❌ Use vague commit messages
- ❌ Include debug code or temporary files

### 3. PR Practices

**Do:**
- ✅ Create PRs for all affected repositories
- ✅ Link related PRs together
- ✅ Provide comprehensive PR descriptions
- ✅ Request appropriate reviewers
- ✅ Update PR description if implementation changes

**Don't:**
- ❌ Create PRs before testing is complete
- ❌ Mix multiple requirements in one PR
- ❌ Create PRs without documentation
- ❌ Ignore PR review feedback

### 4. Cross-Repository Coordination

**Do:**
- ✅ Create branches in all affected repositories
- ✅ Use same branch name across repositories
- ✅ Coordinate merge timing across repositories
- ✅ Document cross-repository dependencies

**Don't:**
- ❌ Merge PRs in wrong order
- ❌ Break cross-repository dependencies
- ❌ Create branches in wrong repositories
- ❌ Forget to update all affected repositories

---

## Troubleshooting

### Branch Creation Issues

**Problem:** Branch already exists
```bash
# Solution: Delete old branch and recreate
git branch -D feature/REQ-1234-old-name
*implement-guided --create-branches
```

**Problem:** Not on correct base branch
```bash
# Solution: Switch to base branches first
*switch-to-base-branches
*verify-repository-state
*implement-guided --create-branches
```

**Problem:** Uncommitted changes in working directory
```bash
# Solution: Stash or commit changes first
git stash
*implement-guided --create-branches
git stash pop  # if needed
```

### Push Issues

**Problem:** Push rejected (non-fast-forward)
```bash
# Solution: Pull latest changes and rebase
git pull origin feature/REQ-1234-name --rebase
git push origin feature/REQ-1234-name
```

**Problem:** Authentication failed
```bash
# Solution: Check credentials and permissions
git config --global credential.helper cache
git push origin feature/REQ-1234-name
```

### PR Creation Issues

**Problem:** PR conflicts with base branch
```bash
# Solution: Rebase on latest base branch
git checkout caas-release  # or appropriate base
git pull origin caas-release
git checkout feature/REQ-1234-name
git rebase caas-release
git push origin feature/REQ-1234-name --force-with-lease
```

**Problem:** Missing required checks
```bash
# Solution: Run validation before PR
*validate-implementation
*test-implementation
*quality-check
*implement-guided --push
```

---

## Validation Checklist

Before creating PRs, ensure:

### Code Quality
- [ ] All tests passing
- [ ] No linter errors
- [ ] Code follows existing patterns
- [ ] All 33 rules validated
- [ ] No breaking changes

### Documentation
- [ ] Code comments added
- [ ] Requirement document updated
- [ ] PR descriptions complete
- [ ] Rollback procedures documented

### Cross-Repository Consistency
- [ ] All affected repositories updated
- [ ] Dependencies properly coordinated
- [ ] Branch names consistent
- [ ] Commit messages consistent

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Cross-repository tests passing
- [ ] Performance impact assessed

### Deployment Readiness
- [ ] Deployment plan documented
- [ ] Rollback strategy defined
- [ ] Monitoring configured
- [ ] Post-deployment validation planned

---

## Quick Reference Commands

### Branch Operations
```bash
*switch-to-base-branches           # Switch all repos to base branches
*verify-repository-state           # Verify repository state
*implement-guided --create-branches # Create feature branches
```

### Commit and Push
```bash
*implement-guided --commit         # Commit changes
*implement-guided --push          # Push branches
*implement REQ-1234.md --auto-commit # Full automation
```

### Validation
```bash
*validate-implementation          # Validate implementation
*test-implementation             # Run tests
*quality-check                   # Quality assurance
*validate-deployment            # Deployment validation
```

---

## Advanced Scenarios

### Scenario 1: Config-Only Change

```bash
# Only create branch in config repository
*analyze-requirement-with-analyst REQ-1234.md
# Analysis confirms config-only change

*implement-guided --create-branches --repo=irisx-config
*implement-with-dev
*implement-guided --commit
*implement-guided --push
```

### Scenario 2: Cross-Repository Feature

```bash
# Create branches in all three repositories
*implement-guided --create-branches

# Implement in sequence to maintain dependencies
*implement-with-dev --repo=irisx-config  # Config first
*implement-with-dev --repo=ms-loadapis  # LoadAPI second
*implement-with-dev --repo=irisx-algo   # Algorithm last

# Commit and push all together
*implement-guided --commit
*implement-guided --push
```

### Scenario 3: Hotfix Branch

```bash
# For urgent fixes, use hotfix branch naming
*implement-guided --create-branches --type=hotfix
# Creates: hotfix/REQ-1234-description

# Expedited workflow
*implement-with-dev --fast-track
*implement-guided --commit
*implement-guided --push
```

---

## Integration with CI/CD

### Automated Checks on PR

When PR is created, automated checks run:

1. **Linting and Code Quality**
   - ESLint/Checkstyle validation
   - Code formatting checks
   - Static analysis

2. **Testing**
   - Unit test execution
   - Integration test execution
   - Code coverage analysis

3. **Rule Validation**
   - 33 VIRAT rules compliance
   - Pattern adherence validation
   - Cross-repository consistency

4. **Security Scanning**
   - Dependency vulnerability scanning
   - Secret detection
   - License compliance

### PR Merge Requirements

Before merging, ensure:
- ✅ All CI/CD checks passing
- ✅ Code review approved
- ✅ No merge conflicts
- ✅ Documentation updated
- ✅ Related PRs ready for merge

---

## Support and Resources

### Documentation References
- `COMPLETE_DEVELOPMENT_FLOW.md` - Full development workflow
- `COMPREHENSIVE_REQUIREMENT_ANALYSIS_AND_CHECKLIST.md` - Requirement analysis
- Core implementation rules (integrated in VIRAT agent)

### Getting Help
- Review VIRAT documentation
- Consult with team leads
- Check existing PR examples
- Use validation commands for guidance

---

## Summary

The VIRAT system streamlines branch creation and PR management across three repositories:

1. **Automated Branch Creation** - Creates feature branches from correct base branches
2. **Guided Implementation** - Provides continuous validation during development
3. **Coordinated Commits** - Ensures consistent commits across repositories
4. **Streamlined PR Process** - Automates or guides PR creation with proper documentation
5. **Quality Gates** - Validates all changes before PR creation

Use `*implement REQ-1234.md --auto-commit` for fully automated workflow or step-by-step commands for manual control.

