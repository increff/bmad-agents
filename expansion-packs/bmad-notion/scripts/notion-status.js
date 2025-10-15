#!/usr/bin/env node

/**
 * BMAD Notion Status Script
 * Shows current integration status and last operation
 */

const fs = require('fs');
const path = require('path');

class NotionStatus {
    constructor() {
        this.docsDir = path.join(__dirname, '..', 'docs');
        this.trackingFile = path.join(this.docsDir, '.notion-tracking.json');
        this.configFile = path.join(__dirname, '..', 'config.yaml');
        this.envFile = path.join(__dirname, '..', '.env');
    }

    /**
     * Load tracking data
     */
    loadTrackingData() {
        if (!fs.existsSync(this.trackingFile)) {
            return {};
        }
        
        try {
            return JSON.parse(fs.readFileSync(this.trackingFile, 'utf8'));
        } catch (error) {
            console.error('⚠️  Error reading tracking file:', error.message);
            return {};
        }
    }

    /**
     * Check environment configuration
     */
    checkEnvironment() {
        const requiredVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
        const optionalVars = ['NOTION_VIEW_ID', 'NOTION_API_VERSION'];
        
        const status = {
            configured: true,
            missing: [],
            present: []
        };

        // Load .env if exists
        if (fs.existsSync(this.envFile)) {
            require('dotenv').config();
        }

        // Check required variables
        requiredVars.forEach(varName => {
            if (process.env[varName]) {
                status.present.push(varName);
            } else {
                status.missing.push(varName);
                status.configured = false;
            }
        });

        // Check optional variables
        optionalVars.forEach(varName => {
            if (process.env[varName]) {
                status.present.push(varName);
            }
        });

        return status;
    }

    /**
     * Get file system status
     */
    getFileSystemStatus() {
        const baseDir = path.join(__dirname, '..');
        const files = [
            { path: this.envFile, name: 'Environment Config', required: true },
            { path: this.configFile, name: 'YAML Config', required: false },
            { path: this.docsDir, name: 'Docs Directory', required: true },
            { path: this.trackingFile, name: 'Tracking Data', required: false },
            { path: path.join(baseDir, 'scripts', 'notion-handler.js'), name: 'Main Handler', required: true },
            { path: path.join(baseDir, 'scripts', 'notion-command-wrapper.js'), name: 'Command Wrapper', required: true },
            { path: path.join(baseDir, 'package.json'), name: 'Dependencies', required: true },
            { path: path.join(baseDir, 'node_modules'), name: 'Installed Packages', required: true }
        ];

        return files.map(file => ({
            ...file,
            exists: fs.existsSync(file.path),
            size: fs.existsSync(file.path) ? this.getFileSize(file.path) : null
        }));
    }

    /**
     * Get file size in human readable format
     */
    getFileSize(filePath) {
        try {
            const stats = fs.statSync(filePath);
            const bytes = stats.size;
            
            if (bytes === 0) return '0 B';
            
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        } catch (error) {
            return 'Unknown';
        }
    }

    /**
     * Format timestamp for display
     */
    formatTimestamp(timestamp) {
        if (!timestamp) return 'Never';
        
        try {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            
            return date.toLocaleDateString();
        } catch (error) {
            return timestamp;
        }
    }

    /**
     * Get operation statistics
     */
    getOperationStats(trackingData) {
        const entries = Object.values(trackingData);
        
        const stats = {
            total: entries.length,
            extracted: entries.filter(e => e.status === 'extracted' || e.status === 'completed').length,
            implemented: entries.filter(e => e.status === 'completed').length,
            pushed: entries.filter(e => e.pushed_at).length,
            failed: entries.filter(e => e.status === 'failed').length
        };

        return stats;
    }

    /**
     * Get recent operations
     */
    getRecentOperations(trackingData, limit = 5) {
        const entries = Object.entries(trackingData)
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => new Date(b.extracted_at || 0) - new Date(a.extracted_at || 0))
            .slice(0, limit);

