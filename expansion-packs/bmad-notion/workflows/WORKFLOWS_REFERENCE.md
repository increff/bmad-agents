# Notion Workflows Reference

Complete reference for all 6 Notion integration workflows.

---

## 1. Fetch Workflow (`notion-fetch-workflow.yaml`)

### Purpose
Extract requirements from Notion pages automatically.

### Usage
```bash
npm run workflow:fetch "https://www.notion.so/..."
npm run workflow REQ-1141
```

### Inputs
- `notion_link` (required) - Notion URL or requirement ID
- `dry_run` (optional) - Preview without saving

### Steps
1. Validate environment variables
2. Parse Notion identifier
3. Fetch data from Notion API
4. Validate extracted data
5. Display formatted results
6. Update tracking file

### Outputs
- `docs/.notion-extracted-data.json` - Raw extracted data
- `docs/.notion-tracking.json` - Operation tracking

### Example
```bash
npm run workflow REQ-1141
```

**Result:**
```json
{
  "pageId": "277f31dc496880a18eadceacd882b8e2",
  "requirementId": "REQ-1141",
  "requirementTitle": "To merge data from Altheory Sport...",
  "requestDescription": "we have received a business request...",
  "notionUrl": "https://www.notion.so/277f31dc...",
  "extractedAt": "2025-10-15T07:29:55.448Z"
}
```

---

## 2. Implement Workflow (`notion-implement-workflow.yaml`)

### Purpose
Extract requirement from Notion and execute complete VIRAT implementation.

### Usage
```bash
npm run workflow:implement REQ-1141
npm run workflow:implement "https://www.notion.so/..."
```

### Inputs
- `notion_link` (required) - Notion URL or requirement ID
- `auto_push` (optional, default: true) - Auto-push docs after implementation
- `dry_run` (optional) - Preview without implementing

### Steps
1. Validate environment
2. Parse identifier
3. Extract requirement from Notion
4. Validate extraction
5. Prepare VIRAT input
6. **Execute VIRAT implementation** ⭐
7. Push documentation (if auto_push=true)
8. Update tracking

### Outputs
- `docs/.notion-extracted-data.json` - Extracted requirement
- `docs/.virat-requirement.md` - VIRAT input file
- Implementation artifacts (code, docs)
- Updated Notion page (if auto_push=true)

### Example
```bash
npm run workflow:implement REQ-1141
```

**What it does:**
1. Fetches REQ-1141 from Notion
2. Creates VIRAT requirement file
3. Executes VIRAT implementation across all repos
4. Generates documentation
5. Pushes docs back to Notion's III. DEVELOPMENT section

---

## 3. Push Workflow (`notion-push-workflow.yaml`)

### Purpose
Push generated documentation back to Notion's III. DEVELOPMENT section.

### Usage
```bash
npm run workflow:push REQ-1141
npm run workflow:push  # Uses last implementation
npm run workflow:push REQ-1141 --format attachments
```

### Inputs
- `notion_link` (optional) - Notion URL or requirement ID (auto-detects if not provided)
- `files_to_push` (optional) - Specific files to push
- `format` (optional, default: "blocks") - Upload as blocks or attachments

### Steps
1. Validate environment
2. Determine target page (from input or tracking)
3. Find documentation files
4. Validate files exist
5. **Push to Notion III. DEVELOPMENT** ⭐
6. Verify upload
7. Update tracking

### Documentation Files Pushed
- `*-ANALYSIS.md`
- `*-PLAN.md`
- `*-IMPLEMENTATION.md`
- `*-CHANGES.md`
- `CHANGELOG.md`
- `README*.md`

### Outputs
- Updated Notion page with documentation
- `docs/.notion-tracking.json` - Push status

### Example
```bash
npm run workflow:push
```

**Creates in Notion:**
```
III. DEVELOPMENT
  └─ 📋 Implementation Complete - 2025-10-15
      ├─ REQUIREMENT_ANALYSIS.md
      ├─ IMPLEMENTATION_PLAN.md
      ├─ ALGORITHM_CHANGES.md
      ├─ LOADAPI_CHANGES.md
      ├─ CONFIG_CHANGES.md
      └─ CHANGELOG.md
```

---

## 4. Test Workflow (`notion-test-workflow.yaml`)

### Purpose
Test Notion API connectivity and validate configuration.

### Usage
```bash
npm run workflow:test
npm run workflow:test --detailed
```

