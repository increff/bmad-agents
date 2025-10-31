/**
 * Configuration/SQL Repository Migration Strategy
 *
 * Handles migration of SQL/config files following VIRAT patterns:
 * - SQL view creation with OPENROWSET
 * - Template TSV files with headers
 * - JSON configuration files
 * - Export query patterns
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class ConfigMigrationStrategy {
  constructor(workingDir, migrationEngine) {
    this.workingDir = workingDir;
    this.engine = migrationEngine;
    this.sqlViews = new Map();
    this.templates = new Map();
    this.jsonConfigs = new Map();
    this.exportQueries = new Map();
  }

  async analyzePatterns() {
    console.log('   🔍 Analyzing configuration/SQL patterns...');

    // Analyze SQL view files
    await this.analyzeSqlViews();

    // Analyze template files
    await this.analyzeTemplates();

    // Analyze JSON configuration files
    await this.analyzeJsonConfigs();

    // Analyze export queries
    await this.analyzeExportQueries();

    return this.generatePatternReport();
  }

  async analyzeSqlViews() {
    // Find SQL view files
    const sqlFiles = await this.findFiles('**/*.sql');

    for (const file of sqlFiles) {
      const content = await fs.readFile(file, 'utf8');
      const viewInfo = this.extractViewInfo(content, file);

      if (viewInfo) {
        this.sqlViews.set(viewInfo.viewName, viewInfo);
      }
    }
  }

  async analyzeTemplates() {
    // Find TSV template files
    const templateFiles = await this.findFiles('**/template/**/*.tsv');

    for (const file of templateFiles) {
      const content = await fs.readFile(file, 'utf8');
      const templateInfo = this.extractTemplateInfo(content, file);

      if (templateInfo) {
        this.templates.set(templateInfo.name, templateInfo);
      }
    }
  }

  async analyzeJsonConfigs() {
    // Find JSON configuration files
    const jsonFiles = await this.findFiles('**/*.json');

    for (const file of jsonFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const jsonConfig = JSON.parse(content);
        const configInfo = this.extractJsonConfigInfo(jsonConfig, file);

        if (configInfo) {
          this.jsonConfigs.set(configInfo.name, configInfo);
        }
      } catch (error) {
        console.warn(`   ⚠️  Error parsing JSON file ${file}: ${error.message}`);
      }
    }
  }

  async analyzeExportQueries() {
    // Find export query files (usually in export/ directory)
    const exportFiles = await this.findFiles('**/export/**/*.sql');

    for (const file of exportFiles) {
      const content = await fs.readFile(file, 'utf8');
      const exportInfo = this.extractExportInfo(content, file);

      if (exportInfo) {
        this.exportQueries.set(exportInfo.name, exportInfo);
      }
    }
  }

  extractViewInfo(content, filePath) {
    // Extract SQL view information
    const viewMatch = content.match(/CREATE\s+VIEW\s+(\w+)/i);
    if (!viewMatch) return null;

    const viewName = viewMatch[1];

    // Check for OPENROWSET usage
    const hasOpenRowset = content.includes('OPENROWSET');

    // Extract WITH clause columns
    const withMatch = content.match(/WITH\s*\(([^)]+)\)/s);
    const withColumns = withMatch ?
      withMatch[1].split(',').map(col => col.trim()) : [];

    // Extract SELECT columns
    const selectMatch = content.match(/SELECT\s+([^FROM]+)FROM/is);
    const selectColumns = selectMatch ?
      selectMatch[1].split(',').map(col => col.trim()) : [];

    // Check for variable usage
    const hasVariables = content.includes('{{child}}') || content.includes('{{parent}}');

    return {
      viewName,
      hasOpenRowset,
      withColumns,
      selectColumns,
      hasVariables,
      filePath,
      type: this.extractFileType(filePath)
    };
  }

  extractTemplateInfo(content, filePath) {
    // Extract TSV template information
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;

    const headers = lines[0].split('\t').map(h => h.trim());
    const sampleData = lines.slice(1, 4); // First few data rows

    const name = path.basename(filePath, '.tsv');

    return {
      name,
      headers,
      sampleData,
      filePath,
      rowCount: lines.length
    };
  }

  extractJsonConfigInfo(jsonConfig, filePath) {
    const name = path.basename(filePath, '.json');

    // Analyze structure based on known config types
    let configType = 'unknown';
    let entries = [];

    if (name === 'module_input') {
      configType = 'input_config';
      entries = Object.keys(jsonConfig);
    } else if (name === 'module_output') {
      configType = 'output_config';
      entries = Object.keys(jsonConfig);
    } else if (name === 'upload-files') {
      configType = 'upload_mapping';
      entries = Object.keys(jsonConfig);
    }

    return {
      name,
      configType,
      entries,
      filePath,
      entryCount: entries.length
    };
  }

  extractExportInfo(content, filePath) {
    // Extract export query information
    const name = path.basename(filePath, '.sql');

    // Extract SELECT statement
    const selectMatch = content.match(/SELECT\s+([^;]+);/is);
    const selectColumns = selectMatch ?
      selectMatch[1].split(',').map(col => col.trim()) : [];

    return {
      name,
      selectColumns,
      filePath,
      hasOpenRowset: content.includes('OPENROWSET')
    };
  }

  extractFileType(filePath) {
    const fileName = path.basename(filePath);

    if (fileName.includes('input')) return 'input_view';
    if (fileName.includes('output')) return 'output_view';
    if (fileName.includes('child')) return 'child_view';
    if (fileName.includes('parent')) return 'parent_view';

    return 'general_view';
  }

  async findFiles(pattern) {
    // Simple file finding - in production, use glob or similar
    const findCommand = `find ${this.workingDir} -type f \\( -name "*.sql" -o -name "*.tsv" -o -name "*.json" \\)`;
    try {
      const result = execSync(findCommand, { encoding: 'utf8' });
      const files = result.trim().split('\n').filter(f => f);

      // Filter by pattern (simple implementation)
      return files.filter(file => {
        if (pattern.includes('**/*.sql')) {
          return file.endsWith('.sql');
        }
        if (pattern.includes('**/template/**/*.tsv')) {
          return file.includes('/template/') && file.endsWith('.tsv');
        }
        if (pattern.includes('**/*.json')) {
          return file.endsWith('.json');
        }
        if (pattern.includes('**/export/**/*.sql')) {
          return file.includes('/export/') && file.endsWith('.sql');
        }
        return true;
      });
    } catch (error) {
      console.warn(`   ⚠️  Error finding files: ${error.message}`);
      return [];
    }
  }

  generatePatternReport() {
    const report = `# Configuration/SQL Repository Patterns

## SQL Views Analysis

### SQL Views (${this.sqlViews.size})
${Array.from(this.sqlViews.values()).map(view => `
#### ${view.viewName}
- **Type**: ${view.type}
- **OPENROWSET**: ${view.hasOpenRowset ? '✅' : '❌'}
- **Variables**: ${view.hasVariables ? '✅' : '❌'}
- **WITH Columns**: ${view.withColumns.length}
- **SELECT Columns**: ${view.selectColumns.length}
- **File**: ${path.relative(this.workingDir, view.filePath)}
`).join('')}

## Templates Analysis

### TSV Templates (${this.templates.size})
${Array.from(this.templates.values()).map(template => `
#### ${template.name}
- **Headers**: ${template.headers.length} (${template.headers.slice(0, 5).join(', ')}${template.headers.length > 5 ? '...' : ''})
- **Sample Rows**: ${template.sampleData.length}
- **Total Rows**: ${template.rowCount}
- **File**: ${path.relative(this.workingDir, template.filePath)}
`).join('')}

## JSON Configurations Analysis

### JSON Config Files (${this.jsonConfigs.size})
${Array.from(this.jsonConfigs.values()).map(config => `
#### ${config.name}
- **Type**: ${config.configType}
- **Entries**: ${config.entryCount}
- **File**: ${path.relative(this.workingDir, config.filePath)}
`).join('')}

## Export Queries Analysis

### Export Queries (${this.exportQueries.size})
${Array.from(this.exportQueries.values()).map(export => `
#### ${export.name}
- **OPENROWSET**: ${export.hasOpenRowset ? '✅' : '❌'}
- **SELECT Columns**: ${export.selectColumns.length}
- **File**: ${path.relative(this.workingDir, export.filePath)}
`).join('')}

## Key Patterns Identified

### SQL View Patterns
1. **OPENROWSET Usage**: Bulk data reads from Azure Storage
2. **WITH Clause**: Column definitions for result structure
3. **Variable Substitution**: {{child}} and {{parent}} variables for dynamic queries
4. **Naming Convention**: child-input-, child-output-, parent-input-* patterns

### Template Patterns
1. **TSV Format**: Tab-delimited files with headers in first row
2. **Header Consistency**: Headers must match SQL view and LoadAPI MASTER_HEADER
3. **Sample Data**: Valid sample data for each column type
4. **Naming Pattern**: export_{module}_{type}_template.tsv

### Configuration Patterns
1. **module_input.json**: Sync input configurations
2. **module_output.json**: Output table definitions
3. **upload-files.json**: Import ID to file path mappings

### Export Query Patterns
1. **OPENROWSET Integration**: Consistent with view creation patterns
2. **Column Alignment**: SELECT columns match template headers
3. **Data Type Consistency**: Matches LoadAPI and algorithm expectations

## Header Consistency Rules

### Critical Consistency Requirements
1. **LoadAPI MASTER_HEADER** ↔ **Template Headers** ↔ **SQL View WITH Clause** ↔ **Export Query SELECT**
2. **Column Order**: Must be identical across all files
3. **Data Types**: Must be consistent (String/Integer/Double)

### Validation Checklist
- [ ] LoadAPI MASTER_HEADER matches template first row
- [ ] SQL view WITH clause matches template headers
- [ ] Export query SELECT matches template structure
- [ ] All files use identical column ordering

## Migration Considerations

- **Header Consistency**: Verify all headers match across LoadAPI, templates, and SQL views
- **OPENROWSET Patterns**: Maintain consistent Azure Storage access patterns
- **Variable Usage**: Ensure {{child}}/{{parent}} variables are properly substituted
- **JSON Configuration**: Update configuration entries when adding new inputs/outputs
- **Template Updates**: Add new columns to TSV templates with proper sample data
- **View Recreation**: Update SQL views when column structures change
`;

    return report;
  }

  async adaptCommitForTarget(commit, targetPatterns) {
    console.log(`   🔧 Adapting config commit ${commit.hash} for target patterns...`);

    const adaptations = [];

    // Analyze what needs to be changed based on the commit
    const filesChanged = commit.filesChanged;

    for (const file of filesChanged) {
      if (file.endsWith('.sql') || file.endsWith('.tsv') || file.endsWith('.json')) {
        const adaptation = await this.adaptConfigFile(file, targetPatterns);
        if (adaptation) {
          adaptations.push(adaptation);
        }
      }
    }

    return {
      commit: commit.hash,
      adaptations,
      businessLogic: commit.businessLogic,
      implementationNotes: this.generateImplementationNotes(commit, adaptations)
    };
  }

  async adaptConfigFile(filePath, targetPatterns) {
    const fullPath = path.join(this.workingDir, filePath);

    try {
      const content = await fs.readFile(fullPath, 'utf8');

      // Check file type and adapt accordingly
      if (filePath.endsWith('.sql')) {
        return await this.adaptSqlFile(content, filePath, targetPatterns);
      }

      if (filePath.endsWith('.tsv')) {
        return await this.adaptTsvFile(content, filePath, targetPatterns);
      }

      if (filePath.endsWith('.json')) {
        return await this.adaptJsonFile(content, filePath, targetPatterns);
      }

      return null; // No adaptation needed

    } catch (error) {
      console.warn(`   ⚠️  Error adapting file ${filePath}: ${error.message}`);
      return null;
    }
  }

  async adaptSqlFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Check for OPENROWSET usage
    if (!content.includes('OPENROWSET')) {
      console.warn(`   ⚠️  SQL file ${filePath} not using OPENROWSET pattern`);
      changes.push('WARNING: Not using OPENROWSET - verify if this is correct');
    }

    // Check for proper WITH clause
    if (!content.includes('WITH')) {
      console.warn(`   ⚠️  SQL file ${filePath} missing WITH clause`);
      changes.push('WARNING: Missing WITH clause - needs column definitions');
    }

    // Check for variable usage if applicable
    if (filePath.includes('child') || filePath.includes('parent')) {
      if (!content.includes('{{')) {
        changes.push('NOTE: Consider using {{child}}/{{parent}} variables for dynamic queries');
      }
    }

    return {
      file: filePath,
      type: 'SQL File',
      changes,
      adaptedContent
    };
  }

  async adaptTsvFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      changes.push('WARNING: Template file has insufficient data rows');
    }

    // Check header format (should be tab-delimited)
    const headers = lines[0].split('\t');
    if (headers.length < 2) {
      changes.push('WARNING: Template headers may not be properly tab-delimited');
    }

    // Check for sample data
    if (lines.length < 3) {
      changes.push('NOTE: Consider adding more sample data rows');
    }

    return {
      file: filePath,
      type: 'TSV Template',
      changes,
      adaptedContent
    };
  }

  async adaptJsonFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    try {
      const jsonConfig = JSON.parse(content);

      // Validate JSON structure based on file type
      const fileName = path.basename(filePath, '.json');

      if (fileName === 'module_input' || fileName === 'module_output') {
        // Should be object with configuration entries
        if (typeof jsonConfig !== 'object' || Array.isArray(jsonConfig)) {
          changes.push('WARNING: Configuration file should be a JSON object');
        }
      }

      if (fileName === 'upload-files') {
        // Should map import IDs to file paths
        if (typeof jsonConfig !== 'object' || Array.isArray(jsonConfig)) {
          changes.push('WARNING: Upload files config should be a JSON object');
        }
      }

    } catch (error) {
      changes.push(`ERROR: Invalid JSON format - ${error.message}`);
    }

    return {
      file: filePath,
      type: 'JSON Config',
      changes,
      adaptedContent
    };
  }

  generateImplementationNotes(commit, adaptations) {
    const notes = [];

    if (adaptations.some(a => a.type === 'SQL File')) {
      notes.push('Verify OPENROWSET usage follows target branch patterns');
      notes.push('Ensure WITH clause column definitions match template headers');
      notes.push('Check variable substitution ({{child}}/{{parent}}) if applicable');
    }

    if (adaptations.some(a => a.type === 'TSV Template')) {
      notes.push('Ensure template headers match LoadAPI MASTER_HEADER and SQL view columns');
      notes.push('Add appropriate sample data for new columns');
      notes.push('Maintain tab-delimited format');
    }

    if (adaptations.some(a => a.type === 'JSON Config')) {
      notes.push('Update configuration entries when adding new inputs/outputs');
      notes.push('Verify import ID mappings in upload-files.json');
      notes.push('Ensure consistency with LoadAPI and algorithm configurations');
    }

    if (adaptations.some(a => a.changes.some(c => c.includes('WARNING')))) {
      notes.push('Manual verification required for pattern compliance');
    }

    return notes;
  }

  async validateImplementation(commit, adaptations) {
    const validationResults = {
      patternCompliance: true,
      ruleCompliance: true,
      issues: [],
      recommendations: []
    };

    // Check Rule 10: SQL Template Rules
    if (adaptations.some(a => a.type === 'SQL File')) {
      const hasOpenRowset = adaptations.every(a =>
        a.type !== 'SQL File' || a.adaptedContent.includes('OPENROWSET')
      );

      if (!hasOpenRowset) {
        validationResults.issues.push('Rule 10 violation: SQL view should use OPENROWSET');
        validationResults.ruleCompliance = false;
      }
    }

    // Check Rule 39: Header Consistency Validation
    const hasHeaders = adaptations.some(a =>
      a.type === 'TSV Template' || a.type === 'SQL File'
    );

    if (hasHeaders) {
      // This would require cross-repository validation
      validationResults.recommendations.push('Validate header consistency across LoadAPI, templates, and SQL views');
    }

    return validationResults;
  }
}

module.exports = ConfigMigrationStrategy;
