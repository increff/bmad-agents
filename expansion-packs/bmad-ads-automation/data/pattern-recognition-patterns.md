# Pattern Recognition Patterns and Rules

## Context-Aware Pattern Categories

### 1. ISS (Ideal Size Set) Module Patterns

#### Data Loading Pattern

```java
// CORRECT: ISS Module Data Loading
@Override
protected void runInternal(Properties properties) {
    sizeSetPropertiesMap = ObjectMaps.getMapOfObjectFromList(
        db().select(SizeSetPropertiesRow.class),
        k -> new Key(k.store, k.category, k.subcategory)
    );
}
```

#### Data Structure Pattern

```java
// CORRECT: ISS Data Structure
public class ISSData {
    public int store;
    public int attributeGroup;
    public int seq;
    public IssFlag flag;
    public double quantityPivotalPerc;
    public Set<SizeData> sizeDataList;
}
```

#### Override Pattern

```java
// CORRECT: ISS Override Pattern
public void addStoreCatPivotalTagOverride(int store, String category, PivotalTag pivotalTag) {
    if (storeCatPivotalTagOverrideMap == null) {
        storeCatPivotalTagOverrideMap = new HashMap<>();
    }
    storeCatPivotalTagOverrideMap.put(new Key(store, category), pivotalTag);
}
```

### 2. Distribution Module Patterns

#### Data Loading Pattern

```java
// CORRECT: Distribution Module Data Loading
@Override
protected void runInternal(Properties properties) {
    storeStyleMap = ObjectMaps.createStoreStyleMap(
        db().select(StoreStyleRow.class)
    );
}
```

#### Allocation Pattern

```java
// CORRECT: Distribution Allocation Pattern
public void allocateStyleToStore(StoreStyle storeStyle) {
    // Allocation logic
    storeStyleMap.put(new Key(storeStyle.store, storeStyle.style), storeStyle);
}
```

### 3. OTB (Open To Buy) Module Patterns

#### Calculation Pattern

```java
// CORRECT: OTB Calculation Pattern
public void calculateOtbBuy(OtbBuyData otbData) {
    // OTB calculation logic
    double buyQuantity = calculateBuyQuantity(otbData);
    otbData.setBuyQuantity(buyQuantity);
}
```

#### MOQ Adjustment Pattern

```java
// CORRECT: OTB MOQ Adjustment Pattern
public void adjustMoq(OtbMoqAdjustmentData adjustmentData) {
    // MOQ adjustment logic
    adjustmentData.setAdjustedMoq(calculateAdjustedMoq(adjustmentData));
}
```

### 4. Load API Patterns

#### Python Load API Pattern

```python
# CORRECT: Python Load API Pattern
class PivotalTagOverrideLoadApi(LoadApi):
    def __init__(self, parent, project, **kwargs):
        super().__init__(
            parent,
            project,
            self.PIVOTAL_TAG_OVERRIDE_MASTER_HEADER,
            ["store_code", "category"],
            **kwargs
        )

    def load(self):
        self.__load_pivotal_tag_override()
```

#### Registration Pattern

```python
# CORRECT: Load API Registration Pattern
from .PivotalTagOverrideLoadApi import PivotalTagOverrideLoadApi
```

### 5. Configuration Patterns

#### Schema Provider Pattern

```java
// CORRECT: Schema Provider Pattern
@Component
public class SchemaProvider extends AbstractSchemaProvider {
    // Schema provider implementation
}
```

#### Output Sync Pattern

```java
// CORRECT: Output Sync Pattern
@Component
public class UtilOutputSyncModule extends AbstractModule {
    private static String[] syncfiles = {
        FileName.AG_ID,
        FileName.NOOS_PARAMOUNT_SIZES,
        // ... other sync files
    };
}
```

## Anti-Pattern Detection Rules

### 1. Architecture Violations

#### ❌ WRONG: File Loading in Java Module

```java
// ANTI-PATTERN: File loading in Java module
public class ISSPivotalTagOverrideModule extends AbstractModule {
    private void loadPivotalTagOverrides() {
        PivotalTagOverrideFile overrideFile = new PivotalTagOverrideFile(overrideFilePath);
        List<PivotalTagOverrideRow> overrideRows = overrideFile.parseFile();
    }
}
```

#### ✅ CORRECT: Database Loading in Java Module

```java
// CORRECT: Database loading in Java module
public class ISSPivotalTagOverrideModule extends AbstractModule {
    @Override
    protected void runInternal(Properties properties) {
        List<PivotalTagOverrideRow> overrideRows = db().select(PivotalTagOverrideRow.class);
        // Process override rows
    }
}
```

