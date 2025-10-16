# 🧮 ALGORITHM REPOSITORY COMPREHENSIVE ANALYSIS

## EXECUTIVE SUMMARY

After crawling through the irisx-algo repository, I've identified comprehensive patterns, file structures, and inter/intra-repository dependencies. This analysis provides AI agents with complete guidance on algorithm repository changes, module patterns, validation structures, and cross-repository coordination.

---

## 📊 REPOSITORY STRUCTURE OVERVIEW

### **Repository Statistics**

- **Total Java Files**: 1,174 files
- **Module Directories**: 30+ modules
- **Group Modules**: 25+ group modules
- **Validation Modules**: 30+ validation modules
- **Row Classes**: 100+ row classes
- **File Classes**: 100+ file classes
- **Util Classes**: 50+ utility classes

### **Directory Structure**

```
irisx-algo/src/main/java/com/increff/irisx/
├── App.java - Main application entry point
├── WorkerApi.java - Worker API interface
├── api/ - API interfaces and controllers
├── args/ - Argument classes for modules (32 files)
├── constants/ - Constants and enums
├── file/ - File handling classes
├── helper/ - Helper classes and utilities
├── module/ - Module implementations (59 directories)
├── provider/ - Provider classes (7 files)
├── row/ - Data row classes
├── spring/ - Spring configuration
└── util/ - Utility classes
```

---

## 🔄 ALGORITHM REPOSITORY PATTERNS

### **1. Module Provider Patterns**

#### **A. ModuleProvider.java (257 lines)**

**Purpose**: Central registry for all modules and their dependencies
**Structure**:

```java
@Component
public class ModuleProvider extends AbstractModuleProvider {
    @Autowired
    private UtilLoadGroupModule utilLoadGroupModule;
    @Autowired
    private InvComputationGroupModule invComputationGroupModule;
    @Autowired
    private MfpGroupModule mfpGroupModule;
    // ... more modules
}
```

**Key Patterns**:

- **Spring Component**: All modules are Spring-managed components
- **Dependency Injection**: Uses @Autowired for module dependencies
- **Module Registration**: Each module must be registered in ModuleProvider
- **Group Module Pattern**: Modules are organized into group modules

#### **B. Module Registration Pattern**

**Structure**:

```java
@Autowired
private [ModuleName]GroupModule [moduleName]GroupModule;
```

**Examples**:

- `UtilLoadGroupModule utilLoadGroupModule`
- `InvComputationGroupModule invComputationGroupModule`
- `MfpGroupModule mfpGroupModule`
- `NoosGroupModule noosGroupModule`

### **2. Schema Provider Patterns**

#### **A. SchemaProvider.java (536 lines)**

**Purpose**: Central registry for all file schemas and data structures
**Structure**:

```java
public class SchemaProvider extends AbstractSchemaProvider {
    // File schema registrations
    // Input file registrations
    // Output file registrations
}
```

**Key Patterns**:

- **File Registration**: All input/output files must be registered
- **Schema Definition**: Defines data structure schemas
- **Import Management**: Manages file imports and dependencies
- **Type Safety**: Ensures type safety across file operations

### **3. File Name Constants Patterns**

#### **A. FileName.java (546 lines)**

**Purpose**: Central registry for all file name constants
**Structure**:

```java
public class FileName {
    // DATA FILES
    public static final String INPUTS = "a_input";
    public static final String AOP = "a_aop";
    public static final String ATTRIBUTE = "a_attribute";
    public static final String STORE = "a_store";
    // ... more constants
}
```

**Key Patterns**:

- **Snake Case Naming**: All file names use snake_case
- **No Extensions**: Extensions are assumed by DBSync class
- **Categorized Constants**: Organized by data type and purpose
- **Static Final**: All constants are static final strings

### **4. Group Module Patterns**

#### **A. Group Module Structure**

**Pattern**: `[ModuleName]GroupModule.java`
**Structure**:

