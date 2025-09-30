# VIRAT - ADS Orchestrator Enhanced - Troubleshooting Guide

## Overview

This troubleshooting guide helps you resolve common issues with the Enhanced ADS Orchestrator. Each issue includes symptoms, causes, and step-by-step solutions.

## Table of Contents

1. [Repository Access Issues](#repository-access-issues)
2. [Configuration Problems](#configuration-problems)
3. [Implementation Failures](#implementation-failures)
4. [Progress Tracking Issues](#progress-tracking-issues)
5. [Error Recovery Problems](#error-recovery-problems)
6. [Performance Issues](#performance-issues)
7. [System Integration Issues](#system-integration-issues)

---

## Repository Access Issues

### Issue: Repository Access Denied

**Symptoms:**
```
❌ Error: Repository Access Denied
=================================
Context: Attempting to create feature branch in irisx-algo
Cause: Insufficient permissions for branch creation
Impact: Cannot proceed with implementation
```

**Causes:**
- Insufficient repository permissions
- Invalid authentication credentials
- Incorrect repository URL
- Network connectivity issues

**Solutions:**

1. **Check Repository Permissions**
   ```bash
   # Test repository access manually
   git ls-remote https://github.com/your-org/irisx-algo.git
   ```

2. **Verify Authentication**
   ```bash
   # Check git credentials
   git config --list | grep credential
   
   # Test authentication
   git clone https://github.com/your-org/irisx-algo.git test-clone
   ```

3. **Update Repository URL**
   ```
   *config set repository-path irisx-algo /correct/path/to/irisx-algo
   *config validate
   ```

4. **Check Network Connectivity**
   ```bash
   # Test network access
   ping github.com
   curl -I https://github.com
   ```

### Issue: Repository Not Found

**Symptoms:**
```
❌ Error: Repository Not Found
=============================
Context: Loading repository configuration
Cause: Repository path does not exist
Impact: Cannot access repository
```

**Solutions:**

1. **Verify Repository Path**
   ```bash
   # Check if path exists
   ls -la /path/to/your/repository
   ```

2. **Update Configuration**
   ```
   *config set repository-path irisx-algo /correct/path/to/irisx-algo
   *config validate
   ```

3. **Clone Repository**
   ```bash
   # Clone repository if missing
   git clone https://github.com/your-org/irisx-algo.git /path/to/irisx-algo
   ```

---

## Configuration Problems

### Issue: Invalid Configuration

**Symptoms:**
```
❌ Error: Invalid Configuration
=============================
File: config/ads-orchestrator.yaml
Context: Loading configuration
Cause: Invalid YAML syntax at line 15
Impact: Cannot load system configuration
```

**Solutions:**

1. **Check YAML Syntax**
   ```bash
   # Validate YAML syntax
   python -c "import yaml; yaml.safe_load(open('config/ads-orchestrator.yaml'))"
   ```

2. **Use Configuration Template**
   ```
   *config generate-template
   # Copy template and customize
   ```

3. **Validate Configuration**
   ```
   *config validate
   ```

4. **Check Required Fields**
   ```yaml
   # Ensure all required fields are present
   repositories:
     irisx-algo:
       path: "/path/to/repo"  # Required
       type: "java"           # Required
       branch: "main"         # Required
       access: "git"          # Required
   ```

### Issue: Environment Configuration Error

**Symptoms:**
```
❌ Error: Environment Configuration Error
========================================
Environment: staging
Cause: Repository path not found in staging environment
Impact: Cannot switch to staging environment
```

**Solutions:**

1. **Check Environment Configuration**
   ```yaml
   environments:
     staging:
       repositories:
         irisx-algo:
           path: "/staging/irisx-algo"  # Must exist
   ```

2. **Create Environment Directories**
   ```bash
   # Create staging environment directories
   mkdir -p /staging/irisx-algo
   mkdir -p /staging/ms-loadapis-ril-final
   mkdir -p /staging/irisx-config
   ```

3. **Validate Environment**
   ```
   *config set environment staging
   *config validate
   ```

---

## Implementation Failures

### Issue: Code Generation Failed

**Symptoms:**
```
❌ Error: Code Generation Failed
==============================
Context: Generating Java class for new module
Cause: Template not found for module type 'CustomModule'
Impact: Cannot generate required code files
```

**Solutions:**

1. **Check Template Files**
   ```bash
   # Verify template exists
   ls -la templates/java/AllocationModule.java.template
   ```

2. **Update Template Path**
   ```yaml
   patterns:
     java:
       template_path: "templates/java"  # Must exist
   ```

3. **Create Missing Template**
   ```bash
   # Create template file
   mkdir -p templates/java
   cp existing-template.java templates/java/AllocationModule.java.template
   ```

4. **Use Alternative Template**
   ```
   # Retry with different template
   [R] Retry with different template
   ```

### Issue: Validation Failed

**Symptoms:**
```
❌ Error: Validation Failed
==========================
Context: Validating generated code
Cause: Generated code does not meet validation requirements
Impact: Implementation may not work correctly
```

**Solutions:**

1. **Review Validation Rules**
   ```yaml
   patterns:
     allocation_module:
       validation_rules:
         - "must_extend_AbstractAllocationModule"
         - "must_have_Component_annotation"
   ```

2. **Check Generated Code**
   ```bash
   # Review generated code
   cat generated/AllocationModule.java
   ```

3. **Update Template**
   ```java
   // Ensure template includes required elements
   @Component("{moduleName}Allocation")
   public class {ModuleName}AllocationModule extends AbstractAllocationModule {
       // Implementation
   }
   ```

4. **Skip Validation (if appropriate)**
   ```
   *implement --skip-validation requirement-123.md
   ```

---

## Progress Tracking Issues

### Issue: Progress Not Displayed

**Symptoms:**
- No progress indicators shown
- No status updates during operations
- Operations appear to hang

**Solutions:**

1. **Check Progress Display Setting**
   ```yaml
   preferences:
     progress_display: true  # Must be true
   ```

2. **Enable Verbose Output**
   ```
   *implement --verbose requirement-123.md
   ```

3. **Check Logging Configuration**
   ```yaml
   preferences:
     log_level: "info"  # or "debug"
   ```

4. **Restart Orchestrator**
   ```
   # Exit and restart
   *exit
   @virat
   ```

### Issue: Progress Stuck

**Symptoms:**
- Progress bar doesn't advance
- Status shows same operation for extended time
- No error messages displayed

**Solutions:**

1. **Check System Resources**
   ```bash
   # Check disk space
   df -h
   
   # Check memory usage
   free -h
   ```

2. **Monitor Operation Logs**
   ```
   *status
   *history
   ```

3. **Cancel and Retry**
   ```
   # Cancel current operation
   [Ctrl+C]
   
   # Retry with different parameters
   *implement --skip-validation requirement-123.md
   ```

---

## Error Recovery Problems

### Issue: Recovery Options Not Working

**Symptoms:**
- Recovery options don't respond
- Error persists after retry
- System becomes unresponsive

**Solutions:**

1. **Check Error Recovery Mode**
   ```yaml
   preferences:
     error_recovery: "interactive"  # interactive, automatic, manual
   ```

2. **Manual Recovery**
   ```yaml
   preferences:
     error_recovery: "manual"
   ```

3. **Reset Configuration**
   ```bash
   # Backup current config
   cp config/ads-orchestrator.yaml config/ads-orchestrator.yaml.backup
   
   # Generate new config
   *config generate-template
   ```

4. **Restart System**
   ```bash
   # Exit orchestrator
   *exit
   
   # Restart
   @virat
   ```

### Issue: Error History Not Available

**Symptoms:**
- `*errors` command shows no results
- Error history is empty
- Previous errors not recorded

**Solutions:**

1. **Check Logging Configuration**
   ```yaml
   preferences:
     log_level: "info"  # or "debug"
   ```

2. **Enable Error Logging**
   ```yaml
   preferences:
     error_logging: true
   ```

3. **Check Log File Permissions**
   ```bash
   # Check log directory permissions
   ls -la logs/
   chmod 755 logs/
   ```

4. **Clear and Reset Logs**
   ```bash
   # Clear old logs
   rm -f logs/*.log
   
   # Restart orchestrator
   @virat
   ```

---

## Performance Issues

### Issue: Slow Repository Operations

**Symptoms:**
- Repository crawling takes too long
- Operations timeout
- System becomes unresponsive

**Solutions:**

1. **Optimize Repository Access**
   ```yaml
   repositories:
     irisx-algo:
       access: "local"  # Use local access when possible
   ```

2. **Reduce Repository Scope**
   ```yaml
   patterns:
     java:
       module_path: "src/main/java/com/increff/irisx/module"  # Specific path
   ```

3. **Increase Timeout**
   ```yaml
   preferences:
     operation_timeout: 120  # Increase timeout in minutes
   ```

4. **Use Caching**
   ```yaml
   preferences:
     enable_caching: true
     cache_duration: 3600  # Cache for 1 hour
   ```

### Issue: Memory Usage High

**Symptoms:**
- System runs out of memory
- Operations fail with memory errors
- System becomes slow

**Solutions:**

1. **Reduce Concurrent Operations**
   ```yaml
   preferences:
     max_concurrent_operations: 1
   ```

2. **Optimize Repository Scanning**
   ```yaml
   patterns:
     java:
       scan_depth: 3  # Limit scan depth
   ```

3. **Clear Cache**
   ```bash
   # Clear cache directory
   rm -rf cache/*
   ```

4. **Restart System**
   ```bash
   # Exit and restart
   *exit
   @virat
   ```

---

## System Integration Issues

### Issue: Git Integration Problems

**Symptoms:**
- Git commands fail
- Branch operations don't work
- Repository state issues

**Solutions:**

1. **Check Git Configuration**
   ```bash
   # Check git config
   git config --list
   
   # Check git version
   git --version
   ```

2. **Verify Repository State**
   ```bash
   # Check repository status
   git status
   
   # Check branch information
   git branch -a
   ```

3. **Reset Repository State**
   ```bash
   # Clean repository
   git clean -fd
   git reset --hard HEAD
   ```

4. **Update Git Credentials**
   ```bash
   # Update credentials
   git config --global credential.helper store
   ```

### Issue: IDE Integration Problems

**Symptoms:**
- IDE doesn't recognize changes
- Files not updated in IDE
- IDE shows errors

**Solutions:**

1. **Refresh IDE**
   - Refresh project in IDE
   - Reload workspace
   - Restart IDE

2. **Check File Permissions**
   ```bash
   # Check file permissions
   ls -la generated/
   chmod 644 generated/*
   ```

3. **Sync with IDE**
   ```bash
   # Force file system sync
   touch generated/*
   ```

4. **Update IDE Configuration**
   - Add generated files to IDE project
   - Update IDE file watchers
   - Configure IDE to monitor changes

---

## General Troubleshooting Steps

### Step 1: Check System Status
```
*status
*config validate
*errors
```

### Step 2: Review Configuration
```
*config show
*config validate
```

### Step 3: Check Logs
```
*history
*errors
```

### Step 4: Test Basic Operations
```
*help
*config show
*config validate
```

### Step 5: Reset if Necessary
```bash
# Backup configuration
cp config/ads-orchestrator.yaml config/ads-orchestrator.yaml.backup

# Generate new configuration
*config generate-template

# Restart orchestrator
*exit
@virat
```

---

## Getting Additional Help

### Built-in Help
```
*help
*help implement
*help config
*help errors
```

### Error Recovery
- Follow recovery options in error messages
- Use `[H]` option for additional help
- Check documentation links in error messages

### Community Support
- Check project documentation
- Review issue tracker
- Contact development team

### System Information
```
*status
*config show
*errors
```

---

## Prevention Tips

1. **Regular Maintenance**
   - Validate configuration regularly
   - Check repository access periodically
   - Monitor system resources

2. **Backup Configuration**
   - Keep configuration files in version control
   - Backup before making changes
   - Document configuration changes

3. **Monitor System Health**
   - Check error history regularly
   - Monitor performance metrics
   - Update system components

4. **Test Changes**
   - Test configuration changes
   - Validate new patterns
   - Test in development environment first

---

## Conclusion

This troubleshooting guide covers the most common issues with the Enhanced ADS Orchestrator. For additional help, use the built-in help system, check the error recovery options, and consult the full user guide.

Remember to:
- Check system status regularly
- Validate configuration before use
- Monitor error history
- Keep system updated
- Backup important configurations
