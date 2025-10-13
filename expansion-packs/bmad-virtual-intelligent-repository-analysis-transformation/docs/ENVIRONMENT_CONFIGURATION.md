# VIRAT Environment Configuration Guide

## Overview

VIRAT now supports multiple environments with different base branches across the three repositories. The environment is automatically detected from the requirement document, and VIRAT will use the correct base branches for all operations.

## Supported Environments

### 1. PROD Environment
**Use for**: Production deployments

**Base Branches**:
- **Algorithm** (irisx-algo): `caas-release`
- **LoadAPI** (ms-loadapis-ril-final): `release_optimised`
- **Config** (irisx-config): `caas-staging_fix`

---

### 2. Reliance Environment
**Use for**: Reliance-specific deployments

**Base Branches**:
- **Algorithm** (irisx-algo): `master-ril`
- **LoadAPI** (ms-loadapis-ril-final): `caas-ril-uploads`
- **Config** (irisx-config): `master-ril`

---

### 3. Phoenix Environment
**Use for**: Phoenix/Adidas deployments

**Base Branches**:
- **Algorithm** (irisx-algo): `master-adidas-reliance-prod`
- **LoadAPI** (ms-loadapis-ril-final): `caas-phoenix-uploads`
- **Config** (irisx-config): `master-adidas-ril`

---

## How to Specify Environment in Requirement Documents

### Method 1: Environment Field (Recommended)

Add the `Environment` field in the requirement document header:

**Single Environment:**
```markdown
# Requirement Document: Add New Feature

**Requirement ID**: REQ-1234  
**Environment**: reliance  
**Status**: In Progress  
**Created**: 2025-10-13  
**Last Updated**: 2025-10-13  
**Assigned To**: Dev Team
```

**Multiple Environments (comma-separated):**
```markdown
# Requirement Document: Add New Feature

**Requirement ID**: REQ-1234  
**Environment**: reliance, phoenix  
**Status**: In Progress  
**Created**: 2025-10-13  
**Last Updated**: 2025-10-13  
**Assigned To**: Dev Team
```

When multiple environments are specified, VIRAT will:
1. Complete full implementation for first environment (reliance)
2. Push changes to repository
3. Switch to second environment (phoenix) base branches
4. Repeat full implementation for second environment
5. Push changes again

### Method 2: ENV Field

Alternatively, you can use an `ENV` field:

```markdown
**ENV**: phoenix
```

### Valid Environment Values

**Single Environment:**
- `prod` or `production`
- `reliance` or `ril`
- `phoenix` or `adidas`

**Multiple Environments (comma-separated):**
- `reliance, phoenix`
- `prod, reliance`
- `reliance, phoenix, prod`

**Case-insensitive**: `PROD`, `Prod`, and `prod` all work.

---

## How VIRAT Uses Environment Configuration

### 1. Automatic Detection
When you run `*implement` or any command, VIRAT will:
1. Read the requirement document
2. Extract the environment(s) from the `Environment` or `ENV` field
3. If multiple environments found (comma-separated), parse all and prepare for sequential processing
4. Load the corresponding base branch configuration from `config.yaml`
5. Display the detected environment(s) and branches

### 2. Branch Switching
Before any analysis or implementation:
- VIRAT automatically switches all three repositories to the correct base branches
- Verifies each repository is on the expected branch
- Ensures working directories are clean

### 3. Feature Branch Creation
When creating feature branches:
- Branches are created from the environment-specific base branches
- Branch naming follows: `feature/{req-id}-{description}`
- All three repositories use consistent branch names

### 4. Documentation
All implementation documentation includes:
- Environment name
- Base branches used
- Feature branches created
- Environment-specific deployment notes

---

## Commands

### Show Current Environment
```bash
*show-env
```
Displays:
- Current environment (if detected from requirement doc)
- Base branches for each repository
- Repository paths
- Current branch status

### Switch to Base Branches
```bash
*switch-to-base-branches
```
Automatically switches to base branches for the detected environment.

