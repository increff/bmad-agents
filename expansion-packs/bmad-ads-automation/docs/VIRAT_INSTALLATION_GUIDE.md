# VIRAT Agent - Quick Start Guide

## 🚀 **Install VIRAT in 2 Minutes**

VIRAT (Virtual Intelligent Repository Automation Tool) automates development workflows across multiple repositories.

## 📋 **Prerequisites**

- **Node.js** (Version 16+) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **Cursor IDE** or **Claude Desktop** - For AI-powered development

---

## 🛠️ **Installation**

### **Quick Install (Recommended)**

```bash
# Install VIRAT
npx bmad-method install
```

### **Set Repository Paths**

```bash
# Set your repository paths
export IRISX_ALGO_PATH="/path/to/your/irisx-algo"
export LOADAPI_PATH="/path/to/your/ms-loadapis-ril-final"
export CONFIG_PATH="/path/to/your/irisx-config"
```

### **Clone Required Repositories**

```bash
# Clone the algorithm repository (main repository)
git clone https://github.com/increff/irisx-algo.git
cd irisx-algo
git checkout main  # or your working branch

# Clone other required repositories
git clone https://github.com/increff/ms-loadapis-ril-final.git
git clone https://github.com/increff/irisx-config.git
```

That's it! VIRAT is ready to use.

---

## 🎯 **Usage with Cursor/Claude**

### **Method 1: Using Cursor IDE**

1. **Open Cursor IDE** and navigate to your project directory
2. **Create a requirement file** (e.g., `my-requirement.md`)
3. **Use Cursor's AI chat** to run VIRAT:
   ```
   @virat Please analyze and implement this requirement: [paste your requirement]
   ```

### **Method 2: Using Claude Desktop**

1. **Open Claude Desktop** application
2. **Upload your requirement file** or paste the content
3. **Use this prompt**:
   ```
   I'm using the VIRAT agent for automated development. Please help me implement this requirement using the VIRAT workflow.
   ```

### **Method 3: Command Line**

```bash
# Run VIRAT with your requirement
npx bmad-method run virat --requirement my-requirement.md

# Or use interactive mode
npx bmad-method run virat --interactive
```

### **Sample Requirement**

Create a file like `my-requirement.md`:

```markdown
# ADD a new input in distribution to store STORE SKU LEVEL ROS OVERRIDE

## Business Context

We need to add a new input mechanism to store Store-SKU level ROS (Rate of Sale) overrides in the distribution module.

## Technical Requirements

- Create new data structure for Store-SKU ROS Override
- Add LoadAPI for data ingestion
- Update configuration files
- Create SQL views and templates

## Acceptance Criteria

- New input can be loaded via LoadAPI
- Data is properly stored and accessible
- Configuration is updated across all repositories
```

### **Common Commands**

```bash
# List available agents
npx bmad-method list

# Get help
npx bmad-method help virat

# Check status
npx bmad-method status virat
```

---

## 🔧 **Troubleshooting**

### **Common Issues**

**Repository path not found?**

- Check your environment variables are set correctly
- Ensure repositories are cloned and accessible

**Git authentication issues?**

- Set up SSH keys or personal access tokens
- Configure Git credentials: `git config --global user.name "Your Name"`

**Need help?**

- Run `npx bmad-method help virat`
- Check the logs for detailed error messages

---

## 🧪 **Basic Testing with VIRAT**

### **Testing Overview**

VIRAT includes basic testing capabilities focused on static methods and utility functions:

#### **Test Types Supported**

- **Unit Tests**: Basic unit tests for static methods
- **Static Method Tests**: Tests for utility functions and helper methods
- **Configuration Tests**: Basic validation of configuration files
- **Code Quality Tests**: Basic code style and quality checks

#### **Running Basic Tests**

**Using NPX Installation:**

```bash
# Run basic unit tests
npx bmad-method run virat --test --type unit

# Run static method tests
npx bmad-method run virat --test --type static

# Generate test report
npx bmad-method run virat --test --report
```

### **Test Case Examples**

#### **Java Static Method Test Example**

```java
@Test
public void testCalculateCoverDays() {
    // Arrange
    double inventory = 100.0;
    double ros = 10.0;

    // Act
    double result = DistributionUtil.calculateCoverDays(inventory, ros);

    // Assert
    assertEquals(10.0, result, 0.01);
}
```

#### **Python Static Function Test Example**

```python
def test_validate_input_data():
    # Arrange
    input_data = {"store": 123, "sku": 456}

    # Act
    result = ValidationUtil.validate_input_data(input_data)

    # Assert
    assert result is True
    assert "store" in input_data
    assert "sku" in input_data
```

### **Test Reports**

VIRAT generates basic test reports including:

- **Test Results**: Pass/fail status for all tests
- **Coverage Analysis**: Basic test coverage metrics
- **Quality Metrics**: Code quality and style compliance
- **Issue Tracking**: Test failures and recommendations

---

## 🚀 **Quick Start Checklist**

- [ ] Install Node.js
- [ ] Run `npx bmad-method install`
- [ ] Set repository paths
- [ ] Create a requirement file
- [ ] Run `npx bmad-method run virat --requirement your-file.md`
- [ ] Run basic tests: `npx bmad-method run virat --test`
- [ ] Review test reports

**🎉 You're ready to use VIRAT with basic testing capabilities!**
