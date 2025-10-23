# 🌐 ENVIRONMENT MANAGEMENT GUIDE

## EXECUTIVE SUMMARY

This guide provides comprehensive information on managing Phoenix and Reliance environments in ARYA, including base branch management, workflow differentiation, and environment-specific patterns.

---

## 📊 ENVIRONMENT OVERVIEW

### **Phoenix Environment**

**Purpose**: WSSI to MFP transformation workflows

**Key Features**:
- WSSI data analysis and standardization
- MFP view generation (overall, channel, category, store, combined)
- MFP snapshot creation and management
- LoadAPIs integration with caas-pheonix-uploads
- Phoenix-specific business rules and constraints

**Base Branches**:
- **Algorithm Repository**: `master-adidas-reliance-prod`
- **MFP Repository**: `release-pheonix`
- **Configuration Repository**: `master-adidas-ril`
- **LoadAPIs Repository**: `caas-pheonix-uploads`

### **Reliance Environment**

**Purpose**: WSSI snapshot lifecycle to OTB submission workflows

**Key Features**:
- WSSI snapshot creation with KPI calculations
- Stage management (NEW → DRAFT → APPROVED → SUBMITTED)
- OTB code generation and submission
- LoadAPIs integration with caas-ril-uploads
- Reliance-specific business rules and constraints

**Base Branches**:
- **Algorithm Repository**: `master-ril`
- **MFP Repository**: `release-ril`
- **Configuration Repository**: `master-ril`
- **LoadAPIs Repository**: `caas-ril-uploads`

---

## 🔄 ENVIRONMENT OPERATIONS

### **1. Environment Verification**

#### **Command**:
```bash
*verify-environment
```

#### **Purpose**:
Verify current environment configuration before any operations

#### **Output**:
- Current environment (Phoenix or Reliance)
- Repository paths validation
- Base branch configuration
- Environment-specific validation results

#### **Example Output**:
```
✅ Environment Verification Complete
🌐 Current Environment: Phoenix
📂 Repository Paths:
  - Algorithm: /Users/username/irisx-algo
  - MFP: /Users/username/ms-mfp
  - Config: /Users/username/irisx-config
  - LoadAPIs: /Users/username/ms-loadapis
🌿 Base Branches:
  - Algorithm: master-adidas-reliance-prod
  - MFP: release-pheonix
  - Config: master-adidas-ril
  - LoadAPIs: caas-pheonix-uploads
```

### **2. Environment Switching**

#### **Command**:
```bash
*switch-environment phoenix
*switch-environment reliance
```

#### **Purpose**:
Switch between Phoenix and Reliance environments

#### **Actions**:
1. Update environment configuration
2. Update base branch mappings
3. Verify repository access
4. Update workflow patterns

#### **Example**:
```bash
# Switch to Phoenix environment
*switch-environment phoenix

# Verify the switch
*verify-environment

# Output:
# ✅ Environment switched to Phoenix
# ✅ Base branches updated
# ✅ Repository access verified
```

### **3. Base Branch Management**

#### **Command**:
```bash
*switch-to-base-branches
```

#### **Purpose**:
Switch all repositories to correct environment-specific base branches

#### **Actions**:
1. **Phoenix Environment**:
   - Switch irisx-algo to `master-adidas-reliance-prod`
   - Switch ms-mfp to `release-pheonix`
   - Switch irisx-config to `master-adidas-ril`
   - Switch ms-loadapis to `caas-pheonix-uploads`

2. **Reliance Environment**:
   - Switch irisx-algo to `master-ril`
   - Switch ms-mfp to `release-ril`
   - Switch irisx-config to `master-ril`
   - Switch ms-loadapis to `caas-ril-uploads`

#### **Example**:
```bash
*switch-to-base-branches

# Output:
# ✅ Switching to Phoenix base branches...
# ✅ irisx-algo: master-adidas-reliance-prod
# ✅ ms-mfp: release-pheonix
# ✅ irisx-config: master-adidas-ril
# ✅ ms-loadapis: caas-pheonix-uploads
# ✅ All repositories on correct base branches
```

