# VIRAT Implementation Checklist

## Overview
This checklist ensures comprehensive validation of VIRAT's cross-repository implementation workflow, covering all aspects from requirement analysis to deployment using VIRAT's expert pattern recognition and cross-repository coordination capabilities.

## Pre-Implementation Checklist

### 1. Requirement Analysis and Pattern Recognition

- [ ] Requirement document read and parsed using VIRAT's natural language processing
- [ ] Requirement ID, title, description identified and classified
- [ ] Technical requirements understood and mapped to existing patterns
- [ ] Change type identified (new column, new input, formula change, new module, etc.)
- [ ] Affected repositories identified (irisx-algo, ms-loadapis, irisx-config)
- [ ] Pattern matching performed using VIRAT's expert agents
- [ ] Cross-repository dependencies analyzed (90%+ modules have dependencies)
- [ ] MCP servers available and functional for enhanced analysis

### 2. Repository Intelligence Gathering - Stage 1

- [ ] **irisx-algo repository** crawled using Algorithm Pattern Expert
  - [ ] Java modules analyzed (27 group modules, 150+ individual modules)
  - [ ] Abstract classes identified (AbstractUtilModuleGroup, AbstractValidationModule)
  - [ ] Data structures mapped (324 row/file pairs - 162 input + 162 output)
  - [ ] Constants and configuration analyzed (50+ constants classes)
  - [ ] Business logic patterns identified (60+ utility classes)
- [ ] **ms-loadapis repository** crawled using LoadAPI Pattern Expert
  - [ ] Load API structure analyzed (118+ import mappings)
  - [ ] Base classes identified (LoadApi, ObjectMaps, ValidationUtil)
  - [ ] Module patterns mapped (23 modules, 177 files)
  - [ ] Constants and utilities analyzed (denormalization patterns)
  - [ ] Integration patterns identified (10 integration APIs)
- [ ] **irisx-config repository** crawled using Configuration Pattern Expert
  - [ ] TSV templates analyzed (export and sync patterns)
  - [ ] SQL views mapped and dependencies identified
  - [ ] Configuration files analyzed (JSON, YAML configurations)
  - [ ] Sync and export patterns identified
  - [ ] Template management patterns analyzed

### 3. Expert Pattern Analysis

- [ ] **Algorithm Pattern Expert** activated for irisx-algo analysis
  - [ ] Group module patterns identified (27 modules)
  - [ ] Validation module patterns identified (25 modules)
  - [ ] Row/file class patterns mapped (324 pairs)
  - [ ] Args class patterns analyzed (32 classes)
  - [ ] Utility class patterns identified (60+ classes)
- [ ] **LoadAPI Pattern Expert** activated for ms-loadapis analysis
  - [ ] Denormalization patterns identified (6+ core patterns)
  - [ ] Module organization patterns mapped (23 modules)
  - [ ] Import ID mappings analyzed (118+ mappings)
  - [ ] Integration API patterns identified (10 APIs)
  - [ ] Business rule patterns extracted
- [ ] **Configuration Pattern Expert** activated for irisx-config analysis
  - [ ] SQL view patterns identified and dependencies mapped
  - [ ] Template patterns analyzed and categorized
  - [ ] Export/sync patterns identified
  - [ ] Schema consistency patterns validated
  - [ ] Configuration management patterns analyzed
- [ ] **Cross-Repository Pattern Validation**
  - [ ] Pattern consistency verified across repositories
  - [ ] Dependency conflicts identified and resolved
  - [ ] Integration patterns validated
  - [ ] Naming convention consistency ensured

### 4. VIRAT-Enhanced Requirement Analysis

- [ ] Requirements enhanced with VIRAT's pattern intelligence
- [ ] File locations identified using expert pattern recognition
- [ ] Dependency mappings created using cross-repository analysis
- [ ] Configuration updates planned using Configuration Pattern Expert
- [ ] Validation requirements defined using validation modules (25 modules)
- [ ] Testing requirements specified using pattern-based testing
- [ ] Implementation sequence optimized based on dependency analysis

### 5. Cross-Repository Dependency Intelligence

- [ ] **Shared classes identified** using VIRAT's repository crawling
- [ ] **Dependencies mapped** with cascading impact analysis (90%+ modules)
- [ ] **Impact assessment completed** using Algorithm Pattern Expert
- [ ] **Override strategy planned** based on pattern compatibility
- [ ] **Repository change list created** with implementation sequence
- [ ] **Multi-language support validated** (English/Spanish localization)
- [ ] **Environment-specific rules identified** (Phoenix/Reliance)

