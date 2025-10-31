/**
 * Environment Loader for VIRAT *implement Command
 * Ensures .env file is loaded before any VIRAT operations
 */

const path = require('path');
const fs = require('fs').promises;

class VIRATEnvironmentLoader {
    constructor() {
        this.projectRoot = this.findProjectRoot();
        this.envPath = path.join(this.projectRoot, '.env');
        this.viratConfigPath = path.join(this.projectRoot, '.bmad-virtual-intelligent-repository-analysis-transformation', 'config.yaml');
    }

    /**
     * Find the project root directory
     */
    findProjectRoot() {
        let currentDir = process.cwd();
        
        // Look for .bmad-core directory or .env file
        while (currentDir !== path.dirname(currentDir)) {
            const bmadCorePath = path.join(currentDir, '.bmad-core');
            const envPath = path.join(currentDir, '.env');
            
            try {
                if (require('fs').existsSync(bmadCorePath) || require('fs').existsSync(envPath)) {
                    return currentDir;
                }
            } catch {
                // Continue searching
            }
            
            currentDir = path.dirname(currentDir);
        }
        
        // Fallback to current directory
        return process.cwd();
    }

    /**
     * Load environment variables from .env file
     */
    async loadEnvironment() {
        try {
            console.log('🔧 Loading VIRAT environment configuration...');
            
            // Check if .env file exists
            const envExists = await this.fileExists(this.envPath);
            if (!envExists) {
                throw new Error(`❌ .env file not found at ${this.envPath}`);
            }

            // Load .env file with override
            const dotenv = require('dotenv');
            const envConfig = dotenv.config({ 
                path: this.envPath, 
                override: true 
            });

            if (envConfig.error) {
                throw new Error(`Failed to load .env file: ${envConfig.error.message}`);
            }

            // Validate required variables
            const notionApiKey = process.env.NOTION_API_KEY;
            if (!notionApiKey || notionApiKey.trim() === '') {
                throw new Error('❌ NOTION_API_KEY is not set in .env file');
            }

            if (notionApiKey === 'your_notion_api_key_here' || notionApiKey.startsWith('your_notion')) {
                throw new Error('❌ Placeholder API key detected - please update your .env file with a real Notion API key');
            }

            console.log('✅ Environment loaded successfully');
            console.log(`   📁 Project root: ${this.projectRoot}`);
            console.log(`   📄 .env file: ${this.envPath}`);
            console.log(`   🔑 API Key: Set (${notionApiKey.length} characters)`);
            console.log(`   🗄️  Database ID: ${process.env.NOTION_DATABASE_ID || 'Not set'}`);

            return {
                projectRoot: this.projectRoot,
                envPath: this.envPath,
                viratConfigPath: this.viratConfigPath,
                notionApiKey: notionApiKey,
                notionDatabaseId: process.env.NOTION_DATABASE_ID || '',
                notionViewId: process.env.NOTION_VIEW_ID || '',
                apiVersion: process.env.NOTION_API_VERSION || '2022-06-28'
            };

        } catch (error) {
            console.error('❌ Environment loading failed:', error.message);
            console.log('');
            console.log('💡 To fix this issue:');
            console.log('   1. Run the BMAD installer again and provide your Notion API key');
            console.log('   2. Or manually create a .env file with:');
            console.log('      NOTION_API_KEY=your_actual_api_key_here');
            console.log('      NOTION_DATABASE_ID=your_database_id_here');
            console.log('');
            throw error;
        }
    }

    /**
     * Verify environment setup
     */
    async verifyEnvironment() {
        try {
            console.log('🔍 Verifying VIRAT environment...');
            
            // Check .env file
            const envExists = await this.fileExists(this.envPath);
            if (!envExists) {
                console.log('❌ .env file not found');
                return false;
            }

            // Check VIRAT config
            const configExists = await this.fileExists(this.viratConfigPath);
            if (!configExists) {
                console.log('❌ VIRAT config not found');
                return false;
            }

            // Load and validate environment
            await this.loadEnvironment();
            
            console.log('✅ Environment verification passed');
            return true;

        } catch (error) {
            console.log('❌ Environment verification failed:', error.message);
            return false;
        }
    }

    /**
     * Get environment info for debugging
     */
    async getEnvironmentInfo() {
        const info = {
            projectRoot: this.projectRoot,
            envPath: this.envPath,
            viratConfigPath: this.viratConfigPath,
            envExists: await this.fileExists(this.envPath),
            configExists: await this.fileExists(this.viratConfigPath)
        };

        if (info.envExists) {
            try {
                const dotenv = require('dotenv');
                dotenv.config({ path: this.envPath, override: true });
                
                info.notionApiKeySet = !!process.env.NOTION_API_KEY;
                info.notionApiKeyLength = process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.length : 0;
                info.notionDatabaseIdSet = !!process.env.NOTION_DATABASE_ID;
            } catch (error) {
                info.envLoadError = error.message;
            }
        }

        return info;
    }

    /**
     * Check if file exists
     */
    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Create a wrapper function for VIRAT operations
     */
    async withEnvironment(operation) {
        const env = await this.loadEnvironment();
        return operation(env);
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    
    const loader = new VIRATEnvironmentLoader();
    
    switch (command) {
        case 'load':
            loader.loadEnvironment()
                .then(env => {
                    console.log('Environment loaded:', env);
                })
                .catch(error => {
                    console.error('Failed to load environment:', error.message);
                    throw error;
                });
            break;
            
        case 'verify':
            loader.verifyEnvironment()
                .then(success => {
                    if (!success) {
                        throw new Error('Environment verification failed');
                    }
                });
            break;
            
        case 'info':
            loader.getEnvironmentInfo()
                .then(info => {
                    console.log('Environment Info:', JSON.stringify(info, null, 2));
                });
            break;
            
        default:
            console.log('VIRAT Environment Loader');
            console.log('');
            console.log('Usage:');
            console.log('  node env-loader.js load     - Load environment variables');
            console.log('  node env-loader.js verify   - Verify environment setup');
            console.log('  node env-loader.js info     - Show environment information');
            console.log('');
            console.log('This script ensures .env file is loaded before VIRAT operations.');
            break;
    }
}

module.exports = VIRATEnvironmentLoader;
