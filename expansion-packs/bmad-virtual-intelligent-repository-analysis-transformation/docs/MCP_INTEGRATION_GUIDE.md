# VIRAT MCP Integration Guide

## Overview

VIRAT (Virtual Intelligent Repository Analysis and Transformation) has been enhanced with Model Context Protocol (MCP) tools to provide superior code analysis, pattern recognition, and implementation capabilities across Java, Python, and SQL repositories.

## MCP Tools Integration

### Available MCP Servers

1. **Java MCP Server** (`java-mcp`)
   - **Location**: `/Users/aryatupkary/node-java-mcp/`
   - **Tools**: `read_java_file`, `list_java_files`, `read_pom`, `find_java_class`, `maven_command`

2. **Python MCP Server** (`python-mcp`)
   - **Location**: `/Users/aryatupkary/python-mcp/`
   - **Tools**: `read_python_file`, `list_python_files`, `read_pyproject_toml`, `find_python_class`, `python_command`

3. **SQLite MCP Server** (`sqlite-mcp`)
   - **Tools**: `db_info`, `query`, `list_tables`, `get_table_schema`, `create_record`, `read_records`, `update_records`, `delete_records`

4. **SQLite Tools MCP Server** (`sqlite-tools-mcp`)
   - **Advanced Tools**: 20+ comprehensive database tools including transactions, schema management, and bulk operations

5. **Notion MCP Server** (`notion-mcp`)
   - **Official Notion Integration**: Comprehensive Notion API integration for pages, databases, and comments
   - **Tools**: Search, retrieve, create, update, and manage Notion content

## Enhanced VIRAT Capabilities

### 1. **MCP-Enhanced Repository Analysis**

#### Java Repository (irisx-algo)
```bash
*mcp-java-analyze
```
**Capabilities:**
- **Deep Code Analysis**: Read and analyze Java files with full understanding of class structures
- **Maven Integration**: Analyze `pom.xml` files to understand dependencies and build configurations
- **Pattern Discovery**: Automatically discover existing Java patterns like `AbstractUtilModuleGroup` implementations
- **Class Hierarchy Analysis**: Understand inheritance relationships and module dependencies
- **Code Generation**: Generate Java classes following discovered patterns

**Example Usage in VIRAT:**
```
# Analyze Java repository patterns
*mcp-java-analyze /Users/aryatupkary/irisx-algo

# Find specific Java classes
Use MCP Java tools to find ModuleProvider classes
Use MCP Java tools to analyze AbstractUtilModuleGroup implementations
```

#### Python Repository (ms-loadapis)
```bash
*mcp-python-analyze
```
**Capabilities:**
- **Module Structure Analysis**: Understand Python module organization and class structures
- **Dependency Management**: Read and analyze `requirements.txt` and `pyproject.toml` files
- **LoadAPI Pattern Discovery**: Discover existing LoadAPI patterns and denormalization logic
- **Function Analysis**: Analyze Python functions and their implementations
- **Code Implementation**: Generate Python code following existing patterns

**Example Usage in VIRAT:**
```
# Analyze Python repository patterns
*mcp-python-analyze /Users/aryatupkary/ms-loadapis

# Find LoadAPI patterns
Use MCP Python tools to find LoadAPI classes
Use MCP Python tools to analyze denormalization patterns
```

#### SQL/Configuration Repository (irisx-config)
```bash
*mcp-sql-analyze
```
**Capabilities:**
- **Database Schema Analysis**: Analyze SQLite database schemas and table structures
- **Query Execution**: Execute SQL queries to understand data patterns and relationships
- **Configuration Validation**: Validate SQL views, TSV templates, and JSON configurations
- **Data Operations**: Perform CRUD operations and data transformations
- **Schema Management**: Create and modify database schemas following existing patterns

**Example Usage in VIRAT:**
```
# Analyze database schemas
*mcp-sql-analyze

# Execute configuration queries
Use MCP SQL tools to analyze existing views
Use MCP SQL tools to understand data relationships
```

