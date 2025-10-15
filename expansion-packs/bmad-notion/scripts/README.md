# Notion Integration Scripts

This directory contains all the individual command scripts for the BMAD Notion Integration.

## Scripts Overview

| Script | Purpose | Usage |
|--------|---------|-------|
| `notion-dispatcher.js` | Main command router | `node notion-dispatcher.js <command>` |
| `notion-push.js` | Push documentation to Notion | `node notion-push.js [REQ-ID]` |
| `notion-test.js` | Test API connectivity | `node notion-test.js` |
| `notion-status.js` | Show integration status | `node notion-status.js` |
| `notion-list.js` | List requirements from database | `node notion-list.js [options]` |
| `notion-config.js` | Show/update configuration | `node notion-config.js [set KEY VALUE]` |
| `notion-help.js` | Display help information | `node notion-help.js [--command CMD]` |

## Quick Usage

### Using the Dispatcher (Recommended)
```bash
# Show help
node scripts/notion-dispatcher.js

# Test connection
node scripts/notion-dispatcher.js notion_test

# Extract and implement
node scripts/notion-dispatcher.js notion_implement REQ-994

# Push documentation
node scripts/notion-dispatcher.js notion_push

# Show status
node scripts/notion-dispatcher.js notion_status

# List requirements
node scripts/notion-dispatcher.js notion_list

# Show configuration
node scripts/notion-dispatcher.js notion_config
```

### Interactive Mode
```bash
node scripts/notion-dispatcher.js --interactive
```

### Direct Script Usage
```bash
# Test connection
node scripts/notion-test.js

# Push documentation
node scripts/notion-push.js REQ-994

# List requirements with filters
node scripts/notion-list.js --filter status active --limit 10

# Show detailed configuration
node scripts/notion-config.js

# Get help for specific command
node scripts/notion-help.js --command notion_implement
```

## Command Categories

### Core Commands
- **notion_implement** - Extract requirement and execute VIRAT implementation
- **notion_push** - Push generated documentation back to Notion

### Utility Commands
- **notion_test** - Test API connectivity and credentials
- **notion_status** - Show current integration status
- **notion_list** - List and search requirements
- **notion_config** - View and update configuration
- **notion-help** - Display help and usage information

## Dependencies

All scripts require:
- Node.js
- `@notionhq/client` package
- `dotenv` package
- Valid `.env` configuration

## Environment Setup

Ensure your `.env` file contains:
```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_VIEW_ID=xxxxxxxxxxxx  # Optional
```

## Integration with BMAD

These scripts are called by the BMAD system through:
- The main `notion-handler.js` (for implement/fetch)
- The `scripts/notion-command-wrapper.js` (for command parsing)
- The `@notion` orchestrator (for activation)

## Error Handling

All scripts include comprehensive error handling for:
- Missing environment variables
- Invalid Notion credentials
- API connection failures
- Missing permissions
- Rate limiting

## Logging

Scripts provide detailed logging with:
- ✅ Success indicators
- ❌ Error messages
- 💡 Helpful tips
- 📊 Status information
- 🚀 Progress indicators

## Development

To modify or extend functionality:
1. Edit the appropriate script file
2. Test with direct execution
3. Verify integration through dispatcher
4. Update this README if adding new scripts

## Support

For issues with specific scripts:
1. Check the error messages and tips
2. Verify environment configuration
3. Test API connectivity with `notion-test.js`
4. Review the main documentation in `../COMPLETE_DOCUMENTATION.md`
