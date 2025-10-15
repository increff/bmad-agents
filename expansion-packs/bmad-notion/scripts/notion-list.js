#!/usr/bin/env node

/**
 * BMAD Notion List Script
 * Lists recent requirements from Notion database
 */

const { Client } = require('@notionhq/client');
require('dotenv').config();

class NotionList {
    constructor() {
        this.notion = null;
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

        console.log('✅ Notion List initialized successfully');
    }

    /**
     * Format property value for display
     */
    formatProperty(property) {
        if (!property) return 'N/A';

        switch (property.type) {
            case 'title':
                return property.title?.[0]?.plain_text || 'Untitled';
            
            case 'rich_text':
                return property.rich_text?.[0]?.plain_text || 'Empty';
            
            case 'select':
                return property.select?.name || 'None';
            
            case 'multi_select':
                return property.multi_select?.map(s => s.name).join(', ') || 'None';
            
            case 'date':
                if (property.date?.start) {
                    return new Date(property.date.start).toLocaleDateString();
                }
                return 'No date';
            
            case 'people':
                return property.people?.map(p => p.name || 'Unknown').join(', ') || 'Unassigned';
            
            case 'number':
                return property.number?.toString() || '0';
            
            case 'checkbox':
                return property.checkbox ? '✅' : '❌';
            
            case 'url':
                return property.url || 'No URL';
            
            case 'email':
                return property.email || 'No email';
            
            case 'phone_number':
                return property.phone_number || 'No phone';
            
            case 'formula':
                return this.formatProperty(property.formula) || 'N/A';
            
            case 'relation':
                return `${property.relation?.length || 0} relations`;
            
            case 'rollup':
                return property.rollup?.array?.length ? 
                    `${property.rollup.array.length} items` : 'Empty';
            
            default:
                return 'Unknown type';
        }
    }

    /**
     * Get status icon for requirement
     */
    getStatusIcon(status) {
        const statusMap = {
            'active': '🟢',
            'inactive': '🔴',
            'completed': '✅',
            'in-progress': '🟡',
            'pending': '⏳',
            'blocked': '🚫',
            'cancelled': '❌'
        };

        const statusLower = status?.toLowerCase() || '';
        return statusMap[statusLower] || '⚪';
    }

    /**
     * Get priority icon
     */
    getPriorityIcon(priority) {
        const priorityStr = priority?.toLowerCase() || '';
        
        if (priorityStr.includes('critical') || priorityStr.includes('0')) return '🔴';
        if (priorityStr.includes('high') || priorityStr.includes('1')) return '🟠';
        if (priorityStr.includes('medium') || priorityStr.includes('2')) return '🟡';
        if (priorityStr.includes('low') || priorityStr.includes('3')) return '🟢';
        
        return '⚪';
    }

