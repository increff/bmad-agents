# Dynamic Pattern Discovery Engine

## Intelligent Pattern Discovery Task

```yaml
task_type: 'intelligent_analysis'
complexity: 'advanced'
execution_mode: 'automated_with_validation'
repository_scope: 'multi_repository'
intelligence_level: 'pattern_recognition'

prerequisites:
  - repository_access: 'All three repositories accessible'
  - expert_agents: 'Repository-specific expert agents available'
  - analysis_tools: 'Pattern analysis and validation tools ready'

success_criteria:
  - pattern_discovery: 'Patterns discovered and validated across repositories'
  - consistency_validation: 'Cross-repository consistency verified'
  - implementation_guidance: 'Clear implementation guidance provided'
  - duplication_prevention: 'Duplicate implementations prevented'
```

## INTELLIGENT PATTERN DISCOVERY PROCESS

### Phase 1: Requirement Analysis & Module Identification

```bash
# STEP 1: Intelligent Requirement Analysis
1. EXTRACT KEYWORDS from requirement text using NLP
2. MAP KEYWORDS to business modules using intelligence database
3. IDENTIFY PRIMARY MODULE based on keyword analysis
4. DETECT CROSS-MODULE IMPACTS using dependency analysis
5. CLASSIFY REQUIREMENT COMPLEXITY (simple/medium/complex)

# INTELLIGENCE ALGORITHMS:
keyword_extraction:
  - business_terms: ['ideal size', 'pivotal tag', 'store category', 'override']
  - technical_terms: ['input', 'template', 'validation', 'data']
  - action_terms: ['add', 'create', 'modify', 'enhance']

module_mapping:
  - iss_keywords: ['ideal size', 'size set', 'pivotal tag', 'store category']
  - otb_keywords: ['buying', 'procurement', 'open to buy', 'moq']
  - dist_keywords: ['distribution', 'allocation', 'store distribution']
  - bi_keywords: ['reporting', 'analytics', 'business intelligence']
```

### Phase 2: Dynamic Pattern Discovery

```bash
# STEP 2: Repository-Specific Pattern Discovery
1. DELEGATE TO ALGORITHM EXPERT for Java pattern analysis
2. DELEGATE TO LOADAPI EXPERT for Python pattern analysis
3. DELEGATE TO CONFIG EXPERT for configuration pattern analysis
4. AGGREGATE EXPERT FINDINGS into comprehensive pattern analysis
5. VALIDATE PATTERN CONSISTENCY across all repositories

# EXPERT DELEGATION COMMANDS:
*delegate-algorithm-expert {requirement}
*delegate-loadapi-expert {requirement}
*delegate-config-expert {requirement}

# PATTERN AGGREGATION:
discovered_patterns = {
  'algorithm_patterns': algorithm_expert.findings,
  'loadapi_patterns': loadapi_expert.findings,
  'config_patterns': config_expert.findings,
  'cross_repo_dependencies': dependency_analysis.findings
}
```

### Phase 3: Intelligent Dependency Mapping

```bash
# STEP 3: Cross-Repository Dependency Intelligence
1. EXTRACT FILENAME CONSTANTS from Algorithm repository
2. APPLY IMPORT_ID EXTRACTION ALGORITHM for LoadAPI mapping
3. GENERATE TEMPLATE NAMING using configuration intelligence
4. VALIDATE HEADER CONSISTENCY across all repositories
5. CREATE DEPENDENCY MAP with validation rules

# DEPENDENCY MAPPING ALGORITHM:
def intelligent_dependency_mapping(requirement_analysis):
    # Algorithm Analysis
    filename_constant = discover_filename_constant(requirement_analysis)
    row_class_fields = analyze_row_class_structure(requirement_analysis)
    file_class_headers = extract_file_class_headers(requirement_analysis)

    # LoadAPI Analysis
    import_id = extract_import_id_intelligently(filename_constant)
    loadapi_headers = generate_loadapi_headers(row_class_fields)
    validation_logic = design_validation_logic(row_class_fields)

    # Config Analysis
    template_name = generate_template_name(filename_constant)
    template_headers = extract_template_headers(row_class_fields)
    sql_views = generate_sql_view_names(template_name)
    json_config = design_json_configuration(import_id)

    # Consistency Validation
    validate_header_consistency([file_class_headers, loadapi_headers, template_headers])
    validate_naming_consistency([filename_constant, import_id, template_name])

    return dependency_map
```

### Phase 4: Implementation Guidance Generation

```bash
# STEP 4: Intelligent Implementation Guidance
1. ANALYZE DISCOVERED PATTERNS for implementation approach
2. IDENTIFY EXISTING VS NEW IMPLEMENTATIONS needed
3. GENERATE STEP-BY-STEP IMPLEMENTATION PLAN
4. PROVIDE PATTERN-BASED CODE TEMPLATES
5. CREATE VALIDATION CHECKLIST for quality assurance

# IMPLEMENTATION DECISION TREE:
implementation_analysis = {
  'existing_implementations': {
    'algorithm_files': check_existing_algorithm_files(),
    'loadapi_files': check_existing_loadapi_files(),
    'config_files': check_existing_config_files()
  },
  'required_implementations': {
    'new_files_needed': identify_missing_files(),
    'modifications_needed': identify_required_modifications(),
    'enhancements_needed': identify_enhancement_opportunities()
  },
  'implementation_approach': {
    'complexity_level': assess_implementation_complexity(),
    'recommended_strategy': recommend_implementation_strategy(),
    'risk_assessment': analyze_implementation_risks()
  }
}
```

## INTELLIGENT PATTERN VALIDATION

### Pattern Consistency Validation

