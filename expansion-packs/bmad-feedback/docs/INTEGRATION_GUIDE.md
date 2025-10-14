# BMAD Feedback System - Integration Guide

> Complete guide for integrating the BMAD Feedback System into your expansion packs and agents

## Table of Contents

1. [Overview](#overview)
2. [Integration Levels](#integration-levels)
3. [Agent Integration](#agent-integration)
4. [Workflow Integration](#workflow-integration)
5. [Data Access](#data-access)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

## Overview

The BMAD Feedback System is designed to be integrated at multiple levels:

- **Agent Level**: Direct feedback agent invocation
- **Task Level**: Feedback collection after task completion
- **Workflow Level**: Feedback throughout multi-step workflows
- **Data Level**: Access to historical learnings and patterns

## Integration Levels

### Level 1: Basic Integration (Recommended Minimum)

Add feedback agent as a dependency and provide feedback collection command.

**Effort**: 5-10 minutes  
**Impact**: Users can manually invoke feedback collection

### Level 2: Automated Integration (Recommended)

Automatically invoke feedback collection at key workflow points.

**Effort**: 30-60 minutes  
**Impact**: Systematic feedback collection, better learning

### Level 3: Deep Integration (Advanced)

Pre-load learnings before implementation, automatic pattern checking, predictive prevention.

**Effort**: 2-4 hours  
**Impact**: Maximum learning effectiveness, proactive issue prevention

## Agent Integration

### Step 1: Add Feedback Dependency

Add to your agent's YAML configuration:

```yaml
dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
  data:
    - ../bmad-feedback/data/examples.json
    - ../bmad-feedback/data/feedback-patterns.json
```

### Step 2: Add Feedback Commands

```yaml
commands:
  # Basic feedback commands
  - collect-feedback: Invoke feedback agent to collect learnings and developer feedback
  - review-learnings: Load and review past learnings from bmad-feedback
  - apply-learnings: Apply relevant past learnings to current implementation approach
  
  # Advanced feedback commands (optional)
  - analyze-feedback: Analyze feedback patterns for this agent
  - view-agent-feedback: View feedback specific to this agent
  - check-similar-issues: Check if similar issues have occurred before
```

### Step 3: Update Agent Documentation

Add to your agent's README or documentation:

```markdown
## Feedback & Learning

This agent integrates with the BMAD Feedback System for continuous improvement.

### Collect Feedback
When you encounter issues or unexpected behavior:
```bash
*collect-feedback
```

### Review Past Learnings
Before starting a new task:
```bash
*review-learnings
```

### Analyze Patterns
Periodically analyze feedback for this agent:
```bash
*analyze-feedback
```
```

## Workflow Integration

### Pattern 1: Post-Implementation Feedback

Add feedback collection at the end of your workflow:

```yaml
# In your workflow definition
phases:
  # ... your existing phases ...
  
  - name: Learning & Feedback Collection
    description: "Collect learnings and feedback for continuous improvement"
    steps:
      - name: Feedback Collection
        description: "Collect feedback if implementation issues encountered"
        auto: true
        script: |
          # Check if issues were encountered
          if implementation_issues_found:
              # Load feedback agent
              load_agent("@bmad-feedback/agents/feedback-agent.md")
              
              # Collect feedback
              run_command("*collect-feedback")
              
              # Store learnings
              store_learnings(context)
      
      - name: Learning Review
        description: "Review and apply learnings for future implementations"
        auto: true
        script: |
          # Extract key learnings from this implementation
          learnings = extract_learnings(implementation_context)
          
          # Update knowledge base
          update_knowledge_base(learnings)
```

### Pattern 2: Pre-Implementation Learning Review

Load relevant learnings before starting implementation:

```yaml
# At the start of your workflow
phases:
  - name: Preparation & Learning Review
    description: "Review past learnings before implementation"
    steps:
      - name: Load Relevant Learnings
        description: "Load past learnings relevant to current task"
        auto: true
        script: |
          # Load feedback data
          feedback_data = load_feedback_data()
          
          # Filter relevant learnings
          relevant_learnings = filter_learnings(
              feedback_data,
              context={
                  "repository": current_repository,
                  "module": current_module,
                  "task_type": current_task_type
              }
          )
          
          # Display learnings to user
          display_learnings(relevant_learnings)
          
          # Apply learnings to implementation approach
          apply_learnings_to_plan(relevant_learnings)
```

### Pattern 3: Continuous Validation

Validate against known patterns during implementation:

```yaml
# During implementation
validation_steps:
  - name: Pattern Validation
    description: "Validate implementation against known feedback patterns"
    auto: true
    script: |
      # Load feedback patterns
      patterns = load_feedback_patterns()
      
      # Check for known anti-patterns
      for pattern in patterns:
          if pattern_detected(current_implementation, pattern):
              warn_user(pattern["prevention_strategy"])
              suggest_alternative(pattern["correct_approach"])
```

## Data Access

### Reading Feedback Data

```python
# Load all feedback
feedback_data = load_json("@bmad-feedback/data/examples.json")

# Filter by agent
agent_feedback = [
    entry for entry in feedback_data["feedback_entries"]
    if entry["context"]["agent_used"] == "your-agent-name"
]

# Filter by repository
repo_feedback = [
    entry for entry in feedback_data["feedback_entries"]
    if entry["context"]["repository"] == "your-repo-name"
]

# Filter by date range
recent_feedback = [
    entry for entry in feedback_data["feedback_entries"]
    if datetime.fromisoformat(entry["timestamp"]) > cutoff_date
]
```

### Reading Pattern Data

```python
# Load patterns
patterns = load_json("@bmad-feedback/data/feedback-patterns.json")

# Get high-frequency patterns
high_frequency = [
    pattern for pattern in patterns["patterns"]
    if pattern["frequency"] > 5
]

# Get patterns by category
code_gen_patterns = patterns["pattern_categories"]["code_generation"]
```

### Reading Learning History

```python
# Load learning history
history = load_json("@bmad-feedback/data/learning-history.json")

# Get agent-specific learnings
agent_learnings = [
    entry for entry in history["learning_entries"]
    if entry["context"]["agent_used"] == "your-agent-name"
]
```

## Best Practices

### 1. Context Enrichment

Always provide rich context when collecting feedback:

```python
feedback_context = {
    "repository": repository_name,
    "module": module_name,
    "task_type": task_type,
    "agent_used": agent_name,
    "requirement_id": requirement_id,  # if applicable
    "workflow_phase": current_phase,
    "timestamp": get_timestamp(),
    "user": current_user
}
```

### 2. Specific Issue Description

Be specific about what went wrong:

```markdown
❌ Bad: "Code was wrong"

✅ Good: "VIRAT generated SQL calculation in export query instead of 
         pre-calculating in algorithm business logic. This violates 
         Rule 2 critical_new_column_pattern which states calculations 
         must be in algorithm, not SQL."
```

### 3. Actionable Solutions

Provide actionable correct approaches:

```markdown
❌ Bad: "Fix the code"

✅ Good: "1. Add field to Row class in algorithm
         2. Calculate value in business logic method
         3. Update File class to include field
         4. Export query should SELECT pre-calculated field
         5. Do NOT add calculations in SQL"
```

### 4. Prevention Strategies

Always suggest how to prevent similar issues:

```markdown
✅ Good Prevention Strategy:
   "Before implementing new columns/fields:
    1. Check Rule 2 critical_new_column_pattern
    2. Verify calculation location (algorithm vs SQL)
    3. Update all 4 layers: Row, File, Algorithm, Config
    4. Validate export query has no calculations"
```

### 5. Regular Analysis

Schedule periodic feedback analysis:

```python
# Weekly feedback analysis
if is_monday():
    load_agent("@bmad-feedback/agents/feedback-agent.md")
    run_command("*analyze-feedback")
    
    # Review improvement suggestions
    run_command("*generate-improvement-suggestions")
    
    # Implement high-priority improvements
    implement_improvements(high_priority_suggestions)
```

## Examples

### Example 1: VIRAT Integration

```yaml
# virat.md - Complete integration example

dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
  data:
    - ../bmad-feedback/data/examples.json

commands:
  # Feedback commands
  - collect-feedback: Invoke feedback agent to collect learnings
  - review-learnings: Load and review past learnings
  - apply-learnings: Apply relevant past learnings to current context

# In workflow
*implement command phases:
  
  Phase 0: Learning Context Loading
    Step 1: Load relevant past learnings
      ```python
      learnings = load_learnings(
          agent="virat",
          repository=target_repository,
          task_type=requirement_type
      )
      display_relevant_learnings(learnings)
      ```
  
  # ... implementation phases ...
  
  Phase 6: Learning & Feedback Collection
    Step 27: Learning Extraction
      ```python
      if implementation_had_issues:
          load_agent("@bmad-feedback/agents/feedback-agent.md")
          run_command("*collect-feedback")
      ```
    
    Step 28: Developer Feedback Collection
      ```python
      collect_structured_feedback(
          implementation_context,
          developer_notes,
          lessons_learned
      )
      ```
    
    Step 29: Knowledge Storage
      ```python
      store_in_knowledge_base(
          learnings,
          feedback,
          patterns_identified
      )
      ```
```

### Example 2: Custom Algorithm Debugger Integration

```yaml
# algorithm-debugger.md

dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
  data:
    - ../bmad-feedback/data/examples.json

commands:
  - collect-debug-feedback: Collect feedback on debugging issues
  - check-similar-bugs: Check if similar bugs have been debugged before

# Custom command implementation
*collect-debug-feedback:
  description: "Collect feedback on debugging session"
  steps:
    - Load feedback agent
    - Gather debug context:
        * Bug description
        * Root cause identified
        * Fix applied
        * Prevention strategy
    - Store in feedback system
    - Update debugging knowledge base
```

### Example 3: Pattern Expert Integration

```yaml
# pattern-expert.md

dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
  data:
    - ../bmad-feedback/data/feedback-patterns.json

# Pre-analysis pattern check
*analyze-patterns:
  before_analysis:
    - Load known anti-patterns from feedback
    - Load common mistakes for this repository
    - Display warnings for known issues
  
  during_analysis:
    - Check for pattern violations
    - Alert on known problematic patterns
    - Suggest alternatives from feedback
  
  after_analysis:
    - Validate against feedback patterns
    - Store new patterns discovered
    - Update pattern library
```

## Integration Checklist

### For New Expansion Packs

- [ ] Add feedback agent dependency
- [ ] Add feedback commands to command list
- [ ] Integrate feedback collection in workflow
- [ ] Add learning review at workflow start
- [ ] Update agent documentation
- [ ] Test feedback collection
- [ ] Validate data storage
- [ ] Document integration in README

### For Existing Expansion Packs

- [ ] Review current feedback mechanisms (if any)
- [ ] Add bmad-feedback dependency
- [ ] Replace/enhance existing feedback with bmad-feedback
- [ ] Update workflows to include feedback collection
- [ ] Migrate existing feedback data (if applicable)
- [ ] Update documentation
- [ ] Test integration
- [ ] Train users on new feedback system

## Troubleshooting

### Issue: Feedback agent not found

**Cause**: Incorrect path to feedback agent  
**Solution**: Use relative path from your expansion pack:
```yaml
dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
```

### Issue: Cannot write to feedback data files

**Cause**: Permission issues or file locks  
**Solution**: 
1. Check file permissions on `data/` directory
2. Ensure no processes have files open
3. Verify write access to feedback data directory

### Issue: Learnings not appearing in analysis

**Cause**: Insufficient feedback entries or incorrect filtering  
**Solution**:
1. Collect at least 3-5 feedback entries
2. Check filter criteria in analysis
3. Verify data is properly stored in examples.json

### Issue: Pattern recognition not working

**Cause**: Insufficient samples or low confidence threshold  
**Solution**:
1. Collect more feedback samples (minimum 3 per pattern)
2. Adjust confidence threshold in config.yaml
3. Ensure feedback entries have consistent error_type classification

## Support

For integration support:
- Check `README.md` for overview
- Check `QUICKSTART.md` for quick examples
- Review existing integration in VIRAT
- Use feedback system itself to report integration issues

## Contributing

Help improve the feedback system:
1. Use it extensively in your agents
2. Provide feedback on the feedback system (meta!)
3. Share integration patterns that work well
4. Contribute to pattern library
5. Suggest improvements through improvement suggestions

---

**Remember**: The goal is to create a self-improving ecosystem where every mistake teaches all agents, and no mistake is repeated!

