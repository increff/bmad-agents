/**
 * Notion MCP Server Wrapper
 * 
 * This wrapper script loads environment variables from .env file
 * and then starts the Notion MCP server.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load .env file if it exists
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    // Set environment variables
    Object.assign(process.env, envVars);
  }
}

// Load environment variables
loadEnvFile();

// Start the Notion MCP server
const notionMcp = spawn('npx', ['-y', '@notionhq/notion-mcp-server'], {
  stdio: 'inherit',
  env: process.env
});

notionMcp.on('error', (error) => {
  console.error('Failed to start Notion MCP server:', error);
  process.exit(1);
});

notionMcp.on('close', (code) => {
  process.exit(code);
});
