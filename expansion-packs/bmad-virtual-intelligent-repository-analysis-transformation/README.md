# BMAD VIRTUAL INTELLIGENT Repository ANALYSIS AND TRANSFORMATION Extension Pack

## Overview

The BMAD VIRTUAL INTELLIGENT Repository ANALYSIS AND TRANSFORMATION system features VIRAT - a sophisticated multi-agent system built on the BMAD framework that automates development workflows across three interconnected repositories: `irisx-algo` (Java/Spring Boot), `ms-loadapis-ril-final` (Python), and `irisx-config` (Configuration/SQL).

## Features

- **Multi-Environment Support**: Automatically detects and switches between prod, reliance, and phoenix environments with environment-specific base branches
- **Multi-Repository Coordination**: Handles three interconnected repositories simultaneously
- **Pattern-Based Development**: Analyzes existing patterns and follows them for consistency
- **Automated Workflow**: Complete development lifecycle from requirement analysis to implementation
- **Real Git Operations**: Performs actual branch creation, commits, and repository operations
- **Comprehensive Validation**: Runs existing validation modules and tests
- **Documentation Updates**: Updates requirement documents with implementation results
- **Specialized Expert Agents**: Dedicated agents for LoadAPI, Configuration, and Algorithm patterns
- **Comprehensive Repository Analysis**: Deep analysis of all three repositories with pattern recognition
- **Requirement Intelligence**: Advanced requirement classification and impact prediction
- **Module Dependency Analysis**: Understanding of cascading effects across algorithm modules
- **Strict Enforcement**: Mandatory validation and comprehensive oversight to prevent skipping steps

## Architecture

### Repositories

1. **irisx-algo** (Java/Spring Boot)
   - Core business logic and algorithms
   - Distribution, depletion, and allocation modules
   - 25+ validation modules
   - Abstract classes and shared components

2. **ms-loadapis-ril-final** (Python)
   - Data ingestion and load APIs
   - 25+ distribution-specific load APIs
   - Common utilities and constants
   - Azure integration

3. **irisx-config** (Configuration/SQL)
   - 100+ TSV input templates
   - 200+ SQL view definitions
   - Configuration files (JSON)
   - Export definitions

### Data Flow

```
Input Data → Load APIs (Python) → Database → Business Logic (Java) → Output Views (SQL) → Export
```

### Environment Configuration

VIRAT supports multiple environments with different base branches:

| Environment | Algorithm Repo | LoadAPI Repo | Config Repo |
|------------|----------------|--------------|-------------|
| **prod** | `caas-release` | `release_optimised` | `caas-staging_fix` |
| **reliance** | `master-ril` | `caas-ril-uploads` | `master-ril` |
| **phoenix** | `master-adidas-reliance-prod` | `caas-phoenix-uploads` | `master-adidas-ril` |

**How it works**: Add `Environment: reliance` (or prod/phoenix) to your requirement document header, and VIRAT automatically:
- Detects the environment
- Switches to correct base branches
- Creates feature branches from appropriate bases
- Documents environment-specific implementation details

📖 **See**: [Environment Configuration Guide](docs/ENVIRONMENT_CONFIGURATION.md) for detailed usage.

## Agents

### VIRAT (Main Orchestrator)

- **Role**: Enhanced Master Orchestrator for Multi-Repository Development Automation
- **Commands**: `*implement`, `*analyze`, `*classify-requirement`, `*predict-changes`, `*select-checklist`, `*execute-checklist`, `*loadapi-expert`, `*config-expert`, `*algorithm-expert`
- **Responsibilities**: Coordinate complete development workflow with comprehensive requirement analysis and expert delegation
- **Key Features**: Requirement classification, impact prediction, expert delegation, module dependency analysis

### LoadAPI Pattern Expert

- **Role**: LoadAPI Architecture & Pattern Specialist
- **Commands**: `*analyze-patterns`, `*create-loadapi`, `*validate-denormalization`, `*detect-changes`
- **Responsibilities**: LoadAPI denormalization patterns, repository structure analysis, data transformation architecture
- **Key Features**: 159 Python files analysis, 98+ import ID mappings, 4 denormalization patterns

### Configuration Pattern Expert

