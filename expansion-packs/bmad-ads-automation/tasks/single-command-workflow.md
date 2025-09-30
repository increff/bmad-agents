<!-- Powered by BMAD™ Core -->

# Single Command Workflow - Enhanced Implementation

## Purpose

Execute the complete requirement implementation workflow using a single command that automatically orchestrates all necessary agents and operations without manual switching.

## Task Instructions

### 1. Command Structure and Validation

**CRITICAL:** This task implements the single command workflow as defined in Epic 1.1 of the PRD.

**Prerequisites:**

- Requirement document must be provided
- All three repositories must be accessible
- Enhanced ADS Orchestrator must be available

**Step 1: Command Parsing and Validation**

1. Parse the `*implement <requirement-file>` command
2. Validate the requirement file exists and is readable
3. Extract requirement ID, title, description, and technical requirements
4. Validate repository access and permissions
5. Display clear summary of what will be executed

**Step 2: Pre-Execution Summary**

1. **Show Implementation Plan:**

   ```
   📋 Implementation Summary
   ========================
   Requirement: {requirement-id} - {title}
   Repositories: {list of affected repositories}
   Estimated Time: {estimated completion time}
   Operations: {list of operations to be performed}

   Proceed? (y/n):
   ```

2. **User Confirmation:**
   - Wait for user confirmation before proceeding
   - Allow user to review and modify parameters if needed
   - Provide option to cancel or modify the plan

### 2. Automated Agent Orchestration

**Step 3: Automatic Agent Switching**

1. **SM Agent Phase:**
   - Automatically switch to SM agent
   - Execute story creation workflow
   - Generate implementation story with acceptance criteria
   - Return to orchestrator with story details

2. **Dev Agent Phase:**
   - Automatically switch to Dev agent
   - Execute development workflow
   - Implement all required changes
   - Return to orchestrator with implementation results

3. **QA Agent Phase:**
   - Automatically switch to QA agent
   - Execute validation and testing
   - Run all validation tests
   - Return to orchestrator with test results

**Step 4: Progress Tracking**

1. **Real-time Status Updates:**

   ```
   🔄 Implementation Progress
   =========================
   Phase: {current phase}
   Status: {current operation}
   Progress: {percentage complete}
   Time Elapsed: {elapsed time}
   Estimated Remaining: {remaining time}
   ```

2. **Operation Logging:**
   - Log all operations with timestamps
   - Track success/failure of each step
   - Maintain operation history for debugging

### 3. Error Handling and Recovery

**Step 5: Error Detection and Recovery**

1. **Error Detection:**
   - Monitor all operations for errors
   - Categorize errors by type and severity
   - Provide immediate feedback on errors

2. **Error Recovery:**
   - Display clear error messages with context
   - Suggest specific recovery actions
   - Provide links to relevant documentation
   - Allow user to retry or abort operation

3. **Error Examples:**

   ```
   ❌ Error: Repository Access Denied
   =================================
   Repository: irisx-algo
   Issue: Insufficient permissions to access repository

   Suggested Actions:
   1. Check repository permissions
   2. Verify authentication credentials
   3. Contact repository administrator

   Recovery Options:
   [R] Retry with different credentials
   [S] Skip this repository
   [A] Abort operation
   ```

### 4. Implementation Execution

**Step 6: Repository Analysis**

1. **Automatic Repository Detection:**
   - Analyze requirement to determine affected repositories
   - Check repository access and permissions
   - Validate repository state and branch status

2. **Branch Creation:**
   - Execute `*git-branch` command to create actual feature branches
   - Create feature branches from `caas-release` branch in each repository
   - Use naming convention: `feature/{req-id}-{title}`
   - Handle existing branches gracefully
   - Ensure all repositories are on correct branches

3. **Pattern Analysis:**
   - Crawl repositories to understand current patterns
   - Identify existing templates and conventions
   - Validate compatibility with proposed changes

**Step 7: Implementation Workflow**

1. **Story Creation:**
   - Generate implementation story
   - Define acceptance criteria
   - Update requirement document with story content
   - Plan implementation sequence

2. **Code Implementation:**
   - Implement all required changes
   - Follow existing patterns and conventions
   - Make actual file modifications in repositories
   - Commit changes using `*git-commit`
   - Update requirement document with implementation details
   - Maintain consistency across repositories

3. **Validation and Testing:**
   - Run all validation tests
   - Verify implementation correctness
   - Update requirement document with test cases and results
   - Check for regressions

### 5. Results and Documentation

**Step 8: Implementation Results**

1. **Consolidated Documentation:**
   - Update requirement document with all generated information
   - Add branch URLs and repository information
   - Add changelog with development progress
   - Add test cases and results
   - Add short PRD updates
   - Add code review status
   - Add deployment information
   - Add metrics and analytics

2. **Success Summary:**

   ```
   ✅ Implementation Complete
   ==========================
   Requirement: {requirement-id} - {title}
   Status: Success
   Duration: {total time}
   Repositories Modified: {list}
   Files Changed: {count}
   Tests Passed: {count}/{total}

   Next Steps:
   - Review changes in repositories
   - Run additional tests if needed
   - Deploy to staging environment
   ```

3. **Detailed Results:**
   - List all files modified with change counts
   - Show git commit information
   - Provide links to changed files
   - Include test results and coverage

**Step 9: Documentation Updates**

1. **Update Requirement Document:**
   - Add implementation results
   - Document all changes made
   - Include test results and validation
   - Provide next steps and recommendations

2. **Generate Change Documentation:**
   - Create comprehensive change log
   - Document all modifications
   - Include rollback instructions
   - Provide deployment guidance

## Success Criteria

- Single command `*implement <requirement-file>` works end-to-end
- Automatic agent switching implemented and working
- Repository analysis and summary display functional
- Progress tracking and status updates working
- Error handling with recovery suggestions implemented
- All existing agent functionality remains unchanged
- Implementation results properly documented

## Error Handling

- **Repository Access Issues**: Clear error messages with recovery suggestions
- **Agent Switching Failures**: Fallback to manual agent switching
- **Implementation Failures**: Detailed error reporting with retry options
- **Validation Failures**: Specific test failure analysis with fix suggestions
- **Configuration Issues**: Clear configuration error messages with examples

## Notes

- This task implements the single command workflow from Epic 1.1
- Maintains full backward compatibility with existing workflows
- Provides enhanced user experience with progress tracking and error handling
- Follows existing BMAD patterns and conventions
- Integrates seamlessly with existing agent system
