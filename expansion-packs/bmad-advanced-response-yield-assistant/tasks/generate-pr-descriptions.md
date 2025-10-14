# Generate PR Descriptions Task

## Overview
This task automatically generates comprehensive pull request descriptions for ARYA implementations across multiple repositories with environment-specific context (Phoenix/Reliance).

## Task Responsibilities
- Generate environment-aware PR descriptions for all affected repositories
- Create repository-specific PR content with implementation details
- Include cross-repository integration information
- Provide PR labels, review checklists, and next steps
- Maintain consistency across multi-repository PRs

## Environment-Specific PR Generation

### Phoenix Environment PR Generation
- **Base Branches**: 
  - irisx-algo: `master-adidas-reliance-prod`
  - ms-mfp: `release-pheonix`
  - irisx-config: `master-adidas-ril`
  - ms-loadapis: `caas-pheonix-uploads`
- **Context**: Phoenix-specific business rules and validation
- **Labels**: `environment:phoenix`, `phoenix-deployment`
- **Notes**: Emphasize Phoenix environment compliance

### Reliance Environment PR Generation
- **Base Branches**:
  - irisx-algo: `master-ril`
  - ms-mfp: `release-ril`
  - irisx-config: `master-ril`
  - ms-loadapis: `caas-ril-uploads`
- **Context**: Reliance-specific business rules and validation
- **Labels**: `environment:reliance`, `reliance-deployment`
- **Notes**: Emphasize Reliance environment compliance

## PR Description Structure

### For Each Repository

#### 1. Header Section
```markdown
# {Environment} | {Requirement ID}: {Title}

**Repository**: {Repository Name}
**Environment**: {Phoenix/Reliance}
**Base Branch**: {Base Branch Name}
**Feature Branch**: {Feature Branch Name}
```

#### 2. Description Section
- Clear explanation of what the PR implements
- Environment-specific context
- Business requirement reference

#### 3. Changes Section
- **New Files/Classes**: List of newly created components
- **Modified Files/Classes**: List of modified components with change summary
- **Business Logic**: Key business logic changes
- **Integration Points**: Cross-repository integration changes

#### 4. Environment Context Section
- Environment label (Phoenix/Reliance)
- Base and target branches
- Environment-specific rules applied
- Environment compliance notes

#### 5. Features Section
- List of implemented features
- Environment-specific feature notes
- Cross-repository feature integration

#### 6. Testing Section
```markdown
- ✅ All existing tests pass
- ✅ New functionality tests pass
- ✅ Environment-specific validation complete
- ✅ Cross-repository integration tested
- ✅ No regressions detected
```

#### 7. Cross-Repository Impact Section
- **Algorithm Integration**: Algorithm repository dependencies
- **MFP Integration**: MFP repository dependencies
- **Configuration Dependencies**: Configuration repository dependencies
- **LoadAPIs Dependencies**: LoadAPIs repository dependencies

#### 8. Review Checklist Section
Environment-specific and repository-specific review items

## Implementation Process

### Phase 1: Gather Implementation Details
1. **Requirement Analysis**: Extract requirement ID, title, and description
2. **Repository Analysis**: Identify all affected repositories
3. **Environment Detection**: Determine target environment (Phoenix/Reliance)
4. **Change Analysis**: Analyze all changes made across repositories
5. **Branch Information**: Collect branch names and commit information

### Phase 2: Generate Repository-Specific PRs

#### For irisx-algo Repository
1. **Extract Java Changes**: Identify new/modified Java classes
2. **Business Logic Summary**: Summarize business logic changes
3. **Validation Changes**: Document validation rule changes
4. **Integration Points**: Identify MFP and Config integration points
5. **Generate PR Description**: Use algorithm template

#### For ms-mfp Repository
1. **Extract Python Changes**: Identify new/modified Python modules
2. **Forecasting Logic**: Summarize forecasting algorithm changes
3. **Route Changes**: Document API route changes
4. **Service Changes**: Document service layer changes
5. **Generate PR Description**: Use MFP template

#### For irisx-config Repository
1. **Extract SQL Views**: Identify new/modified SQL views
2. **Template Changes**: Document TSV template changes
3. **JSON Config Changes**: Document JSON configuration changes
4. **Export Definitions**: Document export definition changes
5. **Generate PR Description**: Use configuration template

