# Environment Management Task

## Overview
This task handles environment-specific operations for ARYA, including environment switching, validation, and branch management for Phoenix and Reliance environments.

## Task Responsibilities
- Environment selection and validation
- Environment-specific branch management
- Repository synchronization with environment branches
- Environment compliance checking
- Cross-repository environment coordination

## Environment Configurations

### Phoenix Environment
- **Algorithm Repository (irisx-algo)**: `master-adidas-reliance-prod`
- **MFP Repository (ms-mfp)**: `release-pheonix`
- **Configuration Repository (irisx-config)**: `master-adidas-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-pheonix-uploads`

### Reliance Environment
- **Algorithm Repository (irisx-algo)**: `master-ril`
- **MFP Repository (ms-mfp)**: `release-ril`
- **Configuration Repository (irisx-config)**: `master-ril`
- **LoadAPIs Repository (ms-loadapis)**: `caas-ril-uploads`

## Task Operations

### Environment Switching
1. **Validate Current State**: Check current repository states and branches
2. **Environment Selection**: Switch to specified environment (Phoenix/Reliance)
3. **Branch Switching**: Switch all repositories to correct environment branches
4. **Validation**: Verify successful environment switch
5. **Synchronization**: Sync with remote repositories if needed

### Environment Validation
1. **Configuration Check**: Validate environment configuration
2. **Branch Verification**: Verify all repositories are on correct branches
3. **Access Validation**: Validate repository access and permissions
4. **Dependency Check**: Check environment-specific dependencies
5. **Compliance Verification**: Verify environment compliance

### Repository Synchronization
1. **Remote Check**: Check remote repository status
2. **Branch Alignment**: Align local branches with remote branches
3. **Conflict Resolution**: Resolve any branch conflicts
4. **Update Verification**: Verify successful synchronization
5. **Status Reporting**: Report synchronization status

## Implementation Steps

### Step 1: Environment Detection
```bash
# Detect current environment
current_env = get_current_environment()
target_env = get_target_environment()

# Validate environment transition
validate_environment_transition(current_env, target_env)
```

### Step 2: Repository State Analysis
```bash
# Check repository states
algo_state = check_repository_state("irisx-algo")
mfp_state = check_repository_state("ms-mfp")
config_state = check_repository_state("irisx-config")
loadapis_state = check_repository_state("ms-loadapis")

# Validate repository access
validate_repository_access(all_repositories)
```

### Step 3: Branch Management
```bash
# Switch to environment branches
switch_to_branch("irisx-algo", get_environment_branch("irisx-algo", target_env))
switch_to_branch("ms-mfp", get_environment_branch("ms-mfp", target_env))
switch_to_branch("irisx-config", get_environment_branch("irisx-config", target_env))
switch_to_branch("ms-loadapis", get_environment_branch("ms-loadapis", target_env))

# Verify branch switches
verify_branch_alignment(target_env)
```

### Step 4: Synchronization
```bash
# Sync with remote repositories
sync_with_remote("irisx-algo")
sync_with_remote("ms-mfp")
sync_with_remote("irisx-config")
sync_with_remote("ms-loadapis")

# Validate synchronization
validate_synchronization_status()
```

### Step 5: Validation and Reporting
```bash
# Validate environment setup
validate_environment_compliance(target_env)

# Generate environment report
generate_environment_report(target_env)

# Update configuration
update_environment_configuration(target_env)
```

## Error Handling

### Environment Errors
- **Invalid Environment**: Handle invalid environment selection gracefully
- **Branch Access Issues**: Provide clear error messages and resolution steps
- **Permission Issues**: Handle repository permission problems
- **Network Issues**: Handle network connectivity problems

### Repository Errors
- **Branch Not Found**: Handle missing branches with fallback options
- **Merge Conflicts**: Provide conflict resolution guidance
- **Uncommitted Changes**: Handle uncommitted changes appropriately
- **Remote Sync Issues**: Handle remote synchronization problems

### Recovery Procedures
- **Rollback Environment**: Rollback to previous environment on failure
- **Branch Recovery**: Recover from branch switching failures
- **State Restoration**: Restore repository states on errors
- **Manual Intervention**: Provide clear manual intervention steps

## Validation Criteria

### Environment Validation
- [ ] Environment configuration is valid
- [ ] All repositories are accessible
- [ ] Target branches exist and are accessible
- [ ] Environment-specific dependencies are met
- [ ] Cross-repository consistency is maintained

### Branch Validation
- [ ] All repositories are on correct environment branches
- [ ] Branches are synchronized with remote repositories
- [ ] No uncommitted changes conflict with environment switch
- [ ] Branch permissions are appropriate
- [ ] Cross-repository branch alignment is correct

### Operational Validation
- [ ] Environment switch completed successfully
- [ ] All repositories are in clean state
- [ ] Environment compliance is verified
- [ ] Configuration is updated correctly
- [ ] Status reporting is accurate

## Success Criteria
- **Environment Accuracy**: 100% correct environment branch alignment
- **Repository Consistency**: All repositories aligned with environment
- **Error Handling**: Graceful handling of all error scenarios
- **Recovery Capability**: Successful recovery from all failure modes
- **Validation Completeness**: Comprehensive validation of environment state

## Integration Points
- **ARYA Main Orchestrator**: Reports environment status and changes
- **MFP Pattern Expert**: Coordinates MFP-specific environment requirements
- **Configuration Pattern Expert**: Coordinates configuration environment requirements
- **Algorithm Pattern Expert**: Coordinates algorithm environment requirements

## Usage Examples

### Switch to Phoenix Environment
```
*switch-environment phoenix
*validate-environment
*switch-to-base-branches
```

### Switch to Reliance Environment
```
*switch-environment reliance
*validate-environment
*switch-to-base-branches
```

### Validate Current Environment
```
*validate-environment
*status
```

## Dependencies
- **Git**: For repository operations and branch management
- **Repository Access**: Access to all three repositories
- **Network Connectivity**: For remote repository synchronization
- **Environment Configuration**: Valid environment configuration settings
- **ARYA Configuration**: Proper ARYA configuration and setup
