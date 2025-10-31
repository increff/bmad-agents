# Migration Analysis Report

**Migration ID**: migration-1761772732111
**Repository**: irisx-algo
**Source Branch**: caas-release
**Target Branch**: master-ril
**Date**: 2025-10-29T21:19:02.576Z

## Commits to Migrate (308)

### 81475e702
**Category**: Code Change
**Message**: considered only enabled wh

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ce8c84914
**Category**: Bug Fix
**Message**: Fix warehouse stock calculation issues across depletion and reordering modules

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 47eea62ef
**Category**: Bug Fix
**Message**: fix

**Files Changed**:
- src/main/java/com/increff/irisx/helper/DepletionOutputsModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 79a746cde
**Category**: Code Change
**Message**: req-1077

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c750c1543
**Category**: Bug Fix
**Message**: RST-797: Fix warehouse stock calculation in reordering algorithm

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4810a99dc
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1284ba4cc
**Category**: Bug Fix
**Message**: fix: correct stock check condition in AbstractDiscountComputationModule

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a2f0a4e9d
**Category**: Bug Fix
**Message**: fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c1c935e78
**Category**: Code Change
**Message**: Made changes that will consider StoreCatAttribs in fillrate only if they are not present already and present in plano

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### e50db825b
**Category**: Configuration Update
**Message**: Revert "Merged in feature/multi-period-ros-depletion (pull request #2300)"

**Files Changed**:
- data/input/noos_export.properties
- docs/multi-period-ros-configuration.md
- src/main/java/com/increff/irisx/util/MathUtil.java

**Business Logic**: Implements business logic changes as described in commit message

---
### d373c1205
**Category**: Code Change
**Message**: req-1075

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 2522f1507
**Category**: Feature Addition
**Message**: REQ-1075: Add iteration flag column to export_dist_wh_output table

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### bb1b22a34
**Category**: Code Change
**Message**: req-1077

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3412984d6
**Category**: Code Change
**Message**: parallel

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6ca0f591b
**Category**: Bug Fix
**Message**: fix MAX discount factor

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6d0d41fc2
**Category**: Bug Fix
**Message**: fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 98eaec5c0
**Category**: Bug Fix
**Message**: fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8e72a598b
**Category**: Code Change
**Message**: Revert "Store level planogram (pull request #2279)"

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8ac3482c6
**Category**: Code Change
**Message**: Made changes such that it includes planogram data of category that are not in stores for fill Rate Report

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 7fac03ea3
**Category**: Bug Fix
**Message**: Fix MRP and Selling Price calculation in exportdiscountrow

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c89827238
**Category**: Code Change
**Message**: modified changes

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 7d4b43694
**Category**: Code Change
**Message**: handle blanket channel

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 958eca206
**Category**: Bug Fix
**Message**: fix

**Files Changed**:
- src/main/java/com/increff/irisx/row/input/master/StoreRow.java

**Business Logic**: Implements business logic changes as described in commit message

---
### a202c8281
**Category**: Feature Addition
**Message**: ADDED OUTPUT

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 57d973732
**Category**: Bug Fix
**Message**: FIXES

**Files Changed**:
- src/main/java/com/increff/irisx/util/MathUtil.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 1d2418089
**Category**: Code Change
**Message**: renamed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ea6aa5bb4
**Category**: Code Change
**Message**: Revert "Made changes such that it includes planogram data of category that are not in stores for fill Rate Report (pull request #2289)"

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c0022c094
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:
- src/main/java/com/increff/irisx/module/reordering/ReorderingModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 95fe883c0
**Category**: Feature Addition
**Message**: REQ-1077: Add replenish_bottom_sellers flag to control bottom seller replenishment without pullbacks

**Files Changed**:
- src/main/java/com/increff/irisx/args/AbstractDistributionArgs.java
- src/test/resources/com/increff/irisx/file/args/algo_properties.tsv

**Business Logic**: Implements business logic changes as described in commit message

---
### 4c00655c5
**Category**: Documentation Update
**Message**: feat: Implement multi-period ROS calculation for depletion module

**Files Changed**:
- docs/multi-period-ros-configuration.md
- docs/three-period-ros-configuration.md

**Business Logic**: Implements business logic changes as described in commit message

---
### acc28d107
**Category**: Feature Addition
**Message**: Add four-period weighted average ROS calculation for OTB Depletion

**Files Changed**:
- data/input/noos_export.properties
- docs/three-period-ros-configuration.md

**Business Logic**: Implements business logic changes as described in commit message

---
### e973edafd
**Category**: Code Change
**Message**: Made changes such that it includes planogram data of category that are not in stores for fill Rate Report

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 200938083
**Category**: Feature Addition
**Message**: added properties

