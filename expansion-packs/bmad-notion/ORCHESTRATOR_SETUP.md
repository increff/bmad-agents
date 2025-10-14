# Notion Orchestrator - @notion

## Quick Activation

Simply type:
```bash
@notion
```

This immediately activates the Notion Integrator agent with:
- ✅ Auto-display of `*notion-help` command
- ✅ API connectivity verification
- ✅ Ready to extract and push

## What is @notion?

`@notion` is the orchestrator alias for the Notion Integrator agent. It provides instant access to all Notion integration features without needing to remember the full agent path.

## Comparison

### Old Way (still works):
```bash
*load notion-integrator
```

### New Way (recommended):
```bash
@notion
```

## After Activation

Once `@notion` is loaded, you'll see:

```
📝 Welcome! I'm the Notion Integrator

I can help you:
• Extract requirements from Notion (Request Description only)
• Execute VIRAT implementation workflows
• Push documentation back to III. DEVELOPMENT section

Running *notion-help for you...

[Full help display]

Ready for your command!
```

## Usage Flow

```bash
# 1. Activate
@notion

# 2. Test connection
*notion_test

# 3. Extract and implement
*notion_implement REQ-994

# 4. Documentation auto-pushed to III. DEVELOPMENT
```

## Integration with VIRAT

You can seamlessly switch between orchestrators:

```bash
# Work with Notion
@notion
*notion_implement REQ-994

# Switch to VIRAT for manual work
@virat
*analyze some-requirement.md

# Back to Notion for another ticket
@notion
*notion_implement REQ-995
```

## Benefits of @notion

1. **Quick Access** - One command to activate
2. **Memorable** - Easy to remember `@notion`
3. **Consistent** - Follows BMAD orchestrator patterns
4. **Integrated** - Works seamlessly with other orchestrators
5. **Documented** - Auto-displays help on activation

## Configuration

The orchestrator is configured in `config.yaml`:

```yaml
default_agent: notion-integrator
orchestrator: "@notion"
```

This maps the `@notion` alias to the `notion-integrator` agent.
