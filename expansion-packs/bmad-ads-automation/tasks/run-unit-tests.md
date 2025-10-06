# Run Unit Tests Task

## Purpose

Execute basic unit tests for static methods and implemented changes to ensure code quality and functionality.

## Steps

### 1. Identify Static Method Test Requirements

1. **Analyze Implementation**: Review implemented changes to identify static methods that need testing
2. **Map Static Methods**: Identify static methods and utility functions in new implementations
3. **Determine Test Scope**: Focus on testing static methods, utility functions, and simple business logic
4. **Basic Test Coverage**: Ensure basic test coverage for static methods

### 2. Java Static Method Tests (irisx-algo)

1. **Navigate to Java Repository**:

   ```bash
   cd $REPO_PATH
   ```

2. **Run Basic Unit Tests**:

   ```bash
   # Run basic unit tests (focus on static methods)
   mvn test -Dtest="*Test" -Dtest.method="static"

   # Run specific static method tests
   mvn test -Dtest="*UtilTest,*HelperTest,*ConstantsTest"
   ```

3. **Generate Basic Static Method Tests** (if needed):
   - Create simple test files for static methods
   - Test utility functions and helper methods
   - Test constants and configuration methods
   - Focus on static methods only

4. **Validate Test Results**:
   - Check test pass/fail status for static methods
   - Review basic test coverage
   - Identify any failing static method tests

### 3. Python Static Function Tests (ms-loadapis-ril-final)

1. **Navigate to Python Repository**:

   ```bash
   cd $LOADAPI_PATH
   ```

2. **Run Basic Unit Tests**:

   ```bash
   # Run basic unit tests (focus on static functions)
   python -m pytest tests/unit/test_utils.py

   # Run specific utility function tests
   python -m pytest tests/unit/test_*_utils.py
   ```

3. **Generate Basic Static Function Tests** (if needed):
   - Create simple test files for static functions
   - Test utility functions and helper methods
   - Test data processing functions
   - Focus on static functions only

4. **Validate Test Results**:
   - Check test pass/fail status for static functions
   - Review basic test coverage
   - Identify any failing static function tests

### 4. Basic Configuration Validation (irisx-config)

1. **Navigate to Config Repository**:

   ```bash
   cd $CONFIG_PATH
   ```

2. **Basic Configuration File Validation**:

   ```bash
   # Basic JSON validation
   python -c "import json; json.load(open('module_input.json'))"
   python -c "import json; json.load(open('module_output.json'))"
   python -c "import json; json.load(open('upload-files.json'))"
   ```

3. **Basic File Structure Validation**:
   ```bash
   # Check file existence and basic structure
   ls -la template/
   ls -la view-creation/
   ls -la sync/
   ls -la export/
   ```

### 5. Basic Test Results Analysis

1. **Compile Basic Test Results**:
   - Collect test results from static method tests
   - Identify passing and failing static method tests
   - Review basic test coverage

2. **Generate Basic Test Report**:
   - Create simple test report
   - Include basic coverage analysis
   - Document any static method test failures

3. **Validate Success Criteria**:
   - All static method tests pass
   - Basic test coverage achieved
   - No critical static method test failures
   - Basic code quality standards met

## Output

- **Test Results**: Pass/fail status for static method tests
- **Basic Coverage**: Basic test coverage for static methods
- **Test Report**: Simple test execution report
- **Issues**: Any static method test failures identified

## Success Criteria

- [ ] All static method tests pass
- [ ] Basic unit tests created for new static methods
- [ ] Basic test coverage achieved for static methods
- [ ] No critical static method test failures
- [ ] Basic code quality standards validated
- [ ] Basic test reports generated and documented
