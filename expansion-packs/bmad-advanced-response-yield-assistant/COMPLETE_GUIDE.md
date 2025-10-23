# ARYA Complete Guide - Quickstart & Development Flow

**ARYA** = **A**dvanced **R**esponse **Y**ield **A**ssistant

---

## 🚀 What is ARYA?

ARYA is an AI agent system that automates development workflows across your four interconnected repositories with environment-specific intelligence:
- **irisx-algo** (Java modules & business logic)
- **irisx-config** (TSV templates, SQL views, configs)  
- **ms-mfp** (Python Monthly Forecast Planning)
- **ms-loadapis** (Python data loading & API services)

### Key Features

- **Environment-Aware Operations**: Automatic Phoenix/Reliance differentiation
- **Multi-Repository Coordination**: Handles four interconnected repositories simultaneously
- **Pattern-Based Development**: Analyzes existing patterns and follows them for consistency
- **Automated Workflow**: Complete development lifecycle from requirement analysis to implementation
- **Specialized Workflows**: WSSI-MFP (Phoenix) and WSSI-OTB (Reliance) support
- **Real Git Operations**: Performs actual branch creation, commits, and repository operations
- **Comprehensive Validation**: Runs existing validation modules and tests with environment compliance
- **Documentation Updates**: Updates requirement documents with implementation results

---

## 📦 Installation Guide

### Prerequisites

- **Node.js 16+** installed
- **Git** installed and configured
- Access to all 4 repositories:
  - `irisx-algo` (Java codebase, Maven, JDK 8/11)
  - `irisx-config` (Configuration files, PostgreSQL or compatible)
  - `ms-mfp` (Python 3.9+, pip)
  - `ms-loadapis` (Python 3.9+, pip)
- **IDE**: Cursor, Claude Code, or other supported IDE

### Step-by-Step Installation

#### 1. Navigate to Your Project Directory
```bash
cd /path/to/your/main/project
# This should be your main development workspace
```

#### 2. Run BMAD Installer
```bash
npx bmad-method install
```

#### 3. Installation Prompts

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
📋 ARYA Configuration

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

#### 4. Verify Installation
```bash
ls -la .bmad-advanced-response-yield-assistant/
# Should contain: agents/, tasks/, templates/, config.yaml

# For Cursor users:
ls -la .cursor/rules/bmad/
# Should contain: arya.mdc, mfp-pattern-expert.mdc, etc.
```

### Troubleshooting Installation

**Repository Path Errors:**
```
Error: Cannot access repository at /path/to/repo
```
**Solution:** Ensure all 4 repository paths are correct and accessible

**Environment Branch Access:**
```
Error: Cannot access branch master-ril
```
**Solution:** Ensure you have access to environment-specific branches

### Post-Installation Setup

#### Verify Repository Access and Environment
```bash
@arya
*status
```

#### Validate Environment Configuration
```bash
@arya
*validate-environment
```

---

## 🌐 Environment Configuration

ARYA supports two environments with different base branches:

### Phoenix Environment

**Base Branches:**
- **Algorithm Repository (`irisx-algo`)**: `master-adidas-reliance-prod`
- **MFP Repository (`ms-mfp`)**: `release-pheonix`
- **Configuration Repository (`irisx-config`)**: `master-adidas-ril`
- **LoadAPIs Repository (`ms-loadapis`)**: `caas-pheonix-uploads`

**Specialized Workflow:** WSSI-MFP (WSSI to MFP transformation)

### Reliance Environment

**Base Branches:**
- **Algorithm Repository (`irisx-algo`)**: `master-ril`
- **MFP Repository (`ms-mfp`)**: `release-ril`
- **Configuration Repository (`irisx-config`)**: `master-ril`
- **LoadAPIs Repository (`ms-loadapis`)**: `caas-ril-uploads`

**Specialized Workflow:** WSSI-OTB (WSSI snapshot lifecycle to OTB submission)

---

## ⚡ Quick Start Commands

### Main Agent
- `@arya` - Main orchestrator for requirement analysis & implementation

