# Pull Request Workflow Guide for ARYA

## Overview

This guide explains how Pull Requests are raised and managed in ARYA's automatic workflow, covering the complete process from implementation to deployment.

## Complete PR Workflow

```
Requirement → Implementation → PR Generation → Manual PR Creation → Review → Merge → Deploy
     ↓              ↓                ↓                    ↓            ↓       ↓       ↓
  Analyze      Code Changes    Auto-Generate         Push & Open   Validate  Merge   Verify
   Repos       Across 4         PR Docs with         PRs on Git    Changes   to     Deploy
              Repositories      Env Context           Platform      Quality   Base   to Env
```

## Phase 1: Automated Implementation (ARYA)

### What ARYA Does Automatically

#### 1. Environment Setup
```bash
@arya
*status                      # Check current environment
*validate-environment        # Validate Phoenix/Reliance config
*switch-to-base-branches    # Switch to correct base branches
```

**Automated Actions:**
- Detects environment (Phoenix/Reliance)
- Switches repositories to correct base branches:
  - **Phoenix**: `master-adidas-reliance-prod`, `release-pheonix`, `master-adidas-ril`, `caas-pheonix-uploads`
  - **Reliance**: `master-ril`, `release-ril`, `master-ril`, `caas-ril-uploads`
- Validates repository access and permissions

#### 2. Requirement Analysis & Implementation
```bash
@arya
*implement requirement-document.md
```

**Automated Actions:**
- Analyzes requirement across all repositories
- Identifies affected modules and files
- Creates feature branches (same name across all repos)
- Implements changes following existing patterns
- Commits changes with descriptive messages
- Validates implementation quality

**Generated Feature Branches:**
```
irisx-algo:   feature/req-id-requirement-title
ms-mfp:       feature/req-id-requirement-title
irisx-config: feature/req-id-requirement-title
ms-loadapis:  feature/req-id-requirement-title (if affected)
```

#### 3. Validation & Testing
**Automated Actions:**
- Runs existing test suites
- Validates environment-specific rules
- Checks code quality standards
- Verifies cross-repository integration
- Documents test results

#### 4. PR Description Generation
```bash
@arya
*generate-pr-descriptions    # Auto-runs after *implement
```

**Automated Actions:**
- Generates `PULL_REQUEST_DESCRIPTIONS.md` file
- Creates PR description for each affected repository
- Includes environment-specific context
- Documents cross-repository dependencies
- Provides merge order recommendations
- Adds review checklists
- Includes next steps

**Generated File Structure:**
```markdown
PULL_REQUEST_DESCRIPTIONS.md
├── 1. irisx-algo PR Description
│   ├── Title (with environment label)
│   ├── Description
│   ├── Changes (new/modified files)
│   ├── Environment Context
│   ├── Features
│   ├── Testing Status
│   └── Cross-Repository Impact
├── 2. ms-mfp PR Description
│   └── (same structure)
├── 3. irisx-config PR Description
│   └── (same structure)
├── 4. ms-loadapis PR Description (if affected)
│   └── (same structure)
└── Implementation Summary
    ├── Environment: Phoenix/Reliance
    ├── Repository Status Table
    ├── Next Steps (detailed)
    └── Merge Strategy
```

## Phase 2: Manual PR Creation (Developer)

### What You Do Manually

#### 1. Push Feature Branches
```bash
# Push branches to remote (use commands from PULL_REQUEST_DESCRIPTIONS.md)
cd /Users/aryatupkary/irisx-algo
git push origin feature/req-id-requirement-title

cd /Users/aryatupkary/ms-mfp
git push origin feature/req-id-requirement-title

cd /Users/aryatupkary/irisx-config
git push origin feature/req-id-requirement-title

# If LoadAPIs affected
cd /Users/aryatupkary/ms-loadapis
git push origin feature/req-id-requirement-title
```

#### 2. Create Pull Requests on Git Platform

**For Each Repository:**

1. **Open PR Creation Page**
   - Navigate to repository on GitHub/GitLab/Bitbucket
   - Click "New Pull Request" or "Create Pull Request"

2. **Select Branches**
   - **Source**: `feature/req-id-requirement-title`
   - **Target**: Environment-specific base branch
     - Phoenix: `master-adidas-reliance-prod` (algo), `release-pheonix` (mfp), etc.
     - Reliance: `master-ril` (algo), `release-ril` (mfp), etc.

3. **Copy PR Description**
   - Open `PULL_REQUEST_DESCRIPTIONS.md`
   - Copy the entire description for this repository
   - Paste into PR description field

