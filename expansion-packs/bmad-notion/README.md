# BMAD Notion Integration

Seamless Notion integration for requirement extraction and documentation push-back workflow.

> 📚 **[View Complete Documentation →](DOCUMENTATION.md)**

## Quick Start

```bash
@notion                    # Activate Notion Integrator
*notion_test              # Test connection
*notion_implement REQ-994 # Extract & implement
```

## Overview

The BMAD Notion Integration expansion pack enables direct integration with Notion workspaces, allowing you to:

1. **Extract Requirements**: Fetch requirements directly from Notion databases using ticket IDs or URLs
2. **Auto-Implementation**: Automatically feed extracted requirements to VIRAT's `*implement` workflow
3. **Documentation Push**: Push all generated documentation back to the same Notion ticket

## Features

### 🔍 `*notion_implement` - Extract & Implement

Extract requirements from Notion and automatically execute the complete implementation workflow.

**Usage:**
```bash
# Using Notion page URL
*notion_implement https://www.notion.so/workspace/REQ-994-abc123

# Using Requirement ID (No ID column)
*notion_implement REQ-994
```

**What it does:**
1. Connects to Notion using credentials from `.env`
2. Extracts requirement content from page blocks (below Comments section)
3. Converts to standard requirement format
4. Automatically calls VIRAT's `*implement` command
5. Executes complete implementation workflow
6. Tracks Notion page ID for documentation push-back

### 📤 `*notion_push` - Push Documentation

Push all generated documentation files back to the source Notion ticket.

**Usage:**
```bash
# After notion_implement completes
*notion_push

# Or explicitly specify page
*notion_push REQ-994
*notion_push https://www.notion.so/workspace/REQ-994-abc123
```

**What it does:**
1. Identifies all `.md` documentation files generated during workflow
2. Retrieves the original Notion page ID
3. Finds the section below Comments in the Notion page
4. Uploads documentation to the same location where content was extracted (below Comments)
5. Does NOT update any ticket properties or metadata

## JavaScript Handler Scripts

This integration includes JavaScript scripts that handle the actual Notion API interactions:

### 🔧 Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd expansion-packs/bmad-notion
   ./install.sh
   ```

2. **Configure Environment**:
   Edit the `.env` file with your Notion credentials:
   ```env
   NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NOTION_VIEW_ID=xxxxxxxxxxxx
   ```

3. **Test Connection**:
   ```bash
   npm run test
   ```

### 📜 Available Scripts

All scripts are now organized in the `scripts/` folder:

#### Quick Commands via npm:
```bash
# Test API connection
npm run test

# Fetch requirement (preview only)
npm run fetch REQ-994

# Extract and prepare for implementation
npm run implement REQ-994

# Push documentation to Notion
npm run push

# Show integration status
npm run status

# List requirements from database
npm run list

# Show configuration
npm run config

# Display help
npm run help

# Interactive mode
npm run interactive
```

#### Direct Script Execution:
```bash
# Main handler
node scripts/notion-handler.js test
node scripts/notion-handler.js fetch REQ-994
node scripts/notion-handler.js implement REQ-994

# Command dispatcher (recommended)
node scripts/notion-dispatcher.js notion_test
node scripts/notion-dispatcher.js notion_implement REQ-994

# Individual commands
node scripts/notion-push.js [REQ-ID]
node scripts/notion-status.js
node scripts/notion-list.js [options]
node scripts/notion-config.js
node scripts/notion-help.js
```

### 🔄 Command Flow

When you use `*notion-fetch` or `*notion-implement` in BMAD:

1. **Command Parsing**: `scripts/notion-command-wrapper.js` parses the command
2. **API Interaction**: Delegates to `notion-handler.js` for Notion API calls
3. **Data Processing**: Extracts requirement data and formats for VIRAT
4. **File Output**: Creates `docs/.notion-extracted-data.json` and `docs/.virat-requirement.md`

### 📁 Generated Files

All extracted data is stored in the `docs/` folder:

- `docs/.notion-extracted-data.json` - Raw extracted data from Notion
- `docs/.virat-requirement.md` - Formatted requirement for VIRAT workflow
- `docs/.notion-tracking.json` - Tracking data for push operations
- `.env` - Environment variables (created from `env.example`)

## Installation

1. **Install the expansion pack:**
   ```bash
   # BMAD will prompt for:
   # - Notion API Key (Integration Token)
   # - Notion Database ID
   # - View ID (optional)
   ```

2. **Activate Notion Integrator:**
   ```bash
   @notion
   ```
   
   This loads the Notion Integrator agent and displays help automatically.

3. **Create Notion Integration:**
   - Go to https://www.notion.so/my-integrations
   - Create new integration
   - Copy the Internal Integration Token
   - Share your database with the integration

4. **Configure `.env` file:**
   ```bash
   NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NOTION_VIEW_ID=xxxxxxxxxxxx  # Optional
   ```

## Field Mappings

The integration extracts ONLY these fields:

| Notion Property | Purpose |
|----------------|---------|
| No ID | Used to locate the correct page |
| Content Below Comments | Page content extracted from blocks below Comments section |
| Below Comments | Target section for pushing documentation (same location as extraction) |

## Workflow Example

```bash
# Step 0: Activate Notion Integrator
@notion