- **Role**: Configuration Repository & Pattern Specialist
- **Commands**: `*analyze-config`, `*create-sql-views`, `*generate-templates`, `*validate-config`
- **Responsibilities**: SQL view patterns, template generation, cross-repository configuration coordination
- **Key Features**: 200+ SQL views, 100+ TSV templates, JSON configuration patterns

### Algorithm Pattern Expert

- **Role**: Algorithm Repository & Pattern Specialist
- **Commands**: `*analyze-modules`, `*create-module`, `*analyze-dependencies`, `*validate-algorithm`
- **Responsibilities**: Java module patterns, validation frameworks, module dependency analysis
- **Key Features**: 1,174 Java files, 30+ modules, 25+ group modules, cascading impact analysis

### Repository Integration Subagent

- **Role**: Expert Repository Integration Specialist & Dynamic Architecture Analyzer
- **Commands**: `*discover-repo`, `*analyze-architecture`, `*create-integration-plan`, `*validate-integration`
- **Responsibilities**: Repository discovery, pattern analysis, integration planning, ecosystem expansion
- **Key Features**: Dynamic repository analysis, cross-repository coordination, integration validation

### SM Agent (Bob)

- **Role**: Story Creation Specialist
- **Commands**: `*draft`, `*story-checklist`
- **Responsibilities**: Create detailed implementation stories

### Dev Agent (James)

- **Role**: Implementation Specialist
- **Commands**: `*develop-story`, `*explain`, `*run-tests`
- **Responsibilities**: Implement code changes across repositories

### QA Agent

- **Role**: Quality Assurance Specialist
- **Commands**: `*review-qa`, `*run-tests`
- **Responsibilities**: Validate implementation and run tests

### Analyst Agent (Mary)

- **Role**: Repository Analysis Specialist
- **Commands**: `*document-project`, `*brainstorm`
- **Responsibilities**: Analyze existing repository structures

## Workflow

### Complete Development Workflow

1. **Requirement Analysis**: Parse and analyze requirement documents with intelligent classification
2. **Repository Crawling (Stage 1)**: Understand current repository state and patterns across all three repositories
3. **Pattern Analysis**: Classify patterns and enhance requirements using specialized expert agents
4. **Dependency Analysis**: Analyze shared dependencies and cascading impacts across modules
5. **Expert Delegation**: Delegate to LoadAPI, Configuration, and Algorithm Pattern Experts
6. **Module Dependency Analysis**: Analyze input/output relationships and cascading effects
7. **Story Creation**: Create detailed implementation story with comprehensive impact analysis
8. **Branch Creation**: Create feature branches in all repositories
9. **Repository Crawling (Stage 2)**: Pre-implementation analysis with pattern validation
10. **Implementation**: Implement changes following existing patterns with strict enforcement
11. **Repository Crawling (Stage 3)**: Post-implementation validation analysis
12. **Validation**: Run comprehensive tests and validations with mandatory oversight
13. **Documentation**: Update requirement documents with results

### Multi-Stage Repository Crawling

- **Stage 1**: Initial analysis of all repositories with pattern recognition
- **Stage 2**: Pre-implementation analysis of specific modules with dependency analysis
- **Stage 3**: Post-implementation validation analysis with cascading impact assessment

### Expert Agent Delegation

- **LoadAPI Pattern Expert**: Handles all LoadAPI denormalization patterns and data transformation
- **Configuration Pattern Expert**: Manages SQL views, TSV templates, and JSON configurations
- **Algorithm Pattern Expert**: Analyzes Java modules, validation frameworks, and module dependencies
- **Repository Integration Subagent**: Coordinates cross-repository integration and architecture analysis

## Usage

### Basic Usage

1. **Activate VIRAT Orchestrator**:

   ```
   @virat.md
   ```

2. **Implement a Requirement**:

   ```
   *implement
   ```

3. **Follow the prompts** to provide requirement document and complete the workflow

### Advanced Usage

#### **VIRAT Commands**

- **Analyze Requirements**: `*analyze`
- **Classify Requirement**: `*classify-requirement`
- **Predict Changes**: `*predict-changes`
- **Select Checklist**: `*select-checklist`
- **Execute Checklist**: `*execute-checklist`
- **Delegate to Experts**: `*loadapi-expert`, `*config-expert`, `*algorithm-expert`

