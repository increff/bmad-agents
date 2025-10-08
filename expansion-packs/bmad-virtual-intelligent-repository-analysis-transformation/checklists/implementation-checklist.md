# BMAD ADS Automation - Implementation Checklist

## Pre-Implementation Checklist

### 1. Requirement Analysis

- [ ] Requirement document read and parsed
- [ ] Requirement ID, title, description identified
- [ ] Technical requirements understood
- [ ] Change type identified (new column, new input, formula change, new module, etc.)
- [ ] Affected repositories identified

### 2. Repository Crawling - Stage 1

- [ ] irisx-algo repository crawled
  - [ ] Java modules analyzed
  - [ ] Abstract classes identified
  - [ ] Data structures mapped
  - [ ] Constants and configuration analyzed
- [ ] ms-loadapis-ril-final repository crawled
  - [ ] Load API structure analyzed
  - [ ] Base classes identified
  - [ ] Distribution load APIs mapped
  - [ ] Constants and utilities analyzed
- [ ] irisx-config repository crawled
  - [ ] TSV templates analyzed
  - [ ] SQL views mapped
  - [ ] Configuration files analyzed
  - [ ] Sync and export patterns identified

### 3. Pattern Analysis

- [ ] Structural patterns identified
- [ ] Code patterns identified
- [ ] Data patterns identified
- [ ] Configuration patterns identified
- [ ] Validation patterns identified
- [ ] Patterns classified and mapped to requirement types

### 4. Requirement Enhancement

- [ ] Requirements enhanced with specific implementation details
- [ ] File locations identified
- [ ] Dependency mappings created
- [ ] Configuration updates planned
- [ ] Validation requirements defined
- [ ] Testing requirements specified

### 5. Dependency Analysis

- [ ] Shared classes identified
- [ ] Dependencies mapped
- [ ] Impact assessment completed
- [ ] Override strategy planned
- [ ] Repository change list created

## Implementation Checklist

### 6. Story Creation

- [ ] SM agent activated
- [ ] Story created using \*draft command
- [ ] Enhanced requirements included
- [ ] Dependency analysis included
- [ ] Implementation plan included
- [ ] Acceptance criteria defined

### 7. Branch Creation

- [ ] Feature branches created from `caas-release` in all affected repositories
- [ ] Branch naming convention followed: `feature/{req-id}-{title}`
- [ ] Existing branches handled gracefully
- [ ] All repositories on correct branches

### 8. Pre-Implementation Crawling - Stage 2

- [ ] Specific modules crawled
- [ ] Related modules analyzed
- [ ] Existing templates identified
- [ ] Shared classes analyzed
- [ ] Implementation patterns confirmed

### 9. Code Implementation

- [ ] Dev agent activated
- [ ] \*develop-story command executed
- [ ] Java changes implemented
  - [ ] Classes modified following existing patterns
  - [ ] Fields added with proper getters/setters
  - [ ] Methods updated following existing patterns
  - [ ] Dependencies injected properly
- [ ] Python changes implemented
  - [ ] Load APIs created following existing patterns
  - [ ] Base class inheritance maintained
  - [ ] Header definitions consistent
  - [ ] Validation patterns followed
- [ ] Configuration changes implemented
  - [ ] JSON configs updated
  - [ ] TSV templates created
  - [ ] SQL views created
  - [ ] Schema consistency maintained

### 10. Validation Crawling - Stage 3

- [ ] Validation modules crawled
- [ ] Test patterns identified
- [ ] Configuration validation patterns analyzed
- [ ] Integration validation patterns confirmed

## Post-Implementation Checklist

### 11. Validation and Testing

- [ ] QA agent activated
- [ ] \*review-qa command executed
- [ ] \*run-tests command executed
- [ ] Existing validation modules run (25+ validations)
- [ ] Schema validation completed
- [ ] Configuration validation completed
- [ ] Integration validation completed
- [ ] All tests pass

### 12. Documentation Updates

- [ ] Requirement document updated
- [ ] All branches documented
- [ ] All files modified documented with line counts
- [ ] Git commit information included
- [ ] Next steps provided
- [ ] Review instructions provided

### 13. Quality Assurance

- [ ] Code follows existing patterns
- [ ] Dependencies properly managed
- [ ] Configuration consistency maintained
- [ ] Schema synchronization verified
- [ ] Validation rules followed
- [ ] Error handling implemented
- [ ] Performance requirements met

### 14. Final Verification

- [ ] All repositories in correct state
- [ ] All changes committed
- [ ] All validations pass
- [ ] Documentation complete
- [ ] Implementation within 2-hour target
- [ ] Success criteria met

## Error Handling Checklist

### Repository Issues

- [ ] Repository access problems resolved
- [ ] Branch conflicts resolved
- [ ] File permission issues resolved
- [ ] Git operation errors handled

### Implementation Issues

- [ ] Pattern conflicts resolved
- [ ] Dependency issues resolved
- [ ] Configuration inconsistencies resolved
- [ ] Schema synchronization issues resolved

### Validation Issues

- [ ] Validation failures addressed
- [ ] Test failures resolved
- [ ] Configuration validation issues resolved
- [ ] Integration validation issues resolved

## Success Criteria Verification

### Primary Success Criteria

- [ ] Functional: System successfully implements requirement
- [ ] Performance: Implementation completed within 2 hours
- [ ] Quality: 95%+ success rate without manual intervention
- [ ] Usability: Single command execution for complete workflow

### Secondary Success Criteria

- [ ] Extensibility: Easy to add new requirement patterns
- [ ] Maintainability: Clear code structure and documentation
- [ ] Reliability: Robust error handling and recovery
- [ ] Integration: Seamless integration with existing development workflow

## Notes

- This checklist implements the complete BMAD ADS Automation workflow
- Follows BMAD agent specialization rules strictly
- Performs actual git operations and repository modifications
- Uses multi-stage repository crawling for accuracy
- Implements pattern-based requirement enhancement
- Maintains consistency across all three repositories
- Ensures quality and reliability of implementation
