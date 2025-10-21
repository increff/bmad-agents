/**
 * Environment Verification Script
 * Verifies that .env file is loaded correctly and overrides shell variables
 */

const path = require('path');

// Force load .env file and override any shell environment variables
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '..', '.env');
const envConfig = dotenv.config({ path: envPath, override: true });

if (envConfig.error) {
    throw new Error(`❌ Error loading .env file: ${envConfig.error.message}`);
}

console.log('🔍 Environment Verification:');
console.log('═'.repeat(50));
console.log('📁 .env file path:', envPath);
console.log('📄 .env file exists:', require('fs').existsSync(envPath));
console.log('🔑 API Key loaded:', process.env.NOTION_API_KEY ? 'Yes' : 'No');
console.log('🔑 API Key length:', process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.length : 0);
console.log('🔑 API Key starts with:', process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.substring(0, 15) + '...' : 'undefined');
console.log('🗄️  Database ID:', process.env.NOTION_DATABASE_ID);
console.log('═'.repeat(50));

// Check for common issues
const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) {
    throw new Error('❌ No API key found');
} else if (apiKey === 'your_notion_api_key_here' || apiKey.startsWith('your_notion')) {
    throw new Error('❌ Placeholder API key detected - please update your .env file');
} else if (apiKey.length < 20) {
    throw new Error('❌ API key seems too short - please check your .env file');
} else {
    console.log('✅ Environment configuration looks good!');
}
