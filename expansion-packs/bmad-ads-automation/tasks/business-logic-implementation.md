# Business Logic Implementation Task

## Purpose

Implement actual business logic that uses the new data structures and integrates with existing modules. This task ensures that implementations include real business functionality, not just data structures.

## Trigger

This task is automatically triggered during the implementation phase when business logic is required based on the requirement analysis.

## Steps

### 1. Business Logic Analysis

#### **A. Requirement Analysis**

1. **Identify Business Logic Requirements**:
   - **Action**: Analyze requirement to identify what business logic needs to be implemented
   - **Output**: List of business logic requirements and functionality
   - **Notes**: Focus on what the system should DO with the new data, not just how to store it

2. **Identify Integration Points**:
   - **Action**: Identify where the new business logic integrates with existing modules
   - **Output**: Integration points and existing modules that need modification
   - **Notes**: Understand how the new logic fits into the existing system

3. **Identify Override Mechanisms**:
   - **Action**: Identify override mechanisms and business rule applications
   - **Output**: Override logic requirements and business rule specifications
   - **Notes**: Understand how overrides should work and when they apply

#### **B. Existing Logic Analysis**

1. **Crawl Existing Business Logic**:

   ```bash
   # Find existing business logic methods
   grep -r "public.*calculate\|public.*process\|public.*validate\|public.*override" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/

   # Find existing calculation methods
   grep -r "calculate\|process\|validate\|override" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/module/

   # Find existing integration points
   grep -r "import.*module\|extends.*Module" $ALGO_REPO_PATH/src/main/java/com/increff/irisx/
   ```

2. **Analyze Existing Patterns**:
   - **Action**: Analyze existing business logic patterns and implementations
   - **Output**: Pattern analysis with existing business logic structures
   - **Notes**: Understand how existing business logic is implemented

3. **Identify Similar Functionality**:
   - **Action**: Find similar business logic implementations to use as reference
   - **Output**: Reference implementations and similar functionality
   - **Notes**: Use existing implementations as templates for new business logic

### 2. Business Logic Implementation

#### **A. Override Logic Implementation**

1. **Override Check Methods**:
   - **Action**: Implement methods that check for override data and conditions
   - **Output**: Override check methods with proper validation
   - **Notes**: Create methods that determine when overrides should be applied

2. **Override Application Methods**:
   - **Action**: Implement methods that apply override values and business rules
   - **Output**: Override application methods with business rule logic
   - **Notes**: Create methods that actually apply the override logic

3. **Override Validation Methods**:
   - **Action**: Implement methods that validate override data and business rules
   - **Output**: Override validation methods with proper error handling
   - **Notes**: Create methods that ensure override data is valid and applicable

#### **B. Calculation Logic Implementation**

1. **Calculation Methods**:
   - **Action**: Implement methods that perform calculations using new inputs
   - **Output**: Calculation methods with proper business logic
   - **Notes**: Create methods that perform actual calculations and business operations

2. **Formula Implementation**:
   - **Action**: Implement business formulas and mathematical operations
   - **Output**: Formula implementation with proper validation
   - **Notes**: Create methods that implement business formulas and calculations

3. **Result Processing**:
   - **Action**: Implement methods that process calculation results
   - **Output**: Result processing methods with proper handling
   - **Notes**: Create methods that handle and process calculation results

#### **C. Data Processing Logic Implementation**

1. **Data Transformation Methods**:
   - **Action**: Implement methods that transform and process input data
   - **Output**: Data transformation methods with proper logic
   - **Notes**: Create methods that transform data according to business rules

2. **Data Validation Methods**:
   - **Action**: Implement methods that validate data according to business rules
   - **Output**: Data validation methods with proper error handling
   - **Notes**: Create methods that validate data against business constraints

3. **Data Integration Methods**:
   - **Action**: Implement methods that integrate data with existing systems
   - **Output**: Data integration methods with proper handling
   - **Notes**: Create methods that integrate new data with existing data flows

### 3. Integration Implementation

#### **A. Module Integration**

1. **Existing Module Integration**:
   - **Action**: Implement integration with existing modules and business logic
   - **Output**: Integration methods that connect with existing modules
   - **Notes**: Create methods that integrate new logic with existing module functionality

