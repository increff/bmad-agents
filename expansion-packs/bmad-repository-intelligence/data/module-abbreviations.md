# Module Abbreviations and Meanings

## Overview

This document contains all module abbreviations found in the irisx-algo repository to help VIRAT agent correctly identify which modules to modify based on requirement keywords.

## Module Abbreviations

### Core Business Modules

| Abbreviation | Full Name                      | Purpose                             | Key Classes                                           |
| ------------ | ------------------------------ | ----------------------------------- | ----------------------------------------------------- |
| **ISS**      | Ideal Size Set                 | Ideal size calculations and tagging | `ISSTaggingModule`, `ISSData`, `ISSModuleData`        |
| **OTB**      | Open To Buy                    | Buying and procurement calculations | `OtbHelper`, `OtbDataInputModule`, `OtbOutputModule`  |
| **EOSS**     | End of Season Sale             | End-of-season sale calculations     | `EossAllocationModule`, `EossComputeRevenueModule`    |
| **BI**       | Business Intelligence          | Business intelligence and reporting | `BiHelper`, `BiLoadModule`, `BiMetadata`              |
| **AP**       | Attribute Planning             | Attribute planning and output       | `OdApOutputModule`                                    |
| **MFP**      | Merchandise Financial Planning | Financial planning calculations     | `MfpPrepareBaseDataModule`                            |
| **NOOS**     | New Out of Stock               | New out-of-stock analysis           | `NoosBestsellerComputeModule`, `NoosBsOverrideModule` |

### Allocation and Distribution Modules

| Abbreviation            | Full Name             | Purpose                 | Key Classes                                            |
| ----------------------- | --------------------- | ----------------------- | ------------------------------------------------------ |
| **Distribution**        | Distribution          | Main distribution logic | `DistributionAllocationModule`, `BaseDistributionData` |
| **Depletion**           | Depletion             | Depletion calculations  | Depletion-related modules                              |
| **Reallocation**        | Reallocation          | Reallocation logic      | Reallocation modules                                   |
| **StoryWiseAllocation** | Story Wise Allocation | Story-based allocation  | Story allocation modules                               |
| **StoryWiseDisplay**    | Story Wise Display    | Story-based display     | Story display modules                                  |

### Inventory and Buying Modules

| Abbreviation          | Full Name          | Purpose                   | Key Classes                                             |
| --------------------- | ------------------ | ------------------------- | ------------------------------------------------------- |
| **OW**                | Order Width        | Order width calculations  | `OwBuyWidthAdjustmentModule`, `OwData`                  |
| **OD**                | Order Depth        | Order depth calculations  | `OdAspCalculationModule`, `OdDataHelper`                |
| **GAP**               | Gap Analysis       | Gap analysis calculations | `NoosGapAnalysisModule`, `DenormalisedGapOutputsHelper` |
| **InventoryCreation** | Inventory Creation | Inventory creation logic  | Inventory creation modules                              |
| **Reordering**        | Reordering         | Reordering logic          | Reordering modules                                      |

### Planning and Optimization Modules

| Abbreviation            | Full Name             | Purpose                          | Key Classes                 |
| ----------------------- | --------------------- | -------------------------------- | --------------------------- |
| **PlanogramCreation**   | Planogram Creation    | Planogram creation logic         | Planogram creation modules  |
| **PriceBucketCreation** | Price Bucket Creation | Price bucket creation            | Price bucket modules        |
| **DepthSuggestion**     | Depth Suggestion      | Depth suggestion logic           | Depth suggestion modules    |
| **DynamicDiscounting**  | Dynamic Discounting   | Dynamic discounting calculations | Dynamic discounting modules |

### Utility and Support Modules

| Abbreviation   | Full Name       | Purpose          | Key Classes             |
| -------------- | --------------- | ---------------- | ----------------------- |
| **Validation** | Validation      | Data validation  | Validation modules      |
| **Util**       | Utilities       | Common utilities | Utility classes         |
| **Impact**     | Impact Analysis | Impact analysis  | Impact analysis modules |

## Requirement Keyword Mapping

### Size and Ideal Size Related

- **Keywords**: "ideal size", "size set", "size calculation", "size override"
- **Module**: **ISS** (Ideal Size Set)
- **Files**: `ISSTaggingModule.java`, `ISSData.java`, `ISSModuleData.java`

### Distribution Related

- **Keywords**: "distribution", "allocation", "store distribution", "sku distribution"
- **Module**: **Distribution**
- **Files**: `DistributionAllocationModule.java`, `BaseDistributionData.java`

### Buying and Procurement Related

- **Keywords**: "buying", "procurement", "open to buy", "otb", "order width", "order depth"
- **Modules**: **OTB**, **OW**, **OD**
- **Files**: `OtbHelper.java`, `OwBuyWidthAdjustmentModule.java`, `OdAspCalculationModule.java`

### Sale and Pricing Related

- **Keywords**: "end of season", "eoss", "sale", "discount", "pricing"
- **Modules**: **EOSS**, **DynamicDiscounting**, **PriceBucketCreation**
- **Files**: `EossAllocationModule.java`, Dynamic discounting modules

### Inventory Related

- **Keywords**: "inventory", "stock", "reorder", "gap analysis"
- **Modules**: **InventoryCreation**, **Reordering**, **GAP**
- **Files**: Inventory creation modules, `NoosGapAnalysisModule.java`

### Business Intelligence Related

- **Keywords**: "reporting", "analytics", "business intelligence", "bi"
- **Module**: **BI**
- **Files**: `BiHelper.java`, `BiLoadModule.java`

## Module Identification Rules

### 1. Primary Keyword Matching

- Look for exact module name matches in requirements
- Check for common abbreviations (ISS, OTB, EOSS, etc.)

### 2. Context-Based Identification

- "Ideal size" → ISS module
- "Store category" + "size" → ISS module
- "Distribution" → Distribution module
- "Buying" or "procurement" → OTB module
- "End of season" → EOSS module

### 3. Compound Requirements

- If requirement mentions multiple concepts, identify primary module
- Example: "Pivotal tag override in ideal size" → ISS module (not distribution)

### 4. Data Structure Mapping

- Store-level data → ISS, Distribution, OTB
- Category-level data → ISS, Distribution
- SKU-level data → Distribution, OTB
- Style-level data → OTB, EOSS

## Common Patterns

### ISS Module Pattern

```java
// ISS modules typically handle:
- Store category level calculations
- Ideal size set computations
- Size-based overrides
- Attribute group calculations
```

### Distribution Module Pattern

```java
// Distribution modules typically handle:
- SKU-level distribution
- Store-SKU allocation
- Distribution calculations
- Allocation logic
```

### OTB Module Pattern

```java
// OTB modules typically handle:
- Buying calculations
- Procurement logic
- Order width/depth
- MOQ adjustments
```

## Usage in VIRAT Agent

When analyzing requirements, VIRAT should:

1. **Extract Keywords**: Identify key terms from requirement text
2. **Map to Modules**: Use this mapping to identify correct modules
3. **Validate Context**: Ensure the identified module makes sense for the requirement
4. **Check Dependencies**: Identify if multiple modules are affected

### Example Analysis

**Requirement**: "ADD PIVOTAL TAG OVERRIDE IN IDEAL SIZE AT STORE CAT LEVEL"

**Keywords**: "pivotal tag", "override", "ideal size", "store cat level"
**Primary Module**: **ISS** (Ideal Size Set)
**Reasoning**:

- "Ideal size" → ISS module
- "Store cat level" → ISS handles store-category level data
- "Override" → ISS supports override mechanisms

**Correct Implementation**: Modify ISS module files, not distribution module files.