    /**
     * Truncate text for display
     */
    truncateText(text, maxLength = 50) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    /**
     * List requirements from database
     */
    async listRequirements(options = {}) {
        try {
            const {
                limit = 20,
                filter = null,
                sort = null,
                detailed = false
            } = options;

            console.log(`📋 Fetching requirements from Notion database...\n`);

            // Build query
            const query = {
                database_id: process.env.NOTION_DATABASE_ID,
                page_size: Math.min(limit, 100) // Notion API limit
            };

            // Add filter if provided
            if (filter) {
                query.filter = filter;
            }

            // Add sort if provided
            if (sort) {
                query.sorts = sort;
            } else {
                // Default sort by last edited time
                query.sorts = [{
                    timestamp: 'last_edited_time',
                    direction: 'descending'
                }];
            }

            const response = await this.notion.databases.query(query);
            const pages = response.results;

            if (pages.length === 0) {
                console.log('📭 No requirements found in database');
                return;
            }

            console.log(`📊 Found ${pages.length} requirements:\n`);
            console.log('═'.repeat(80));

            // Display requirements
            pages.forEach((page, index) => {
                const props = page.properties;
                
                // Extract key fields
                const requirementId = this.formatProperty(props['No ID']);
                const title = this.formatProperty(props['Name'] || props['Title']);
                const status = this.formatProperty(props['Status']);
                const priority = this.formatProperty(props['Priority']);
                const stage = this.formatProperty(props['Stage']);
                const lead = this.formatProperty(props['Lead']);
                
                // Status and priority icons
                const statusIcon = this.getStatusIcon(status);
                const priorityIcon = this.getPriorityIcon(priority);
                
                // Last edited
                const lastEdited = new Date(page.last_edited_time).toLocaleDateString();

                console.log(`${index + 1}. ${statusIcon} ${requirementId} ${priorityIcon}`);
                console.log(`   📝 ${this.truncateText(title, 60)}`);
                
                if (detailed) {
                    console.log(`   📊 Status: ${status}`);
                    console.log(`   🎯 Priority: ${priority}`);
                    console.log(`   📈 Stage: ${stage}`);
                    console.log(`   👤 Lead: ${lead}`);
                    console.log(`   📅 Last Edited: ${lastEdited}`);
                    console.log(`   🔗 URL: https://notion.so/${page.id.replace(/-/g, '')}`);
                } else {
                    console.log(`   📊 ${status} | 👤 ${this.truncateText(lead, 20)} | 📅 ${lastEdited}`);
                }
                
                console.log('');
            });

            console.log('═'.repeat(80));
            console.log(`📈 Showing ${pages.length} of ${response.has_more ? 'many' : pages.length} total requirements`);
            
            if (response.has_more) {
                console.log('💡 Use --limit option to see more results');
            }

        } catch (error) {
            console.error('❌ Error listing requirements:', error.message);
            
            if (error.code === 'unauthorized') {
                console.log('💡 Tip: Check your NOTION_API_KEY is correct');
            } else if (error.code === 'object_not_found') {
                console.log('💡 Tip: Check your NOTION_DATABASE_ID is correct');
            }
            
            throw error;
        }
    }

    /**
     * List with filters
     */
    async listWithFilter(filterType, filterValue, options = {}) {
        let filter;

        switch (filterType) {
            case 'status':
                filter = {
                    property: 'Status',
                    select: {
                        equals: filterValue
                    }
                };
                break;
            
            case 'priority':
                filter = {
                    property: 'Priority',
                    select: {
                        equals: filterValue
                    }
                };
                break;
            
            case 'lead':
                filter = {
                    property: 'Lead',
                    people: {
                        contains: filterValue
                    }
                };
                break;
            
            case 'stage':
                filter = {
                    property: 'Stage',
                    select: {
                        equals: filterValue
                    }
                };
                break;
            
            default:
                throw new Error(`Unknown filter type: ${filterType}`);
        }

        console.log(`🔍 Filtering by ${filterType}: ${filterValue}\n`);
        return this.listRequirements({ ...options, filter });
    }

    /**
     * Search requirements by text
     */
    async searchRequirements(searchTerm, options = {}) {
        console.log(`🔍 Searching for: "${searchTerm}"\n`);
        
        // Search in title/name field
        const filter = {
            or: [
                {
                    property: 'Name',
                    title: {
                        contains: searchTerm
                    }
                },
                {
                    property: 'No ID',
                    title: {
                        contains: searchTerm
                    }
                }
            ]
        };

        return this.listRequirements({ ...options, filter });
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    
    const options = {
        limit: 20,
        detailed: false
    };

    // Parse options
    if (args.includes('--limit')) {
        const limitIndex = args.indexOf('--limit');
        options.limit = parseInt(args[limitIndex + 1]) || 20;
    }
    
    if (args.includes('--detailed') || args.includes('-d')) {
        options.detailed = true;
    }

    const lister = new NotionList();

    // Handle different commands
    if (args.includes('--filter')) {
        const filterIndex = args.indexOf('--filter');
        const filterType = args[filterIndex + 1];
        const filterValue = args[filterIndex + 2];
        
        if (!filterType || !filterValue) {
            console.error('❌ Filter requires type and value: --filter status active');
            throw new Error('Missing filter type or value');
        }
        
        lister.listWithFilter(filterType, filterValue, options);
    } else if (args.includes('--search')) {
        const searchIndex = args.indexOf('--search');
        const searchTerm = args[searchIndex + 1];
        
        if (!searchTerm) {
            console.error('❌ Search requires a term: --search REQ-994');
            throw new Error('Missing search term');
        }
        
        lister.searchRequirements(searchTerm, options);
    } else {
        // Default list
        lister.listRequirements(options);
    }
}

module.exports = NotionList;