### **4. Repository State Verification**

#### **Command**:
```bash
*verify-repository-state
```

#### **Purpose**:
Verify all repositories are on correct branches and clean

#### **Output**:
- Branch verification for each repository
- Working directory status
- Remote connectivity status
- Any uncommitted changes

---

## 🎯 ENVIRONMENT-SPECIFIC WORKFLOWS

### **Phoenix Environment Workflows**

#### **1. WSSI-MFP Workflow**

**Purpose**: Transform WSSI data to MFP format for Phoenix environment

**Command**:
```bash
*wssi-mfp-workflow requirement-document.md
```

**Phases**:
1. **LoadAPIs Data Loading**: Load data from ms-loadapis (caas-pheonix-uploads)
2. **WSSI Analysis**: Analyze WSSI views and data structures
3. **MFP Pattern Recognition**: Identify MFP patterns and requirements
4. **Cross-Repository Analysis**: Analyze all four repositories
5. **Transformation Planning**: Plan WSSI to MFP transformation
6. **Implementation Execution**: Implement MFP views and snapshots
7. **Quality Assurance**: Validate complete workflow

**Specialized Commands**:
```bash
*analyze-wssi-requirements      # Analyze WSSI requirements
*standardize-wssi-data          # Standardize WSSI data
*generate-mfp-views             # Generate MFP views
*create-mfp-snapshots           # Create MFP snapshots
*validate-wssi-mfp-flow         # Validate WSSI-MFP flow
*phoenix-wssi-compliance        # Validate Phoenix compliance
```

#### **2. Phoenix-Specific Operations**

**LoadAPIs Integration**:
- Use `caas-pheonix-uploads` branch
- Load Phoenix-specific data sources
- Apply Phoenix upload processing rules

**MFP View Generation**:
- Generate overall MFP view
- Generate channel-specific views
- Generate category-specific views
- Generate store-specific views
- Generate combined views (channel-category, store-category, etc.)

**MFP Snapshot Management**:
- Create Phoenix-specific snapshots
- Apply Phoenix business rules
- Validate Phoenix constraints

**Phoenix Business Rules**:
- Phoenix-specific KPI calculations
- Phoenix-specific aggregation logic
- Phoenix-specific validation rules
- Phoenix-specific export formats

### **Reliance Environment Workflows**

#### **1. WSSI-OTB Workflow**

**Purpose**: Manage WSSI snapshot lifecycle and OTB submission for Reliance environment

**Command**:
```bash
*wssi-otb-workflow requirement-document.md
```

**Phases**:
1. **LoadAPIs Data Loading**: Load data from ms-loadapis (caas-ril-uploads)
2. **WSSI Snapshot Creation**: Create WSSI snapshots with data preparation
3. **KPI Processing**: Calculate KPIs (MRP, COGS, margins, ASP, discounts)
4. **Stage Management**: Manage stage transitions (NEW → DRAFT → APPROVED → SUBMITTED)
5. **OTB Code Generation**: Generate OTB codes with budget validity
6. **Pipeline Submission**: Submit OTB values to ETL pipeline
7. **Quality Assurance**: Validate complete workflow

**Specialized Commands**:
```bash
*create-wssi-snapshot           # Create WSSI snapshot
*calculate-wssi-kpis            # Calculate KPIs
*manage-snapshot-stages         # Manage stage transitions
*generate-otb-codes             # Generate OTB codes
*submit-otb-values              # Submit OTB values
*validate-wssi-otb-flow         # Validate WSSI-OTB flow
*reliance-wssi-compliance       # Validate Reliance compliance
```

#### **2. Reliance-Specific Operations**

**LoadAPIs Integration**:
- Use `caas-ril-uploads` branch
- Load Reliance-specific data sources
- Apply Reliance upload processing rules

