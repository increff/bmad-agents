/**
 * Expert Agent Coordinator for Migration Conflict Resolution
 *
 * Coordinates expert agents for intelligent conflict resolution during migration:
 * - Algorithm Pattern Expert (Java)
 * - LoadAPI Pattern Expert (Python)
 * - Configuration Pattern Expert (SQL/Config)
 * - MFP Pattern Expert (Python)
 */

const fs = require('fs').promises;
const path = require('path');

class ExpertCoordinator {
  constructor(migrationEngine) {
    this.migrationEngine = migrationEngine;
    this.experts = new Map();
    this.conflictHistory = [];
    this.resolutions = new Map();
  }

  async initializeExperts() {
    console.log('   🧠 Initializing expert agents for conflict resolution...');

    // Load expert agent knowledge bases
    await this.loadAlgorithmExpert();
    await this.loadLoadApiExpert();
    await this.loadConfigExpert();
    await this.loadMFExpert();

    console.log(`   ✅ Loaded ${this.experts.size} expert agents`);
  }

  async loadAlgorithmExpert() {
    // Load algorithm pattern expert knowledge
    const expertPath = path.join(__dirname, '../../expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/agents/algorithm-pattern-expert.md');

    try {
      const content = await fs.readFile(expertPath, 'utf8');
      this.experts.set('algorithm', {
        name: 'Algorithm Pattern Expert',
        domain: 'java',
        knowledge: this.extractExpertKnowledge(content),
        rules: this.extractExpertRules(content)
      });
    } catch (error) {
      console.warn(`   ⚠️  Could not load algorithm expert: ${error.message}`);
      this.experts.set('algorithm', this.createFallbackExpert('algorithm'));
    }
  }

  async loadLoadApiExpert() {
    // Load LoadAPI pattern expert knowledge
    const expertPath = path.join(__dirname, '../../expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/agents/loadapi-pattern-expert.md');

    try {
      const content = await fs.readFile(expertPath, 'utf8');
      this.experts.set('loadapi', {
        name: 'LoadAPI Pattern Expert',
        domain: 'python',
        knowledge: this.extractExpertKnowledge(content),
        rules: this.extractExpertRules(content)
      });
    } catch (error) {
      console.warn(`   ⚠️  Could not load LoadAPI expert: ${error.message}`);
      this.experts.set('loadapi', this.createFallbackExpert('loadapi'));
    }
  }

  async loadConfigExpert() {
    // Load configuration pattern expert knowledge
    const expertPath = path.join(__dirname, '../../expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/agents/config-pattern-expert.md');

    try {
      const content = await fs.readFile(expertPath, 'utf8');
      this.experts.set('config', {
        name: 'Configuration Pattern Expert',
        domain: 'config',
        knowledge: this.extractExpertKnowledge(content),
        rules: this.extractExpertRules(content)
      });
    } catch (error) {
      console.warn(`   ⚠️  Could not load config expert: ${error.message}`);
      this.experts.set('config', this.createFallbackExpert('config'));
    }
  }

  async loadMFExpert() {
    // Load MFP pattern expert knowledge
    const expertPath = path.join(__dirname, '../../expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/agents/mfp-pattern-expert.md');

    try {
      const content = await fs.readFile(expertPath, 'utf8');
      this.experts.set('mfp', {
        name: 'MFP Pattern Expert',
        domain: 'python',
        knowledge: this.extractExpertKnowledge(content),
        rules: this.extractExpertRules(content)
      });
    } catch (error) {
      console.warn(`   ⚠️  Could not load MFP expert: ${error.message}`);
      this.experts.set('mfp', this.createFallbackExpert('mfp'));
    }
  }

  extractExpertKnowledge(content) {
    // Extract expert knowledge from markdown content
    const knowledge = {
      patterns: [],
      rules: [],
      examples: [],
      conflicts: []
    };

    const lines = content.split('\n');
    let currentSection = '';

    for (const line of lines) {
      if (line.startsWith('## ')) {
        currentSection = line.substring(3).toLowerCase().trim();
      } else if (line.startsWith('- ')) {
        const item = line.substring(2).trim();
        if (currentSection.includes('pattern')) {
          knowledge.patterns.push(item);
        } else if (currentSection.includes('rule')) {
          knowledge.rules.push(item);
        } else if (currentSection.includes('example')) {
          knowledge.examples.push(item);
        } else if (currentSection.includes('conflict')) {
          knowledge.conflicts.push(item);
        }
      }
    }

    return knowledge;
  }