#### Notion Integration
```bash
*mcp-notion-analyze
```
**Capabilities:**
- **Requirement Extraction**: Search and retrieve Notion pages and databases for requirement context
- **Context Discovery**: Find related requirements, historical data, and additional context
- **Implementation Tracking**: Update Notion pages with implementation progress and results
- **Documentation Management**: Create and update Notion pages with implementation documentation
- **Collaboration**: Add comments, update properties, and link related pages
- **Status Management**: Update requirement status, completion dates, and workflow states

**Example Usage in VIRAT:**
```
# Search for related requirements in Notion
*mcp-notion-analyze

# Extract requirement context from Notion
Use MCP Notion tools to search for requirement by ID
Use MCP Notion tools to retrieve page content and comments
Use MCP Notion tools to query related databases
```

### 2. **Enhanced Implementation Workflow**

#### Phase 1: MCP-Enhanced Analysis
1. **Requirement Classification**: Use MCP tools to analyze existing code and classify requirements
2. **Pattern Discovery**: Automatically discover patterns across all three repositories
3. **Dependency Mapping**: Use MCP tools to map actual code dependencies and relationships

#### Phase 2: MCP-Guided Planning
1. **Implementation Planning**: Create plans based on discovered patterns using MCP analysis
2. **Risk Assessment**: Analyze potential impacts using MCP code analysis
3. **Testing Strategy**: Plan testing based on existing test patterns discovered by MCP tools

#### Phase 3: MCP-Enhanced Implementation
1. **Java Implementation**: Use MCP Java tools for pattern-aware code generation
2. **Python Implementation**: Use MCP Python tools for LoadAPI pattern implementation
3. **SQL Implementation**: Use MCP SQL tools for database schema and configuration changes
4. **Cross-Repository Validation**: Use all MCP tools to ensure consistency across repositories

#### Phase 4: MCP-Assisted Validation
1. **Code Validation**: Use MCP tools to validate implementations against existing patterns
2. **Test Execution**: Run tests using MCP tools (Maven for Java, Python test runners, SQL validations)
3. **Quality Assurance**: Comprehensive validation using all MCP tools

### 3. **New VIRAT Commands**

#### Core MCP Commands
- `*mcp-java-analyze`: Analyze Java repository using MCP Java tools
- `*mcp-python-analyze`: Analyze Python repository using MCP Python tools
- `*mcp-sql-analyze`: Analyze SQL/configuration repository using MCP SQL tools
- `*mcp-notion-analyze`: Analyze Notion pages and databases using MCP Notion tools
- `*mcp-deep-crawl`: Enhanced repository crawling using all MCP tools
- `*mcp-find-patterns`: Use MCP tools to find and analyze existing code patterns
- `*mcp-validate-implementation`: Use MCP tools to validate implementations

#### Enhanced Workflow Commands
- `*mcp-enhanced-repo-crawl`: Systematic repository crawling with MCP tools
- `*mcp-pattern-discovery`: Discover existing patterns using MCP analysis
- `*mcp-dependency-mapping`: Map dependencies using actual code analysis
- `*mcp-guided-development`: Pattern-aware code generation using MCP tools
- `*mcp-cross-repo-validation`: Validate consistency across all repositories
- `*mcp-test-execution`: Execute comprehensive testing using MCP tools

### 4. **Benefits of MCP Integration**

#### **Superior Code Understanding**
- **Actual Code Analysis**: MCP tools read and understand actual code, not just file structures
- **Pattern Recognition**: Automatically discover and follow existing architectural patterns
- **Dependency Mapping**: Understand real code dependencies through import analysis

#### **Enhanced Implementation Quality**
- **Pattern Compliance**: Generate code that follows discovered patterns automatically
- **Validation**: Validate implementations against existing code patterns
- **Testing**: Execute actual tests using appropriate tools (Maven, Python test runners, SQL)

