# VIRAT Quickstart Guide for IRISX Developers

**VIRAT** = **V**IRTUAL **I**NTELLIGENT **R**epository **A**NALYSIS AND **T**RANSFORMATION

## 🚀 What is VIRAT?

VIRAT is an AI agent system that automates IRISX development workflows across your three interconnected repositories:
- **irisx-algo** (Java modules & business logic)
- **irisx-config** (TSV templates, SQL views, configs)  
- **ms-loadapis-ril-final** (Python load APIs)

## ⚡ Quick Setup

### 1. Install VIRAT
```bash
cd /path/to/your/project
npx bmad-method install
# Select: VIRAT Repository Intelligence
# Enter paths to your 3 repos when prompted
```

### 2. Available Commands
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

## 🛠️ How to Use

### Basic Workflow
```bash
# 1. Start with requirement analysis
/virat "Create distribution store module for new client onboarding"

# 2. VIRAT will:
#    - Analyze the requirement
#    - Identify needed components across repos
#    - Generate implementation plan
#    - Create all necessary files
#    - Update configurations
#    - Generate documentation
```

### Specialized Tasks
```bash
# Algorithm-specific work
/algorithm-pattern-expert "Add validation for store hierarchy"

# Config-specific work  
/config-pattern-expert "Create export template for distribution data"

# LoadAPI-specific work
/loadapi-pattern-expert "Add denormalization for store location data"
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

## 🎯 Key Benefits

- **2-hour delivery** target for most requirements
- **95%+ success rate** with automated validation
- **Consistent patterns** across all repositories
- **Zero manual** file synchronization
- **Complete documentation** and testing
- **Business-ready** release notes

## 💡 Pro Tips

1. **Be Specific**: "Add store validation" → "Add store hierarchy validation for distribution module"
2. **Use Context**: VIRAT understands your existing codebase patterns
3. **Review Generated**: Always review generated code before committing
4. **Iterative**: Use VIRAT for refinements and updates too

## 🔧 Configuration

VIRAT is pre-configured with your repository paths:
- Algorithm: `{ALGO_REPO_PATH}`
- Config: `{CONFIG_REPO_PATH}`  
- LoadAPIs: `{LOADAPIS_REPO_PATH}`

## 📞 Support

- **Issues**: Check generated documentation in `.bmad-virtual-intelligent-repository-analysis-transformation/`
- **Patterns**: VIRAT follows all 44 IRISX development rules automatically
- **Updates**: Re-run installer to update VIRAT with new features

---

**Ready to 10x your IRISX development speed? Start with `/virat` and describe what you want to build!** 🚀
