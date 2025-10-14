# Update Knowledge Base Task

## Task Overview
Update knowledge base with new learning patterns and insights from feedback.

## Prerequisites
- Learning insights have been extracted from feedback
- Patterns have been identified
- Knowledge base structure is available

## Task Steps

### Step 1: Learning Extraction
**auto: true**
```python
# Extract learning insights from feedback
learning_insights = extract_learning_insights(feedback_data)
patterns = extract_patterns(feedback_data)
prevention_strategies = extract_prevention_strategies(feedback_data)
```

### Step 2: Knowledge Classification
**auto: true**
```python
# Classify knowledge updates
knowledge_updates = {
    "patterns": patterns,
    "prevention_strategies": prevention_strategies,
    "best_practices": best_practices,
    "validation_rules": validation_rules,
    "process_improvements": process_improvements
}
```

### Step 3: Knowledge Base Update
**auto: true**
```python
# Update knowledge base
for category, updates in knowledge_updates.items():
    if updates:
        update_knowledge_category(category, updates)
```

### Step 4: Pattern Library Update
**auto: true**
```python
# Update pattern library
for pattern in patterns:
    if pattern not in existing_patterns:
        add_new_pattern(pattern)
    else:
        update_existing_pattern(pattern)
```

### Step 5: Prevention Strategy Update
**auto: true**
```python
# Update prevention strategies
for strategy in prevention_strategies:
    update_prevention_strategy(strategy)
```

### Step 6: Validation Rules Update
**auto: true**
```python
# Update validation rules
for rule in validation_rules:
    add_validation_rule(rule)
```

### Step 7: Agent Guidelines Update
**auto: true**
```python
# Update agent guidelines
for agent in affected_agents:
    update_agent_guidelines(agent, knowledge_updates)
```

### Step 8: Knowledge Base Validation
**auto: true**
```python
# Validate knowledge base updates
validation_result = validate_knowledge_base()
if not validation_result["valid"]:
    fix_knowledge_base_issues(validation_result["issues"])
```

## Output
- Knowledge base updated with new learning
- Pattern library enhanced
- Prevention strategies updated
- Validation rules added
- Agent guidelines updated

## Success Criteria
- [ ] Learning insights extracted and classified
- [ ] Knowledge base updated with new information
- [ ] Pattern library enhanced
- [ ] Prevention strategies updated
- [ ] Validation rules added
- [ ] Agent guidelines updated
- [ ] Knowledge base validated

## Notes
- Ensure knowledge updates are accurate and actionable
- Maintain consistency across knowledge base
- Update all relevant agents and systems
- Validate updates before deployment
- Track effectiveness of knowledge updates

