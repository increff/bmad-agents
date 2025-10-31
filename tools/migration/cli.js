/**
 * BMAD Migration CLI - Complete Cross-Branch Migration System
 *
 * Implements the *implement-migration command from VIRAT:
 * - Intelligent commit migration between branches
 * - Pattern adaptation and rule validation
 * - Expert agent coordination
 * - MCP-enhanced analysis and code generation
 * - Complete workflow management
 *
 * Usage: node cli.js <repository> <source-branch> <target-branch> [options]
 */

const MigrationEngine = require('./migration-engine');
const ExpertCoordinator = require('./expert-coordinator');
const ValidationFramework = require('./validation-framework');
const WorkflowManager = require('./workflow-manager');
const MCPIntegration = require('./mcp-integration');

class MigrationCLI {
  constructor() {
    this.engine = null;
    this.expertCoordinator = null;
    this.validationFramework = null;
    this.workflowManager = null;
    this.mcpIntegration = null;
  }

  async run() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
      this.showHelp();
      return;
    }

    if (args[0] === '--version' || args[0] === '-v') {
      this.showVersion();
      return;
    }

    try {
      await this.initializeSystem(args);
      await this.executeMigration();
    } catch (error) {
      console.error(`❌ Migration failed: ${error.message}`);
      console.error(error.stack);

      // Attempt rollback if migration was started
      if (this.workflowManager && !this.engine.options.dryRun) {
        console.log('\n🔄 Attempting to rollback failed migration...');
        try {
          await this.workflowManager.rollbackFailedMigration();
          console.log('✅ Rollback completed');
        } catch (rollbackError) {
          console.error(`❌ Rollback failed: ${rollbackError.message}`);
        }
      }

      process.exit(1);
    }
  }

  showHelp() {
    console.log(`
🔬 BMAD Migration System - Cross-Branch Commit Migration

USAGE:
  node cli.js <repository> <source-branch> <target-branch> [options]

REPOSITORIES:
  irisx-algo        Java Algorithm Repository
  ms-loadapis       Python LoadAPI Repository
  ms-mfp           Python MFP Repository
  irisx-config      SQL/Config Repository

OPTIONS:
  --dry-run         Preview migration without making changes
  --verbose         Show detailed progress information
  --skip-validation Skip validation steps (not recommended)
  --help, -h        Show this help message
  --version, -v     Show version information

EXAMPLES:
  # Migrate from reliance branch to production in algorithm repo
  node cli.js irisx-algo master-ril caas-release

  # Dry-run migration in LoadAPI repository
  node cli.js ms-loadapis caas-ril-uploads release_optimised --dry-run

  # Verbose migration with full validation
  node cli.js irisx-config master-ril caas-staging_fix --verbose

DESCRIPTION:
  This tool implements intelligent migration of commits from a source branch
  to a target branch while adapting to the target branch's patterns and
  conventions. It follows the complete BMAD migration workflow with:

  - Pattern analysis and adaptation
  - Expert agent conflict resolution
  - Rule compliance validation
  - MCP-enhanced code analysis
  - Systematic workflow management

  NEVER raises PRs or merges automatically - designed for controlled migration.

OUTPUT:
  All migration artifacts are saved to: migration-output/{migration-id}/
  - migration-analysis.md: Detailed commit analysis
  - source-patterns.md: Source branch patterns
  - target-patterns.md: Target branch patterns
  - MIGRATION_REPORT.md: Complete migration report
  - WORKFLOW_SUMMARY.md: Workflow execution summary

EXIT CODES:
  0  Success
  1  Migration failed
  2  Invalid arguments
  3  Repository not accessible
`);
  }

  showVersion() {
    console.log('BMAD Migration System v2.0.0');
    console.log('Powered by VIRAT - Virtual Intelligent Repository Analysis and Transformation');
  }

  async initializeSystem(args) {
    console.log('🚀 Initializing BMAD Migration System...\n');

    // Parse arguments
    const [repository, sourceBranch, targetBranch, ...options] = args;

    if (!repository || !sourceBranch || !targetBranch) {
      console.error('❌ Missing required arguments');
      console.error('Usage: node cli.js <repository> <source-branch> <target-branch> [options]');
      process.exit(2);
    }

    // Parse options
    const parsedOptions = this.parseOptions(options);

    // Validate repository
    const validRepos = ['irisx-algo', 'ms-loadapis', 'ms-mfp', 'irisx-config'];
    if (!validRepos.includes(repository)) {
      console.error(`❌ Invalid repository: ${repository}`);
      console.error(`Valid repositories: ${validRepos.join(', ')}`);
      process.exit(2);
    }

    // Initialize core engine
    console.log(`📦 Initializing migration engine for ${repository}...`);
    this.engine = new MigrationEngine(repository, sourceBranch, targetBranch, parsedOptions);

    // Initialize MCP integration
    console.log('🔧 Initializing MCP tools...');
    this.mcpIntegration = new MCPIntegration(this.engine);
    await this.mcpIntegration.initializeMCPTools();

    // Initialize expert coordinator
    console.log('🧠 Initializing expert agents...');
    this.expertCoordinator = new ExpertCoordinator(this.engine);
    await this.expertCoordinator.initializeExperts();

    // Initialize validation framework
    console.log('✅ Initializing validation framework...');
    this.validationFramework = new ValidationFramework(
      this.engine,
      this.expertCoordinator
    );

    // Initialize workflow manager
    console.log('📋 Initializing workflow manager...');
    this.workflowManager = new WorkflowManager(
      this.engine,
      this.expertCoordinator,
      this.validationFramework
    );

    console.log('✅ System initialization complete\n');
  }

  parseOptions(options) {
    const parsed = {};

    options.forEach(option => {
      switch (option) {
        case '--dry-run':
          parsed.dryRun = true;
          break;
        case '--verbose':
          parsed.verbose = true;
          break;
        case '--skip-validation':
          parsed.skipValidation = true;
          break;
        default:
          if (option.startsWith('--')) {
            console.warn(`⚠️ Unknown option: ${option}`);
          }
      }
    });

    return parsed;
  }

  async executeMigration() {
    const startTime = Date.now();

    try {
      // Execute migration phases
      await this.executePhase1();
      await this.executePhase2();
      await this.executePhase3();
      await this.executePhase4();
      await this.executePhase5();
      await this.executePhase6();
      await this.executePhase7();
      await this.executePhase8();

      // Generate final reports
      await this.generateFinalReports();

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`\n🎉 Migration completed successfully in ${duration}s!`);
      console.log(`📊 Reports saved to: ${this.engine.outputDir}`);

    } catch (error) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.error(`\n💥 Migration failed after ${duration}s: ${error.message}`);
      throw error;
    }
  }

  async executePhase1() {
    console.log('📋 Phase 1: Migration Setup');
    await this.engine.phase1_setup();

    if (this.engine.options.verbose) {
      console.log(`   📊 Found ${this.engine.commitsToMigrate.length} commits to migrate`);
    }
  }

  async executePhase2() {
    console.log('\n🔍 Phase 2: Migration Analysis');
    await this.engine.phase2_analysis();

    if (this.engine.options.verbose) {
      console.log('   ✅ Source and target patterns analyzed');
    }
  }

  async executePhase3() {
    console.log('\n📝 Phase 3: Migration Planning');
    await this.engine.phase3_planning();

    if (this.engine.options.verbose) {
      console.log('   📋 Implementation plan created');
    }
  }

  async executePhase4() {
    console.log('\n🌿 Phase 4: Feature Branch Management');
    await this.workflowManager.createFeatureBranch();
    await this.workflowManager.prepareTargetEnvironment();

    if (this.engine.options.verbose) {
      console.log(`   ✅ Feature branch created: ${this.workflowManager.featureBranch}`);
    }
  }

  async executePhase5() {
    console.log('\n⚙️ Phase 5: Migration Execution');
    await this.workflowManager.implementCommits();

    const status = this.workflowManager.getWorkflowStatus();
    console.log(`   📊 Implemented ${status.completedCommits}/${status.totalCommits} commits`);
  }

  async executePhase6() {
    console.log('\n✅ Phase 6: Validation and Testing');
    await this.workflowManager.validateImplementation();

    if (this.engine.options.verbose) {
      console.log('   🔍 Validation completed');
    }
  }

  async executePhase7() {
    console.log('\n📚 Phase 7: Migration Documentation');
    await this.workflowManager.reviewFeatureBranch();
    await this.workflowManager.generateWorkflowReport();

    if (this.engine.options.verbose) {
      console.log('   📋 Documentation generated');
    }
  }

  async executePhase8() {
    console.log('\n🎯 Phase 8: Migration Finalization');

    if (!this.engine.options.dryRun) {
      await this.workflowManager.mergeToTargetBranch();
      await this.workflowManager.deleteFeatureBranch();
      await this.workflowManager.pushChanges();
      console.log('   ✅ Migration finalized - changes merged and pushed');
    } else {
      console.log('   📋 Dry-run mode - skipping merge and push');
    }
  }

  async generateFinalReports() {
    console.log('\n📊 Generating final reports...');

    // Generate comprehensive migration report
    await this.engine.saveMigrationReport();

    // Generate workflow summary
    await this.workflowManager.generateWorkflowReport();

    // Generate expert knowledge summary
    const expertKnowledge = await this.expertCoordinator.exportExpertKnowledge();
    const expertPath = `${this.engine.outputDir}/expert-knowledge.json`;
    const fs = require('fs').promises;
    await fs.writeFile(expertPath, JSON.stringify(expertKnowledge, null, 2));

    // Generate validation summary
    const validationReport = await this.validationFramework.generateValidationReport();
    const validationPath = `${this.engine.outputDir}/validation-summary.json`;
    await fs.writeFile(validationPath, JSON.stringify(validationReport, null, 2));

    // Generate MCP status report
    const mcpStatus = this.mcpIntegration.getMCPStatus();
    const mcpPath = `${this.engine.outputDir}/mcp-status.json`;
    await fs.writeFile(mcpPath, JSON.stringify(mcpStatus, null, 2));

    console.log('   ✅ Final reports generated');
  }

  // Utility methods for status monitoring
  showStatus() {
    if (!this.workflowManager) {
      console.log('Migration not yet initialized');
      return;
    }

    const status = this.workflowManager.getWorkflowStatus();
    console.log(`
Migration Status:
Phase: ${status.phase}
Progress: ${status.progress}%
Current Commit: ${status.currentCommit || 'None'}
Completed: ${status.completedCommits}/${status.totalCommits} commits
Issues: ${status.issues}
`);
  }
}

// Handle process signals for graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️ Migration interrupted by user');
  process.exit(130);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️ Migration terminated');
  process.exit(143);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Execute CLI if run directly
if (require.main === module) {
  const cli = new MigrationCLI();
  cli.run().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

module.exports = MigrationCLI;
