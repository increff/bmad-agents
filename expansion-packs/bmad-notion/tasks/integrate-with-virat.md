# Task: Integrate with VIRAT Implement Workflow

## Objective
Seamlessly pass extracted Notion requirements to VIRAT's `*implement` command and monitor execution.

## Inputs
- `requirement_file`: Path to extracted requirement markdown file
- `requirement_id`: Requirement ID (e.g., "REQ-994")
- `notion_page_id`: Notion page ID for documentation push-back

## Process

### Step 1: Validate Requirement File
1. Verify requirement file exists and is readable
2. Check that file contains all required sections:
   - Metadata (requirement_id, title, status, etc.)
   - Notion Integration (page_id, page_url)
   - Request Description
   - Development Details
3. Validate requirement format matches VIRAT expectations

### Step 2: Load VIRAT Agent
1. Check if VIRAT expansion pack is installed
2. Verify VIRAT configuration exists
3. Load VIRAT agent: `expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/agents/virat.md`
4. Activate VIRAT persona if not already active

### Step 3: Prepare VIRAT Execution Context
1. Set environment variables if needed
2. Ensure repositories are accessible
3. Verify base branch configuration
4. Check for any blocking issues (uncommitted changes, etc.)

### Step 4: Execute VIRAT Implement Command
Execute: `*implement {requirement_file}`

**VIRAT Workflow Steps:**
1. Phase 0: Repository Preparation
   - Switch to base branches
   - Verify repository state
2. Phase 1: Intelligent Analysis
   - Deep requirement analysis
   - Repository crawling
   - Expert pattern analysis
   - Validation
   - Dependency mapping
3. Phase 2: Implementation Planning
   - Create implementation plan
   - Validate with PM persona
   - Risk analysis
   - Testing strategy
4. Phase 3: Execution
   - Execute code changes
   - Update configurations
   - Apply patterns
5. Phase 4: Quality Assurance
   - Run tests
   - Validate changes
   - Code review
6. Phase 5: Documentation
   - Generate documentation
   - Update changelogs
   - Create summaries

### Step 5: Monitor VIRAT Execution
1. Track execution progress through phases
2. Monitor for errors or blocking issues
3. Log key milestones and decisions
4. Capture generated documentation files

### Step 6: Handle Execution Errors
**If VIRAT encounters errors:**
1. Capture error details and context
2. Attempt automatic recovery if possible
3. If manual intervention needed:
   - Pause execution
   - Notify user with clear error message
   - Provide recovery options
   - Wait for user action
4. Log error in tracking file for future reference

### Step 7: Collect Generated Documentation
Once VIRAT completes:
1. Scan workspace for newly created/modified files
2. Identify documentation files:
   - `*-ANALYSIS.md`
   - `*-IMPLEMENTATION.md`
   - `*-PLAN.md`
   - `CHANGELOG.md`
   - `README*.md`
   - Any other `.md` files
3. Filter to only files modified since workflow start
4. Organize by category

### Step 8: Prepare for Documentation Push
1. Update tracking file with implementation details:
   ```json
   {
     "REQ-994": {
       "page_id": "abc123def456",
       "page_url": "https://notion.so/workspace/REQ-994-abc...",
       "extracted_at": "2025-10-14T10:30:00Z",
       "virat_started_at": "2025-10-14T10:32:00Z",
       "virat_completed_at": "2025-10-14T12:45:00Z",
       "status": "implemented",
       "repositories_modified": ["irisx-algo", "ms-loadapis", "irisx-config"],
       "documentation_files": [
         "REQUIREMENT_ANALYSIS.md",
         "IMPLEMENTATION_PLAN.md",
         "ALGORITHM_CHANGES.md",
         "LOADAPI_CHANGES.md",
         "CONFIG_CHANGES.md",
         "CHANGELOG.md"
       ]
     }
   }
   ```

### Step 9: Trigger Automatic Documentation Push
If `--no-push` flag was NOT specified:
1. Automatically trigger `notion_push` task
2. Pass requirement_id and documentation files
3. Upload all documentation back to Notion
4. Update ticket status

### Step 10: Cleanup
1. Remove temporary requirement file if created
2. Archive execution logs
3. Update success metrics

## Outputs
- `execution_status`: Success or failure status
- `execution_duration`: Time taken for VIRAT execution
- `documentation_files`: List of generated documentation files
- `repositories_modified`: List of repositories that were changed
- `virat_summary`: Summary of VIRAT execution results