# Step 1: Extract requirement from Notion and implement
*notion_implement REQ-994

# BMAD extracts content from page blocks (below Comments) from REQ-994:
# 1. Multiple ROS periods & factorization
# 2. Closing WH stock combine in Reordering
# 3. MOQ bound Reorder Qty
# (No other fields are extracted)

# Step 2: VIRAT automatically:
# - Analyzes requirement
# - Crawls repositories
# - Creates implementation plan
# - Executes implementation
# - Generates documentation

# Step 3: Push documentation back to Notion (below Comments section)
*notion_push REQ-994

# Uploads to the section below Comments (same location as extraction):
# - 📋 Implementation Complete - [date]
#   ├─ REQUIREMENT_ANALYSIS.md
#   ├─ IMPLEMENTATION_PLAN.md
#   ├─ ALGORITHM_CHANGES.md
#   ├─ LOADAPI_CHANGES.md
#   ├─ CONFIG_CHANGES.md
#   └─ CHANGELOG.md
```

## Documentation Files Pushed

The following documentation files are automatically pushed back to Notion:

- All `.md` files generated during implementation
- Analysis and planning documents
- Implementation summaries
- Changelogs
- Test results
- README updates

## Environment Variables

```bash
# Required
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional
NOTION_VIEW_ID=xxxxxxxxxxxx
NOTION_API_VERSION=2022-06-28
```

## Commands Reference

### `*notion-help`

**Purpose**: Show detailed help for all Notion integration commands

**Usage**: `*notion-help`

**Displays**:
- Complete list of all Notion commands
- Usage examples
- Options and flags
- What gets extracted vs. what doesn't
- Where documentation is pushed
- Quick start guide

### `*notion_implement`

**Purpose**: Extract requirements from Notion and execute implementation

**Arguments:**
- `page_url_or_id` - Notion page URL or requirement ID

**Options:**
- `--dry-run` - Preview extracted requirement without implementing
- `--no-push` - Skip automatic documentation push after implementation
- `--verbose` - Show detailed extraction and API logs

**Examples:**
```bash
*notion_implement REQ-994
*notion_implement https://notion.so/workspace/REQ-994-abc
*notion_implement REQ-994 --dry-run
*notion_implement REQ-994 --no-push
```

### `*notion_push`

**Purpose**: Push documentation back to Notion ticket

**Arguments:**
- `page_url_or_id` - (Optional) Notion page URL or requirement ID. If not provided, uses last implemented ticket.

**Options:**
- `--files` - Specific files to push (comma-separated)
- `--format` - Upload format: `attachment` or `blocks` (default: blocks)
- `--update-status` - Update ticket status after push (default: true)

**Examples:**
```bash
*notion_push
*notion_push REQ-994
*notion_push REQ-994 --files "PLAN.md,CHANGELOG.md"
*notion_push REQ-994 --format attachment
```

## Troubleshooting

### Authentication Issues
- Verify your Notion API key is correct
- Ensure integration has access to the database
- Check that database is shared with the integration

### Field Mapping Issues
- Verify column names match `field_mappings` in `config.yaml`
- Check that properties exist in your Notion database
- Ensure property types are compatible

### Push Issues
- Verify page permissions allow uploads
- Check file size limits (Notion has 5MB limit for attachments)
- Ensure API rate limits are not exceeded

## Advanced Configuration

Edit `config.yaml` to customize:

- **Field Mappings**: Adjust property names to match your Notion database
- **Documentation Patterns**: Add/remove file patterns to push
- **API Settings**: Configure API version, timeouts, retry logic

## Integration with VIRAT

The Notion integration seamlessly works with VIRAT:

1. `*notion_implement` extracts requirements → feeds to VIRAT's `*implement`
2. VIRAT executes complete workflow across all repositories
3. `*notion_push` uploads all VIRAT-generated documentation back to Notion

This creates a complete closed-loop workflow from Notion ticket to implemented code with full documentation.

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Notion API documentation: https://developers.notion.com
- Contact BMAD support team

## License

MIT License - See LICENSE file for details

