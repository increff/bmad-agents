# Notion Integration Quickstart Guide

Get up and running with BMAD Notion integration in 5 minutes!

## Prerequisites

- BMAD installed and configured
- VIRAT expansion pack installed (required for `*notion_implement`)
- Notion workspace with database of requirements
- Admin access to create Notion integrations

## Step 1: Create Notion Integration (2 minutes)

1. **Go to Notion Integrations**
   - Visit: https://www.notion.so/my-integrations
   - Click "New integration"

2. **Configure Integration**
   - Name: "BMAD Integration" (or any name you prefer)
   - Workspace: Select your workspace
   - Type: Internal integration
   - Capabilities: 
     - ✅ Read content
     - ✅ Update content
     - ✅ Insert content

3. **Copy Token**
   - After creating, copy the "Internal Integration Token"
   - Format: `secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx...`
   - Keep this secure!

## Step 2: Share Database with Integration (1 minute)

1. **Open Your Requirements Database**
   - Navigate to your requirements database in Notion

2. **Share with Integration**
   - Click ••• menu (top right)
   - Click "Add connections"
   - Select "BMAD Integration" (or your integration name)
   - Click "Confirm"

3. **Get Database ID**
   - Copy database ID from URL
   - URL format: `https://notion.so/workspace/{database_id}?v=...`
   - Database ID is the 32-character hex string

## Step 3: Configure BMAD (1 minute)

1. **Create .env File**
   ```bash
   cd expansion-packs/bmad-notion
   cp .env.example .env
   ```

2. **Add Your Credentials**
   ```bash
   # Edit .env file
   NOTION_API_KEY=secret_your_actual_token_here
   NOTION_DATABASE_ID=your_actual_database_id_here
   NOTION_VIEW_ID=your_view_id_here  # Optional
   ```

3. **Save and Close**

## Step 4: Test Connection (1 minute)

1. **Activate Notion Integrator**
   ```bash
   @notion
   ```
   
   Or alternatively:
   ```bash
   *load notion-integrator
   ```

2. **View Available Commands**
   ```bash
   *notion-help
   ```

3. **Test Connection**
   ```bash
   *notion_test
   ```

4. **Expected Output**
   ```
   ✅ Notion API Connection Test
   
   🔑 Authentication: ✅ Valid
   📊 Database Access: ✅ Granted
   📋 Database Schema: ✅ Valid
   
   Ready to use Notion integration!
   
   💡 Tip: Run *notion-help to see all available commands
   ```

## Step 5: First Requirement Extraction

1. **Find a Requirement**
   - Go to your Notion database
   - Find a requirement (e.g., REQ-994)
   - Note the requirement ID or copy the page URL

2. **Extract and Implement**
   ```bash
   # Using requirement ID
   *notion_implement REQ-994
   
   # OR using Notion URL
   *notion_implement https://notion.so/workspace/REQ-994-abc123...
   ```

3. **Watch the Magic**
   ```
   🔍 Connecting to Notion and fetching requirement REQ-994...
   ✅ Requirement extracted successfully
   📝 Title: Your Requirement Title
   📋 Description: 3 items
   🚀 Starting VIRAT implementation workflow...
   
   [VIRAT executes complete implementation]
   
   📤 Pushing documentation back to Notion...
   ✅ Documentation pushed successfully!
   🔗 View in Notion: [link]
   
   🎉 Complete workflow finished: Notion → VIRAT → Notion
   ```

## Verify Results

1. **Check Notion Page**
   - Go back to your Notion requirement page
   - Scroll to bottom
   - You should see "Implementation Complete" section
   - All documentation files uploaded as toggle blocks

2. **Check Status**
   - Requirement status updated to "Implemented"
   - Updated ETA timestamp added

## Common Issues

### Issue: Authentication Failed (401)
**Solution:**
- Verify API key is copied correctly
- Check for extra spaces or line breaks
- Regenerate token if needed

### Issue: Database Access Denied (403)
**Solution:**
- Make sure you shared database with integration
- Check that integration has proper permissions

### Issue: Page Not Found (404)
**Solution:**
- Verify requirement ID is correct
- Check that page exists in the database
- Try using full Notion URL instead

### Issue: Missing Fields
**Solution:**
- Check that your database has all required properties
- Update `field_mappings` in config.yaml to match your schema
- Add missing properties to database

## Next Steps

### Customize Field Mappings

If your Notion database uses different property names:

1. **Edit config.yaml**
   ```yaml
   field_mappings:
     requirement_id: "Your ID Field Name"
     title: "Your Title Field Name"
     # ... customize other fields
   ```

2. **Save and retry**

### Batch Processing

Process multiple requirements:

```bash
# Extract and implement multiple requirements
*notion_implement REQ-994
*notion_implement REQ-995
*notion_implement REQ-996
```

### Dry Run Mode

Preview extraction without implementing:

```bash
*notion_implement REQ-994 --dry-run
```

This will show you what would be extracted without actually running the implementation.

### Skip Auto-Push

Run implementation without auto-pushing docs:

```bash
*notion_implement REQ-994 --no-push

# Later, manually push:
*notion_push REQ-994
```

## Tips and Best Practices

1. **Keep API Keys Secure**
   - Never commit `.env` to version control
   - Add `.env` to `.gitignore`
   - Use separate integrations for dev/prod

2. **Start with Dry Runs**
   - Use `--dry-run` flag first time
   - Verify extraction looks correct
   - Then run actual implementation

3. **Monitor Rate Limits**
   - Notion API allows 3 requests/second
   - Tool handles this automatically
   - But be aware if processing many requirements

4. **Regular Backups**
   - Keep Notion database backups
   - Export requirements periodically
   - Don't rely solely on Notion

5. **Test in Staging First**
   - If you have multiple environments
   - Test Notion integration in dev/staging
   - Then roll out to production

## Support

### Need Help?

1. **Check Documentation**
   - README.md - Complete feature reference
   - notion-api-guide.md - API details
   - field-mapping-reference.md - Field mapping guide

2. **Check Logs**
   - Look for error messages in console
   - Check Notion API errors
   - Review tracking file: `.notion-tracking.json`

3. **Common Solutions**
   - Re-test API connection: `*notion_test`
   - Verify field mappings: `*notion_config`
   - Check database permissions in Notion

4. **Still Stuck?**
   - Review Notion API documentation
   - Check integration settings
   - Verify database schema matches expectations

## Success! 🎉

You're now ready to use BMAD with Notion integration!

**Your workflow:**
1. Create requirement in Notion
2. Run: `*notion_implement REQ-XXX`
3. BMAD extracts, implements, and pushes docs back
4. Review results in Notion
5. Repeat!

**Time saved:**
- Manual requirement copying: ❌ Not needed
- Manual documentation upload: ❌ Not needed
- Status updates: ❌ Not needed
- Ticket management: ✅ Automatic

**Complete bidirectional sync between Notion and your codebase!**

