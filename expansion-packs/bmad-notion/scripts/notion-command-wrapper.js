/* eslint-env node */

/**
 * BMAD Notion Command Wrapper
 * This script is triggered when *notion-fetch or *notion-implement commands are used
 * It parses the command and delegates to the appropriate handler
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Parse command line arguments to extract command and parameters
 */
function parseCommand(args) {
    const fullCommand = args.join(' ');
    
    // Extract command type
    let command = '';
    let pageIdentifier = '';
    let options = [];
    
    if (fullCommand.includes('*notion-fetch') || fullCommand.includes('notion-fetch')) {
        command = 'fetch';
        // Extract page identifier after the command
        const parts = fullCommand.split(/\*?notion-fetch\s+/);
        if (parts.length > 1) {
            const remaining = parts[1].trim().split(' ');
            pageIdentifier = remaining[0];
            options = remaining.slice(1);
        }
    } else if (fullCommand.includes('*notion-implement') || fullCommand.includes('notion-implement')) {
        command = 'implement';
        // Extract page identifier after the command
        const parts = fullCommand.split(/\*?notion-implement\s+/);
        if (parts.length > 1) {
            const remaining = parts[1].trim().split(' ');
            pageIdentifier = remaining[0];
            options = remaining.slice(1);
        }
    }
    
    return { command, pageIdentifier, options };
}

/**
 * Execute the notion handler with parsed arguments
 */
function executeNotionHandler(command, pageIdentifier, options = []) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'notion-handler.js');
        
        // Check if the handler script exists
        if (!fs.existsSync(scriptPath)) {
            reject(new Error(`Notion handler script not found: ${scriptPath}`));
            return;
        }
        
        // Prepare arguments
        const args = [scriptPath, command];
        if (pageIdentifier) {
            args.push(pageIdentifier);
        }
        args.push(...options);
        
        console.log(`🚀 Executing: node ${args.join(' ')}`);
        
        // Spawn the process
        const child = spawn('node', args, {
            stdio: 'inherit',
            cwd: __dirname
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Notion handler exited with code ${code}`));
            }
        });
        
        child.on('error', (error) => {
            reject(new Error(`Failed to start notion handler: ${error.message}`));
        });
    });
}

/**
 * Main execution function
 */
async function main() {
    try {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            console.log('BMAD Notion Command Wrapper');
            console.log('');
            console.log('This script is triggered by BMAD when notion commands are used.');
            console.log('');
            console.log('Supported commands:');
            console.log('  *notion-fetch <page_url_or_id> [--dry-run]');
            console.log('  *notion-implement <page_url_or_id>');
            console.log('');
            return;
        }
        
        const { command, pageIdentifier, options } = parseCommand(args);
        
        if (!command) {
            console.error('❌ Error: No valid notion command found in arguments');
            console.log('Arguments received:', args);
            throw new Error('No valid notion command found in arguments');
        }
        
        if (!pageIdentifier) {
            console.error(`❌ Error: Page identifier required for ${command} command`);
            console.log('Usage: *notion-' + command + ' <page_url_or_id>');
            throw new Error(`Page identifier required for ${command} command`);
        }
        
        console.log(`📋 Command: ${command}`);
        console.log(`🔗 Page: ${pageIdentifier}`);
        if (options.length > 0) {
            console.log(`⚙️  Options: ${options.join(', ')}`);
        }
        
        await executeNotionHandler(command, pageIdentifier, options);
        
        console.log('✅ Command completed successfully');
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

// Export for testing
module.exports = { parseCommand, executeNotionHandler };

// Run if called directly
if (require.main === module) {
    main();
}