2. **Cross-Module Integration**:
   - **Action**: Implement integration across multiple modules
   - **Output**: Cross-module integration methods
   - **Notes**: Create methods that integrate new logic across multiple modules

3. **Data Flow Integration**:
   - **Action**: Implement integration with existing data flows
   - **Output**: Data flow integration methods
   - **Notes**: Create methods that integrate new logic with existing data processing flows

#### **B. Business Rule Integration**

1. **Rule Engine Integration**:
   - **Action**: Implement integration with existing business rule engines
   - **Output**: Rule engine integration methods
   - **Notes**: Create methods that integrate with existing business rule systems

2. **Validation Rule Integration**:
   - **Action**: Implement integration with existing validation rules
   - **Output**: Validation rule integration methods
   - **Notes**: Create methods that integrate with existing validation systems

3. **Processing Rule Integration**:
   - **Action**: Implement integration with existing processing rules
   - **Output**: Processing rule integration methods
   - **Notes**: Create methods that integrate with existing processing systems

### 4. Business Logic Testing

#### **A. Unit Testing**

1. **Business Logic Tests**:
   - **Action**: Create unit tests for all business logic methods
   - **Output**: Comprehensive unit tests for business logic
   - **Notes**: Test all business logic methods with various scenarios

2. **Override Logic Tests**:
   - **Action**: Create tests for override mechanisms and applications
   - **Output**: Override logic test suite
   - **Notes**: Test override logic with various override scenarios

3. **Calculation Tests**:
   - **Action**: Create tests for calculation methods and formulas
   - **Output**: Calculation test suite
   - **Notes**: Test calculations with various input scenarios

#### **B. Integration Testing**

1. **Module Integration Tests**:
   - **Action**: Create tests for module integration functionality
   - **Output**: Module integration test suite
   - **Notes**: Test integration with existing modules

2. **Data Flow Tests**:
   - **Action**: Create tests for data flow integration
   - **Output**: Data flow test suite
   - **Notes**: Test integration with existing data flows

3. **End-to-End Tests**:
   - **Action**: Create end-to-end tests for complete business logic flow
   - **Output**: End-to-end test suite
   - **Notes**: Test complete business logic from input to output

### 5. Business Logic Documentation

#### **A. Method Documentation**

1. **Business Logic Documentation**:
   - **Action**: Document all business logic methods with clear explanations
   - **Output**: Comprehensive documentation for business logic methods
   - **Notes**: Document what each method does and how it works

2. **Override Logic Documentation**:
   - **Action**: Document override mechanisms and business rules
   - **Output**: Override logic documentation
   - **Notes**: Document how overrides work and when they apply

3. **Integration Documentation**:
   - **Action**: Document integration points and existing module connections
   - **Output**: Integration documentation
   - **Notes**: Document how new logic integrates with existing systems

#### **B. Usage Examples**

1. **Business Logic Examples**:
   - **Action**: Create usage examples for business logic methods
   - **Output**: Usage examples with sample data
   - **Notes**: Provide clear examples of how to use the business logic

2. **Override Examples**:
   - **Action**: Create examples of override mechanisms in action
   - **Output**: Override usage examples
   - **Notes**: Show how overrides work with real data scenarios

3. **Integration Examples**:
   - **Action**: Create examples of integration with existing modules
   - **Output**: Integration usage examples
   - **Notes**: Show how new logic integrates with existing functionality

## Output

The output of this business logic implementation task includes:

1. **Business Logic Methods**: Complete implementation of business logic methods
2. **Override Mechanisms**: Implementation of override logic and business rule applications
3. **Calculation Methods**: Implementation of calculation and formula methods
4. **Integration Methods**: Implementation of integration with existing modules
5. **Validation Methods**: Implementation of business validation rules and constraints
6. **Processing Methods**: Implementation of data processing and transformation logic
7. **Unit Tests**: Comprehensive unit tests for all business logic
8. **Integration Tests**: Tests for integration with existing modules and data flows
9. **Documentation**: Complete documentation for business logic methods and usage
10. **Usage Examples**: Clear examples of how to use the business logic

## Integration

This business logic implementation task integrates with the VIRAT agent and the automated development workflow to ensure that every implementation includes actual business functionality, not just data structures. It ensures that the system can actually DO something with the new data, not just store it.
