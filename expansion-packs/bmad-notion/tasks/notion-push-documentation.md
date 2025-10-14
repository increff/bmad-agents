# Task: Push Documentation to Notion

## Objective
Upload all generated documentation files back to the source Notion ticket after implementation workflow completes.

## Inputs
- `requirement_id`: Requirement ID (e.g., "REQ-994") or Notion page URL
- `documentation_files`: List of documentation files to upload
- `config`: Notion configuration from config.yaml
- `env`: Environment variables (NOTION_API_KEY)

## Process

### Step 1: Retrieve Notion Page ID
1. Check if requirement_id is provided, otherwise use last tracked implementation
2. Load `.notion-tracking.json` to get stored page ID
   ```json
   {
     "REQ-994": {
       "page_id": "abc123def456",
       "page_url": "https://notion.so/workspace/REQ-994-abc...",
       "extracted_at": "2025-10-14T10:30:00Z",
       "status": "implemented"
     }
   }
   ```
3. If page_id not found, prompt user for Notion page URL

### Step 2: Identify Documentation Files
1. Scan workspace for documentation files matching patterns from config.yaml:
   - `*.md`: All markdown files
   - `*-ANALYSIS.md`: Analysis documents
   - `*-IMPLEMENTATION.md`: Implementation plans
   - `*-PLAN.md`: Planning documents
   - `CHANGELOG.md`: Change logs
   - `README*.md`: README files

2. Filter files to only include those generated/modified since extraction timestamp

3. Organize by category:
   - Analysis: `*-ANALYSIS.md`
   - Planning: `*-PLAN.md`, `*-IMPLEMENTATION.md`
   - Changes: `CHANGELOG.md`, `*-CHANGES.md`
   - Documentation: `README.md`, other `.md` files

### Step 3: Prepare Documentation Summary
Create implementation summary block:

```markdown
## 📋 Implementation Complete

**Implemented**: {current_date}
**Duration**: {implementation_duration}
**Repositories Modified**: {repository_list}

### 📄 Documentation Generated
{file_count} files:
- Analysis Documents: {analysis_files}
- Implementation Plans: {plan_files}
- Change Logs: {changelog_files}
- README Updates: {readme_files}

### 🔧 Key Changes
{summary_of_changes}

### ✅ Next Steps
{recommended_actions}
```

### Step 4: Convert Documentation to Notion Blocks
For each documentation file, convert markdown to Notion blocks:

**Markdown Heading 1** → Notion `heading_1` block
**Markdown Heading 2** → Notion `heading_2` block
**Markdown Heading 3** → Notion `heading_3` block
**Markdown Paragraph** → Notion `paragraph` block
**Markdown Code Block** → Notion `code` block
**Markdown Bullet List** → Notion `bulleted_list_item` block
**Markdown Numbered List** → Notion `numbered_list_item` block
**Markdown Checkbox** → Notion `to_do` block

### Step 5: Upload Documentation

**Option A: Upload as Notion Blocks (Default)**
1. For each documentation file:
   - Convert markdown to Notion blocks
   - Create a toggle block with file name as title
   - Append converted blocks as children
   - Call API: `PATCH /v1/blocks/{page_id}/children`

**Option B: Upload as Attachments**
1. For each documentation file:
   - Upload file to temporary storage
   - Create embed block with file URL
   - Call API: `PATCH /v1/blocks/{page_id}/children` with embed block

### Step 6: Append to III. DEVELOPMENT Section
1. Find the "III. DEVELOPMENT" toggle block in the Notion page
2. Get the block ID of the "III. DEVELOPMENT" section
3. Create a new toggle block: "📋 Implementation Complete - {date}"
4. Add summary content and documentation as child blocks
5. Append INSIDE the "III. DEVELOPMENT" toggle (not at page end)
6. Call API: `PATCH /v1/blocks/{development_block_id}/children`

### Step 7: Skip Property Updates
Do NOT update any Notion page properties:
- Do not change Status
- Do not update dates
- Do not modify any fields

Only add documentation blocks to the III. DEVELOPMENT section.

### Step 8: Skip Tags
Do not add or modify any tags.

### Step 9: Validate Upload Success
1. Verify all files uploaded successfully
2. Check for API errors or failures
3. Retry failed uploads (up to 3 attempts)
4. Log any permanent failures

### Step 10: Update Tracking File
Update `.notion-tracking.json`:

```json
{
  "REQ-994": {
    "page_id": "abc123def456",
    "page_url": "https://notion.so/workspace/REQ-994-abc...",
    "extracted_at": "2025-10-14T10:30:00Z",
    "implemented_at": "2025-10-14T12:45:00Z",
    "documentation_pushed_at": "2025-10-14T12:50:00Z",
    "status": "completed",
    "files_pushed": [
      "REQUIREMENT_ANALYSIS.md",
      "IMPLEMENTATION_PLAN.md",
      "ALGORITHM_CHANGES.md",
      "CHANGELOG.md"
    ]
  }
}
```

### Step 11: Provide User Feedback
Display success message with details:

