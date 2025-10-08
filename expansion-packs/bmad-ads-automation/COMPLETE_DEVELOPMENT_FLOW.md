# VIRAT Complete Development Flow

## Overview

This document outlines the complete development flow using the research-based VIRAT agent, following all 33 rules and ensuring systematic, high-quality development across three repositories.

## Repository Base Branches

- **Algorithm Repository (`irisx-algo`)**: `caas-release`
- **LoadAPI Repository (`ms-loadapis-ril-final`)**: `release_optimised`
- **Configuration Repository (`irisx-config`)**: `caas-staging_fix`

## Complete Development Flow

### Prerequisites

1. **Activate VIRAT Agent**: Load the research-based VIRAT agent
2. **Load Rules**: All 33 rules are integrated directly into the VIRAT agent
3. **Repository Access**: Ensure access to all three repositories
4. **Requirement Document**: Have the requirement document ready

---

## PHASE 0: REPOSITORY PREPARATION

### Step 0.1: Switch to Base Branches
```bash
*switch-to-base-branches
```
**Purpose**: Switch to correct base branches in ACTUAL REPOSITORIES before any analysis
**Actions**:
- **CRITICAL**: Switch branches in the ACTUAL repositories, NOT in the BMAD project
- **Algorithm Repository (`irisx-algo`)**: Switch to `caas-release` branch
- **LoadAPI Repository (`ms-loadapis-ril-final`)**: Switch to `release_optimised` branch
- **Configuration Repository (`irisx-config`)**: Switch to `caas-staging_fix` branch
- Pull latest changes from remote for each base branch
- Verify working directory is clean (no uncommitted changes)
**Output**: 
- Confirmation that all ACTUAL repositories are on correct base branches
- Latest code pulled from remote repositories
- Clean working directories verified

### Step 0.2: Repository State Verification
```bash
*verify-repository-state
```
**Purpose**: Verify all repositories are on correct base branches and clean
**Actions**:
- Verify current branch matches expected base branch for each repository
- Check for any uncommitted changes or conflicts
- Verify remote connectivity and latest commits
- Validate repository structure integrity
**Output**: 
- Repository state verification report
- Branch confirmation for all three repositories
- Clean state confirmation
- Any issues or conflicts identified

---

## PHASE 1: INTELLIGENT REQUIREMENT & REPOSITORY ANALYSIS

### Step 1: Deep Requirement Analysis with BMAD Analyst
```bash
*analyze-requirement-with-analyst [requirement-document.md]
```
**Purpose**: Use BMAD analyst persona to deeply understand requirement and classify complexity
**Actions**:
- **Load BMAD Analyst Persona**: Activate `@bmad-core/agents/analyst.md` for systematic analysis
- **Deep Requirement Understanding**: Analyze business logic, data structures, and technical specifications
- **Intelligent Classification**: Classify requirement type to avoid over-engineering:
  - **Config-Only**: Template changes, planogram updates, SQL view modifications, JSON config changes, report formats
  - **LoadAPI-Only**: Data upload/validation changes, denormalization updates, file processing changes
  - **Algorithm-Only**: Business logic changes, calculation updates, new modules, processing rules
  - **Cross-Repository**: New inputs/outputs, end-to-end workflows, complete new features
- **Scope Limitation**: Determine ONLY the repositories that need modification
- **Repository Impact Assessment**: Identify which repositories will be affected (avoid unnecessary changes)
- **Business Context Analysis**: Understand business impact and priority
**Output**: 
- Comprehensive requirement analysis report
- **CRITICAL**: Repository scope limitation (Config-only, LoadAPI-only, Algorithm-only, or Cross-repository)
- Business logic breakdown and technical specifications
- Complexity assessment (High/Medium/Low)
- Repository impact matrix with detailed reasoning and scope justification
- Change type classification with justification
- Business context and priority assessment

### Step 2: Systematic Repository Crawling with BMAD Analyst
```bash
*crawl-repos-with-analyst
```
**Purpose**: Use BMAD analyst persona to systematically crawl and analyze all repositories
**Actions**:
- **Load BMAD Analyst Persona**: Continue with `@bmad-core/agents/analyst.md` for systematic crawling
- **Systematic Repository Analysis**: Methodically analyze all base branches:
  - `caas-release` (Algorithm Repository) - Focus on module patterns, Row/File classes
  - `release_optimised` (LoadAPI Repository) - Focus on LoadAPI patterns, denormalization
  - `caas-staging_fix` (Configuration Repository) - Focus on SQL views, templates, JSON configs