  extractExpertRules(content) {
    // Extract specific rules and guidelines
    const rules = [];
    const ruleMatches = content.match(/Rule \d+:/g) || [];

    for (const match of ruleMatches) {
      const ruleStart = content.indexOf(match);
      const nextRule = content.indexOf('Rule ', ruleStart + 1);
      const ruleEnd = nextRule > 0 ? nextRule : content.length;
      const ruleContent = content.substring(ruleStart, ruleEnd).trim();
      rules.push(ruleContent);
    }

    return rules;
  }

  createFallbackExpert(type) {
    // Create fallback expert with basic knowledge
    const fallbackKnowledge = {
      patterns: [`${type} repository patterns`],
      rules: [`Follow ${type} best practices`],
      examples: [`Standard ${type} implementation`],
      conflicts: [`Resolve ${type} conflicts according to patterns`]
    };

    return {
      name: `${type} Pattern Expert (Fallback)`,
      domain: type,
      knowledge: fallbackKnowledge,
      rules: [`Apply ${type} repository patterns`]
    };
  }

  async resolveConflict(conflict, context) {
    console.log(`   🎯 Resolving conflict with expert coordination...`);

    const conflictAnalysis = this.analyzeConflict(conflict, context);
    const relevantExperts = this.selectExpertsForConflict(conflictAnalysis);

    const resolutions = [];

    for (const expert of relevantExperts) {
      const resolution = await this.consultExpert(expert, conflict, context);
      if (resolution) {
        resolutions.push({
          expert: expert.name,
          resolution,
          confidence: this.calculateConfidence(expert, conflict, resolution)
        });
      }
    }

    const finalResolution = this.synthesizeResolutions(resolutions, conflict);

    // Record the conflict resolution
    this.conflictHistory.push({
      conflict,
      context,
      experts: relevantExperts.map(e => e.name),
      resolutions,
      finalResolution,
      timestamp: new Date().toISOString()
    });

    return finalResolution;
  }

  analyzeConflict(conflict, context) {
    return {
      type: this.determineConflictType(conflict),
      severity: this.assessSeverity(conflict),
      domain: this.identifyDomain(conflict, context),
      scope: this.determineScope(conflict),
      patterns: this.identifyAffectedPatterns(conflict)
    };
  }

  determineConflictType(conflict) {
    if (conflict.type === 'merge_conflict') {
      return 'merge_conflict';
    }
    if (conflict.type === 'pattern_mismatch') {
      return 'pattern_mismatch';
    }
    if (conflict.type === 'rule_violation') {
      return 'rule_violation';
    }
    return 'general_conflict';
  }

  assessSeverity(conflict) {
    if (conflict.critical) return 'critical';
    if (conflict.affectsMultipleFiles) return 'high';
    if (conflict.blocksMigration) return 'high';
    return 'medium';
  }

  identifyDomain(conflict, context) {
    const repository = context.repository || this.migrationEngine.repository;

    if (repository.includes('algo')) return 'algorithm';
    if (repository.includes('loadapis')) return 'loadapi';
    if (repository.includes('config')) return 'config';
    if (repository.includes('mfp')) return 'mfp';

    return 'unknown';
  }

  determineScope(conflict) {
    if (conflict.files && conflict.files.length > 5) return 'broad';
    if (conflict.files && conflict.files.length > 1) return 'multi_file';
    return 'single_file';
  }

  identifyAffectedPatterns(conflict) {
    const patterns = [];

    if (conflict.file && conflict.file.includes('Module')) {
      patterns.push('module_registration');
    }
    if (conflict.file && conflict.file.includes('LoadApi')) {
      patterns.push('loadapi_pattern');
    }
    if (conflict.file && conflict.file.includes('.sql')) {
      patterns.push('sql_view_pattern');
    }
    if (conflict.file && conflict.file.includes('.json')) {
      patterns.push('config_pattern');
    }

    return patterns;
  }

  selectExpertsForConflict(conflictAnalysis) {
    const experts = [];

    // Select primary expert based on domain
    switch (conflictAnalysis.domain) {
      case 'algorithm':
        experts.push(this.experts.get('algorithm'));
        break;
      case 'loadapi':
        experts.push(this.experts.get('loadapi'));
        break;
      case 'config':
        experts.push(this.experts.get('config'));
        break;
      case 'mfp':
        experts.push(this.experts.get('mfp'));
        break;
    }

    // Add secondary experts for complex conflicts
    if (conflictAnalysis.scope === 'broad' || conflictAnalysis.severity === 'critical') {
      // Add all experts for comprehensive analysis
      this.experts.forEach(expert => {
        if (!experts.includes(expert)) {
          experts.push(expert);
        }
      });
    }

    return experts.filter(e => e); // Remove null/undefined experts
  }