4. **Add PR Metadata**
   - **Labels**: Apply suggested labels
     - `environment:phoenix` or `environment:reliance`
     - `repository:algorithm`, `repository:mfp`, etc.
     - `type:feature`, `type:enhancement`, etc.
   - **Reviewers**: Add appropriate reviewers
   - **Milestone**: Link to project milestone (if applicable)

5. **Submit PR**
   - Review the PR preview
   - Click "Create Pull Request"

#### 3. Link Related PRs

**After All PRs Created:**

Update each PR description with links to related PRs:

```markdown
## Related PRs
- **Algorithm**: [#123 - irisx-algo PR](link)
- **MFP**: [#124 - ms-mfp PR](link)
- **Configuration**: [#125 - irisx-config PR](link)
- **LoadAPIs**: [#126 - ms-loadapis PR](link) (if applicable)
```

## Phase 3: Review & Approval (Team)

### Review Process

#### Environment-Specific Review
- [ ] **Phoenix Review** (if Phoenix environment)
  - Phoenix-specific business rules validated
  - Phoenix data sources verified
  - Phoenix environment compliance checked
  
- [ ] **Reliance Review** (if Reliance environment)
  - Reliance-specific business rules validated
  - Reliance data sources verified
  - Reliance environment compliance checked

#### Repository-Specific Review

**For irisx-algo:**
- [ ] Java code quality (follows standards)
- [ ] Business logic correctness
- [ ] Validation rules properly implemented
- [ ] Maven build successful
- [ ] Unit tests pass

**For ms-mfp:**
- [ ] Python code quality (PEP 8)
- [ ] Forecasting logic correctness
- [ ] MFP routes functional
- [ ] Database integration validated
- [ ] Unit tests pass

**For irisx-config:**
- [ ] SQL views properly structured
- [ ] Templates correctly formatted
- [ ] JSON configuration valid
- [ ] Export definitions correct

**For ms-loadapis:**
- [ ] Python code quality (PEP 8)
- [ ] Upload processing logic validated
- [ ] Data validation rules correct
- [ ] API endpoints functional

#### Cross-Repository Review
- [ ] Data flow consistency maintained
- [ ] Integration points validated
- [ ] Dependency order correct
- [ ] No breaking changes across repos

### Approval Gates
1. **Code Review**: At least 1-2 approvals per repository
2. **Environment Validation**: Environment-specific checks pass
3. **CI/CD Checks**: All automated checks pass
4. **Integration Tests**: Cross-repository tests pass

## Phase 4: Merge Strategy (Team Lead/DevOps)

### Recommended Merge Order

The `PULL_REQUEST_DESCRIPTIONS.md` provides a recommended merge order. Typically:

```
Step 1: Merge irisx-config (configuration changes first)
        ↓
Step 2: Merge irisx-algo (algorithm changes depend on config)
        ↓
Step 3: Merge ms-mfp (MFP changes depend on both)
        ↓
Step 4: Merge ms-loadapis (if affected, LoadAPIs changes last)
```

### Merge Commands

**For Each Repository (in order):**

```bash
# Switch to base branch
git checkout [environment-base-branch]

# Update base branch
git pull origin [environment-base-branch]

# Merge feature branch (or use PR merge button)
git merge feature/req-id-requirement-title

# Push merged changes
git push origin [environment-base-branch]

# Delete feature branch (optional)
git branch -d feature/req-id-requirement-title
git push origin --delete feature/req-id-requirement-title
```

## Phase 5: Deployment & Validation

### Environment-Specific Deployment

#### Phoenix Environment
```
Phoenix Staging → Validate → Phoenix Production
```

**Validation Checklist:**
- [ ] Phoenix staging deployment successful
- [ ] Phoenix-specific features working
- [ ] Phoenix data sources validated
- [ ] Phoenix business rules verified
- [ ] User acceptance testing complete

#### Reliance Environment
```
Reliance Staging → Validate → Reliance Production
```

**Validation Checklist:**
- [ ] Reliance staging deployment successful
- [ ] Reliance-specific features working
- [ ] Reliance data sources validated
- [ ] Reliance business rules verified
- [ ] User acceptance testing complete

### Post-Deployment Validation
- [ ] All services running properly
- [ ] Cross-repository integration working
- [ ] Performance benchmarks met
- [ ] No errors in logs
- [ ] User feedback collected

## Common Scenarios

### Scenario 1: Standard Feature Implementation

```bash
# 1. ARYA implements automatically
@arya
*implement requirement.md
# Creates branches, implements code, generates PR descriptions

# 2. You push branches
git push origin feature/req-123-new-feature  # For each repo

# 3. You create PRs using generated descriptions
# (Copy-paste from PULL_REQUEST_DESCRIPTIONS.md)

# 4. Team reviews and approves

# 5. Team merges in recommended order

# 6. DevOps deploys to environment
```

### Scenario 2: Environment-Specific Implementation