- **Pattern Discovery**: Identify existing similar implementations using analyst methodology
- **Code Structure Analysis**: Analyze current code structures, naming conventions, and patterns
- **Dependency Mapping**: Map existing cross-repository dependencies with analyst precision
- **Similar Implementation Identification**: Find existing implementations similar to the requirement
**Output**: 
- Systematic repository analysis report with analyst insights
- Comprehensive pattern inventory with detailed analysis
- Similar implementation identification with code references
- Cross-repository dependency mapping with impact analysis
- Code structure analysis with recommendations

### Step 3: Parallel Expert Pattern Analysis
```bash
*expert-pattern-analysis
```
**Purpose**: Delegate to all expert agents in parallel for comprehensive pattern analysis
**Actions**:
- **Algorithm Expert**: Analyze algorithm patterns, module structures, validation patterns (Rules 16-20)
- **LoadAPI Expert**: Analyze LoadAPI patterns, denormalization structures, registration patterns (Rules 16-20)
- **Config Expert**: Analyze configuration patterns, SQL view structures, template patterns (Rules 16-20)
- **Cross-Repository Analysis**: Analyze integration patterns and dependencies
**Output**: 
- Algorithm-specific patterns and module structures
- LoadAPI patterns and denormalization structures
- Configuration patterns and SQL view structures
- Cross-repository integration patterns
- Pattern compliance assessment

### Step 4: Comprehensive Validation
```bash
*validate-requirement-and-repos
```
**Purpose**: Validate requirement against rules and cross-repository consistency
**Actions**:
- Validate requirement against Rules 1-10 (Core Implementation Rules)
- Validate cross-repository consistency using Rules 11-15 (Repository Coordination)
- Validate pattern compliance using Rules 16-20 (Pattern Management)
- Assess rule compliance across all identified changes
**Output**: 
- Rule compliance assessment for requirement
- Cross-repository consistency validation report
- Pattern compliance verification
- Potential issues and conflicts identified

### Step 5: Comprehensive Dependency Mapping
```bash
*map-comprehensive-dependencies
```
**Purpose**: Map cross-module dependencies with repository impact classification
**Actions**:
- Map cross-module dependencies following Rule 33 (Cross-Module Communication)
- Analyze cascading impacts across all repositories
- Identify critical dependency paths
- Assess change impact on existing modules
- Create comprehensive dependency graph
**Output**: 
- Complete module dependency graph across all repositories
- Cascading impact analysis
- Critical dependency path identification
- Change impact assessment matrix
- Risk assessment for dependency changes

---

## PHASE 2: IMPLEMENTATION PLANNING & VALIDATION

### Step 6: Implementation Plan Creation
```bash
*create-implementation-plan
```
**Purpose**: Create rule-compliant implementation plan following Rule 23
**Output**: Detailed implementation plan, file change list, sequence planning

### Step 7: Thorough Plan Validation with BMAD PM
```bash
*validate-plan-with-pm
```
**Purpose**: Use BMAD PM persona to thoroughly validate implementation plan against all requirements and constraints
**Actions**:
- **Load BMAD PM Persona**: Activate `@bmad-core/agents/pm.md` for comprehensive plan validation
- **Requirements Traceability**: Ensure all requirement aspects are covered in the plan
- **Resource Assessment**: Validate resource requirements and availability
- **Timeline Validation**: Assess implementation timeline and dependencies
- **Risk Assessment**: Identify potential risks and mitigation strategies
- **Stakeholder Impact**: Assess impact on different stakeholders
- **Quality Gates Validation**: Ensure all quality gates are properly defined
- **Constraint Analysis**: Validate against technical, business, and resource constraints
**Output**: 
- Comprehensive plan validation report with PM insights
- Requirements traceability matrix
- Resource and timeline assessment
- Risk analysis with mitigation strategies
- Stakeholder impact analysis
- Quality gates validation
- Constraint compliance verification

### Step 8: Risk Analysis
```bash
*analyze-risks
```
**Purpose**: Analyze implementation risks using Rules 21-22 (Error Handling & Testing)
**Output**: Risk assessment matrix, mitigation strategies

### Step 9: Testing Strategy Planning
```bash
*plan-testing
```
**Purpose**: Plan comprehensive testing strategy following Rule 22
**Output**: Testing plan, test case specifications, coverage requirements

### Step 10: Rollback Strategy Planning
```bash
*plan-rollback
```
**Purpose**: Plan rollback strategy following Rule 21 (Error Handling)
**Output**: Rollback procedures, recovery checkpoints, failure scenarios

---

## PHASE 3: GUIDED IMPLEMENTATION