#### For ms-loadapis Repository
1. **Extract Python Changes**: Identify new/modified LoadAPIs modules
2. **Upload Processing**: Document upload processing changes
3. **Data Validation**: Document data validation logic changes
4. **API Changes**: Document API endpoint changes
5. **Generate PR Description**: Use LoadAPIs template

### Phase 3: Generate Implementation Summary
1. **Overall Status**: Create implementation status summary
2. **Repository Table**: Generate repository status table with all branches
3. **Cross-Repository Links**: Link related PRs across repositories
4. **Next Steps**: Provide clear next steps for PR creation and review
5. **Environment Notes**: Include environment-specific deployment notes

### Phase 4: Apply PR Metadata

#### Labels
- Environment labels: `environment:phoenix` or `environment:reliance`
- Repository labels: `repository:algorithm`, `repository:mfp`, etc.
- Type labels: `type:feature`, `type:enhancement`, etc.
- Workflow labels: `workflow:wssi-mfp`, `workflow:wssi-otb`, etc.

#### Reviewers
- Assign appropriate reviewers based on repository and environment
- Include cross-repository reviewers for integration changes

#### Milestones
- Link to relevant project milestones
- Include environment-specific deployment milestones

### Phase 5: Create PR Documentation File
1. **Create PR File**: Create `PULL_REQUEST_DESCRIPTIONS.md` in workspace
2. **Include All Repositories**: Add PR description for each repository
3. **Add Implementation Summary**: Include overall implementation status
4. **Add Next Steps**: Provide clear instructions for PR creation
5. **Environment Validation**: Include environment-specific validation notes

## PR Description Template Variables

### Common Variables
- `{environment}`: Phoenix or Reliance
- `{requirement_id}`: Requirement identifier
- `{requirement_title}`: Requirement title
- `{requirement_description}`: Detailed requirement description
- `{base_branch}`: Environment-specific base branch
- `{feature_branch}`: Created feature branch name
- `{commit_count}`: Number of commits in branch

### Repository-Specific Variables

#### Algorithm Repository
- `{class_name}`: Java class name
- `{business_logic}`: Business logic summary
- `{validation_rules}`: Validation rule changes
- `{algo_integration_details}`: Algorithm integration details

#### MFP Repository
- `{module_name}`: Python module name
- `{route_path}`: API route path
- `{service_name}`: Service class name
- `{forecasting_logic}`: Forecasting algorithm details

#### Configuration Repository
- `{view_name}`: SQL view name
- `{template_name}`: TSV template name
- `{config_file}`: JSON configuration file name
- `{config_changes}`: Configuration change summary

#### LoadAPIs Repository
- `{loadapis_module}`: LoadAPIs module name
- `{upload_processor}`: Upload processor name
- `{data_validation}`: Data validation logic details

## Output Format

### File: PULL_REQUEST_DESCRIPTIONS.md