```
✅ Documentation pushed successfully to Notion!

📄 Files Uploaded: 8
├─ Analysis Documents: 2
├─ Implementation Plans: 3
├─ Change Logs: 1
└─ README Updates: 2

🔗 View in Notion: https://notion.so/workspace/REQ-994-abc...

✅ Ticket updated:
├─ Status: Implemented
└─ Updated ETA: 2025-10-14 12:50:00

🎉 Complete workflow finished: Notion → VIRAT → Notion
```

## Outputs
- `push_summary`: Summary of push operation
  - files_pushed: Count of successfully uploaded files
  - files_failed: Count of failed uploads
  - page_url: Link to updated Notion page
  - status_updated: true/false
- `updated_tracking`: Updated tracking file with push details

## Error Handling

### API Errors
- **401 Unauthorized**: Invalid API key
  - Action: Prompt user to verify NOTION_API_KEY
- **403 Forbidden**: No permission to edit page
  - Action: Prompt user to grant edit access to integration
- **404 Not Found**: Page no longer exists
  - Action: Alert user and skip push
- **429 Rate Limited**: Too many requests
  - Action: Wait and retry with exponential backoff
- **500 Server Error**: Notion API issue
  - Action: Retry up to 3 times, then fail gracefully

### Upload Errors
- **File Too Large**: File exceeds 5MB limit
  - Action: Split file or compress, or upload as external link
- **Conversion Error**: Markdown to Notion block conversion fails
  - Action: Upload as code block or plain text
- **Partial Upload**: Some files upload, others fail
  - Action: Report success/failure details, allow retry of failed files

### Tracking Errors
- **No Page ID Found**: Page ID not in tracking file
  - Action: Prompt user for Notion page URL
- **Tracking File Corrupt**: JSON parse error
  - Action: Create new tracking file, prompt for page URL

## Success Criteria
- ✅ All documentation files uploaded successfully
- ✅ Implementation summary added to Notion page
- ✅ Ticket status updated to "Implemented"
- ✅ Ticket metadata updated with timestamp
- ✅ Tracking file updated with push details
- ✅ User receives confirmation with page link
- ✅ No API errors or permanent failures

## Upload Strategies

### Strategy 1: Nested Toggle Blocks (Recommended)
```
📋 Implementation Complete - Oct 14, 2025
├─ 📊 Analysis Documents
│  └─ REQUIREMENT_ANALYSIS.md (toggle)
│     └─ [converted blocks]
├─ 📝 Implementation Plans
│  └─ IMPLEMENTATION_PLAN.md (toggle)
│     └─ [converted blocks]
└─ 📄 Change Logs
   └─ CHANGELOG.md (toggle)
      └─ [converted blocks]
```

### Strategy 2: Flat Block List
```
📋 Implementation Complete - Oct 14, 2025
REQUIREMENT_ANALYSIS.md (toggle)
└─ [converted blocks]
IMPLEMENTATION_PLAN.md (toggle)
└─ [converted blocks]
CHANGELOG.md (toggle)
└─ [converted blocks]
```

### Strategy 3: File Attachments
```
📋 Implementation Complete - Oct 14, 2025
Summary: 8 files generated
[File attachments as embeds or links]
```

## Example Execution

**Input:**
```bash
*notion_push REQ-994
```

**Process:**
1. Load page ID from `.notion-tracking.json`: abc123def456
2. Find documentation files (8 files found)
3. Convert each file to Notion blocks
4. Create implementation summary
5. Upload to Notion page
6. Update ticket status to "Implemented"
7. Update tracking file

**Output:**
```
📤 Pushing documentation to Notion ticket REQ-994...

📄 Found 8 documentation files:
├─ REQUIREMENT_ANALYSIS.md
├─ IMPLEMENTATION_PLAN.md
├─ ALGORITHM_CHANGES.md
├─ LOADAPI_CHANGES.md
├─ CONFIG_CHANGES.md
├─ CHANGELOG.md
├─ README.md
└─ TEST_RESULTS.md

⬆️  Converting and uploading... (1/8)
⬆️  Converting and uploading... (2/8)
⬆️  Converting and uploading... (3/8)
⬆️  Converting and uploading... (4/8)
⬆️  Converting and uploading... (5/8)
⬆️  Converting and uploading... (6/8)
⬆️  Converting and uploading... (7/8)
⬆️  Converting and uploading... (8/8)

✅ All files uploaded successfully!

📝 Adding implementation summary...
✅ Summary added!

🔄 Updating ticket status...
✅ Status updated to "Implemented"

✅ Documentation pushed successfully!
🔗 View in Notion: https://notion.so/workspace/REQ-994-abc...

🎉 Complete workflow finished: Notion → VIRAT → Notion
```

## Configuration Options

Users can customize push behavior in config.yaml:

```yaml
documentation_push:
  format: "blocks"  # or "attachments"
  organize_by_category: true
  add_summary: true
  update_status: true
  update_timestamp: true
  add_tags: true
  retry_count: 3
  retry_delay: 5  # seconds
```

## Rate Limiting Strategy
Notion API has rate limits (3 requests per second):

1. Batch uploads when possible
2. Add delay between requests (350ms minimum)
3. Implement exponential backoff on 429 errors
4. Queue requests and process sequentially
5. Monitor rate limit headers and adjust

## File Size Limits
Notion has 5MB limit for attachments:

**For large files:**
1. Split into multiple parts
2. Compress if possible
3. Upload to external storage and link
4. Summarize instead of full upload

