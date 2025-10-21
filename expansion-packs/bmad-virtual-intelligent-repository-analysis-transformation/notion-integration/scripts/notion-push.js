/**
 * BMAD Notion Push Script
 * Pushes generated documentation back to Notion ticket's III. DEVELOPMENT section
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Force load .env file and override any shell environment variables
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '..', '.env');
const envConfig = dotenv.config({ path: envPath, override: true });

if (envConfig.error) {
    throw new Error(`❌ Error loading .env file: ${envConfig.error.message}`);
}

class NotionPush {
    constructor() {
        this.notion = null;
        this.docsDir = path.join(__dirname, '..', 'docs');
        this.trackingFile = path.join(this.docsDir, '.notion-tracking.json');
        this.initializeConfig();
    }

    initializeConfig() {
        const requiredEnvVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }

        this.notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });

        // Ensure docs directory exists
        if (!fs.existsSync(this.docsDir)) {
            fs.mkdirSync(this.docsDir, { recursive: true });
        }

        console.log('✅ Notion Push initialized successfully');
    }

    /**
     * Load tracking data from .notion-tracking.json
     */
    loadTrackingData() {
        if (!fs.existsSync(this.trackingFile)) {
            throw new Error('No tracking file found. Run *notion_implement first.');
        }

        const trackingData = JSON.parse(fs.readFileSync(this.trackingFile, 'utf8'));
        return trackingData;
    }

    /**
     * Find documentation files to push
     */
    findDocumentationFiles() {
        const patterns = [
            '**/*-ANALYSIS.md',
            '**/*-PLAN.md', 
            '**/*-IMPLEMENTATION.md',
            '**/*-CHANGES.md',
            '**/CHANGELOG.md'
            // Removed README*.md - these should not be pushed to Notion
        ];

        const files = [];
        const glob = require('glob');

        patterns.forEach(pattern => {
            const matches = glob.sync(pattern, { ignore: ['node_modules/**', '.git/**'] });
            files.push(...matches);
        });

        // Remove duplicates and filter existing files
        const uniqueFiles = [...new Set(files)].filter(file => fs.existsSync(file));
        
        console.log(`📁 Found ${uniqueFiles.length} documentation files to push`);
        return uniqueFiles;
    }

    /**
     * Convert markdown content to Notion blocks
     */
    markdownToNotionBlocks(markdown) {
        const lines = markdown.split('\n');
        const blocks = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (!line) continue;
            
            // Headers
            if (line.startsWith('# ')) {
                blocks.push({
                    object: 'block',
                    type: 'heading_1',
                    heading_1: {
                        rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
                    }
                });
            } else if (line.startsWith('## ')) {
                blocks.push({
                    object: 'block',
                    type: 'heading_2',
                    heading_2: {
                        rich_text: [{ type: 'text', text: { content: line.substring(3) } }]
                    }
                });
            } else if (line.startsWith('### ')) {
                blocks.push({
                    object: 'block',
                    type: 'heading_3',
                    heading_3: {
                        rich_text: [{ type: 'text', text: { content: line.substring(4) } }]
                    }
                });
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                blocks.push({
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
                    }
                });
            } else if (/^\d+\.\s/.test(line)) {
                blocks.push({
                    object: 'block',
                    type: 'numbered_list_item',
                    numbered_list_item: {
                        rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\.\s/, '') } }]
                    }
                });
            } else if (line.startsWith('```')) {
                // Handle code blocks
                const codeLines = [];
                i++; // Skip opening ```
                while (i < lines.length && !lines[i].trim().startsWith('```')) {
                    codeLines.push(lines[i]);
                    i++;
                }
                
                blocks.push({
                    object: 'block',
                    type: 'code',
                    code: {
                        rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }],
                        language: 'plain text'
                    }
                });
            } else {
                // Regular paragraph
                blocks.push({
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [{ type: 'text', text: { content: line } }]
                    }
                });
            }
        }
        
        return blocks;
    }

    /**
     * Find or create the section below Comments for pushing documentation
     */
    async findBelowCommentsSection(pageId) {
        try {
            console.log('🔍 Finding section below Comments...');
            
            const response = await this.notion.blocks.children.list({
                block_id: pageId,
            });

            // Find the Comments section (usually a discussion block or heading)
            let commentsIndex = -1;
            let targetBlockId = null;
            
            for (let i = 0; i < response.results.length; i++) {
                const block = response.results[i];
                
                // Check for discussion/comments blocks
                if (block.type === 'discussion') {
                    commentsIndex = i;
                    // Return the next block after comments as the target
                    if (i + 1 < response.results.length) {
                        targetBlockId = response.results[i + 1].id;
                    }
                    break;
                }
                
                // Check for Comments heading
                if ((block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3')) {
                    const headingText = block[block.type].rich_text
                        .map(t => t.plain_text).join('').toLowerCase();
                    
                    if (headingText.includes('comment')) {
                        commentsIndex = i;
                        // Return the next block after comments heading
                        if (i + 1 < response.results.length) {
                            targetBlockId = response.results[i + 1].id;
                        }
                        break;
                    }
                }
            }

            // If we found a target block after comments, use it
            if (targetBlockId) {
                console.log('✅ Found section below Comments');
                return { blockId: targetBlockId, insertMode: 'replace' };
            }

            // If comments section exists but no blocks after it, append to page
            if (commentsIndex >= 0) {
                console.log('✅ Found Comments section, will append after it');
                return { blockId: pageId, insertMode: 'append' };
            }

            // If no comments section found, look for the first content block
            // and insert before the main requirement sections
            for (let i = 0; i < response.results.length; i++) {
                const block = response.results[i];
                
                if (block.type === 'toggle') {
                    const toggleText = block.toggle.rich_text
                        .map(t => t.plain_text).join('');
                    
                    // Don't insert before main requirement sections
                    if (toggleText.includes('I. REQUIREMENT') || 
                        toggleText.includes('II. SOLUTION') ||
                        toggleText.includes('III. DEVELOPMENT') ||
                        toggleText.includes('IV. RELEASE')) {
                        // Insert before this section
                        console.log('✅ Will insert before main requirement sections');
                        return { blockId: pageId, insertMode: 'prepend_to_requirements' };
                    }
                }
            }

            // Default: append to page
            console.log('✅ Will append to page (no Comments section found)');
            return { blockId: pageId, insertMode: 'append' };
        } catch (error) {
            console.error('❌ Error finding section below Comments:', error.message);
            throw error;
        }
    }

    /**
     * Push documentation files to Notion
     */
    async pushDocumentation(pageId, files) {
        try {
            console.log(`📤 Pushing ${files.length} files to Notion page...`);

            // Find section below Comments
            const targetSection = await this.findBelowCommentsSection(pageId);

            // Create implementation complete toggle
            const timestamp = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short', 
                day: 'numeric'
            });

            const implementationToggle = {
                object: 'block',
                type: 'toggle',
                toggle: {
                    rich_text: [{ 
                        type: 'text', 
                        text: { content: `📋 BMAD Implementation Complete - ${timestamp}` }
                    }],
                    children: []
                }
            };

            // Add implementation summary
            const summaryBlocks = [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [{ 
                            type: 'text', 
                            text: { content: `📊 Implementation Summary` },
                            annotations: { bold: true }
                        }]
                    }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: [{ type: 'text', text: { content: `Implemented: ${new Date().toISOString()}` } }]
                    }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: [{ type: 'text', text: { content: `Files Generated: ${files.length}` } }]
                    }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: [{ type: 'text', text: { content: `Repositories: irisx-algo, ms-loadapis, irisx-config` } }]
                    }
                }
            ];

            implementationToggle.toggle.children.push(...summaryBlocks);

            // Add each documentation file as a toggle
            for (const file of files) {
                const fileName = path.basename(file);
                const content = fs.readFileSync(file, 'utf8');
                const blocks = this.markdownToNotionBlocks(content);

                const fileToggle = {
                    object: 'block',
                    type: 'toggle',
                    toggle: {
                        rich_text: [{ type: 'text', text: { content: `📄 ${fileName}` } }],
                        children: blocks.slice(0, 100) // Limit blocks to avoid API limits
                    }
                };

                implementationToggle.toggle.children.push(fileToggle);
            }

            // Push based on insert mode
            if (targetSection.insertMode === 'replace') {
                // Replace the target block
                await this.notion.blocks.update({
                    block_id: targetSection.blockId,
                    [implementationToggle.type]: implementationToggle[implementationToggle.type]
                });
            } else {
                // Append to page or section
                await this.notion.blocks.children.append({
                    block_id: targetSection.blockId,
                    children: [implementationToggle]
                });
            }

            console.log('✅ Documentation pushed successfully below Comments section');
            return true;

        } catch (error) {
            console.error('❌ Error pushing documentation:', error.message);
            throw error;
        }
    }

    /**
     * Main push function
     */
    async push(pageUrlOrId = null) {
        try {
            let pageId;
            let requirementId;

            if (pageUrlOrId) {
                // Parse page ID from URL or use as requirement ID
                if (pageUrlOrId.startsWith('https://')) {
                    pageId = this.extractPageIdFromUrl(pageUrlOrId);
                } else {
                    // Look up in tracking data
                    const trackingData = this.loadTrackingData();
                    const entry = trackingData[pageUrlOrId];
                    if (!entry) {
                        throw new Error(`No tracking data found for ${pageUrlOrId}`);
                    }
                    pageId = entry.page_id;
                    requirementId = pageUrlOrId;
                }
            } else {
                // Auto-detect from last implementation
                const trackingData = this.loadTrackingData();
                const entries = Object.entries(trackingData);
                if (entries.length === 0) {
                    throw new Error('No previous implementations found');
                }
                
                // Get most recent entry
                const lastEntry = entries.reduce((latest, [id, data]) => {
                    return new Date(data.extracted_at) > new Date(latest[1].extracted_at) ? [id, data] : latest;
                });
                
                pageId = lastEntry[1].page_id;
                requirementId = lastEntry[0];
            }

            console.log(`📤 Pushing documentation to ${requirementId || pageId}...`);

            // Find documentation files
            const files = this.findDocumentationFiles();
            if (files.length === 0) {
                console.log('⚠️  No documentation files found to push');
                return;
            }

            // Push to Notion
            await this.pushDocumentation(pageId, files);

            // Update tracking data
            if (requirementId) {
                const trackingData = this.loadTrackingData();
                trackingData[requirementId].pushed_at = new Date().toISOString();
                trackingData[requirementId].files_pushed = files.length;
                trackingData[requirementId].status = 'completed';
                
                fs.writeFileSync(this.trackingFile, JSON.stringify(trackingData, null, 2));
            }

            console.log('🎉 Documentation push completed successfully!');

        } catch (error) {
            console.error('❌ Push failed:', error.message);
            throw error;
        }
    }

    extractPageIdFromUrl(url) {
        const match = url.match(/([a-f0-9]{32})/);
        if (!match) {
            throw new Error('Could not extract page ID from URL');
        }
        return match[1];
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    const pageUrlOrId = args[0];
    
    const options = {};
    if (args.includes('--files')) {
        const filesIndex = args.indexOf('--files');
        options.files = args[filesIndex + 1]?.split(',') || [];
    }
    if (args.includes('--format')) {
        const formatIndex = args.indexOf('--format');
        options.format = args[formatIndex + 1] || 'blocks';
    }

    const pusher = new NotionPush();
    pusher.push(pageUrlOrId, options);
}

module.exports = NotionPush;