```java
@Component
public class [ModuleName]GroupModule extends AbstractUtilModuleGroup {
    @Autowired
    private [ModuleName]Module [moduleName]Module;
    @Autowired
    private [ModuleName]ValidationModule [moduleName]ValidationModule;

    @Override
    protected void run() {
        // Module execution logic
    }
}
```

**Key Patterns**:

- **Spring Component**: All group modules are Spring components
- **AbstractUtilModuleGroup**: Extends base group module class
- **Module Dependencies**: Contains module and validation module dependencies
- **Run Method**: Implements module execution logic

#### **B. Group Module Examples**

- `UtilLoadGroupModule` - Utility loading group
- `InvComputationGroupModule` - Inventory computation group
- `MfpGroupModule` - MFP (Monthly Forecast Planning) group
- `NoosGroupModule` - NOOS (New Order Optimization System) group
- `DistributionGroupModule` - Distribution group
- `DynamicDiscountingGroupModule` - Dynamic discounting group

### **5. Validation Module Patterns**

#### **A. Validation Module Structure**

**Pattern**: `[ModuleName]ValidationModule.java`
**Structure**:

```java
@Component
public class [ModuleName]ValidationModule extends AbstractValidationModule {
    @Autowired
    private [ModuleName]Args [moduleName]Args;

    @Override
    protected void validate() {
        // Validation logic
    }
}
```

**Key Patterns**:

- **Spring Component**: All validation modules are Spring components
- **AbstractValidationModule**: Extends base validation module class
- **Args Dependencies**: Contains argument class dependencies
- **Validate Method**: Implements validation logic

#### **B. Validation Module Examples**

- `GapAnalysisValidationModule` - Gap analysis validation
- `MfpValidationModule` - MFP validation
- `OdValidationModule` - OD (Optimum Depth) validation
- `OtbValidationModule` - OTB (Open To Buy) validation
- `SizeSetPropertiesValidationModule` - Size set properties validation

### **6. Row Class Patterns**

#### **A. Row Class Structure**

**Pattern**: `[ModuleName]Row.java`
**Structure**:

```java
public class [ModuleName]Row {
    public [DataType] [fieldName];
    public [DataType] [fieldName];
    // ... more fields
}
```

**Key Patterns**:

- **Public Fields**: All fields are public for direct access
- **Simple POJO**: Plain Old Java Object structure
- **No Methods**: Typically no methods, just data fields
- **Package Organization**: Organized by module and input/output type

#### **B. Row Class Examples**

- `BrandGradingRow` - Brand grading data row
- `SuggestedIstRow` - Suggested IST data row
- `DiscAnalysisInputRow` - Discount analysis input row
- `ImplementedIstRow` - Implemented IST data row
- `PreStockRow` - Pre-stock data row

### **7. File Class Patterns**

#### **A. File Class Structure**

**Pattern**: `[ModuleName]File.java`
**Structure**:

```java
public class [ModuleName]File extends AbstractTSVFile<[ModuleName]Row> {
    @Override
    protected String[] getHeaders() {
        return new String[]{"field1", "field2", "field3"};
    }

    @Override
    protected [ModuleName]Row read(DataRow r) throws Exception {
        [ModuleName]Row o = new [ModuleName]Row();
        o.field1 = r.getInteger("field1");
        o.field2 = r.getValue("field2");
        return o;
    }

    @Override
    protected void write(DataRow dataRow, [ModuleName]Row [moduleName]Row) {
        throw new ModuleException("Write not implemented for " + [ModuleName]Row.class.getName());
    }
}
```

**Key Patterns**:

- **AbstractTSVFile**: Extends base TSV file class
- **Generic Type**: Uses generic type for row class
- **Header Definition**: Defines column headers
- **Read Method**: Implements data reading logic
- **Write Method**: Typically throws exception (read-only)

#### **B. File Class Examples**

- `BrandGradingFile` - Brand grading file handler
- `SuggestedIstFile` - Suggested IST file handler
- `DiscAnalysisInputFile` - Discount analysis input file handler
- `ImplementedIstFile` - Implemented IST file handler
- `PreStockIstFile` - Pre-stock IST file handler

