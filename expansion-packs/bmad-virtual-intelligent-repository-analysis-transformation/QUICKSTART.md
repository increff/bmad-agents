# VIRAT Quickstart Guide for IRISX Developers

**VIRAT** = **V**IRTUAL **I**NTELLIGENT **R**epository **A**NALYSIS AND **T**RANSFORMATION

## 🚀 What is VIRAT?

VIRAT is an AI agent system that automates IRISX development workflows across your three interconnected repositories:
- **irisx-algo** (Java modules & business logic)
- **irisx-config** (TSV templates, SQL views, configs)  
- **ms-loadapis-ril-final** (Python load APIs)

## 📦 Installation Guide

### Prerequisites
- Node.js 16+ installed
- Access to all 3 IRISX repositories:
  - `irisx-algo` (Java codebase)
  - `irisx-config` (Configuration files)
  - `ms-loadapis-ril-final` (Python APIs)
- IDE: Cursor, Claude Code, or other supported IDE

### Step-by-Step Installation

#### 1. Navigate to Your Project Directory
```bash
cd /path/to/your/main/project
# This should be where you want VIRAT installed
# Usually your main development workspace
```

#### 2. Run BMAD Installer
```bash
npx bmad-method install
```

#### 3. Installation Prompts
**Project Directory:**
```
? Enter the full path to your project directory: /Users/yourname/projects/irisx-workspace
```

**Select VIRAT:**
```
? Select what to install/update:
  ☐ BMad Core
  ☑ VIRAT Repository Intelligence (v1.0.0)
```

**IDE Configuration:**
```
? Which IDE(s) do you want to configure:
  ☑ Cursor
  ☑ Claude Code
  ☐ Other IDEs...
```

**Repository Paths (CRITICAL):**
```
📋 VIRAT Repository Intelligence Configuration

? Enter the local path to your Algorithm repository (irisx-algo): 
  /Users/yourname/projects/irisx-algo

? Enter the local path to your Config repository (irisx-config):
  /Users/yourname/projects/irisx-config

? Enter the local path to your LoadAPIs repository (ms-loadapis-ril-final):
  /Users/yourname/projects/ms-loadapis-ril-final
```

#### 4. Verify Installation
After installation, check these directories exist:
```bash
ls -la .bmad-virtual-intelligent-repository-analysis-transformation/
# Should contain: agents/, tasks/, templates/, config.yaml

# For Cursor users:
ls -la .cursor/rules/bmad/
# Should contain: virat.mdc, algorithm-pattern-expert.mdc, etc.

# For Claude Code users:
ls -la .claude/commands/bmad-virtual-intelligent-repository-analysis-transformation/
# Should contain: agents/, tasks/
```

### Troubleshooting Installation

#### Common Issues

**1. Repository Path Errors**
```
Error: Cannot access repository at /path/to/repo
```
**Solution:** Ensure all 3 repository paths are correct and accessible

**2. Permission Issues**
```
Error: EACCES permission denied
```
**Solution:** Run with proper permissions or use `sudo` if needed

**3. Node.js Version**
```
Error: Unsupported Node.js version
```
**Solution:** Update to Node.js 16 or higher

**4. IDE Not Detected**
```
Warning: IDE configuration not found
```
**Solution:** Ensure your IDE is properly installed and configured

### Post-Installation Setup

#### 1. Verify Repository Access
Test that VIRAT can access your repositories:
```bash
# In your IDE, run:
/virat "Test repository access"
```

#### 2. Update Repository Paths (if needed)
Edit the config file if paths change:
```bash
# Edit this file:
.bmad-virtual-intelligent-repository-analysis-transformation/config.yaml

# Update the repositories section:
repositories:
  irisx-algo: "/new/path/to/irisx-algo"
  irisx-config: "/new/path/to/irisx-config"
  ms-loadapis-ril-final: "/new/path/to/ms-loadapis-ril-final"
```

#### 3. Team Installation
For team members, share the installation command:
```bash
# Each team member runs:
npx bmad-method install
# They'll be prompted for their local repository paths
```

## ⚡ Available Commands
After installation, use these commands in your IDE:

**Main Agent:**
- `/virat` - Main orchestrator for requirement analysis & implementation

**Specialized Experts:**
- `/algorithm-pattern-expert` - Java module creation & patterns
- `/config-pattern-expert` - TSV templates & SQL view generation  
- `/loadapi-pattern-expert` - Python load API development

## 🎯 Core Features

### 📋 Requirement Analysis
- **Auto-analyzes** business requirements
- **Maps** requirements to affected repositories
- **Identifies** required modules, configs, and APIs
- **Estimates** development effort (2-hour target)

