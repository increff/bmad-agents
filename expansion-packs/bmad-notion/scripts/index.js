/**
 * BMAD Notion Scripts - Index File
 * Provides programmatic access to all Notion integration scripts
 */

const NotionDispatcher = require('./notion-dispatcher');
const NotionPush = require('./notion-push');
const NotionTest = require('./notion-test');
const NotionStatus = require('./notion-status');
const NotionList = require('./notion-list');
const NotionConfig = require('./notion-config');
const NotionHelp = require('./notion-help');

// Export all script classes
module.exports = {
    NotionDispatcher,
    NotionPush,
    NotionTest,
    NotionStatus,
    NotionList,
    NotionConfig,
    NotionHelp,

    // Convenience functions
    async dispatch(args) {
        const dispatcher = new NotionDispatcher();
        return dispatcher.dispatch(args);
    },

    async test() {
        const tester = new NotionTest();
        return tester.runAllTests();
    },

    async push(pageUrlOrId, options = {}) {
        const pusher = new NotionPush();
        return pusher.push(pageUrlOrId, options);
    },

    showStatus() {
        const status = new NotionStatus();
        return status.displayStatus();
    },

    async list(options = {}) {
        const lister = new NotionList();
        return lister.listRequirements(options);
    },

    showConfig() {
        const config = new NotionConfig();
        return config.displayConfig();
    },

    showHelp(commandName = null) {
        const help = new NotionHelp();
        if (commandName) {
            return help.displayCommandHelp(commandName);
        } else {
            return help.displayFullHelp();
        }
    },

    // Interactive mode
    async interactive() {
        const dispatcher = new NotionDispatcher();
        return dispatcher.interactiveMode();
    }
};

// CLI handling - if called directly, run dispatcher
if (require.main === module) {
    const args = process.argv.slice(2);
    const dispatcher = new NotionDispatcher();
    
    if (args.includes('--interactive') || args.includes('-i')) {
        dispatcher.interactiveMode();
    } else {
        dispatcher.dispatch(args);
    }
}