### Step 11: Feature Branch Creation
```bash
# Create feature branches from correct base branches
*implement-guided --create-branches
```
**Actions**:
- Create feature branch from `caas-release` (Algorithm Repository)
- Create feature branch from `release_optimised` (LoadAPI Repository)
- Create feature branch from `caas-staging_fix` (Configuration Repository)
**Naming Convention**: `feature/{req-id}-{descriptive-name}`

### Step 12: Brownfield Development with BMAD Dev
```bash
*implement-with-dev
```
**Purpose**: Use BMAD dev persona for ACTUAL brownfield development with continuous rule validation
**Actions**:
- **Load BMAD Dev Persona**: Activate `@bmad-core/agents/dev.md` for brownfield development expertise
- **ACTUAL Code Implementation**: Make REAL CODE CHANGES in existing codebase following brownfield patterns (NOT A SIMULATION)
- **Algorithm Repository Changes**: Create/modify modules, Row classes, File classes following existing patterns
- **LoadAPI Repository Changes**: Create/modify LoadAPI classes, registrations, ObjectMaps following denormalization patterns
- **Configuration Repository Changes**: Create/modify SQL views, templates, JSON configs following configuration patterns
- **Continuous Rule Validation**: Validate each change against integrated core_implementation_rules
- **Pattern Adherence**: Ensure all implementations follow discovered patterns exactly
- **Cross-Repository Coordination**: Maintain consistency across all three repositories
**Output**: 
- Implementation progress with brownfield development best practices
- Continuous validation results against all 33 rules
- Pattern compliance verification
- Cross-repository consistency maintained

### Step 13: Implementation Validation
```bash
*validate-implementation
```
**Purpose**: Validate implementation against Rules 1-33
**Output**: Implementation validation report, rule compliance verification

### Step 14: Testing Implementation
```bash
*test-implementation
```
**Purpose**: Execute comprehensive testing following Rule 22
**Actions**:
- Unit tests for static methods
- Integration tests across repositories
- Cross-dependency testing
**Output**: Test results, coverage reports

### Step 15: Implementation Documentation
```bash
*document-implementation
```
**Purpose**: Document implementation IN THE ORIGINAL REQUIREMENT DOCUMENT following Rule 23
**Actions**:
- **Update Original Requirement Document**: Add all implementation details to the original requirement file
- **No Separate Files**: Do not create separate documentation files
- **Complete Implementation Details**: Add all changes, decisions, and analysis to the requirement document
- **Git References**: Add all commit references and branch information to the requirement document
- **Testing Results**: Add test results and coverage reports to the requirement document
- **Quality Metrics**: Add quality and compliance metrics to the requirement document
**Output**: Original requirement document updated with complete implementation documentation

---

## PHASE 4: QUALITY ASSURANCE & DEPLOYMENT

### Step 16: Comprehensive Quality Check
```bash
*quality-check
```
**Purpose**: Perform comprehensive quality checks against all rules
**Actions**:
- Code quality validation
- Pattern compliance verification
- Cross-repository consistency check
- Performance impact assessment
**Output**: Quality assessment report, compliance verification

### Step 22: Deployment Validation
```bash
*validate-deployment
```
**Purpose**: Validate deployment readiness using Rules 21-22
**Actions**:
- Pre-deployment validation
- Integration readiness check
- Rollback procedure verification
**Output**: Deployment readiness report

### Step 23: Git Operations
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

### Step 24: Deployment Monitoring
```bash
*monitor-deployment
```
**Purpose**: Monitor deployment following established patterns
**Output**: Deployment monitoring dashboard, real-time status

### Step 25: Post-Deployment Validation
```bash
*post-deployment-validation
```
**Purpose**: Validate post-deployment state against all rules
**Actions**:
- Functional validation
- Performance monitoring
- Error monitoring
- Integration validation
**Output**: Post-deployment validation report

---

## SPECIALIZED RESEARCH COMMANDS (As Needed)

### Class-Specific Research
```bash
*research-args-usage          # Research Args class patterns (Rules 24-33)
*research-input-tables        # Research Input Table patterns (Rules 24-33)
*research-utility-classes     # Research Utility class patterns (Rule 24)
*research-objectmaps          # Research ObjectMap patterns (Rule 25)
*research-basedata            # Research BaseData patterns (Rule 26)
*research-cache-patterns      # Research Cache usage patterns (Rule 29)
*research-constants           # Research Constants management (Rule 31)
*research-interim-data        # Research Interim data structures (Rule 32)
```