### 🔧 Code Generation
- **Java Modules**: Creates AbstractModule extensions with proper patterns
- **Row Classes**: Generates input/output row files with validation
- **Load APIs**: Creates Python APIs with denormalization logic
- **Config Files**: Generates TSV templates and SQL views

### 🔄 Multi-Repo Coordination
- **Cross-repo** dependency tracking
- **Synchronized** changes across all 3 repositories
- **Consistent** naming and patterns
- **Automated** file updates and provider registrations

### ✅ Quality Assurance
- **Unit testing** for created features
- **Documentation** generation (usage guides, change logs)
- **Release notes** (business & technical)
- **Validation** against 44 IRISX development rules

## 🛠️ Development Workflow

### 1. Requirement Analysis Phase
```bash
/virat "Create distribution store module for new client onboarding"
```

**Process:**
1. Crawls all 3 repositories to understand current state
2. Analyzes requirement against existing patterns
3. Identifies dependencies and affected modules
4. Creates implementation plan with file mappings

### 2. Implementation Phase
**VIRAT executes in this order:**

**Step 1: Algorithm Repository**
- Creates `DistributionStoreModule.java` (extends AbstractUtilModuleGroup)
- Generates submodules (PrepareData, ProcessData, etc.)
- Creates `DistributionStoreArgs.java` with input parameters
- Generates Row classes (`DistributionStoreRow.java`)
- Updates provider registrations

**Step 2: Config Repository**
- Creates TSV templates (`export_dist_input_store_list_template.tsv`)
- Generates SQL views (`child-input-distribution-store.sql`)
- Creates sync configurations
- Updates JSON config files

**Step 3: LoadAPI Repository**
- Creates `DistributionStoreLoadApi.py`
- Implements denormalization logic
- Registers API endpoints
- Updates header configurations

### 3. Validation & Documentation
- Runs unit tests for generated modules
- Creates usage documentation
- Generates technical release notes
- Validates against IRISX coding standards

### Advanced Workflows

#### Modifying Existing Modules
```bash
/virat "Add store hierarchy validation to existing distribution module"
```
- Analyzes existing module structure
- Updates Args class with new fields
- Modifies validation logic
- Updates corresponding configs and APIs

#### Cross-Repository Dependencies
```bash
/virat "Create new export that depends on distribution and inventory data"
```
- Maps dependencies across repositories
- Ensures proper module loading order
- Creates synchronized configurations
- Updates all affected providers

#### Debugging & Analysis
```bash
# Analyze specific patterns
/algorithm-pattern-expert "Review distribution module dependencies"

# Check config consistency
/config-pattern-expert "Validate all distribution-related templates"

# API troubleshooting
/loadapi-pattern-expert "Debug denormalization issues in store API"
```

## 📁 What VIRAT Creates

### In irisx-algo:
- `AbstractModule` implementations
- Input/Output row classes
- Validation modules
- Provider registrations
- Unit tests

### In irisx-config:
- TSV export templates
- SQL view definitions
- JSON configurations
- Sync configurations

### In ms-loadapis-ril-final:
- Python load API classes
- Denormalization logic
- API registrations
- Header configurations

## 🔧 Technical Implementation Details

### File Generation Patterns
- **Module Classes**: Follow `AbstractUtilModuleGroup` → `AbstractModule` hierarchy
- **Args Classes**: One per module group, shared across submodules
- **Row Classes**: Input/Output pairs with proper validation
- **API Classes**: Python classes with denormalization methods
- **Config Files**: TSV templates with proper column mappings

### Code Standards Enforced
- Java: Proper annotations, dependency injection, error handling
- Python: Type hints, proper imports, exception handling  
- SQL: Parameterized queries, proper indexing hints
- TSV: Consistent column naming, data type validation

### Repository Synchronization
- **Dependency Resolution**: Ensures proper module loading order
- **Provider Updates**: Automatically registers new modules/APIs
- **Config Consistency**: Maintains naming consistency across repos
- **Version Compatibility**: Checks for breaking changes

## 💡 Usage Guidelines

1. **Specific Requirements**: Include module names, data types, business rules
2. **Existing Patterns**: Reference existing modules for consistency
3. **Validation Rules**: VIRAT applies all 44 IRISX development rules
4. **Code Review**: Generated code follows team standards but review before merge

## 🔧 Configuration

VIRAT is pre-configured with your repository paths:
- Algorithm: `{ALGO_REPO_PATH}`
- Config: `{CONFIG_REPO_PATH}`  
- LoadAPIs: `{LOADAPIS_REPO_PATH}`

## 📞 Troubleshooting

- **Generated Files**: Check `.bmad-virtual-intelligent-repository-analysis-transformation/` for logs
- **Rule Violations**: VIRAT validates against 44 IRISX development rules
- **Updates**: Re-run installer to get latest VIRAT features
- **Pattern Issues**: Use specialized experts for repository-specific problems