**WSSI Snapshot Lifecycle**:
- Create snapshot with data preparation
- Calculate KPIs (MRP, COGS, margins, ASP, discount percentages, cover duration)
- Manage stage transitions:
  - **NEW**: Initial snapshot creation
  - **DRAFT**: User editing and modifications
  - **APPROVED**: Management approval
  - **SUBMITTED**: Submitted to OTB pipeline

**OTB Code Generation**:
- Generate unique OTB codes using business rules
- Calculate budget validity periods
- Apply Reliance-specific OTB rules

**Audit Tracking**:
- Track all user operations
- Track stage changes
- Maintain comprehensive audit trail

**Reliance Business Rules**:
- Reliance-specific KPI calculations
- Reliance-specific stage management
- Reliance-specific validation rules
- Reliance-specific OTB submission format

---

## 📋 ENVIRONMENT COMPARISON MATRIX

| **Aspect** | **Phoenix Environment** | **Reliance Environment** |
| ---------- | ----------------------- | ------------------------ |
| **Primary Workflow** | WSSI to MFP Transformation | WSSI Snapshot Lifecycle to OTB |
| **Algorithm Branch** | `master-adidas-reliance-prod` | `master-ril` |
| **MFP Branch** | `release-pheonix` | `release-ril` |
| **Config Branch** | `master-adidas-ril` | `master-ril` |
| **LoadAPIs Branch** | `caas-pheonix-uploads` | `caas-ril-uploads` |
| **Key Features** | MFP views, MFP snapshots | WSSI snapshots, KPI calculations, Stage management, OTB submission |
| **Data Source** | WSSI views and data | WSSI snapshots and lifecycle data |
| **Output** | MFP views and snapshots | OTB codes and pipeline submissions |
| **Business Rules** | Phoenix-specific | Reliance-specific |
| **Validation** | Phoenix compliance | Reliance compliance |

---

## 🔍 ENVIRONMENT DETECTION

### **Automatic Detection**

ARYA automatically detects environment based on:

**1. Requirement Keywords**:
- **Phoenix Keywords**: "WSSI-MFP", "MFP view", "MFP snapshot", "Phoenix", "transform WSSI"
- **Reliance Keywords**: "WSSI-OTB", "WSSI snapshot", "KPI calculation", "stage management", "OTB submission", "Reliance"

**2. Workflow Patterns**:
- **WSSI-MFP Pattern**: Indicates Phoenix environment
- **WSSI-OTB Pattern**: Indicates Reliance environment

**3. Repository Branches**:
- **Phoenix Branches**: Detected from repository state
- **Reliance Branches**: Detected from repository state

### **Manual Specification**

Users can explicitly specify environment:

```bash
# Specify Phoenix environment
*implement REQ-1234.md --environment phoenix

# Specify Reliance environment
*implement REQ-1234.md --environment reliance
```

---

## ⚠️ ENVIRONMENT VALIDATION

### **Pre-Execution Validation**

Before any workflow execution, ARYA validates:

1. **Environment Configuration**: Correct environment selected
2. **Repository Branches**: All repositories on correct base branches
3. **Repository Access**: All repositories accessible
4. **Working Directory**: All working directories clean
5. **Environment Compatibility**: Workflow compatible with environment

### **Example Validation Output**:

```bash
*validate-environment

✅ Environment Validation Complete
🌐 Environment: Phoenix
✅ Environment Configuration: Valid
✅ Repository Branches:
  - Algorithm: ✅ master-adidas-reliance-prod
  - MFP: ✅ release-pheonix
  - Config: ✅ master-adidas-ril
  - LoadAPIs: ✅ caas-pheonix-uploads
✅ Repository Access: All accessible
✅ Working Directories: All clean
✅ Workflow Compatibility: WSSI-MFP workflow compatible with Phoenix
```

### **Validation Failures**

If validation fails, ARYA provides:

1. **Error Message**: Clear description of validation failure
2. **Corrective Action**: Guidance on how to fix the issue
3. **Automatic Correction**: Option to automatically correct (if possible)

**Example Failure**:

