# Feature Branch Creation Logic - Environment-Specific Base Branches

## Overview

When creating feature branches, VIRAT **ALWAYS** creates them from environment-specific base branches, NEVER from master. The base branch is automatically selected based on the detected environment.

## Environment Base Branch Mapping

| Environment | Algorithm Branch | LoadAPI Branch | Config Branch |
|---|---|---|---|
| **prod** | `caas-release` | `release_optimised` | `caas-staging_fix` |
| **reliance** | `master-ril` | `caas-ril-uploads` | `master-ril` |
| **phoenix** | `master-adidas-reliance-prod` | `caas-phoenix-uploads` | `master-adidas-ril` |

## Feature Branch Creation Process

### Step 1: Environment Detection
- Read requirement document header or ENV field
- Identify target environment (prod/reliance/phoenix)
- Default to prod if not specified

### Step 2: Get Base Branches
- Look up environment-specific base branches from mapping above
- Verify all three repositories have correct base branches in configuration

### Step 3: Create Feature Branches
For each affected repository:
1. Switch to environment-specific base branch
2. Pull latest changes from remote
3. Create feature branch: `feature/{req-id}-{description}`
4. Ensure branch is created from base branch (NOT from master)

### Example Workflow

```bash
# For PROD environment
*switch-environment prod

# VIRAT automatically:
# 1. Switches irisx-algo to caas-release
# 2. Switches ms-loadapis to release_optimised
# 3. Switches irisx-config to caas-staging_fix
# 4. Creates feature branches from these base branches

*implement REQ-1234.md
# Creates: feature/REQ-1234-requirement-title
# From:
#   - irisx-algo: caas-release
#   - ms-loadapis: release_optimised
#   - irisx-config: caas-staging_fix
```

## CRITICAL RULES

✅ **DO:**
- Always detect environment first
- Always use environment-specific base branches
- Always create branches from base branches
- Always create branches in ALL affected repositories simultaneously
- Always verify correct base branch before creating feature branch

❌ **DON'T:**
- Create feature branches from master
- Hardcode base branch names
- Create branches without environment detection
- Mix base branches from different environments
- Forget to pull latest changes before creating branches

## Implementation Files Updated

1. **config.yaml** - Contains environment-specific base branch mappings
2. **VIRAT agent (agents/virat.md)** - Rule 14 defines branch management with environment detection
3. **implement-requirement.md** - Step 8 updated to use environment detection
4. **BRANCH_AND_PR_GUIDE.md** - Updated all examples to use environment-specific base branches
5. **Memory stored** - Environment-specific feature branch creation logic documented

## Related Commands

```bash
*switch-environment prod     # Switch to prod environment and use prod base branches
*switch-environment reliance # Switch to reliance environment
*switch-environment phoenix  # Switch to phoenix environment
*implement REQ-1234.md       # Creates feature branches from correct environment base branches
```

---

**Last Updated:** 2025-10-21
**Status:** Active and enforced across all VIRAT workflows
