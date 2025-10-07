# VIRAT Agent - Quick Setup Guide

VIRAT (Virtual Intelligent Repository Automation Tool) automates development workflows across multiple repositories.

## Prerequisites

- **Node.js** (Version 16+)
- **Git** (Version 2.30+)
- **Java** (Version 11+) and **Maven** (Version 3.6+)
- **Python** (Version 3.8+)

## Installation

### Quick Setup (Recommended)

```bash
# Install and run VIRAT using NPX
npx bmad-method install
```

### Manual Setup

```bash
# Clone repository
git clone https://github.com/increff/bmad-agents.git
cd bmad-agents
git checkout virat-transformation-clean-implementation

# Install dependencies
npm install
```

## Configuration

Set up your repository paths in `config.yaml`:

```yaml
repositories:
  irisx-algo: '/path/to/your/irisx-algo'
  ms-loadapis-ril-final: '/path/to/your/ms-loadapis-ril-final'
  irisx-config: '/path/to/your/irisx-config'
```

Or use environment variables:

```bash
export IRISX_ALGO_PATH="/path/to/your/irisx-algo"
export LOADAPI_PATH="/path/to/your/ms-loadapis-ril-final"
export CONFIG_PATH="/path/to/your/irisx-config"
```

## Usage

### Create a Requirement

Create a file like `my-requirement.md`:

```markdown
# ADD a new input in distribution to store STORE SKU LEVEL ROS OVERRIDE

## Business Context

We need to add a new input mechanism to store Store-SKU level ROS overrides.

## Technical Requirements

- Create new data structure for Store-SKU ROS Override
- Add LoadAPI for data ingestion
- Update configuration files

## Acceptance Criteria

- New input can be loaded via LoadAPI
- Data is properly stored and accessible
```

### Using VIRAT in Cursor IDE

1. **Open your project in Cursor**
2. **Create your requirement file** (e.g., `my-requirement.md`)
3. **Use Cursor's AI chat** to run VIRAT:
   - Open Cursor's AI chat (Cmd+L or Ctrl+L)
   - Type: `@virat analyze and implement this requirement: my-requirement.md`
   - Or: `@virat help me implement the Store-SKU ROS Override feature`

4. **Alternative: Use terminal in Cursor**:

   ```bash
   # Using NPX (recommended)
   npx bmad-method run virat --requirement my-requirement.md

   # Or interactive mode
   npx bmad-method run virat --interactive
   ```

### Using VIRAT with Claude AI

1. **Upload your requirement file** to Claude
2. **Provide context** about your repositories:

   ```
   I have three repositories:
   - irisx-algo: Java/Spring Boot (core business logic)
   - ms-loadapis-ril-final: Python (data loading APIs)
   - irisx-config: Configuration/SQL (config files and templates)

   Please analyze this requirement and provide implementation guidance.
   ```

3. **Ask Claude to act as VIRAT**:
   ```
   Please act as the VIRAT agent and help me implement this requirement across my three repositories.
   Provide step-by-step implementation guidance.
   ```

### Traditional Command Line Usage

```bash
# Using NPX (recommended)
npx bmad-method run virat --requirement my-requirement.md

# Or interactive mode
npx bmad-method run virat --interactive
```

## Supported Requirement Types

1. **NEW TABLE**: `# ADD a new input in distribution to store STORE SKU LEVEL ROS OVERRIDE`
2. **NEW COLUMN**: `# ADD A NEW COLUMN COVER DAYS IN INTERIM DIST FAQ, FORMULA IS INV/ROS`
3. **MODIFY**: `# UPDATE existing distribution logic to handle new business rules`
4. **DELETE**: `# REMOVE deprecated fields from distribution module`

## Troubleshooting

### Common Issues

**Repository path not found:**

- Verify paths in `config.yaml` or environment variables
- Ensure repositories are cloned and accessible

**Authentication failed:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Java/Maven issues:**

- Install Java 11+ and Maven
- Set JAVA_HOME environment variable

**Debug mode:**

```bash
export VIRAT_DEBUG=true
npm run dev -- --verbose
```

## Quick Start Checklist

### For Cursor IDE Users:

- [ ] Install Node.js and prerequisites
- [ ] Open your project in Cursor
- [ ] Create your first requirement document
- [ ] Use Cursor's AI chat: `@virat analyze and implement this requirement: my-requirement.md`

### For Claude AI Users:

- [ ] Upload your requirement file to Claude
- [ ] Provide repository context to Claude
- [ ] Ask Claude to act as VIRAT agent

### For Command Line Users:

- [ ] Install Node.js and prerequisites
- [ ] Run `npx bmad-method install` (or manual setup)
- [ ] Set repository paths
- [ ] Create your first requirement document
- [ ] Run VIRAT with your requirement

## Getting Help

```bash
# List available agents
npx bmad-method list

# Get VIRAT help
npx bmad-method help virat

# Check status
npx bmad-method status virat
```

**Ready to automate your development workflow!**
