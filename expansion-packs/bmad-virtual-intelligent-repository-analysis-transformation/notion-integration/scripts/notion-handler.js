
/**
 * BMAD Notion Integration Handler
 * Handles *notion-fetch and *notion-implement commands
 * Uses environment variables from .env file for Notion API access
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class NotionHandler {
    constructor() {
        this.notion = null;
        this.config = null;
        this.initializeConfig();
    }

    /**
     * Initialize configuration from .env and config.yaml
     */
    initializeConfig() {
        // Load environment variables
        const requiredEnvVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }

        // Initialize Notion client
        this.notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });

        // Load config from config.yaml (basic config)
        this.config = {
            databaseId: process.env.NOTION_DATABASE_ID,
            viewId: process.env.NOTION_VIEW_ID || null,
            fieldMappings: {
                requirement_id: "No ID",
                content_section: "Below Comments",  // Extract from page content below Comments
                push_target_section: "Below Comments"  // Push to same location
            },
            docsDir: path.join(__dirname, '..', 'docs')
        };

        // Ensure docs directory exists
        if (!fs.existsSync(this.config.docsDir)) {
            fs.mkdirSync(this.config.docsDir, { recursive: true });
        }

        console.log('✅ Notion handler initialized successfully');
    }

    /**
     * Parse Notion URL or ID to extract page/database ID
     */
    parseNotionIdentifier(input) {
        if (!input) {
            throw new Error('No Notion URL or ID provided');
        }

        // If it's a URL, extract the ID
        if (input.startsWith('http')) {
            const urlParts = input.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            
            // Handle URLs like: https://notion.so/workspace/REQ-994-abc123def456
            if (lastPart.includes('-')) {
                const parts = lastPart.split('-');
                if (parts.length >= 3) {
                    // Extract the hex ID part (last 32 characters)
                    const hexPart = parts.slice(-1)[0];
                    if (hexPart.length >= 32) {
                        return hexPart.slice(-32);
                    }
                }
            }
            
            // Fallback: try to extract any 32-character hex string
            const hexMatch = input.match(/([a-f0-9]{32})/i);
            if (hexMatch) {
                return hexMatch[1];
            }
        }

        // If it's already a page ID (32 hex chars), return as-is
        if (/^[a-f0-9]{32}$/i.test(input)) {
            return input;
        }

        // If it's a requirement ID like "REQ-994", search for it
        return input;
    }

    /**
     * Search for a page by requirement ID in the database
     */
    async searchByRequirementId(requirementId) {
        try {
            console.log(`🔍 Searching for requirement ID: ${requirementId}`);
            
            // Try multiple field names for the ID field
            const idFieldNames = ['ID', 'No ID', this.config.fieldMappings.requirement_id];
            let response = null;
            let lastError = null;

            for (const fieldName of idFieldNames) {
                try {
                    // Try different filter types based on field name
                    if (fieldName === 'ID') {
                        // For unique_id fields, we need to search by title or use a different approach
                        // Let's try getting all recent pages and filter manually
                        response = await this.notion.databases.query({
                            database_id: this.config.databaseId,
                            page_size: 100
                        });
                        
                        // Filter by requirement ID in the results
                        const filtered = response.results.filter(page => {
                            const idProp = page.properties['ID'];
                            if (idProp && idProp.type === 'unique_id') {
                                const fullId = `${idProp.unique_id.prefix}-${idProp.unique_id.number}`;
                                return fullId === requirementId;
                            }
                            return false;
                        });
                        
                        if (filtered.length > 0) {
                            response.results = filtered;
                            break;
                        }
                    } else {
                        // For rich_text fields
                        response = await this.notion.databases.query({
                            database_id: this.config.databaseId,
                            filter: {
                                property: fieldName,
                                rich_text: {
                                    contains: requirementId
                                }
                            }
                        });
                        
                        if (response.results.length > 0) {
                            break;
                        }
                    }
                } catch (error) {
                    lastError = error;
                    continue;
                }
            }

            if (!response || response.results.length === 0) {
                throw new Error(`No page found with requirement ID: ${requirementId}. Last error: ${lastError?.message || 'Unknown'}`);
            }

            if (response.results.length > 1) {
                console.log(`⚠️  Multiple pages found for ${requirementId}, using the first one`);
            }

            return response.results[0];
        } catch (error) {
            throw new Error(`Failed to search for requirement ID: ${error.message}`);
        }
    }

    /**
     * Fetch page content from Notion
     */
    async fetchPage(pageId) {
        try {
            console.log(`📥 Fetching page: ${pageId}`);
            
            const page = await this.notion.pages.retrieve({ page_id: pageId });
            return page;
        } catch (error) {
            throw new Error(`Failed to fetch page: ${error.message}`);
        }
    }

    /**
     * Fetch page blocks (content) from Notion
     */
    async fetchPageBlocks(pageId) {
        try {
            console.log(`📄 Fetching page blocks: ${pageId}`);
            
            const blocks = [];
            let cursor = undefined;
            
            // Fetch all blocks with pagination
            do {
                const response = await this.notion.blocks.children.list({
                    block_id: pageId,
                    start_cursor: cursor,
                    page_size: 100
                });
                
                blocks.push(...response.results);
                cursor = response.has_more ? response.next_cursor : undefined;
            } while (cursor);
            
            console.log(`✅ Fetched ${blocks.length} blocks`);
            return blocks;
        } catch (error) {
            throw new Error(`Failed to fetch page blocks: ${error.message}`);
        }
    }

    /**
     * Convert Notion blocks to plain text
     */
    blockToText(block) {
        try {
            const type = block.type;
            const content = block[type];
            
            if (!content) return '';
            
            // Handle rich_text content
            if (content.rich_text) {
                return content.rich_text.map(text => text.plain_text).join('');
            }
            
            // Handle title content (for headings, etc.)
            if (content.title) {
                return content.title.map(text => text.plain_text).join('');
            }
            
            // Handle text content
            if (content.text) {
                return content.text.map(text => text.plain_text).join('');
            }
            
            return '';
        } catch (error) {
            console.warn(`⚠️  Could not extract text from block: ${error.message}`);
            return '';
        }
    }

    /**
     * Extract content from page blocks below Comments section
     */
    async extractContentBelowComments(pageId) {
        try {
            console.log('🔍 Extracting content below Comments section...');
            
            const blocks = await this.fetchPageBlocks(pageId);
            
            // Find the Comments section (it appears as a discussion thread)
            // Then extract all content after it
            let foundCommentsEnd = false;
            let contentBlocks = [];
            let skipSections = ['I. REQUIREMENT', 'II. SOLUTION', 'III. DEVELOPMENT', 'IV. RELEASE'];
            
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const blockText = this.blockToText(block);
                
                // Skip if we're in a discussion/comments block
                if (block.type === 'discussion') {
                    foundCommentsEnd = true;
                    continue;
                }
                
                // If we haven't found comments yet, look for any heading that might be comments
                if (!foundCommentsEnd) {
                    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
                        if (blockText.toLowerCase().includes('comment')) {
                            foundCommentsEnd = true;
                            continue;
                        }
                    }
                    // Also consider that content might start right away if no comments section exists
                    // Start collecting from first meaningful content block
                    if (block.type === 'paragraph' || block.type === 'bulleted_list_item' || 
                        block.type === 'numbered_list_item' || block.type === 'toggle' || 
                        block.type === 'callout') {
                        foundCommentsEnd = true;
                    }
                }
                
                // Once we've passed comments, start collecting content
                if (foundCommentsEnd) {
                    // Stop if we hit one of the main requirement sections
                    if (block.type === 'toggle') {
                        const toggleText = this.blockToText(block);
                        if (skipSections.some(section => toggleText.includes(section))) {
                            break;  // Stop before requirement sections
                        }
                    }
                    
                    if (block.type === 'heading_1' || block.type === 'heading_2') {
                        const headingText = this.blockToText(block);
                        if (skipSections.some(section => headingText.includes(section))) {
                            break;  // Stop before requirement sections
                        }
                    }
                    
                    contentBlocks.push(block);
                }
            }
            
            // Convert blocks to text
            let requirementContent = '';
            
            for (const block of contentBlocks) {
                const blockText = this.blockToText(block);
                
                if (!blockText.trim()) continue;
                
                // Add formatting based on block type
                if (block.type === 'heading_1') {
                    requirementContent += `\n# ${blockText}\n\n`;
                } else if (block.type === 'heading_2') {
                    requirementContent += `\n## ${blockText}\n\n`;
                } else if (block.type === 'heading_3') {
                    requirementContent += `\n### ${blockText}\n\n`;
                } else if (block.type === 'bulleted_list_item') {
                    requirementContent += `- ${blockText}\n`;
                } else if (block.type === 'numbered_list_item') {
                    requirementContent += `${blockText}\n`;
                } else if (block.type === 'toggle') {
                    requirementContent += `\n**${blockText}**\n\n`;
                } else if (block.type === 'callout') {
                    requirementContent += `\n> ${blockText}\n\n`;
                } else if (block.type === 'quote') {
                    requirementContent += `\n> ${blockText}\n\n`;
                } else if (block.type === 'code') {
                    requirementContent += `\n\`\`\`\n${blockText}\n\`\`\`\n\n`;
                } else {
                    requirementContent += `${blockText}\n\n`;
                }
            }
            
            requirementContent = requirementContent.trim();
            
            console.log(`✅ Extracted ${requirementContent.length} characters from page content`);
            console.log(`📝 Content blocks found: ${contentBlocks.length}`);
            
            return {
                content: requirementContent,
                blocksCount: contentBlocks.length,
                rawBlocks: contentBlocks
            };
        } catch (error) {
            throw new Error(`Failed to extract content below comments: ${error.message}`);
        }
    }

    /**
     * Extract requirement data from Notion page
     */
    async extractRequirement(pageIdentifier) {
        try {
            let page;
            let pageId = this.parseNotionIdentifier(pageIdentifier);

            // If pageId is not a valid hex ID, search by requirement ID
            if (!/^[a-f0-9]{32}$/i.test(pageId)) {
                page = await this.searchByRequirementId(pageId);
                pageId = page.id;
            } else {
                page = await this.fetchPage(pageId);
            }

            // Extract properties (for metadata)
            const properties = page.properties;
            let requirementTitle = '';

            // Extract requirement title from "Requirement" field
            if (properties['Requirement'] && properties['Requirement'].type === 'title') {
                requirementTitle = properties['Requirement'].title
                    .map(text => text.plain_text)
                    .join('');
            }

            // Get requirement ID - try multiple field names
            let requirementId = '';
            const idFieldNames = [
                this.config.fieldMappings.requirement_id,
                'ID',
                'No ID'
            ];

            for (const fieldName of idFieldNames) {
                if (properties[fieldName]) {
                    const idProperty = properties[fieldName];
                    
                    if (idProperty.type === 'rich_text') {
                        requirementId = idProperty.rich_text
                            .map(text => text.plain_text)
                            .join('');
                    } else if (idProperty.type === 'unique_id') {
                        // Handle unique_id type (e.g., REQ-1141)
                        requirementId = `${idProperty.unique_id.prefix}-${idProperty.unique_id.number}`;
                    }
                    
                    if (requirementId) break;
                }
            }

            // Extract content from page blocks (below Comments section)
            console.log('📝 Extracting requirement content from page blocks...');
            const contentData = await this.extractContentBelowComments(pageId);
            const requirementContent = contentData.content;

            const extractedData = {
                pageId: pageId,
                requirementId: requirementId,
                requirementTitle: requirementTitle,
                requirementContent: requirementContent,  // New: content from below Comments
                contentBlocksCount: contentData.blocksCount,
                notionUrl: `https://www.notion.so/${pageId.replace(/-/g, '')}`,
                extractedAt: new Date().toISOString()
            };

            console.log('✅ Requirement extracted successfully');
            console.log(`📋 Requirement ID: ${extractedData.requirementId}`);
            console.log(`📄 Title: ${extractedData.requirementTitle}`);
            console.log(`📝 Content length: ${extractedData.requirementContent.length} characters`);
            console.log(`📦 Content blocks: ${extractedData.contentBlocksCount}`);

            return extractedData;
        } catch (error) {
            throw new Error(`Failed to extract requirement: ${error.message}`);
        }
    }

    /**
     * Handle *notion-fetch command
     */
    async handleNotionFetch(pageIdentifier, options = {}) {
        try {
            console.log('🚀 Starting Notion fetch operation...');
            
            const extractedData = await this.extractRequirement(pageIdentifier);
            
            if (options.dryRun) {
                console.log('\n📋 DRY RUN - Extracted Data Preview:');
                console.log('═'.repeat(50));
                console.log(`Requirement ID: ${extractedData.requirementId}`);
                console.log(`Page ID: ${extractedData.pageId}`);
                console.log(`Notion URL: ${extractedData.notionUrl}`);
                console.log(`\nRequirement Content:\n${extractedData.requirementContent}`);
                console.log('═'.repeat(50));
                return extractedData;
            }

            // Save extracted data to docs folder for other processes to use
            const outputFile = path.join(this.config.docsDir, '.notion-extracted-data.json');
            fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2));
            
            console.log(`💾 Extracted data saved to: ${outputFile}`);
            console.log('✅ Notion fetch completed successfully');
            
            return extractedData;
        } catch (error) {
            console.error(`❌ Notion fetch failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Handle *notion-implement command
     */
    async handleNotionImplement(pageIdentifier) {
        try {
            console.log('🚀 Starting Notion implement operation...');
            
            // First, fetch the requirement
            const extractedData = await this.extractRequirement(pageIdentifier);
            
            // Save the extracted data for the VIRAT workflow in docs folder
            const outputFile = path.join(this.config.docsDir, '.notion-extracted-data.json');
            fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2));
            
            console.log('📋 Requirement extracted and ready for implementation');
            console.log(`🎯 Requirement ID: ${extractedData.requirementId}`);
            console.log(`📝 Content preview: ${extractedData.requirementContent.substring(0, 100)}...`);
            
            // Create a formatted requirement for VIRAT in docs folder
            const viratRequirement = this.formatForVirat(extractedData);
            const viratFile = path.join(this.config.docsDir, '.virat-requirement.md');
            fs.writeFileSync(viratFile, viratRequirement);
            
            console.log(`📄 VIRAT requirement file created: ${viratFile}`);
            console.log('✅ Requirement extracted and formatted for VIRAT');
            console.log('\n🚀 Triggering VIRAT *implement workflow...');
            console.log('─'.repeat(70));
            
            console.log(`\n📋 Implementing: ${extractedData.requirementId}`);
            console.log(`📝 Title: ${extractedData.requirementTitle}`);
            console.log(`📍 Source: ${extractedData.notionUrl}`);
            console.log('\n⚙️  VIRAT will now analyze and implement this requirement automatically...\n');
            
            // Signal to VIRAT AI to continue with implementation
            console.log('🤖 VIRAT AI: Proceeding with *implement workflow for extracted requirement');
            console.log('📊 Requirement content ready for analysis and implementation');
            console.log('\n' + '═'.repeat(70));
            console.log('🎯 VIRAT IMPLEMENTATION WORKFLOW TRIGGERED');
            console.log('═'.repeat(70));
            console.log('\n📝 Requirement Summary:');
            console.log(`   • ID: ${extractedData.requirementId}`);
            console.log(`   • Title: ${extractedData.requirementTitle}`);
            console.log(`   • Content Length: ${extractedData.requirementContent.length} characters`);
            console.log(`   • Source: Notion (${extractedData.notionUrl})`);
            console.log('\n🔄 Next: VIRAT will analyze codebase and generate implementation...');
            console.log('─'.repeat(70));
            
            return {
                extractedData,
                viratRequirement,
                outputFile,
                viratFile,
                triggerImplement: true,  // Signal to VIRAT AI to continue with implementation
                implementPrompt: `Please implement the following requirement:\n\n${viratRequirement}`
            };
        } catch (error) {
            console.error(`❌ Notion implement failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Format extracted data for VIRAT consumption
     */
    formatForVirat(extractedData) {
        const title = extractedData.requirementTitle || 'Notion Requirement';
        const reqId = extractedData.requirementId || 'N/A';
        
        return `# ${reqId}: ${title}

## Source
- **Notion Page ID**: ${extractedData.pageId}
- **Notion URL**: ${extractedData.notionUrl}
- **Extracted At**: ${extractedData.extractedAt}
- **Content Source**: Below Comments section

## Requirement Content

${extractedData.requirementContent}

---
*This requirement was extracted from Notion page content (below Comments section) using BMAD Notion Integration*
`;
    }

    /**
     * Test Notion connection
     */
    async testConnection() {
        try {
            console.log('🔍 Testing Notion API connection...');
            
            // Test basic API access
            const response = await this.notion.databases.retrieve({
                database_id: this.config.databaseId
            });
            
            console.log('✅ Notion API connection successful');
            const databaseTitle = response.title?.[0]?.plain_text || 'Untitled';
            console.log(`📊 Database: ${databaseTitle}`);
            console.log(`🔢 Database ID: ${this.config.databaseId}`);
            
            return true;
        } catch (error) {
            console.error(`❌ Notion connection failed: ${error.message}`);
            throw error;
        }
    }
}

/**
 * Main CLI handler
 */
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const pageIdentifier = args[1];
    
    try {
        const handler = new NotionHandler();
        
        switch (command) {
            case 'fetch':
            case 'notion-fetch':
                if (!pageIdentifier) {
                    console.error('❌ Error: Page identifier required for fetch command');
                    console.log('Usage: node notion-handler.js fetch <page_url_or_id>');
                    throw new Error('Page identifier required for fetch command');
                }
                
                {
                    const dryRun = args.includes('--dry-run');
                    await handler.handleNotionFetch(pageIdentifier, { dryRun });
                    break;
                }
                
            case 'implement':
            case 'notion-implement':
                if (!pageIdentifier) {
                    console.error('❌ Error: Page identifier required for implement command');
                    console.log('Usage: node notion-handler.js implement <page_url_or_id>');
                    throw new Error('Page identifier required for implement command');
                }
                
                {
                    const result = await handler.handleNotionImplement(pageIdentifier);
                    
                    // If VIRAT implementation should be triggered
                    if (result.triggerImplement) {
                        console.log('\n' + '🤖 VIRAT AI CONTINUATION SIGNAL DETECTED 🤖'.padStart(50));
                        console.log('─'.repeat(70));
                        console.log('📋 REQUIREMENT READY FOR IMPLEMENTATION');
                        console.log('─'.repeat(70));
                        console.log(`\n${result.implementPrompt}`);
                        console.log('\n' + '═'.repeat(70));
                        console.log('🎯 VIRAT: Please proceed with *implement workflow');
                        console.log('═'.repeat(70));
                    }
                    break;
                }
                
            case 'test':
            case 'test-connection':
                await handler.testConnection();
                break;
                
            default:
                console.log('BMAD Notion Integration Handler');
                console.log('');
                console.log('Usage:');
                console.log('  node notion-handler.js fetch <page_url_or_id> [--dry-run]');
                console.log('  node notion-handler.js implement <page_url_or_id>');
                console.log('  node notion-handler.js test');
                console.log('');
                console.log('Examples:');
                console.log('  node notion-handler.js fetch REQ-994');
                console.log('  node notion-handler.js fetch https://notion.so/workspace/REQ-994-abc123');
                console.log('  node notion-handler.js implement REQ-994');
                console.log('  node notion-handler.js test');
                break;
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

// Export for use as module
module.exports = NotionHandler;

// Run as CLI if called directly
if (require.main === module) {
    main().catch((error) => {
        console.error(`❌ Fatal error: ${error.message}`);
        // eslint-disable-next-line n/no-process-exit
        process.exit(1);
    });
}
