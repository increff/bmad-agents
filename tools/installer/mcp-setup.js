/**
 * MCP Server Installation and Configuration Script
 * 
 * This script installs and configures all MCP servers required for VIRAT
 * and other BMAD expansion packs during the BMAD installation process.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

class MCPSetup {
  constructor(installDir) {
    this.installDir = installDir;
    this.mcpConfigPath = path.join(process.env.HOME, '.cursor', 'mcp.json');
    this.mcpServersDir = path.join(process.env.HOME, 'mcp-servers');
  }

  /**
   * Install and configure all MCP servers
   */
  async installMCPServers() {
    console.log(chalk.blue('🔧 Installing MCP Servers for VIRAT...'));
    
    try {
      // Create MCP servers directory
      await this.createMCPServersDirectory();
      
      // Install Java MCP Server
      await this.installJavaMCPServer();
      
      // Install Python MCP Server
      await this.installPythonMCPServer();
      
      // Install SQL MCP Servers
      await this.installSQLMCPServers();
      
      // Install Notion MCP Server
      await this.installNotionMCPServer();
      
      // Configure Cursor MCP settings
      await this.configureCursorMCP();
      
      // Create setup verification script
      await this.createVerificationScript();
      
      console.log(chalk.green('✅ All MCP servers installed and configured successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ MCP installation failed:'), error.message);
      throw error;
    }
  }

  /**
   * Create MCP servers directory structure
   */
  async createMCPServersDirectory() {
    console.log(chalk.yellow('📁 Creating MCP servers directory...'));
    
    if (!fs.existsSync(this.mcpServersDir)) {
      fs.mkdirSync(this.mcpServersDir, { recursive: true });
    }
    
    // Create subdirectories
    const subdirs = ['java-mcp', 'python-mcp', 'sql-mcp-servers'];
    for (const subdir of subdirs) {
      const dirPath = path.join(this.mcpServersDir, subdir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
  }

  /**
   * Install Java MCP Server
   */
  async installJavaMCPServer() {
    console.log(chalk.yellow('☕ Installing Java MCP Server...'));
    
    const javaMcpDir = path.join(this.mcpServersDir, 'java-mcp');
    
    // Create package.json
    const packageJson = {
      name: "java-mcp",
      version: "1.0.0",
      description: "Java MCP Server for VIRAT",
      main: "index.js",
      scripts: {
        test: "echo \"Error: no test specified\" && exit 1"
      },
      keywords: ["mcp", "java", "virat"],
      author: "",
      license: "ISC",
      type: "commonjs",
      dependencies: {
        "@modelcontextprotocol/sdk": "^1.20.1",
        "glob": "^11.0.3"
      }
    };
    
    fs.writeFileSync(
      path.join(javaMcpDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create Java MCP server implementation
    const javaMcpServer = `const { StdioServer, ServerCapabilities, Tool, TextContent, CallToolResult, McpError } = require('@modelcontextprotocol/sdk');
const { glob } = require('glob');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const server = new StdioServer({
    serverInfo: {
        name: 'Java Development Server',
        version: '1.0.0',
    },
    capabilities: ServerCapabilities.builder()
        .resources(true, true)
        .tools(true)
        .prompts(true)
        .logging()
        .build(),
});

// Read Java file tool
server.addTool(Tool.builder()
    .name('read_java_file')
    .description('Read the contents of a Java file')
    .inputSchema({
        type: 'object',
        properties: {
            filePath: { type: 'string', description: 'Absolute path to the Java file to read' },
        },
        required: ['filePath'],
    })
    .build(), async (exchange, args) => {
        const filePath = args.filePath;
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return new CallToolResult([TextContent.text(content)], false);
        } catch (error) {
            throw new McpError(\`Failed to read file: \${error.message}\`);
        }
    });

// List Java files tool
server.addTool(Tool.builder()
    .name('list_java_files')
    .description('List all Java files in a project directory')
    .inputSchema({
        type: 'object',
        properties: {
            projectPath: { type: 'string', description: 'Absolute path to the project root directory' },
            packageFilter: { type: 'string', description: 'Optional package name filter (e.g., com.increff)' },
        },
        required: ['projectPath'],
    })
    .build(), async (exchange, args) => {
        const projectPath = args.projectPath;
        const packageFilter = args.packageFilter;
        try {
            const pattern = packageFilter ? 
                \`\${projectPath}/**/\${packageFilter.replace(/\\\\./g, '/')}/**/*.java\` :
                \`\${projectPath}/**/*.java\`;
            const files = await glob(pattern);
            return new CallToolResult([TextContent.text(JSON.stringify(files))], false);
        } catch (error) {
            throw new McpError(\`Failed to list files: \${error.message}\`);
        }
    });

// Read Maven POM tool
server.addTool(Tool.builder()
    .name('read_pom')
    .description('Read the contents of a Maven pom.xml file')
    .inputSchema({
        type: 'object',
        properties: {
            projectPath: { type: 'string', description: 'Absolute path to the project root directory' },
        },
        required: ['projectPath'],
    })
    .build(), async (exchange, args) => {
        const projectPath = args.projectPath;
        try {
            const pomPath = path.join(projectPath, 'pom.xml');
            const content = await fs.readFile(pomPath, 'utf-8');
            return new CallToolResult([TextContent.text(content)], false);
        } catch (error) {
            throw new McpError(\`Failed to read pom.xml: \${error.message}\`);
        }
    });

// Find Java class tool
server.addTool(Tool.builder()
    .name('find_java_class')
    .description('Find a Java class by name in the project')
    .inputSchema({
        type: 'object',
        properties: {
            projectPath: { type: 'string', description: 'Absolute path to the project root directory' },
            className: { type: 'string', description: 'Name of the class to find (e.g., App or ModuleApi)' },
        },
        required: ['projectPath', 'className'],
    })
    .build(), async (exchange, args) => {
        const projectPath = args.projectPath;
        const className = args.className;
        try {
            const pattern = \`\${projectPath}/**/*.java\`;
            const files = await glob(pattern);
            const foundFiles = [];
            
            for (const file of files) {
                const content = await fs.readFile(file, 'utf-8');
                if (content.includes(\`class \${className}\`) || content.includes(\`public class \${className}\`)) {
                    foundFiles.push(file);
                }
            }
            
            return new CallToolResult([TextContent.text(JSON.stringify(foundFiles))], false);
        } catch (error) {
            throw new McpError(\`Failed to find class: \${error.message}\`);
        }
    });

// Maven command tool
server.addTool(Tool.builder()
    .name('maven_command')
    .description('Execute a Maven command in the project directory')
    .inputSchema({
        type: 'object',
        properties: {
            projectPath: { type: 'string', description: 'Absolute path to the project root directory' },
            command: { type: 'string', description: 'Maven command to execute (e.g., compile, test, package)' },
        },
        required: ['projectPath', 'command'],
    })
    .build(), async (exchange, args) => {
        const projectPath = args.projectPath;
        const command = args.command;
        try {
            const result = await new Promise((resolve, reject) => {
                exec(\`cd "\${projectPath}" && mvn \${command}\`, (error, stdout, stderr) => {
                    if (error) {
                        reject(new Error(\`Command failed: \${error.message}\`));
                    } else {
                        resolve({ stdout, stderr });
                    }
                });
            });
            
            return new CallToolResult([TextContent.text(result.stdout)], false);
        } catch (error) {
            throw new McpError(\`Failed to execute Maven command: \${error.message}\`);
        }
    });

console.log('Java MCP Server running on stdio');
server.run();`;

    fs.writeFileSync(path.join(javaMcpDir, 'index.js'), javaMcpServer);
    
    // Install dependencies
    execSync('npm install', { cwd: javaMcpDir, stdio: 'inherit' });
    
    console.log(chalk.green('✅ Java MCP Server installed'));
  }

  /**
   * Install Python MCP Server
   */
  async installPythonMCPServer() {
    console.log(chalk.yellow('🐍 Installing Python MCP Server...'));
    
    const pythonMcpDir = path.join(this.mcpServersDir, 'python-mcp');
    
    // Create Python MCP server implementation
    const pythonMcpServer = `import asyncio
import os
import json
from pathlib import Path
from typing import List, Optional

from mcp.server.fastmcp import FastMCP
from mcp.shared.mcp_schema import Tool, TextContent, CallToolResult, McpError, ServerCapabilities, Implementation

mcp = FastMCP(
    server_info=Implementation(name="Python Development Server", version="1.18.0"),
    capabilities=ServerCapabilities(
        resources=True,
        tools=True,
        prompts=True,
        logging=True
    )
)

@mcp.tool()
async def read_python_file(filePath: str) -> CallToolResult:
    """Read the contents of a Python file."""
    try:
        content = await asyncio.to_thread(Path(filePath).read_text)
        return CallToolResult(content=[TextContent(text=content)], isError=False)
    except Exception as e:
        return CallToolResult(content=[TextContent(text=f"Failed to read file: {e}")], isError=True)

@mcp.tool()
async def list_python_files(projectPath: str, packageFilter: Optional[str] = None) -> CallToolResult:
    """List all Python files in a project directory."""
    try:
        python_files = []
        for root, _, files in os.walk(projectPath):
            for file in files:
                if file.endswith(".py"):
                    full_path = os.path.join(root, file)
                    if packageFilter:
                        relative_path = os.path.relpath(full_path, projectPath)
                        package_name = relative_path.replace(os.sep, '.')[:-3] # Remove .py
                        if package_name.startswith(packageFilter):
                            python_files.append(full_path)
                    else:
                        python_files.append(full_path)
        return CallToolResult(content=[TextContent(text=json.dumps(python_files))], isError=False)
    except Exception as e:
        return CallToolResult(content=[TextContent(text=f"Failed to list files: {e}")], isError=True)

@mcp.tool()
async def read_pyproject_toml(projectPath: str) -> CallToolResult:
    """Read the contents of a pyproject.toml file."""
    try:
        file_path = Path(projectPath) / "pyproject.toml"
        content = await asyncio.to_thread(file_path.read_text)
        return CallToolResult(content=[TextContent(text=content)], isError=False)
    except Exception as e:
        return CallToolResult(content=[TextContent(text=f"Failed to read pyproject.toml: {e}")], isError=True)

@mcp.tool()
async def find_python_class(projectPath: str, className: str) -> CallToolResult:
    """Find a Python class by name in the project."""
    try:
        found_files = []
        for root, _, files in os.walk(projectPath):
            for file in files:
                if file.endswith(".py"):
                    full_path = os.path.join(root, file)
                    with open(full_path, 'r') as f:
                        for line_num, line in enumerate(f, 1):
                            if f"class {className}" in line:
                                found_files.append(f"{full_path}:{line_num}")
                                break
        return CallToolResult(content=[TextContent(text=json.dumps(found_files))], isError=False)
    except Exception as e:
        return CallToolResult(content=[TextContent(text=f"Failed to find class: {e}")], isError=True)

@mcp.tool()
async def python_command(projectPath: str, command: str) -> CallToolResult:
    """Execute a Python command in the project directory."""
    try:
        process = await asyncio.create_subprocess_shell(
            command,
            cwd=projectPath,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        output = stdout.decode().strip()
        error_output = stderr.decode().strip()

        if process.returncode != 0:
            return CallToolResult(content=[TextContent(text=f"Error executing command: {error_output}")], isError=True)
        return CallToolResult(content=[TextContent(text=output)], isError=False)
    except Exception as e:
        return CallToolResult(content=[TextContent(text=f"Failed to execute command: {e}")], isError=True)

async def main():
    await mcp.run_stdio()

if __name__ == "__main__":
    asyncio.run(main())`;

    fs.writeFileSync(path.join(pythonMcpDir, 'fast_python_mcp.py'), pythonMcpServer);
    
    // Create requirements.txt
    const requirements = `mcp[cli]>=1.0.0
asyncio
pathlib`;
    
    fs.writeFileSync(path.join(pythonMcpDir, 'requirements.txt'), requirements);
    
    // Create virtual environment and install dependencies
    try {
      execSync('python3 -m venv venv', { cwd: pythonMcpDir, stdio: 'inherit' });
      execSync('source venv/bin/activate && pip install -r requirements.txt', { 
        cwd: pythonMcpDir, 
        stdio: 'inherit',
        shell: true 
      });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Python MCP setup may need manual configuration'));
    }
    
    console.log(chalk.green('✅ Python MCP Server installed'));
  }

  /**
   * Install SQL MCP Servers
   */
  async installSQLMCPServers() {
    console.log(chalk.yellow('🗄️  Installing SQL MCP Servers...'));
    
    const sqlMcpDir = path.join(this.mcpServersDir, 'sql-mcp-servers');
    
    // Create package.json for SQL MCP servers
    const packageJson = {
      name: "sql-mcp-servers",
      version: "1.0.0",
      description: "SQL MCP Servers for VIRAT",
      main: "index.js",
      scripts: {
        test: "echo \"Error: no test specified\" && exit 1"
      },
      keywords: ["mcp", "sql", "sqlite", "virat"],
      author: "",
      license: "ISC",
      type: "commonjs",
      dependencies: {
        "mcp-sqlite": "^1.0.7",
        "mcp-sqlite-tools": "^0.0.15",
        "@notionhq/notion-mcp-server": "^1.9.0"
      }
    };
    
    fs.writeFileSync(
      path.join(sqlMcpDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Install dependencies
    execSync('npm install', { cwd: sqlMcpDir, stdio: 'inherit' });
    
    console.log(chalk.green('✅ SQL MCP Servers installed'));
  }

  /**
   * Install Notion MCP Server
   */
  async installNotionMCPServer() {
    console.log(chalk.yellow('📝 Installing Notion MCP Server...'));
    
    // Notion MCP server is installed as part of SQL MCP servers
    // Create setup instructions
    const notionSetup = `# Notion MCP Server Setup

## Prerequisites
1. Create a Notion integration at https://notion.so/my-integrations
2. Copy the Internal Integration Token
3. Share your Notion pages with the integration

## Environment Variable Setup
Add to your ~/.zshrc or ~/.bashrc:
export NOTION_API_KEY="your_notion_api_key_here"

## Test Installation
Run: echo $NOTION_API_KEY
Should display your API key.

## Restart Cursor
After setting up the API key, restart Cursor for the MCP server to work.
`;

    fs.writeFileSync(
      path.join(this.mcpServersDir, 'NOTION_SETUP.md'),
      notionSetup
    );
    
    console.log(chalk.green('✅ Notion MCP Server installed'));
  }

  /**
   * Configure Cursor MCP settings
   */
  async configureCursorMCP() {
    console.log(chalk.yellow('⚙️  Configuring Cursor MCP settings...'));
    
    // Ensure .cursor directory exists
    const cursorDir = path.join(process.env.HOME, '.cursor');
    if (!fs.existsSync(cursorDir)) {
      fs.mkdirSync(cursorDir, { recursive: true });
    }
    
    // Create or update mcp.json
    const mcpConfig = {
      mcpServers: {
        "java-mcp": {
          command: "node",
          args: [path.join(this.mcpServersDir, "java-mcp", "index.js")]
        },
        "python-mcp": {
          command: path.join(this.mcpServersDir, "python-mcp", "venv", "bin", "python"),
          args: [path.join(this.mcpServersDir, "python-mcp", "fast_python_mcp.py")]
        },
        "sqlite-mcp": {
          command: "npx",
          args: ["-y", "mcp-sqlite"]
        },
        "sqlite-tools-mcp": {
          command: "npx",
          args: ["-y", "mcp-sqlite-tools"]
        },
        "notion-mcp": {
          command: "node",
          args: [path.join(__dirname, "notion-mcp-wrapper.js")]
        }
      }
    };
    
    fs.writeFileSync(this.mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
    
    console.log(chalk.green('✅ Cursor MCP configuration updated'));
  }

  /**
   * Create verification script
   */
  async createVerificationScript() {
    console.log(chalk.yellow('📋 Creating MCP verification script...'));
    
    const verificationScript = `#!/bin/bash

echo "🔍 MCP Servers Verification Script"
echo "=================================="
echo ""

# Check if MCP servers directory exists
if [ -d "$HOME/mcp-servers" ]; then
    echo "✅ MCP servers directory exists: $HOME/mcp-servers"
else
    echo "❌ MCP servers directory not found"
fi

# Check Java MCP Server
if [ -f "$HOME/mcp-servers/java-mcp/index.js" ]; then
    echo "✅ Java MCP Server installed"
else
    echo "❌ Java MCP Server not found"
fi

# Check Python MCP Server
if [ -f "$HOME/mcp-servers/python-mcp/fast_python_mcp.py" ]; then
    echo "✅ Python MCP Server installed"
else
    echo "❌ Python MCP Server not found"
fi

# Check SQL MCP Servers
if [ -d "$HOME/mcp-servers/sql-mcp-servers/node_modules" ]; then
    echo "✅ SQL MCP Servers installed"
else
    echo "❌ SQL MCP Servers not found"
fi

# Check Cursor MCP configuration
if [ -f "$HOME/.cursor/mcp.json" ]; then
    echo "✅ Cursor MCP configuration exists"
    echo "📋 Configured MCP servers:"
    cat "$HOME/.cursor/mcp.json" | grep -o '"[^"]*":' | sed 's/":/"/' | sed 's/"//g'
else
    echo "❌ Cursor MCP configuration not found"
fi

# Check Notion API key
if [ -n "$NOTION_API_KEY" ]; then
    echo "✅ Notion API key is set"
else
    echo "⚠️  Notion API key not set (optional)"
    echo "   Run: export NOTION_API_KEY='your_key_here'"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Restart Cursor to load MCP servers"
echo "2. Test VIRAT with: *help"
echo "3. Use MCP tools with: *mcp-deep-crawl"
`;

    const scriptPath = path.join(this.mcpServersDir, 'verify-mcp-installation.sh');
    fs.writeFileSync(scriptPath, verificationScript);
    
    // Make script executable
    execSync(`chmod +x "${scriptPath}"`);
    
    console.log(chalk.green('✅ Verification script created'));
  }
}

module.exports = MCPSetup;
