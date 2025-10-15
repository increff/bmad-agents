#!/usr/bin/env node

/**
 * BMAD Notion Help Script
 * Shows detailed help for all Notion integration commands
 */

class NotionHelp {
    constructor() {
        this.commands = this.getCommandDefinitions();
    }

    /**
     * Get all command definitions
     */
    getCommandDefinitions() {
        return {
            'notion_implement': {
                purpose: 'Extract requirement from Notion and execute complete VIRAT implementation',
                usage: '*notion_implement <page_url_or_id>',
                args: [
                    { name: 'page_url_or_id', required: true, description: 'Notion page URL or requirement ID' }
                ],
                options: [
                    { flag: '--dry-run', description: 'Preview extraction without implementing' },
                    { flag: '--no-push', description: 'Skip automatic documentation push' },
                    { flag: '--verbose', description: 'Show detailed logs' }
                ],
                examples: [
                    '*notion_implement REQ-994',
                    '*notion_implement https://notion.so/workspace/REQ-994-abc123',
                    '*notion_implement REQ-994 --dry-run',
                    '*notion_implement REQ-994 --no-push'
                ],
                category: 'core'
            },
            'notion_push': {
                purpose: 'Push generated documentation to section below Comments',
                usage: '*notion_push [page_url_or_id]',
                args: [
                    { name: 'page_url_or_id', required: false, description: 'Notion page URL or requirement ID (auto-detect if not provided)' }
                ],
                options: [
                    { flag: '--files "file1,file2"', description: 'Push specific files only' },
                    { flag: '--format blocks', description: 'Upload as blocks (default) or attachments' }
                ],
                examples: [
                    '*notion_push',
                    '*notion_push REQ-994',
                    '*notion_push REQ-994 --files "PLAN.md,CHANGELOG.md"',
                    '*notion_push https://notion.so/...'
                ],
                category: 'core'
            },
            'notion_status': {
                purpose: 'Show current integration status and last operation',
                usage: '*notion_status',
                args: [],
                options: [],
                examples: ['*notion_status'],
                category: 'utility'
            },
            'notion_test': {
                purpose: 'Test Notion API connectivity and verify credentials',
                usage: '*notion_test',
                args: [],
                options: [],
                examples: ['*notion_test'],
                category: 'utility'
            },
            'notion_fetch': {
                purpose: 'Preview requirement extraction without implementing',
                usage: '*notion_fetch <page_url_or_id>',
                args: [
                    { name: 'page_url_or_id', required: true, description: 'Notion page URL or requirement ID' }
                ],
                options: [
                    { flag: '--dry-run', description: 'Show what would be extracted' }
                ],
                examples: [
                    '*notion_fetch REQ-994',
                    '*notion_fetch REQ-994 --dry-run'
                ],
                category: 'utility'
            },
            'notion_list': {
                purpose: 'List recent requirements from Notion database',
                usage: '*notion_list',
                args: [],
                options: [
                    { flag: '--limit N', description: 'Limit number of results (default: 20)' },
                    { flag: '--detailed', description: 'Show detailed information' },
                    { flag: '--filter type value', description: 'Filter by status, priority, lead, or stage' },
                    { flag: '--search term', description: 'Search by requirement ID or title' }
                ],
                examples: [
                    '*notion_list',
                    '*notion_list --limit 10',
                    '*notion_list --detailed',
                    '*notion_list --filter status active',
                    '*notion_list --search REQ-994'
                ],
                category: 'utility'
            },
            'notion_config': {
                purpose: 'Show current configuration and field mappings',
                usage: '*notion_config',
                args: [],
                options: [
                    { flag: 'set KEY VALUE', description: 'Update configuration value' }
                ],
                examples: [
                    '*notion_config',
                    '*notion_config set NOTION_API_KEY secret_...'
                ],
                category: 'utility'
            },
            'notion-help': {
                purpose: 'Show this help message',
                usage: '*notion-help',
                args: [],
                options: [
                    { flag: '--command CMD', description: 'Show help for specific command' }
                ],
                examples: [
                    '*notion-help',
                    '*notion-help --command notion_implement'
                ],
                category: 'utility'
            },
            'exit': {
                purpose: 'Exit Notion Integrator and return to BMAD',
                usage: '*exit',
                args: [],
                options: [],
                examples: ['*exit'],
                category: 'utility'
            }
        };
    }

