# VIRAT Notion Integration

Integrated Notion support for seamless requirement extraction and documentation push-back within VIRAT's `*implement` workflow.

## Overview

VIRAT now includes native Notion integration, allowing you to:
- Extract requirements directly from Notion pages using URLs or requirement IDs
- Implement requirements using VIRAT's comprehensive development workflow
- Automatically push generated documentation back to the same Notion page

All of this happens in **one command**: `*implement`

## Installation

### Prerequisites
- Node.js >= 16.0.0
- npm

### Setup

1. Navigate to the notion-integration directory:
   ```bash
   cd expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/notion-integration
   ```

2. Run the installation script:
   ```bash
   ./install.sh
   ```

3. Configure your Notion credentials in `.env`:
   ```bash
   NOTION_API_KEY=secret_your_notion_api_key_here
   NOTION_DATABASE_ID=your_database_id_here
   ```

### Getting Notion Credentials

1. **Notion API Key**:
   - Go to https://www.notion.so/my-integrations
   - Click "+ New integration"
   - Give it a name (e.g., "VIRAT Integration")
   - Copy the "Internal Integration Token"
   - This is your `NOTION_API_KEY`

2. **Notion Database ID**:
   - Open your requirements database in Notion
   - Copy the database URL: `https://notion.so/workspace/DATABASE_ID?v=...`
   - Extract the 32-character hex string between workspace name and `?v=`
   - This is your `NOTION_DATABASE_ID`

3. **Share Database with Integration**:
   - Open your Notion database
   - Click the "..." menu → "Add connections"
   - Select your integration name
   - Grant access

## Usage

### Basic Usage

VIRAT's `*implement` command now accepts Notion URLs or requirement IDs:

```bash
# Extract from Notion, implement, and push back (all in one)
*implement https://notion.so/workspace/REQ-1234-abc123

# Or use just the requirement ID (searches Notion database)
*implement REQ-1234

# Traditional file-based implementation (no Notion)
*implement /path/to/requirement-document.md
```

### Workflow

When you use a Notion URL or ID with `*implement`:

1. **Phase -1: Notion Extraction**
   - Detects Notion URL or requirement ID
   - Connects to Notion API
   - Extracts requirement content from "Below Comments" section
   - Formats as standard VIRAT requirement document
   - Stores Notion page ID for later push-back

2. **Phases 0-6: Standard VIRAT Implementation**
   - Repository preparation
   - Intelligent analysis
   - Implementation planning
   - Development execution
   - Quality assurance
   - Learning & feedback collection

3. **Phase 7: Notion Documentation Push-Back**
   - Gathers all generated documentation files
   - Converts markdown to Notion blocks
   - Uploads to "Below Comments" section
   - Creates implementation summary toggle
   - Updates tracking data

### Command Options

```bash
# Skip Notion push-back (extract only, no upload)
*implement REQ-1234 --no-notion-push

# Dry run (preview extraction without implementing)
*implement REQ-1234 --dry-run

# Skip testing phase
*implement REQ-1234 --skip-tests

# Skip feedback collection
*implement REQ-1234 --skip-feedback

# Auto-commit changes
*implement REQ-1234 --auto-commit
```

### Extracted Content

VIRAT extracts requirement content from the **"Below Comments" section** in Notion:
- Ignores Notion properties and metadata
- Extracts only the page content below Comments
- Preserves formatting (headings, lists, code blocks, etc.)
- Stops before main requirement sections (I. REQUIREMENT, II. SOLUTION, etc.)

### Pushed Documentation

After implementation, VIRAT automatically pushes documentation to the **same location** (Below Comments):
- Implementation summary with timestamp
- All generated documentation files as nested toggles
- Files included:
  - `*-ANALYSIS.md`
  - `*-IMPLEMENTATION.md`
  - `*-PLAN.md`
  - `CHANGELOG.md`
  - Other generated markdown files

## Testing

Test your Notion connection:

```bash
cd notion-integration
npm run test
```

This will verify:
- Notion API credentials are valid
- Database access is configured correctly
- Integration can connect to Notion

## Testing Connection

Test your Notion connection:

```bash
cd notion-integration

# Test connection only
npm run test
```

This will verify your Notion API credentials and database access without running a full implementation.

## Configuration

Edit `config.yaml` in VIRAT expansion pack root to customize:

```yaml
notion:
  enabled: "{NOTION_API_KEY_EXISTS}"
  api_version: "2022-06-28"
  base_url: "https://api.notion.com/v1"
  database_id: "{NOTION_DATABASE_ID}"
  api_key: "{NOTION_API_KEY}"
  field_mappings:
    requirement_id: "No ID"  # Column name for requirement ID
    content_section: "Below Comments"  # Where to extract from
    push_target_section: "Below Comments"  # Where to push docs
  documentation_patterns:
    - "*.md"
    - "*-ANALYSIS.md"
    - "*-IMPLEMENTATION.md"
    - "*-PLAN.md"
    - "CHANGELOG.md"
```

## Tracking

VIRAT maintains a tracking file at `.notion-tracking.json`:

```json
{
  "REQ-1234": {
    "page_id": "abc123def456",
    "page_url": "https://notion.so/workspace/REQ-1234-abc...",
    "extracted_at": "2025-10-15T10:30:00Z",
    "implemented_at": "2025-10-15T12:45:00Z",
    "pushed_at": "2025-10-15T12:50:00Z",
    "status": "completed",
    "files_pushed": 8
  }
}
```

## Troubleshooting

### "Missing required environment variables"
- Ensure `.env` file exists with `NOTION_API_KEY` and `NOTION_DATABASE_ID`
- Run `./install.sh` to create `.env` from template

### "401 Unauthorized" or "403 Forbidden"
- Verify your Notion API key is correct
- Ensure database is shared with your integration
- Check integration has proper permissions

### "No page found with requirement ID"
- Verify requirement ID exists in your Notion database
- Check the "No ID" field name matches your database column
- Try using the full Notion URL instead

### "Failed to extract content below comments"
- Verify the page has content below Comments section
- Check page structure matches expected format
- Try extracting a different page to isolate issue

## Architecture

```
notion-integration/
├── scripts/
│   ├── notion-handler.js      # Main extraction logic
│   ├── notion-push.js          # Documentation push-back logic
│   └── notion-test.js          # Connection testing
├── package.json                # Node.js dependencies
├── install.sh                  # Installation script
├── env.example                 # Environment template
└── README.md                   # This file
```

**Note**: Notion workflow is now integrated into the main `../workflows/automated-development.yaml` file.

## Key Features

✅ **Seamless Integration**: Native to VIRAT's `*implement` command
✅ **One Command Workflow**: Extract → Implement → Push back
✅ **Automatic Detection**: Recognizes Notion URLs and requirement IDs
✅ **Smart Extraction**: Pulls content from "Below Comments" section
✅ **Rich Documentation**: Pushes all generated docs back to Notion
✅ **Tracking**: Maintains state for multi-step workflows
✅ **Optional**: Works alongside traditional file-based workflows

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify Notion API credentials and permissions
3. Test connection using `npm run test`
4. Review VIRAT logs for detailed error messages

## License

MIT License - Part of the BMAD framework