```bash
❌ Environment Validation Failed
🌐 Environment: Phoenix
❌ Repository Branch Mismatch:
  - MFP Repository is on 'release-ril' but should be on 'release-pheonix'

🔧 Corrective Action:
Run: *switch-to-base-branches to fix this issue

Or manually: cd /path/to/ms-mfp && git checkout release-pheonix
```

---

## 🚀 BEST PRACTICES

### **1. Always Verify Environment First**

```bash
# Before any operation, verify environment
*verify-environment

# Then proceed with workflow
*implement requirement-document.md
```

### **2. Switch to Base Branches Before Analysis**

```bash
# Switch to correct base branches
*switch-to-base-branches

# Then proceed with analysis
*analyze requirement-document.md
```

### **3. Use Environment-Specific Commands**

**Phoenix Environment**:
```bash
# Use Phoenix-specific commands
*wssi-mfp-workflow requirement.md
*generate-mfp-views
*phoenix-wssi-compliance
```

**Reliance Environment**:
```bash
# Use Reliance-specific commands
*wssi-otb-workflow requirement.md
*calculate-wssi-kpis
*reliance-wssi-compliance
```

### **4. Validate Environment Compatibility**

```bash
# Before executing workflow, validate compatibility
*validate-environment

# Check workflow compatibility
*validate-workflow-compatibility requirement-document.md
```

### **5. Document Environment Context**

All implementation documentation should include:
- Current environment (Phoenix or Reliance)
- Base branches used
- Environment-specific patterns applied
- Environment-specific business rules implemented

---

## 🎯 TROUBLESHOOTING

### **Issue 1: Wrong Environment Detected**

**Problem**: ARYA detects wrong environment from requirement
**Solution**:
```bash
# Explicitly specify environment
*implement REQ-1234.md --environment phoenix
```

### **Issue 2: Branch Mismatch**

**Problem**: Repositories on wrong branches for environment
**Solution**:
```bash
# Switch to correct base branches
*switch-to-base-branches

# Verify repository state
*verify-repository-state
```

### **Issue 3: Workflow Incompatibility**

**Problem**: Workflow not compatible with current environment
**Solution**:
```bash
# Validate workflow compatibility first
*validate-workflow-compatibility requirement-document.md

# Switch environment if needed
*switch-environment phoenix
```

### **Issue 4: Environment Configuration Error**

**Problem**: Environment configuration is invalid
**Solution**:
```bash
# Verify environment configuration
*verify-environment

# Fix configuration issues
*fix-environment-configuration
```

---

## ✅ SUCCESS CRITERIA

### **Environment Management Success**

- [x] **Environment Verified**: Current environment correctly identified
- [x] **Base Branches Correct**: All repositories on correct environment-specific branches
- [x] **Repository Access**: All repositories accessible and clean
- [x] **Workflow Compatible**: Workflow compatible with environment
- [x] **Validation Passed**: All environment validations passed

### **Implementation Success**

- [x] **Environment Patterns Applied**: Environment-specific patterns used
- [x] **Business Rules Implemented**: Environment-specific business rules applied
- [x] **Validation Completed**: Environment-specific validation completed
- [x] **Documentation Updated**: Environment context documented

---

## 🎉 CONCLUSION

This comprehensive guide provides:

1. **Complete Environment Overview**: Phoenix vs Reliance differentiation
2. **Environment Operations**: All environment management commands
3. **Workflow Guidance**: Environment-specific workflow guidance
4. **Validation Framework**: Comprehensive validation framework
5. **Best Practices**: Best practices for environment management
6. **Troubleshooting**: Common issues and solutions

**Key Achievement**: AI agents and users now have complete guidance on environment management, enabling seamless Phoenix/Reliance differentiation and workflow execution.

**Result**: The system now has complete environment intelligence with proper detection, validation, and workflow execution for both Phoenix and Reliance environments.

**Status**: ✅ **ENVIRONMENT MANAGEMENT GUIDE COMPLETE**

