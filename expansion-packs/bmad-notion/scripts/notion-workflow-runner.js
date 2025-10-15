

/**
 * BMAD Notion Workflow Runner
 * Executes notion-fetch-workflow.yaml automatically
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
require('dotenv').config();

class NotionWorkflowRunner {
    constructor() {
        this.workflowPath = path.join(__dirname, '..', 'workflows', 'notion-fetch-workflow.yaml');
        this.workflow = null;
        this.results = {};
    }

    /**
     * Load workflow configuration
     */
    loadWorkflow() {
        try {
            const workflowContent = fs.readFileSync(this.workflowPath, 'utf8');
            this.workflow = yaml.load(workflowContent);
            console.log(`✅ Loaded workflow: ${this.workflow.name}`);
            return true;
        } catch (error) {
            console.error(`❌ Failed to load workflow: ${error.message}`);
            return false;
        }
    }

    /**
     * Validate environment variables
     */
    validateEnvironment() {
        console.log('\n📋 Step 1: Validating environment...');
        
        const required = this.workflow.environment.required_vars;
        const missing = [];

        required.forEach(varName => {
            if (!process.env[varName]) {
                missing.push(varName);
            }
        });

        if (missing.length > 0) {
            console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
            console.error('   Please check your .env file');
            return false;
        }

        console.log('✅ Environment validation passed');
        return true;
    }

    /**
     * Parse Notion identifier from URL or ID
     */
    parseNotionIdentifier(input) {
        console.log('\n📋 Step 2: Parsing Notion identifier...');
        console.log(`   Input: ${input}`);

        let identifier = input;

        // If it's a URL, extract the page ID
        if (input.startsWith('http')) {
            const urlParts = input.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            
            // Handle URLs with query params
            const cleanPart = lastPart.split('?')[0];
            
            // Extract hex ID (last 32 characters)
            if (cleanPart.includes('-')) {
                const parts = cleanPart.split('-');
                const hexPart = parts[parts.length - 1];
                if (hexPart.length >= 32) {
                    identifier = hexPart.slice(-32);
                }
            }
            
            // Fallback: try to extract any 32-character hex string
            if (identifier === input) {
                const hexMatch = input.match(/([a-f0-9]{32})/i);
                if (hexMatch) {
                    identifier = hexMatch[1];
                }
            }
        }

        console.log(`✅ Parsed identifier: ${identifier}`);
        this.results.page_identifier = identifier;
        return identifier;
    }

    /**
     * Execute notion fetch
     */
    fetchFromNotion(identifier, dryRun = false) {
        console.log('\n📋 Step 3: Fetching data from Notion...');
        
        const scriptPath = path.join(__dirname, 'notion-handler.js');
        const args = ['fetch', identifier];
        
        if (dryRun) {
            args.push('--dry-run');
        }

        try {
            const command = `node "${scriptPath}" ${args.join(' ')}`;
            console.log(`   Executing: ${command}`);
            
            execSync(command, {
                cwd: path.join(__dirname, '..'),
                encoding: 'utf8',
                stdio: 'inherit'
            });

            console.log('✅ Fetch completed successfully');
            return true;
        } catch (error) {
            console.error(`❌ Fetch failed: ${error.message}`);
            return false;
        }
    }

    /**
     * Validate extracted data
     */
    validateExtraction() {
        console.log('\n📋 Step 4: Validating extracted data...');
        
        const dataPath = path.join(__dirname, '..', 'docs', '.notion-extracted-data.json');
        
        if (!fs.existsSync(dataPath)) {
            console.error('❌ Extracted data file not found');
            return false;
        }

        try {
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            
            // Validate required fields
            const requiredFields = ['pageId', 'requirementId', 'requirementContent'];
            const missingFields = requiredFields.filter(field => !data[field] && field !== 'requirementId');
            
            if (missingFields.length > 0) {
                console.warn(`⚠️  Some fields are empty: ${missingFields.join(', ')}`);
            }

            this.results.extractedData = data;
            console.log('✅ Data validation passed');
            return true;
        } catch (error) {
            console.error(`❌ Failed to validate data: ${error.message}`);
            return false;
        }
    }

    /**
     * Display results
     */
    displayResults() {
        console.log('\n📋 Step 5: Displaying results...');
        console.log('\n' + '═'.repeat(70));
        console.log('📊 EXTRACTED DATA SUMMARY');
        console.log('═'.repeat(70));
        
        const data = this.results.extractedData;
        
        console.log(`\n📋 Requirement ID: ${data.requirementId || 'N/A'}`);
        console.log(`📄 Title: ${data.requirementTitle || 'N/A'}`);
        console.log(`🔗 Notion URL: ${data.notionUrl}`);
        console.log(`📝 Content Length: ${data.requirementContent.length} characters`);
        console.log(`📦 Content Blocks: ${data.contentBlocksCount || 'N/A'}`);
        console.log(`⏰ Extracted At: ${new Date(data.extractedAt).toLocaleString()}`);
        console.log(`📍 Source: Below Comments section`);
        
        console.log('\n📝 Requirement Content:');
        console.log('─'.repeat(70));
        console.log(data.requirementContent);
        console.log('─'.repeat(70));
        
        console.log(`\n💾 Saved to: docs/.notion-extracted-data.json`);
        console.log('═'.repeat(70));
    }

    /**
     * Update tracking file
     */
    updateTracking() {
        console.log('\n📋 Step 6: Updating tracking...');
        
        const trackingPath = path.join(__dirname, '..', 'docs', '.notion-tracking.json');
        let tracking = {};
        
        if (fs.existsSync(trackingPath)) {
            tracking = JSON.parse(fs.readFileSync(trackingPath, 'utf8'));
        }

        tracking.last_fetch = {
            requirement_id: this.results.extractedData.requirementId,
            page_id: this.results.extractedData.pageId,
            timestamp: new Date().toISOString(),
            status: 'success'
        };

        fs.writeFileSync(trackingPath, JSON.stringify(tracking, null, 2));
        console.log('✅ Tracking updated');
    }

    /**
     * Run the complete workflow
     */
    async run(notionLink, dryRun = false) {
        console.log('\n🚀 Starting Notion Fetch Workflow');
        console.log('═'.repeat(70));
        console.log(`Workflow: ${this.workflow.name} v${this.workflow.version}`);
        console.log(`Description: ${this.workflow.description}`);
        console.log('═'.repeat(70));

        // Execute workflow steps
        const steps = [
            () => this.validateEnvironment(),
            () => this.parseNotionIdentifier(notionLink),
            () => this.fetchFromNotion(this.results.page_identifier, dryRun),
            () => this.validateExtraction(),
            () => this.displayResults(),
            () => !dryRun && this.updateTracking()
        ];

        for (let i = 0; i < steps.length; i++) {
            const result = steps[i]();
            if (result === false) {
                console.log('\n' + '═'.repeat(70));
                console.log('❌ WORKFLOW FAILED');
                console.log('═'.repeat(70));
                throw new Error('Workflow execution failed');
            }
        }

        console.log('\n' + '═'.repeat(70));
        console.log('✅ WORKFLOW COMPLETED SUCCESSFULLY');
        console.log('═'.repeat(70));
        
        if (!dryRun) {
            console.log('\n💡 Next Steps:');
            console.log('   • Review the extracted data in docs/.notion-extracted-data.json');
            console.log('   • Run *notion_implement to start implementation');
            console.log('   • Run *notion_push to push documentation back to Notion');
        }
    }
}

/**
 * CLI handler
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('BMAD Notion Workflow Runner');
        console.log('');
        console.log('Usage:');
        console.log('  node notion-workflow-runner.js <notion_link> [--dry-run]');
        console.log('');
        console.log('Examples:');
        console.log('  node notion-workflow-runner.js REQ-1141');
        console.log('  node notion-workflow-runner.js https://notion.so/...');
        console.log('  node notion-workflow-runner.js REQ-1141 --dry-run');
        return;
    }

    const notionLink = args[0];
    const dryRun = args.includes('--dry-run');

    const runner = new NotionWorkflowRunner();
    
    if (!runner.loadWorkflow()) {
        throw new Error('Failed to load workflow configuration');
    }

    await runner.run(notionLink, dryRun);
}

// Export for module use
module.exports = NotionWorkflowRunner;

// Run as CLI if called directly
if (require.main === module) {
    main().catch((error) => {
        console.error(`❌ Fatal error: ${error.message}`);
        console.error(error.stack);
        throw error;
    });
}

