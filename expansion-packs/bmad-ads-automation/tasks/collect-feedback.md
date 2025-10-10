# Collect Feedback Task

## Task Overview
Collect comprehensive feedback when generated code or plans don't meet developer expectations.

## Prerequisites
- Developer has encountered an issue with generated code/plan
- Issue has been identified and documented
- Context is available (repository, module, task type, agent used)

## Task Steps

### Step 1: Issue Identification
**elicit: true**
```
I need to understand what went wrong. Please provide:

1. What specific issue did you encounter?
2. What code/plan was generated that caused the problem?
3. What did you expect instead?
4. How critical is this issue? (high/medium/low)
```

### Step 2: Context Collection
**elicit: true**
```
To better understand the context, please provide:

1. Which repository were you working on?
2. Which module or component was involved?
3. What type of task were you performing? (analysis/development/testing/validation/documentation)
4. Which BMAD agent was used?
5. When did this issue occur?
```

### Step 3: Solution Documentation
**elicit: true**
```
Now I need to understand the correct approach:

1. What is the correct way to implement this solution?
2. Can you provide the correct code/plan?
3. Why is this approach correct?
4. Are there any best practices that should be followed?
5. How can we prevent this mistake in the future?
```

### Step 4: Learning Integration
**elicit: true**
```
To help improve the system, please provide:

1. What pattern or rule was violated?
2. Why do you think this mistake happened?
3. What could prevent similar mistakes in the future?
4. How could the agent/system be improved?
5. Any other insights or suggestions?
```

### Step 5: Data Storage
**auto: true**
```python
# Store feedback in examples.json
feedback_entry = {
    "id": generate_unique_id(),
    "timestamp": get_current_timestamp(),
    "developer": developer_name,
    "context": {
        "repository": repository_name,
        "module": module_name,
        "task_type": task_type,
        "agent_used": agent_name
    },
    "issue": {
        "description": issue_description,
        "generated_code": generated_code,
        "error_type": error_type,
        "impact": impact_level
    },
    "solution": {
        "correct_approach": correct_approach,
        "correct_code": correct_code,
        "explanation": explanation,
        "prevention_tips": prevention_tips
    },
    "learning": {
        "pattern_learned": pattern_learned,
        "prevention_strategy": prevention_strategy,
        "improvement_suggestion": improvement_suggestion
    },
    "status": "processed"
}

# Save to examples.json
save_feedback_entry(feedback_entry)
```

### Step 6: Pattern Analysis
**auto: true**
```python
# Analyze for patterns
patterns = analyze_feedback_patterns(feedback_entry)
if patterns:
    update_feedback_patterns(patterns)
```

### Step 7: Improvement Suggestions
**auto: true**
```python
# Generate improvement suggestions
suggestions = generate_improvement_suggestions(feedback_entry)
if suggestions:
    save_improvement_suggestions(suggestions)
```

## Output
- Feedback entry stored in examples.json
- Pattern analysis completed
- Improvement suggestions generated
- Learning insights captured

## Success Criteria
- [ ] All required feedback information collected
- [ ] Feedback stored in examples.json
- [ ] Patterns analyzed and updated
- [ ] Improvement suggestions generated
- [ ] Learning insights captured

## Notes
- Be empathetic and supportive during feedback collection
- Focus on learning and improvement, not blame
- Ensure all information is captured accurately
- Follow up on improvement suggestions

