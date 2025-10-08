# Repository Structure Reference

## Overview

This document provides a comprehensive reference of all three repository structures to avoid repeated crawling and enable efficient requirement analysis and implementation.

## Repository Paths Configuration

```bash
# Get repository paths from configuration
REPO_PATH=$(grep "irisx-algo:" expansion-packs/bmad-ads-automation/config.yaml | cut -d'"' -f2)
LOADAPI_PATH=$(grep "ms-loadapis-ril-final:" expansion-packs/bmad-ads-automation/config.yaml | cut -d'"' -f2)
CONFIG_PATH=$(grep "irisx-config:" expansion-packs/bmad-ads-automation/config.yaml | cut -d'"' -f2)
```

## irisx-algo Repository Structure

### Core Module Structure

```
$REPO_PATH/src/main/java/com/increff/irisx/
├── module/                    # Core business logic modules (59 files)
│   ├── distribution/          # Distribution allocation logic (23 files)
│   ├── distributionCommons/  # Shared distribution components
│   ├── iss/                  # Ideal Size Set module (11 files)
│   ├── otb/                  # Open To Buy module (10 files)
│   ├── eoss/                 # End of Season Sale module (21 files)
│   ├── bi/                   # Business Intelligence module (8 files)
│   └── [other modules]/      # Additional modules
├── file/                     # File handling classes
│   ├── input/               # Input file classes (18 directories)
│   │   ├── distribution/    # Distribution input files (22 files)
│   │   ├── iss/             # ISS input files
│   │   ├── otb/             # OTB input files
│   │   └── [other modules]/ # Additional module input files
│   └── output/              # Output file classes (22 directories)
├── row/                      # Data row classes
│   ├── input/               # Input data structures
│   └── output/              # Output data structures
├── constants/               # Application constants
├── helper/                  # Utility classes
├── provider/                # Service providers (SchemaProvider.java)
└── util/                    # Utility classes
```

### Key Module Files

- **Distribution**: `DistributionAllocationModule.java`, `DistributionHelper.java`, `DistributionIterationRunner.java`
- **ISS**: `ISSTaggingModule.java`, `ISSData.java`, `ISSModuleData.java`
- **OTB**: `OtbHelper.java`, `OtbDataInputModule.java`
- **File Classes**: `DistributionStoreFile.java`, `ExclusionFile.java`, `InclusionFile.java`
- **SchemaProvider**: `provider/SchemaProvider.java` (NOT in constants!)

## ms-loadapis-ril-final Repository Structure

### LoadAPI Structure

```
$LOADAPI_PATH/
E├── loadapi/                     # Load API implementations (28 directories)
│   ├── common/                  # Base classes and utilities
│   │   ├── abstract_loadapi.py  # Base LoadAPI class
│   │   └── [utilities]/         # Common utilities
│   ├── distribution/            # Distribution-specific load APIs (25+ files)
│   │   ├── DistributionStoreLoadApi.py
│   │   ├── DistributionChannelStyleOverrideLoadApi.py
│   │   ├── ExclusionLoadApi.py
│   │   ├── InclusionsLoadApi.py
│   │   └── [other distribution APIs]
│   ├── iss/                     # ISS-specific load APIs
│   ├── otb/                     # OTB-specific load APIs
│   ├── eoss/                    # EOSS-specific load APIs
│   ├── bi/                      # BI-specific load APIs
│   └── [other modules]/         # Additional module APIs
├── commons/                     # Common utilities
└── main.py                      # Entry point
```

### Key LoadAPI Files

- **Base**: `loadapi/common/abstract_loadapi.py`
- **Distribution**: `loadapi/distribution/DistributionStoreLoadApi.py`
- **ISS**: `loadapi/iss/ISSTaggingLoadApi.py`
- **Registration**: `__init__.py` files in each module directory

## irisx-config Repository Structure

### Configuration Structure

```
$CONFIG_PATH/
├── template/                    # TSV input templates (110+ files)
│   ├── export_dist_input_store_template.tsv
│   ├── export_dist_input_exclusions_list_template.tsv
│   ├── export_dist_input_inclusions_list_template.tsv
│   └── [other templates]
├── view-creation/               # SQL view definitions (322+ files)
│   ├── child-input-input_dist_channel_style_override.sql
│   ├── child-input-input_dist_git.sql
│   ├── child-input-input_dist_max_sku_depth.sql
│   └── [other views]
├── sync/                        # Synchronization logic (159+ files)
├── export/                      # Export configurations (226+ files)
├── module_input.json            # Input configuration (250KB)
├── module_output.json           # Output configuration (20KB)
└── upload-files.json            # File upload configuration (60KB)
```

