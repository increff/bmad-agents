# BMAD Feedback System - Quick Reference Card

> One-page reference for the BMAD Feedback & Continuous Learning System

## 📍 Location

```
expansion-packs/bmad-feedback/
```

## 🚀 Quick Start

```bash
# Activate the feedback agent
@bmad-feedback/agents/feedback-agent.md

# Collect feedback (interactive)
*collect-feedback

# View history
*view-feedback-history

# Analyze patterns
*analyze-feedback
```

## 📋 All Commands

| Command | Description |
|---------|-------------|
| `*help` | Show all commands |
| `*collect-feedback` | Interactive feedback collection |
| `*learn-from-mistake` | Structured mistake analysis |
| `*analyze-feedback` | Pattern and trend analysis |
| `*view-feedback-history` | View historical feedback |
| `*create-learning-example` | Create reusable examples |
| `*update-knowledge-base` | Update knowledge base |
| `*generate-improvement-suggestions` | Generate recommendations |
| `*export-learning-data` | Export data for analysis |
| `*clear-feedback-data` | Clear old data (caution!) |
| `*exit` | Exit feedback agent |

## 🔗 Integration (for Developers)

### Add to Your Agent

```yaml
dependencies:
  agents:
    - ../../bmad-feedback/agents/feedback-agent.md
  data:
    - ../../bmad-feedback/data/examples.json
```

### Add Commands

```yaml
commands:
  - collect-feedback: Collect feedback when issues encountered
  - review-learnings: Review past learnings before implementation
  - apply-learnings: Apply learnings to current context
```

### Add to Workflow

```python
# At end of implementation
if issues_encountered:
    load_agent("@bmad-feedback/agents/feedback-agent.md")
    run_command("*collect-feedback")
```

## 📊 Data Files

| File | Purpose |
|------|---------|
| `data/examples.json` | Primary feedback storage |
| `data/feedback-patterns.json` | Pattern recognition data |
| `data/learning-history.json` | Historical learning records |

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Complete overview (15 min read) |
| `QUICKSTART.md` | Get started in 5 minutes |
| `docs/INTEGRATION_GUIDE.md` | Integration instructions |
| `config.yaml` | Configuration reference |
| `MIGRATION_SUMMARY.md` | Migration details |

## ✅ Integration Checklist

- [ ] Add feedback dependency to agent YAML
- [ ] Add feedback commands
- [ ] Integrate into workflow
- [ ] Test feedback collection
- [ ] Update agent documentation

## 🎯 When to Use

✅ **Use When:**
- Generated code doesn't meet expectations
- Pattern violations occur
- Business logic is incorrect
- Integration issues happen
- Testing reveals problems

❌ **Don't Use For:**
- Simple questions
- Feature requests
- External bug reports
- General support

## 💡 Best Practices

1. **Be Specific**: Include exact code and clear descriptions
2. **Provide Context**: Repository, module, task type, agent used
3. **Explain Why**: Why correct approach is better
4. **Suggest Prevention**: How to avoid similar mistakes
5. **Collect Immediately**: Don't wait, collect when fresh

## 🔍 Quick Examples

### Example 1: Wrong Code Generated

```bash
*collect-feedback

Issue: VIRAT generated SQL calculation in export
Expected: Calculation in algorithm business logic
Pattern Violated: Rule 2 - calculations in algo, not SQL
Prevention: Check Rule 2 before implementing columns
```

### Example 2: Check Similar Issues

```bash
*view-feedback-history
Filter by: repository="irisx-config", issue_type="pattern_violation"
Review prevention strategies from similar issues
```

### Example 3: Review Before Implementation

```bash
# Before starting new implementation
*view-feedback-history
Filter by: repository="target-repo", module="target-module"
Apply learnings from past mistakes
```

## 🏗️ Directory Structure

```
bmad-feedback/
├── agents/             # Feedback agent
├── checklists/         # Process checklists
├── tasks/              # Task definitions (9 tasks)
├── data/               # Feedback storage (3 JSON files)
├── docs/               # Integration guide
├── README.md           # Complete documentation
├── QUICKSTART.md       # Quick start guide
└── config.yaml         # Configuration
```

## 🔗 Key URLs (Relative Paths)

- Main Agent: `expansion-packs/bmad-feedback/agents/feedback-agent.md`
- Data: `expansion-packs/bmad-feedback/data/examples.json`
- Docs: `expansion-packs/bmad-feedback/README.md`
- Integration: `expansion-packs/bmad-feedback/docs/INTEGRATION_GUIDE.md`

## 🎓 Learning Flow

```
Issue Occurs
    ↓
Collect Feedback (*collect-feedback)
    ↓
Pattern Analysis (automatic)
    ↓
Knowledge Storage (automatic)
    ↓
Agent Improvement (automatic)
    ↓
Future Prevention
```

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't find agent | Use full path: `@expansion-packs/bmad-feedback/agents/feedback-agent.md` |
| Data not saving | Check write permissions on `data/` directory |
| No patterns found | Collect 3-5 entries minimum for patterns |

## 📞 Support

- See `README.md` for complete guide
- See `QUICKSTART.md` for examples
- See `docs/INTEGRATION_GUIDE.md` for integration
- Use feedback system itself for issues!

## 🎯 Success Metrics

Track these to measure effectiveness:
- Feedback count (increasing = good engagement)
- Pattern frequency (decreasing = learning working)
- Improvement implementation rate (high = acting on feedback)
- Mistake reduction rate (positive = system working)

---

**Remember**: The more feedback collected, the smarter the system becomes! 🧠✨

---

**Quick Access**: Bookmark this page for instant reference during development.