### Specialized Experts
- `/mfp-pattern-expert` - Python MFP module creation & forecasting patterns
- `/config-pattern-expert` - TSV templates & SQL view generation  
- `/algorithm-pattern-expert` - Java module creation & patterns
- `/loadapis-pattern-expert` - LoadAPIs patterns & data loading

### Essential Commands

```bash
# Check current status
*status

# Validate environment
*validate-environment

# Switch environment
*switch-environment phoenix  # or reliance

# Complete implementation (single command)
*implement requirement-document.md

# Environment-aware implementation
*implement requirement-document.md --environment phoenix
```

---

## 🚀 Complete Development Flow

This section outlines the complete 24-step development flow with environment-aware intelligence.

### Prerequisites

1. **Activate ARYA Agent**: Load the environment-aware ARYA agent
2. **Environment Selection**: Choose Phoenix or Reliance environment
3. **Repository Access**: Ensure access to all four repositories
4. **Requirement Document**: Have the requirement document ready

---

## PHASE 0: ENVIRONMENT PREPARATION

### Step 0.1: Environment Verification

```bash
*verify-environment
```

**Purpose**: Verify current environment configuration (Phoenix or Reliance)

**Actions**:
- Verify environment selection (Phoenix or Reliance)
- Validate repository paths for all four repositories
- Check branch configuration for environment
- Validate dependencies (Node.js, Git, Java, Python)

**Output**:
- Current environment confirmation
- Repository path validation results
- Base branch configuration confirmation
- Prerequisite validation results

### Step 0.2: Switch to Base Branches

```bash
*switch-to-base-branches
```

**Purpose**: Switch to correct base branches in ACTUAL REPOSITORIES before any analysis

**Actions**:
- **CRITICAL**: Switch branches in ACTUAL repositories, NOT in BMAD project
- **Environment-Specific Switching**:
  - **Phoenix**: Switch to Phoenix base branches
  - **Reliance**: Switch to Reliance base branches
- Pull latest changes from remote for each base branch
- Verify working directory is clean

**Output**:
- Confirmation all repositories are on correct base branches
- Latest code pulled from remote
- Clean working directories verified

### Step 0.3: Repository State Verification

```bash
*verify-repository-state
```

**Purpose**: Verify all repositories are on correct branches and clean

**Actions**:
- Verify current branch matches expected base branch
- Check for uncommitted changes or conflicts
- Verify remote connectivity and latest commits
- Validate repository structure integrity

**Output**:
- Repository state verification report
- Branch confirmation for all four repositories
- Clean state confirmation
- Issues or conflicts identified

---

## PHASE 1: INTELLIGENT REQUIREMENT & REPOSITORY ANALYSIS

### Step 1: Deep Requirement Analysis with Environment Context

```bash
*analyze-requirement-with-context [requirement-document.md]
```

**Purpose**: Analyze requirement with environment-specific context

**Actions**:
- **Load BMAD Analyst Persona**: Activate `@bmad-core/agents/analyst.md`
- **Deep Requirement Understanding**: Analyze business logic, data structures, technical specs
- **Environment-Specific Analysis**: Apply Phoenix or Reliance context
- **Intelligent Classification**: Classify to avoid over-engineering:
  - **Config-Only**: Template changes, SQL views, JSON configs
  - **LoadAPIs-Only**: Upload changes, data processing
  - **MFP-Only**: Forecasting, MFP views, snapshots, routes
  - **Algorithm-Only**: Business logic, calculations, new modules
  - **Cross-Repository**: End-to-end workflows, WSSI workflows
- **Scope Limitation**: Determine ONLY repositories that need modification
- **Workflow Type Detection**: Identify WSSI-MFP (Phoenix) or WSSI-OTB (Reliance)

**Output**:
- Comprehensive requirement analysis report
- Repository scope limitation with environment context
- Complexity assessment (High/Medium/Low)
- Workflow type identification
- Environment-specific considerations

### Step 2: Systematic Repository Crawling with Environment Context

```bash
*crawl-repos-with-environment-context
```

**Purpose**: Systematically crawl all repositories with environment awareness

**Actions**:
- **Environment-Specific Repository Analysis**:
  - **Phoenix**: Analyze Phoenix-specific base branches
  - **Reliance**: Analyze Reliance-specific base branches
