# VIRAT Command Reference

## Complete Command Documentation

---

## 🎯 **COMMAND OVERVIEW**

All VIRAT commands start with `*` (asterisk). Commands are organized by category for easy reference.

---

## 🚀 **CORE COMMANDS**

### **`*help`**

**Purpose**: Show numbered list of all available commands
**Usage**: `*help`
**Example**:

```
*help
```

**Output**: Numbered list of all available commands for selection

### **`*implement`**

**Purpose**: Execute complete requirement implementation workflow with single command
**Usage**: `*implement <requirement-file>`
**Example**:

```
*implement requirement-123.md
```

**Features**:

- Analyzes requirement document
- Crawls repositories for patterns
- Creates implementation plan
- Executes implementation
- Validates results
- Updates documentation

### **`*analyze`**

**Purpose**: Analyze requirement document and create implementation plan
**Usage**: `*analyze <requirement-file>`
**Example**:

```
*analyze new-feature-requirement.md
```

**Features**:

- Requirement analysis
- Repository crawling
- Pattern recognition
- Module identification
- Implementation planning

### **`*crawl`**

**Purpose**: Crawl repositories to understand current state and patterns
**Usage**: `*crawl [repository-type]`
**Example**:

```
*crawl
*crawl loadapi
*crawl config
*crawl algorithm
```

**Features**:

- Repository structure discovery
- Pattern identification
- Module mapping
- Dependency analysis

### **`*validate`**

**Purpose**: Validate implementation against existing patterns and tests
**Usage**: `*validate [validation-type]`
**Example**:

```
*validate
*validate pre-implementation
*validate post-implementation
```

**Features**:

- Pattern compliance checking
- Test execution
- Integration validation
- Quality assurance

### **`*document`**

**Purpose**: Update requirement document with consolidated implementation results
**Usage**: `*document <requirement-file>`
**Example**:

```
*document requirement-123.md
```

**Features**:

- Branch URL updates
- Changelog generation
- Test case documentation
- PRD updates

### **`*status`**

**Purpose**: Show current implementation status and progress
**Usage**: `*status`
**Example**:

```
*status
```

**Features**:

- Current operation status
- Progress indicators
- Error status
- Next steps

---

## 🔧 **CONFIGURATION COMMANDS**

### **`*config`**

**Purpose**: Manage repository configuration and settings
**Usage**: `*config [action]`
**Example**:

```
*config show
*config set repository-path /path/to/repo
*config validate
```

**Features**:

- Configuration display
- Settings management
- Validation
- Backup/restore

### **`*configure-repo-paths`**

**Purpose**: Configure repository paths for LoadAPI, Config, and Algorithm repos
**Usage**: `*configure-repo-paths`
**Example**:

```
*configure-repo-paths
```

**Features**:

- Interactive path configuration
- Path validation
- Environment support
- Configuration persistence

### **`*backup-configurations`**

**Purpose**: Backup and restore configuration files
**Usage**: `*backup-configurations [action]`
**Example**:

```
*backup-configurations create
*backup-configurations restore
```

**Features**:

- Configuration backup
- Restore capabilities
- Version management
- Automated backups

---

## 🔍 **REPOSITORY-SPECIFIC COMMANDS**

### **LoadAPI Repository Commands**

#### **`*discover-loadapi-registrations`**

**Purpose**: Discover and validate all LoadAPI registrations across modules
**Usage**: `*discover-loadapi-registrations`
**Example**:

```
*discover-loadapi-registrations
```

**Features**:

- Discovers 127+ LoadAPI classes
- Validates `__init__.py` registrations
- Checks `loadapi_provider.py` mappings
- Auto-fixes missing registrations

#### **`*validate-loadapi-patterns`**

**Purpose**: Analyze and validate LoadAPI implementation patterns
**Usage**: `*validate-loadapi-patterns`
**Example**:

```
*validate-loadapi-patterns
```

**Features**:

- Pattern analysis
- Template generation
- Structure validation
- Violation detection

#### **`*map-loadapi-imports`**

**Purpose**: Map LoadAPI import IDs and validate configuration integration
**Usage**: `*map-loadapi-imports`
**Example**:

```
*map-loadapi-imports
```

**Features**:

- Import ID mapping
- Configuration validation
- Orphaned ID detection
- Auto-generation

### **Configuration Repository Commands**

#### **`*validate-config-schemas`**

**Purpose**: Validate configuration schemas and ensure consistency
**Usage**: `*validate-config-schemas`
**Example**:

```
*validate-config-schemas
```

**Features**:

- JSON schema validation
- Template consistency
- SQL view validation
- Auto-fixing

#### **`*analyze-config-impact`**

**Purpose**: Analyze configuration change impact and manage migrations
**Usage**: `*analyze-config-impact`
**Example**:

```
*analyze-config-impact
```

**Features**:

- Impact analysis
- Migration planning
- Rollback mechanisms
- Change tracking

#### **`*manage-config-templates`**

