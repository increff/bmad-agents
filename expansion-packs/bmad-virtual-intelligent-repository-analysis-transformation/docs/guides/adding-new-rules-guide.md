# Guide: Adding New Rules to VIRAT

## Overview

This guide explains how to add new implementation rules to the VIRAT system while maintaining consistency and avoiding breaking changes. The semantic rule naming system makes this process straightforward.

---

## Why Semantic Names Matter

With semantic rule names, you can:
- ✅ Add new rules without renumbering existing ones
- ✅ Insert rules between existing rules
- ✅ Reorganize rule categories freely
- ✅ No need to update references in virat.md or expert agents

---

## Step-by-Step: Adding a New Rule

### 1. Choose a Semantic Name

**Format:** `{category}_{specific_name}`

**Examples:**
- `input_validation_framework`
- `async_processing_patterns`
- `cache_invalidation_strategy`
- `test_data_generation`

**Guidelines:**
- Use lowercase with underscores
- Be descriptive and specific
- Follow existing naming patterns
- Avoid abbreviations unless universal

---

### 2. Add to `data/core-implementation-rules.yaml`

#### **A. Add to `rule_map` Section**

```yaml
# === SEMANTIC RULE REFERENCE MAP ===
rule_map:
  # ... existing rules ...
  
  # Your new rule
  your_new_rule_name: 46  # Next available number
```

**Note:** The number is for documentation only. All code references use the semantic name!

#### **B. Define the Rule**

Add the complete rule definition:

```yaml
# === NEW RULE SECTION (if creating new category) ===
# OR add to existing category

rule_46_your_new_rule_name:
  description: "Brief description of what this rule addresses"
  
  when_to_apply:
    - "Specific scenario 1"
    - "Specific scenario 2"
    - "When encountering condition X"
  
  requirements:
    - "Must do requirement 1"
    - "Must do requirement 2"
    - "Should consider aspect 3"
  
  implementation_steps:
    step_1: "First action to take"
    step_2: "Second action to take"
    step_3: "Third action to take"
  
  validation:
    - "How to verify rule was followed"
    - "What to check for compliance"
  
  examples:
    good: "Example of correct implementation"
    bad: "Example of what NOT to do"
  
  related_rules:
    - "other_rule_semantic_name"
    - "another_related_rule"
  
  consequences_of_violation:
    - "What happens if rule is not followed"
    - "Technical debt or issues created"
```

---

### 3. Add Validation Pattern (Optional)

If the rule can be automatically validated, add to `utils/validation-library.yaml`:

```yaml
validation_patterns:
  
  your_validation_check:
    rule: your_new_rule_name  # Reference semantic name
    severity: CRITICAL  # or ERROR, WARNING
    description: "What this validation checks"
    pattern: "Pattern to validate"
    
    detection:
      command: "bash command to detect violations"
      extraction: "How to extract relevant data"
    
    checks:
      - name: "Check description"
        validation: "What to validate"
        required: true
    
    failure_action: "FAIL - What happens on failure"
```

---

### 4. Add Error Messages (Optional)

If validation can fail, add error messages to `utils/error-messages.yaml`:

```yaml
critical_errors:  # or errors, warnings
  
  your_rule_violation:
    code: "VIR-###"  # Next available code
    rule: your_new_rule_name
    severity: CRITICAL
    message: "User-friendly error message"
    
    context: |
      Explanation of why this rule exists and what it prevents.
    
    details:
      field1: "{dynamic_value_1}"
      field2: "{dynamic_value_2}"
    
    remediation:
      steps:
        - "Step 1 to fix the error"
        - "Step 2 to fix the error"
      
      example: |
        # Code example showing how to fix
        example_code_here()
```

---

### 5. Reference in Documentation

#### **A. Update virat.md (if needed)**

Only update if adding to commands or workflows. No need to update rule lists - they auto-reference!

**Example: Adding to validation commands**

```yaml
commands:
  # ... existing commands ...
  
  - validate-your-category: Validate against {your_new_rule_name}
```

#### **B. Document in README (if major rule)**

Add to the appropriate section in `README.md` if this is a significant new rule category.

---

### 6. Add to Validation Workflow (Optional)

If rule should be checked during automated validation:

```yaml
# utils/validation-library.yaml

validation_workflows:
  pre_deployment:
    validations:
      - existing_check_1
      - existing_check_2
      - your_new_validation_check  # Add here
```

---

### 7. Update Validation Script (if automated check)

If you added automated validation, update `tools/validate-rules.py`:

```python
def validate_your_new_rule(self) -> ValidationResult:
    """Validate your new rule"""
    print(f"{Colors.CYAN}[RUNNING]{Colors.END} Validating your rule...")
    
    # Implementation here
    
    if violations:
        error = self.error_messages['critical_errors']['your_rule_violation']
        return ValidationResult(False, "Validation failed", "CRITICAL", details)
    
    return ValidationResult(True, "Validation passed", "INFO")
```

And add to workflow execution:

```python
elif validation_name == 'your_validation_check':
    result = self.validate_your_new_rule()
```

---

## Examples

### Example 1: Adding Rule 46 - Async Processing Patterns

#### **Step 1: Choose Name**
```
async_processing_patterns
```

#### **Step 2A: Add to rule_map**
```yaml
rule_map:
  # ... existing ...
  async_processing_patterns: 46
```