## Integration Points

### Pre-Integration Checks
- ✅ VIRAT expansion pack installed
- ✅ Repository paths configured
- ✅ Base branches configured
- ✅ Requirement file valid
- ✅ No blocking repository issues

### Post-Integration Actions
- ✅ Documentation files collected
- ✅ Tracking file updated
- ✅ Automatic push to Notion (unless --no-push)
- ✅ User notification with results
- ✅ Cleanup temporary files

## Error Handling

### VIRAT Not Installed
- **Error**: VIRAT expansion pack not found
- **Action**: Prompt user to install VIRAT
- **Message**: "VIRAT expansion pack is required. Please install it first."

### Repository Configuration Issues
- **Error**: Repository paths not configured or invalid
- **Action**: Prompt user to configure repository paths
- **Message**: "Repository paths not configured. Run VIRAT setup."

### Requirement Validation Failure
- **Error**: Requirement file invalid or incomplete
- **Action**: Show validation errors and prompt for fixes
- **Message**: "Requirement validation failed: {errors}"

### VIRAT Execution Failure
- **Error**: VIRAT implementation fails
- **Action**: Capture error, provide recovery options
- **Message**: "VIRAT implementation failed: {error}. Options: 1) Retry 2) Manual fix 3) Abort"

## Success Criteria
- ✅ Requirement file validated successfully
- ✅ VIRAT agent loaded and activated
- ✅ VIRAT implement command executed
- ✅ All phases completed without errors
- ✅ Documentation files generated
- ✅ Tracking file updated
- ✅ Ready for documentation push

## Example Execution Flow

**Initial State:**
```
Requirement extracted from Notion: temp-REQ-994.md
Notion page ID stored: abc123def456
```

**Execution:**
```
🔄 Validating requirement file...
✅ Requirement valid: REQ-994 - Multiple ROS & Factorization Features

🔄 Loading VIRAT agent...
✅ VIRAT agent loaded successfully

🚀 Starting VIRAT implementation workflow...

Phase 0: Repository Preparation
├─ Switching to base branches... ✅
└─ Verifying repository state... ✅

Phase 1: Intelligent Analysis
├─ Deep requirement analysis... ✅
├─ Repository crawling... ✅
├─ Expert pattern analysis... ✅
├─ Validation... ✅
└─ Dependency mapping... ✅

Phase 2: Implementation Planning
├─ Creating implementation plan... ✅
├─ PM validation... ✅
├─ Risk analysis... ✅
└─ Testing strategy... ✅

Phase 3: Execution
├─ Algorithm changes... ✅
├─ LoadAPI changes... ✅
└─ Configuration updates... ✅

Phase 4: Quality Assurance
├─ Running tests... ✅
├─ Validating changes... ✅
└─ Code review... ✅

Phase 5: Documentation
├─ Generating documentation... ✅
├─ Updating changelogs... ✅
└─ Creating summaries... ✅

✅ VIRAT implementation complete!

📊 Summary:
├─ Duration: 2h 13m
├─ Repositories: irisx-algo, ms-loadapis, irisx-config
├─ Files changed: 24
├─ Tests passed: 45/45
└─ Documentation: 6 files generated

📄 Documentation files:
├─ REQUIREMENT_ANALYSIS.md
├─ IMPLEMENTATION_PLAN.md
├─ ALGORITHM_CHANGES.md
├─ LOADAPI_CHANGES.md
├─ CONFIG_CHANGES.md
└─ CHANGELOG.md

🚀 Triggering automatic documentation push to Notion...
```

## Command Options

### `--no-push`
Skip automatic documentation push after implementation.

**Usage:**
```bash
*notion_implement REQ-994 --no-push
```

### `--dry-run`
Execute VIRAT in dry-run mode (no actual changes).

**Usage:**
```bash
*notion_implement REQ-994 --dry-run
```

### `--verbose`
Show detailed VIRAT execution logs.

**Usage:**
```bash
*notion_implement REQ-994 --verbose
```

## Monitoring and Logging

### Execution Logs
Log all key events:
- VIRAT activation
- Phase transitions
- Key decisions and actions
- Errors and warnings
- Completion status

### Metrics Tracking
Track execution metrics:
- Total execution time
- Time per phase
- Number of files changed
- Number of tests run/passed
- Documentation files generated

### User Feedback
Provide real-time feedback:
- Phase progress indicators
- Completion percentages
- Estimated time remaining
- Success/failure notifications