**Purpose**: Generate and validate configuration templates
**Usage**: `*manage-config-templates`
**Example**:

```
*manage-config-templates
```

**Features**:

- Template generation
- Completeness validation
- Duplicate detection
- Auto-updates

### **Algorithm Repository Commands**

#### **`*map-module-data-relationships`**

**Purpose**: Map module to data row relationships and validate usage
**Usage**: `*map-module-data-relationships`
**Example**:

```
*map-module-data-relationships
```

**Features**:

- Module-data mapping
- Usage validation
- Mismatch detection
- Flow diagrams

#### **`*validate-module-patterns`**

**Purpose**: Analyze module implementation patterns
**Usage**: `*validate-module-patterns`
**Example**:

```
*validate-module-patterns
```

**Features**:

- Pattern analysis
- Structure validation
- Template generation
- Dependency injection

#### **`*validate-cross-repo-integration`**

**Purpose**: Validate cross-repository integration and compatibility
**Usage**: `*validate-cross-repo-integration`
**Example**:

```
*validate-cross-repo-integration
```

**Features**:

- Integration validation
- Breaking change detection
- Test generation
- Contract validation

---

## 🔄 **GIT OPERATIONS**

### **`*git-branch`**

**Purpose**: Create feature branches from caas-release in all affected repositories
**Usage**: `*git-branch <branch-name>`
**Example**:

```
*git-branch feature/new-loadapi
```

**Features**:

- Branch creation
- caas-release base
- Multi-repository support
- Branch validation

### **`*git-checkout`**

**Purpose**: Switch to feature branches in repositories
**Usage**: `*git-checkout <branch-name>`
**Example**:

```
*git-checkout feature/new-loadapi
```

**Features**:

- Branch switching
- Multi-repository support
- Status validation
- Error handling

### **`*git-commit`**

**Purpose**: Commit changes to feature branches
**Usage**: `*git-commit <message>`
**Example**:

```
*git-commit "Add new LoadAPI implementation"
```

**Features**:

- Change staging
- Commit creation
- Message validation
- Multi-repository support

### **`*git-push`**

**Purpose**: Push feature branches to remote repositories
**Usage**: `*git-push`
**Example**:

```
*git-push
```

**Features**:

- Remote pushing
- Multi-repository support
- Error handling
- Status reporting

### **`*git-status`**

**Purpose**: Check git status of all repositories
**Usage**: `*git-status`
**Example**:

```
*git-status
```

**Features**:

- Status checking
- Multi-repository support
- Change detection
- Branch information

---

## 📊 **MONITORING & ANALYTICS**

### **`*monitor-progress`**

**Purpose**: Monitor real-time implementation progress and status
**Usage**: `*monitor-progress`
**Example**:

```
*monitor-progress
```

**Features**:

- Real-time tracking
- Progress indicators
- Status updates
- Performance metrics

### **`*monitor-performance`**

**Purpose**: Monitor performance metrics and resource usage
**Usage**: `*monitor-performance`
**Example**:

```
*monitor-performance
```

**Features**:

- Performance tracking
- Resource monitoring
- Metrics collection
- Trend analysis

### **`*generate-reports`**

**Purpose**: Generate monitoring reports and analytics
**Usage**: `*generate-reports [report-type]`
**Example**:

```
*generate-reports
*generate-reports performance
*generate-reports quality
```

**Features**:

- Report generation
- Analytics compilation
- Trend analysis
- Export capabilities

### **`*collect-analytics`**

**Purpose**: Collect implementation, performance, and quality analytics
**Usage**: `*collect-analytics`
**Example**:

```
*collect-analytics
```

**Features**:

- Data collection
- Analytics processing
- Trend identification
- Insights generation

---

## 🛠️ **ADVANCED FEATURES**

### **`*recognize-patterns`**

**Purpose**: Analyze and recognize implementation patterns
**Usage**: `*recognize-patterns`
**Example**:

```
*recognize-patterns
```

**Features**:

- Pattern discovery
- Context analysis
- Learning capabilities
- Best practice identification

### **`*detect-anti-patterns`**

**Purpose**: Detect and prevent anti-patterns and common mistakes
**Usage**: `*detect-anti-patterns`
**Example**:

```
*detect-anti-patterns
```

**Features**:

- Anti-pattern detection
- Mistake prevention
- Quality assurance
- Improvement suggestions

### **`*suggest-patterns`**

**Purpose**: Suggest best patterns for specific requirements
**Usage**: `*suggest-patterns`
**Example**:

```
*suggest-patterns
```

**Features**:

- Pattern recommendations
- Context-aware suggestions
- Best practice guidance
- Implementation advice

### **`*analyze-dependencies`**

**Purpose**: Analyze module dependencies and build dependency graph
**Usage**: `*analyze-dependencies`
**Example**:

```
*analyze-dependencies
```

**Features**:

- Dependency mapping
- Graph generation
- Impact analysis
- Risk assessment