- **Pattern Discovery**: Identify existing similar implementations
- **Code Structure Analysis**: Analyze structures, naming conventions, patterns
- **Dependency Mapping**: Map cross-repository dependencies
- **Environment-Specific Patterns**: Identify Phoenix or Reliance patterns

**Output**:
- Systematic repository analysis with environment context
- Pattern inventory with environment awareness
- Similar implementation identification
- Cross-repository dependency mapping
- Environment-specific pattern analysis

### Step 3: Parallel Expert Pattern Analysis

```bash
*expert-pattern-analysis
```

**Purpose**: Delegate to all expert agents in parallel

**Actions**:
- **Algorithm Expert**: Analyze algorithm patterns, module structures
- **MFP Expert**: Analyze MFP patterns, forecasting workflows, environment-specific MFP
- **Config Expert**: Analyze configuration patterns, SQL views
- **LoadAPIs Expert**: Analyze LoadAPIs patterns, environment-specific LoadAPIs
- **Cross-Repository Analysis**: Analyze integration patterns

**Output**:
- Algorithm-specific patterns
- MFP patterns with environment context
- Configuration patterns
- LoadAPIs patterns with environment context
- Cross-repository integration patterns

### Step 4: Comprehensive Validation

```bash
*validate-requirement-and-repos
```

**Purpose**: Validate requirement against patterns and consistency

**Actions**:
- Validate against core implementation patterns
- Validate cross-repository consistency with environment awareness
- Validate pattern compliance for Phoenix or Reliance
- Assess pattern compliance across changes
- Validate environment-specific constraints

**Output**:
- Pattern compliance assessment
- Cross-repository consistency validation
- Environment-specific compliance verification
- Potential issues identified
- Environment constraint validation

### Step 5: Comprehensive Dependency Mapping

```bash
*map-comprehensive-dependencies
```

**Purpose**: Map cross-module dependencies with environment-specific impacts

**Actions**:
- Map dependencies across all four repositories
- Analyze cascading impacts with environment awareness
- Identify critical dependency paths
- Assess change impact on existing modules
- Create comprehensive dependency graph

**Output**:
- Module dependency graph across all repositories
- Cascading impact analysis with environment context
- Critical dependency path identification
- Change impact assessment matrix
- Environment-specific dependency considerations

---

## PHASE 2: IMPLEMENTATION PLANNING & VALIDATION

### Step 6: Environment-Aware Implementation Plan Creation

```bash
*create-implementation-plan
```

**Purpose**: Create environment-compliant implementation plan

**Output**: Detailed plan with environment-specific considerations, file changes, sequencing

### Step 7: Thorough Plan Validation with BMAD PM

```bash
*validate-plan-with-pm
```

**Purpose**: Use BMAD PM persona to validate implementation plan

**Actions**:
- **Load BMAD PM Persona**: Activate `@bmad-core/agents/pm.md`
- **Requirements Traceability**: Ensure all aspects covered
- **Resource Assessment**: Validate requirements and availability
- **Timeline Validation**: Assess timeline and dependencies
- **Risk Assessment**: Identify risks and mitigation
- **Environment Compliance**: Validate Phoenix or Reliance compliance
- **Stakeholder Impact**: Assess stakeholder impact
- **Quality Gates**: Ensure quality gates defined

**Output**:
- Comprehensive plan validation with PM insights
- Requirements traceability matrix
- Resource and timeline assessment
- Risk analysis with mitigation
- Environment compliance verification
- Stakeholder impact analysis

### Step 8: Risk Analysis

```bash
*analyze-risks
```

**Purpose**: Analyze implementation risks with environment considerations

**Output**: Risk assessment with environment-specific risks, mitigation strategies

### Step 9: Testing Strategy Planning

```bash
*plan-testing
```

**Purpose**: Plan comprehensive testing with environment awareness

**Output**: Testing plan, test cases, coverage requirements, environment-specific tests

### Step 10: Rollback Strategy Planning

```bash
*plan-rollback
```

**Purpose**: Plan rollback strategy for environment-specific implementations

**Output**: Rollback procedures, recovery checkpoints, failure scenarios, environment rollback

