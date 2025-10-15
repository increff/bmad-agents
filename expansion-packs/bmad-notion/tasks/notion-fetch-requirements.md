# Task: Fetch Requirements from Notion

## Objective
Extract requirement details from a Notion database page using either a page URL or requirement ID (No ID column value).

## Inputs
- `page_url_or_id`: Notion page URL OR requirement ID (e.g., "REQ-994")
- `config`: Notion configuration from config.yaml
- `env`: Environment variables (NOTION_API_KEY, NOTION_DATABASE_ID)

## Process

### Step 1: Validate Inputs
1. Check if Notion API credentials are configured
2. Verify API key format (should start with "secret_")
3. Verify database ID format (32-character hex string)
4. Parse input to determine if it's a URL or requirement ID

### Step 2: Resolve Notion Page ID

**If input is a URL:**
```
Example: https://www.notion.so/workspace/REQ-994-abc123def456
Extract page ID: abc123def456 (last segment after last dash)
```

**If input is a requirement ID:**
1. Query Notion database with filter:
   ```json
   {
     "filter": {
       "property": "No ID",
       "title": {
         "equals": "REQ-994"
       }
     }
   }
   ```
2. Extract page ID from query results

### Step 3: Fetch Page Properties
1. Call Notion API: `GET /v1/pages/{page_id}`
2. Extract ONLY the requirement ID (No ID field) to identify the page
   - This is used only for locating the correct page
   - No other properties are extracted

### Step 4: Fetch Page Content Blocks
1. Call Notion API: `GET /v1/blocks/{page_id}/children`
2. Recursively fetch all content blocks
3. Identify ONLY the Request Description section:
   - Look for "Request Description" heading or property
   - Extract the numbered list or rich text content
   - Ignore all other sections (development, stages, metadata, etc.)

### Step 5: Parse Request Description
Extract requirement details from "Request Description" section:

**Expected Format:**
```
Request Description:
1. Multiple ROS periods & factorization
2. Closing WH stock combine in Reordering
3. MOQ bound Reorder Qty
```

**Parse as:**
- requirement_1: "Multiple ROS periods & factorization"
- requirement_2: "Closing WH stock combine in Reordering"
- requirement_3: "MOQ bound Reorder Qty"

### Step 6: Skip All Other Content
Do NOT extract:
- Development sections
- Stage details
- Metadata fields (title, status, priority, lead, etc.)
- Date fields
- Project/Sprint relations

Only the Request Description is needed for implementation.

### Step 7: Format as Standard Requirement Document
Create minimal markdown document with ONLY extracted Request Description:

```markdown
# Requirement: {requirement_id}

> **Extracted from Notion**: {timestamp}  
> **Notion Page**: [requirement_id]({page_url})

---

## 📝 Request Description

{parsed_description_items}

---

## 📌 Implementation Notes

- This requirement was automatically extracted from Notion (Request Description field only)
- Original Notion page: [{requirement_id}]({page_url})
- Documentation will be pushed to "III. DEVELOPMENT" section upon completion

---

## 🚀 Next Steps

1. ✅ Requirement extracted from Notion
2. 🔄 VIRAT implementation workflow (in progress)
3. ⏳ Documentation generation
4. ⏳ Push documentation to III. DEVELOPMENT section in Notion
```

### Step 8: Validate Extracted Data
1. Verify requirement_id is present
2. Verify Request Description is non-empty
3. Ensure description has at least one requirement item
4. No other validation needed (no other fields extracted)

### Step 9: Store Notion Page ID
1. Store page ID in a tracking file: `.notion-tracking.json`
   ```json
   {
     "REQ-994": {
       "page_id": "abc123def456",
       "page_url": "https://notion.so/workspace/REQ-994-abc...",
       "extracted_at": "2025-10-14T10:30:00Z",
       "status": "extracted"
     }
   }
   ```
2. This will be used by `notion_push` to upload documentation

### Step 10: Return Formatted Requirement
1. Save formatted requirement to temporary file: `temp-{requirement_id}.md`
2. Return file path and extraction summary
3. Ready for VIRAT implementation

## Outputs
- `requirement_file`: Path to formatted requirement markdown file
- `notion_page_id`: Notion page ID for later push-back
- `extraction_summary`: Summary of extracted data
  - requirement_id
  - description_items_count
  

## Error Handling

### API Errors
- **401 Unauthorized**: Invalid API key
  - Action: Prompt user to verify NOTION_API_KEY in .env
- **403 Forbidden**: No access to page/database
  - Action: Prompt user to share database with integration
- **404 Not Found**: Page/database doesn't exist
  - Action: Verify URL/ID is correct
- **429 Rate Limited**: Too many requests
  - Action: Wait and retry with exponential backoff

### Data Errors
- **Missing Required Field**: Field not found in Notion page
  - Action: Use default value or prompt user
- **Empty Description**: No requirement description found
  - Action: Prompt user to add description or provide manually
- **Invalid Format**: Field has unexpected format
  - Action: Attempt to parse or skip with warning

## Success Criteria
- ✅ Notion page successfully fetched
- ✅ All required fields extracted
- ✅ Description parsed into individual requirement items
- ✅ Development section extracted
- ✅ Formatted requirement document created
- ✅ Notion page ID stored for push-back
- ✅ Ready for VIRAT implementation

## Example Execution

**Input:**
```bash
*notion_implement REQ-994
```

**Process:**
1. Query Notion database for "No ID" = "REQ-994"
2. Find page ID: abc123def456
3. Fetch page properties and blocks
4. Extract:
   - Title: "Multiple ROS & Factorization Features"
   - Description: 3 requirement items
   - Stage: "3. Dev In-Progress"
   - Status: "active"
   - Lead: "Harshith Kollukuduru"
   - Priority: "0 - Critical"
5. Create `temp-REQ-994.md` with all extracted data
6. Store page ID in `.notion-tracking.json`
7. Pass to VIRAT: `*implement temp-REQ-994.md`

**Output:**
```
✅ Requirement REQ-994 extracted successfully from Notion
📝 Title: Multiple ROS & Factorization Features
📋 Description: 3 requirement items
👤 Lead: Harshith Kollukuduru
🎯 Priority: 0 - Critical
📊 Stage: 3. Dev In-Progress

Passing to VIRAT for implementation...
```