### Rule-Specific Validation
```bash
*validate-core-rules          # Validate against Rules 1-10 (Core Implementation)
*validate-repo-rules          # Validate against Rules 11-15 (Repository Coordination)
*validate-pattern-rules       # Validate against Rules 16-20 (Pattern Management)
*validate-error-rules         # Validate against Rule 21 (Error Handling)
*validate-testing-rules       # Validate against Rule 22 (Testing Framework)
*validate-flow-rules          # Validate against Rule 23 (Complete Development Flow)
*validate-class-rules         # Validate against Rules 24-33 (Class Management)
```

### Expert Delegation
```bash
*delegate-algorithm           # Delegate to Algorithm Pattern Expert
*delegate-loadapi             # Delegate to LoadAPI Pattern Expert
*delegate-config              # Delegate to Configuration Pattern Expert
*coordinate-experts           # Coordinate multiple expert agents
```

---

## QUALITY GATES

### Gate 1: Requirement Analysis Complete
- ✅ Requirement classified and validated
- ✅ Cross-repository impact assessed
- ✅ Dependencies mapped
- ✅ Patterns researched

### Gate 2: Pattern Discovery Complete
- ✅ All repositories crawled
- ✅ Expert analysis completed
- ✅ Cross-repository validation passed
- ✅ Pattern compliance verified

### Gate 3: Implementation Planning Complete
- ✅ Implementation plan created and validated
- ✅ Risk analysis completed
- ✅ Testing strategy defined
- ✅ Rollback strategy prepared

### Gate 4: Implementation Complete
- ✅ All changes implemented
- ✅ Implementation validated against rules
- ✅ Testing completed successfully
- ✅ Documentation updated

### Gate 5: Deployment Ready
- ✅ Quality checks passed
- ✅ Deployment validation completed
- ✅ Monitoring configured
- ✅ Post-deployment validation ready

---

## ERROR HANDLING

### At Each Phase
```bash
*validate-rules               # Validate current action against applicable rules
*analyze-risks               # Analyze risks for current phase
*plan-rollback               # Update rollback strategy
```

### On Error
```bash
*validate-error-rules        # Validate error handling approach
*plan-rollback               # Execute rollback if needed
*document-implementation     # Document error and resolution
```

---

## MONITORING & ANALYTICS

### Continuous Monitoring
```bash
*monitor-compliance          # Monitor rule compliance
*analyze-patterns            # Analyze discovered patterns
*track-quality               # Track quality metrics
*generate-insights           # Generate insights from analysis
```

---

## USAGE EXAMPLES

### Single Command Implementation (Recommended)

```bash
# Complete end-to-end implementation with ACTUAL CODE CHANGES
*implement REQ-1234.md

# With options for different scenarios
*implement REQ-1234.md --dry-run        # Preview implementation plan only (SIMULATION)
*implement REQ-1234.md --auto-commit    # Auto-commit and push ACTUAL changes
*implement REQ-1234.md --verbose        # Show detailed progress information
*implement REQ-1234.md --skip-tests     # Skip testing phase (not recommended)
*implement REQ-1234.md --parallel       # Execute independent steps in parallel

# CRITICAL: By default, *implement makes REAL CODE CHANGES (not simulations)
```

### Manual Step-by-Step Flow (Advanced Users)

```bash
# Phase 0: Repository Preparation
*switch-to-base-branches
*verify-repository-state

# Phase 1: Intelligent Analysis with BMAD Personas
*analyze-requirement-with-analyst REQ-1234.md
*crawl-repos-with-analyst
*expert-pattern-analysis
*validate-requirement-and-repos
*map-comprehensive-dependencies

# Phase 2: Implementation Planning with BMAD PM
*create-implementation-plan
*validate-plan-with-pm
*analyze-risks
*plan-testing
*plan-rollback

# Phase 3: Development Execution with BMAD Dev
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
*monitor-deployment
*post-deployment-validation
```

---

## SUCCESS CRITERIA

### Technical Success
- ✅ All 33 rules followed
- ✅ All repositories updated consistently
- ✅ All tests passing
- ✅ No breaking changes introduced
- ✅ Performance impact acceptable

### Process Success
- ✅ Complete traceability maintained
- ✅ All quality gates passed
- ✅ Documentation complete and accurate
- ✅ Rollback procedures tested
- ✅ Monitoring and alerting configured

### Business Success
- ✅ Requirement fully implemented
- ✅ Business logic validated
- ✅ User acceptance criteria met
- ✅ Performance requirements satisfied
- ✅ Security requirements addressed

---

## CONTINUOUS IMPROVEMENT

After each development cycle:
1. **Analyze Patterns**: Review discovered patterns for reusability
2. **Update Rules**: Propose rule updates based on learnings
3. **Refine Process**: Improve development flow based on experience
4. **Share Knowledge**: Document lessons learned for future use
5. **Update Templates**: Enhance templates based on successful implementations
