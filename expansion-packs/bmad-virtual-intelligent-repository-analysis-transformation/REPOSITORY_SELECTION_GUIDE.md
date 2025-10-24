# VIRAT Repository Selection Guide

## Overview

VIRAT now features a **flexible repository selection menu** during installation that allows you to choose which repositories to configure, rather than requiring all repositories to be mandatory.

## 🎯 What Changed

### Before
- All four repositories were **required** to be added
- You had to provide paths for every repository
- Installation would fail if any repository was missing

### After (NEW)
- **Flexible checkbox menu** to select which repositories you want
- **At least one repository is required** (minimum selection)
- **Conditional path prompts** - only ask for paths of selected repositories
- **Optional repositories** like ms-mfp can be added later without reinstall

## 📋 Repository Selection Options

### Available Repositories

1. **irisx-algo** (Java/Spring Boot) ✓ Default Selected
   - Core business logic and algorithms
   - Mandatory for algorithm-related development

2. **irisx-config** (Configuration/SQL) ✓ Default Selected
   - TSV templates, SQL views, JSON configs
   - Essential for configuration management

3. **ms-loadapis-ril-final** (Python) ✓ Default Selected
   - Data ingestion and load APIs
   - Important for data processing workflows

4. **ms-mfp** (Python) ☐ Not Selected by Default
   - Monthly Forecast Planning system
   - Optional for MFP-specific workflows

5. **irisx-master** (Repository) ☐ Not Selected by Default
   - Master data and configurations repository
   - Optional for master data management workflows

## 🚀 Installation Process

### Step 1: Repository Selection Menu

When you run the installer, you'll see:

```
📋 VIRAT Repository Intelligence Configuration

? Select repositories to configure (use space to select, enter to continue):
❯ ◯ irisx-algo (Java/Spring Boot) - Core business logic & algorithms
  ◉ irisx-config (Configuration/SQL) - TSV templates & SQL views
  ◉ ms-loadapis-ril-final (Python) - Data loading & API services
  ◯ ms-mfp (Python) - Monthly Forecast Planning
  ◯ irisx-master (Repository) - Master data and configurations
```

### Step 2: Making Selections

**Using Your Keyboard:**
- **Space Bar** - Toggle selection (check/uncheck)
- **Arrow Up/Down** - Navigate between repositories
- **Enter** - Confirm your selections and proceed

**Selection Rules:**
- ✅ **Minimum**: Select at least 1 repository
- ✅ **Maximum**: Select all 5 repositories
- ✅ **Flexible**: Change selections anytime without reinstall

### Step 3: Dynamic Path Prompts

After you've selected repositories, VIRAT only asks for paths of the repositories you selected:

**Example 1: All three repositories selected**
```
? Enter the local path to your Algorithm repository (irisx-algo): 
  /path/to/irisx-algo

? Enter the local path to your Config repository (irisx-config):
  /path/to/irisx-config

? Enter the local path to your LoadAPIs repository (ms-loadapis-ril-final):
  /path/to/ms-loadapis-ril-final
```

**Example 2: Only Config and LoadAPIs selected**
```
? Enter the local path to your Config repository (irisx-config):
  /path/to/irisx-config

? Enter the local path to your LoadAPIs repository (ms-loadapis-ril-final):
  /path/to/ms-loadapis-ril-final

# (irisx-algo path NOT asked since it wasn't selected)
```

**Example 3: All four repositories selected**
```
? Enter the local path to your Algorithm repository (irisx-algo): 
  /path/to/irisx-algo

? Enter the local path to your Config repository (irisx-config):
  /path/to/irisx-config

? Enter the local path to your LoadAPIs repository (ms-loadapis-ril-final):
  /path/to/ms-loadapis-ril-final

? Enter the local path to your MFP repository (ms-mfp):
  /path/to/ms-mfp
```

## 📊 Common Selection Scenarios

### Scenario 1: Algorithm-Only Development
```
? Select repositories to configure:
  ✓ irisx-algo (Java/Spring Boot)
  ✗ irisx-config (Configuration/SQL)
  ✗ ms-loadapis-ril-final (Python)
  ✗ ms-mfp (Python)
```
**Use Case**: Working on pure business logic changes
**Result**: Only irisx-algo path is requested

### Scenario 2: Configuration Management
```
? Select repositories to configure:
  ✗ irisx-algo (Java/Spring Boot)
  ✓ irisx-config (Configuration/SQL)
  ✗ ms-loadapis-ril-final (Python)
  ✗ ms-mfp (Python)
```
**Use Case**: Creating SQL views, templates, JSON configs
**Result**: Only irisx-config path is requested

### Scenario 3: LoadAPI Development
```
? Select repositories to configure:
  ✗ irisx-algo (Java/Spring Boot)
  ✗ irisx-config (Configuration/SQL)
  ✓ ms-loadapis-ril-final (Python)
  ✗ ms-mfp (Python)
```
**Use Case**: Building data ingestion and API services
**Result**: Only ms-loadapis-ril-final path is requested

### Scenario 4: MFP-Focused Development
```
? Select repositories to configure:
  ✗ irisx-algo (Java/Spring Boot)
  ✗ irisx-config (Configuration/SQL)
  ✗ ms-loadapis-ril-final (Python)
  ✓ ms-mfp (Python)
```
**Use Case**: Working on Monthly Forecast Planning features
**Result**: Only ms-mfp path is requested

