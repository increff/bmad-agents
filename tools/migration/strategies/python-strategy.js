/**
 * Python LoadAPI Repository Migration Strategy
 *
 * Handles migration of Python LoadAPI code following VIRAT patterns:
 * - LoadAPI class inheritance and validation
 * - __init__.py module registration
 * - loadapi_provider.py entries
 * - Constants and error message management
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class PythonMigrationStrategy {
  constructor(workingDir, migrationEngine) {
    this.workingDir = workingDir;
    this.engine = migrationEngine;
    this.loadApis = new Map();
    this.providers = new Map();
    this.constants = new Map();
  }

  async analyzePatterns() {
    console.log('   🔍 Analyzing Python LoadAPI patterns...');

    // Analyze LoadAPI classes
    await this.analyzeLoadApiClasses();

    // Analyze provider registrations
    await this.analyzeProviders();

    // Analyze constants and error messages
    await this.analyzeConstants();

    // Analyze requirements.txt
    await this.analyzeRequirements();

    return this.generatePatternReport();
  }

  async analyzeLoadApiClasses() {
    // Find LoadAPI classes
    const loadApiFiles = await this.findFiles('**/*LoadApi.py');

    for (const file of loadApiFiles) {
      const content = await fs.readFile(file, 'utf8');
      const loadApiInfo = this.extractLoadApiInfo(content, file);

      if (loadApiInfo) {
        this.loadApis.set(loadApiInfo.className, loadApiInfo);
      }
    }
  }

  async analyzeProviders() {
    // Find loadapi_provider.py
    const providerFiles = await this.findFiles('**/loadapi_provider.py');

    for (const file of providerFiles) {
      const content = await fs.readFile(file, 'utf8');
      const providerInfo = this.extractProviderInfo(content, file);

      if (providerInfo) {
        this.providers.set(providerInfo.module, providerInfo);
      }
    }
  }

  async analyzeConstants() {
    // Find constants files
    const constantFiles = await this.findFiles('**/constant/*.py');

    for (const file of constantFiles) {
      const content = await fs.readFile(file, 'utf8');
      const constantsInfo = this.extractConstantsInfo(content, file);

      if (constantsInfo) {
        this.constants.set(constantsInfo.file, constantsInfo);
      }
    }
  }

  async analyzeRequirements() {
    // Read requirements.txt
    const requirementsPath = path.join(this.workingDir, 'requirements.txt');
    try {
      const content = await fs.readFile(requirementsPath, 'utf8');
      return content.split('\n').filter(line => line.trim());
    } catch (error) {
      console.warn('   ⚠️  requirements.txt not found');
      return [];
    }
  }

  extractLoadApiInfo(content, filePath) {
    // Extract class name
    const classMatch = content.match(/class\s+(\w+)\s*\(/);
    if (!classMatch) return null;

    const className = classMatch[1];

    // Check inheritance
    const inheritsLoadApi = content.includes('LoadApi') || content.includes('object');

    // Extract validation methods
    const hasValidateRow = content.includes('def validate_row');
    const hasGetNormalizedData = content.includes('def _get_normalized_data');

    // Extract MASTER_HEADER
    const masterHeaderMatch = content.match(/MASTER_HEADER\s*=\s*\[([^\]]*)\]/);
    const masterHeader = masterHeaderMatch ?
      masterHeaderMatch[1].split(',').map(h => h.trim().replace(/['"]/g, '')) : [];

    // Extract import statements
    const imports = content.match(/^(?:from\s+[^;]+|import\s+[^;]+)/gm) || [];

    return {
      className,
      inheritsLoadApi,
      hasValidateRow,
      hasGetNormalizedData,
      masterHeader,
      imports: imports.map(imp => imp.trim()),
      filePath,
      module: this.extractModuleName(filePath)
    };
  }

  extractProviderInfo(content, filePath) {
    // Extract provider registrations
    const registrations = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for import_id patterns
      if (line.includes('import_id') || line.includes('IMPORT_ID')) {
        const match = line.match(/['"]([^'"]*import_[^'"]*)['"]/);
        if (match) {
          registrations.push(match[1]);
        }
      }

      // Look for LoadAPI class registrations
      if (line.includes('LoadApi') && line.includes('(')) {
        const match = line.match(/(\w+LoadApi)\s*\(/);
        if (match) {
          registrations.push(match[1]);
        }
      }
    }

    return {
      module: this.extractModuleName(filePath),
      registrations,
      filePath
    };
  }

  extractConstantsInfo(content, filePath) {
    // Extract constants and error messages
    const constants = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // Look for constant definitions
      if (trimmed.match(/^[A-Z][A-Z_]*\s*=/)) {
        const match = trimmed.match(/^([A-Z][A-Z_]*)\s*=\s*(.+)/);
        if (match) {
          constants.push({
            name: match[1],
            value: match[2]
          });
        }
      }
    }

    return {
      file: path.basename(filePath),
      constants,
      filePath
    };
  }

  extractModuleName(filePath) {
    const relativePath = path.relative(this.workingDir, filePath);
    const parts = relativePath.split(path.sep);
    return parts.length > 1 ? parts[parts.length - 2] : 'root';
  }

  async findFiles(pattern) {
    // Simple file finding - in production, use glob or similar
    const findCommand = `find ${this.workingDir} -name "*.py" -type f`;
    try {
      const result = execSync(findCommand, { encoding: 'utf8' });
      const files = result.trim().split('\n').filter(f => f);

      // Filter by pattern (simple implementation)
      return files.filter(file => {
        if (pattern.includes('*LoadApi.py')) {
          return file.includes('LoadApi.py');
        }
        if (pattern.includes('loadapi_provider.py')) {
          return file.includes('loadapi_provider.py');
        }
        if (pattern.includes('constant/*.py')) {
          return file.includes('/constant/') && file.endsWith('.py');
        }
        return true;
      });
    } catch (error) {
      console.warn(`   ⚠️  Error finding files: ${error.message}`);
      return [];
    }
  }

  generatePatternReport() {
    const report = `# Python LoadAPI Repository Patterns

## LoadAPI Classes Analysis

### LoadAPI Classes (${this.loadApis.size})
${Array.from(this.loadApis.values()).map(loadApi => `
#### ${loadApi.className}
- **Module**: ${loadApi.module}
- **Inherits LoadApi**: ${loadApi.inheritsLoadApi ? '✅' : '❌'}
- **Validate Row Method**: ${loadApi.hasValidateRow ? '✅' : '❌'}
- **Normalized Data Method**: ${loadApi.hasGetNormalizedData ? '✅' : '❌'}
- **MASTER_HEADER**: [${loadApi.masterHeader.join(', ')}]
- **File**: ${path.relative(this.workingDir, loadApi.filePath)}
`).join('')}

## Provider Registration Analysis

### Provider Modules (${this.providers.size})
${Array.from(this.providers.values()).map(provider => `
#### ${provider.module}
- **Registrations**: ${provider.registrations.join(', ')}
- **File**: ${path.relative(this.workingDir, provider.filePath)}
`).join('')}

## Constants Analysis

### Constants Files (${this.constants.size})
${Array.from(this.constants.values()).map(constant => `
#### ${constant.file}
- **Constants**: ${constant.constants.length}
${constant.constants.slice(0, 5).map(c => `  - ${c.name} = ${c.value}`).join('\n')}
${constant.constants.length > 5 ? `  - ... and ${constant.constants.length - 5} more` : ''}
- **File**: ${path.relative(this.workingDir, constant.filePath)}
`).join('')}

## Key Patterns Identified

1. **LoadAPI Inheritance**: Classes extend LoadApi base class
2. **Validation Methods**: validate_row() and _get_normalized_data() methods required
3. **Header Management**: MASTER_HEADER defines denormalized column structure
4. **Provider Registration**: LoadAPIs registered in loadapi_provider.py with import_id patterns
5. **Constants Management**: Error messages and constants in uppercase naming
6. **Import Patterns**: Relative imports within the loadapi package structure

## Data Flow Patterns

1. **Input Processing**: Denormalized data → LoadAPI validation → Normalized storage
2. **Error Handling**: self._add_errors() for validation failures
3. **ObjectMap Usage**: get_store_to_store_id_map(), get_sku_to_sku_id_map() for normalization
4. **Constants**: Centralized error messages and validation constants

## Migration Considerations

- **Import ID Format**: import_{module}_{input/output}_{descriptive_name}
- **Registration Updates**: Update both __init__.py files and loadapi_provider.py
- **Header Consistency**: MASTER_HEADER must match export templates and SQL views
- **ObjectMap Integration**: Use standard ObjectMap functions for denormalization
- **Error Message Constants**: Add new error messages to constants files
`;

    return report;
  }

  async adaptCommitForTarget(commit, targetPatterns) {
    console.log(`   🔧 Adapting Python commit ${commit.hash} for target patterns...`);

    const adaptations = [];

    // Analyze what needs to be changed based on the commit
    const filesChanged = commit.filesChanged;

    for (const file of filesChanged) {
      if (file.endsWith('.py')) {
        const adaptation = await this.adaptPythonFile(file, targetPatterns);
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

  async adaptPythonFile(filePath, targetPatterns) {
    const fullPath = path.join(this.workingDir, filePath);

    try {
      const content = await fs.readFile(fullPath, 'utf8');

      // Check if it's a LoadAPI class
      if (content.includes('class') && content.includes('LoadApi')) {
        return await this.adaptLoadApiClass(content, filePath, targetPatterns);
      }

      // Check if it's a provider file
      if (filePath.includes('loadapi_provider.py')) {
        return await this.adaptProviderFile(content, filePath, targetPatterns);
      }

      // Check if it's an __init__.py file
      if (path.basename(filePath) === '__init__.py') {
        return await this.adaptInitFile(content, filePath, targetPatterns);
      }

      // Check if it's a constants file
      if (filePath.includes('/constant/')) {
        return await this.adaptConstantsFile(content, filePath, targetPatterns);
      }

      return null; // No adaptation needed

    } catch (error) {
      console.warn(`   ⚠️  Error adapting file ${filePath}: ${error.message}`);
      return null;
    }
  }

  async adaptLoadApiClass(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Ensure proper inheritance
    if (!content.includes('class') || !content.includes('LoadApi')) {
      console.warn(`   ⚠️  ${filePath} may not properly inherit from LoadApi`);
      changes.push('WARNING: Verify LoadApi inheritance');
    }

    // Ensure MASTER_HEADER is defined
    if (!content.includes('MASTER_HEADER')) {
      console.warn(`   ⚠️  ${filePath} missing MASTER_HEADER definition`);
      changes.push('WARNING: Missing MASTER_HEADER - needs manual definition');
    }

    // Check for required methods
    if (!content.includes('def validate_row')) {
      changes.push('WARNING: Missing validate_row method - needs implementation');
    }

    if (!content.includes('def _get_normalized_data')) {
      changes.push('WARNING: Missing _get_normalized_data method - needs implementation');
    }

    // Ensure proper error handling pattern
    if (!content.includes('self._add_errors')) {
      changes.push('NOTE: Consider using self._add_errors() for validation errors');
    }

    return {
      file: filePath,
      type: 'LoadAPI Class',
      changes,
      adaptedContent
    };
  }

  async adaptProviderFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Provider files typically don't need adaptation unless adding new registrations
    // The actual registration updates are handled during implementation

    changes.push('NOTE: Provider registration will be updated during implementation');

    return {
      file: filePath,
      type: 'Provider File',
      changes,
      adaptedContent
    };
  }

  async adaptInitFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // __init__.py files may need import updates
    changes.push('NOTE: Import statements will be verified during implementation');

    return {
      file: filePath,
      type: 'Init File',
      changes,
      adaptedContent
    };
  }

  async adaptConstantsFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Constants files may need new error message additions
    changes.push('NOTE: New constants will be added during implementation if needed');

    return {
      file: filePath,
      type: 'Constants File',
      changes,
      adaptedContent
    };
  }

  generateImplementationNotes(commit, adaptations) {
    const notes = [];

    if (adaptations.some(a => a.type === 'LoadAPI Class')) {
      notes.push('Register LoadAPI in both __init__.py files (loadapi/ and main/)');
      notes.push('Add import_id entry in loadapi_provider.py');
      notes.push('Update MASTER_HEADER to match target branch column structure');
      notes.push('Ensure import_id follows pattern: import_{module}_{input/output}_{descriptive_name}');
    }

    if (adaptations.some(a => a.changes.some(c => c.includes('WARNING')))) {
      notes.push('Manual implementation required for missing methods or patterns');
    }

    if (adaptations.some(a => a.changes.some(c => c.includes('ObjectMap')))) {
      notes.push('Verify ObjectMap usage follows target branch patterns');
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

    // Check Rule 1: New Input Integration
    if (adaptations.some(a => a.type === 'LoadAPI Class')) {
      const hasRequiredMethods = adaptations.every(a =>
        a.type !== 'LoadAPI Class' ||
        (a.adaptedContent.includes('def validate_row') &&
         a.adaptedContent.includes('def _get_normalized_data'))
      );

      if (!hasRequiredMethods) {
        validationResults.issues.push('Rule 1 violation: Missing required LoadAPI methods');
        validationResults.ruleCompliance = false;
      }

      const hasMasterHeader = adaptations.every(a =>
        a.type !== 'LoadAPI Class' || a.adaptedContent.includes('MASTER_HEADER')
      );

      if (!hasMasterHeader) {
        validationResults.issues.push('Rule 1 violation: Missing MASTER_HEADER definition');
        validationResults.ruleCompliance = false;
      }
    }

    // Check Rule 7: Data Consistency Structure
    if (adaptations.some(a => a.type === 'LoadAPI Class')) {
      // Verify denormalized input → normalized processing pattern
      const usesObjectMaps = adaptations.some(a =>
        a.type === 'LoadAPI Class' && a.adaptedContent.includes('get_')
      );

      if (!usesObjectMaps) {
        validationResults.recommendations.push('Consider using ObjectMap functions for data normalization');
      }
    }

    return validationResults;
  }
}

module.exports = PythonMigrationStrategy;