```bash
# 1. Ensure correct environment
@arya
*status
*validate-environment phoenix  # or reliance

# 2. Implement
@arya
*implement requirement.md

# 3. Verify environment in PR descriptions
# PULL_REQUEST_DESCRIPTIONS.md will show:
# - Environment: Phoenix (or Reliance)
# - Correct base branches for environment
# - Environment-specific validation notes

# 4. Create PRs targeting environment-specific base branches

# 5. Review with environment-specific checklist

# 6. Deploy to environment-specific staging/production
```

### Scenario 3: WSSI-MFP Workflow (Phoenix Only)

```bash
# 1. Ensure Phoenix environment
@arya
*validate-environment phoenix

# 2. Run WSSI-MFP workflow
@arya
*wssi-mfp-workflow requirement.md

# 3. ARYA generates PR descriptions with:
#    - WSSI-specific context
#    - MFP integration details
#    - Phoenix environment validation
#    - LoadAPIs data loading details

# 4. Create PRs (4 repositories affected)

# 5. Merge order: Config → Algo → LoadAPIs → MFP

# 6. Deploy to Phoenix environment only
```

### Scenario 4: WSSI-OTB Workflow (Reliance Only)

```bash
# 1. Ensure Reliance environment
@arya
*validate-environment reliance

# 2. Run WSSI-OTB workflow
@arya
*wssi-otb-workflow requirement.md

# 3. ARYA generates PR descriptions with:
#    - WSSI snapshot lifecycle context
#    - OTB generation details
#    - Reliance environment validation

# 4. Create PRs (typically 4 repositories)

# 5. Merge order: Config → Algo → LoadAPIs → MFP

# 6. Deploy to Reliance environment only
```

## Troubleshooting

### Issue: Wrong Base Branch
**Problem**: PR is targeting wrong base branch for environment

**Solution**:
1. Check `PULL_REQUEST_DESCRIPTIONS.md` for correct base branch
2. Close PR and create new one with correct target
3. Or update PR target branch (if platform allows)

### Issue: Missing Cross-Repository Links
**Problem**: PRs not linked to each other

**Solution**:
1. After all PRs created, edit each PR description
2. Add "Related PRs" section with links
3. Use ARYA command: `*link-related-prs`

### Issue: Environment Mismatch
**Problem**: PRs show wrong environment context

**Solution**:
1. Verify ARYA environment: `@arya *status`
2. Switch to correct environment: `*switch-environment phoenix`
3. Regenerate PR descriptions: `*generate-pr-descriptions`
4. Update PRs with new descriptions

### Issue: Merge Conflicts
**Problem**: Merge conflicts between feature and base branch

**Solution**:
1. Update feature branch from base:
   ```bash
   git checkout feature/req-id-title
   git fetch origin
   git merge origin/[base-branch]
   # Resolve conflicts
   git push origin feature/req-id-title
   ```
2. PR will automatically update
3. Request re-review if needed

## Best Practices

### ✅ Do's

1. **Always use ARYA's generated PR descriptions**
   - They contain complete context and validation checklists
   - They're environment-aware and comprehensive

2. **Follow recommended merge order**
   - Prevents dependency issues
   - Ensures smooth integration

3. **Link related PRs**
   - Helps reviewers understand cross-repository changes
   - Facilitates coordinated reviews

4. **Validate environment before creating PRs**
   - Ensures correct base branches
   - Applies correct environment rules

5. **Test in environment-specific staging**
   - Validates environment-specific functionality
   - Catches environment-specific issues early

### ❌ Don'ts

1. **Don't create PRs manually without using generated descriptions**
   - You'll miss important context and checklists

2. **Don't merge out of recommended order**
   - Can break cross-repository dependencies

3. **Don't skip environment validation**
   - May target wrong base branches
   - May miss environment-specific issues

4. **Don't merge without cross-repository review**
   - Integration issues may slip through

5. **Don't deploy without staging validation**
   - Production issues more likely

## Summary

### Automated by ARYA ✅
- Feature branch creation
- Code implementation
- Testing and validation
- PR description generation
- Cross-repository coordination
- Environment-specific context
- Review checklist creation
- Next steps documentation

### Manual by Developer 👤
- Push feature branches to remote
- Create PRs on Git platform
- Link related PRs
- Address review comments
- Approve and merge (with permissions)
- Deploy to environments

### Hybrid Approach Benefits
- ✅ Automated preparation reduces errors
- ✅ Human oversight ensures quality
- ✅ Flexibility to adjust before submission
- ✅ Complete documentation maintained
- ✅ Environment-specific awareness
- ✅ Cross-repository coordination

This workflow ensures high-quality, well-documented PRs while maintaining the efficiency of automation and the control of manual oversight.