---

## PHASE 3: GUIDED IMPLEMENTATION

### Step 11: Feature Branch Creation

```bash
*implement-guided --create-branches
```

**Actions**:
- Create feature branches from environment-specific base branches
- **Phoenix**: Create from Phoenix base branches
- **Reliance**: Create from Reliance base branches

**Naming Convention**: `feature/{req-id}-{descriptive-name}`

### Step 12: Environment-Aware Development with BMAD Dev

```bash
*implement-with-dev
```

**Purpose**: Use BMAD dev persona for ACTUAL brownfield development

**Actions**:
- **Load BMAD Dev Persona**: Activate `@bmad-core/agents/dev.md`
- **ACTUAL Code Implementation**: Make REAL CODE CHANGES (NOT A SIMULATION)
- **Algorithm Repository**: Create/modify modules, Row classes, File classes
- **MFP Repository**: Create/modify MFP modules, routes, services, forecasting
- **Configuration Repository**: Create/modify SQL views, templates, JSON configs
- **LoadAPIs Repository**: Create/modify LoadAPIs classes, upload processing, API services
- **Environment-Specific Implementation**: Apply Phoenix or Reliance patterns
- **Continuous Validation**: Validate against established patterns
- **Pattern Adherence**: Follow discovered patterns exactly
- **Cross-Repository Coordination**: Maintain consistency across all four repositories

**Output**:
- Implementation progress with brownfield best practices
- Continuous validation results
- Environment-specific pattern compliance
- Cross-repository consistency maintained

### Step 13: Implementation Validation

```bash
*validate-implementation
```

**Purpose**: Validate implementation against patterns and environment requirements

**Output**: Validation report, pattern compliance, environment compliance

### Step 14: Testing Implementation

```bash
*test-implementation
```

**Purpose**: Execute comprehensive testing with environment-specific tests

**Actions**:
- Unit tests for static methods
- Integration tests across repositories
- Cross-dependency testing
- Environment-specific testing (Phoenix or Reliance)

**Output**: Test results, coverage reports, environment test results

### Step 15: Implementation Documentation

```bash
*document-implementation
```

**Purpose**: Document implementation IN THE ORIGINAL REQUIREMENT DOCUMENT

**Actions**:
- **Update Original Requirement Document**: Add all implementation details
- **No Separate Files**: Do not create separate documentation files
- **Complete Implementation Details**: Add changes, decisions, analysis
- **Git References**: Add commit references and branch information
- **Testing Results**: Add test results and coverage reports
- **Quality Metrics**: Add quality and compliance metrics
- **Environment Context**: Add environment-specific notes

**Output**: Original requirement document updated with complete implementation

---

## PHASE 4: QUALITY ASSURANCE & DEPLOYMENT

### Step 16: Comprehensive Quality Check

```bash
*quality-check
```

**Purpose**: Perform comprehensive quality checks with environment awareness

**Actions**:
- Code quality validation
- Pattern compliance verification
- Cross-repository consistency check
- Environment-specific compliance check
- Performance impact assessment

**Output**: Quality assessment, compliance verification, environment compliance

### Step 17: Deployment Validation

```bash
*validate-deployment
```

**Purpose**: Validate deployment readiness with environment considerations

**Actions**:
- Pre-deployment validation
- Integration readiness check
- Rollback procedure verification
- Environment-specific deployment validation

**Output**: Deployment readiness report

### Step 18: Git Operations

```bash
# Commit changes
*implement-guided --commit

# Push feature branches
*implement-guided --push
```

**Actions**:
- Commit changes to feature branches
- Push feature branches to remote repositories
- Create pull requests (if configured)

### Step 19: Pull Request Generation

```bash
*generate-pr-descriptions
```

**Purpose**: Generate comprehensive PR descriptions for all repositories

**Actions**:
- Generate PR descriptions for each affected repository
- Include environment-specific context (Phoenix/Reliance)
- Link related PRs across repositories
- Include review checklists and next steps

**Output**: Comprehensive PR descriptions file with environment context

### Step 20: Post-Deployment Validation

```bash
*post-deployment-validation
```

