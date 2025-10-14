# Task: Test Notion API Connection

## Objective
Verify Notion API credentials and connectivity before executing operations.

## Inputs
- `config`: Notion configuration from config.yaml
- `env`: Environment variables (NOTION_API_KEY, NOTION_DATABASE_ID)

## Process

### Step 1: Validate Environment Variables
1. Check if `NOTION_API_KEY` is set
2. Check if `NOTION_DATABASE_ID` is set
3. Validate API key format (should start with "secret_")
4. Validate database ID format (32-character hex string)

### Step 2: Test API Authentication
Call Notion API to verify authentication:

**Request:**
```
GET https://api.notion.com/v1/users/me
Headers:
  Authorization: Bearer {NOTION_API_KEY}
  Notion-Version: 2022-06-28
```

**Expected Response (200 OK):**
```json
{
  "object": "user",
  "id": "...",
  "name": "Integration Name",
  "type": "bot"
}
```

### Step 3: Test Database Access
Call Notion API to verify database access:

**Request:**
```
POST https://api.notion.com/v1/databases/{database_id}/query
Headers:
  Authorization: Bearer {NOTION_API_KEY}
  Notion-Version: 2022-06-28
Body:
  {
    "page_size": 1
  }
```

**Expected Response (200 OK):**
```json
{
  "object": "list",
  "results": [...],
  "has_more": false
}
```

### Step 4: Verify Database Schema
1. Fetch database object to inspect properties
2. Verify required properties exist:
   - "No ID" (title or text)
   - "Name" (title)
   - "Stage" (select)
   - "Status" (select)
   - "Request Description" (rich_text or multi_select)

**Request:**
```
GET https://api.notion.com/v1/databases/{database_id}
```

### Step 5: Report Test Results
Display test results to user:

**Success:**
```
✅ Notion API Connection Test

🔑 Authentication: ✅ Valid
📊 Database Access: ✅ Granted
📋 Database Schema: ✅ Valid

Database Details:
├─ Name: Requirements Database
├─ Properties: 15
├─ Required Fields: ✅ All present
└─ Integration: ✅ Has access

Ready to use Notion integration!
```

**Failure:**
```
❌ Notion API Connection Test Failed

Error: {error_message}

Troubleshooting:
1. Verify NOTION_API_KEY in .env file
2. Ensure integration has access to database
3. Check that database ID is correct
4. Review Notion integration settings

For help, see: https://developers.notion.com/docs/authorization
```

## Outputs
- `connection_status`: Success or failure
- `authentication_valid`: true/false
- `database_accessible`: true/false
- `schema_valid`: true/false
- `missing_properties`: List of missing required properties

## Error Messages

### 401 Unauthorized
```
❌ Authentication Failed

Your Notion API key is invalid or expired.

Action Required:
1. Go to https://www.notion.so/my-integrations
2. Verify your integration token
3. Copy the Internal Integration Token
4. Update NOTION_API_KEY in .env file

Current key (first 10 chars): secret_abc...
```

### 403 Forbidden
```
❌ Database Access Denied

Your integration doesn't have access to the database.

Action Required:
1. Open your Notion database
2. Click ••• menu (top right)
3. Click "Add connections"
4. Select your integration
5. Retry connection test

Database ID: {database_id}
```

### 404 Not Found
```
❌ Database Not Found

The specified database doesn't exist or has been deleted.

Action Required:
1. Verify database ID in .env file
2. Check that database still exists in Notion
3. Ensure you're using the correct workspace

Current database ID: {database_id}
```

### Missing Properties
```
⚠️  Schema Validation Warning

Some required properties are missing from your database:
├─ Missing: No ID
├─ Missing: Request Description
└─ Present: All other properties ✅

Action Required:
1. Add missing properties to your Notion database
2. Or update field_mappings in config.yaml

Continue anyway? (y/n):
```

## Success Criteria
- ✅ Environment variables configured correctly
- ✅ API authentication successful
- ✅ Database access granted
- ✅ Required properties present
- ✅ Ready for Notion operations

