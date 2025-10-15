/**
 * Test script to verify BMAD Notion Integration setup
 * This script checks if all dependencies and configurations are in place
 */

const fs = require('fs');
const path = require('path');

function checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${description}: ${filePath}`);
        return true;
    } else {
        console.log(`❌ ${description}: ${filePath} (missing)`);
        return false;
    }
}

function checkEnvFile() {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        console.log('❌ .env file not found');
        return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
    let allPresent = true;
    
    for (const varName of requiredVars) {
        if (envContent.includes(`${varName}=`) && !envContent.includes(`${varName}=xxx`)) {
            console.log(`✅ ${varName} is configured`);
        } else {
            console.log(`❌ ${varName} is missing or not configured`);
            allPresent = false;
        }
    }
    
    return allPresent;
}

function checkNodeModules() {
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    const packageJsonPath = path.join(__dirname, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
        console.log('❌ package.json not found');
        return false;
    }
    
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('❌ node_modules not found - run npm install');
        return false;
    }
    
    // Check for specific dependencies
    const requiredDeps = ['@notionhq/client', 'dotenv'];
    let allPresent = true;
    
    for (const dep of requiredDeps) {
        const depPath = path.join(nodeModulesPath, dep);
        if (fs.existsSync(depPath)) {
            console.log(`✅ ${dep} is installed`);
        } else {
            console.log(`❌ ${dep} is not installed`);
            allPresent = false;
        }
    }
    
    return allPresent;
}

function main() {
    console.log('🧪 BMAD Notion Integration - Setup Test');
    console.log('═'.repeat(50));
    
    let allGood = true;
    
    // Check core files
    allGood &= checkFile(path.join(__dirname, 'notion-handler.js'), 'Main handler script');
    allGood &= checkFile(path.join(__dirname, 'notion-command-wrapper.js'), 'Command wrapper script');
    allGood &= checkFile(path.join(__dirname, 'package.json'), 'Package configuration');
    allGood &= checkFile(path.join(__dirname, 'env.example'), 'Environment template');
    allGood &= checkFile(path.join(__dirname, 'install.sh'), 'Installation script');
    
    console.log('');
    
    // Check dependencies
    console.log('📦 Checking Dependencies:');
    allGood &= checkNodeModules();
    
    console.log('');
    
    // Check environment configuration
    console.log('🔧 Checking Environment Configuration:');
    allGood &= checkEnvFile();
    
    console.log('');
    console.log('═'.repeat(50));
    
    if (allGood) {
        console.log('🎉 All checks passed! Setup is complete.');
        console.log('');
        console.log('Next steps:');
        console.log('1. Test connection: node notion-handler.js test');
        console.log('2. Try fetching: node notion-handler.js fetch REQ-994 --dry-run');
        console.log('3. Use in BMAD: *notion-fetch REQ-994');
    } else {
        console.log('❌ Some checks failed. Please fix the issues above.');
        console.log('');
        console.log('Quick fixes:');
        console.log('1. Run: ./install.sh');
        console.log('2. Configure .env with your Notion credentials');
        console.log('3. Run this test again');
    }
}

if (require.main === module) {
    main();
}

module.exports = { checkFile, checkEnvFile, checkNodeModules };
