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
git checkout bmad-ads-automation-clean-implementation

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

### Run VIRAT

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
