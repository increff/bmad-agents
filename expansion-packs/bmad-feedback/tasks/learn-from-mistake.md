# Learn from Mistake Task

## Task Overview
Learn from a specific mistake and store the learning for future reference and prevention.

## Prerequisites
- Specific mistake has been identified
- Context of the mistake is available
- Correct approach is known

## Task Steps

### Step 1: Mistake Analysis
**elicit: true**
```
Let's analyze this mistake in detail:

1. What was the specific mistake that occurred?
2. What was the incorrect approach taken?
3. What was the correct approach that should have been taken?
4. What caused this mistake to happen?
5. What pattern or rule was violated?
```

### Step 2: Root Cause Analysis
**elicit: true**
```
To prevent similar mistakes, I need to understand the root cause:

1. Was this a knowledge gap issue?
2. Was it a process or workflow issue?
3. Was it a pattern recognition failure?
4. Was it a validation or checking issue?
5. What could have prevented this mistake?
```

### Step 3: Learning Extraction
**elicit: true**
```
Let's extract the key learnings:

1. What pattern or rule should be followed?
2. What validation should be added?
3. What process improvement is needed?
4. What knowledge should be added to the system?
5. How can we detect this type of mistake earlier?
```

### Step 4: Prevention Strategy
**elicit: true**
```
Now let's create a prevention strategy:

1. What checks can be added to prevent this mistake?
2. What validation rules should be implemented?
3. What process changes are needed?
4. What training or knowledge updates are required?
5. How can we monitor for similar issues?
```

### Step 5: Learning Storage
**auto: true**
```python
# Create learning entry
learning_entry = {
    "id": generate_unique_id(),
    "timestamp": get_current_timestamp(),
    "mistake_type": mistake_type,
    "context": mistake_context,
    "root_cause": root_cause,
    "pattern_violated": pattern_violated,
    "correct_approach": correct_approach,
    "prevention_strategy": prevention_strategy,
    "learning_insights": learning_insights,
    "status": "processed"
}

# Save to learning-history.json
save_learning_entry(learning_entry)
```

### Step 6: Pattern Update
**auto: true**
```python
# Update patterns based on learning
if pattern_violated:
    update_pattern_library(pattern_violated, prevention_strategy)
```

### Step 7: Knowledge Base Update
**auto: true**
```python
# Update knowledge base with new learning
knowledge_updates = extract_knowledge_updates(learning_entry)
if knowledge_updates:
    update_knowledge_base(knowledge_updates)
```

### Step 8: Prevention Implementation
**auto: true**
```python
# Implement prevention measures
prevention_measures = create_prevention_measures(learning_entry)
if prevention_measures:
    implement_prevention_measures(prevention_measures)
```

## Output
- Learning entry stored in learning-history.json
- Pattern library updated
- Knowledge base enhanced
- Prevention measures implemented

## Success Criteria
- [ ] Mistake thoroughly analyzed
- [ ] Root cause identified
- [ ] Learning insights extracted
- [ ] Prevention strategy created
- [ ] Learning stored and processed
- [ ] Patterns and knowledge base updated

## Notes
- Focus on learning and improvement
- Extract actionable insights
- Implement prevention measures
- Track effectiveness of improvements