### 2. Pattern Inconsistencies

#### ❌ WRONG: Inconsistent Naming

```java
// ANTI-PATTERN: Inconsistent naming
public class issData {  // Should be ISSData
    public int Store;   // Should be store
    public String CATEGORY; // Should be category
}
```

#### ✅ CORRECT: Consistent Naming

```java
// CORRECT: Consistent naming
public class ISSData {
    public int store;
    public String category;
}
```

### 3. Missing Registration Patterns

#### ❌ WRONG: Missing Load API Registration

```python
# ANTI-PATTERN: Load API not registered in __init__.py
class NewLoadApi(LoadApi):
    pass
# Missing: from .NewLoadApi import NewLoadApi
```

#### ✅ CORRECT: Proper Load API Registration

```python
# CORRECT: Load API properly registered
from .NewLoadApi import NewLoadApi
```

### 4. Configuration Anti-Patterns

#### ❌ WRONG: Missing Schema Registration

```java
// ANTI-PATTERN: New input not registered in SchemaProvider
public class NewInputRow {
    // New input class
}
// Missing: Registration in SchemaProvider
```

#### ✅ CORRECT: Proper Schema Registration

```java
// CORRECT: New input registered in SchemaProvider
// In SchemaProvider.java:
import com.increff.irisx.file.input.NewInputFile;
// Registration in schema provider
```

## Pattern Recognition Rules

### 1. Context Detection Rules

#### ISS Context Detection

- **Keywords**: "ideal size", "size set", "size calculation", "size override"
- **Data Patterns**: Store-category level data, size-based calculations
- **Module Patterns**: ISS-specific data structures and methods

#### Distribution Context Detection

- **Keywords**: "distribution", "allocation", "store distribution", "sku distribution"
- **Data Patterns**: SKU-level distribution, store-SKU allocation
- **Module Patterns**: Distribution-specific allocation logic

#### OTB Context Detection

- **Keywords**: "buying", "procurement", "open to buy", "otb", "order width", "order depth"
- **Data Patterns**: Buying calculations, procurement logic
- **Module Patterns**: OTB-specific calculation methods

### 2. Pattern Validation Rules

#### Data Loading Validation

- **Java Modules**: Must use `db().select()` pattern
- **Python APIs**: Must handle file loading and database insertion
- **No Cross-Contamination**: Java modules cannot handle files, Python APIs cannot use `db().select()`

#### Registration Validation

- **Load APIs**: Must be registered in `__init__.py` files
- **Inputs**: Must be registered in SchemaProvider and Filename
- **Outputs**: Must be registered in Util Output Sync Module and Output CAAS JSON

#### Configuration Validation

- **Input JSON**: All inputs must be in input JSON configuration
- **Output JSON**: All outputs must be in output JSON configuration
- **Environment Configs**: Must handle dev/staging/prod configurations

### 3. Pattern Evolution Rules

#### Learning from Success

- **Successful Implementations**: Extract patterns from successful implementations
- **Pattern Refinement**: Refine patterns based on new successful cases
- **Pattern Validation**: Validate patterns against multiple implementations

#### Anti-Pattern Learning

- **Failed Implementations**: Learn from failed implementations
- **Common Mistakes**: Identify and prevent common mistakes
- **Pattern Conflicts**: Detect and resolve pattern conflicts

### 4. Pattern Recommendation Rules

#### Context-Based Recommendations

- **Module-Specific**: Recommend patterns specific to module context
- **Business-Specific**: Recommend patterns based on business logic
- **Performance-Based**: Recommend patterns based on performance requirements

#### Best Practice Recommendations

- **Proven Patterns**: Recommend proven and tested patterns
- **Performance Patterns**: Recommend high-performance patterns
- **Maintainable Patterns**: Recommend maintainable and readable patterns

## Pattern Recognition Success Metrics

### 1. Accuracy Metrics

- **Pattern Detection Accuracy**: Percentage of correctly detected patterns
- **Context Recognition Accuracy**: Percentage of correctly recognized contexts
- **Anti-Pattern Detection Rate**: Percentage of anti-patterns correctly detected

### 2. Performance Metrics

- **Pattern Recognition Speed**: Time taken to recognize patterns
- **Pattern Validation Speed**: Time taken to validate patterns
- **Recommendation Speed**: Time taken to provide recommendations

### 3. Learning Metrics

- **Pattern Evolution Rate**: Rate of pattern improvement over time
- **Success Rate Improvement**: Improvement in implementation success rate
- **Error Reduction Rate**: Reduction in implementation errors over time