**Purpose**: Validate post-deployment state with environment validation

**Actions**:
- Functional validation
- Performance monitoring
- Error monitoring
- Integration validation
- Environment-specific validation

**Output**: Post-deployment validation report

---

## 🔀 SPECIALIZED WORKFLOW COMMANDS

### WSSI-MFP Workflow (Phoenix Environment Only)

```bash
*wssi-mfp-workflow <requirement-document.md>     # Complete WSSI-MFP workflow
*analyze-wssi-requirements                        # Analyze WSSI requirements
*standardize-wssi-data                            # Standardize WSSI data
*generate-mfp-views                               # Generate MFP views
*create-mfp-snapshots                             # Create MFP snapshots
*validate-wssi-mfp-flow                           # Validate WSSI-MFP flow
*phoenix-wssi-compliance                          # Validate Phoenix compliance
```

### WSSI-OTB Workflow (Reliance Environment Only)

```bash
*wssi-otb-workflow <requirement-document.md>      # Complete WSSI-OTB workflow
*create-wssi-snapshot                             # Create WSSI snapshot
*calculate-wssi-kpis                              # Calculate KPIs
*manage-snapshot-stages                           # Manage stage transitions
*generate-otb-codes                               # Generate OTB codes
*submit-otb-values                                # Submit OTB values
*validate-wssi-otb-flow                           # Validate WSSI-OTB flow
*reliance-wssi-compliance                         # Validate Reliance compliance
```

---

## ✅ QUALITY GATES

### Gate 1: Environment Preparation Complete
- ✅ Environment verified and validated
- ✅ All repositories on correct base branches
- ✅ Repository state verified and clean
- ✅ Prerequisites validated

### Gate 2: Requirement Analysis Complete
- ✅ Requirement classified with environment context
- ✅ Cross-repository impact assessed with environment awareness
- ✅ Dependencies mapped with environment considerations
- ✅ Patterns researched with environment-specific analysis

### Gate 3: Pattern Discovery Complete
- ✅ All repositories crawled with environment context
- ✅ Expert analysis completed with environment awareness
- ✅ Cross-repository validation passed
- ✅ Environment-specific pattern compliance verified

### Gate 4: Implementation Planning Complete
- ✅ Implementation plan created with environment context
- ✅ Risk analysis completed with environment considerations
- ✅ Testing strategy defined with environment-specific tests
- ✅ Rollback strategy prepared with environment rollback

### Gate 5: Implementation Complete
- ✅ All changes implemented with environment compliance
- ✅ Implementation validated against patterns and requirements
- ✅ Testing completed with environment-specific tests
- ✅ Documentation updated with environment context

### Gate 6: Deployment Ready
- ✅ Quality checks passed with environment compliance
- ✅ Deployment validation completed with environment checks
- ✅ Monitoring configured for environment
- ✅ Post-deployment validation ready

---

## 💡 USAGE EXAMPLES

### Single Command Implementation (Recommended)

```bash
# Complete end-to-end implementation
*implement REQ-1234.md

# With environment specification
*implement REQ-1234.md --environment phoenix
*implement REQ-1234.md --environment reliance

# Preview only (dry run)
*implement REQ-1234.md --dry-run

# Auto-commit changes
*implement REQ-1234.md --auto-commit

# Verbose output
*implement REQ-1234.md --verbose
```

### Manual Step-by-Step Flow (Advanced)

```bash
# Phase 0: Environment Preparation
*verify-environment
*switch-to-base-branches
*verify-repository-state

# Phase 1: Intelligent Analysis
*analyze-requirement-with-context REQ-1234.md
*crawl-repos-with-environment-context
*expert-pattern-analysis
*validate-requirement-and-repos
*map-comprehensive-dependencies

# Phase 2: Implementation Planning
*create-implementation-plan
*validate-plan-with-pm
*analyze-risks
*plan-testing
*plan-rollback

# Phase 3: Development Execution
*implement-with-dev --create-branches
*implement-with-dev
*validate-implementation
*test-implementation
*document-implementation

# Phase 4: Quality Assurance & Deployment
*quality-check
*validate-deployment
*implement-with-dev --commit
*implement-with-dev --push
*generate-pr-descriptions
*post-deployment-validation
```