    /**
     * Display full help
     */
    displayFullHelp() {
        console.log('📝 NOTION INTEGRATION - Available Commands\n');
        console.log('═'.repeat(65));

        // Core Commands
        console.log('\n🚀 CORE COMMANDS\n');
        this.displayCommandsByCategory('core');

        // Utility Commands
        console.log('\n🔧 UTILITY COMMANDS\n');
        this.displayCommandsByCategory('utility');

        // Extraction Rules
        console.log('\n═'.repeat(65));
        console.log('\n📋 WHAT GETS EXTRACTED');
        console.log('• **Requirement ID** (No ID field) - to locate the page');
        console.log('• **Page Content** - extracted from blocks below Comments section');
        console.log('• **Preserves formatting** - headings, paragraphs, lists, etc.');

        console.log('\n❌ WHAT DOES NOT GET EXTRACTED');
        console.log('• Metadata blocks (stage indicators, "Things to keep in mind", etc.)');
        console.log('• Main requirement sections (I. REQUIREMENT, II. SOLUTION, III. DEVELOPMENT, IV. RELEASE)');
        console.log('• Property fields (Title, Stage, Phase, Status, Priority, Lead, etc.)');

        console.log('\n📤 WHERE DOCUMENTATION IS PUSHED');
        console.log('• **Below Comments section** (same location as extraction)');
        console.log('• As nested toggle blocks');
        console.log('• Does NOT update any page properties');

        // Quick Start
        console.log('\n═'.repeat(65));
        console.log('\n💡 QUICK START\n');
        console.log('1. **Test connection:**');
        console.log('   *notion_test');
        console.log('');
        console.log('2. **Extract and implement:**');
        console.log('   *notion_implement REQ-994');
        console.log('');
        console.log('3. **Documentation automatically pushed below Comments section**');

        // Setup Requirements
        console.log('\n🔧 SETUP REQUIREMENTS\n');
        console.log('**Environment Variables (.env file):**');
        console.log('```env');
        console.log('NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx');
        console.log('NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log('NOTION_VIEW_ID=xxxxxxxxxxxx  # Optional');
        console.log('```');
        console.log('');
        console.log('**Installation:**');
        console.log('```bash');
        console.log('cd expansion-packs/bmad-notion');
        console.log('./install.sh');
        console.log('```');

        // Workflow Example
        console.log('\n🔄 COMPLETE WORKFLOW EXAMPLE\n');
        console.log('```bash');
        console.log('# Step 0: Activate Notion Integrator');
        console.log('@notion');
        console.log('');
        console.log('# Step 1: Extract requirement from Notion and implement');
        console.log('*notion_implement REQ-994');
        console.log('');
        console.log('# BMAD extracts content from page blocks (below Comments):');
        console.log('# 1. Multiple ROS periods & factorization');
        console.log('# 2. Closing WH stock combine in Reordering');
        console.log('# 3. MOQ bound Reorder Qty');
        console.log('# (Stops at metadata blocks and main requirement sections)');
        console.log('');
        console.log('# Step 2: VIRAT automatically:');
        console.log('# - Analyzes requirement');
        console.log('# - Crawls repositories');
        console.log('# - Creates implementation plan');
        console.log('# - Executes implementation');
        console.log('# - Generates documentation');
        console.log('');
        console.log('# Step 3: Push documentation back to Notion (below Comments section)');
        console.log('*notion_push REQ-994');
        console.log('');
        console.log('# Uploads below Comments section (same location as extraction):');
        console.log('# - 📋 Implementation Complete - [date]');
        console.log('#   ├─ REQUIREMENT_ANALYSIS.md');
        console.log('#   ├─ IMPLEMENTATION_PLAN.md');
        console.log('#   ├─ ALGORITHM_CHANGES.md');
        console.log('#   ├─ LOADAPI_CHANGES.md');
        console.log('#   ├─ CONFIG_CHANGES.md');
        console.log('#   └─ CHANGELOG.md');
        console.log('```');

        // Additional Documentation
        console.log('\n📚 ADDITIONAL DOCUMENTATION\n');
        console.log('For detailed setup and configuration:');
        console.log('• **COMPLETE_DOCUMENTATION.md** - Full feature reference');
        console.log('• **Quickstart Guide** - 5-minute setup instructions');
        console.log('• **JavaScript Integration** - API handler details');

        console.log('\n═'.repeat(65));
        console.log('\n**Ready for your command!** Type any of the commands above to get started with Notion integration.');
    }

    /**
     * Display commands by category
     */
    displayCommandsByCategory(category) {
        const commands = Object.entries(this.commands)
            .filter(([, cmd]) => cmd.category === category);

        commands.forEach(([, cmd], index) => {
            console.log(`${index + 1}. **${cmd.usage}**`);
            console.log(`   ${cmd.purpose}`);
            console.log('');
            
            if (cmd.examples.length > 0) {
                console.log('   Examples:');
                cmd.examples.forEach(example => {
                    console.log(`   • ${example}`);
                });
                console.log('');
            }
            
            if (cmd.options.length > 0) {
                console.log('   Options:');
                cmd.options.forEach(option => {
                    console.log(`   ${option.flag.padEnd(20)} ${option.description}`);
                });
                console.log('');
            }
        });
    }

    /**
     * Display help for specific command
     */
    displayCommandHelp(commandName) {
        const cmd = this.commands[commandName];
        
        if (!cmd) {
            console.log(`❌ Unknown command: ${commandName}`);
            console.log('\nAvailable commands:');
            Object.keys(this.commands).forEach(name => {
                console.log(`  • ${name}`);
            });
            return;
        }

        console.log(`📝 HELP: ${commandName.toUpperCase()}\n`);
        console.log('═'.repeat(50));
        
        console.log(`\n**Purpose:** ${cmd.purpose}`);
        console.log(`**Usage:** ${cmd.usage}`);
        
        if (cmd.args.length > 0) {
            console.log('\n**Arguments:**');
            cmd.args.forEach(arg => {
                const required = arg.required ? '(Required)' : '(Optional)';
                console.log(`  • ${arg.name} ${required}: ${arg.description}`);
            });
        }
        
        if (cmd.options.length > 0) {
            console.log('\n**Options:**');
            cmd.options.forEach(option => {
                console.log(`  ${option.flag.padEnd(25)} ${option.description}`);
            });
        }
        
        if (cmd.examples.length > 0) {
            console.log('\n**Examples:**');
            cmd.examples.forEach(example => {
                console.log(`  ${example}`);
            });
        }

        // Add specific notes for certain commands
        if (commandName === 'notion_implement') {
            console.log('\n**What gets extracted:**');
            console.log('  • Requirement ID (No ID field) - to locate the page');
            console.log('  • Page content from blocks below Comments section');
            console.log('  • Preserves formatting (headings, paragraphs, lists, etc.)');
            console.log('\n**What does NOT get extracted:**');
            console.log('  • Metadata blocks (stage indicators, "Things to keep in mind", etc.)');
            console.log('  • Main requirement sections (I-IV)');
            console.log('  • Property fields (Title, Stage, Phase, Status, Priority, Lead, etc.)');
        }
        
        if (commandName === 'notion_push') {
            console.log('\n**Where documentation is pushed:**');
            console.log('  • Below Comments section (same location as extraction)');
            console.log('  • As nested toggle blocks');
            console.log('  • Does NOT update any page properties');
        }
    }

    /**
     * Display command summary table
     */
    displayCommandSummary() {
        console.log('📋 COMMAND SUMMARY\n');
        console.log('═'.repeat(80));
        console.log('| Command              | Purpose                           | Required Args |');
        console.log('|----------------------|-----------------------------------|---------------|');
        
        Object.entries(this.commands).forEach(([, cmd]) => {
            const requiredArgs = cmd.args.filter(arg => arg.required).length;
            const argsText = requiredArgs > 0 ? `${requiredArgs} arg(s)` : 'None';
            
            console.log(`| ${cmd.usage.padEnd(20)} | ${cmd.purpose.substring(0, 33).padEnd(33)} | ${argsText.padEnd(13)} |`);
        });
        
        console.log('═'.repeat(80));
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    const help = new NotionHelp();

    if (args.includes('--command')) {
        const commandIndex = args.indexOf('--command');
        const commandName = args[commandIndex + 1];
        
        if (!commandName) {
            console.error('❌ --command requires a command name');
            throw new Error('Missing command name for --command flag');
        }
        
        help.displayCommandHelp(commandName);
    } else if (args.includes('--summary')) {
        help.displayCommandSummary();
    } else {
        help.displayFullHelp();
    }
}

module.exports = NotionHelp;
