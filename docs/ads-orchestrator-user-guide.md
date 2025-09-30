# VIRAT - ADS Orchestrator Enhanced - User Guide

## Overview

The Enhanced ADS Orchestrator provides a streamlined, user-friendly interface for implementing requirements across multiple repositories. This guide covers all the new features and improvements that make the orchestrator easier to use, more reliable, and more flexible.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Single Command Workflow](#single-command-workflow)
3. [Configuration Management](#configuration-management)
4. [Error Handling and Recovery](#error-handling-and-recovery)
5. [Progress Tracking](#progress-tracking)
6. [Advanced Features](#advanced-features)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Getting Started

### Prerequisites

- Access to the three interconnected repositories (irisx-algo, ms-loadapis-ril-final, irisx-config)
- Git access with appropriate permissions
- BMAD framework installed and configured
- Enhanced ADS Orchestrator agent available

### Activation

To activate VIRAT (Enhanced ADS Orchestrator):

```
@virat
```

You'll see the enhanced orchestrator interface with new commands and capabilities.

### First-Time Setup

1. **Configure Repository Paths:**

   ```
   *config set repository-path irisx-algo /path/to/your/irisx-algo
   *config set repository-path ms-loadapis-ril-final /path/to/your/ms-loadapis-ril-final
   *config set repository-path irisx-config /path/to/your/irisx-config
   ```

2. **Validate Configuration:**

   ```
   *config validate
   ```

3. **Test the System:**
   ```
   *help
   ```

---

## Single Command Workflow

### The `*implement` Command

The enhanced orchestrator provides a single command that handles the entire implementation workflow:

```
*implement <requirement-file>
```

### Example Usage

```
*implement requirement-123.md
```

### What Happens

1. **Pre-Execution Summary:**

   ```
   📋 Implementation Summary
   ========================
   Requirement: REQ-123 - Add new allocation module
   Repositories: irisx-algo, ms-loadapis-ril-final, irisx-config
   Estimated Time: 45 minutes
   Operations: Story creation, code generation, validation, testing

   Proceed? (y/n):
   ```

2. **Automatic Agent Switching:**
   - **SM Agent**: Creates implementation story
   - **Dev Agent**: Implements code changes
   - **QA Agent**: Validates and tests implementation

3. **Branch Creation:**
   - Executes actual Git operations to create feature branches
   - Creates feature branches from `caas-release` branch in each repository
   - Uses naming convention: `feature/{req-id}-{title}`
   - Commits and pushes changes to remote repositories

4. **Progress Tracking:**

   ```
   🔄 Implementation Progress
   =========================
   Phase: Story Creation
   Status: Creating implementation story
   Progress: ████████░░ 80%
   Time Elapsed: 00:02:15
   Estimated Remaining: 00:00:30
   ```

5. **Results Summary:**

   ```
   ✅ Implementation Complete
   ==========================
   Requirement: REQ-123 - Add new allocation module
   Status: Success
   Duration: 00:42:30
   Repositories Modified: irisx-algo, ms-loadapis-ril-final, irisx-config
   Files Changed: 12
   Tests Passed: 15/15

   Documentation Updated:
   - Requirement document updated with all implementation details
   - Branch URLs and repository information added
   - Changelog with development progress included
   - Test cases and results documented
   - Short PRD updates integrated

   Next Steps:
   - Review updated requirement document
   - Run additional tests if needed
   - Deploy to staging environment
   ```

### Command Options

- **Dry Run**: `*implement --dry-run requirement-123.md`
- **Verbose Output**: `*implement --verbose requirement-123.md`
- **Skip Validation**: `*implement --skip-validation requirement-123.md`

---

## Consolidated Documentation

The enhanced orchestrator consolidates all generated documentation into the requirement document itself, eliminating the need for separate files.

### Key Features:

- **Single Source of Truth**: All information in one requirement document
- **Branch URLs**: Automatic tracking of feature branch URLs
- **Changelog**: Development progress and timeline
- **Test Cases**: All test cases and results included
- **Short PRD**: Requirement updates and changes
- **No Separate Files**: No additional documentation files created

### Documentation Sections:

- **Branch URLs & Repository Information**: Feature branch URLs and status
- **Implementation Plan**: Detailed implementation steps and dependencies
- **Test Cases**: Unit, integration, and manual test cases with results
- **Change Log**: Development progress with timestamps and actions
- **Short PRD Updates**: Requirement changes and updates
- **Code Review & Validation**: Review status and validation results
- **Deployment Information**: Deployment status and steps
- **Metrics & Analytics**: Development metrics and performance impact

---

## Configuration Management

### Configuration Files

The enhanced orchestrator uses YAML-based configuration files for flexibility and ease of use.

#### Main Configuration File

Location: `config/ads-orchestrator.yaml`

```yaml
# ADS Orchestrator Configuration
version: '1.0'

# Repository Configuration
repositories:
  irisx-algo:
    path: '/Users/viratbansal/IdeaProjects/irisx-algo'
    type: 'java'
    branch: 'caas-release'
    access: 'git'

  ms-loadapis-ril-final:
    path: '/Users/viratbansal/IdeaProjects/ms-loadapis-ril-final'
    type: 'python'
    branch: 'caas-release'
    access: 'git'

  irisx-config:
    path: '/Users/viratbansal/IdeaProjects/irisx-config'
    type: 'config'
    branch: 'caas-release'
    access: 'git'

# Environment Configuration
environments:
  development:
    repositories:
      irisx-algo:
        path: '/dev/irisx-algo'
        branch: 'caas-release'
      ms-loadapis-ril-final:
        path: '/dev/ms-loadapis-ril-final'
        branch: 'caas-release'
      irisx-config:
        path: '/dev/irisx-config'
        branch: 'caas-release'

# User Preferences
preferences:
  default_environment: 'development'
  auto_confirm: false
  progress_display: true
  error_recovery: 'interactive'
```

### Configuration Commands

#### View Current Configuration

```
*config show
```

#### Set Repository Path

```
*config set repository-path irisx-algo /path/to/your/irisx-algo
```

#### Switch Environment

```
*config set environment staging
```

#### Validate Configuration

```
*config validate
```

#### Generate Configuration Template

```
*config generate-template
```

### Environment Management

The orchestrator supports multiple environments for different stages of development:

- **Development**: Local development environment
- **Staging**: Staging environment for testing
- **Production**: Production environment

Switch between environments:

```
*config set environment staging
*config validate
```

---

## Error Handling and Recovery

### Error Message Format

The enhanced orchestrator provides clear, structured error messages:

```
❌ Error: Repository Access Denied
=================================
Context: Attempting to create feature branch in irisx-algo
Cause: Insufficient permissions for branch creation
Impact: Cannot proceed with implementation

Suggested Actions:
1. Verify you have write permissions to the repository
2. Check if the repository requires authentication
3. Ensure you're using the correct repository URL

Recovery Options:
[R] Retry with different credentials
[S] Skip this repository and continue
[A] Abort operation
[H] Get help with repository access

Documentation:
- Repository Access Guide: https://docs.example.com/repo-access
- Authentication Setup: https://docs.example.com/auth-setup
```

### Error Categories

#### Repository Access Errors

- **Permission Issues**: Insufficient repository permissions
- **Authentication Failures**: Invalid credentials or tokens
- **Connectivity Issues**: Network or repository access problems

#### Configuration Errors

- **Invalid YAML**: Syntax errors in configuration files
- **Missing Fields**: Required configuration fields not provided
- **Invalid Paths**: Repository paths that don't exist

#### Implementation Errors

- **Template Issues**: Missing or invalid code templates
- **Pattern Conflicts**: Conflicts with existing code patterns
- **Validation Failures**: Generated code doesn't meet requirements

### Recovery Actions

#### Automatic Recovery

The system can automatically:

- Retry failed operations with different parameters
- Use fallback configurations or templates
- Skip non-critical operations and continue
- Provide alternative approaches

#### User-Guided Recovery

When automatic recovery isn't possible:

- Present clear options for user to choose
- Provide step-by-step guidance for manual recovery
- Offer to open relevant documentation or examples
- Allow user to modify parameters and retry

### Error History

View recent errors:

```
*errors
```

Error history includes:

- Timestamp and operation context
- Error type and severity
- Recovery actions attempted
- Resolution status and outcome

---

## Git Operations

The enhanced orchestrator performs actual Git operations to create branches, make changes, and manage repositories.

### Git Commands

#### Create Feature Branches

```
*git-branch
```

- Creates feature branches from `caas-release` in all affected repositories
- Uses naming convention: `feature/{req-id}-{title}`
- Handles existing branches gracefully

#### Switch to Feature Branches

```
*git-checkout
```

- Switches to feature branches in repositories
- Verifies branch status and recent commits

#### Commit Changes

```
*git-commit
```

- Commits changes to feature branches
- Uses proper commit message format
- Includes requirement ID and description

#### Push Changes

```
*git-push
```

- Pushes feature branches to remote repositories
- Verifies remote branch availability
- Updates branch URLs in requirement document

#### Check Repository Status

```
*git-status
```

- Checks git status of all repositories
- Shows current branch and uncommitted changes
- Displays recent commits and remote status

### Real Repository Operations

The orchestrator performs actual operations on your repositories:

- **File Modifications**: Makes real changes to Java, Python, and configuration files
- **Branch Creation**: Creates actual feature branches from `caas-release`
- **Commits**: Creates real commits with proper messages
- **Push Operations**: Pushes branches to remote repositories
- **Status Tracking**: Monitors actual repository state

---

## Progress Tracking

### Real-Time Progress Display

The orchestrator provides real-time progress updates:

```
🔄 Implementation Progress
=========================
Phase: Repository Analysis
Status: Crawling irisx-algo repository
Progress: ████████░░ 80%
Time Elapsed: 00:02:15
Estimated Remaining: 00:00:30

Current Operation:
- Analyzing Java modules in src/main/java/com/increff/irisx/module/
- Found 15 modules, analyzing patterns...

Warnings:
⚠️  Module 'CustomModule' doesn't follow naming convention
⚠️  Missing documentation in 3 methods
```

### Progress Commands

#### View Current Progress

```
*progress
```

#### View Operation Status

```
*status
```

#### View Operation History

```
*history
```

### Operation Logging

Detailed operation logs are maintained:

```
📝 Operation Log
===============
2024-12-19 14:30:15 - Started implementation workflow
2024-12-19 14:30:16 - Parsed requirement file: requirement-123.md
2024-12-19 14:30:17 - Validated repository access: ✅
2024-12-19 14:30:18 - Started repository analysis
2024-12-19 14:30:20 - Crawling irisx-algo: 15 modules found
2024-12-19 14:30:22 - Crawling ms-loadapis-ril-final: 8 APIs found
2024-12-19 14:30:24 - Crawling irisx-config: 25 templates found
2024-12-19 14:30:25 - Pattern analysis complete
2024-12-19 14:30:26 - Generated implementation plan
```

---

## Advanced Features

### Custom Pattern Configuration

Define custom patterns for code generation:

```yaml
# config/patterns.yaml
patterns:
  custom_allocation:
    java_template: 'CustomAllocationModule.java.template'
    python_template: 'CustomLoadApi.py.template'
    config_template: 'custom_module_template.tsv'
    validation_rules:
      - 'must_extend_AbstractAllocationModule'
      - 'must_have_Component_annotation'
      - 'must_follow_naming_convention'
```

### Pattern Management Commands

#### Define Custom Pattern

```
*config define-pattern custom-allocation patterns/custom-allocation.yaml
```

#### Validate Pattern

```
*config validate-pattern custom-allocation
```

#### List Available Patterns

```
*config list-patterns
```

### Environment-Specific Configuration

Configure different settings for different environments:

```yaml
environments:
  development:
    repositories:
      irisx-algo:
        path: '/dev/irisx-algo'
        branch: 'develop'
    preferences:
      auto_confirm: false
      progress_display: true

  staging:
    repositories:
      irisx-algo:
        path: '/staging/irisx-algo'
        branch: 'staging'
    preferences:
      auto_confirm: true
      progress_display: false
```

### Advanced Error Recovery

#### Error Recovery Modes

Configure error recovery behavior:

```yaml
preferences:
  error_recovery: 'interactive' # interactive, automatic, manual
```

- **Interactive**: Present options for user to choose
- **Automatic**: Attempt automatic recovery
- **Manual**: Require manual intervention

#### Custom Error Handling

Define custom error handling for specific scenarios:

```yaml
error_handling:
  repository_access_denied:
    action: 'retry_with_credentials'
    max_retries: 3
    fallback: 'skip_repository'

  configuration_error:
    action: 'use_default_config'
    fallback: 'abort_operation'
```

---

## Troubleshooting

### Common Issues

#### Repository Access Denied

**Problem**: Cannot access repository
**Solution**:

1. Check repository permissions
2. Verify authentication credentials
3. Ensure repository URL is correct
4. Contact repository administrator

#### Configuration Validation Failed

**Problem**: Configuration file has errors
**Solution**:

1. Check YAML syntax
2. Validate required fields
3. Use configuration template
4. Run `*config validate` for details

#### Code Generation Failed

**Problem**: Cannot generate code from templates
**Solution**:

1. Check template file exists
2. Validate template syntax
3. Verify template variables
4. Use alternative template

#### Progress Tracking Not Working

**Problem**: No progress updates displayed
**Solution**:

1. Check `progress_display` setting
2. Verify logging configuration
3. Check system resources
4. Restart orchestrator

### Debug Commands

#### Enable Debug Mode

```
*config set log-level debug
```

#### View System Status

```
*status
```

#### Check Configuration

```
*config validate
```

#### View Recent Errors

```
*errors
```

### Getting Help

#### Built-in Help

```
*help
```

#### Command-Specific Help

```
*help implement
*help config
*help errors
```

#### Documentation Links

- Configuration Guide
- Template Reference
- Error Recovery Guide
- Best Practices

---

## Best Practices

### Configuration Management

1. **Use Environment-Specific Configurations**
   - Separate configurations for dev, staging, prod
   - Use environment variables for sensitive data
   - Validate configurations before use

2. **Version Control Configuration**
   - Keep configuration files in version control
   - Use templates for new environments
   - Document configuration changes

3. **Regular Configuration Validation**
   - Run `*config validate` regularly
   - Check repository access periodically
   - Update configurations when repositories change

### Error Handling

1. **Monitor Error Patterns**
   - Review error history regularly
   - Identify common error causes
   - Update configurations to prevent errors

2. **Use Appropriate Recovery Actions**
   - Choose recovery actions based on error type
   - Don't skip critical operations
   - Document error resolutions

3. **Maintain Error Documentation**
   - Keep error resolution notes
   - Share solutions with team
   - Update documentation based on experience

### Implementation Workflow

1. **Prepare Requirements**
   - Ensure requirement files are complete
   - Validate requirement syntax
   - Check repository access before starting

2. **Use Single Command Workflow**
   - Use `*implement` for most implementations
   - Review pre-execution summary
   - Monitor progress during implementation

3. **Validate Results**
   - Review implementation results
   - Run additional tests if needed
   - Document any issues or improvements

### Performance Optimization

1. **Optimize Repository Access**
   - Use local repositories when possible
   - Minimize network operations
   - Cache repository information

2. **Efficient Configuration**
   - Use minimal configuration files
   - Avoid unnecessary environment switches
   - Optimize pattern definitions

3. **Monitor System Resources**
   - Check disk space and memory usage
   - Monitor operation duration
   - Optimize based on usage patterns

---

## Conclusion

The Enhanced ADS Orchestrator provides a powerful, user-friendly interface for implementing requirements across multiple repositories. With its streamlined single command workflow, comprehensive error handling, and flexible configuration management, it significantly improves the development experience while maintaining reliability and flexibility.

### Key Benefits

- **Simplified Workflow**: Single command handles entire implementation
- **Better Error Handling**: Clear messages with recovery suggestions
- **Flexible Configuration**: YAML-based configuration system
- **Progress Tracking**: Real-time status and operation logging
- **Environment Support**: Multiple environment configurations
- **Custom Patterns**: Define custom code generation patterns

### Getting Started

1. Configure repository paths
2. Validate configuration
3. Test with a simple requirement
4. Explore advanced features
5. Customize for your needs

For additional help and support, use the built-in help system and documentation links provided throughout the interface.

---

## Quick Reference

### Essential Commands

- `*implement <requirement-file>` - Single command implementation
- `*config show` - View current configuration
- `*config validate` - Validate configuration
- `*progress` - View current progress
- `*errors` - View recent errors
- `*help` - Get help and documentation

### Configuration Files

- `config/ads-orchestrator.yaml` - Main configuration
- `config/patterns.yaml` - Custom patterns
- `config/environments/` - Environment-specific configs

### Error Recovery

- `[R]` - Retry operation
- `[S]` - Skip and continue
- `[A]` - Abort operation
- `[H]` - Get help

### Support

- Built-in help system
- Error recovery suggestions
- Documentation links
- Configuration templates
