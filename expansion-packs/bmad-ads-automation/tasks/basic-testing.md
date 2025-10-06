# Basic Testing Task

## Purpose

Create and execute basic unit tests for static methods and new functionality implemented across the three repositories.

## Steps

### 1. Test Planning

1. **Identify Testable Components**:
   - Static methods in Java classes
   - New data classes and their getters/setters
   - New LoadAPI methods
   - New calculation logic and formulas
   - Module registration and validation logic
   - File registration and schema validation
   - LoadAPI registration and provider logic

2. **Determine Test Scope**:
   - **Unit Tests**: Test individual methods and classes
   - **Static Method Tests**: Focus on pure functions and utilities
   - **Data Validation Tests**: Test new data structures
   - **Formula Tests**: Test calculation logic (e.g., coverDays = inv/ros)
   - **Registration Tests**: Test module, file, and LoadAPI registration
   - **Pattern Validation Tests**: Test adherence to established patterns

### 2. Java Unit Tests (irisx-algo)

1. **Create Test Classes**:

   ```bash
   # Navigate to test directory
   cd $REPO_PATH/src/test/java/com/increff/irisx/

   # Create test directory structure matching main
   mkdir -p module/distribution
   mkdir -p row/output/distribution
   mkdir -p file/output/distribution
   ```

2. **Test New Data Classes**:
   - **Test File**: `DistFaqOutputRowTest.java`
   - **Test Coverage**:
     - Constructor initialization
     - Getter/setter methods
     - New field validation (e.g., coverDays)
     - Data integrity checks

3. **Test Static Methods**:
   - **Test File**: `DistributionHelperTest.java`
   - **Test Coverage**:
     - Formula calculations (e.g., coverDays calculation)
     - Utility methods
     - Validation methods
     - Data transformation methods

4. **Test New File Classes**:
   - **Test File**: `DistFaqOutputFileTest.java`
   - **Test Coverage**:
     - File reading/writing
     - Data serialization
     - Column handling
     - Error handling

### 3. Python Unit Tests (ms-loadapis-ril-final)

1. **Create Test Files**:

   ```bash
   # Navigate to test directory
   cd $LOADAPI_PATH/tests/

   # Create test structure
   mkdir -p loadapi/distribution
   ```

2. **Test LoadAPI Classes**:
   - **Test File**: `test_store_sku_ros_override_loadapi.py`
   - **Test Coverage**:
     - Data loading methods
     - Validation methods
     - Error handling
     - Schema validation

3. **Test Static Methods**:
   - **Test File**: `test_common_utils.py`
   - **Test Coverage**:
     - Utility functions
     - Data conversion methods
     - Validation functions

### 4. Test Execution

1. **Java Tests**:

   ```bash
   # Run Maven tests
   cd $REPO_PATH
   mvn test -Dtest=DistFaqOutputRowTest
   mvn test -Dtest=DistributionHelperTest
   mvn test -Dtest=DistFaqOutputFileTest
   ```

2. **Python Tests**:
   ```bash
   # Run Python tests
   cd $LOADAPI_PATH
   python -m pytest tests/test_store_sku_ros_override_loadapi.py -v
   python -m pytest tests/test_common_utils.py -v
   ```

### 5. Test Results Documentation

1. **Test Coverage Report**:
   - Number of tests created
   - Test execution results
   - Coverage percentage
   - Failed tests (if any)

2. **Test Cases Summary**:
   - **Data Class Tests**: Constructor, getters, setters, validation
   - **Static Method Tests**: Formula calculations, utilities, validations
   - **File Class Tests**: I/O operations, serialization, error handling
   - **LoadAPI Tests**: Data loading, validation, error handling

## Output

- **Test Files Created**: List of test files created in each repository
- **Test Execution Results**: Pass/fail status for all tests
- **Test Coverage**: Coverage percentage and areas covered
- **Test Cases**: Summary of test cases created and executed

## Success Criteria

- [ ] Test classes created for new data classes
- [ ] Test classes created for static methods
- [ ] Test classes created for new file classes
- [ ] Test classes created for LoadAPI methods
- [ ] All tests execute successfully
- [ ] Test coverage documented
- [ ] Test results included in final documentation

## Example Test Cases

### Java Test Example

```java
@Test
public void testCoverDaysCalculation() {
    // Arrange
    DistFaqOutputRow row = new DistFaqOutputRow();
    row.setInv(100.0);
    row.setRos(10.0);

    // Act
    double coverDays = DistributionHelper.calculateCoverDays(row.getInv(), row.getRos());

    // Assert
    assertEquals(10.0, coverDays, 0.001);
}

@Test
public void testDistFaqOutputRowConstructor() {
    // Act
    DistFaqOutputRow row = new DistFaqOutputRow();

    // Assert
    assertNotNull(row);
    assertEquals(PivotalTag.EMPTY, row.getPivotalTag());
    assertEquals(0.0, row.getCoverDays(), 0.001);
}
```

### Python Test Example

```python
def test_store_sku_ros_override_validation():
    # Arrange
    load_api = StoreSkuRosOverrideLoadApi()
    test_data = {
        'store_id': 123,
        'sku_id': 456,
        'ros_override': 15.5
    }

    # Act
    result = load_api.validate_data(test_data)

    # Assert
    assert result is True

def test_ros_override_calculation():
    # Arrange
    original_ros = 10.0
    override_ros = 15.5

    # Act
    result = calculate_ros_override(original_ros, override_ros)

    # Assert
    assert result == 15.5
```