## Implementation Checklist

### 6. VIRAT Story Creation and Planning

- [ ] **VIRAT activated** using `@virat` command
- [ ] **Story created** using `*draft` command with enhanced requirements
- [ ] **Enhanced requirements included** from pattern analysis
- [ ] **Dependency analysis included** using cross-repository intelligence
- [ ] **Implementation plan included** with expert agent recommendations
- [ ] **Acceptance criteria defined** based on pattern compliance
- [ ] **Cross-repository impact assessment** completed using VIRAT experts

### 7. Multi-Repository Branch Management

- [ ] **Feature branches created** from base branches using VIRAT's git coordination
  - [ ] irisx-algo: `caas-release` branch (Phoenix) or `release-ril` (Reliance)
  - [ ] ms-loadapis: `caas-release` branch (Phoenix) or `release-ril` (Reliance)
  - [ ] irisx-config: `master-adidas-ril` (Phoenix) or `master-ril` (Reliance)
- [ ] **Branch naming convention followed**: `feature/{req-id}-{title}`
- [ ] **Existing branches handled gracefully** using VIRAT's branch management
- [ ] **All repositories aligned** on correct environment branches
- [ ] **Branch permissions validated** for write access

### 8. Deep Repository Intelligence - Stage 2

- [ ] **Expert Pattern Experts activated** for specific module analysis
  - [ ] Algorithm Pattern Expert for irisx-algo deep dive
  - [ ] LoadAPI Pattern Expert for ms-loadapis analysis
  - [ ] Configuration Pattern Expert for irisx-config analysis
- [ ] **Related modules analyzed** using dependency mapping (90%+ coverage)
- [ ] **Existing templates identified** and pattern compatibility verified
- [ ] **Shared classes analyzed** using VIRAT's cross-repository intelligence
- [ ] **Implementation patterns confirmed** with expert validation

### 9. VIRAT-Guided Code Implementation

- [ ] **VIRAT development mode activated** using expert delegation
- [ ] **`*develop-story` command executed** with pattern guidance
- [ ] **MCP servers operational** for enhanced code analysis and validation
- [ ] **Java changes implemented** using Algorithm Pattern Expert
  - [ ] Classes modified following existing patterns (27 group modules)
  - [ ] Fields added with proper getters/setters and validation
  - [ ] Methods updated following existing patterns (150+ modules)
  - [ ] Dependencies injected properly using Spring patterns
  - [ ] Business logic implemented using utility classes (60+ utilities)
- [ ] **Python changes implemented** using LoadAPI Pattern Expert
  - [ ] Load APIs created following denormalization patterns (6+ core patterns)
  - [ ] Base class inheritance maintained (LoadApi, ObjectMaps)
  - [ ] Header definitions consistent (118+ import mappings)
  - [ ] Validation patterns followed (25 validation modules)
  - [ ] Integration patterns implemented (10 integration APIs)
- [ ] **Configuration changes implemented** using Configuration Pattern Expert
  - [ ] JSON/YAML configs updated with proper structure
  - [ ] TSV templates created following export/sync patterns
  - [ ] SQL views created with dependency mapping
  - [ ] Schema consistency maintained across repositories
  - [ ] Multi-language support implemented (English/Spanish)

### 10. VIRAT Validation Intelligence - Stage 3

- [ ] **Validation modules crawled** using Algorithm Pattern Expert (25 modules)
- [ ] **Test patterns identified** using validation pattern recognition
- [ ] **Configuration validation patterns analyzed** using Configuration Pattern Expert
- [ ] **Integration validation patterns confirmed** using cross-repository analysis
- [ ] **Business rule validation verified** using validation modules
- [ ] **Cross-repository consistency validated** using VIRAT's dependency mapping

## Post-Implementation Checklist

### 11. VIRAT Quality Assurance and Testing

- [ ] **VIRAT QA mode activated** using expert pattern validation
- [ ] **`*review-qa` command executed** with comprehensive pattern checking
- [ ] **MCP-enhanced validation** performed using MCP tools for code analysis
- [ ] **`*run-tests` command executed** across all repositories
- [ ] **Existing validation modules run** (25 validation modules)
- [ ] **Schema validation completed** using Configuration Pattern Expert
- [ ] **Configuration validation completed** with cross-repository consistency
- [ ] **Integration validation completed** using LoadAPI Pattern Expert
- [ ] **All tests pass** with 95%+ success rate
- [ ] **Pattern compliance verified** using expert agents
- [ ] **Cross-repository integration tested** (3 repositories)

### 12. VIRAT Documentation and Knowledge Update

