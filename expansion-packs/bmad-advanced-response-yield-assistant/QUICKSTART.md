# ARYA Quickstart Guide for Developers

**ARYA** = **A**dvanced **R**esponse **Y**ield **A**ssistant

## 🚀 What is ARYA?

ARYA is an AI agent system that automates  development workflows across your four interconnected repositories with environment-specific intelligence:
- **irisx-algo** (Java modules & business logic)
- **irisx-config** (TSV templates, SQL views, configs)  
- **ms-mfp** (Python Monthly Forecast Planning)
- **ms-loadapis** (Python data loading & API services)

## 📦 Installation Guide

### Prerequisites
- Node.js 16+ installed
- Access to all 4 IRISX repositories:
  - `irisx-algo` (Java codebase)
  - `irisx-config` (Configuration files)
  - `ms-mfp` (Python MFP system)
  - `ms-loadapis` (Python LoadAPIs system)
- IDE: Cursor, Claude Code, or other supported IDE

### Step-by-Step Installation

#### 1. Navigate to Your Project Directory
```bash
cd /path/to/your/main/project
# This should be where you want ARYA installed
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

**Select ARYA:**
```
? Select what to install/update:
  ☐ BMad Core
  ☐ VIRAT Repository Intelligence
  ☑ ARYA Advanced Response Yield Assistant (v1.0.0)
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
📋 ARYA Advanced Response Yield Assistant Configuration

? Enter the local path to your Algorithm repository (irisx-algo): 
  /Users/yourname/projects/irisx-algo

? Enter the local path to your Config repository (irisx-config):
  /Users/yourname/projects/irisx-config

? Enter the local path to your MFP repository (ms-mfp):
  /Users/yourname/projects/ms-mfp

? Enter the local path to your LoadAPIs repository (ms-loadapis):
  /Users/yourname/projects/ms-loadapis
```

**Environment Selection (ARYA-Specific):**
```
? Which environment?
  ☐ Phoenix
  ☑ Reliance
```

#### 4. Environment Configuration
Based on your selection, ARYA will automatically configure the correct base branches:

**Phoenix Environment:**
- Algorithm Repository (irisx-algo): `master-adidas-reliance-prod`
- MFP Repository (ms-mfp): `release-pheonix`
- Configuration Repository (irisx-config): `master-adidas-ril`
- LoadAPIs Repository (ms-loadapis): `caas-pheonix-uploads`

**Reliance Environment:**
- Algorithm Repository (irisx-algo): `master-ril`
- MFP Repository (ms-mfp): `release-ril`
- Configuration Repository (irisx-config): `master-ril`
- LoadAPIs Repository (ms-loadapis): `caas-ril-uploads`

#### 5. Verify Installation
After installation, check these directories exist:
```bash
ls -la .bmad-advanced-response-yield-assistant/
# Should contain: agents/, tasks/, templates/, config.yaml

# For Cursor users:
ls -la .cursor/rules/bmad/
# Should contain: arya.mdc, mfp-pattern-expert.mdc, etc.

# For Claude Code users:
ls -la .claude/commands/bmad-advanced-response-yield-assistant/
# Should contain: agents/, tasks/
```

### Troubleshooting Installation

#### Common Issues

**1. Repository Path Errors**
```
Error: Cannot access repository at /path/to/repo
```
**Solution:** Ensure all 4 repository paths are correct and accessible

**2. Environment Branch Access**
```
Error: Cannot access branch master-ril
```
**Solution:** Ensure you have access to the environment-specific branches

**3. MFP Repository Issues**
```
Error: ms-mfp repository not found
```
**Solution:** Ensure ms-mfp repository path is correct (not ms-loadapis-ril-final)

**4. Environment Configuration**
```
Warning: Environment not properly configured
```
**Solution:** Re-run installation and select correct environment

### Post-Installation Setup

#### 1. Verify Repository Access and Environment
Test that ARYA can access your repositories and environment:
```bash
# In your IDE, run:
@arya
*status
```

#### 2. Validate Environment Configuration
```bash
@arya
*validate-environment
```

#### 3. Switch Environment (if needed)
```bash
@arya
*switch-environment phoenix  # or reliance
```

#### 4. Update Repository Paths (if needed)
Edit the config file if paths change:
```bash
# Edit this file:
.bmad-advanced-response-yield-assistant/config.yaml

# Update the repositories section:
repositories:
  irisx-algo: "/new/path/to/irisx-algo"
  irisx-config: "/new/path/to/irisx-config"
  ms-mfp: "/new/path/to/ms-mfp"
  ms-loadapis: "/new/path/to/ms-loadapis"