### Scenario 5: Cross-Repository Development
```
? Select repositories to configure:
  ✓ irisx-algo (Java/Spring Boot)
  ✓ irisx-config (Configuration/SQL)
  ✓ ms-loadapis-ril-final (Python)
  ✓ ms-mfp (Python)
```
**Use Case**: Complex end-to-end features spanning all repos
**Result**: All four repository paths are requested

### Scenario 6: Recommended Default Setup
```
? Select repositories to configure:
  ✓ irisx-algo (Java/Spring Boot)
  ✓ irisx-config (Configuration/SQL)
  ✓ ms-loadapis-ril-final (Python)
  ☐ ms-mfp (Python)
  ☐ irisx-master (Repository)
```
**Use Case**: Standard IRISX development (without optional repos)
**Result**: Three repository paths requested

### Scenario 7: Master Data Management
```
? Select repositories to configure:
  ✗ irisx-algo (Java/Spring Boot)
  ✗ irisx-config (Configuration/SQL)
  ✗ ms-loadapis-ril-final (Python)
  ✗ ms-mfp (Python)
  ✓ irisx-master (Repository)
```
**Use Case**: Working on master data and configurations
**Result**: Only irisx-master path is requested

## ⚙️ Managing Repository Paths

### After Installation

#### View Current Configuration
```bash
cat .bmad-virtual-intelligent-repository-analysis-transformation/config.yaml
# Shows: repositories section with only selected repos
```

#### Update Repository Paths
```bash
# Edit config file
edit .bmad-virtual-intelligent-repository-analysis-transformation/config.yaml

# Update the repositories section with new paths
repositories:
  irisx-algo: "/new/path/to/irisx-algo"
  irisx-config: "/new/path/to/irisx-config"
  ms-loadapis-ril-final: "/new/path/to/ms-loadapis-ril-final"
```

#### Add Missing Repository Later
If you need to add a repository later without full reinstall:

1. **Option 1**: Reinstall VIRAT and select additional repositories
   ```bash
   npx bmad-method install
   # Select both previous AND new repositories
   ```

2. **Option 2**: Manually edit config.yaml
   ```yaml
   repositories:
     irisx-algo: "/path/to/irisx-algo"
     irisx-config: "/path/to/irisx-config"
     ms-loadapis-ril-final: "/path/to/ms-loadapis-ril-final"
     ms-mfp: "/path/to/ms-mfp"  # Add this new entry
   ```

## 🔧 Technical Implementation

### Configuration Structure

The new system uses **conditional questions** based on checkbox selections:

```yaml
installation_questions:
  # Step 1: Multi-select menu
  - name: "selectedRepositories"
    type: "checkbox"
    message: "Select repositories to configure..."
    choices:
      - value: "irisx-algo"
        checked: true
      - value: "irisx-config"
        checked: true
      - value: "ms-loadapis-ril-final"
        checked: true
      - value: "ms-mfp"
        checked: false
    validate: "at-least-one"  # Require minimum 1 selection
  
  # Step 2: Conditional path questions
  - name: "algoRepoPath"
    condition: "selectedRepositories:irisx-algo"  # Only if algo selected
    
  - name: "configRepoPath"
    condition: "selectedRepositories:irisx-config"  # Only if config selected
    
  # ... more conditional questions
```

### Menu Features

- **Type**: `checkbox` (allows multi-select)
- **Validation**: `at-least-one` (ensures at least one repo selected)
- **Conditions**: Questions only shown if repository selected
- **Navigation**: Space to toggle, arrows to navigate, Enter to confirm

## ✅ Verification Checklist

After installation, verify your repository setup:

```bash
# 1. Check config file exists
ls -la .bmad-virtual-intelligent-repository-analysis-transformation/config.yaml

# 2. Verify selected repositories in config
grep -A 5 "repositories:" .bmad-virtual-intelligent-repository-analysis-transformation/config.yaml

# 3. Test VIRAT loads correctly
/virat
*status

# 4. Verify repository access
*switch-to-base-branches

# 5. Test with selected repositories only
*verify-repository-state
```

## 🆘 Troubleshooting

### Issue: "Please select at least one repository"
**Solution**: You must select at least one repository. Use Space to select at least one option.

### Issue: Path prompt for non-selected repository
**Solution**: Make sure you deselected that repository using Space key before pressing Enter.

### Issue: Repository path not being used
**Solution**: Check that the repository is included in `selectedRepositories` in your responses.

### Issue: Can't add more repositories later
**Solution**: You can reinstall VIRAT and select additional repositories, or manually edit the config.yaml file.

## 📚 Related Documentation

- **Installation Guide**: See QUICKSTART.md for step-by-step instructions
- **Configuration**: See config.yaml for all available settings
- **Repository Integration**: See docs/guides/multi-environment-support.md

## 🎉 Benefits

✅ **Flexible**: Choose exactly which repositories you need
✅ **Efficient**: Only provide paths for repositories you use
✅ **Scalable**: Add repositories later without full reinstall
✅ **User-Friendly**: Visual checkbox menu with clear descriptions
✅ **Validated**: Ensures at least one repository is configured
✅ **Smart**: Only asks questions relevant to your selections
