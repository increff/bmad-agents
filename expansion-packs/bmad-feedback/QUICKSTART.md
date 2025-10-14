# BMAD Feedback System - Quick Start Guide

> Get started with the BMAD Feedback & Continuous Learning System in 5 minutes

## What is BMAD Feedback?

A universal feedback collection and learning system that works across **all** BMAD expansion packs to:
- ✅ Collect feedback when things go wrong
- ✅ Learn from mistakes automatically
- ✅ Prevent future similar issues
- ✅ Improve agent performance over time

## Quick Start

### 1. Activate the Feedback Agent

```bash
# In your BMAD environment, load the feedback agent
@bmad-feedback/agents/feedback-agent.md
```

The agent will greet you and show available commands automatically.

### 2. Collect Your First Feedback

When you encounter an issue with generated code or plans:

```bash
*collect-feedback
```

The agent will guide you through an interactive process to collect:
1. **What went wrong** - Details about the issue
2. **Context** - Repository, module, task type, agent used
3. **Correct approach** - How it should have been done
4. **Learning insights** - What to learn and how to prevent

### 3. View Your Feedback

```bash
*view-feedback-history
```

This shows all collected feedback with filtering options.

### 4. Analyze Patterns

```bash
*analyze-feedback
```

Automatically identifies patterns and trends in your feedback.

## Common Scenarios

### Scenario 1: Wrong Code Generated

```bash
# Situation: VIRAT generated code that doesn't follow patterns

1. Load feedback agent: @bmad-feedback/agents/feedback-agent.md
2. Run: *collect-feedback
3. Provide:
   - What was generated (wrong code)
   - What should have been generated (correct code)
   - Why the correct approach is better
   - Pattern that was violated
```

### Scenario 2: Learning from Past Mistakes

```bash
# Situation: Want to check if similar issues happened before

1. Load feedback agent: @bmad-feedback/agents/feedback-agent.md
2. Run: *view-feedback-history
3. Filter by: agent, repository, or issue type
4. Review patterns and prevention strategies
```

### Scenario 3: Improving Agent Performance

```bash
# Situation: Want to generate improvement suggestions

1. Load feedback agent: @bmad-feedback/agents/feedback-agent.md
2. Run: *analyze-feedback
3. Run: *generate-improvement-suggestions
4. Review ranked suggestions
5. Implement high-priority improvements
```

## Integration with Existing Agents

### In VIRAT Workflows

VIRAT automatically integrates feedback at the end of implementations:

```markdown
## Phase 6: Learning & Feedback Collection (Automatic)

27. **Learning Extraction**: Invoke feedback agent
28. **Developer Feedback Collection**: Structured feedback
29. **Knowledge Storage**: Store in examples.json
30. **Process Improvement**: Apply to future implementations
```

### In Custom Agents

Add to your agent's dependencies:

```yaml
dependencies:
  agents:
    - ../bmad-feedback/agents/feedback-agent.md
```

Add feedback commands:

```yaml
commands:
  - collect-feedback: Collect feedback when issues are encountered
  - review-learnings: Review past learnings before implementation
```

## Key Commands Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `*help` | Show all commands | When you need guidance |
| `*collect-feedback` | Collect comprehensive feedback | When implementation doesn't meet expectations |
| `*learn-from-mistake` | Analyze a specific mistake | When you want structured learning |
| `*analyze-feedback` | Analyze patterns | Periodically to identify trends |
| `*view-feedback-history` | View past feedback | When researching similar issues |
| `*generate-improvement-suggestions` | Get data-driven suggestions | When planning improvements |
| `*create-learning-example` | Create reusable examples | When documenting best practices |

## Data Storage Locations

All feedback is stored in:

```
expansion-packs/bmad-feedback/data/
├── examples.json           # Main feedback storage
├── feedback-patterns.json  # Pattern recognition data
└── learning-history.json   # Historical learning records
```

## Feedback Quality Tips

### ✅ Good Feedback