```

## ⚡ Available Commands
After installation, use these commands in your IDE:

**Main Agent:**
- `@arya` - Main orchestrator for requirement analysis & implementation

**Specialized Experts:**
- `/mfp-pattern-expert` - Python MFP module creation & forecasting patterns
- `/config-pattern-expert` - TSV templates & SQL view generation  
- `/algorithm-pattern-expert` - Java module creation & patterns

## 🎯 Core Features

### 📋 Environment-Aware Operations
- **Automatic Branch Management**: Switches to correct base branches based on environment
- **Environment Validation**: Validates environment-specific configurations
- **Cross-Repository Coordination**: Maintains environment consistency across repositories

### 🔧 Code Generation
- **Java Modules**: Creates AbstractModule extensions with proper patterns
- **Row Classes**: Generates input/output row files with validation
- **MFP Modules**: Creates Python MFP modules with forecasting logic
- **Config Files**: Generates TSV templates and SQL views

### 🔄 Multi-Repo Coordination
- **Cross-repo** dependency tracking
- **Synchronized** changes across all 3 repositories
- **Environment-specific** branch management
- **Consistent** naming and patterns
- **Automated** file updates and provider registrations

### ✅ Quality Assurance
- **Unit testing** for created features
- **Documentation** generation (usage guides, change logs)
- **Release notes** (business & technical)
- **Environment compliance** validation
- **Validation** against IRISX development rules

## 🛠️ Development Workflow

### 1. Environment Setup Phase
```bash
@arya
*status                    # Check current environment
*validate-environment      # Validate environment configuration
*switch-to-base-branches  # Switch to correct base branches
```

### 2. Requirement Analysis Phase
```bash
@arya
*implement "Create MFP forecast optimization module for Phoenix environment"
```

**Process:**
1. Crawls all 3 repositories to understand current state
2. Applies environment-specific context (Phoenix/Reliance)
3. Analyzes requirement against existing patterns
4. Identifies dependencies and affected modules
5. Creates implementation plan with file mappings

### 3. Implementation Phase
**ARYA executes in this order:**

**Step 1: Algorithm Repository**
- Creates modules following existing patterns
- Generates submodules with proper structure
- Creates Args classes with input parameters
- Generates Row classes with validation
- Updates provider registrations

**Step 2: Config Repository**
- Creates TSV templates with environment-specific data
- Generates SQL views with proper patterns
- Creates sync configurations
- Updates JSON config files

**Step 3: MFP Repository**
- Creates Python MFP modules with forecasting logic
- Implements data processing workflows
- Registers module endpoints
- Updates configuration mappings

### 4. Validation & Documentation
- Runs unit tests for generated modules
- Validates environment compliance
- Creates usage documentation
- Generates technical release notes
- Validates against IRISX coding standards

## 📁 What ARYA Creates

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

### In ms-mfp:
- Python MFP modules
- Forecasting algorithms
- Data processing workflows
- Module registrations

### In ms-loadapis:
- Python LoadAPIs modules
- Data loading services
- API management
- Upload processing workflows

## 🔧 Environment Management

### Phoenix Environment Operations
- Uses `master-adidas-reliance-prod` for algorithm repository
- Targets `release-pheonix` for MFP repository
- Operates on `master-adidas-ril` for configuration repository
- Applies Phoenix-specific validation rules and patterns

### Reliance Environment Operations
- Uses `master-ril` for algorithm repository
- Targets `release-ril` for MFP repository
- Operates on `master-ril` for configuration repository
- Applies Reliance-specific validation rules and patterns

### Environment Switching
```bash
# Switch to Phoenix environment
@arya
*switch-environment phoenix
*validate-environment
*switch-to-base-branches

# Switch to Reliance environment
@arya
*switch-environment reliance
*validate-environment
*switch-to-base-branches
```

## 💡 Usage Guidelines

1. **Environment Awareness**: Always validate environment before major operations
2. **Specific Requirements**: Include module names, data types, business rules
3. **Existing Patterns**: Reference existing modules for consistency
4. **Environment Compliance**: ARYA applies environment-specific validation rules
5. **Code Review**: Generated code follows team standards but review before merge

## 🔧 Configuration

ARYA is pre-configured with your repository paths and environment:
- Algorithm: `{ALGO_REPO_PATH}`
- Config: `{CONFIG_REPO_PATH}`  
- MFP: `{MFP_REPO_PATH}`
- Environment: `{ENVIRONMENT}` (Phoenix/Reliance)

## 📞 Troubleshooting

### Environment Issues
- **Wrong Environment**: Use `*switch-environment` to change
- **Branch Access**: Ensure you have access to environment-specific branches
- **Environment Validation**: Use `*validate-environment` to check configuration

### Repository Issues
- **Generated Files**: Check `.bmad-advanced-response-yield-assistant/` for logs
- **Rule Violations**: ARYA validates against IRISX development rules
- **Updates**: Re-run installer to get latest ARYA features
- **Pattern Issues**: Use specialized experts for repository-specific problems

### MFP-Specific Issues
- **MFP Patterns**: Use `/mfp-pattern-expert` for MFP-specific analysis
- **Forecasting Logic**: ARYA provides specialized MFP forecasting support
- **Python Issues**: Ensure Python 3.9+ and proper MFP repository access

## 🎯 Key Differences from VIRAT

### Repository Focus
- **ms-mfp** instead of **ms-loadapis-ril-final**
- **MFP Pattern Expert** for Monthly Forecast Planning
- **Enhanced Python Support** for forecasting algorithms

### Environment Intelligence
- **Phoenix/Reliance Environments** with specific base branches
- **Automatic Environment Configuration** during installation
- **Environment-Specific Validation** and compliance checking

### Enhanced Capabilities
- **Monthly Forecast Planning**: Specialized MFP algorithm support
- **Environment Awareness**: Complete environment-specific operations
- **Advanced Python Patterns**: Enhanced Python pattern recognition and generation

## 🚀 Quick Examples

### Basic Implementation
```bash
@arya
*implement requirement-document.md
```

### Environment Management
```bash
@arya
*status
*switch-environment phoenix
*validate-environment
```

### Expert Consultation
```bash
# MFP-specific analysis
/mfp-pattern-expert
*analyze-mfp-patterns

# Configuration analysis
/config-pattern-expert
*analyze-config

# Algorithm analysis
/algorithm-pattern-expert
*analyze-modules
```

ARYA provides a complete, environment-aware development automation solution specifically designed for Phoenix and Reliance environments with enhanced MFP support!