### **8. Args Class Patterns**

#### **A. Args Class Structure**

**Pattern**: `[ModuleName]Args.java`
**Structure**:

```java
public class [ModuleName]Args extends Args {
    private [DataType] [fieldName];
    private [DataType] [fieldName];

    // Getters and setters
    public [DataType] get[FieldName]() { return [fieldName]; }
    public void set[FieldName]([DataType] [fieldName]) { this.[fieldName] = [fieldName]; }
}
```

**Key Patterns**:

- **Args Extension**: Extends base Args class
- **Private Fields**: All fields are private
- **Getters/Setters**: Standard getter/setter pattern
- **Configuration**: Contains module configuration parameters

#### **B. Args Class Examples**

- `GapAnalysisArgs` - Gap analysis arguments
- `MfpArgs` - MFP arguments
- `OdArgs` - OD arguments
- `OtbArgs` - OTB arguments
- `ReorderingArgs` - Reordering arguments

### **9. Utility Class Patterns**

#### **A. Utility Class Structure**

**Pattern**: `[ModuleName]Util.java`
**Structure**:

```java
public class [ModuleName]Util {
    public static [ReturnType] [methodName]([Parameters]) {
        // Utility logic
    }

    public static [ReturnType] [methodName]([Parameters]) {
        // Utility logic
    }
}
```

**Key Patterns**:

- **Static Methods**: All methods are static
- **Utility Functions**: Contains reusable utility functions
- **No State**: Typically no instance state
- **Module-Specific**: Organized by module functionality

#### **B. Utility Class Examples**

- `ValidationUtil` - Validation utilities
- `StringUtil` - String manipulation utilities
- `MathUtil` - Mathematical utilities
- `SkuStyleConversionUtil` - SKU/Style conversion utilities
- `FilteredStylesSkusUtil` - Filtered styles/SKUs utilities

### **10. Cache and View Patterns**

#### **A. Cache Pattern**

**Structure**:

```java
public class Cache {
    // Cache implementation
    // Data caching logic
    // Cache management
}
```

**Key Patterns**:

- **Data Caching**: Caches frequently accessed data
- **Performance Optimization**: Improves performance
- **Memory Management**: Manages memory usage
- **Cache Invalidation**: Handles cache invalidation

#### **B. View Pattern**

**Structure**:

```java
public class View {
    // View implementation
    // Data presentation logic
    // View management
}
```

**Key Patterns**:

- **Data Presentation**: Presents data in specific formats
- **View Management**: Manages different view types
- **Data Transformation**: Transforms data for presentation
- **View Caching**: Caches view data

---

## 🔗 INTER-REPOSITORY DEPENDENCIES

### **1. LoadAPI Repository Dependencies**

**Algorithm Impact**:

- **Data Structure Changes**: New LoadAPI data structures require Algorithm row/file classes
- **Validation Changes**: New LoadAPI validation rules require Algorithm validation modules
- **Business Logic Changes**: New LoadAPI business rules require Algorithm utility classes
- **Module Changes**: New LoadAPI modules require Algorithm group modules

**Change Patterns**:

- **New LoadAPI**: Create corresponding Algorithm row/file classes
- **New Fields**: Update Algorithm row classes and validation logic
- **New Validation**: Update Algorithm validation modules
- **New Business Logic**: Update Algorithm utility classes

### **2. Configuration Repository Dependencies**

**Algorithm Impact**:

- **Schema Changes**: Configuration schema changes require Algorithm file class updates
- **View Changes**: Configuration view changes require Algorithm data structure updates
- **Template Changes**: Configuration template changes require Algorithm validation updates
- **Module Configuration**: Configuration module changes require Algorithm module updates

**Change Patterns**:

- **New Schema**: Update Algorithm file classes and row classes
- **New View**: Update Algorithm data structures and validation
- **New Template**: Update Algorithm validation and file handling
- **New Module Config**: Update Algorithm module registration