  async consultExpert(expert, conflict, context) {
    // Simulate expert consultation (in real implementation, this would call expert AI)
    const consultation = {
      analysis: this.generateExpertAnalysis(expert, conflict),
      recommendation: this.generateExpertRecommendation(expert, conflict, context),
      rationale: this.generateExpertRationale(expert, conflict),
      alternatives: this.generateAlternatives(expert, conflict)
    };

    return consultation;
  }

  generateExpertAnalysis(expert, conflict) {
    return `${expert.name} Analysis: ${conflict.description || 'Conflict detected in migration'}`;
  }

  generateExpertRecommendation(expert, conflict, context) {
    const domain = expert.domain;

    switch (domain) {
      case 'java':
        return this.generateJavaRecommendation(conflict, context);
      case 'python':
        return this.generatePythonRecommendation(conflict, context);
      case 'config':
        return this.generateConfigRecommendation(conflict, context);
      default:
        return `Follow ${domain} repository patterns and best practices`;
    }
  }

  generateJavaRecommendation(conflict, context) {
    if (conflict.file && conflict.file.includes('Module')) {
      return 'Register module in ModuleProvider and ensure @Component annotation';
    }
    if (conflict.file && conflict.file.includes('Validation')) {
      return 'Register validation module in ValidationModuleNames and implement validate() method';
    }
    if (conflict.file && conflict.file.includes('Args')) {
      return 'Ensure Args class extends Args base class and uses @Autowired injection';
    }
    return 'Follow Java algorithm patterns: proper inheritance, annotations, and registration';
  }

  generatePythonRecommendation(conflict, context) {
    if (conflict.file && conflict.file.includes('LoadApi')) {
      return 'Implement validate_row() and _get_normalized_data() methods, define MASTER_HEADER';
    }
    if (conflict.file && conflict.file.includes('__init__')) {
      return 'Register LoadAPI in both __init__.py files and loadapi_provider.py';
    }
    if (conflict.file && conflict.file.includes('constant')) {
      return 'Use UPPER_CASE naming convention for constants and error messages';
    }
    return 'Follow Python LoadAPI patterns: proper inheritance, validation, and registration';
  }

  generateConfigRecommendation(conflict, context) {
    if (conflict.file && conflict.file.endsWith('.sql')) {
      return 'Use OPENROWSET for data access, ensure WITH clause column definitions match template headers';
    }
    if (conflict.file && conflict.file.endsWith('.tsv')) {
      return 'Ensure template headers match LoadAPI MASTER_HEADER and SQL view columns';
    }
    if (conflict.file && conflict.file.endsWith('.json')) {
      return 'Update configuration entries when adding new inputs/outputs, maintain import ID consistency';
    }
    return 'Follow configuration patterns: header consistency, OPENROWSET usage, proper JSON structure';
  }

  generateExpertRationale(expert, conflict) {
    return `Based on ${expert.name} knowledge of established patterns and best practices in ${expert.domain} repositories`;
  }

  generateAlternatives(expert, conflict) {
    const alternatives = [
      'Follow source branch patterns exactly',
      'Adapt to target branch patterns with modifications',
      'Create hybrid approach combining both patterns',
      'Defer implementation until pattern conflict is resolved'
    ];

    return alternatives;
  }

  calculateConfidence(expert, conflict, resolution) {
    // Calculate confidence based on expert domain match and conflict type
    let confidence = 0.5; // Base confidence

    if (expert.domain === this.identifyDomain(conflict, {})) {
      confidence += 0.3; // Domain match bonus
    }

    if (resolution.recommendation && resolution.recommendation.length > 10) {
      confidence += 0.2; // Detailed recommendation bonus
    }

    return Math.min(confidence, 1.0);
  }

  synthesizeResolutions(resolutions, conflict) {
    if (resolutions.length === 0) {
      return {
        recommendation: 'Manual resolution required - no expert guidance available',
        rationale: 'Unable to consult relevant experts',
        confidence: 0.0
      };
    }

    if (resolutions.length === 1) {
      return resolutions[0];
    }

    // Find highest confidence resolution
    const bestResolution = resolutions.reduce((best, current) =>
      current.confidence > best.confidence ? current : best
    );

    // If multiple high-confidence resolutions, create synthesized recommendation
    const highConfidence = resolutions.filter(r => r.confidence > 0.7);
    if (highConfidence.length > 1) {
      return {
        recommendation: this.synthesizeRecommendations(highConfidence),
        rationale: 'Synthesized from multiple expert recommendations',
        confidence: Math.max(...highConfidence.map(r => r.confidence)),
        experts: highConfidence.map(r => r.expert)
      };
    }

    return bestResolution;
  }

