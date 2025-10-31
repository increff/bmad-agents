/**
 * Migration Workflow Manager
 *
 * Handles the complete migration workflow:
 * - Feature branch creation and management
 * - Commit-by-commit implementation
 * - Cross-repository synchronization
 * - Final merge and cleanup
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class WorkflowManager {
  constructor(migrationEngine, expertCoordinator, validationFramework) {
    this.migrationEngine = migrationEngine;
    this.expertCoordinator = expertCoordinator;
    this.validationFramework = validationFramework;
    this.featureBranch = null;
    this.implementedCommits = [];
    this.workflowState = {
      phase: 'initialized',
      progress: 0,
      currentCommit: null,
      issues: [],
      rollbacks: []
    };
  }

  async createFeatureBranch() {
    console.log(`   🌿 Creating migration feature branch...`);

    const commitCount = this.migrationEngine.commitsToMigrate.length;
    const branchName = `migration/${this.migrationEngine.sourceBranch}-to-${this.migrationEngine.targetBranch}-${commitCount}-changes`;

    this.featureBranch = branchName;

    if (!this.migrationEngine.options.dryRun) {
      try {
        // Create and switch to feature branch
        this.migrationEngine.execGit(`checkout -b ${branchName} ${this.migrationEngine.targetBranch}`);
        console.log(`   ✅ Created feature branch: ${branchName}`);
      } catch (error) {
        throw new Error(`Failed to create feature branch: ${error.message}`);
      }
    } else {
      console.log(`   📋 Would create feature branch: ${branchName} (dry-run mode)`);
    }

    this.workflowState.phase = 'feature_branch_created';
    this.workflowState.progress = 10;

    return branchName;
  }

  async prepareTargetEnvironment() {
    console.log(`   🔧 Preparing target environment...`);

    if (!this.migrationEngine.options.dryRun) {
      // Ensure we're on the feature branch
      const currentBranch = this.migrationEngine.execGit('rev-parse --abbrev-ref HEAD').trim();

      if (currentBranch !== this.featureBranch) {
        this.migrationEngine.execGit(`checkout ${this.featureBranch}`);
      }

      // Ensure clean working directory
      const status = this.migrationEngine.execGit('status --porcelain');
      if (status.trim()) {
        console.warn(`   ⚠️  Working directory not clean, unstaging changes...`);
        this.migrationEngine.execGit('reset --hard HEAD');
        this.migrationEngine.execGit('clean -fd');
      }

      console.log(`   ✅ Target environment prepared`);
    } else {
      console.log(`   📋 Would prepare target environment (dry-run mode)`);
    }

    this.workflowState.phase = 'target_prepared';
    this.workflowState.progress = 15;
  }

  async implementCommits() {
    console.log(`   ⚙️ Implementing commits (${this.migrationEngine.commitsToMigrate.length} total)...`);

    const totalCommits = this.migrationEngine.commitsToMigrate.length;
    let implemented = 0;

    for (const commit of this.migrationEngine.commitsToMigrate) {
      try {
        this.workflowState.currentCommit = commit.hash;
        this.workflowState.progress = 15 + (implemented / totalCommits) * 70; // 15-85% range

        console.log(`   📝 Implementing commit ${commit.hash}: ${commit.message.substring(0, 60)}...`);

        const result = await this.implementSingleCommit(commit);

        this.implementedCommits.push({
          ...result,
          commit: commit.hash,
          timestamp: new Date().toISOString(),
          success: result.success
        });

        implemented++;

        if (!result.success) {
          // Handle implementation failure
          await this.handleImplementationFailure(commit, result);
        }

      } catch (error) {
        console.error(`   ❌ Failed to implement commit ${commit.hash}: ${error.message}`);

        this.workflowState.issues.push({
          commit: commit.hash,
          type: 'implementation_failure',
          error: error.message,
          timestamp: new Date().toISOString()
        });

        // Decide whether to continue or stop
        if (this.shouldStopOnFailure(error)) {
          throw error;
        }
      }
    }

    console.log(`   ✅ Implemented ${implemented}/${totalCommits} commits`);
    this.workflowState.phase = 'commits_implemented';
    this.workflowState.progress = 85;
  }

  async implementSingleCommit(commit) {
    const result = {
      success: false,
      adaptations: [],
      validations: null,
      conflicts: [],
      resolution: null
    };

    try {
      // Switch to target branch temporarily to analyze patterns
      const originalBranch = this.migrationEngine.execGit('rev-parse --abbrev-ref HEAD').trim();
      this.migrationEngine.execGit(`checkout ${this.migrationEngine.targetBranch}`);

      // Get target patterns for adaptation
      const targetPatterns = await this.analyzeTargetPatternsForCommit(commit);

      // Switch back to feature branch
      this.migrationEngine.execGit(`checkout ${originalBranch}`);

      // Adapt commit for target patterns
      const adaptations = await this.adaptCommitForTarget(commit, targetPatterns);
      result.adaptations = adaptations;

      // Resolve any conflicts with expert help
      if (adaptations.conflicts && adaptations.conflicts.length > 0) {
        const resolution = await this.expertCoordinator.resolveConflict(
          { type: 'pattern_conflict', conflicts: adaptations.conflicts },
          { commit, repository: this.migrationEngine.repository }
        );
        result.resolution = resolution;
      }

      // Validate implementation
      const validations = await this.validationFramework.validateMigration(
        commit,
        adaptations,
        { phase: 'implementation', repository: this.migrationEngine.repository }
      );
      result.validations = validations;

      // Apply adaptations if not dry-run
      if (!this.migrationEngine.options.dryRun) {
        await this.applyAdaptations(commit, adaptations);
      }

      // Commit the changes
      if (!this.migrationEngine.options.dryRun) {
        await this.commitChanges(commit, adaptations);
      }

      result.success = true;

    } catch (error) {
      result.error = error.message;
      console.error(`   ❌ Error implementing commit ${commit.hash}: ${error.message}`);
    }

    return result;
  }

  async analyzeTargetPatternsForCommit(commit) {
    // Use repository-specific strategy to analyze patterns
    const strategy = this.getRepositoryStrategy();
    return await strategy.analyzePatterns();
  }

  async adaptCommitForTarget(commit, targetPatterns) {
    // Use repository-specific strategy to adapt commit
    const strategy = this.getRepositoryStrategy();
    return await strategy.adaptCommitForTarget(commit, targetPatterns);
  }

  getRepositoryStrategy() {
    const repo = this.migrationEngine.repository;
    const StrategyClass = this.getStrategyClassForRepository(repo);

    return new StrategyClass(
      this.migrationEngine.workingDir,
      this.migrationEngine
    );
  }

  getStrategyClassForRepository(repository) {
    if (repository.includes('algo')) {
      const JavaStrategy = require('./strategies/java-strategy');
      return JavaStrategy;
    } else if (repository.includes('loadapis')) {
      const PythonStrategy = require('./strategies/python-strategy');
      return PythonStrategy;
    } else if (repository.includes('config')) {
      const ConfigStrategy = require('./strategies/config-strategy');
      return ConfigStrategy;
    } else if (repository.includes('mfp')) {
      const MFPStrategy = require('./strategies/mfp-strategy');
      return MFPStrategy;
    }

    // Default fallback
    const PythonStrategy = require('./strategies/python-strategy');
    return PythonStrategy;
  }

  async applyAdaptations(commit, adaptations) {
    for (const adaptation of adaptations) {
      if (adaptation.adaptedContent) {
        const filePath = path.join(this.migrationEngine.workingDir, adaptation.file);

        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Write adapted content
        await fs.writeFile(filePath, adaptation.adaptedContent, 'utf8');

        console.log(`   📝 Applied adaptation to ${adaptation.file}`);
      }
    }
  }

  async commitChanges(commit, adaptations) {
    // Stage changes
    this.migrationEngine.execGit('add .');

    // Check if there are changes to commit
    const status = this.migrationEngine.execGit('status --porcelain');
    if (!status.trim()) {
      console.log(`   📋 No changes to commit for ${commit.hash}`);
      return;
    }

    // Create commit message
    const commitMessage = this.generateCommitMessage(commit, adaptations);

    // Commit
    this.migrationEngine.execGit(`commit -m "${commitMessage}"`);

    console.log(`   ✅ Committed changes for ${commit.hash}`);
  }

  generateCommitMessage(commit, adaptations) {
    let message = `[MIGRATION] Implement ${commit.message}\n\n`;
    message += `Original commit: ${commit.hash}\n`;
    message += `Migrated from: ${this.migrationEngine.sourceBranch}\n`;
    message += `Target branch: ${this.migrationEngine.targetBranch}\n\n`;

    if (adaptations && adaptations.length > 0) {
      message += 'Pattern adaptations applied:\n';
      adaptations.forEach(adaptation => {
        message += `- ${adaptation.file}: ${adaptation.changes.join(', ')}\n`;
      });
      message += '\n';
    }

    message += 'Migration implemented following BMAD patterns and rules.';

    return message;
  }

  async handleImplementationFailure(commit, result) {
    console.warn(`   ⚠️ Handling implementation failure for commit ${commit.hash}`);

    // Create rollback plan
    const rollback = {
      commit: commit.hash,
      type: 'implementation_failure',
      actions: [
        'Reset to previous commit',
        'Review adaptation strategy',
        'Consider manual implementation',
        'Re-validate against rules'
      ],
      timestamp: new Date().toISOString()
    };

    this.workflowState.rollbacks.push(rollback);

    // For now, we'll continue with other commits
    // In a production system, you might want to stop or handle differently
  }

  shouldStopOnFailure(error) {
    // Decide whether to stop migration on failure
    // For critical errors, stop; for recoverable errors, continue
    const criticalErrors = [
      'repository not found',
      'branch not found',
      'authentication failed'
    ];

    return criticalErrors.some(critical =>
      error.message.toLowerCase().includes(critical)
    );
  }

  async crossRepositorySync() {
    console.log(`   🔄 Cross-repository synchronization...`);

    // Check if this migration affects multiple repositories
    const affectsMultipleRepos = this.checkMultiRepositoryImpact();

    if (affectsMultipleRepos) {
      console.log(`   📋 Migration affects multiple repositories - coordination required`);

      // In a full implementation, this would coordinate with other repository migrations
      // For now, we'll document the requirement
      this.workflowState.issues.push({
        type: 'cross_repository_sync_required',
        message: 'Migration affects multiple repositories - manual coordination required',
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(`   ✅ Single repository migration - no cross-repo sync needed`);
    }

    this.workflowState.phase = 'cross_repo_synced';
    this.workflowState.progress = 90;
  }

  checkMultiRepositoryImpact() {
    // Check if any commits affect multiple repositories
    // This is a simplified check - in practice, you'd analyze the actual changes
    const multiRepoIndicators = [
      'coordinated',
      'cross-repo',
      'multiple repositories',
      'integration'
    ];

    return this.migrationEngine.commitsToMigrate.some(commit =>
      multiRepoIndicators.some(indicator =>
        commit.message.toLowerCase().includes(indicator)
      )
    );
  }

  async validateImplementation() {
    console.log(`   ✅ Validating implementation...`);

    // Run comprehensive validation
    const validationReport = await this.validationFramework.generateValidationReport();

    // Check pattern compliance
    const patternValidation = await this.validationFramework.validatePatternCompliance(
      this.implementedCommits.flatMap(ic => ic.adaptations || []),
      {} // target patterns
    );

    // Update workflow state
    this.workflowState.validationReport = validationReport;
    this.workflowState.patternValidation = patternValidation;

    if (validationReport.summary.averageCompliance < 0.8) {
      this.workflowState.issues.push({
        type: 'validation_failure',
        message: `Low validation compliance: ${validationReport.summary.averageCompliance.toFixed(2)}`,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`   📊 Validation compliance: ${(validationReport.summary.averageCompliance * 100).toFixed(1)}%`);
    this.workflowState.phase = 'validated';
    this.workflowState.progress = 95;
  }

  async reviewFeatureBranch() {
    console.log(`   👀 Reviewing feature branch...`);

    if (!this.migrationEngine.options.dryRun) {
      // Get branch status
      const branchStatus = this.migrationEngine.execGit('status --short');

      // Get commit history
      const commitHistory = this.migrationEngine.execGit(`log --oneline ${this.migrationEngine.targetBranch}..HEAD`);

      // Check for any issues
      const issues = [];

      if (!commitHistory.trim()) {
        issues.push('No commits in feature branch');
      }

      const commitCount = commitHistory.split('\n').filter(line => line.trim()).length;
      if (commitCount !== this.implementedCommits.filter(ic => ic.success).length) {
        issues.push(`Commit count mismatch: expected ${this.implementedCommits.filter(ic => ic.success).length}, got ${commitCount}`);
      }

      if (issues.length > 0) {
        this.workflowState.issues.push({
          type: 'branch_review_issues',
          issues,
          timestamp: new Date().toISOString()
        });
      }

      console.log(`   📋 Feature branch review complete - ${commitCount} commits`);
    } else {
      console.log(`   📋 Would review feature branch (dry-run mode)`);
    }

    this.workflowState.phase = 'reviewed';
  }

  async mergeToTargetBranch() {
    console.log(`   🔀 Merging to target branch...`);

    if (!this.migrationEngine.options.dryRun) {
      try {
        // Switch to target branch
        this.migrationEngine.execGit(`checkout ${this.migrationEngine.targetBranch}`);

        // Merge feature branch
        const mergeMessage = `Merge migration: ${this.migrationEngine.sourceBranch} → ${this.migrationEngine.targetBranch} (${this.implementedCommits.length} commits)`;
        this.migrationEngine.execGit(`merge ${this.featureBranch} --no-ff -m "${mergeMessage}"`);

        console.log(`   ✅ Successfully merged feature branch to ${this.migrationEngine.targetBranch}`);
      } catch (error) {
        console.error(`   ❌ Merge failed: ${error.message}`);

        // Handle merge conflicts
        const hasConflicts = this.migrationEngine.execGit('status').includes('Unmerged paths');

        if (hasConflicts) {
          // Attempt to resolve conflicts or abort
          console.log(`   ⚠️  Merge conflicts detected - aborting merge`);
          this.migrationEngine.execGit('merge --abort');

          this.workflowState.issues.push({
            type: 'merge_conflict',
            message: 'Merge conflicts occurred - manual resolution required',
            timestamp: new Date().toISOString()
          });

          throw new Error('Merge conflicts detected - manual resolution required');
        } else {
          throw error;
        }
      }
    } else {
      console.log(`   📋 Would merge feature branch to target (dry-run mode)`);
    }

    this.workflowState.phase = 'merged';
  }

  async deleteFeatureBranch() {
    console.log(`   🗑️ Deleting feature branch...`);

    if (!this.migrationEngine.options.dryRun) {
      try {
        // Switch away from feature branch if currently on it
        const currentBranch = this.migrationEngine.execGit('rev-parse --abbrev-ref HEAD').trim();
        if (currentBranch === this.featureBranch) {
          this.migrationEngine.execGit(`checkout ${this.migrationEngine.targetBranch}`);
        }

        // Delete feature branch
        this.migrationEngine.execGit(`branch -D ${this.featureBranch}`);

        console.log(`   ✅ Deleted feature branch: ${this.featureBranch}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not delete feature branch: ${error.message}`);
        this.workflowState.issues.push({
          type: 'cleanup_warning',
          message: `Could not delete feature branch: ${error.message}`,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      console.log(`   📋 Would delete feature branch (dry-run mode)`);
    }

    this.workflowState.phase = 'feature_branch_deleted';
  }

  async pushChanges() {
    console.log(`   📤 Pushing changes...`);

    if (!this.migrationEngine.options.dryRun) {
      try {
        // Push target branch
        this.migrationEngine.execGit(`push origin ${this.migrationEngine.targetBranch}`);

        console.log(`   ✅ Pushed changes to origin/${this.migrationEngine.targetBranch}`);
      } catch (error) {
        console.error(`   ❌ Push failed: ${error.message}`);
        this.workflowState.issues.push({
          type: 'push_failure',
          message: `Could not push changes: ${error.message}`,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
    } else {
      console.log(`   📋 Would push changes to origin (dry-run mode)`);
    }

    this.workflowState.phase = 'completed';
    this.workflowState.progress = 100;
  }

  async rollbackFailedMigration() {
    console.log(`   ↩️ Rolling back failed migration...`);

    if (!this.migrationEngine.options.dryRun) {
      try {
        // Switch to target branch
        this.migrationEngine.execGit(`checkout ${this.migrationEngine.targetBranch}`);

        // Reset to state before migration
        this.migrationEngine.execGit('reset --hard HEAD');

        // Delete feature branch if it exists
        if (this.featureBranch) {
          try {
            this.migrationEngine.execGit(`branch -D ${this.featureBranch}`);
          } catch (e) {
            // Branch might not exist, ignore
          }
        }

        console.log(`   ✅ Migration rolled back successfully`);
      } catch (error) {
        console.error(`   ❌ Rollback failed: ${error.message}`);
        throw error;
      }
    } else {
      console.log(`   📋 Would rollback migration (dry-run mode)`);
    }
  }

  async generateWorkflowReport() {
    const report = {
      migrationId: this.migrationEngine.migrationId,
      repository: this.migrationEngine.repository,
      sourceBranch: this.migrationEngine.sourceBranch,
      targetBranch: this.migrationEngine.targetBranch,
      featureBranch: this.featureBranch,
      workflowState: this.workflowState,
      implementedCommits: this.implementedCommits,
      issues: this.workflowState.issues,
      rollbacks: this.workflowState.rollbacks,
      timestamp: new Date().toISOString()
    };

    // Save workflow report
    const reportPath = path.join(this.migrationEngine.outputDir, 'workflow-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    // Generate human-readable summary
    const summary = this.generateWorkflowSummary(report);
    const summaryPath = path.join(this.migrationEngine.outputDir, 'WORKFLOW_SUMMARY.md');
    await fs.writeFile(summaryPath, summary);

    return report;
  }

  generateWorkflowSummary(report) {
    const summary = `# Migration Workflow Summary

## Migration Overview
- **ID**: ${report.migrationId}
- **Repository**: ${report.repository}
- **Source Branch**: ${report.sourceBranch}
- **Target Branch**: ${report.targetBranch}
- **Feature Branch**: ${report.featureBranch || 'N/A'}
- **Status**: ${report.workflowState.phase}
- **Progress**: ${report.workflowState.progress}%

## Implementation Results
- **Total Commits**: ${this.migrationEngine.commitsToMigrate.length}
- **Successfully Implemented**: ${report.implementedCommits.filter(c => c.success).length}
- **Failed**: ${report.implementedCommits.filter(c => !c.success).length}

## Issues Encountered
${report.issues.length > 0 ?
  report.issues.map(issue => `- **${issue.type}**: ${issue.message}`).join('\n') :
  'No issues encountered'}

## Rollbacks Required
${report.rollbacks.length > 0 ?
  report.rollbacks.map(rollback => `- **${rollback.commit}**: ${rollback.type}`).join('\n') :
  'No rollbacks required'}

## Next Steps
${this.generateNextSteps(report)}

---
*Generated on ${report.timestamp}*
`;

    return summary;
  }

  generateNextSteps(report) {
    const nextSteps = [];

    if (report.workflowState.phase === 'completed') {
      nextSteps.push('✅ Migration completed successfully');
      nextSteps.push('🔍 Review final validation results');
      nextSteps.push('🧪 Test migrated functionality');
      nextSteps.push('📋 Update documentation as needed');
    } else if (report.issues.length > 0) {
      nextSteps.push('⚠️ Address outstanding issues');
      nextSteps.push('🔄 Consider retrying failed commits');
      nextSteps.push('📞 Consult expert agents for complex issues');
    } else {
      nextSteps.push('🔄 Continue with remaining workflow phases');
      nextSteps.push('📊 Monitor progress and validation results');
    }

    return nextSteps.map(step => `- ${step}`).join('\n');
  }

  getWorkflowStatus() {
    return {
      phase: this.workflowState.phase,
      progress: this.workflowState.progress,
      currentCommit: this.workflowState.currentCommit,
      issues: this.workflowState.issues.length,
      completedCommits: this.implementedCommits.filter(c => c.success).length,
      totalCommits: this.migrationEngine.commitsToMigrate.length
    };
  }
}

module.exports = WorkflowManager;