### **`*predict-impact`**

**Purpose**: Predict impact of changes on dependent modules
**Usage**: `*predict-impact`
**Example**:

```
*predict-impact
```

**Features**:

- Impact prediction
- Risk assessment
- Change analysis
- Recommendation generation

---

## 🚨 **ERROR HANDLING**

### **`*detect-errors`**

**Purpose**: Detect and classify errors at all implementation stages
**Usage**: `*detect-errors`
**Example**:

```
*detect-errors
```

**Features**:

- Error detection
- Classification
- Severity assessment
- Recovery suggestions

### **`*recover-from-errors`**

**Purpose**: Automatically recover from errors and failures
**Usage**: `*recover-from-errors`
**Example**:

```
*recover-from-errors
```

**Features**:

- Automatic recovery
- Error resolution
- State restoration
- Continuation support

### **`*resolve-conflicts`**

**Purpose**: Automatically resolve merge and dependency conflicts
**Usage**: `*resolve-conflicts`
**Example**:

```
*resolve-conflicts
```

**Features**:

- Conflict detection
- Automatic resolution
- Manual intervention
- Resolution validation

### **`*rollback-changes`**

**Purpose**: Rollback to previous stable state on critical failures
**Usage**: `*rollback-changes`
**Example**:

```
*rollback-changes
```

**Features**:

- State rollback
- Change reversal
- Safety validation
- Recovery confirmation

---

## 📚 **DOCUMENTATION**

### **`*generate-documentation`**

**Purpose**: Generate comprehensive documentation for all implementations
**Usage**: `*generate-documentation`
**Example**:

```
*generate-documentation
```

**Features**:

- Documentation generation
- Code documentation
- API specifications
- User guides

### **`*update-documentation`**

**Purpose**: Update existing documentation with changes and improvements
**Usage**: `*update-documentation`
**Example**:

```
*update-documentation
```

**Features**:

- Documentation updates
- Change tracking
- Version management
- Consistency validation

### **`*validate-documentation`**

**Purpose**: Validate documentation consistency and completeness
**Usage**: `*validate-documentation`
**Example**:

```
*validate-documentation
```

**Features**:

- Consistency checking
- Completeness validation
- Quality assurance
- Improvement suggestions

---

## 🧪 **TESTING**

### **`*generate-tests`**

**Purpose**: Generate comprehensive tests based on implementation patterns
**Usage**: `*generate-tests`
**Example**:

```
*generate-tests
```

**Features**:

- Test generation
- Pattern-based testing
- Coverage analysis
- Quality assurance

### **`*execute-tests`**

**Purpose**: Execute relevant tests after implementation
**Usage**: `*execute-tests`
**Example**:

```
*execute-tests
```

**Features**:

- Test execution
- Result analysis
- Failure reporting
- Performance testing

### **`*analyze-coverage`**

**Purpose**: Analyze test coverage and ensure adequate coverage
**Usage**: `*analyze-coverage`
**Example**:

```
*analyze-coverage
```

**Features**:

- Coverage analysis
- Gap identification
- Improvement suggestions
- Quality metrics

---

## 🚪 **SESSION MANAGEMENT**

### **`*exit`**

**Purpose**: Say goodbye as the ADS Orchestrator Enhanced and abandon persona
**Usage**: `*exit`
**Example**:

```
*exit
```

**Features**:

- Session termination
- Cleanup operations
- Status preservation
- Farewell message

---

## 📋 **COMMAND COMBINATIONS**

### **Complete Implementation Workflow**

```
*configure-repo-paths
*analyze requirement.md
*implement requirement.md
*validate
*document requirement.md
```

### **Repository Analysis Workflow**

```
*crawl
*discover-loadapi-registrations
*validate-config-schemas
*validate-module-patterns
*validate-cross-repo-integration
```

### **Error Recovery Workflow**

```
*detect-errors
*recover-from-errors
*resolve-conflicts
*rollback-changes
```

### **Monitoring Workflow**

```
*monitor-progress
*collect-analytics
*generate-reports
*analyze-trends
```

---

## 🎯 **BEST PRACTICES**

### **Command Usage**

1. **Always use `*` prefix** for all commands
2. **Check status first** with `*status` before major operations
3. **Validate configurations** with `*validate-config-schemas` regularly
4. **Monitor progress** with `*monitor-progress` during long operations

### **Error Prevention**

1. **Run discovery commands** before implementation
2. **Validate patterns** before making changes
3. **Check dependencies** before modifications
4. **Use rollback** for critical failures

### **Efficiency Tips**

1. **Use single commands** for complete workflows
2. **Leverage automation** for repetitive tasks
3. **Monitor performance** for optimization
4. **Collect analytics** for insights

---

## 🚀 **READY TO USE!**

This command reference provides complete documentation for all VIRAT commands. Use it as a reference guide for optimal command usage and workflow efficiency.

**Remember**: All commands start with `*` and are designed to work together for comprehensive development automation! 🎯
