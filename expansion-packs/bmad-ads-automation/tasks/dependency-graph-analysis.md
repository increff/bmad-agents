# Dependency Graph Analysis Task

## Purpose

Analyze and build dependency graphs for all modules to understand interdependencies, predict impact of changes, and prevent breaking modifications.

## Steps

### 1. Module Discovery and Mapping

1. **Discover All Modules**: Find all modules in irisx-algo repository
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module -name "*Module.java" | head -20
   ```
2. **Map Module Structure**: Understand module hierarchy and organization
3. **Identify Module Types**: Categorize modules by functionality (ISS, Distribution, OTB, etc.)

### 2. Import Analysis

1. **Extract Import Dependencies**: Analyze all import statements in modules
   ```bash
   grep -r "import.*com\.increff\.irisx" /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx/module/ | head -20
   ```
2. **Map Internal Dependencies**: Identify dependencies between modules
3. **Map External Dependencies**: Identify dependencies on external libraries

### 3. Data Flow Analysis

1. **Analyze Data Classes**: Find data classes used across modules
   ```bash
   find /Users/viratbansal/IdeaProjects/irisx-algo/src/main/java/com/increff/irisx -name "*Data.java" | head -10
   ```
2. **Map Data Dependencies**: Understand how data flows between modules
3. **Identify Shared Resources**: Find shared resources and utilities

### 4. Build Dependency Graph

1. **Create Node Map**: Map each module as a node
2. **Create Edge Map**: Map dependencies as edges
3. **Calculate Dependencies**: Determine dependency levels and relationships
4. **Detect Circular Dependencies**: Identify and flag circular dependencies

### 5. Impact Analysis

1. **Predict Change Impact**: For any module change, predict affected modules
2. **Calculate Cascade Effects**: Determine which modules will be affected downstream
3. **Identify Critical Paths**: Find modules that affect many others
4. **Risk Assessment**: Assess risk of changes based on dependency depth

### 6. Validation Rules

1. **Dependency Validation**: Ensure changes don't break dependencies
2. **Circular Dependency Prevention**: Prevent creation of circular dependencies
3. **Interface Consistency**: Ensure interface changes are compatible
4. **Data Contract Validation**: Validate data structure changes

## Output

- **Dependency Graph**: Visual representation of module dependencies
- **Impact Analysis**: Prediction of change impact
- **Risk Assessment**: Risk levels for different types of changes
- **Validation Rules**: Rules to prevent breaking changes

## Success Criteria

- [ ] All modules discovered and mapped
- [ ] Complete dependency graph built
- [ ] Impact analysis working for any module change
- [ ] Circular dependency detection implemented
- [ ] Validation rules prevent breaking changes
