/**
 * BMAD Notion Test Script
 * Tests Notion API connectivity and verifies credentials
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

class NotionTest {
    constructor() {
        this.notion = null;
        this.config = null;
    }

    /**
     * Test environment configuration
     */
    testEnvironment() {
        console.log('🔧 Testing Environment Configuration...\n');

        const requiredVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
        const optionalVars = ['NOTION_VIEW_ID', 'NOTION_API_VERSION'];
        
        let allGood = true;

        // Check required variables
        console.log('📋 Required Environment Variables:');
        requiredVars.forEach(varName => {
            const value = process.env[varName];
            if (value) {
                const displayValue = varName === 'NOTION_API_KEY' 
                    ? `${value.substring(0, 10)}...` 
                    : value;
                console.log(`  ✅ ${varName}: ${displayValue}`);
            } else {
                console.log(`  ❌ ${varName}: Missing`);
                allGood = false;
            }
        });

        // Check optional variables
        console.log('\n📋 Optional Environment Variables:');
        optionalVars.forEach(varName => {
            const value = process.env[varName];
            if (value) {
                console.log(`  ✅ ${varName}: ${value}`);
            } else {
                console.log(`  ⚪ ${varName}: Not set (optional)`);
            }
        });

        // Check .env file exists
        console.log('\n📁 Configuration Files:');
        if (fs.existsSync('.env')) {
            console.log('  ✅ .env file: Found');
        } else {
            console.log('  ⚠️  .env file: Not found (using system environment)');
        }

        if (fs.existsSync('config.yaml')) {
            console.log('  ✅ config.yaml: Found');
        } else {
            console.log('  ⚠️  config.yaml: Not found (using defaults)');
        }

        return allGood;
    }

    /**
     * Test Notion API authentication
     */
    async testAuthentication() {
        console.log('\n🔑 Testing Notion API Authentication...\n');

        try {
            this.notion = new Client({
                auth: process.env.NOTION_API_KEY,
            });

            // Test with a simple API call
            const response = await this.notion.users.me();
            
            console.log('  ✅ Authentication: Valid');
            console.log(`  👤 Bot User: ${response.name || 'Unnamed Bot'}`);
            console.log(`  🤖 Bot ID: ${response.id}`);
            console.log(`  📧 Owner Email: ${response.owner?.user?.person?.email || 'Not available'}`);
            
            return true;
        } catch (error) {
            console.log('  ❌ Authentication: Failed');
            console.log(`  🚨 Error: ${error.message}`);
            
            if (error.code === 'unauthorized') {
                console.log('  💡 Tip: Check your NOTION_API_KEY is correct');
            }
            
            return false;
        }
    }

    /**
     * Test database access
     */
    async testDatabaseAccess() {
        console.log('\n📊 Testing Database Access...\n');

        try {
            const databaseId = process.env.NOTION_DATABASE_ID;
            
            // Test database query
            const response = await this.notion.databases.query({
                database_id: databaseId,
                page_size: 1
            });

            console.log('  ✅ Database Access: Granted');
            console.log(`  📋 Database ID: ${databaseId}`);
            console.log(`  📄 Total Pages: ${response.results.length > 0 ? 'At least 1' : '0'}`);
            
            // Get database info
            const dbInfo = await this.notion.databases.retrieve({
                database_id: databaseId
            });
            
            console.log(`  📝 Database Title: ${dbInfo.title[0]?.plain_text || 'Untitled'}`);
            
            return true;
        } catch (error) {
            console.log('  ❌ Database Access: Denied');
            console.log(`  🚨 Error: ${error.message}`);
            
            if (error.code === 'object_not_found') {
                console.log('  💡 Tip: Check your NOTION_DATABASE_ID is correct');
            } else if (error.code === 'unauthorized') {
                console.log('  💡 Tip: Share your database with the integration');
            }
            
            return false;
        }
    }

    /**
     * Test database schema
     */
    async testDatabaseSchema() {
        console.log('\n🏗️  Testing Database Schema...\n');

        try {
            const databaseId = process.env.NOTION_DATABASE_ID;
            const dbInfo = await this.notion.databases.retrieve({
                database_id: databaseId
            });

            const properties = dbInfo.properties;
            const recommendedFields = ['No ID', 'ID', 'Requirement', 'Request Description'];
            const optionalFields = ['III. DEVELOPMENT'];

            console.log('  📋 Recommended Fields (for optimal functionality):');
            let schemaValid = true;

            recommendedFields.forEach(fieldName => {
                if (properties[fieldName]) {
                    const fieldType = properties[fieldName].type;
                    console.log(`    ✅ ${fieldName}: ${fieldType}`);
                } else {
                    console.log(`    ⚠️  ${fieldName}: Not found (notion-handler will try alternatives)`);
                }
            });

            console.log('\n  📋 Optional Fields:');
            optionalFields.forEach(fieldName => {
                if (properties[fieldName]) {
                    const fieldType = properties[fieldName].type;
                    console.log(`    ✅ ${fieldName}: ${fieldType}`);
                } else {
                    console.log(`    ⚪ ${fieldName}: Not found (will be created if needed)`);
                }
            });

            console.log('\n  📋 All Available Properties:');
            Object.entries(properties).forEach(([name, prop]) => {
                console.log(`    📝 ${name}: ${prop.type}`);
            });

            return schemaValid;
        } catch (error) {
            console.log('  ❌ Schema Check: Failed');
            console.log(`  🚨 Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Test sample requirement fetch
     */
    async testSampleFetch() {
        console.log('\n🔍 Testing Sample Requirement Fetch...\n');

        try {
            const databaseId = process.env.NOTION_DATABASE_ID;
            
            // Get first page from database
            const response = await this.notion.databases.query({
                database_id: databaseId,
                page_size: 1
            });

            if (response.results.length === 0) {
                console.log('  ⚠️  No pages found in database');
                return true; // Not an error, just empty database
            }

            const page = response.results[0];
            const pageId = page.id;

            // Try to extract requirement ID
            const properties = page.properties;
            const requirementId = properties['No ID']?.title?.[0]?.plain_text || 'Unknown';
            
            console.log('  ✅ Sample Fetch: Success');
            console.log(`  📄 Page ID: ${pageId}`);
            console.log(`  🏷️  Requirement ID: ${requirementId}`);

            // Try to fetch page content
            const blocks = await this.notion.blocks.children.list({
                block_id: pageId,
                page_size: 5
            });

            console.log(`  📝 Content Blocks: ${blocks.results.length} found`);

            return true;
        } catch (error) {
            console.log('  ❌ Sample Fetch: Failed');
            console.log(`  🚨 Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🧪 NOTION API CONNECTION TEST\n');
        console.log('═'.repeat(50));

        const results = {
            environment: false,
            authentication: false,
            database: false,
            schema: false,
            sample: false
        };

        // Test 1: Environment
        results.environment = this.testEnvironment();

        if (!results.environment) {
            console.log('\n❌ Environment test failed. Please fix configuration before continuing.');
            return false;
        }

        // Test 2: Authentication
        results.authentication = await this.testAuthentication();

        if (!results.authentication) {
            console.log('\n❌ Authentication test failed. Please check your API key.');
            return false;
        }

        // Test 3: Database Access
        results.database = await this.testDatabaseAccess();

        if (!results.database) {
            console.log('\n❌ Database access test failed. Please check permissions.');
            return false;
        }

        // Test 4: Schema (not critical - handler is flexible)
        results.schema = await this.testDatabaseSchema();

        // Test 5: Sample Fetch
        results.sample = await this.testSampleFetch();

        // Summary
        console.log('\n' + '═'.repeat(50));
        console.log('📊 TEST SUMMARY\n');

        // Schema is not critical since notion-handler is flexible with field names
        const criticalTests = ['environment', 'authentication', 'database', 'sample'];
        const allCriticalPassed = criticalTests.every(test => results[test]);

        if (allCriticalPassed) {
            console.log('🎉 CRITICAL TESTS PASSED!');
            console.log('\n✅ Notion integration is ready to use!');
            console.log('\n💡 Next steps:');
            console.log('   • Run: *implement REQ-XXX (Notion URL or ID)');
            console.log('   • Use local notion-integration scripts directly if needed');
            if (!results.schema) {
                console.log('\n⚠️  Note: Schema validation failed, but integration should still work');
                console.log('   The notion-handler script is flexible with field names.');
            }
        } else {
            console.log('❌ CRITICAL TESTS FAILED');
            console.log('\n❌ Issues found:');
            criticalTests.forEach(test => {
                if (!results[test]) {
                    console.log(`   • ${test}: Failed`);
                }
            });
            console.log('\n💡 Please fix the critical issues above before using Notion integration.');
        }

        return allCriticalPassed;
    }
}

// CLI handling
if (require.main === module) {
    const tester = new NotionTest();
    tester.runAllTests().then(success => {
        if (!success) {
            throw new Error('Tests failed');
        }
    }).catch(error => {
        console.error('❌ Test runner failed:', error.message);
        throw error;
    });
}

module.exports = NotionTest;
