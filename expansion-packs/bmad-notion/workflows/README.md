# Notion Workflows

Comprehensive automated workflow system for all Notion integration commands.

## 📋 Overview

The BMAD Notion Integration includes 6 automated workflows that handle the complete lifecycle of requirement management:

### Available Workflows

1. **notion-fetch-workflow.yaml** - Fetch requirements from Notion
2. **notion-implement-workflow.yaml** - Extract and implement requirements
3. **notion-push-workflow.yaml** - Push documentation back to Notion
4. **notion-test-workflow.yaml** - Test Notion API connectivity
5. **notion-list-workflow.yaml** - List requirements from database
6. **notion-status-workflow.yaml** - Show integration status

Each workflow automates the complete process from validation through execution to tracking.

## 🚀 Quick Start

### All Workflows via npm

```bash
# Fetch workflow
npm run workflow:fetch "https://www.notion.so/..."
npm run workflow REQ-1141

# Implement workflow  
npm run workflow:implement REQ-1141

# Push workflow
npm run workflow:push REQ-1141

# Test workflow
npm run workflow:test

# List workflow
npm run workflow:list --limit 10

# Status workflow
npm run workflow:status
```

### Direct Workflow Runner

```bash
node scripts/notion-workflow-runner.js "https://www.notion.so/..."
```

## 📝 Workflow Configuration

The workflow is defined in `notion-fetch-workflow.yaml`:

```yaml
name: notion-fetch-workflow
version: 1.0.0
description: "Automated workflow to fetch requirements from Notion using a provided link"

inputs:
  notion_link:
    type: string
    required: true
    examples:
      - "REQ-1141"
      - "https://notion.so/..."
  
  dry_run:
    type: boolean
    default: false

environment:
  load_from: ".env"
  required_vars:
    - NOTION_API_KEY
    - NOTION_DATABASE_ID
```

## 🔧 Workflow Steps

### Step 1: Validate Environment
- Checks for required environment variables
- Fails early if credentials are missing

### Step 2: Parse Notion Identifier
- Accepts full URLs, page IDs, or requirement IDs
- Extracts the 32-character page identifier

### Step 3: Fetch from Notion
- Calls `notion-handler.js` to fetch data
- Supports retry logic (3 attempts with 2s delay)

### Step 4: Validate Extraction
- Ensures data file exists
- Validates required fields are present

### Step 5: Display Results
- Shows formatted summary of extracted data
- Displays requirement ID, title, description

### Step 6: Update Tracking
- Logs operation to tracking file
- Maintains history of fetch operations

## 📊 Output

### Console Output
```
✅ WORKFLOW COMPLETED SUCCESSFULLY
══════════════════════════════════════════════════════════════════════

📋 Requirement ID: REQ-1141
📄 Title: To merge data from Altheory Sport to Altheory by Azorte
🔗 Notion URL: https://www.notion.so/277f31dc496880a18eadceacd882b8e2
📝 Description Length: 299 characters
⏰ Extracted At: 10/15/2025, 1:06:09 PM

💡 Next Steps:
   • Review the extracted data in docs/.notion-extracted-data.json
   • Run *notion_implement to start implementation
   • Run *notion_push to push documentation back to Notion
```

### Generated Files
- `docs/.notion-extracted-data.json` - Raw extracted data
- `docs/.notion-tracking.json` - Operation tracking

## 🎯 Use Cases

### 1. Quick Data Fetch
```bash
npm run workflow https://notion.so/My-Requirement-abc123
```

### 2. Preview Before Saving
```bash
npm run workflow REQ-1141 --dry-run
```

### 3. Automated Integration
```javascript
const NotionWorkflowRunner = require('./scripts/notion-workflow-runner');
const runner = new NotionWorkflowRunner();
await runner.run('REQ-1141');
```

### 4. Batch Processing
```bash
#!/bin/bash
for req in REQ-1141 REQ-1142 REQ-1143; do
  npm run workflow $req
done
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_VIEW_ID=xxxxxxxxxxxx  # Optional
```

### Workflow Customization

Edit `notion-fetch-workflow.yaml` to customize:
- Retry logic
- Validation rules
- Output format
- Success/failure handling

## 🔄 Integration with BMAD Commands

The workflow seamlessly integrates with BMAD Notion commands:

```bash
# 1. Fetch using workflow
npm run workflow REQ-1141

# 2. Implement using BMAD
@notion
*notion_implement REQ-1141

# 3. Push documentation back
*notion_push REQ-1141
```

## 🐛 Troubleshooting

### Workflow Fails at Step 1
**Issue:** Missing environment variables
**Solution:** Check `.env` file has `NOTION_API_KEY` and `NOTION_DATABASE_ID`

### Workflow Fails at Step 3
**Issue:** Cannot fetch from Notion
**Solution:** 
- Verify API key is valid
- Check integration has access to the database
- Ensure page ID is correct

### No Data Extracted
**Issue:** Fields are empty
**Solution:**
- Check field mappings in `config.yaml`
- Verify Notion page has data in the correct fields
- Review field names match your database schema

## 📚 Related Documentation

- [Main README](../README.md) - Complete integration guide
- [Script Documentation](../scripts/README.md) - Individual script details


## 💡 Tips

1. **Use Full URLs**: Full Notion URLs work best and are easiest to copy-paste
2. **Dry Run First**: Test with `--dry-run` before saving data
3. **Check Tracking**: Review `docs/.notion-tracking.json` for operation history
4. **Environment Setup**: Keep `.env` file secure and never commit it to git

## 🎉 Success Criteria

Workflow succeeds when:
- ✅ All environment variables are present
- ✅ Notion page is accessible
- ✅ Data is extracted and validated
- ✅ Files are saved to `docs/` folder
- ✅ Tracking is updated

## 📈 Next Steps

After successful workflow execution:
1. Review extracted data in `docs/.notion-extracted-data.json`
2. Use `*notion_implement` to start VIRAT implementation
3. Generate documentation during implementation
4. Use `*notion_push` to upload docs back to Notion
5. Complete the closed-loop workflow! 🎯