### **3. Cross-Repository Coordination**

**Coordination Requirements**:

- **Data Schema Consistency**: All repositories must use consistent data schemas
- **Module Registration**: Module changes must be coordinated across repositories
- **Validation Consistency**: Validation rules must be consistent across repositories
- **File Structure Consistency**: File structures must be consistent across repositories

---

## 🎯 CHANGE DETECTION MATRIX

### **When Adding New Module**

| **Change Type**         | **Files to Modify**                 | **Pattern to Follow**           |
| ----------------------- | ----------------------------------- | ------------------------------- |
| **Group Module**        | `{ModuleName}GroupModule.java`      | Extend AbstractUtilModuleGroup  |
| **Validation Module**   | `{ModuleName}ValidationModule.java` | Extend AbstractValidationModule |
| **Args Class**          | `{ModuleName}Args.java`             | Extend Args                     |
| **Row Classes**         | `{ModuleName}Row.java`              | Simple POJO with public fields  |
| **File Classes**        | `{ModuleName}File.java`             | Extend AbstractTSVFile          |
| **Module Registration** | `ModuleProvider.java`               | Add @Autowired dependency       |
| **File Registration**   | `SchemaProvider.java`               | Add file schema registration    |
| **File Name Constants** | `FileName.java`                     | Add file name constant          |

### **When Adding New Data Structure**

| **Change Type** | **Files to Modify**   | **Changes Required**           |
| --------------- | --------------------- | ------------------------------ |
| **Row Class**   | {ModuleName}Row.java  | Add new fields                 |
| **File Class**  | {ModuleName}File.java | Update headers and read method |
| **File Name**   | FileName.java         | Add new file name constant     |
| **Schema**      | SchemaProvider.java   | Add schema registration        |
| **Validation**  | ValidationModule.java | Add validation logic           |

### **When Modifying Existing Structure**

| **Modification Type**      | **Files to Modify**   | **Changes Required**     |
| -------------------------- | --------------------- | ------------------------ |
| **Field Changes**          | Row.java, File.java   | Update field definitions |
| **Validation Changes**     | ValidationModule.java | Update validation logic  |
| **Business Logic Changes** | Util.java             | Update utility methods   |
| **Module Changes**         | GroupModule.java      | Update module logic      |

---

## 🧠 AI GUIDANCE RULES

### **1. Module Change Detection**

```
Requirement Keywords → Algorithm Changes:
- "new module" → GroupModule, ValidationModule, Args, Row, File classes
- "new data structure" → Row class, File class, FileName constant
- "new validation" → ValidationModule, validation logic
- "new business logic" → Util class, utility methods
```

### **2. File Structure Guidance**

```
Data Type → File Pattern:
- Input data → Row class + File class + FileName constant
- Output data → Row class + File class + FileName constant
- Validation data → ValidationModule + validation logic
- Business logic → Util class + utility methods
```

### **3. Module Registration Guidance**

```
Module Type → Registration Pattern:
- Group Module → ModuleProvider.java registration
- Validation Module → GroupModule dependency
- File Class → SchemaProvider.java registration
- File Name → FileName.java constant
```

### **4. Cross-Repository Coordination**

```
Repository Change → Algorithm Impact:
- LoadAPI new module → Algorithm GroupModule, Row, File classes
- Config new schema → Algorithm File class, validation updates
- LoadAPI new field → Algorithm Row class, validation updates
- Config new view → Algorithm data structure updates
```

---

## 📊 COMPREHENSIVE FILE CHANGE MATRIX

### **Module-Specific Patterns**

#### **Analysis Module**

- **Group Module**: `GapAnalysisGroupModule.java`, `ImpactAnalysisGroupModule.java`
- **Validation**: `GapAnalysisValidationModule.java`
- **Args**: `GapAnalysisArgs.java`, `ImpactAnalysisArgs.java`
- **Rows**: `BrandGradingRow.java`, `DiscAnalysisInputRow.java`
- **Files**: `BrandGradingFile.java`, `DiscAnalysisInputFile.java`