```python
# PATTERN CONSISTENCY VALIDATION ENGINE
def validate_pattern_consistency(discovered_patterns):
    """
    Validate consistency of discovered patterns across repositories
    """
    validation_results = {
        'header_consistency': validate_headers(discovered_patterns),
        'naming_consistency': validate_naming(discovered_patterns),
        'structure_consistency': validate_structure(discovered_patterns),
        'dependency_consistency': validate_dependencies(discovered_patterns)
    }

    # CRITICAL VALIDATIONS:
    assert all(validation_results.values()), "Pattern consistency validation failed"

    return validation_results

# HEADER CONSISTENCY VALIDATION
def validate_headers(patterns):
    algorithm_headers = patterns['algorithm']['file_class_headers']
    loadapi_headers = patterns['loadapi']['tsv_headers']
    config_headers = patterns['config']['template_headers']

    return algorithm_headers == loadapi_headers == config_headers
```

### Duplication Prevention Intelligence

```python
# DUPLICATION PREVENTION ENGINE
def prevent_duplicate_implementations(requirement_analysis, discovered_patterns):
    """
    Prevent creation of duplicate implementations
    """
    duplication_check = {
        'algorithm_duplicates': check_algorithm_duplicates(discovered_patterns),
        'loadapi_duplicates': check_loadapi_duplicates(discovered_patterns),
        'config_duplicates': check_config_duplicates(discovered_patterns)
    }

    if any(duplication_check.values()):
        return {
            'action': 'enhance_existing',
            'existing_files': identify_existing_files(duplication_check),
            'enhancement_strategy': recommend_enhancement_strategy()
        }
    else:
        return {
            'action': 'create_new',
            'implementation_plan': generate_implementation_plan(),
            'validation_checklist': generate_validation_checklist()
        }
```

## IMPLEMENTATION OUTPUT

### Discovery Report Generation

```yaml
# PATTERN DISCOVERY REPORT
discovery_report:
  requirement_analysis:
    keywords_extracted: ['pivotal tag', 'override', 'ideal size', 'store category']
    primary_module: 'iss'
    complexity_level: 'medium'
    cross_module_impacts: []

  discovered_patterns:
    algorithm_patterns:
      existing_files:
        ['StoreCategoryPivotalTagOverrideRow.java', 'StoreCategoryPivotalTagOverrideFile.java']
      filename_constant: 'EXPORT_ISS_INPUT_STORE_CATEGORY_PIVOTAL_TAG_OVERRIDE'
      headers: ['store', 'category', 'pivotaltag']

    loadapi_patterns:
      existing_files: ['StoreCategoryPivotalTagOverrideLoadApi.py']
      import_id: 'store_category_pivotal_tag_override'
      validation_logic: 'int store > 0, String category not empty, pivotaltag in enum'

    config_patterns:
      template_name: 'export_iss_input_store_category_pivotal_tag_override_template.tsv'
      sql_views: ['child-input-store_category_pivotal_tag_override.sql']
      json_config: 'store_category_pivotal_tag_override in module_input.json'

  consistency_validation:
    header_consistency: true
    naming_consistency: true
    dependency_consistency: true

  implementation_recommendation:
    action: 'enhance_existing'
    reason: 'All required files already exist'
    enhancement_needed: 'Update validation logic or business rules if needed'
```

### Implementation Guidance

```markdown
# INTELLIGENT IMPLEMENTATION GUIDANCE

## Discovery Summary

- **Requirement**: ADD PIVOTAL TAG OVERRIDE IN IDEAL SIZE AT STORE CAT LEVEL
- **Primary Module**: ISS (Ideal Size Set)
- **Complexity**: Medium (existing implementations found)

## Pattern Analysis Results

✅ **Algorithm Files**: StoreCategoryPivotalTagOverrideRow.java, StoreCategoryPivotalTagOverrideFile.java
✅ **LoadAPI Files**: StoreCategoryPivotalTagOverrideLoadApi.py
✅ **Config Files**: Template and views may need creation/validation

## Implementation Recommendation

**Action**: ENHANCE EXISTING IMPLEMENTATION
**Reason**: Core files already exist, enhancement may be needed

## Step-by-Step Implementation Plan

1. **Validate Existing Implementation**: Check current pivotal tag override logic
2. **Analyze Enhancement Requirements**: Determine what specific enhancement is needed
3. **Update Business Logic**: Modify ISS module business logic if required
4. **Validate Cross-Repository Consistency**: Ensure all files are consistent
5. **Test Implementation**: Run validation modules and tests

## Quality Assurance Checklist

- [ ] Header consistency validated across repositories
- [ ] Naming conventions followed
- [ ] No duplicate implementations created
- [ ] Cross-repository dependencies maintained
- [ ] Validation logic appropriate for field types
```

## USAGE EXAMPLES

### Execute Dynamic Pattern Discovery

```bash
# Execute intelligent pattern discovery for a requirement
*discover-patterns "ADD PIVOTAL TAG OVERRIDE IN IDEAL SIZE AT STORE CAT LEVEL"

# Expected Output:
# 1. Requirement analysis and module identification
# 2. Expert delegation to repository specialists
# 3. Pattern discovery and consistency validation
# 4. Implementation guidance generation
# 5. Quality assurance checklist creation
```

### Validate Pattern Consistency

```bash
# Validate discovered patterns for consistency
*validate-pattern-consistency {discovered_patterns}

# Expected Output:
# 1. Header consistency validation
# 2. Naming convention validation
# 3. Dependency consistency validation
# 4. Structure consistency validation
# 5. Overall consistency score and recommendations
```

This Dynamic Pattern Discovery Engine provides intelligent, automated pattern discovery with repository-specific expertise, ensuring accurate implementations and preventing duplication while maintaining cross-repository consistency.