  synthesizeRecommendations(resolutions) {
    const recommendations = resolutions.map(r => r.resolution.recommendation);
    const commonElements = this.findCommonElements(recommendations);

    if (commonElements.length > 0) {
      return `Consensus recommendation: ${commonElements.join(', ')}`;
    }

    return resolutions[0].resolution.recommendation; // Return first as fallback
  }

  findCommonElements(strings) {
    if (strings.length === 0) return [];

    const firstWords = strings[0].split(' ');
    const common = [];

    for (const word of firstWords) {
      if (strings.every(s => s.includes(word))) {
        common.push(word);
      }
    }

    return common;
  }

  async provideGuidance(context) {
    const guidance = {
      general: await this.getGeneralGuidance(),
      domainSpecific: await this.getDomainSpecificGuidance(context),
      bestPractices: await this.getBestPractices(context)
    };

    return guidance;
  }

  async getGeneralGuidance() {
    return {
      principles: [
        'Always analyze existing patterns before implementing changes',
        'Follow established conventions in the target repository',
        'Maintain consistency across similar components',
        'Document deviations from patterns with clear rationale',
        'Validate changes against applicable rules before committing'
      ],
      warnings: [
        'Do not force patterns that conflict with repository architecture',
        'Avoid creating technical debt through pattern violations',
        'Consider long-term maintenance implications of pattern changes'
      ]
    };
  }

  async getDomainSpecificGuidance(context) {
    const domain = this.identifyDomain({}, context);
    const expert = this.experts.get(domain);

    if (!expert) {
      return { guidance: 'No specific guidance available for this domain' };
    }

    return {
      domain,
      patterns: expert.knowledge.patterns.slice(0, 3),
      rules: expert.rules.slice(0, 3),
      commonIssues: expert.knowledge.conflicts.slice(0, 3)
    };
  }

  async getBestPractices(context) {
    return {
      implementation: [
        'Start with pattern analysis before any code changes',
        'Use existing similar implementations as templates',
        'Test changes incrementally rather than all at once',
        'Document pattern adaptations in commit messages',
        'Validate against rules at each implementation step'
      ],
      validation: [
        'Cross-reference with existing working examples',
        'Verify integration points work correctly',
        'Check for unintended side effects on related components',
        'Ensure error handling follows established patterns',
        'Validate performance implications of pattern changes'
      ]
    };
  }

  async generateConflictReport() {
    const report = {
      totalConflicts: this.conflictHistory.length,
      resolvedConflicts: this.conflictHistory.filter(c => c.finalResolution).length,
      expertUsage: this.calculateExpertUsage(),
      commonPatterns: this.identifyCommonConflictPatterns(),
      recommendations: this.generateImprovementRecommendations()
    };

    return report;
  }

  calculateExpertUsage() {
    const usage = {};

    this.experts.forEach(expert => {
      usage[expert.name] = this.conflictHistory.filter(c =>
        c.experts && c.experts.includes(expert.name)
      ).length;
    });

    return usage;
  }

  identifyCommonConflictPatterns() {
    const patterns = {};

    this.conflictHistory.forEach(conflict => {
      const type = conflict.conflict.type || 'unknown';
      patterns[type] = (patterns[type] || 0) + 1;
    });

    return patterns;
  }

  generateImprovementRecommendations() {
    const recommendations = [];

    const usage = this.calculateExpertUsage();
    const mostUsedExpert = Object.entries(usage).reduce((a, b) => usage[a[0]] > usage[b[0]] ? a : b);

    if (mostUsedExpert) {
      recommendations.push(`Consider enhancing ${mostUsedExpert[0]} with additional pattern knowledge`);
    }

    const patterns = this.identifyCommonConflictPatterns();
    const mostCommon = Object.entries(patterns).reduce((a, b) => patterns[a[0]] > patterns[b[0]] ? a : b);

    if (mostCommon) {
      recommendations.push(`Address common ${mostCommon[0]} conflicts through pattern standardization`);
    }

    return recommendations;
  }

  async exportExpertKnowledge() {
    const knowledge = {
      experts: Array.from(this.experts.entries()).map(([key, expert]) => ({
        name: expert.name,
        domain: expert.domain,
        patternCount: expert.knowledge.patterns.length,
        ruleCount: expert.rules.length
      })),
      conflicts: this.conflictHistory.length,
      resolutions: this.resolutions.size,
      timestamp: new Date().toISOString()
    };

    return knowledge;
  }
}

module.exports = ExpertCoordinator;