### Inputs
- `detailed` (optional, default: true) - Run detailed tests
- `check_schema` (optional, default: true) - Validate database schema

### Steps
1. Validate environment variables
2. **Test API connection** ⭐
3. **Test database access** ⭐
4. Validate schema (if enabled)
5. Test sample fetch (if detailed)
6. Test field mappings (if detailed)
7. Generate test report

### Outputs
- `docs/.notion-test-report.json` - Test results
- Console output with pass/fail status

### Example
```bash
npm run workflow:test
```

**Output:**
```
✅ Environment validation passed
✅ Notion API connection successful
✅ Database access verified
✅ Schema validation passed
✅ Sample fetch successful
✅ Field mappings correct

✅ All Notion connectivity tests passed!
```

---

## 5. List Workflow (`notion-list-workflow.yaml`)

### Purpose
List and query requirements from Notion database.

### Usage
```bash
npm run workflow:list
npm run workflow:list --limit 10
npm run workflow:list --filter status active
npm run workflow:list --search REQ-1141
```

### Inputs
- `limit` (optional, default: 20) - Max results to return
- `detailed` (optional, default: false) - Show detailed info
- `filter_type` (optional) - Filter by: status, priority, lead, stage
- `filter_value` (optional) - Value to match
- `search` (optional) - Search term

### Steps
1. Validate environment
2. Build query with filters
3. **Fetch requirements from database** ⭐
4. Parse and format results
5. Display results
6. Save results to cache

### Outputs
- Console table with requirements
- `docs/.notion-list-cache.json` - Cached results

### Example
```bash
npm run workflow:list --limit 5
```

**Output:**
```
┌─────────────┬──────────────────────────────┬──────────┬──────────┐
│ ID          │ Title                        │ Status   │ Lead     │
├─────────────┼──────────────────────────────┼──────────┼──────────┤
│ REQ-1141    │ Merge Altheory Sport data    │ active   │ Harshith │
│ REQ-1140    │ Fix PDF generation bug       │ active   │ Unni     │
│ REQ-1139    │ Add export functionality     │ complete │ Arya     │
└─────────────┴──────────────────────────────┴──────────┴──────────┘

✅ Retrieved 3 requirements from Notion
```

---

## 6. Status Workflow (`notion-status-workflow.yaml`)

### Purpose
Display current integration status and health information.

### Usage
```bash
npm run workflow:status
npm run workflow:status --check-connectivity
```

### Inputs
- `detailed` (optional, default: true) - Show detailed status
- `check_connectivity` (optional, default: false) - Test live connectivity

### Steps
1. Check environment configuration
2. Check file system status
3. Load tracking data
4. Load extracted data
5. Test connectivity (if enabled)
6. **Generate status report** ⭐
7. Display formatted status

### Outputs
- Comprehensive status report
- Environment status
- Last operation details
- File system status

### Example
```bash
npm run workflow:status
```

**Output:**
```
╔════════════════════════════════════════════╗
║     NOTION INTEGRATION STATUS              ║
╚════════════════════════════════════════════╝

📋 ENVIRONMENT
  ✅ NOTION_API_KEY configured
  ✅ NOTION_DATABASE_ID configured
  ✅ NOTION_VIEW_ID configured

📁 FILE SYSTEM
  ✅ .env exists
  ✅ config.yaml exists
  ✅ docs/ directory exists
  ✅ scripts/ directory exists

📊 LAST OPERATIONS
  Last Fetch:
    • Requirement ID: REQ-1141
    • Timestamp: 2025-10-15T07:29:55.448Z
    • Status: success
  
  Last Implementation:
    • Requirement ID: REQ-1141
    • Timestamp: 2025-10-15T08:15:22.103Z
    • Status: success
  
  Last Push:
    • Requirement ID: REQ-1141
    • Files: 6 documents
    • Timestamp: 2025-10-15T08:45:10.892Z
    • Status: success

✅ Notion integration status: HEALTHY
```

---

## Workflow Configuration

### Common Environment Variables

All workflows require:
```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Optional:
```env
NOTION_VIEW_ID=xxxxxxxxxxxx
NOTION_USE_WORKFLOWS=true  # Enable workflow mode by default
```

### Workflow Files Location

```
bmad-notion/
├── workflows/
│   ├── notion-fetch-workflow.yaml
│   ├── notion-implement-workflow.yaml
│   ├── notion-push-workflow.yaml
│   ├── notion-test-workflow.yaml
│   ├── notion-list-workflow.yaml
│   └── notion-status-workflow.yaml
└── docs/
    ├── .notion-extracted-data.json
    ├── .notion-tracking.json
    └── .notion-test-report.json