#### **Expert Agent Commands**

- **LoadAPI Expert**: `*analyze-patterns`, `*create-loadapi`, `*validate-denormalization`
- **Configuration Expert**: `*analyze-config`, `*create-sql-views`, `*generate-templates`
- **Algorithm Expert**: `*analyze-modules`, `*create-module`, `*analyze-dependencies`
- **Repository Integration**: `*discover-repo`, `*analyze-architecture`, `*create-integration-plan`

## Success Metrics

- **Development Velocity**: 2 hours per requirement
- **Accuracy**: 95%+ success rate
- **Coverage**: 80% of typical business requirements
- **Quality**: Maintain existing code quality standards
- **Pattern Recognition**: 100% adherence to existing patterns
- **Cross-Repository Coordination**: Seamless integration across all three repositories
- **Expert Delegation**: Efficient task distribution to specialized agents
- **Dependency Analysis**: Complete understanding of cascading impacts

## Key Features

### Pattern-Based Development

- Analyzes existing code patterns across all three repositories
- Follows established conventions with 100% adherence
- Prevents hallucination by using real templates and patterns
- Comprehensive pattern recognition with 159 Python files, 1,174 Java files, and 200+ SQL views

### Multi-Repository Coordination

- Handles three repositories simultaneously with seamless integration
- Maintains consistency across all repositories with cross-repository validation
- Coordinates git operations across repositories with conflict resolution
- Expert delegation to specialized agents for each repository type

### Comprehensive Validation

- Runs existing validation modules (25+)
- Executes unit and integration tests with mandatory oversight
- Validates schemas and configurations with strict enforcement
- Module dependency analysis with cascading impact assessment

### Real Git Operations

- Creates actual feature branches with proper naming conventions
- Performs real commits with comprehensive change tracking
- Handles existing branches gracefully with conflict resolution
- Cross-repository branch coordination

### Expert Agent System

- **LoadAPI Pattern Expert**: 159 Python files, 98+ import ID mappings, 4 denormalization patterns
- **Configuration Pattern Expert**: 200+ SQL views, 100+ TSV templates, JSON configuration patterns
- **Algorithm Pattern Expert**: 1,174 Java files, 30+ modules, 25+ group modules, cascading impact analysis
- **Repository Integration Subagent**: Dynamic repository analysis and integration planning

### Requirement Intelligence

- Advanced requirement classification (Algorithm, LoadAPI, Configuration, Cross-Repository)
- Impact prediction with repository-specific change analysis
- Comprehensive checklist system with 50+ implementation steps
- Cross-repository dependency analysis and conflict detection

## Configuration

### Repository Paths

```yaml
repositories:
  irisx-algo: '{ALGO_REPO_PATH}'
  ms-loadapis-ril-final: '{LOADAPIS_REPO_PATH}'
  irisx-config: '{CONFIG_REPO_PATH}'
```

### Target Completion Time

- **Target**: 2 hours per requirement
- **Measurement**: End-to-end execution time

## Dependencies

- **BMAD Core**: Requires BMAD framework
- **Git**: For repository operations
- **Java 1.8+**: For irisx-algo repository
- **Python 3.8+**: For ms-loadapis-ril-final repository
- **Azure**: For data processing and storage

## Error Handling

- **Repository Access Issues**: Graceful handling with fallback options
- **Branch Conflicts**: Automatic resolution of existing branches
- **Validation Failures**: Comprehensive error reporting and fixes
- **Pattern Conflicts**: Resolution between requirements and existing patterns
- **Dependency Issues**: Careful handling of shared class modifications

## Notes

- This extension pack implements the complete BMAD VIRTUAL INTELLIGENT Repository ANALYSIS AND TRANSFORMATION system with enhanced intelligence
- Follows BMAD agent specialization rules strictly with mandatory enforcement
- Performs actual git operations and repository modifications with comprehensive validation
- Uses multi-stage repository crawling for accuracy with pattern recognition
- Implements pattern-based requirement enhancement with expert delegation
- Maintains consistency across all three repositories with cross-repository coordination
- Features specialized expert agents for LoadAPI, Configuration, and Algorithm patterns
- Includes comprehensive requirement intelligence with impact prediction
- Provides module dependency analysis with cascading effect understanding
- Implements strict enforcement to prevent skipping critical steps

