# Notion Integration - Command Help Reference

## *notion-help Command

When users type `*notion-help`, they will see:

```
📝 NOTION INTEGRATION - Available Commands

═══════════════════════════════════════════════════════════════

🚀 CORE COMMANDS

1. *notion_implement <page_url_or_id>
   Extract requirement from Notion and execute complete VIRAT implementation
   
   Examples:
   • *notion_implement REQ-994
   • *notion_implement https://notion.so/workspace/REQ-994-abc123
   
   Options:
   --dry-run          Preview extraction without implementing
   --no-push          Skip automatic documentation push
   --verbose          Show detailed logs

2. *notion_push [page_url_or_id]
   Push generated documentation to III. DEVELOPMENT section
   
   Examples:
   • *notion_push                    # Auto-detect from last implementation
   • *notion_push REQ-994
   • *notion_push https://notion.so/...
   
   Options:
   --files "file1,file2"  Push specific files only
   --format blocks        Upload as blocks (default) or attachments

3. *notion_status
   Show current integration status and last operation

═══════════════════════════════════════════════════════════════

🔧 UTILITY COMMANDS

4. *notion_test
   Test Notion API connectivity and verify credentials

5. *notion_fetch <page_url_or_id>
   Preview requirement extraction without implementing
   
   Example:
   • *notion_fetch REQ-994 --dry-run

6. *notion_list
   List recent requirements from Notion database

7. *notion_config
   Show current configuration and field mappings

8. *notion-help
   Show this help message

9. *exit
   Exit Notion Integrator and return to BMAD

═══════════════════════════════════════════════════════════════

📋 WHAT GETS EXTRACTED
• Requirement ID (No ID field) - to locate the page
• Request Description - the ONLY content extracted

❌ WHAT DOES NOT GET EXTRACTED
• No metadata (Title, Stage, Phase, Status, Priority, Lead, etc.)
• No development sections, dates, or relations

📤 WHERE DOCUMENTATION IS PUSHED
• INSIDE "III. DEVELOPMENT" section only
• As nested toggle blocks
• Does NOT update any page properties

═══════════════════════════════════════════════════════════════

💡 QUICK START

1. Test connection:
   *notion_test

2. Extract and implement:
   *notion_implement REQ-994

3. Documentation automatically pushed to III. DEVELOPMENT

For detailed setup, see QUICKSTART.md
```

## Command Summary Table

| Command | Purpose | Required Args | Optional Flags |
|---------|---------|---------------|----------------|
| `*notion-help` | Show help | None | None |
| `*notion_implement` | Extract & implement | page_url_or_id | --dry-run, --no-push, --verbose |
| `*notion_push` | Push docs | None (auto-detect) or page_url_or_id | --files, --format |
| `*notion_test` | Test API | None | None |
| `*notion_fetch` | Preview extraction | page_url_or_id | --dry-run |
| `*notion_list` | List requirements | None | None |
| `*notion_status` | Show status | None | None |
| `*notion_config` | Show config | None | None |
| `*exit` | Exit agent | None | None |

## Usage Examples

### Getting Help
```bash
*notion-help
```

### Basic Workflow
```bash
# 1. Test connection
*notion_test

# 2. View help
*notion-help

# 3. Extract and implement
*notion_implement REQ-994

# 4. Push documentation (automatic, but can be done manually)
*notion_push REQ-994
```

### Advanced Usage
```bash
# Preview extraction without implementing
*notion_fetch REQ-994 --dry-run

# Implement without auto-push
*notion_implement REQ-994 --no-push

# Push specific files
*notion_push REQ-994 --files "CHANGELOG.md,PLAN.md"

# Verbose output
*notion_implement REQ-994 --verbose
```

## Help Display Features

The `*notion-help` command provides:

1. **Complete Command List** - All available commands with descriptions
2. **Usage Examples** - Real-world examples for each command
3. **Option Flags** - All available options and their purposes
4. **Extraction Rules** - Clear explanation of what gets extracted
5. **Push Behavior** - Where documentation goes and what doesn't get updated
6. **Quick Start Guide** - 3-step process to get started
7. **Documentation Links** - References to detailed guides

## Activation

### Using @notion Orchestrator (Recommended)
```bash
@notion
```

### Using Direct Load
```bash
*load notion-integrator
```

## First-Time User Experience

When a user activates with `@notion`, they see:

```
👋 Welcome! I'm the Notion Integrator

I can help you:
• Extract requirements from Notion (Request Description only)
• Execute VIRAT implementation workflows
• Push documentation back to III. DEVELOPMENT section

Running *notion-help for you...

[Full help display appears here]

Ready for your command!
```

## Orchestrator Benefits

Using `@notion` provides:
- ✅ **Quick activation** - Just 7 characters to type
- ✅ **Auto-help display** - Immediately see all commands
- ✅ **API verification** - Checks connectivity on load
- ✅ **Consistent pattern** - Matches other BMAD orchestrators like `@virat`