```
Issue: VIRAT generated SQL calculation in export query
Context: REQ-1234, irisx-config repository, distribution module
Generated: SELECT style_code, store_code, quantity * price as total_value
Correct: SELECT style_code, store_code, total_value (calculated in algo)
Why: Calculations belong in algorithm business logic, not SQL
Prevention: Always check Rule 2 - critical_new_column_pattern
```

### ❌ Poor Feedback

```
Issue: Code was wrong
Correct: Fix the code
```

## Best Practices

1. **Be Specific**: Provide exact code snippets and clear descriptions
2. **Include Context**: Repository, module, task type, agent used
3. **Explain Why**: Why the correct approach is better
4. **Suggest Prevention**: How to avoid similar mistakes
5. **Timely Collection**: Collect feedback immediately when issues occur

## Next Steps

### For First-Time Users
1. ✅ Collect your first feedback
2. ✅ Review the feedback data in `data/examples.json`
3. ✅ Try analyzing patterns
4. ✅ Read the full README for advanced features

### For Integration
1. ✅ Add feedback dependency to your agent
2. ✅ Add feedback commands to your workflow
3. ✅ Test feedback collection in your context
4. ✅ See `docs/INTEGRATION_GUIDE.md` for details

### For Advanced Users
1. ✅ Export feedback data for external analysis
2. ✅ Create custom learning examples
3. ✅ Implement improvement suggestions
4. ✅ Contribute patterns back to the community

## Troubleshooting

### Issue: Can't find feedback agent

**Solution**: Use the full path:
```bash
@expansion-packs/bmad-feedback/agents/feedback-agent.md
```

### Issue: Data not saving

**Solution**: Check write permissions on `data/` directory

### Issue: No patterns detected

**Solution**: Collect more feedback entries (minimum 3-5 for pattern detection)

## Examples

### Example 1: VIRAT Implementation Feedback

```bash
Developer: "VIRAT generated a LoadAPI but missed updating upload-files.json"

Feedback Agent: *collect-feedback

Step 1: What went wrong?
> VIRAT created PlanogramDistributionLoadApi but forgot to add import ID to upload-files.json

Step 2: Context?
> Repository: ms-loadapis-ril-final
> Module: distribution
> Task: REQ-1234 - Add new planogram input
> Agent: VIRAT

Step 3: Correct approach?
> After creating LoadAPI, MUST update upload-files.json with import ID mapping
> import_id: "import_distribution_planogram_input"
> LoadAPI class: PlanogramDistributionLoadApi

Step 4: Learning?
> Pattern: Always update 3 files when creating LoadAPI:
>   1. LoadAPI class
>   2. __init__.py registrations
>   3. upload-files.json import ID
> Prevention: Add checklist step for upload-files.json
> Improvement: VIRAT should validate upload-files.json after LoadAPI creation

Result: Feedback stored, pattern recognized, prevention strategy created
```

### Example 2: Pattern Analysis

```bash
After collecting 5+ feedbacks about missing LoadAPI registrations:

*analyze-feedback

Analysis Results:
- Pattern: Missing LoadAPI registration (frequency: 5)
- Impact: High (breaks upload functionality)
- Affected Agent: VIRAT
- Suggested Prevention:
  1. Add automated validation after LoadAPI creation
  2. Update implementation checklist
  3. Add cross-reference check in VIRAT workflow

*generate-improvement-suggestions

Suggestion #1 (High Priority):
  Title: Automated LoadAPI Registration Validation
  Description: Add post-creation validation to check all 3 registration points
  Implementation: Add validation task to VIRAT workflow
  Success Metric: Zero missing registration issues in next 10 implementations
```

## Support

- **Documentation**: See `README.md` for comprehensive guide
- **Integration**: See `docs/INTEGRATION_GUIDE.md`
- **Issues**: Use feedback system itself to report issues!

---

**Remember**: The more feedback you collect, the smarter the system becomes! 🧠✨

