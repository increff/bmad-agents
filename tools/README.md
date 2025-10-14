# BMAD™ Tools Directory

> Developer tools for building, versioning, and managing the BMAD™ ecosystem

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Reference](#quick-reference)
- [Tool Categories](#tool-categories)
- [Detailed Tool Documentation](#detailed-tool-documentation)
- [Development Workflows](#development-workflows)
- [Installation & Setup](#installation--setup)

## Overview

This directory contains all the development tools and utilities for the BMAD™ (Brownfield Multi-Agent Development) ecosystem. These tools help with building, versioning, validating, installing, and managing BMAD agents and expansion packs.

## Quick Reference

### Most Common Commands

```bash
# Build all web bundles
npm run build

# Version management
npm run version:patch         # Bump patch version (4.43.0 → 4.43.1)
npm run version:minor         # Bump minor version (4.43.0 → 4.44.0)
npm run version:major         # Bump major version (4.43.0 → 5.0.0)

# Validation
npm run validate              # Validate all configurations
npm run lint                  # Lint all code
npm run format               # Format all code

# Installation
npm run install:bmad         # Install BMAD to IDE
npx bmad-method install      # Interactive installation

# Flattening (for AI context)
npm run flatten              # Flatten project for AI tools
```

## Tool Categories

### 🏗️ Build Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `cli.js` | Main CLI tool | `node tools/cli.js [command]` |
| `builders/web-builder.js` | Build web bundles | `npm run build` |
| `bmad-npx-wrapper.js` | NPX entry point | `npx bmad-method [command]` |

### 📦 Version Management

| Tool | Purpose | Usage |
|------|---------|-------|
| `version-bump.js` | Bump core version | `npm run version:patch\|minor\|major` |
| `bump-all-versions.js` | Bump all expansion versions | `npm run version:all:patch\|minor\|major` |
| `bump-expansion-version.js` | Bump specific expansion | `npm run version:expansion` |
| `update-expansion-version.js` | Set expansion version | `npm run version:expansion:set` |
| `sync-installer-version.js` | Sync installer version | Auto-runs during build |
| `sync-version.sh` | Sync versions across files | Auto-runs during version bump |

### 🔍 Code Quality & Validation

| Tool | Purpose | Usage |
|------|---------|-------|
| `yaml-format.js` | Format YAML files | Auto-runs via prettier |
| `setup-hooks.sh` | Setup git hooks | `npm run setup:hooks` |

### 📦 Installation

| Tool | Purpose | Usage |
|------|---------|-------|
| `installer/` | BMAD installation system | `npm run install:bmad` |
| `installer/bin/bmad.js` | Installer CLI | `npx bmad-method install` |

### 📝 Flattening & Aggregation

| Tool | Purpose | Usage |
|------|---------|-------|
| `flattener/main.js` | Flatten project for AI | `npm run flatten` |
| `flattener/aggregate.js` | Aggregate file contents | Part of flattener |
| `flattener/discovery.js` | Discover project files | Part of flattener |

### 🚀 Release & Preview

| Tool | Purpose | Usage |
|------|---------|-------|
| `preview-release-notes.js` | Preview release notes | `npm run preview:release` |

### 🔧 Migration & Upgrade

| Tool | Purpose | Usage |
|------|---------|-------|
| `upgraders/v3-to-v4-upgrader.js` | Upgrade v3 to v4 | Auto-runs via CLI |
| `implement-fork-friendly-ci.sh` | Setup CI for forks | Manual execution |

### 📚 Library & Utilities

| Tool | Purpose | Used By |
|------|---------|---------|
| `lib/dependency-resolver.js` | Resolve agent dependencies | Build tools |
| `lib/yaml-utils.js` | YAML parsing utilities | Build & validation |
| `shared/bannerArt.js` | ASCII art banners | CLI tools |

## Detailed Tool Documentation

### 🏗️ CLI Tool (`cli.js`)

Main command-line interface for BMAD development.

**Commands:**

```bash
# Build commands
node tools/cli.js build                    # Build all
node tools/cli.js build --agents-only      # Build agents only
node tools/cli.js build --teams-only       # Build teams only
node tools/cli.js build:expansions         # Build expansion packs
node tools/cli.js build:expansions --expansion <name>  # Build specific pack

# List commands
node tools/cli.js list:agents              # List all agents
node tools/cli.js list:expansions          # List all expansion packs
node tools/cli.js list:teams               # List all teams

# Validation
node tools/cli.js validate                 # Validate configurations
node tools/cli.js validate:agents          # Validate agents
node tools/cli.js validate:expansions      # Validate expansion packs

# Upgrade
node tools/cli.js upgrade v3-to-v4         # Upgrade from v3 to v4
```

**NPM Script Shortcuts:**

```bash
npm run build                  # Build all
npm run build:agents          # Build agents only
npm run build:teams           # Build teams only
npm run validate              # Validate all
npm run list:agents           # List agents
```

---

### 📦 Version Bump (`version-bump.js`)

Bump the core BMAD version in package.json.

**Usage:**

```bash
# Via NPM scripts (recommended)
npm run version:patch         # 4.43.0 → 4.43.1
npm run version:minor         # 4.43.0 → 4.44.0
npm run version:major         # 4.43.0 → 5.0.0

# Direct execution
node tools/version-bump.js patch
node tools/version-bump.js minor
node tools/version-bump.js major
```

**What it does:**
1. Updates `package.json` version
2. Creates git commit
3. Creates git tag
4. Syncs version across related files

---

### 📦 Bump All Versions (`bump-all-versions.js`)

Bump versions for all expansion packs simultaneously.

**Usage:**

```bash
# Via NPM scripts
npm run version:all:patch     # Bump all expansions (patch)
npm run version:all:minor     # Bump all expansions (minor)
npm run version:all:major     # Bump all expansions (major)

# Direct execution
node tools/bump-all-versions.js patch
node tools/bump-all-versions.js minor
node tools/bump-all-versions.js major
```

**What it does:**
1. Scans all expansion packs
2. Reads each `config.yaml`
3. Bumps version in each pack
4. Updates all references

---

### 📦 Bump Expansion Version (`bump-expansion-version.js`)

Interactive tool to bump a specific expansion pack version.

**Usage:**

```bash
npm run version:expansion
# Interactive prompts will guide you
```

**What it does:**
1. Lists all expansion packs
2. Prompts for selection
3. Prompts for version bump type
4. Updates the selected expansion pack

---

### 📦 Update Expansion Version (`update-expansion-version.js`)

Set a specific version for an expansion pack.

**Usage:**

```bash
npm run version:expansion:set
# Follow interactive prompts
```

**What it does:**
1. Lists expansion packs
2. Prompts for expansion selection
3. Prompts for new version number
4. Updates to specified version

---

### 📝 Flattener (`flattener/main.js`)

Flatten the entire project into a single file for AI context tools.

**Usage:**

```bash
npm run flatten

# Interactive mode (will prompt for options)
node tools/flattener/main.js

# CLI mode
node tools/flattener/main.js \
  --project-root . \
  --output-path ./flattened-output.txt \
  --non-interactive
```

**What it does:**
1. Discovers all files in the project
2. Respects `.gitignore` and `.cursorignore`
3. Filters out binary files
4. Aggregates text content
5. Generates output file with metadata
6. Shows statistics (files, lines, tokens)

**Output formats:**
- Text file (default)
- XML file (optional)

**Use cases:**
- Providing context to AI coding assistants
- Code analysis and documentation
- Migration planning
- Backup and archival

---

### 🔧 Installer (`installer/`)

Interactive installation system for BMAD in your IDE.

**Usage:**

```bash
# Via NPM
npm run install:bmad

# Via NPX (from anywhere)
npx bmad-method install

# Direct execution
node tools/installer/bin/bmad.js install
```

**Features:**
- Interactive IDE selection (Cursor, Windsurf, etc.)
- Agent installation
- Configuration setup
- Rules installation
- Memory management

**See:** `installer/README.md` for detailed documentation

---

### 🎨 Web Builder (`builders/web-builder.js`)

Build web-ready bundles of agents and teams.

**Usage:**

```bash
# Build everything
npm run build

# Build specific components
npm run build:agents          # Agents only
npm run build:teams           # Teams only

# Build expansion packs
node tools/cli.js build:expansions
node tools/cli.js build:expansions --expansion bmad-feedback
```

**Output:**
- `dist/agents/*.txt` - Agent bundles
- `dist/teams/*.txt` - Team bundles
- `dist/expansion-packs/*.txt` - Expansion pack bundles

**Features:**
- Dependency resolution
- File aggregation
- Metadata generation
- Output validation

---

### ✅ Validation Tools

Validate BMAD configurations before committing or releasing.

**Usage:**

```bash
# Validate everything
npm run validate

# Validate specific components
node tools/cli.js validate:agents
node tools/cli.js validate:expansions

# Lint and format
npm run lint                  # Check for issues
npm run lint:fix             # Fix issues automatically
npm run format               # Format all files
npm run format:check         # Check formatting
```

**What gets validated:**
- YAML syntax and structure
- Agent configurations
- Team configurations
- Expansion pack configurations
- File references and dependencies
- Version consistency

---

### 🪝 Git Hooks Setup (`setup-hooks.sh`)

Setup pre-commit hooks for code quality.

**Usage:**

```bash
npm run setup:hooks

# Or directly
chmod +x tools/setup-hooks.sh
./tools/setup-hooks.sh
```

**What it does:**
1. Installs Husky
2. Creates pre-commit hook
3. Configures validation checks

**Pre-commit checks:**
- Configuration validation
- Code formatting
- Linting
- YAML validation

---

### 📋 Preview Release Notes (`preview-release-notes.js`)

Preview release notes before publishing.

**Usage:**

```bash
npm run preview:release
```

**What it shows:**
- Upcoming version
- Changelog entries
- Breaking changes
- New features
- Bug fixes

---

### 🔄 Upgraders (`upgraders/`)

Migration tools for upgrading between major versions.

**v3 to v4 Upgrader:**

```bash
node tools/cli.js upgrade v3-to-v4
```

**What it does:**
- Migrates configuration format
- Updates file structure
- Converts deprecated patterns
- Validates after migration

---

## Development Workflows

### 🎯 Creating a New Release

```bash
# 1. Make sure everything is validated
npm run validate
npm run lint
npm run format:check

# 2. Preview what will be released
npm run preview:release

# 3. Bump version (choose one)
npm run version:patch         # Bug fixes
npm run version:minor         # New features
npm run version:major         # Breaking changes

# 4. Build everything
npm run build

# 5. Push to GitHub
git push && git push --tags

# 6. Trigger release workflow
npm run release:patch         # or minor/major
npm run release:watch         # Watch progress
```

---

### 🆕 Creating a New Expansion Pack

```bash
# 1. Create expansion pack structure
mkdir -p expansion-packs/my-new-pack/{agents,tasks,checklists,data,docs}

# 2. Create config.yaml
cat > expansion-packs/my-new-pack/config.yaml << EOF
expansion_pack:
  name: my-new-pack
  version: 1.0.0
  # ... rest of config
EOF

# 3. Create README
# Document your expansion pack

# 4. Validate
npm run validate

# 5. Build
npm run build

# 6. Test
# Test your expansion pack

# 7. Commit
git add expansion-packs/my-new-pack
git commit -m "feat: Add my-new-pack expansion"
```

---

### 🔧 Making Changes to Core

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Validate changes
npm run validate
npm run lint
npm run format

# 4. Build and test
npm run build
# ... test your changes ...

# 5. Commit (pre-commit hooks will run automatically)
git add .
git commit -m "feat: My new feature"

# 6. Push and create PR
git push origin feature/my-feature
```

---

### 🐛 Debugging Build Issues

```bash
# 1. Clean build
rm -rf dist/
npm run build

# 2. Validate configurations
npm run validate

# 3. Check specific component
node tools/cli.js validate:agents
node tools/cli.js validate:expansions

# 4. List what's available
node tools/cli.js list:agents
node tools/cli.js list:expansions

# 5. Check dependencies
node tools/cli.js build --agents-only
# Review console output for errors
```

---

### 📦 Updating All Expansion Packs

```bash
# Bump all expansion pack versions at once
npm run version:all:patch     # For bug fixes
npm run version:all:minor     # For new features
npm run version:all:major     # For breaking changes

# This will:
# 1. Find all expansion packs
# 2. Update their config.yaml versions
# 3. Update any cross-references
# 4. Create commits
```

---

## Installation & Setup

### Prerequisites

```bash
# Node.js version
node --version    # Should be >= 20.10.0

# Install dependencies
npm install
```

### Initial Setup

```bash
# 1. Install all dependencies
npm install

# 2. Setup git hooks
npm run setup:hooks

# 3. Validate everything works
npm run validate

# 4. Build everything
npm run build

# 5. Install BMAD to your IDE (optional)
npm run install:bmad
```

### Environment Configuration

The tools respect the following:
- `.gitignore` - Files to ignore
- `.cursorignore` - Additional AI-specific ignores
- `package.json` - Version and scripts
- `expansion-packs/*/config.yaml` - Expansion pack configs

---

## Tool File Structure

```
tools/
├── README.md                          # This file
├── cli.js                             # Main CLI entry point
├── bmad-npx-wrapper.js               # NPX wrapper
├── builders/
│   └── web-builder.js                # Web bundle builder
├── flattener/                        # Project flattening tools
│   ├── main.js                       # Main flattener CLI
│   ├── aggregate.js                  # Content aggregation
│   ├── discovery.js                  # File discovery
│   ├── files.js                      # File operations
│   ├── binary.js                     # Binary detection
│   ├── xml.js                        # XML output generation
│   ├── stats.js                      # Statistics calculation
│   └── ...
├── installer/                        # Installation system
│   ├── bin/bmad.js                   # Installer CLI
│   ├── lib/                          # Installer libraries
│   ├── config/                       # Installer configs
│   └── README.md                     # Installer docs
├── lib/                              # Shared libraries
│   ├── dependency-resolver.js        # Dependency resolution
│   └── yaml-utils.js                 # YAML utilities
├── upgraders/                        # Version upgraders
│   └── v3-to-v4-upgrader.js         # v3→v4 migration
├── shared/                           # Shared utilities
│   └── bannerArt.js                  # CLI banners
├── version-bump.js                   # Core version bumping
├── bump-all-versions.js              # Bulk version bumping
├── bump-expansion-version.js         # Interactive expansion bump
├── update-expansion-version.js       # Set expansion version
├── sync-installer-version.js         # Sync installer version
├── sync-version.sh                   # Version sync script
├── yaml-format.js                    # YAML formatter
├── setup-hooks.sh                    # Git hooks setup
├── preview-release-notes.js          # Release notes preview
└── implement-fork-friendly-ci.sh     # CI setup for forks
```

---

## Troubleshooting

### Build Issues

**Problem:** Build fails with "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Build generates empty files
```bash
# Solution: Validate configurations first
npm run validate
# Fix any issues, then rebuild
npm run build
```

---

### Version Management Issues

**Problem:** Version bump doesn't update all files
```bash
# Solution: Run sync script manually
./tools/sync-version.sh
```

**Problem:** Git tag already exists
```bash
# Solution: Delete tag and retry
git tag -d v4.43.0
npm run version:patch
```

---

### Validation Errors

**Problem:** YAML validation fails
```bash
# Solution: Format YAML files
npm run format
# Then validate again
npm run validate
```

**Problem:** Pre-commit hook blocks commit
```bash
# Solution: Fix the issues
npm run format    # Fix formatting
npm run lint:fix  # Fix linting
npm run validate  # Validate configs
```

---

### Flattener Issues

**Problem:** Flattener includes binary files
```bash
# Solution: Add to .gitignore or .cursorignore
echo "*.bin" >> .cursorignore
npm run flatten
```

**Problem:** Output file is too large
```bash
# Solution: Use filters in interactive mode
node tools/flattener/main.js
# Select smaller scope when prompted
```

---

## Support & Contribution

### Getting Help

- Check this README for tool documentation
- See individual tool files for detailed comments
- Check `package.json` scripts for command shortcuts
- See `installer/README.md` for installation help

### Contributing

When adding new tools:
1. ✅ Add to appropriate category in this README
2. ✅ Document usage and examples
3. ✅ Add NPM script shortcut if applicable
4. ✅ Include error handling
5. ✅ Add to troubleshooting section if needed

### Testing Tools

```bash
# Test build tools
npm run build
# Check dist/ directory for output

# Test validation
npm run validate

# Test version bumping (on a feature branch!)
git checkout -b test-version-bump
npm run version:patch
git log --oneline -5
```

---

## Quick Tips

💡 **Use NPM scripts**: Most tools have NPM script shortcuts - use `npm run <script>` instead of calling tools directly

💡 **Validate often**: Run `npm run validate` before committing to catch issues early

💡 **Build incrementally**: Use `--agents-only` or `--teams-only` flags for faster builds during development

💡 **Check versions**: Use `node --version` to ensure you're using Node >= 20.10.0

💡 **Git hooks**: Once setup, pre-commit hooks automatically validate - don't skip them!

💡 **Flattener**: Great for providing context to AI tools when asking for help

---

## License

Part of the BMAD™ (Brownfield Multi-Agent Development) ecosystem - see main LICENSE file.

---

**Remember**: These tools are here to make your development easier! Use them liberally and contribute improvements back to the ecosystem. 🚀