## Quick Start Guide

### 🚀 **QUICK START (5 Minutes)**

#### **Step 1: Activate VIRAT**

```
@virat.md
```

#### **Step 2: See Available Commands**

```
*help
```

#### **Step 3: Configure Repository Paths**

```
*configure-repo-paths
```

#### **Step 4: Run Your First Command**

```
*implement your-requirement.md
```

### 🎯 **DEMO SCENARIOS**

#### **Demo 1: LoadAPI Pattern Analysis**

**Command**: `*loadapi-expert` → `*analyze-patterns`
**What it does**: Analyzes 159 Python files, 98+ import ID mappings, and 4 denormalization patterns
**Demo Value**: Shows comprehensive LoadAPI pattern recognition and data transformation

#### **Demo 2: Configuration Pattern Analysis**

**Command**: `*config-expert` → `*analyze-config`
**What it does**: Analyzes 200+ SQL views, 100+ TSV templates, and JSON configuration patterns
**Demo Value**: Demonstrates configuration pattern recognition and template generation

#### **Demo 3: Algorithm Module Analysis**

**Command**: `*algorithm-expert` → `*analyze-modules`
**What it does**: Analyzes 1,174 Java files, 30+ modules, and module dependencies
**Demo Value**: Shows algorithm pattern recognition and dependency analysis

#### **Demo 4: Cross-Repository Integration**

**Command**: `*implement`
**What it does**: Complete end-to-end implementation across all three repositories with expert delegation
**Demo Value**: Shows full automation workflow with specialized agent coordination

## Installation Guide

### Prerequisites

- **BMAD Core**: Requires BMAD framework
- **Git**: For repository operations
- **Java 1.8+**: For irisx-algo repository
- **Python 3.8+**: For ms-loadapis-ril-final repository
- **Azure**: For data processing and storage

### Installation Steps

1. **Clone the BMAD-METHOD repository**
2. **Navigate to the expansion pack**
   ```bash
   cd expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation
   ```
3. **Configure repository paths** in `config.yaml`
4. **Activate VIRAT agent**
   ```
   @virat.md
   ```
5. **Run configuration validation**
   ```
   *validate-configuration
   ```

### Configuration

#### Repository Paths

```yaml
repositories:
  irisx-algo: '{ALGO_REPO_PATH}'
  ms-loadapis-ril-final: '{LOADAPIS_REPO_PATH}'
  irisx-config: '{CONFIG_REPO_PATH}'
```

#### Target Completion Time

- **Target**: 2 hours per requirement
- **Measurement**: End-to-end execution time

## Recent Improvements & Cleanup

### 🧹 **Documentation Cleanup (Completed)**

- **Files Removed**: 15 redundant documentation files
- **Files Retained**: 35 essential documentation files
- **Reduction**: 30% reduction in documentation files
- **Result**: Clean, organized documentation structure with only essential files

### 🚀 **System Enhancements**

- **Specialized Expert Agents**: Created dedicated agents for LoadAPI, Configuration, and Algorithm patterns
- **Comprehensive Repository Analysis**: Deep analysis of all three repositories with pattern recognition
- **Requirement Intelligence**: Advanced requirement classification and impact prediction
- **Module Dependency Analysis**: Understanding of cascading effects across algorithm modules
- **Strict Enforcement**: Mandatory validation and comprehensive oversight to prevent skipping steps

### 📊 **Repository Statistics**

- **LoadAPI Repository**: 159 Python files, 98+ import ID mappings, 4 denormalization patterns
- **Configuration Repository**: 200+ SQL views, 100+ TSV templates, JSON configuration patterns
- **Algorithm Repository**: 1,174 Java files, 30+ modules, 25+ group modules, cascading impact analysis

### 🎯 **Key Achievements**

- **Expert Delegation**: Efficient task distribution to specialized agents
- **Pattern Recognition**: 100% adherence to existing patterns across all repositories
- **Cross-Repository Coordination**: Seamless integration across all three repositories
- **Dependency Analysis**: Complete understanding of cascading impacts
- **Strict Enforcement**: Mandatory validation prevents skipping critical steps

## Support

For issues or questions, please refer to the BMAD documentation or contact the development team.
