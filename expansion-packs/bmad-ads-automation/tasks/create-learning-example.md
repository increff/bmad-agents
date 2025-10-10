# Create Learning Example Task

## Task Overview
Create learning examples from feedback for future reference and prevention.

## Prerequisites
- Feedback data is available
- Learning insights have been extracted
- Patterns have been identified

## Task Steps

### Step 1: Example Selection
**elicit: true**
```
I need to create learning examples from feedback. Please specify:

1. Which feedback entries should be used for examples?
2. What type of learning example do you want to create?
3. What specific patterns should be highlighted?
4. What audience is this example for?
5. What format should the example be in?
```

### Step 2: Content Creation
**auto: true**
```python
# Create learning example content
learning_example = {
    "id": generate_unique_id(),
    "title": example_title,
    "type": example_type,
    "pattern": pattern_highlighted,
    "context": {
        "repository": repository,
        "module": module,
        "task_type": task_type,
        "agent_used": agent_used
    },
    "mistake_example": {
        "description": mistake_description,
        "incorrect_code": incorrect_code,
        "why_wrong": why_wrong,
        "impact": impact
    },
    "correct_example": {
        "description": correct_description,
        "correct_code": correct_code,
        "why_correct": why_correct,
        "best_practices": best_practices
    },
    "learning_points": [
        "key_learning_1",
        "key_learning_2",
        "key_learning_3"
    ],
    "prevention_tips": [
        "prevention_tip_1",
        "prevention_tip_2",
        "prevention_tip_3"
    ],
    "related_patterns": related_patterns,
    "created_date": get_current_timestamp(),
    "status": "active"
}
```

### Step 3: Pattern Documentation
**auto: true**
```python
# Document the pattern
pattern_documentation = {
    "pattern_name": pattern_name,
    "description": pattern_description,
    "common_mistakes": common_mistakes,
    "correct_approach": correct_approach,
    "validation_rules": validation_rules,
    "prevention_strategies": prevention_strategies,
    "examples": [learning_example],
    "related_patterns": related_patterns
}
```

### Step 4: Example Validation
**auto: true**
```python
# Validate learning example
validation_result = validate_learning_example(learning_example)
if not validation_result["valid"]:
    fix_validation_issues(learning_example, validation_result["issues"])
```

### Step 5: Storage and Organization
**auto: true**
```python
# Store learning example
save_learning_example(learning_example)

# Update pattern library
update_pattern_library(pattern_documentation)

# Update knowledge base
update_knowledge_base_with_example(learning_example)
```

### Step 6: Distribution
**auto: true**
```python
# Make example available to relevant agents
distribute_learning_example(learning_example, target_agents)

# Update agent guidelines
update_agent_guidelines(learning_example)
```

## Output
- Learning example created and stored
- Pattern documentation updated
- Knowledge base enhanced
- Example distributed to relevant agents

## Success Criteria
- [ ] Learning example created with clear content
- [ ] Pattern properly documented
- [ ] Example validated for accuracy
- [ ] Example stored and organized
- [ ] Example distributed to relevant agents
- [ ] Knowledge base updated

## Notes
- Make examples clear and actionable
- Include both wrong and correct approaches
- Highlight key learning points
- Provide prevention strategies
- Ensure examples are reusable

