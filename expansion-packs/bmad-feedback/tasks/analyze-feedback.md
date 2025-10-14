# Analyze Feedback Task

## Task Overview
Analyze collected feedback patterns and trends to identify common issues and improvement opportunities.

## Prerequisites
- Feedback data is available in examples.json
- Learning history is available in learning-history.json
- Sufficient feedback data for analysis

## Task Steps

### Step 1: Data Collection
**auto: true**
```python
# Load feedback data
feedback_data = load_feedback_data("examples.json")
learning_data = load_learning_data("learning-history.json")
```

### Step 2: Pattern Analysis
**auto: true**
```python
# Analyze patterns in feedback
patterns = analyze_feedback_patterns(feedback_data)
common_mistakes = identify_common_mistakes(feedback_data)
trends = analyze_feedback_trends(feedback_data)
```

### Step 3: Frequency Analysis
**auto: true**
```python
# Analyze mistake frequency
mistake_frequency = calculate_mistake_frequency(feedback_data)
agent_performance = analyze_agent_performance(feedback_data)
repository_issues = analyze_repository_issues(feedback_data)
```

### Step 4: Root Cause Analysis
**auto: true**
```python
# Analyze root causes
root_causes = analyze_root_causes(feedback_data)
systematic_issues = identify_systematic_issues(feedback_data)
process_gaps = identify_process_gaps(feedback_data)
```

### Step 5: Impact Assessment
**auto: true**
```python
# Assess impact of issues
impact_analysis = assess_impact(feedback_data)
high_impact_issues = identify_high_impact_issues(feedback_data)
improvement_priorities = prioritize_improvements(feedback_data)
```

### Step 6: Trend Analysis
**auto: true**
```python
# Analyze trends over time
time_trends = analyze_time_trends(feedback_data)
improvement_trends = analyze_improvement_trends(learning_data)
effectiveness_metrics = calculate_effectiveness_metrics(feedback_data)
```

### Step 7: Report Generation
**auto: true**
```python
# Generate analysis report
analysis_report = {
    "summary": {
        "total_feedback": len(feedback_data),
        "common_patterns": patterns,
        "trends": trends,
        "improvement_areas": improvement_priorities
    },
    "detailed_analysis": {
        "mistake_frequency": mistake_frequency,
        "agent_performance": agent_performance,
        "root_causes": root_causes,
        "impact_assessment": impact_analysis
    },
    "recommendations": {
        "immediate_actions": immediate_actions,
        "long_term_improvements": long_term_improvements,
        "process_changes": process_changes
    }
}

# Save analysis report
save_analysis_report(analysis_report)
```

## Output
- Comprehensive analysis report
- Pattern identification
- Trend analysis
- Improvement recommendations
- Performance metrics

## Success Criteria
- [ ] All feedback data analyzed
- [ ] Patterns identified and documented
- [ ] Trends analyzed over time
- [ ] Root causes identified
- [ ] Improvement recommendations generated
- [ ] Analysis report created

## Notes
- Focus on actionable insights
- Identify both immediate and long-term improvements
- Consider both technical and process improvements
- Track effectiveness of previous improvements