### Verify Repository State
```bash
*verify-repository-state
```
Verifies all repositories are on correct branches for the environment.

---

## Example Workflows

### Single Environment Workflow

#### 1. Create Requirement Document
```markdown
# Requirement: Add Store Validation

**Requirement ID**: REQ-5678  
**Environment**: reliance  
**Status**: New  
**Created**: 2025-10-13

## Description
Add validation for store data in the Reliance environment...
```

#### 2. Run VIRAT Implementation
```bash
*implement REQ-5678.md
```

#### 3. VIRAT Automatically:
- Detects environment: `reliance`
- Switches branches:
  - irisx-algo → `master-ril`
  - ms-loadapis-ril-final → `caas-ril-uploads`
  - irisx-config → `master-ril`
- Creates feature branches: `feature/REQ-5678-add-store-validation`
- Implements changes
- Documents everything with environment context

---

### Multiple Environment Workflow

#### 1. Create Requirement Document
```markdown
# Requirement: Add Store Validation

**Requirement ID**: REQ-5678  
**Environment**: reliance, phoenix  
**Status**: New  
**Created**: 2025-10-13

## Description
Add validation for store data - needed for both Reliance and Phoenix environments...
```

#### 2. Run VIRAT Implementation
```bash
*implement REQ-5678.md
```

#### 3. VIRAT Automatically:

**For First Environment (reliance):**
- Detects environment: `reliance`
- Switches to reliance base branches
- Creates feature branches: `feature/REQ-5678-add-store-validation-reliance`
- Implements changes
- Runs tests
- Documents with reliance context
- **Pushes changes to repository**

**Then For Second Environment (phoenix):**
- Switches to phoenix base branches
- Creates feature branches: `feature/REQ-5678-add-store-validation-phoenix`
- Implements same changes for phoenix
- Runs tests
- Documents with phoenix context
- **Pushes changes to repository**

Both environments now have the feature implemented!

---

## Configuration File

Environment configuration is stored in:
```
expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/config.yaml
```

### Adding New Environments

To add a new environment, edit `config.yaml`:

```yaml
environments:
  new_env:
    name: "New Environment"
    base_branches:
      algorithm: "branch-name-for-algo"
      loadapi: "branch-name-for-loadapi"
      config: "branch-name-for-config"
```

---

## Troubleshooting

### Environment Not Detected
**Problem**: VIRAT doesn't detect the environment.

**Solution**: 
- Ensure the `Environment` or `ENV` field is in the requirement document header
- Check spelling (must be: prod, reliance, or phoenix)
- Verify the field is in the first few lines of the document

### Wrong Branches Used
**Problem**: VIRAT switches to wrong branches.

**Solution**:
- Check `config.yaml` for correct branch names
- Verify environment name in requirement document matches config.yaml
- Use `*show-env` to see what VIRAT detected

### Repository Not Found
**Problem**: VIRAT can't find repositories.

**Solution**:
- Verify repository paths in `config.yaml` are correct
- Ensure all three repositories exist at specified paths
- Check file permissions

---

## Best Practices

1. **Always Specify Environment**: Include the environment field in every requirement document
2. **Verify Before Implementation**: Run `*show-env` to verify correct environment detection
3. **Keep Branches Clean**: Ensure working directories are clean before running VIRAT
4. **Document Changes**: VIRAT automatically documents the environment used
5. **Consistent Naming**: Use standard environment names (prod/reliance/phoenix)

---

## Minimal Changes Made

The environment configuration feature was added with minimal changes:

1. ✅ Added `environments` section to `config.yaml`
2. ✅ Updated `virat.md` agent to detect and use environment
3. ✅ Updated Rule 14 (branch management) with environment support
4. ✅ Updated requirement document template with environment field
5. ✅ Updated Phase 0 to include environment detection
6. ✅ All existing functionality preserved

**No breaking changes** - existing requirements without environment field will default to PROD.

---

_For more information, see the main VIRAT documentation._