```

---

## Workflow Execution Flow

### Complete Lifecycle Example

```bash
# 1. Test connectivity
npm run workflow:test

# 2. List available requirements
npm run workflow:list --limit 10

# 3. Fetch specific requirement
npm run workflow:fetch REQ-1141

# 4. Implement requirement
npm run workflow:implement REQ-1141
# (Automatically pushes docs if auto_push=true)

# 5. Check status
npm run workflow:status

# 6. Manually push docs if needed
npm run workflow:push REQ-1141
```

### Workflow Chaining

Workflows can be chained together:

```bash
# Fetch → Implement → Push (all automated)
npm run workflow:implement REQ-1141

# Test → List → Fetch
npm run workflow:test && \
npm run workflow:list && \
npm run workflow:fetch REQ-1141
```

---

## Error Handling

### Retry Logic

Workflows include automatic retry for:
- Network failures (3 retries, 2s delay)
- API rate limits (exponential backoff)
- Transient errors

### Failure Actions

On failure, workflows:
1. Log detailed error information
2. Save current state
3. Display helpful error messages
4. Suggest remediation steps

### Example Error Output

```bash
❌ WORKFLOW FAILED

Step failed: fetch-from-notion
Error: Could not find property with name or id: No ID

💡 Suggestions:
  • Check field mappings in config.yaml
  • Verify Notion database schema
  • Use full URL instead of requirement ID
  • Run: npm run workflow:test to diagnose

📄 Error log saved to: docs/.notion-error.log
```

---

## Advanced Usage

### Custom Workflow Modifications

Edit YAML files to customize:

```yaml
# notion-fetch-workflow.yaml
steps:
  - name: custom-validation
    description: "My custom validation step"
    action: execute-script
    script: "my-custom-script.js"
    on_error: warn
```

### Programmatic Usage

```javascript
const NotionWorkflowRunner = require('./scripts/notion-workflow-runner');

const runner = new NotionWorkflowRunner();
await runner.loadWorkflow();
await runner.run('REQ-1141');
```

### Environment-Specific Workflows

```bash
# Development
NOTION_USE_WORKFLOWS=true npm run implement REQ-1141

# Production (with validation)
NOTION_USE_WORKFLOWS=true \
NOTION_VALIDATE_SCHEMA=true \
npm run workflow:implement REQ-1141
```

---

## Performance

### Workflow Execution Times

- **Fetch**: ~2-5 seconds
- **Implement**: ~5-30 minutes (depends on VIRAT)
- **Push**: ~10-30 seconds
- **Test**: ~3-10 seconds
- **List**: ~2-8 seconds
- **Status**: ~1-3 seconds

### Optimization Tips

1. Use `--dry-run` to preview without executing
2. Cache frequently accessed data
3. Use filters to reduce query results
4. Enable workflow mode for batch operations

---

## Troubleshooting

### Common Issues

#### Workflow not found
```bash
Error: Cannot find workflow file

Solution:
cd expansion-packs/bmad-notion
ls workflows/  # Verify files exist
```

#### Environment variables missing
```bash
❌ Missing required environment variables

Solution:
cp env.example .env
# Edit .env with credentials
```

#### API rate limit exceeded
```bash
Error: rate_limited

Solution:
# Workflow will automatically retry with backoff
# Or wait 60 seconds and try again
```

---

## Best Practices

1. **Always test first**: Run `npm run workflow:test` before operations
2. **Use dry-run**: Preview with `--dry-run` flag
3. **Check status**: Monitor with `npm run workflow:status`
4. **Track operations**: Review `docs/.notion-tracking.json`
5. **Batch carefully**: Respect API rate limits
6. **Validate schema**: Ensure field mappings are correct

---

## Support

For issues or questions:
1. Check workflow YAML files for configuration
2. Review error logs in `docs/` folder
3. Run diagnostic: `npm run workflow:test --detailed`
4. Check Notion API status
5. Review [Main README](../README.md)

---

**Created:** 2025-10-15  
**Version:** 1.0.0  
**Total Workflows:** 6  
**Status:** ✅ Production Ready