### File Naming Patterns

#### Templates (110+ files)

- **Pattern**: `export_{module}_input_{component}_template.tsv`
- **Examples**:
  - `export_dist_input_store_template.tsv`
  - `export_dist_input_exclusions_list_template.tsv`
  - `export_dist_input_inclusions_list_template.tsv`
  - `export_dist_input_max_sku_depth_template.tsv`
  - `export_iss_input_tagging_template.tsv`
  - `export_otb_input_buying_template.tsv`

#### SQL Views (319 files)

- **Input Views**: `child-input-{module}_{component}.sql`
- **Output Views**: `child-output-{module}_{component}.sql`
- **Examples**:
  - `child-input-a_aop.sql`
  - `child-output-a_ag_id.sql`
  - `child-input-dist_store.sql`

#### Sync Operations (156 files)

- **Pattern**: `{module}_{component}.sql`
- **Examples**:
  - `a_ag_id.sql`
  - `dist_store.sql`
  - `iss_tagging.sql`

#### Export Operations (223 files)

- **Pattern**: `export_{module}_{type}_{component}.sql`
- **Examples**:
  - `export_dist_input_store.sql`
  - `export_iss_output_tagging.sql`
  - `export_otb_output_buying.sql`

## Module Abbreviations Reference

### Primary Modules

- **AG**: Attribute Groups
- **BI**: Business Intelligence
- **DISC**: Discounting
- **DIST**: Distribution
- **A**: Allocation (general)
- **AP**: Allocation Planning
- **DEP**: Depletion
- **EOSS**: End of Season Sale
- **OTB**: Open To Buy
- **ISS**: Ideal Size Set
- **TRANSACTIONAL**: Transactional data

### Module to Component Mapping

- **ISS**: `iss_tagging`, `iss_sizing`, `iss_override`
- **DIST**: `dist_store`, `dist_sku`, `dist_allocation`
- **OTB**: `otb_buying`, `otb_procurement`, `otb_planning`
- **EOSS**: `eoss_pricing`, `eoss_sale`, `eoss_clearance`
- **BI**: `bi_reporting`, `bi_analytics`, `bi_metrics`

## Quick Reference Commands

### Module Discovery

```bash
# List all modules in irisx-algo
ls $REPO_PATH/src/main/java/com/increff/irisx/module/

# List all LoadAPIs
ls $LOADAPI_PATH/loadapi/

# Count files in irisx-config
ls $CONFIG_PATH/template/ | wc -l      # 108 templates
ls $CONFIG_PATH/view-creation/ | wc -l # 319 views
ls $CONFIG_PATH/sync/ | wc -l          # 156 sync files
ls $CONFIG_PATH/export/ | wc -l        # 223 export files
```

### Pattern Matching

```bash
# Find templates by module
ls $CONFIG_PATH/template/ | grep "export_{MODULE}_"

# Find views by module
ls $CONFIG_PATH/view-creation/ | grep "child-input-{MODULE}_"
ls $CONFIG_PATH/view-creation/ | grep "child-output-{MODULE}_"

# Find sync files by module
ls $CONFIG_PATH/sync/ | grep "{MODULE}_"

# Find export files by module
ls $CONFIG_PATH/export/ | grep "export_{MODULE}_"
```

## Implementation Guidelines

### For New Requirements

1. **Identify Module**: Use module abbreviations reference
2. **Check Existing Files**: Use pattern matching to find related files
3. **Follow Naming Conventions**: Use established patterns for new files
4. **Update Configurations**: Update JSON configs with new entries
5. **Create All Required Files**: Templates, views, sync, export files

### File Creation Checklist

- [ ] TSV template in `template/` directory
- [ ] Input SQL view in `view-creation/` directory
- [ ] Output SQL view in `view-creation/` directory
- [ ] Sync file in `sync/` directory
- [ ] Export file in `export/` directory
- [ ] Update `module_input.json`
- [ ] Update `module_output.json`
- [ ] Update `upload-files.json`

## Success Criteria

- [ ] **No Hardcoded Paths**: All paths use configuration variables
- [ ] **No Repeated Crawling**: Structure reference used instead of crawling
- [ ] **Pattern Compliance**: All files follow established naming patterns
- [ ] **Complete Coverage**: All required files created for each requirement
- [ ] **Configuration Consistency**: All JSON configs updated consistently