**Files Changed**:
- .gitignore
- src/test/resources/com/increff/irisx/config.properties

**Business Logic**: Implements business logic changes as described in commit message

---
### d540c6b7f
**Category**: Code Change
**Message**: Changed the remark DISCOUNT_CAPPED

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### e65a62546
**Category**: Code Change
**Message**: 456

**Files Changed**:
- .project

**Business Logic**: Implements business logic changes as described in commit message

---
### f9ad750db
**Category**: Code Change
**Message**: modified changes

**Files Changed**:
- src/main/java/com/increff/irisx/module/UtilOutputSyncModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### c51613add
**Category**: Feature Addition
**Message**: added ist fill rate report

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 48cd6cc19
**Category**: Code Change
**Message**: req-666

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5fd5ecedc
**Category**: Code Change
**Message**: store level planogram chnagrs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f7e02bdad
**Category**: Bug Fix
**Message**: fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0e80bed5d
**Category**: Feature Addition
**Message**: Add MOQ percentage for reorder styles and integrate style level MOQ handling

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### db4a1ae4a
**Category**: Code Change
**Message**: 456_caas

**Files Changed**:
- .project

**Business Logic**: Implements business logic changes as described in commit message

---
### 187b257da
**Category**: Bug Fix
**Message**: fix

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossOutputModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 30e9904fb
**Category**: Code Change
**Message**: store level planogram

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 223f57de8
**Category**: Code Change
**Message**: refactor

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 2c778ea41
**Category**: Code Change
**Message**: Store cat level plano changes

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4e2736697
**Category**: Code Change
**Message**: changed percentage variables to factor

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5b062278f
**Category**: Code Change
**Message**: isonline = isonline()

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 2bd061981
**Category**: Code Change
**Message**: Revert "Revert "REQUEST-597 (pull request #2257)" (pull request #2263)"

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0a1411d27
**Category**: Code Change
**Message**: Revert "REQUEST-597 (pull request #2257)"

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 42f8c704e
**Category**: Code Change
**Message**: 368

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9702dc32f
**Category**: Code Change
**Message**: 597

**Files Changed**:
- .classpath
- .settings/org.eclipse.jdt.core.prefs

**Business Logic**: Implements business logic changes as described in commit message

---
### 1f1e2946f
**Category**: Code Change
**Message**: 368

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0a07ac4f6
**Category**: Bug Fix
**Message**: bug fx

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9977f695c
**Category**: Bug Fix
**Message**: bug fx

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5c9f461f8
**Category**: Bug Fix
**Message**: bug fx

**Files Changed**:
- src/main/java/com/increff/irisx/module/ApIssGroupModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### ef646ab39
**Category**: Code Change
**Message**: printed online store ros too

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### aa3db228d
**Category**: Feature Addition
**Message**: added liq cleanup in online sales

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6771248b8
**Category**: Feature Addition
**Message**: added channel size level contri

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 29ec7ad23
**Category**: Feature Addition
**Message**: added channel size level contri

**Files Changed**:
- src/main/java/com/increff/irisx/module/ApIssGroupModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### e420a53ec
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:
- src/main/java/com/increff/irisx/row/input/master/StoreRow.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 0f169b009
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8b6ebdce1
**Category**: Feature Addition
**Message**: helper added getdepth method

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9b951d902
**Category**: Bug Fix
**Message**: fixed error

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8b33bcb7e
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ac710511c
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b75c8cffd
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ec99cc04e
**Category**: Code Change
**Message**: 368

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### cba81d6a3
**Category**: Code Change
**Message**: REQUEST-597

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ac5cd632c
**Category**: Code Change
**Message**: removed redundant log

**Files Changed**:
- src/main/java/com/increff/irisx/module/iss/ISSOutputModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 4b026933e
**Category**: Bug Fix
**Message**: request 368 conflict fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ea90f4f8f
**Category**: Code Change
**Message**: request-368

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 40584ccf7
**Category**: Code Change
**Message**: request-521

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 3affd2c0e
**Category**: Code Change
**Message**: Merged in REQUEST-537/caas-release (pull request #2240)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9f8296f80
**Category**: Code Change
**Message**: DynamicDiscountValidationModule.java change reverted

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1ebfe190d
**Category**: Dependency Update
**Message**: Automated update: Replaced lines 146-149 in src/main/java/com/increff/irisx/module/validation/DynamicDiscountValidationModule.java

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 02b76e05a
**Category**: Dependency Update
**Message**: Automated update: Replaced lines 146-149 in src/main/java/com/increff/irisx/module/validation/DynamicDiscountValidationModule.java

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### fb7caf47a
**Category**: Code Change
**Message**: Validation changed from store id to store channel+code

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ee93c7c76
**Category**: Bug Fix
**Message**: size wise bug fix

**Files Changed**:
- .classpath

**Business Logic**: Implements business logic changes as described in commit message

---
### 7e512a361
**Category**: Bug Fix
**Message**: size wise bug fix

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 66a620a7d
**Category**: Bug Fix
**Message**: size wise bug fix

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 86d9fcdf4
**Category**: Code Change
**Message**: request -456

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5766ff0a3
**Category**: Code Change
**Message**: if stock==0 discount == continue. change asked by prayushi

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 62c7e7ace
**Category**: Code Change
**Message**: if stock==0 discount == continue. change asked by prayushi

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 49dc47032
**Category**: Code Change
**Message**: if stock==0 discount == continue. change asked by prayushi

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 7ad8d4845
**Category**: Code Change
**Message**: request-521

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 1dd340a60
**Category**: Code Change
**Message**: merge resolved

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1a864f754
**Category**: Bug Fix
**Message**: fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b79de036b
**Category**: Code Change
**Message**: 368

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### e0dd1f45b
**Category**: Bug Fix
**Message**: fixes

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 22ff01168
**Category**: Dependency Update
**Message**: update ist output row and file

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a7ae90b7e
**Category**: Code Change
**Message**: temp push

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b79f3498b
**Category**: Code Change
**Message**: REQUEST-456

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossPrepareDataModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### d506fd9a4
**Category**: Bug Fix
**Message**: minor fixes

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f10270409
**Category**: Code Change
**Message**: REQUEST-456

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9c01b2403
**Category**: Code Change
**Message**: 456

**Files Changed**:
- src/main/java/com/increff/irisx/args/AbstractDistributionArgs.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 3f58e76c1
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 2964ebeb7
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4028bf7dd
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4c56deda4
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 91d8cab0c
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b274b9d22
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### e455c0228
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### cfea92d80
**Category**: Bug Fix
**Message**: issues fixed

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 47d26f1ef
**Category**: Code Change
**Message**: REQUEST-259

**Files Changed**:
- src/test/java/com/increff/irisx/file/FilesTest.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 4b7743289
**Category**: Code Change
**Message**: REQUEST-259

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 50da911fc
**Category**: Code Change
**Message**: REQUEST-446

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4d535b538
**Category**: Code Change
**Message**: REQUEST-347

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b6ff178b5
**Category**: Code Change
**Message**: request-215

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6bb30739a
**Category**: Feature Addition
**Message**: added ros in summary row

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 75c0ec3fb
**Category**: Bug Fix
**Message**: bug fix REQUEST-421

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### de5eeb83c
**Category**: Bug Fix
**Message**: Merged in REQUEST-631/validation-style-live-error (pull request #2204)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 950eec444
**Category**: Code Change
**Message**: changes for attribute2 in replenishment

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8c44402d4
**Category**: Code Change
**Message**: Changed emptyMaps into HashMaps in the following file

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 68fa13dca
**Category**: Code Change
**Message**: REQUEST-285

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a654b0f92
**Category**: Code Change
**Message**: merge conflict

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### d29ba7079
**Category**: Code Change
**Message**: merge conflict

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3effb4ab1
**Category**: Code Change
**Message**: BREACH CAT LEVEL PLANOGRAM

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0b0c97d1e
**Category**: Code Change
**Message**: iit should not b pulled back

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 725baaf6c
**Category**: Code Change
**Message**: DISCOUNT CHANGES

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 2d3b0bb70
**Category**: Code Change
**Message**: REQUEST - 352

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b45747b7f
**Category**: Code Change
**Message**: REQUEST - 352

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### efbfb3416
**Category**: Code Change
**Message**: REQUEST-344

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3bc853f96
**Category**: Code Change
**Message**: more accurate handling for sell 1 send 1

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 396dfc654
**Category**: Code Change
**Message**: conflict resolved

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8a9c5e01d
**Category**: Code Change
**Message**: REQUEST - 352

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6552d86d5
**Category**: Code Change
**Message**: Remove method getPartitioningColumns

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6de50465c
**Category**: Code Change
**Message**: Rename methods

**Files Changed**:
- src/main/java/com/increff/irisx/helper/ObjectMaps.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 52067cc98
**Category**: Feature Addition
**Message**: REQUEST-270 added attribute and attribute1

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0e6b859a8
**Category**: Code Change
**Message**: REQUEST-270

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b0f20ff63
**Category**: Code Change
**Message**: Rename methods

**Files Changed**:
- src/main/java/com/increff/irisx/helper/ObjectMaps.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 45e6e46fd
**Category**: Feature Addition
**Message**: REQUEST-270 added attribute and attribute1

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 9202942e5
**Category**: Code Change
**Message**: REQUEST-270

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8100f8bb9
**Category**: Code Change
**Message**: REQUEST-285

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c3dd85b6a
**Category**: Code Change
**Message**: Suggested alloc to be as per actual sales qty if live days ≤ min live days input for ROS calculation

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c123c6112
**Category**: Code Change
**Message**: Refactored discounting

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3afa4a91e
**Category**: Code Change
**Message**: enabled planogram absent check in core iteration

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 194d52d18
**Category**: Code Change
**Message**: Remove non-zero demand AGs before elimination

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 16300dfbc
**Category**: Code Change
**Message**: Merged in ICRD-300/ist_caas (pull request #2174)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 810b4f605
**Category**: Code Change
**Message**: Merged in ICRD-311 (pull request #2171)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5bf0ad14a
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### d4fefc54e
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.6

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 3a38d38b8
**Category**: Code Change
**Message**: Merged in OD_Price_Bucket_Validation (pull request #2167)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c3212d2ea
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### da3e829a2
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.5

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 08795a5d1
**Category**: Code Change
**Message**: Merged in REQ-434/segment_and_psa_in_ist_output (pull request #2159)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a180eaf95
**Category**: Feature Addition
**Message**: adds psa check for depth increment and adds psa benchmark in iterations

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### d1d2e95ec
**Category**: Code Change
**Message**: ICRD-300 sending NP and E when psa is meet

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### dc4fa31f0
**Category**: Code Change
**Message**: Merged in PODP-444/sizeContinuityMaster (pull request #2163)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f80ceb7cc
**Category**: Code Change
**Message**: Merged in PODP-444/sizeContinuityCheck (pull request #2162)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1518866ed
**Category**: Code Change
**Message**: placeholder changes

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 63dad7879
**Category**: Code Change
**Message**: Use parent mapping to get category

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 7bddb2ec3
**Category**: Dependency Update
**Message**: Upgrade irisx-commons

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 912321f05
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 3ea3aafe4
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.4

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 8e368c870
**Category**: Bug Fix
**Message**: Merged in fix-ist-impact (pull request #2152)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 71c50d389
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 3894dfeab
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.3

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 2339c8785
**Category**: Bug Fix
**Message**: Merged in fix-ist-impact (pull request #2150)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 35927addd
**Category**: Bug Fix
**Message**: Fix IST impact analysis

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ba592e90e
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 4d08b2a4c
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.2

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 28d8bade7
**Category**: Bug Fix
**Message**: Merged in PODP-294/disc-analysis-fix (pull request #2145)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0dc1c7a47
**Category**: Code Change
**Message**: Merged in season_type (pull request #2148)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### d033f060a
**Category**: Feature Addition
**Message**: Set store while adding new store store stories

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 342601b41
**Category**: Code Change
**Message**: forward sales capped to storeStock and whstock

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### b62410d7e
**Category**: Code Change
**Message**: parallelise ag

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java

**Business Logic**: Implements business logic changes as described in commit message

---
### fd1b67293
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### bbff27b44
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### b49f018db
**Category**: Code Change
**Message**: Merged in minimumLiveDays (pull request #2142)

**Files Changed**:
- src/main/java/com/increff/irisx/helper/View.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 11c3d2076
**Category**: Feature Addition
**Message**: Populate category for new stores

**Files Changed**:
- src/main/java/com/increff/irisx/module/iss/ISSOutputModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 1a493a8c8
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 0e0feebca
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.16

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### ce322940c
**Category**: Code Change
**Message**: Merged in PODP-160/swa (pull request #2137)

**Files Changed**:
- src/main/java/com/increff/irisx/args/SWAArgs.java

**Business Logic**: Implements business logic changes as described in commit message

---
### fd1cab4fc
**Category**: Bug Fix
**Message**: Merged in Bug_common_args_not_initiallized_in_otb_drop (pull request #2139)

**Files Changed**:
- src/main/java/com/increff/irisx/module/otb/OtbDropCalcModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### aba8e691f
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### ea974fe9f
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.15.4

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### b1ca074f9
**Category**: Code Change
**Message**: Merged in ICRD-188/revPerDay (pull request #2131)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6d5deb40f
**Category**: Code Change
**Message**: Revert "Move scaling factor to cat level"

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 7df5b82ad
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 015304b51
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.15.3

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 59ca9f22f
**Category**: Code Change
**Message**: Merged in ICRD-179/multiple_size_mapping_valdation (pull request #2129)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a41f71b13
**Category**: Code Change
**Message**: Move scaling factor to cat level

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1d9040a59
**Category**: Feature Addition
**Message**: Add category partitioning for TargetDiscountOutput

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a198364d9
**Category**: Feature Addition
**Message**: Add category to ASP output

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8d3e0ed04
**Category**: Feature Addition
**Message**: Add category to FAQ outputs

**Files Changed**:
- src/main/java/com/increff/irisx/module/od/OdOutputHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 1dd7ae291
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### cb630bdca
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.15.2

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### a6978f479
**Category**: Code Change
**Message**: Merged in MSENT-6266/TargetDiscountOutputRow (pull request #2117)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f1ad75080
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 3ac7c16ef
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.15.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### f8bc37668
**Category**: Code Change
**Message**: Merged in MSENT-6357/min_discount_flag (pull request #2125)

**Files Changed**:
- src/main/java/com/increff/irisx/args/DynamicDiscountingArgs.java

**Business Logic**: Implements business logic changes as described in commit message

---
### ec4263c29
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 9b8a149fd
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.15

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### a4197c40a
**Category**: Code Change
**Message**: Merged in REQ-39/ist_outwarding_benchmark_override (pull request #2113)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1c6749729
**Category**: Bug Fix
**Message**: Merged in bug_otb_mdo_adjustment (pull request #2127)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 25e3256c2
**Category**: Code Change
**Message**: Merged in bi_include_end_date_stock (pull request #2123)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5b279d55c
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 8f42ff55e
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.14.3

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 6404f88a4
**Category**: Code Change
**Message**: Merged in staging (pull request #2121)

**Files Changed**:
- src/main/java/com/increff/irisx/args/OtbArgs.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 3a91290a3
**Category**: Bug Fix
**Message**: Fix block size when data < 100

**Files Changed**:
- src/main/java/com/increff/irisx/module/ap/OdApOutputModule.java
- src/main/java/com/increff/irisx/module/od/OdDataPrep.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### 5060081e6
**Category**: Feature Addition
**Message**: Add attribute1 changes for reallocation

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 1e6ad9c88
**Category**: Code Change
**Message**: converts OtbDenormalizedStyleOutputFile to parquet

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 95b526f72
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### bd7b81b19
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.14.2

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 3f22eb059
**Category**: Code Change
**Message**: Merged in MSENT-6266/TargetDiscountOutputRow (pull request #2115)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### a1facb3e6
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### e74d3df00
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.14.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### c26763b67
**Category**: Code Change
**Message**: Merged in REQ-217/remove_brand_from_fill_rate_otuput (pull request #2114)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c11ac4717
**Category**: Code Change
**Message**: Merged in REQ-168/core_styles_outside_plano (pull request #2102)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### db11f13b4
**Category**: Code Change
**Message**: Initialise sales with AG

**Files Changed**:
- src/main/java/com/increff/irisx/module/iss/ISSChannelAgSizeContri.java

**Business Logic**: Implements business logic changes as described in commit message

---
### d0323b761
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 2388a3fb2
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.14

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 0149dc52d
**Category**: Code Change
**Message**: Merged in MSENT-6270/planogram_attribute (pull request #2112)

**Files Changed**:
- src/test/resources/com/increff/irisx/file/planogram.tsv

**Business Logic**: Implements business logic changes as described in commit message

---
### 5a5ec3d96
**Category**: Code Change
**Message**: Merged in MSENT-6270/planogram_attribute (pull request #2094)

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java
- src/main/java/com/increff/irisx/helper/View.java

**Business Logic**: Implements business logic changes as described in commit message

---
### ea6e7dfa8
**Category**: Code Change
**Message**: Remove reliance OTB changes

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### df31887dc
**Category**: Bug Fix
**Message**: bug fix

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 29e0eb2f5
**Category**: Bug Fix
**Message**: Fix pivotal percentage when sizes are untagged

**Files Changed**:
- src/main/java/com/increff/irisx/helper/View.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 5252b9f87
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### cbd24228f
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.13.2

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 089c1fa6d
**Category**: Code Change
**Message**: Revert "[maven-release-plugin] prepare release irisx-algo-15.13.1"

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 8fdd88d93
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.13.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### b48b22a31
**Category**: Code Change
**Message**: Merged in REQ-152/preceeding_comma_in_dist (pull request #2095)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3cef95ab1
**Category**: Code Change
**Message**: Merge optimisations

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java
- src/main/java/com/increff/irisx/helper/View.java
- src/main/java/com/increff/irisx/util/MathUtil.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 2c5746185
**Category**: Bug Fix
**Message**: Fix obtaining category from Ag

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java
- src/main/java/com/increff/irisx/helper/ObjectMaps.java
- src/main/java/com/increff/irisx/row/output/ag/AgIdRow.java
- src/test/java/com/increff/irisx/helper/ObjectMapsTest.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 2aca851f6
**Category**: Bug Fix
**Message**: Fix getCategory for child SKU

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 85cdf416a
**Category**: Feature Addition
**Message**: Add partitioning for AgId

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5cd64c116
**Category**: Bug Fix
**Message**: Fix getCategory for parent style

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 684e17a35
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### fa6ec25fe
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.13.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 5a6036827
**Category**: Bug Fix
**Message**: Merged in REQ-133/ist_bug_store_criteria (pull request #2093)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### bc70daf77
**Category**: Code Change
**Message**: Merged in gap_optimise (pull request #2081)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f9925c61f
**Category**: Code Change
**Message**: Name parition directories with

**Files Changed**:
- src/main/java/com/increff/irisx/file/output/ag/AgFile.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 21d01bcfa
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### de2aee808
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.13

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 99bd10eda
**Category**: Code Change
**Message**: Merged in staging (pull request #2090)

**Files Changed**:
- src/main/java/com/increff/irisx/helper/DepletionOutputsModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### f404ad6b8
**Category**: Feature Addition
**Message**: adds category partitioned read in keyframe, sales and end_date_stock

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 81f30d06f
**Category**: Bug Fix
**Message**: fixes date type in keyframe and end date stock

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 85734e720
**Category**: Bug Fix
**Message**: Fix casting to match schema

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### cb540af91
**Category**: Code Change
**Message**: optimised for color allocation

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 497e833e2
**Category**: Code Change
**Message**: Partition computed keyframe

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 484295b06
**Category**: Code Change
**Message**: Change transactional type to parquet

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 11dd67022
**Category**: Feature Addition
**Message**: Add category to inv computation outputs

**Files Changed**:
- src/main/java/com/increff/irisx/module/bi/BiInvComputation.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 974072951
**Category**: Feature Addition
**Message**: Add partitioning to outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ae26be08e
**Category**: Feature Addition
**Message**: Add category to reordering outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 891c50386
**Category**: Feature Addition
**Message**: Add category to style wise to size wise outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### d03c72895
**Category**: Feature Addition
**Message**: Add category to OTB outputs

**Files Changed**:
- src/main/java/com/increff/irisx/module/otb/OtbHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 594e8e1f6
**Category**: Feature Addition
**Message**: Add category to depletion outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 02bc272ae
**Category**: Feature Addition
**Message**: Add category to distribution outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 4b2efa0be
**Category**: Feature Addition
**Message**: Add category to discounting outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### e9e2a0029
**Category**: Feature Addition
**Message**: Add category to IST impact analysis outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 62d94a466
**Category**: Feature Addition
**Message**: Add category to Gap analysis outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c6ffb79fd
**Category**: Feature Addition
**Message**: Add category to OW outputs

**Files Changed**:
- src/main/java/com/increff/irisx/file/output/ow/OwLongTailFile.java
- src/main/java/com/increff/irisx/file/output/ow/OwOutputFile.java
- src/main/java/com/increff/irisx/module/ow/OwInitWidthCalc.java
- src/main/java/com/increff/irisx/module/ow/OwOutputModule.java
- src/main/java/com/increff/irisx/row/output/ow/OwLongTailRow.java
- src/main/java/com/increff/irisx/row/output/ow/OwOutputRow.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### f93de6212
**Category**: Feature Addition
**Message**: Add category to OD outputs

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 46e85d148
**Category**: Feature Addition
**Message**: Add category to ISS outputs

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Converter.java
- src/main/java/com/increff/irisx/row/output/iss/PivotalRow.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 9699c96e9
**Category**: Feature Addition
**Message**: Add category to AG outputs

**Files Changed**:
- src/main/java/com/increff/irisx/constants/GenericConstants.java
- src/main/java/com/increff/irisx/file/output/ag/AgIdFile.java
- src/main/java/com/increff/irisx/file/output/ag/AgStyleFile.java
- src/main/java/com/increff/irisx/module/noos/AgComputeModule.java
- src/main/java/com/increff/irisx/row/output/ag/AgIdRow.java
- src/main/java/com/increff/irisx/row/output/ag/AgStyleRow.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### e936a845a
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 26b769988
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.12

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 6126d8200
**Category**: Code Change
**Message**: Merged in MSENT-6286/store_sku_depth_override (pull request #2066)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 183b484ab
**Category**: Code Change
**Message**: Merged in MSENT-6269/store_stock_git_flag (pull request #2061)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 6e9863e47
**Category**: Feature Addition
**Message**: Add category to NOOS outputs

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 3f249db13
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### ca0072414
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.11.3

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### ee92a9836
**Category**: Code Change
**Message**: Revert "[maven-release-plugin] prepare release irisx-algo-15.11.1"

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 73c360a3f
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.11.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### df234be40
**Category**: Bug Fix
**Message**: Merged in MSENT-6295/dm-fix (pull request #2071)

**Files Changed**:
- src/main/java/com/increff/irisx/helper/Cache.java

**Business Logic**: Implements business logic changes as described in commit message

---
### fd400459b
**Category**: Code Change
**Message**: Merged in MSENT-6315/dmException (pull request #2080)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f77c56ff8
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### c1afe2cc3
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.11.2

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 7d306fdd2
**Category**: Bug Fix
**Message**: Merged in MSENT-6298/istColorWiseFIx (pull request #2072)

**Files Changed**:
- src/main/java/com/increff/irisx/module/distribution/IstHelper.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 0ec74f312
**Category**: Bug Fix
**Message**: Merged in store_stock_fix_output (pull request #2070)

**Files Changed**:
- src/main/java/com/increff/irisx/module/eoss/EossOutputModule.java
- src/main/java/com/increff/irisx/module/eoss/EossPrepareDataModule.java

**Business Logic**: Adds new business processing module with specific calculation logic

---
### a22b930a9
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 1d012ea74
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.11.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### fa1e719b0
**Category**: Bug Fix
**Message**: Merged in store_stock_fix_output (pull request #2069)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c2a0f23e6
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 1a4f0068c
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.11

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 073b8307b
**Category**: Dependency Update
**Message**: Update iris-commons version

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### fa93af9d3
**Category**: Feature Addition
**Message**: adds null check

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 651383752
**Category**: Bug Fix
**Message**: Merged in inv_creation_fix_partitioning (pull request #2059)

**Files Changed**:
- src/main/java/com/increff/irisx/constants/FileName.java

**Business Logic**: Implements business logic changes as described in commit message

---
### c113cb522
**Category**: Bug Fix
**Message**: Merged in inv_creation_fix_partitioning (pull request #2058)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3a2928e91
**Category**: Bug Fix
**Message**: bug fix commons sheet removal

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### f2128c9cf
**Category**: Code Change
**Message**: revert pom changes

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 980b4da54
**Category**: Code Change
**Message**: removes commons sheets

**Files Changed**:
- pom.xml
- src/main/java/com/increff/irisx/api/OutputDownloadApi.java
- src/main/java/com/increff/irisx/file/input/ap/CatQtyFile.java
- src/main/java/com/increff/irisx/file/input/ap/InputAgFile.java
- src/main/java/com/increff/irisx/file/input/ap/SizeSetQtyFile.java
- src/main/java/com/increff/irisx/file/input/bi/BiReturnsFile.java
- src/main/java/com/increff/irisx/file/input/bi/BiSalesFile.java
- src/main/java/com/increff/irisx/file/input/bi/BiSizeSetFile.java
- src/main/java/com/increff/irisx/file/input/bi/NetSalesFile.java
- src/main/java/com/increff/irisx/file/input/bi/RetailWeekFile.java
- src/main/java/com/increff/irisx/file/input/master/AopFile.java
- src/main/java/com/increff/irisx/file/input/master/InputsFile.java
- src/main/java/com/increff/irisx/file/input/master/SkuFile.java
- src/main/java/com/increff/irisx/file/input/master/StoreFile.java
- src/main/java/com/increff/irisx/file/input/master/StyleFile.java
- src/main/java/com/increff/irisx/file/input/mfp/MfpSalesFile.java
- src/main/java/com/increff/irisx/file/input/otb/LeadTimeFile.java
- src/main/java/com/increff/irisx/file/input/otb/WhInwardsFile.java
- src/main/java/com/increff/irisx/file/output/ag/AgFile.java
- src/main/java/com/increff/irisx/file/output/ag/AgIdFile.java
- src/main/java/com/increff/irisx/file/output/ag/AgStyleFile.java
- src/main/java/com/increff/irisx/file/output/ap/ApOutputFile.java
- src/main/java/com/increff/irisx/file/output/iss/PivotalFile.java
- src/main/java/com/increff/irisx/file/output/noos/CoreFile.java
- src/main/java/com/increff/irisx/file/output/noos/NoosFile.java
- src/main/java/com/increff/irisx/file/output/od/OdAspFile.java
- src/main/java/com/increff/irisx/file/output/od/OdOwWidthFile.java
- src/main/java/com/increff/irisx/file/output/ow/OwOutputFile.java
- src/main/java/com/increff/irisx/util/TsvFile.java
- src/main/java/com/increff/irisx/util/ValidationUtil.java
- src/test/java/com/increff/irisx/file/FilesTest.java
- src/test/java/com/increff/irisx/util/AbstractRegressionTest.java
- src/test/java/com/increff/irisx/util/ValidationUtilTest.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 119da5721
**Category**: Code Change
**Message**: Merged in MSENT-6228/git_store_stock_flag_in_output (pull request #2051)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3942664d9
**Category**: Code Change
**Message**: removes null check

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 89e9033f8
**Category**: Code Change
**Message**: Merged in MSENT-6179/print_size_tag_ist_store_output (pull request #2041)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ff13914f2
**Category**: Code Change
**Message**: Merged in MSENT-6238/change_cat_validation (pull request #2050)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 3a9478cb3
**Category**: Bug Fix
**Message**: fixed indentation

**Files Changed**:
- src/main/java/com/increff/irisx/provider/SchemaProvider.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 4ed2149f0
**Category**: Code Change
**Message**: filters pre stock based on store stock and git flag

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 0dec6b3b8
**Category**: Bug Fix
**Message**: fixed indentation

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c5a70f6b4
**Category**: Feature Addition
**Message**: added validations

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 5c9f2df51
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### df14a8c25
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.10

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 6b9d45aff
**Category**: Feature Addition
**Message**: Merged in MSENT-6035/add_single_double_quote (pull request #2042)

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 2ef8a2a51
**Category**: Code Change
**Message**: Merged in MSENT-6151/aop_validation_removal_in_replenishment (pull request #2038)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 76cce0de2
**Category**: Code Change
**Message**: Increasing inventory retain days from 45 to 90

**Files Changed**:
- src/main/java/com/increff/irisx/api/SyncApi.java

**Business Logic**: Implements business logic changes as described in commit message

---
### f0d5f5778
**Category**: Code Change
**Message**: Changing AbstractDataFile to AbstractTSVFile

**Files Changed**:
- pom.xml
- src/main/java/com/increff/irisx/util/TsvFile.java
- src/test/java/com/increff/irisx/file/FilesTest.java

**Business Logic**: Implements business logic changes as described in commit message

---
### 409062221
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 63e4d10e6
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.9.1

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### 21f335e4c
**Category**: Code Change
**Message**: checks for null condition

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8501d7da1
**Category**: Code Change
**Message**: [maven-release-plugin] prepare for next development iteration

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### efd866fe3
**Category**: Code Change
**Message**: [maven-release-plugin] prepare release irisx-algo-15.9

**Files Changed**:
- pom.xml

**Business Logic**: Implements business logic changes as described in commit message

---
### a49f46dbb
**Category**: Code Change
**Message**: changes rev/day formula for topseller and bottomseller identification

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### c0e396cae
**Category**: Code Change
**Message**: Merged in ist_optimisation (pull request #2029)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### ec81d57af
**Category**: Code Change
**Message**: Merged in MSENT-6050/ist_store_stock_git_flag_store_level (pull request #2025)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 622fae279
**Category**: Code Change
**Message**: Merged in MSENT-5754/PSA_benchmark (pull request #2023)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 8c5d7638f
**Category**: Code Change
**Message**: Merged in MSENT-6077/OTB_Output_Change (pull request #2027)

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---
### 05e44c557
**Category**: Code Change
**Message**: Changing , to # seperated in Noos ParamountSizesFile.java

**Files Changed**:


**Business Logic**: Implements business logic changes as described in commit message

---

## Risk Assessment


### Risk Distribution
- **Low Risk**: 2 commits (Documentation/Configuration)
- **Medium Risk**: 70 commits (Bug fixes/Dependencies)
- **High Risk**: 236 commits (New features/Code changes)

### Overall Risk Level: HIGH


## Recommendations


### Implementation Recommendations

1. **Review High-Risk Commits First**: Focus on feature additions and code changes
2. **Test Each Commit Independently**: Validate functionality after each implementation
3. **Maintain Commit Atomicity**: Keep changes focused and testable
4. **Document Adaptations**: Record any pattern changes made during migration

### Testing Strategy

1. Unit tests for each implemented change
2. Integration tests across affected modules
3. End-to-end validation in target environment
4. Performance impact assessment

