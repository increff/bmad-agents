#!/usr/bin/env node

/**
 * BMAD Notion Command Dispatcher
 * Main entry point for all Notion integration commands
 * Routes commands to appropriate script handlers
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class NotionDispatcher {
    constructor() {
        this.scriptsDir = __dirname;
        this.workflowsDir = path.join(__dirname, '..', 'workflows');
        this.commands = {
            'notion_implement': 'notion-handler.js',
            'notion_fetch': 'notion-handler.js', 
            'notion_push': 'notion-push.js',
            'notion_test': 'notion-test.js',
            'notion_status': 'notion-status.js',
            'notion_list': 'notion-list.js',
            'notion_config': 'notion-config.js',
            'notion-help': 'notion-help.js',
            'help': 'notion-help.js'
        };
        
        // Workflow mappings
        this.workflows = {
            'notion_implement': 'notion-implement-workflow.yaml',
            'notion_fetch': 'notion-fetch-workflow.yaml',
            'notion_push': 'notion-push-workflow.yaml',
            'notion_test': 'notion-test-workflow.yaml',
            'notion_status': 'notion-status-workflow.yaml',
            'notion_list': 'notion-list-workflow.yaml'
        };
    }
    
    /**
     * Check if workflow mode is enabled
     */
    useWorkflow(args) {
        return args.includes('--workflow') || process.env.NOTION_USE_WORKFLOWS === 'true';
    }
    
    /**
     * Get workflow path for command
     */
    getWorkflowPath(command) {
        const workflowName = this.workflows[command];
        if (!workflowName) {
            return null;
        }
        
        const workflowPath = path.join(this.workflowsDir, workflowName);
        if (fs.existsSync(workflowPath)) {
            return workflowPath;
        }
        
        return null;
    }

    /**
     * Parse command and arguments
     */
    parseCommand(args) {
        if (args.length === 0) {
            return { command: 'notion-help', args: [] };
        }

        let command = args[0];
        let commandArgs = args.slice(1);

        // Handle command variations
        if (command.startsWith('*')) {
            command = command.substring(1);
        }

        // Map command aliases
        const aliases = {
            'help': 'notion-help',
            'test': 'notion_test',
            'status': 'notion_status',
            'list': 'notion_list',
            'config': 'notion_config',
            'push': 'notion_push',
            'fetch': 'notion_fetch',
            'implement': 'notion_implement'
        };

        if (aliases[command]) {
            command = aliases[command];
        }

        return { command, args: commandArgs };
    }

    /**
     * Get script path for command
     */
    getScriptPath(command) {
        const scriptName = this.commands[command];
        if (!scriptName) {
            return null;
        }

        // Check in scripts directory first
        let scriptPath = path.join(this.scriptsDir, scriptName);
        if (fs.existsSync(scriptPath)) {
            return scriptPath;
        }

        // Check in parent directory (for notion-handler.js)
        scriptPath = path.join(this.scriptsDir, '..', scriptName);
        if (fs.existsSync(scriptPath)) {
            return scriptPath;
        }

        return null;
    }

    /**
     * Execute command
     */
    async executeCommand(command, args) {
        const scriptPath = this.getScriptPath(command);
        
        if (!scriptPath) {
            console.error(`❌ Unknown command: ${command}`);
            console.log('\n💡 Available commands:');
            Object.keys(this.commands).forEach(cmd => {
                console.log(`   • ${cmd}`);
            });
            console.log('\n💡 Run *notion-help for detailed help');
            throw new Error(`Unknown command: ${command}`);
        }

        // Special handling for notion-handler.js commands
        if (scriptPath.endsWith('notion-handler.js')) {
            if (command === 'notion_implement') {
                args.unshift('implement');
            } else if (command === 'notion_fetch') {
                args.unshift('fetch');
            }
        }

        console.log(`🚀 Executing: ${command} ${args.join(' ')}`);
        
        return new Promise((resolve, reject) => {
            const child = spawn('node', [scriptPath, ...args], {
                stdio: 'inherit',
                cwd: path.dirname(scriptPath)
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve(code);
                } else {
                    reject(new Error(`Command failed with exit code ${code}`));
                }
            });

            child.on('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     * Display welcome message
     */
    displayWelcome() {
        console.log('👋 Welcome! I\'m the Notion Integrator\n');
        console.log('I can help you:');
        console.log('• Extract requirements from Notion (Request Description only)');
        console.log('• Execute VIRAT implementation workflows');
        console.log('• Push documentation back to III. DEVELOPMENT section\n');
        console.log('Running *notion-help for you...\n');
    }

    /**
     * Main dispatcher function
     */
    async dispatch(args) {
        try {
            // If no args provided, show welcome and help
            if (args.length === 0) {
                this.displayWelcome();
                await this.executeCommand('notion-help', []);
                return;
            }

            const { command, args: commandArgs } = this.parseCommand(args);
            
            // Handle special commands
            if (command === 'exit') {
                console.log('👋 Goodbye! Returning to BMAD...');
                return;
            }

            await this.executeCommand(command, commandArgs);
            
        } catch (error) {
            console.error('❌ Command execution failed:', error.message);
            throw error;
        }
    }

    /**
     * Interactive mode
     */
    async interactiveMode() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'notion> '
        });

        console.log('🎯 Notion Integrator - Interactive Mode');
        console.log('Type commands without the * prefix, or "help" for assistance');
        console.log('Type "exit" to quit\n');

        rl.prompt();

        rl.on('line', async (line) => {
            const input = line.trim();
            
            if (!input) {
                rl.prompt();
                return;
            }

            if (input === 'exit' || input === 'quit') {
                console.log('👋 Goodbye!');
                rl.close();
                return;
            }

            try {
                const args = input.split(' ').filter(arg => arg.length > 0);
                await this.dispatch(args);
            } catch (error) {
                console.error('❌ Error:', error.message);
            }

            console.log(''); // Add spacing
            rl.prompt();
        });

        rl.on('close', () => {
            console.log('\n👋 Goodbye!');
        });
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    const dispatcher = new NotionDispatcher();

    // Check for interactive mode
    if (args.includes('--interactive') || args.includes('-i')) {
        dispatcher.interactiveMode();
    } else {
        dispatcher.dispatch(args);
    }
}

module.exports = NotionDispatcher;
