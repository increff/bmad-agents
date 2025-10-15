#!/usr/bin/env node

/**
 * BMAD Notion Config Script
 * Shows current configuration and field mappings
 */

const fs = require('fs');
const yaml = require('js-yaml');

class NotionConfig {
    constructor() {
        this.envFile = '.env';
        this.configFile = 'config.yaml';
        this.packageFile = 'package.json';
    }

    /**
     * Load environment variables
     */
    loadEnvironment() {
        const env = {};
        
        if (fs.existsSync(this.envFile)) {
            const envContent = fs.readFileSync(this.envFile, 'utf8');
            const lines = envContent.split('\n');
            
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...valueParts] = trimmed.split('=');
                    if (key && valueParts.length > 0) {
                        env[key.trim()] = valueParts.join('=').trim();
                    }
                }
            });
        }

        // Also load from process.env
        const notionVars = Object.keys(process.env)
            .filter(key => key.startsWith('NOTION_'))
            .reduce((obj, key) => {
                obj[key] = process.env[key];
                return obj;
            }, {});

        return { ...env, ...notionVars };
    }

    /**
     * Load YAML configuration
     */
    loadYamlConfig() {
        if (!fs.existsSync(this.configFile)) {
            return null;
        }

        try {
            const yamlContent = fs.readFileSync(this.configFile, 'utf8');
            return yaml.load(yamlContent);
        } catch (error) {
            console.error('⚠️  Error parsing config.yaml:', error.message);
            return null;
        }
    }

    /**
     * Load package.json
     */
    loadPackageInfo() {
        if (!fs.existsSync(this.packageFile)) {
            return null;
        }

        try {
            const packageContent = fs.readFileSync(this.packageFile, 'utf8');
            return JSON.parse(packageContent);
        } catch (error) {
            console.error('⚠️  Error parsing package.json:', error.message);
            return null;
        }
    }

    /**
     * Mask sensitive values
     */
    maskSensitive(key, value) {
        const sensitiveKeys = ['API_KEY', 'TOKEN', 'SECRET', 'PASSWORD'];
        
        if (sensitiveKeys.some(sensitive => key.includes(sensitive))) {
            if (!value) return 'Not set';
            return value.substring(0, 10) + '...';
        }
        
        return value || 'Not set';
    }

    /**
     * Get configuration status
     */
    getConfigStatus() {
        const env = this.loadEnvironment();
        const yamlConfig = this.loadYamlConfig();
        
        const requiredVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
        
        const status = {
            complete: true,
            missing: [],
            warnings: []
        };

        // Check required variables
        requiredVars.forEach(varName => {
            if (!env[varName]) {
                status.complete = false;
                status.missing.push(varName);
            }
        });

        // Check for warnings
        if (!fs.existsSync(this.envFile)) {
            status.warnings.push('No .env file found');
        }
        
        if (!yamlConfig) {
            status.warnings.push('No config.yaml found or invalid format');
        }

        return status;
    }

    /**
     * Display configuration
     */
    displayConfig() {
        console.log('⚙️  NOTION INTEGRATION CONFIGURATION\n');
        console.log('═'.repeat(60));

        // Environment Variables
        console.log('\n🔧 ENVIRONMENT VARIABLES');
        const env = this.loadEnvironment();
        
        const allVars = [
            'NOTION_API_KEY',
            'NOTION_DATABASE_ID', 
            'NOTION_VIEW_ID',
            'NOTION_API_VERSION'
        ];

        allVars.forEach(varName => {
            const value = env[varName];
            const maskedValue = this.maskSensitive(varName, value);
            const status = value ? '✅' : '❌';
            const required = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'].includes(varName) ? ' (Required)' : ' (Optional)';
            
            console.log(`  ${status} ${varName}${required}: ${maskedValue}`);
        });

        // Configuration Files
        console.log('\n📁 CONFIGURATION FILES');
        
        const files = [
            { path: this.envFile, name: 'Environment File', required: true },
            { path: this.configFile, name: 'YAML Configuration', required: false },
            { path: this.packageFile, name: 'Package Configuration', required: true }
        ];

        files.forEach(file => {
            const exists = fs.existsSync(file.path);
            const status = exists ? '✅' : (file.required ? '❌' : '⚪');
            const size = exists ? this.getFileSize(file.path) : '';
            
            console.log(`  ${status} ${file.name}: ${exists ? 'Present' : 'Missing'} ${size}`);
        });

        // YAML Configuration Details
        const yamlConfig = this.loadYamlConfig();
        if (yamlConfig) {
            console.log('\n📋 YAML CONFIGURATION DETAILS');
            
            if (yamlConfig.field_mappings) {
                console.log('  🗺️  Field Mappings:');
                Object.entries(yamlConfig.field_mappings).forEach(([key, value]) => {
                    console.log(`    • ${key}: "${value}"`);
                });
            }
            
            if (yamlConfig.api_settings) {
                console.log('  🔧 API Settings:');
                Object.entries(yamlConfig.api_settings).forEach(([key, value]) => {
                    console.log(`    • ${key}: ${value}`);
                });
            }
            
            if (yamlConfig.documentation_patterns) {
                console.log('  📄 Documentation Patterns:');
                yamlConfig.documentation_patterns.forEach(pattern => {
                    console.log(`    • ${pattern}`);
                });
            }
        }

        // Package Information
        const packageInfo = this.loadPackageInfo();
        if (packageInfo) {
            console.log('\n📦 PACKAGE INFORMATION');
            console.log(`  📝 Name: ${packageInfo.name || 'Unknown'}`);
            console.log(`  🏷️  Version: ${packageInfo.version || 'Unknown'}`);
            
            if (packageInfo.dependencies) {
                console.log('  📚 Dependencies:');
                Object.entries(packageInfo.dependencies).forEach(([name, version]) => {
                    console.log(`    • ${name}: ${version}`);
                });
            }
        }

        // Default Configuration
        console.log('\n🎯 DEFAULT CONFIGURATION');
        console.log('  🗺️  Default Field Mappings:');
        console.log('    • requirement_id: "No ID"');
        console.log('    • content_section: "Below Comments" (extracted from page blocks)');
        console.log('    • push_target_section: "Below Comments"');
        
        console.log('  📄 Default Documentation Patterns:');
        console.log('    • **/*-ANALYSIS.md');
        console.log('    • **/*-PLAN.md');
        console.log('    • **/*-IMPLEMENTATION.md');
        console.log('    • **/*-CHANGES.md');
        console.log('    • **/CHANGELOG.md');
        console.log('    • **/README*.md');
        
        console.log('\n  📋 Content Extraction:');
        console.log('    • Source: Page blocks below Comments section');
        console.log('    • Format: Markdown with formatting preserved');
        console.log('    • Stop at: I. REQUIREMENT, II. SOLUTION, III. DEVELOPMENT, IV. RELEASE sections');

        // Configuration Status
        console.log('\n' + '═'.repeat(60));
        console.log('📊 CONFIGURATION STATUS\n');
        
        const status = this.getConfigStatus();
        
        if (status.complete) {
            console.log('✅ Configuration: Complete');
            console.log('🚀 Status: Ready to use');
        } else {
            console.log('❌ Configuration: Incomplete');
            console.log(`🚨 Missing: ${status.missing.join(', ')}`);
        }
        
        if (status.warnings.length > 0) {
            console.log('⚠️  Warnings:');
            status.warnings.forEach(warning => {
                console.log(`  • ${warning}`);
            });
        }

        // Next Steps
        console.log('\n💡 NEXT STEPS');
        
        if (!status.complete) {
            console.log('1. Create .env file with required variables:');
            console.log('   cp .env.example .env');
            console.log('2. Edit .env with your Notion credentials');
            console.log('3. Run: *notion_test to verify configuration');
        } else {
            console.log('✅ Configuration is complete!');
            console.log('🚀 Available commands:');
            console.log('   • *notion_test - Test connection');
            console.log('   • *notion_implement REQ-XXX - Extract and implement');
            console.log('   • *notion_list - List requirements');
            console.log('   • *notion-help - Show all commands');
        }
    }

    /**
     * Get file size
     */
    getFileSize(filePath) {
        try {
            const stats = fs.statSync(filePath);
            const bytes = stats.size;
            
            if (bytes === 0) return '(0 B)';
            
            const k = 1024;
            const sizes = ['B', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return `(${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]})`;
        } catch (error) {
            return '';
        }
    }

    /**
     * Update configuration
     */
    updateConfig(key, value) {
        if (!fs.existsSync(this.envFile)) {
            console.log('📝 Creating .env file...');
            fs.writeFileSync(this.envFile, '# Notion Integration Configuration\n');
        }

        const envContent = fs.readFileSync(this.envFile, 'utf8');
        const lines = envContent.split('\n');
        
        let found = false;
        const updatedLines = lines.map(line => {
            if (line.trim().startsWith(`${key}=`)) {
                found = true;
                return `${key}=${value}`;
            }
            return line;
        });

        if (!found) {
            updatedLines.push(`${key}=${value}`);
        }

        fs.writeFileSync(this.envFile, updatedLines.join('\n'));
        console.log(`✅ Updated ${key} in .env file`);
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    const config = new NotionConfig();

    if (args.length >= 2 && args[0] === 'set') {
        // Update configuration
        const key = args[1];
        const value = args[2];
        
        if (!value) {
            console.error('❌ Usage: notion-config set KEY VALUE');
            throw new Error('Missing value for configuration key');
        }
        
        config.updateConfig(key, value);
    } else {
        // Display configuration
        config.displayConfig();
    }
}

module.exports = NotionConfig;
