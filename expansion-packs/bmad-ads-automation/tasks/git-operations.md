# Git Operations Task

## Overview

This task handles actual Git operations for creating branches, making commits, and managing repository changes in the three interconnected repositories.

## Prerequisites

- Repository paths configured in `config/ads-orchestrator.yaml`
- Git access permissions to all three repositories
- caas-release branch exists in all repositories

## Git Operations

### 1. Branch Creation

**Command**: `*git-branch`

**Purpose**: Create feature branches from caas-release in all affected repositories

**Steps**:

1. **Check Repository Status**:

   ```bash
   cd /path/to/irisx-algo
   git status
   git branch -a
   ```

2. **Create Feature Branch**:

   ```bash
   # Switch to caas-release branch
   git checkout caas-release
   git pull origin caas-release

   # Create feature branch
   git checkout -b feature/{req-id}-{title}
   ```

3. **Repeat for All Repositories**:
   - irisx-algo
   - ms-loadapis-ril-final
   - irisx-config

4. **Update Requirement Document**:
   - Add branch URLs to requirement document
   - Record branch creation timestamp
   - Update repository status

### 2. Branch Checkout

**Command**: `*git-checkout`

**Purpose**: Switch to feature branches in repositories

**Steps**:

1. **Check Current Branch**:

   ```bash
   git branch --show-current
   ```

2. **Switch to Feature Branch**:

   ```bash
   git checkout feature/{req-id}-{title}
   ```

3. **Verify Branch Status**:
   ```bash
   git status
   git log --oneline -5
   ```

### 3. File Modifications

**Purpose**: Make actual changes to repository files

**Steps**:

1. **Modify Java Files** (irisx-algo):

   ```bash
   # Edit Java source files
   vim src/main/java/com/irisx/data/StoreCategoryData.java
   # Add new fields, methods, etc.
   ```

2. **Modify Python Files** (ms-loadapis-ril-final):

   ```bash
   # Edit Python load API files
   vim loadapi/distribution/store_category_loadapi.py
   # Add new load API methods
   ```

3. **Modify Configuration Files** (irisx-config):
   ```bash
   # Edit configuration files
   vim config/store_category_config.json
   # Add new configuration entries
   ```

### 4. Commit Changes

**Command**: `*git-commit`

**Purpose**: Commit changes to feature branches

**Steps**:

1. **Stage Changes**:

   ```bash
   git add .
   git status
   ```

2. **Commit Changes**:

   ```bash
   git commit -m "feat: {requirement-title}

   - Add {specific-changes}
   - Update {modified-files}
   - Implement {new-functionality}

   Closes #{requirement-id}"
   ```

3. **Update Requirement Document**:
   - Add commit hash to requirement document
   - Record commit timestamp
   - Update changelog

### 5. Push Changes

**Command**: `*git-push`

**Purpose**: Push feature branches to remote repositories

**Steps**:

1. **Push Feature Branch**:

   ```bash
   git push origin feature/{req-id}-{title}
   ```

2. **Verify Remote Branch**:

   ```bash
   git ls-remote origin feature/{req-id}-{title}
   ```

3. **Update Requirement Document**:
   - Add remote branch URLs
   - Record push timestamp
   - Update branch status

### 6. Repository Status

**Command**: `*git-status`

**Purpose**: Check git status of all repositories

**Steps**:

1. **Check Each Repository**:

   ```bash
   cd /path/to/irisx-algo
   git status
   git branch -a
   git log --oneline -3
   ```

2. **Generate Status Report**:
   - Current branch in each repository
   - Uncommitted changes
   - Recent commits
   - Remote branch status

## Error Handling

### Repository Access Issues

- Check repository permissions
- Verify authentication credentials
- Test network connectivity

### Branch Conflicts

- Handle existing branches gracefully
- Switch to existing branches if they exist
- Merge or rebase as needed

### Commit Failures

- Check for uncommitted changes
- Verify commit message format
- Handle merge conflicts

## Success Criteria

- Feature branches created from caas-release in all repositories
- All changes committed to feature branches
- Feature branches pushed to remote repositories
- Requirement document updated with branch information
- All Git operations logged in changelog

## Notes

- Always work from caas-release branch as base
- Use consistent branch naming convention
- Update requirement document after each operation
- Handle errors gracefully with recovery options
- Maintain consistency across all three repositories