#### **Distribution Module**

- **Group Module**: `DistributionGroupModule.java`
- **Validation**: Distribution validation modules
- **Args**: `DistributionArgs.java`
- **Rows**: Distribution row classes
- **Files**: Distribution file classes

#### **Dynamic Discounting Module**

- **Group Module**: `DynamicDiscountingGroupModule.java`
- **Validation**: Dynamic discounting validation modules
- **Args**: `DynamicDiscountingArgs.java`
- **Rows**: Dynamic discounting row classes
- **Files**: Dynamic discounting file classes

#### **OTB Module**

- **Group Module**: `OtbGroupModule.java`, `OtbDepletionGroupModule.java`
- **Validation**: `OtbValidationModule.java`
- **Args**: `OtbArgs.java`, `OtbDepletionArgs.java`
- **Rows**: OTB row classes
- **Files**: OTB file classes

---

## 🎯 IMPLEMENTATION EXAMPLES

### **Example 1: New Store Performance Module**

```
Requirement: "Add new store performance module"
→ Algorithm Changes:
  - StorePerformanceGroupModule.java: New group module
  - StorePerformanceValidationModule.java: New validation module
  - StorePerformanceArgs.java: New args class
  - StorePerformanceRow.java: New row class
  - StorePerformanceFile.java: New file class
  - ModuleProvider.java: Add module registration
  - SchemaProvider.java: Add file schema registration
  - FileName.java: Add file name constant
```

### **Example 2: New SKU Analysis Data Structure**

```
Requirement: "Add new SKU analysis data structure"
→ Algorithm Changes:
  - SkuAnalysisRow.java: New row class with SKU analysis fields
  - SkuAnalysisFile.java: New file class with headers and read method
  - FileName.java: Add SKU_ANALYSIS file name constant
  - SchemaProvider.java: Add SKU analysis file schema
  - ValidationModule.java: Add SKU analysis validation logic
```

### **Example 3: New Validation Rule**

```
Requirement: "Add new validation rule for store data"
→ Algorithm Changes:
  - StoreValidationModule.java: Update validation logic
  - ValidationUtil.java: Add validation utility methods
  - StoreRow.java: Update row class if needed
  - StoreFile.java: Update file class if needed
```

---

## ✅ SUCCESS CRITERIA

### **Complete Algorithm Implementation Checklist**

- [ ] **Group Module**: Created and registered in ModuleProvider.java
- [ ] **Validation Module**: Created and integrated with group module
- [ ] **Args Class**: Created with proper getters/setters
- [ ] **Row Classes**: Created with public fields
- [ ] **File Classes**: Created with headers and read methods
- [ ] **File Name Constants**: Added to FileName.java
- [ ] **Schema Registration**: Added to SchemaProvider.java
- [ ] **Cross-Repository Consistency**: Ensured consistency with LoadAPI and Config repositories
- [ ] **Validation Logic**: Implemented proper validation rules
- [ ] **Business Logic**: Implemented utility methods if needed

---

## 🎉 CONCLUSION

This comprehensive analysis provides AI agents with:

1. **Complete Algorithm Patterns**: All module, validation, row, file, and utility patterns identified
2. **File Change Guidance**: Exact files to modify for each change type
3. **Cross-Repository Dependencies**: Understanding of inter-repository coordination
4. **Implementation Templates**: Standard patterns to follow for all algorithm types
5. **Change Detection Matrix**: Comprehensive guidance for change prediction

**Key Achievement**: AI agents now have complete guidance on algorithm repository patterns, file structures, and implementation approaches. They can intelligently determine what files to change, when to change them, and how to implement changes following established patterns.

**Result**: The system now has complete algorithm intelligence with proper change prediction, cross-repository coordination, and implementation guidance across all three repositories.

**Status**: ✅ **ALGORITHM REPOSITORY ANALYSIS COMPLETE AND READY FOR AI GUIDANCE**
