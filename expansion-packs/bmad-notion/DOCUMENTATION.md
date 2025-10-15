# BMAD Notion Integration - Complete Documentation

> **Comprehensive guide for the BMAD Notion Integration expansion pack**
> 
> Version: 1.0.0 | Last Updated: 2025-10-15

---

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Overview & Features](#overview--features)
3. [Installation & Setup](#installation--setup)
4. [Core Commands](#core-commands)
5. [Automated Workflows](#automated-workflows)
6. [JavaScript Scripts](#javascript-scripts)
7. [Configuration](#configuration)
8. [Field Mappings](#field-mappings)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Usage](#advanced-usage)
11. [API Reference](#api-reference)
12. [Support & Resources](#support--resources)

---

# Quick Start

## ⚡ 30-Second Setup

```bash
# 1. Navigate to bmad-notion
cd expansion-packs/bmad-notion

# 2. Install dependencies
./install.sh

# 3. Configure environment
cp env.example .env
# Edit .env with your Notion credentials

# 4. Test connection
npm run test

# 5. Fetch a requirement
npm run workflow:fetch "https://www.notion.so/your-page-url"
```

## 🎯 Most Common Commands

```bash
# Activate Notion Integrator
@notion

# Test connection
*notion_test

# Fetch and implement requirement
*notion_implement REQ-1141

# Push documentation back
*notion_push REQ-1141

# Check status
*notion_status
```

## 🚀 Workflow Commands (Automated)

```bash
# Fetch workflow
npm run workflow:fetch "https://www.notion.so/..."

# Complete implementation workflow
npm run workflow:implement REQ-1141

# Push documentation workflow
npm run workflow:push REQ-1141

# Test connectivity workflow
npm run workflow:test

# List requirements workflow
npm run workflow:list

# Status check workflow
npm run workflow:status
```

---

# Overview & Features

## What is BMAD Notion Integration?

The BMAD Notion Integration expansion pack enables seamless integration between BMAD/VIRAT and Notion workspaces, creating a closed-loop workflow from requirement extraction through implementation to documentation push-back.

## 🌟 Key Features

### 1. **Requirement Extraction**
- Fetch requirements from Notion pages using URLs or IDs
- Automatic field mapping and data extraction
- Support for multiple field types (text, rollup, unique_id)
- Smart parsing of Notion URLs and identifiers

### 2. **Auto-Implementation**
- Automatically feed extracted requirements to VIRAT
- Execute complete implementation workflow
- Track page IDs for documentation push-back
- Support for dry-run mode

### 3. **Documentation Push-Back**
- Upload documentation to section below Comments
- Convert markdown to Notion blocks
- Organize files in nested toggle structure
- Preserve formatting and structure

### 4. **Automated Workflows**
- 6 pre-built workflow templates
- YAML-based configuration
- Step-by-step validation
- Comprehensive error handling

### 5. **Command Suite**
- 9 specialized command scripts
- Interactive and batch modes
- Comprehensive help system
- Status monitoring and diagnostics

### 6. **Data Management**
- Centralized docs/ folder for all extracted data
- Operation tracking and history
- Caching for performance
- Git-friendly organization

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│  Notion Workspace                                    │
│  • Requirements Database                             │
│  • Page Properties & Content                         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  BMAD Notion Integration                            │
│  • Workflow Engine                                  │
│  • Script Handlers                                  │
│  • Field Mappers                                    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  VIRAT Implementation Engine                        │
│  • Code Generation                                  │
│  • Documentation Generation                         │
│  • Testing & Validation                             │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Documentation Push-Back                            │
│  • Markdown to Notion Blocks                        │
│  • Below Comments Section Update                    │
│  • Operation Tracking                               │
└─────────────────────────────────────────────────────┘
```

---

# Installation & Setup

## Prerequisites

- **Node.js** >= 16.0.0
- **npm** or **yarn**
- **Notion Integration** (API key)
- **Database Access** (shared with integration)

## Step 1: Install Dependencies

```bash
cd expansion-packs/bmad-notion
./install.sh
```

Or manually:
```bash
npm install
```

## Step 2: Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Give it a name (e.g., "BMAD Integration")
4. Select your workspace
5. Copy the **Internal Integration Token**

## Step 3: Configure Environment

```bash
# Copy example environment file
cp env.example .env

# Edit .env with your credentials
nano .env
```

**Required variables:**
```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Optional variables:**
```env
NOTION_VIEW_ID=xxxxxxxxxxxx
NOTION_API_VERSION=2022-06-28
NOTION_USE_WORKFLOWS=true
```

## Step 4: Share Database with Integration

1. Open your Notion database
2. Click **"•••"** (three dots) in top right
3. Click **"Add connections"**
4. Select your integration
5. Click **"Confirm"**

## Step 5: Test Connection

```bash
npm run test
```

Expected output:
```
✅ Notion API connection successful
📊 Database: Requirements Database
🔢 Database ID: e3274df1c45e4e0180443768628870d1
```

## Step 6: Activate Notion Integrator

```bash
@notion
```

This loads the Notion Integrator agent in BMAD.

---

# Core Commands

## Command Overview

| Command | Purpose | Usage Example |
|---------|---------|---------------|
| `*notion_test` | Test API connectivity | `*notion_test` |
| `*notion_implement` | Extract & implement | `*notion_implement REQ-1141` |
| `*notion_fetch` | Preview extraction | `*notion_fetch REQ-1141 --dry-run` |
| `*notion_push` | Push documentation | `*notion_push REQ-1141` |
| `*notion_status` | Show status | `*notion_status` |
| `*notion_list` | List requirements | `*notion_list --limit 10` |
| `*notion_config` | Show configuration | `*notion_config` |
| `*notion-help` | Display help | `*notion-help` |

## 1. `*notion_test` - Test Connection

**Purpose**: Verify Notion API connectivity and validate configuration

**Usage:**
```bash
*notion_test
npm run test
```

**What it checks:**
- Environment variables present
- API key valid
- Database accessible
- Integration has proper permissions
- Field mappings correct

**Output:**
```
✅ Notion API connection successful
📊 Database: Requirements Database
✅ All connectivity tests passed
```

## 2. `*notion_implement` - Extract & Implement

**Purpose**: Extract requirement from Notion and execute complete VIRAT implementation

**Usage:**
```bash
# Using URL
*notion_implement https://www.notion.so/workspace/REQ-994-abc123

# Using requirement ID
*notion_implement REQ-994

# Dry run (preview only)
*notion_implement REQ-994 --dry-run

# Without auto-push
*notion_implement REQ-994 --no-push
```

**What it does:**
1. Connects to Notion API
2. Fetches requirement data
3. Creates VIRAT requirement file
4. Executes implementation workflow
5. Generates documentation
6. Pushes docs to Notion (if enabled)

**Generated Files:**
- `docs/.notion-extracted-data.json` - Raw data
- `docs/.virat-requirement.md` - VIRAT input
- Implementation artifacts (code, docs)

## 3. `*notion_fetch` - Preview Extraction

**Purpose**: Fetch and preview requirement without implementing

**Usage:**
```bash
*notion_fetch REQ-994
*notion_fetch REQ-994 --dry-run
npm run fetch REQ-994
```

**Output:**
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

## 4. `*notion_push` - Push Documentation

**Purpose**: Upload generated documentation to the section below Comments (same location as extraction source)

**Usage:**
```bash
# Auto-detect last implementation
*notion_push

# Specific requirement
*notion_push REQ-994

# Specific files
*notion_push REQ-994 --files "PLAN.md,CHANGELOG.md"

# As attachments instead of blocks
*notion_push REQ-994 --format attachments
```

**Documentation Files Pushed:**
- `*-ANALYSIS.md`
- `*-PLAN.md`
- `*-IMPLEMENTATION.md`
- `*-CHANGES.md`
- `CHANGELOG.md`
- `README*.md`

**Notion Structure Created:**
```
Below Comments Section
  └─ 📋 Implementation Complete - 2025-10-15
      ├─ REQUIREMENT_ANALYSIS.md
      ├─ IMPLEMENTATION_PLAN.md
      ├─ ALGORITHM_CHANGES.md
      ├─ LOADAPI_CHANGES.md
      ├─ CONFIG_CHANGES.md
      └─ CHANGELOG.md
```

## 5. `*notion_status` - Show Status

**Purpose**: Display integration status and operation history

**Usage:**
```bash
*notion_status
npm run status
```

**Output:**
```
╔════════════════════════════════════════════╗
║     NOTION INTEGRATION STATUS              ║
╚════════════════════════════════════════════╝

📋 ENVIRONMENT
  ✅ NOTION_API_KEY configured
  ✅ NOTION_DATABASE_ID configured

📊 LAST OPERATIONS
  Last Fetch: REQ-1141 (2025-10-15)
  Last Implementation: REQ-1141 (success)
  Last Push: 6 documents uploaded

✅ Integration status: HEALTHY
```

## 6. `*notion_list` - List Requirements

**Purpose**: Query and list requirements from Notion database

**Usage:**
```bash
# List all (default limit: 20)
*notion_list

# With limit
*notion_list --limit 10

# Detailed view
*notion_list --detailed

# Filter by status
*notion_list --filter status active

# Search
*notion_list --search REQ-1141
```

**Output:**
```
┌─────────────┬──────────────────────┬──────────┬──────────┐
│ ID          │ Title                │ Status   │ Lead     │
├─────────────┼──────────────────────┼──────────┼──────────┤
│ REQ-1141    │ Merge Altheory data  │ active   │ Harshith │
│ REQ-1140    │ Fix PDF generation   │ active   │ Unni     │
└─────────────┴──────────────────────┴──────────┴──────────┘

✅ Retrieved 2 requirements from Notion
```

## 7. `*notion_config` - Show Configuration

**Purpose**: Display current configuration and field mappings

**Usage:**
```bash
*notion_config
npm run config
```

## 8. `*notion-help` - Display Help

**Purpose**: Show comprehensive help for all commands

**Usage:**
```bash
*notion-help
*notion-help --command notion_implement
npm run help
```

---

# Automated Workflows

## Overview

The integration includes 6 pre-built YAML workflows that automate complete processes:

1. **notion-fetch-workflow.yaml** - Automated requirement fetching
2. **notion-implement-workflow.yaml** - Full implementation workflow
3. **notion-push-workflow.yaml** - Documentation push automation
4. **notion-test-workflow.yaml** - Connectivity testing
5. **notion-list-workflow.yaml** - Database querying
6. **notion-status-workflow.yaml** - Status monitoring

## Workflow Features

- ✅ **YAML Configuration** - Easy to customize
- 🔄 **Step-by-Step Execution** - Transparent progress
- 🛡️ **Validation** - Built-in checks at each step
- 🔁 **Retry Logic** - Automatic retry on failures
- 📊 **Tracking** - Operation history maintained
- 📝 **Logging** - Comprehensive error logs

## Using Workflows

### Method 1: npm Scripts (Recommended)

```bash
# Fetch workflow
npm run workflow:fetch "https://www.notion.so/..."

# Implement workflow
npm run workflow:implement REQ-1141

# Push workflow
npm run workflow:push REQ-1141

# Test workflow
npm run workflow:test

# List workflow
npm run workflow:list

# Status workflow
npm run workflow:status
```


### Method 3: Direct Runner

```bash
node scripts/notion-workflow-runner.js "URL_OR_ID"
```

## Workflow Structure

Each workflow follows this pattern:

```yaml
name: workflow-name
version: 1.0.0
description: "Workflow purpose"

inputs:
  input_name:
    type: string
    required: true

environment:
  load_from: ".env"
  required_vars:
    - NOTION_API_KEY
    - NOTION_DATABASE_ID

steps:
  - name: step-name
    description: "What this step does"
    action: execute-script
    on_error: fail

outputs:
  output_name:
    value: "{{result}}"
    description: "Output description"

success:
  message: "✅ Success!"

failure:
  message: "❌ Failed!"
```

## Complete Workflow Example

```bash
# Test everything is working
npm run workflow:test

# Fetch requirement
npm run workflow:fetch REQ-1141

# Implement (includes fetch + implementation + push)
npm run workflow:implement REQ-1141

# Check final status
npm run workflow:status
```

---

# JavaScript Scripts

## Scripts Overview

All scripts are located in `scripts/` folder:

| Script | Lines | Purpose |
|--------|-------|---------|
| `notion-handler.js` | 449 | Main Notion API handler |
| `notion-workflow-runner.js` | 300 | Workflow execution engine |
| `notion-push.js` | 402 | Documentation push handler |
| `notion-test.js` | 330 | Connectivity testing |
| `notion-status.js` | 277 | Status monitoring |
| `notion-list.js` | 362 | Database querying |
| `notion-config.js` | 348 | Configuration display |
| `notion-help.js` | 378 | Help system |
| `notion-dispatcher.js` | 272 | Command routing |

## Core Scripts

### notion-handler.js

Main API handler for fetching and implementing requirements.

**Key Functions:**
- `extractRequirement(pageIdentifier)` - Extract data from Notion
- `searchByRequirementId(requirementId)` - Search database
- `handleNotionFetch(pageIdentifier)` - Fetch operation
- `handleNotionImplement(pageIdentifier)` - Implement operation
- `formatForVirat(extractedData)` - Format for VIRAT

**Usage:**
```bash
node scripts/notion-handler.js fetch REQ-1141
node scripts/notion-handler.js implement REQ-1141
node scripts/notion-handler.js test
```

### notion-workflow-runner.js

Executes YAML-defined workflows with validation and tracking.

**Key Functions:**
- `loadWorkflow()` - Load YAML configuration
- `validateEnvironment()` - Check env variables
- `parseNotionIdentifier(input)` - Parse URLs/IDs
- `fetchFromNotion(identifier)` - Execute fetch
- `validateExtraction()` - Validate data
- `run(notionLink, dryRun)` - Execute workflow

**Usage:**
```bash
node scripts/notion-workflow-runner.js REQ-1141
node scripts/notion-workflow-runner.js "URL" --dry-run
```

### notion-push.js

Handles documentation push to Notion's section below Comments.

**Key Functions:**
- `findDocumentationFiles()` - Find docs to push
- `markdownToNotionBlocks(markdown)` - Convert format
- `pushDocumentation(pageId)` - Upload to Notion
- `findDevelopmentSection(blocks)` - Locate target section

**Usage:**
```bash
node scripts/notion-push.js REQ-1141
node scripts/notion-push.js  # Auto-detect
```

## Script Architecture

```
┌────────────────────────────────────┐
│  notion-dispatcher.js              │
│  (Command Router)                  │
└──────────┬─────────────────────────┘
           │
           ├─→ notion-handler.js
           ├─→ notion-push.js
           ├─→ notion-test.js
           ├─→ notion-status.js
           ├─→ notion-list.js
           ├─→ notion-config.js
           ├─→ notion-help.js
           └─→ notion-workflow-runner.js
```

---

# Configuration

## Environment Variables (.env)

```env
# Required
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional
NOTION_VIEW_ID=xxxxxxxxxxxx
NOTION_API_VERSION=2022-06-28
NOTION_USE_WORKFLOWS=true
```

## YAML Configuration (config.yaml)

```yaml
# BMAD Notion Integration Configuration
name: bmad-notion
version: 1.0.0

# Notion API Settings
notion:
  api_version: "2022-06-28"
  base_url: "https://api.notion.com/v1"
  database_id: "{NOTION_DATABASE_ID}"
  api_key: "{NOTION_API_KEY}"

# Field Mappings
field_mappings:
  requirement_id: "No ID"
  content_section: "Below Comments"  # Extract from page blocks
  push_target_section: "Below Comments"  # Push to same location

# Documentation Patterns
documentation_patterns:
  - "*.md"
  - "*-ANALYSIS.md"
  - "*-IMPLEMENTATION.md"
  - "CHANGELOG.md"
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "node scripts/notion-handler.js test",
    "fetch": "node scripts/notion-handler.js fetch",
    "implement": "node scripts/notion-handler.js implement",
    "push": "node scripts/notion-push.js",
    "status": "node scripts/notion-status.js",
    "list": "node scripts/notion-list.js",
    "config": "node scripts/notion-config.js",
    "help": "node scripts/notion-help.js",
    "workflow": "node scripts/notion-workflow-runner.js",
    "workflow:fetch": "node scripts/notion-workflow-runner.js",
    "workflow:implement": "NOTION_USE_WORKFLOWS=true node scripts/notion-dispatcher.js notion_implement",
    "workflow:push": "NOTION_USE_WORKFLOWS=true node scripts/notion-dispatcher.js notion_push",
    "workflow:test": "NOTION_USE_WORKFLOWS=true node scripts/notion-dispatcher.js notion_test",
    "workflow:list": "NOTION_USE_WORKFLOWS=true node scripts/notion-dispatcher.js notion_list",
    "workflow:status": "NOTION_USE_WORKFLOWS=true node scripts/notion-dispatcher.js notion_status"
  }
}
```

---

# Field Mappings

## Supported Field Types

The integration supports these Notion property types:

| Notion Type | Description | Example |
|-------------|-------------|---------|
| `blocks` | Page content | Content below Comments |
| `title` | Page title | "Requirement" field |
| `unique_id` | Auto-generated ID | REQ-1141 |
| `rich_text` | Plain text | Metadata fields only |
| `select` | Single select | Status field |
| `multi_select` | Multiple select | Tags |
| `people` | User references | Lead field |
| `date` | Date/time | Due date |

## Extracted Fields

By default, the integration extracts:

| Field | Purpose | Type |
|-------|---------|------|
| ID / No ID | Requirement identifier | unique_id / rich_text |
| Requirement | Page title | title |
| Content Below Comments | Main requirement text | Page blocks |

## Customizing Field Mappings

Edit `config.yaml`:

```yaml
field_mappings:
  requirement_id: "Your ID Field Name"
  content_section: "Below Comments"  # Extracted from page blocks
  push_target_section: "Your Target Section"
```

## Multiple Field Name Support

The handler tries multiple field names automatically:

```javascript
// For requirement ID
const idFieldNames = ['ID', 'No ID', 'Requirement ID'];

// For description
const descFieldNames = [
  // Content is now extracted from page blocks, not properties
  'Description'
];
```

---

# Troubleshooting

## Common Issues

### Issue: Missing Environment Variables

**Symptom:**
```
❌ Missing required environment variables: NOTION_API_KEY
```

**Solution:**
1. Check `.env` file exists
2. Verify variables are set correctly
3. No quotes around values (unless part of the key)

```bash
# Correct
NOTION_API_KEY=secret_abc123

# Wrong
NOTION_API_KEY="secret_abc123"
```

### Issue: Cannot Connect to Notion

**Symptom:**
```
❌ Notion connection failed: Unauthorized
```

**Solutions:**
1. Verify API key is valid
2. Check integration has access to database
3. Ensure database is shared with integration
4. Test with: `npm run test`

### Issue: Field Not Found

**Symptom:**
```
Could not find property with name or id: No ID
```

**Solutions:**
1. Check field name in `config.yaml`
2. Verify field exists in database
3. Update field mappings to match your schema
4. Use full URL instead of requirement ID

### Issue: Empty Description

**Symptom:**
```
📝 Description length: 0 characters
```

**Solutions:**
1. Check field mapping for description
2. Verify Notion page has data in field
3. Check if field is rollup type
4. Ensure field has content

### Issue: Push Fails

**Symptom:**
```
❌ Failed to push documentation
```

**Solutions:**
1. Verify page permissions allow edits
2. Check file size limits (5MB per file)
3. Ensure content is extracted from section below Comments
4. Try with fewer files first

### Issue: Rate Limited

**Symptom:**
```
Error: rate_limited
```

**Solutions:**
1. Wait 60 seconds before retrying
2. Reduce batch size
3. Use --delay flag for batch operations
4. Workflow has auto-retry built-in

## Diagnostic Commands

```bash
# Test everything
npm run workflow:test --detailed

# Check configuration
npm run config

# Check status
npm run status

# View logs
cat docs/.notion-error.log

# Check tracking
cat docs/.notion-tracking.json | jq
```

## Getting Help

1. Check this documentation
2. Review error logs in `docs/` folder
3. Run diagnostic tests
4. Check Notion API status
5. Review recent changes

---

# Advanced Usage

## Batch Processing

```bash
#!/bin/bash
# Process multiple requirements

REQUIREMENTS=(
  "REQ-1141"
  "REQ-1142"
  "REQ-1143"
)

for req in "${REQUIREMENTS[@]}"; do
  echo "Processing $req..."
  npm run workflow:implement "$req"
  sleep 5  # Rate limiting
done
```

## Programmatic Usage

```javascript
const NotionWorkflowRunner = require('./scripts/notion-workflow-runner');

async function processRequirement(reqId) {
  const runner = new NotionWorkflowRunner();
  await runner.loadWorkflow();
  await runner.run(reqId);
}

processRequirement('REQ-1141');
```

## Custom Workflows

Create custom workflow YAML:

```yaml
name: my-custom-workflow
version: 1.0.0

steps:
  - name: custom-step
    action: execute-script
    script: "my-script.js"
    
  - name: notify
    action: send-notification
    message: "Workflow complete"
```

## Environment-Specific Configuration

```bash
# Development
NODE_ENV=development npm run workflow:implement REQ-1141

# Production
NODE_ENV=production \
NOTION_VALIDATE_SCHEMA=true \
npm run workflow:implement REQ-1141
```

## Integration with CI/CD

```yaml
# .github/workflows/notion-sync.yml
name: Notion Sync
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Fetch from Notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: |
          cd expansion-packs/bmad-notion
          npm install
          npm run workflow:list
```

---

# API Reference

## NotionHandler Class

```javascript
class NotionHandler {
  constructor()
  initializeConfig()
  parseNotionIdentifier(input)
  searchByRequirementId(requirementId)
  fetchPage(pageId)
  extractRequirement(pageIdentifier)
  handleNotionFetch(pageIdentifier, options)
  handleNotionImplement(pageIdentifier)
  formatForVirat(extractedData)
  testConnection()
}
```

## NotionWorkflowRunner Class

```javascript
class NotionWorkflowRunner {
  constructor()
  loadWorkflow()
  validateEnvironment()
  parseNotionIdentifier(input)
  fetchFromNotion(identifier, dryRun)
  validateExtraction()
  displayResults()
  updateTracking()
  run(notionLink, dryRun)
}
```

## NotionPush Class

```javascript
class NotionPush {
  constructor()
  initializeConfig()
  loadTrackingData()
  findDocumentationFiles()
  markdownToNotionBlocks(markdown)
  pushDocumentation(pageId, files)
  findDevelopmentSection(blocks)
}
```

---

# Support & Resources

## Documentation Files

- `DOCUMENTATION.md` - This comprehensive guide
- `workflows/README.md` - Workflow-specific docs
- `workflows/WORKFLOWS_REFERENCE.md` - Detailed workflow reference
- `scripts/README.md` - Script documentation

## Quick Links

- [Notion API Documentation](https://developers.notion.com)
- [BMAD Documentation](../../README.md)

## File Structure

```
bmad-notion/
├── DOCUMENTATION.md           # This file
├── config.yaml                # Configuration
├── .env                       # Environment variables
├── package.json               # Dependencies
├── install.sh                 # Setup script
├── workflows/                 # Workflow YAML files
│   ├── notion-fetch-workflow.yaml
│   ├── notion-implement-workflow.yaml
│   ├── notion-push-workflow.yaml
│   ├── notion-test-workflow.yaml
│   ├── notion-list-workflow.yaml
│   ├── notion-status-workflow.yaml
│   ├── README.md
│   └── WORKFLOWS_REFERENCE.md
├── scripts/                   # JavaScript handlers
│   ├── notion-handler.js
│   ├── notion-workflow-runner.js
│   ├── notion-push.js
│   ├── notion-test.js
│   ├── notion-status.js
│   ├── notion-list.js
│   ├── notion-config.js
│   ├── notion-help.js
│   └── notion-dispatcher.js
├── docs/                      # Extracted data
│   ├── .notion-extracted-data.json
│   ├── .virat-requirement.md
│   ├── .notion-tracking.json
│   └── README.md
├── agents/                    # BMAD agents
├── checklists/               # Validation checklists
├── data/                     # Reference data
└── templates/                # Templates

```

## Contact & Support

For issues or questions:
1. Check troubleshooting section
2. Review workflow logs
3. Run diagnostic tests
4. Contact BMAD support team

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-15  
**Status:** ✅ Production Ready  
**Total Scripts:** 13  
**Total Workflows:** 6  
**Total Commands:** 9

---

*This documentation is generated from multiple source files and consolidated for your convenience.*