#### **Improved Efficiency**
- **Automated Analysis**: Reduce manual code analysis time
- **Pattern-Aware Generation**: Generate code that fits existing architecture
- **Cross-Repository Consistency**: Ensure consistency across all three repositories

#### **Better Error Prevention**
- **Pre-Implementation Validation**: Validate plans against existing code before implementation
- **Pattern Compliance**: Ensure new code follows existing patterns
- **Comprehensive Testing**: Execute thorough testing using appropriate tools

### 5. **Usage Examples**

#### Implementing a New Java Module
```bash
# 1. Analyze existing Java patterns
*mcp-java-analyze

# 2. Discover module patterns
Use MCP Java tools to analyze AbstractUtilModuleGroup implementations
Use MCP Java tools to find ModuleProvider patterns

# 3. Implement new module following patterns
*mcp-guided-development
```

#### Implementing a New LoadAPI
```bash
# 1. Analyze existing Python patterns
*mcp-python-analyze

# 2. Discover LoadAPI patterns
Use MCP Python tools to analyze existing LoadAPI classes
Use MCP Python tools to understand denormalization patterns

# 3. Implement new LoadAPI following patterns
*mcp-python-implementation
```

#### Implementing Database Changes
```bash
# 1. Analyze existing database schema
*mcp-sql-analyze

# 2. Understand existing patterns
Use MCP SQL tools to analyze table structures
Use MCP SQL tools to understand view patterns

# 3. Implement database changes
*mcp-sql-implementation
```

### 6. **Configuration Requirements**

#### Cursor MCP Configuration
Ensure your `~/.cursor/mcp.json` includes:
```json
{
  "mcpServers": {
    "java-mcp": {
      "command": "node",
      "args": ["/Users/aryatupkary/node-java-mcp/index.js"]
    },
    "python-mcp": {
      "command": "/Users/aryatupkary/python-mcp/venv/bin/python",
      "args": ["/Users/aryatupkary/python-mcp/fast_python_mcp.py"]
    },
    "sqlite-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-sqlite"]
    },
    "sqlite-tools-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-sqlite-tools"]
    },
    "notion-mcp": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"]
    }
  }
}
```

#### Repository Paths
Ensure VIRAT has access to:
- **Java Repository**: `/Users/aryatupkary/irisx-algo`
- **Python Repository**: `/Users/aryatupkary/ms-loadapis`
- **Config Repository**: `/Users/aryatupkary/irisx-config`

### 7. **Best Practices**

#### **MCP Tool Usage**
1. **Always Analyze First**: Use MCP tools to understand existing patterns before implementing
2. **Follow Discovered Patterns**: Generate code that follows patterns discovered by MCP analysis
3. **Validate Continuously**: Use MCP tools to validate implementations at each step
4. **Test Comprehensively**: Use MCP tools to execute appropriate tests for each technology

#### **Repository Management**
1. **Environment-Specific Branches**: Ensure MCP analysis uses correct environment branches
2. **Cross-Repository Consistency**: Use MCP tools to ensure consistency across all repositories
3. **Pattern Compliance**: Validate all implementations against discovered patterns

#### **Quality Assurance**
1. **Pre-Implementation Validation**: Validate plans using MCP analysis before implementation
2. **Pattern Verification**: Ensure new code follows existing architectural patterns
3. **Comprehensive Testing**: Execute thorough testing using MCP tools

## Conclusion

The integration of MCP tools into VIRAT provides unprecedented code understanding and implementation capabilities. By leveraging actual code analysis, pattern discovery, and automated validation, VIRAT can now implement requirements with superior quality, consistency, and efficiency across all three repositories.

The MCP-enhanced VIRAT represents a significant advancement in automated development workflows, providing developers with intelligent, pattern-aware code generation and validation capabilities that ensure high-quality implementations while maintaining architectural consistency.