### Environment-Specific Workflows

```bash
# Phoenix WSSI-MFP Workflow
*verify-environment  # Ensure Phoenix environment
*wssi-mfp-workflow wssi-requirement.md

# Reliance WSSI-OTB Workflow
*verify-environment  # Ensure Reliance environment
*wssi-otb-workflow wssi-otb-requirement.md
```

### Environment Management

```bash
# Check current environment
*status

# Switch to Phoenix
*switch-environment phoenix
*validate-environment
*switch-to-base-branches

# Switch to Reliance
*switch-environment reliance
*validate-environment
*switch-to-base-branches
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

# LoadAPIs analysis
/loadapis-pattern-expert
*analyze-loadapis-patterns
```

---

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
- Route handlers
- Service classes

### In ms-loadapis:
- Python LoadAPIs modules
- Data loading services
- API service management
- Upload processing workflows

---

## 📞 Troubleshooting

### Environment Issues

**Wrong Environment:**
```bash
*switch-environment phoenix  # or reliance
*validate-environment
```

**Branch Access Issues:**
- Ensure you have access to environment-specific branches
- Check permissions for both Phoenix and Reliance branches

**Environment Validation Failures:**
```bash
*verify-environment
*verify-repository-state
```

### Repository Issues

**Repository Path Errors:**
- Edit `.bmad-advanced-response-yield-assistant/config.yaml`
- Verify all four repository paths are correct

**Branch Mismatch:**
```bash
*switch-to-base-branches
*verify-repository-state
```

**Generated Files Issues:**
- Check `.bmad-advanced-response-yield-assistant/` for logs
- Review error messages for specific guidance

### MFP-Specific Issues

**MFP Pattern Issues:**
```bash
/mfp-pattern-expert
*analyze-mfp-patterns
```

**Python Environment:**
- Ensure Python 3.9+ is installed
- Verify MFP repository dependencies are installed

**Forecasting Logic:**
- Use specialized MFP commands for forecasting analysis
- Consult MFP Pattern Expert for detailed analysis

---

## 🎯 Success Criteria

### Technical Success
- ✅ All patterns followed with environment compliance
- ✅ All four repositories updated consistently
- ✅ All tests passing including environment-specific tests
- ✅ No breaking changes introduced
- ✅ Performance impact acceptable
- ✅ Environment-specific requirements satisfied

### Process Success
- ✅ Complete traceability maintained with environment context
- ✅ All quality gates passed
- ✅ Documentation complete with environment notes
- ✅ Rollback procedures tested with environment rollback
- ✅ Monitoring configured for environment

### Business Success
- ✅ Requirement fully implemented with environment compliance
- ✅ Business logic validated for environment
- ✅ User acceptance criteria met
- ✅ Performance requirements satisfied
- ✅ Environment-specific business rules implemented

---

## 🔄 Continuous Improvement

After each development cycle:

1. **Analyze Patterns**: Review discovered patterns with environment context
2. **Update Patterns**: Propose pattern updates for each environment
3. **Refine Process**: Improve development flow based on experience
4. **Share Knowledge**: Document lessons learned
5. **Update Templates**: Enhance templates based on successful implementations
6. **Environment Optimization**: Optimize environment-specific workflows

---

## 🎯 Key Differences from VIRAT

### Repository Focus
- **ms-mfp** instead of **ms-loadapis-ril-final**
- **MFP Pattern Expert** for Monthly Forecast Planning
- **Four repositories** instead of three

### Environment Intelligence
- **Phoenix/Reliance Environments** with specific base branches
- **Automatic Environment Configuration** during installation
- **Environment-Specific Validation** and compliance checking

### Enhanced Capabilities
- **Monthly Forecast Planning**: Specialized MFP algorithm support
- **Environment Awareness**: Complete environment-specific operations
- **Advanced Python Patterns**: Enhanced Python pattern recognition
- **Specialized Workflows**: WSSI-MFP and WSSI-OTB support

---

ARYA provides a complete, environment-aware development automation solution specifically designed for Phoenix and Reliance environments with enhanced MFP support!