```markdown
# Pull Request Descriptions for {Requirement Title}

## Implementation Environment: {Phoenix/Reliance}

---

## 1. irisx-algo Pull Request

### Title:
**{Environment} | {Requirement ID}: {Algorithm Repository Implementation}**

### Description:
{Generated description}

### Changes:
{Generated changes list}

### Environment Context:
{Environment-specific context}

### Features:
{Feature list}

### Testing:
{Testing checklist}

### Cross-Repository Impact:
{Integration details}

---

## 2. ms-mfp Pull Request

### Title:
**{Environment} | {Requirement ID}: {MFP Repository Implementation}**

{Similar structure as above}

---

## 3. irisx-config Pull Request

### Title:
**{Environment} | {Requirement ID}: {Configuration Repository Implementation}**

{Similar structure as above}

---

## 4. ms-loadapis Pull Request

### Title:
**{Environment} | {Requirement ID}: {LoadAPIs Repository Implementation}**

{Similar structure as above}

---

## Implementation Summary

### Requirement:
**"{Requirement Title}"**

### Environment: {Phoenix/Reliance}

### Status: ✅ COMPLETE

### Key Achievements:
- ✅ Environment-specific implementation
- ✅ Cross-repository integration
- ✅ Comprehensive test coverage
- ✅ All repositories updated consistently

### Repository Status:

| Repository    | Branch                                    | Environment | Status   | Commits |
| ------------- | ----------------------------------------- | ----------- | -------- | ------- |
| irisx-algo    | `feature/{requirement-id}-{title}`        | {Env}       | ✅ Ready | N       |
| ms-mfp        | `feature/{requirement-id}-{title}`        | {Env}       | ✅ Ready | N       |
| irisx-config  | `feature/{requirement-id}-{title}`        | {Env}       | ✅ Ready | N       |
| ms-loadapis   | `feature/{requirement-id}-{title}`        | {Env}       | ✅ Ready | N       |

### Next Steps:

1. **Push Feature Branches**:
   ```bash
   cd /path/to/irisx-algo && git push origin feature/{requirement-id}-{title}
   cd /path/to/ms-mfp && git push origin feature/{requirement-id}-{title}
   cd /path/to/irisx-config && git push origin feature/{requirement-id}-{title}
   cd /path/to/ms-loadapis && git push origin feature/{requirement-id}-{title}
   ```

2. **Create Pull Requests**: Use the descriptions above for each repository

3. **Link Related PRs**: Cross-reference PRs in descriptions

4. **Environment-Specific Review**: 
   - Ensure {Environment}-specific validation
   - Verify environment compliance
   - Test with {Environment} data sources

5. **Merge Strategy**:
   - Merge to {Environment} base branches
   - Deploy to {Environment} environment
   - Validate in {Environment} staging
```

## Integration with ARYA Workflow

### Automatic Generation
- Triggered after successful implementation
- Generated before commit finalization
- Updated with each implementation change

### Command Integration
```bash
# Generate PR descriptions
*generate-pr-descriptions

# Generate for specific requirement
*generate-pr-descriptions requirement-document.md

# Generate for specific repositories
*generate-pr-descriptions --repositories irisx-algo,ms-mfp

# Generate for specific environment
*generate-pr-descriptions --environment phoenix
```

## Quality Assurance

### PR Description Validation
- [ ] All affected repositories included
- [ ] Environment context clearly stated
- [ ] Base branches correct for environment
- [ ] Feature branches consistent across repositories
- [ ] Changes accurately documented
- [ ] Cross-repository impacts identified
- [ ] Testing checklist complete
- [ ] Review checklist included
- [ ] Next steps clearly outlined

### Environment-Specific Validation
- [ ] Environment label correct
- [ ] Base branch matches environment
- [ ] Environment-specific rules documented
- [ ] Environment compliance noted
- [ ] Environment-specific testing mentioned

### Cross-Repository Validation
- [ ] All repository integrations documented
- [ ] Related PRs can be easily linked
- [ ] Dependency information clear
- [ ] Integration points identified
- [ ] Data flow documented

## Success Criteria

### Technical Success
- [ ] PR descriptions generated for all affected repositories
- [ ] Environment-specific context included
- [ ] Cross-repository integration documented
- [ ] All template variables populated correctly
- [ ] PR descriptions follow consistent format

### Usability Success
- [ ] PR descriptions are clear and comprehensive
- [ ] Reviewers can easily understand changes
- [ ] Next steps are actionable
- [ ] Environment context is obvious
- [ ] Related PRs are easy to find

### Process Success
- [ ] PR descriptions generated automatically
- [ ] Manual editing minimized
- [ ] Consistent format across repositories
- [ ] Integration with ARYA workflow seamless
- [ ] Documentation maintained in workspace

## Error Handling

### Missing Information
- Prompt for missing requirement details
- Use default values for optional fields
- Warn about incomplete PR descriptions

### Environment Mismatches
- Validate environment consistency across repositories
- Warn about base branch mismatches
- Suggest correct environment configuration

### Repository Issues
- Handle cases where repository is not affected
- Skip repositories with no changes
- Document skipped repositories in summary

## Dependencies
- **ARYA Configuration**: Proper ARYA setup and repository paths
- **Git Operations**: Successful branch creation and commits
- **Implementation Results**: Complete implementation details
- **Environment Configuration**: Valid environment setup
- **Template System**: Access to PR description templates

## Notes
- PR descriptions are generated but not automatically pushed
- Manual review recommended before creating actual PRs
- Environment-specific validation is critical
- Cross-repository PR coordination is essential
- Generated file should be version controlled for reference