- [ ] **Requirement document updated** with implementation details
- [ ] **All branches documented** with change summaries
- [ ] **All files modified documented** with line counts and pattern analysis
- [ ] **Git commit information included** with cross-repository coordination
- [ ] **Pattern documentation updated** in expert agents
- [ ] **Next steps provided** with dependency guidance
- [ ] **Review instructions provided** using VIRAT's quality gates

### 13. VIRAT Quality Intelligence

- [ ] **Code follows existing patterns** verified using Algorithm Pattern Expert
- [ ] **Dependencies properly managed** using cross-repository dependency analysis
- [ ] **Configuration consistency maintained** using Configuration Pattern Expert
- [ ] **Schema synchronization verified** across all repositories
- [ ] **Validation rules followed** (25 validation modules)
- [ ] **Error handling implemented** with proper exception management
- [ ] **Performance requirements met** using pattern-based optimization
- [ ] **Multi-language support verified** (English/Spanish localization)
- [ ] **Environment-specific compliance validated** (Phoenix/Reliance)

### 14. VIRAT Final Verification

- [ ] **All repositories in correct state** verified using VIRAT's status checking
- [ ] **All changes committed** with proper git coordination
- [ ] **All validations pass** (25+ validation modules, 95%+ success rate)
- [ ] **Documentation complete** with pattern-based documentation
- [ ] **Implementation within 2-hour target** using VIRAT automation
- [ ] **Success criteria met** with cross-repository consistency

## VIRAT Error Intelligence Checklist

### Repository Issues

- [ ] **Repository access problems resolved** using VIRAT's connectivity validation
- [ ] **Branch conflicts resolved** using VIRAT's branch management
- [ ] **File permission issues resolved** with proper access controls
- [ ] **Git operation errors handled** using VIRAT's git coordination
- [ ] **Network connectivity issues resolved** using environment validation
- [ ] **Authentication problems addressed** with credential management

### Implementation Issues

- [ ] **Pattern conflicts resolved** using expert pattern validation
- [ ] **Dependency issues resolved** using cross-repository dependency analysis
- [ ] **Configuration inconsistencies resolved** using Configuration Pattern Expert
- [ ] **Schema synchronization issues resolved** using schema validation
- [ ] **Module integration problems fixed** using Algorithm Pattern Expert
- [ ] **LoadAPI compatibility issues addressed** using LoadAPI Pattern Expert

### Validation Issues

- [ ] **Validation failures addressed** using validation modules (25 modules)
- [ ] **Test failures resolved** with comprehensive testing (95%+ success rate)
- [ ] **Configuration validation issues resolved** using Configuration Pattern Expert
- [ ] **Integration validation issues resolved** using cross-repository testing
- [ ] **Business rule violations corrected** using expert pattern guidance
- [ ] **Environment-specific issues fixed** using environment validation

## VIRAT Success Intelligence Verification

### Primary Success Criteria

- [ ] **Functional Excellence**: System successfully implements requirement with pattern compliance
- [ ] **Performance Excellence**: Implementation completed within 2 hours using VIRAT automation
- [ ] **Quality Excellence**: 95%+ success rate without manual intervention (25+ validation modules)
- [ ] **Usability Excellence**: Single command execution for complete workflow using VIRAT experts
- [ ] **Cross-Repository Excellence**: Seamless coordination across 3 repositories (324 file pairs)

### Secondary Success Criteria

- [ ] **Pattern Extensibility**: Easy to add new requirement patterns using VIRAT's expert agents
- [ ] **Knowledge Maintainability**: Clear pattern documentation and expert agent updates
- [ ] **System Reliability**: Robust error handling and recovery using VIRAT intelligence
- [ ] **Repository Integration**: Seamless integration with existing development workflow
- [ ] **Multi-Environment Support**: Phoenix and Reliance environment compatibility
- [ ] **Multi-language Support**: English/Spanish localization support

## VIRAT Intelligence Summary

- **Expert Pattern Recognition**: Uses Algorithm, LoadAPI, and Configuration Pattern Experts
- **Cross-Repository Coordination**: Maintains consistency across irisx-algo, ms-loadapis, irisx-config
- **Multi-Stage Intelligence Gathering**: 3-stage repository crawling for comprehensive analysis
- **Pattern-Based Implementation**: Implements changes following established patterns (90%+ modules)
- **Quality Intelligence**: 25+ validation modules ensure 95%+ success rate
- **Environment Intelligence**: Phoenix/Reliance environment-specific implementation
- **Documentation Intelligence**: Pattern-based documentation with expert agent updates