        return entries;
    }

    /**
     * Display status
     */
    displayStatus() {
        console.log('📊 NOTION INTEGRATION STATUS\n');
        console.log('═'.repeat(50));

        // Environment Status
        console.log('\n🔧 ENVIRONMENT CONFIGURATION');
        const envStatus = this.checkEnvironment();
        
        if (envStatus.configured) {
            console.log('  ✅ Status: Configured');
            console.log(`  📋 Variables Set: ${envStatus.present.length}`);
        } else {
            console.log('  ❌ Status: Missing Configuration');
            console.log(`  🚨 Missing: ${envStatus.missing.join(', ')}`);
        }

        // File System Status
        console.log('\n📁 FILE SYSTEM STATUS');
        const fileStatus = this.getFileSystemStatus();
        
        fileStatus.forEach(file => {
            const status = file.exists ? '✅' : (file.required ? '❌' : '⚪');
            const size = file.exists && file.size ? ` (${file.size})` : '';
            console.log(`  ${status} ${file.name}: ${file.exists ? 'Present' : 'Missing'}${size}`);
        });

        // Tracking Data Status
        console.log('\n📈 OPERATION HISTORY');
        const trackingData = this.loadTrackingData();
        
        if (Object.keys(trackingData).length === 0) {
            console.log('  ⚪ No operations recorded yet');
            console.log('  💡 Run *notion_implement REQ-XXX to get started');
        } else {
            const stats = this.getOperationStats(trackingData);
            
            console.log(`  📊 Total Operations: ${stats.total}`);
            console.log(`  ✅ Successfully Extracted: ${stats.extracted}`);
            console.log(`  🚀 Fully Implemented: ${stats.implemented}`);
            console.log(`  📤 Documentation Pushed: ${stats.pushed}`);
            if (stats.failed > 0) {
                console.log(`  ❌ Failed Operations: ${stats.failed}`);
            }
        }

        // Recent Operations
        if (Object.keys(trackingData).length > 0) {
            console.log('\n📋 RECENT OPERATIONS');
            const recentOps = this.getRecentOperations(trackingData);
            
            recentOps.forEach((op, index) => {
                const statusIcon = {
                    'extracted': '📥',
                    'completed': '✅',
                    'failed': '❌'
                }[op.status] || '⚪';
                
                const pushedIcon = op.pushed_at ? '📤' : '⏳';
                
                console.log(`  ${index + 1}. ${statusIcon} ${op.id}`);
                console.log(`     📅 Extracted: ${this.formatTimestamp(op.extracted_at)}`);
                if (op.pushed_at) {
                    console.log(`     ${pushedIcon} Pushed: ${this.formatTimestamp(op.pushed_at)}`);
                }
                if (op.files_pushed) {
                    console.log(`     📄 Files: ${op.files_pushed}`);
                }
            });
        }

        // Current Status Summary
        console.log('\n' + '═'.repeat(50));
        console.log('🎯 CURRENT STATUS\n');

        if (!envStatus.configured) {
            console.log('❌ Not Ready: Missing environment configuration');
            console.log('💡 Action: Configure .env file with API credentials');
        } else if (!fileStatus.every(f => f.exists || !f.required)) {
            console.log('⚠️  Partially Ready: Missing some files');
            console.log('💡 Action: Run ./install.sh to set up dependencies');
        } else {
            console.log('✅ Ready: All systems operational');
            console.log('💡 Available commands:');
            console.log('   • *notion_implement REQ-XXX - Extract and implement');
            console.log('   • *notion_push - Push documentation');
            console.log('   • *notion_test - Test connection');
            console.log('   • *notion-help - Show all commands');
        }

        // Last Operation
        if (Object.keys(trackingData).length > 0) {
            const lastOp = this.getRecentOperations(trackingData, 1)[0];
            console.log(`\n🕐 Last Operation: ${lastOp.id} (${this.formatTimestamp(lastOp.extracted_at)})`);
        }
    }
}

// CLI handling
if (require.main === module) {
    const status = new NotionStatus();
    status.displayStatus();
}

module.exports = NotionStatus;