#### **Step 2B: Define Rule**
```yaml
rule_46_async_processing_patterns:
  description: "Patterns for implementing asynchronous processing in Java modules"
  
  when_to_apply:
    - "When processing large datasets that can run in parallel"
    - "When module execution time exceeds 5 minutes"
    - "When multiple independent operations can be parallelized"
  
  requirements:
    - "Use CompletableFuture for async operations"
    - "Implement proper error handling for async tasks"
    - "Use thread pools appropriately (avoid creating new threads)"
    - "Monitor and log async task completion"
  
  implementation_steps:
    step_1: "Identify operations that can run asynchronously"
    step_2: "Create CompletableFuture for each async operation"
    step_3: "Use CompletableFuture.allOf() to wait for completion"
    step_4: "Implement error handling with exceptionally()"
    step_5: "Add logging for async task start/completion"
  
  validation:
    - "Verify thread pool is configured correctly"
    - "Check error handling is implemented"
    - "Ensure no thread leaks occur"
  
  examples:
    good: |
      // Good: Proper async implementation
      CompletableFuture<Result> future1 = CompletableFuture.supplyAsync(() -> processTask1(), executor);
      CompletableFuture<Result> future2 = CompletableFuture.supplyAsync(() -> processTask2(), executor);
      CompletableFuture.allOf(future1, future2)
        .exceptionally(ex -> { handleError(ex); return null; })
        .join();
    
    bad: |
      // Bad: Synchronous processing when async is appropriate
      Result result1 = processTask1();  // Blocks
      Result result2 = processTask2();  // Blocks after first completes
  
  related_rules:
    - performance_documentation
    - comprehensive_error_handling
  
  consequences_of_violation:
    - "Slow processing times"
    - "Inefficient resource utilization"
    - "Poor user experience due to long wait times"
```

#### **Step 3: Add Validation (Optional)**
```yaml
validation_patterns:
  async_processing_check:
    rule: async_processing_patterns
    severity: WARNING
    description: "Check if async patterns are used where appropriate"
    # ... validation logic ...
```

---

### Example 2: Inserting a Rule Between Existing Rules

**Scenario:** Want to add a rule about ObjectMap caching between rules 26 and 27

#### **Step 1: Choose Name**
```
objectmap_caching_strategy
```

#### **Step 2A: Add to rule_map**
```yaml
rule_map:
  objectmaps_usage: 26
  objectmap_caching_strategy: 26.5  # Insert between
  basedata_class: 27
```

**OR** (preferred):
```yaml
rule_map:
  objectmaps_usage: 26
  objectmap_caching_strategy: 46    # Just use next number
  basedata_class: 27
```

**Why preferred?** Numbering is just documentation. Semantic names are what matter!

---

## Best Practices

### ✅ DO:
- Use descriptive semantic names
- Provide clear examples of good and bad implementations
- Document when the rule applies
- Add validation if possible
- Link related rules
- Test validation before committing

### ❌ DON'T:
- Use rule numbers in code (use semantic names)
- Create overly generic rules
- Skip the examples section
- Forget to add to rule_map
- Use abbreviations that aren't obvious

---

## Testing Your New Rule

### 1. Validate YAML Syntax
```bash
python3 -c "import yaml; yaml.safe_load(open('data/core-implementation-rules.yaml'))"
```

### 2. Check Rule Map
```bash
grep "your_new_rule_name" data/core-implementation-rules.yaml
# Should appear in rule_map and rule definition
```

### 3. Test Validation (if added)
```bash
python3 tools/validate-rules.py --check your_validation_check
```

### 4. Verify References Work
```bash
grep -r "{your_new_rule_name}" agents/
# Should find any references you added
```

---

## Migration Checklist

Use this checklist when adding a new rule:

- [ ] Chosen semantic name (descriptive, follows convention)
- [ ] Added to `rule_map` in core-implementation-rules.yaml
- [ ] Defined complete rule with all sections
- [ ] Added examples (good and bad)
- [ ] Documented related rules
- [ ] Added validation pattern (if applicable)
- [ ] Added error messages (if applicable)
- [ ] Updated validation script (if automated)
- [ ] Added to validation workflow (if automated)
- [ ] Referenced in documentation (if needed)
- [ ] Tested YAML syntax
- [ ] Tested validation (if added)
- [ ] Updated this guide if process changed

---

## Troubleshooting

### Problem: Rule not being referenced

**Solution:** Use semantic name with curly braces `{your_new_rule_name}` in virat.md or other files.

### Problem: Validation not running

**Solution:** Check validation is added to workflow in `validation-library.yaml` and implemented in `validate-rules.py`.

### Problem: YAML syntax error

**Solution:** Validate YAML with `python3 -c "import yaml; yaml.safe_load(open('file.yaml'))"` to find the line with the error.

### Problem: Duplicate rule name

**Solution:** Each semantic name must be unique. Search existing rules to avoid duplicates.

---

## Getting Help

If you need assistance:
1. Review existing rules for similar patterns
2. Check `docs/migrations/semantic-rule-names-migration.md`
3. Consult the team's rule design guidelines
4. Test thoroughly before committing

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2025-10-16 | Initial guide creation | VIRAT Team |

---

## Related Documentation

- [Semantic Rule Names Migration](../migrations/semantic-rule-names-migration.md)
- [Validation Library](../../utils/validation-library.yaml)
- [Error Messages](../../utils/error-messages.yaml)
- [Core Implementation Rules](../../data/core-implementation-rules.yaml)

