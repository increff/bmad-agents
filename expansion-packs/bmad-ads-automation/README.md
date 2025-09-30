# BMAD ADS Automation Extension Pack

## Overview

The BMAD ADS (Automated Development System) is a sophisticated multi-agent system built on the BMAD framework that automates development workflows across three interconnected repositories: `irisx-algo` (Java/Spring Boot), `ms-loadapis-ril-final` (Python), and `irisx-config` (Configuration/SQL).

## Features

- **Multi-Repository Coordination**: Handles three interconnected repositories simultaneously
- **Pattern-Based Development**: Analyzes existing patterns and follows them for consistency
- **Automated Workflow**: Complete development lifecycle from requirement analysis to implementation
- **Real Git Operations**: Performs actual branch creation, commits, and repository operations
- **Comprehensive Validation**: Runs existing validation modules and tests
- **Documentation Updates**: Updates requirement documents with implementation results

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

## Agents

### ADS Orchestrator
- **Role**: Master Orchestrator for Multi-Repository Development Automation
- **Commands**: `*implement`, `*analyze`, `*crawl`, `*validate`, `*document`
- **Responsibilities**: Coordinate complete development workflow

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

1. **Requirement Analysis**: Parse and analyze requirement documents
2. **Repository Crawling (Stage 1)**: Understand current repository state and patterns
3. **Pattern Analysis**: Classify patterns and enhance requirements
4. **Dependency Analysis**: Analyze shared dependencies and impact
5. **Story Creation**: Create detailed implementation story
6. **Branch Creation**: Create feature branches in all repositories
7. **Repository Crawling (Stage 2)**: Pre-implementation analysis
8. **Implementation**: Implement changes following existing patterns
9. **Repository Crawling (Stage 3)**: Post-implementation validation analysis
10. **Validation**: Run comprehensive tests and validations
11. **Documentation**: Update requirement documents with results

### Multi-Stage Repository Crawling

- **Stage 1**: Initial analysis of all repositories
- **Stage 2**: Pre-implementation analysis of specific modules
- **Stage 3**: Post-implementation validation analysis

## Usage

### Basic Usage

1. **Activate ADS Orchestrator**:
   ```
   @ads-orchestrator
   ```

2. **Implement a Requirement**:
   ```
   *implement
   ```

3. **Follow the prompts** to provide requirement document and complete the workflow

### Advanced Usage

- **Analyze Requirements**: `*analyze`
- **Crawl Repositories**: `*crawl`
- **Validate Implementation**: `*validate`
- **Update Documentation**: `*document`

## Success Metrics

- **Development Velocity**: 2 hours per requirement
- **Accuracy**: 95%+ success rate
- **Coverage**: 80% of typical business requirements
- **Quality**: Maintain existing code quality standards

## Key Features

### Pattern-Based Development
- Analyzes existing code patterns
- Follows established conventions
- Prevents hallucination by using real templates

### Multi-Repository Coordination
- Handles three repositories simultaneously
- Maintains consistency across all repositories
- Coordinates git operations across repositories

### Comprehensive Validation
- Runs existing validation modules (25+)
- Executes unit and integration tests
- Validates schemas and configurations

### Real Git Operations
- Creates actual feature branches
- Performs real commits
- Handles existing branches gracefully

## Configuration

### Repository Paths
```yaml
repositories:
  irisx-algo: "/Users/viratbansal/IdeaProjects/irisx-algo"
  ms-loadapis-ril-final: "/Users/viratbansal/IdeaProjects/ms-loadapis-ril-final"
  irisx-config: "/Users/viratbansal/IdeaProjects/irisx-config"
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

- This extension pack implements the complete BMAD ADS Automation system
- Follows BMAD agent specialization rules strictly
- Performs actual git operations and repository modifications
- Uses multi-stage repository crawling for accuracy
- Implements pattern-based requirement enhancement
- Maintains consistency across all three repositories

## Support

For issues or questions, please refer to the BMAD documentation or contact the development team.
