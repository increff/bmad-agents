/**
 * MFP Repository Migration Strategy
 *
 * Handles migration of Python MFP (Forecasting) code following VIRAT patterns:
 * - Service classes and route definitions
 * - Forecasting algorithms and business logic
 * - Database helpers and utilities
 * - Python module organization
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class MFPMigrationStrategy {
  constructor(workingDir, migrationEngine) {
    this.workingDir = workingDir;
    this.engine = migrationEngine;
    this.services = new Map();
    this.routes = new Map();
    this.helpers = new Map();
    this.constants = new Map();
  }

  async analyzePatterns() {
    console.log('   🔍 Analyzing MFP patterns...');

    // Analyze service classes
    await this.analyzeServices();

    // Analyze route definitions
    await this.analyzeRoutes();

    // Analyze helper utilities
    await this.analyzeHelpers();

    // Analyze constants
    await this.analyzeConstants();

    return this.generatePatternReport();
  }

  async analyzeServices() {
    // Find service classes
    const serviceFiles = await this.findFiles('**/service/*.py');

    for (const file of serviceFiles) {
      const content = await fs.readFile(file, 'utf8');
      const serviceInfo = this.extractServiceInfo(content, file);

      if (serviceInfo) {
        this.services.set(serviceInfo.className, serviceInfo);
      }
    }
  }

  async analyzeRoutes() {
    // Find route files
    const routeFiles = await this.findFiles('**/routes/*.py');

    for (const file of routeFiles) {
      const content = await fs.readFile(file, 'utf8');
      const routeInfo = this.extractRouteInfo(content, file);

      if (routeInfo) {
        this.routes.set(routeInfo.file, routeInfo);
      }
    }
  }

  async analyzeHelpers() {
    // Find helper/utility files
    const helperFiles = await this.findFiles('**/utils/*.py');

    for (const file of helperFiles) {
      const content = await fs.readFile(file, 'utf8');
      const helperInfo = this.extractHelperInfo(content, file);

      if (helperInfo) {
        this.helpers.set(helperInfo.file, helperInfo);
      }
    }
  }

  async analyzeConstants() {
    // Find constants files
    const constantFiles = await this.findFiles('**/constants/*.py');

    for (const file of constantFiles) {
      const content = await fs.readFile(file, 'utf8');
      const constantsInfo = this.extractConstantsInfo(content, file);

      if (constantsInfo) {
        this.constants.set(constantsInfo.file, constantsInfo);
      }
    }
  }

  extractServiceInfo(content, filePath) {
    // Extract service class information
    const classMatch = content.match(/class\s+(\w+)\s*\(/);
    if (!classMatch) return null;

    const className = classMatch[1];

    // Check for common service patterns
    const hasDbConnection = content.includes('database') || content.includes('mysql') || content.includes('synapse');
    const hasForecastingLogic = content.includes('forecast') || content.includes('predict') || content.includes('calculate');
    const hasBusinessLogic = content.includes('business') || content.includes('logic') || content.includes('process');

    // Extract method signatures
    const methods = content.match(/def\s+(\w+)\s*\(/g) || [];
    const methodNames = methods.map(m => m.match(/def\s+(\w+)/)[1]);

    return {
      className,
      hasDbConnection,
      hasForecastingLogic,
      hasBusinessLogic,
      methods: methodNames,
      filePath,
      module: this.extractModuleName(filePath)
    };
  }

  extractRouteInfo(content, filePath) {
    // Extract route information
    const routes = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for Flask route decorators
      if (line.includes('@app.route') || line.includes('@route')) {
        const routeMatch = line.match(/['"]([^'"]*)['"]/);
        const methodMatch = lines[i + 1]?.match(/def\s+(\w+)/);

        if (routeMatch && methodMatch) {
          routes.push({
            path: routeMatch[1],
            method: methodMatch[1],
            line: i + 1
          });
        }
      }
    }

    return {
      file: path.basename(filePath),
      routes,
      filePath,
      routeCount: routes.length
    };
  }

  extractHelperInfo(content, filePath) {
    // Extract helper/utility information
    const functions = content.match(/def\s+(\w+)\s*\(/g) || [];
    const functionNames = functions.map(f => f.match(/def\s+(\w+)/)[1]);

    // Check for utility patterns
    const hasStaticMethods = content.includes('@staticmethod');
    const hasClassMethods = content.includes('@classmethod');
    const hasBusinessLogic = content.includes('calculate') || content.includes('process') || content.includes('compute');

    return {
      file: path.basename(filePath),
      functions: functionNames,
      hasStaticMethods,
      hasClassMethods,
      hasBusinessLogic,
      filePath
    };
  }

  extractConstantsInfo(content, filePath) {
    // Extract constants information
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
        if (pattern.includes('**/service/*.py')) {
          return file.includes('/service/') && file.endsWith('.py');
        }
        if (pattern.includes('**/routes/*.py')) {
          return file.includes('/routes/') && file.endsWith('.py');
        }
        if (pattern.includes('**/utils/*.py')) {
          return file.includes('/utils/') && file.endsWith('.py');
        }
        if (pattern.includes('**/constants/*.py')) {
          return file.includes('/constants/') && file.endsWith('.py');
        }
        return true;
      });
    } catch (error) {
      console.warn(`   ⚠️  Error finding files: ${error.message}`);
      return [];
    }
  }

  generatePatternReport() {
    const report = `# MFP Repository Patterns

## Service Classes Analysis

### Service Classes (${this.services.size})
${Array.from(this.services.values()).map(service => `
#### ${service.className}
- **Module**: ${service.module}
- **Database Connection**: ${service.hasDbConnection ? '✅' : '❌'}
- **Forecasting Logic**: ${service.hasForecastingLogic ? '✅' : '❌'}
- **Business Logic**: ${service.hasBusinessLogic ? '✅' : '❌'}
- **Methods**: ${service.methods.slice(0, 5).join(', ')}${service.methods.length > 5 ? '...' : ''}
- **File**: ${path.relative(this.workingDir, service.filePath)}
`).join('')}

## Route Definitions Analysis

### Route Files (${this.routes.size})
${Array.from(this.routes.values()).map(route => `
#### ${route.file}
- **Routes**: ${route.routeCount}
${route.routes.slice(0, 3).map(r => `  - ${r.method}: ${r.path}`).join('\n')}
${route.routes.length > 3 ? `  - ... and ${route.routes.length - 3} more` : ''}
- **File**: ${path.relative(this.workingDir, route.filePath)}
`).join('')}

## Helper Utilities Analysis

### Helper Files (${this.helpers.size})
${Array.from(this.helpers.values()).map(helper => `
#### ${helper.file}
- **Functions**: ${helper.functions.length}
- **Static Methods**: ${helper.hasStaticMethods ? '✅' : '❌'}
- **Class Methods**: ${helper.hasClassMethods ? '✅' : '❌'}
- **Business Logic**: ${helper.hasBusinessLogic ? '✅' : '❌'}
- **File**: ${path.relative(this.workingDir, helper.filePath)}
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

### Service Layer Patterns
1. **Database Integration**: Services connect to MySQL/Synapse databases
2. **Forecasting Algorithms**: Core business logic for prediction and calculation
3. **Business Logic Separation**: Clear separation of data access and business logic
4. **Method Organization**: Well-defined public methods for external consumption

### Route Layer Patterns
1. **Flask Route Decorators**: Standard @app.route or @route decorators
2. **RESTful Endpoints**: Clear URL patterns and HTTP methods
3. **Controller Methods**: Route handlers delegate to service layer
4. **Error Handling**: Proper error responses and status codes

### Utility Layer Patterns
1. **Static Methods**: Pure functions for calculations and transformations
2. **Business Logic Helpers**: Reusable computation and processing functions
3. **Data Transformation**: Converting between different data formats
4. **Validation Helpers**: Input validation and business rule checking

### Constants Management
1. **Uppercase Naming**: Consistent ALL_CAPS naming convention
2. **Centralized Definition**: Constants grouped by functional area
3. **Type Safety**: Appropriate data types for different constant types
4. **Documentation**: Clear constant purposes and usage

## Forecasting-Specific Patterns

### Algorithm Implementation
- **Time Series Analysis**: Methods for trend analysis and prediction
- **Statistical Calculations**: Standard deviation, averages, correlations
- **Business Rules**: Domain-specific forecasting logic and constraints
- **Data Processing**: ETL operations for forecasting input data

### Data Flow Patterns
1. **Input Processing**: Raw data ingestion and validation
2. **Algorithm Execution**: Forecasting model application
3. **Result Formatting**: Output formatting for API responses
4. **Persistence**: Result storage and retrieval

## Migration Considerations

- **Algorithm Consistency**: Maintain forecasting algorithm accuracy across branches
- **Database Compatibility**: Ensure database schema compatibility
- **API Contract Stability**: Preserve API endpoints and response formats
- **Performance Requirements**: Maintain forecasting performance standards
- **Business Rule Integrity**: Ensure business rules remain consistent
`;

    return report;
  }

  async adaptCommitForTarget(commit, targetPatterns) {
    console.log(`   🔧 Adapting MFP commit ${commit.hash} for target patterns...`);

    const adaptations = [];

    // Analyze what needs to be changed based on the commit
    const filesChanged = commit.filesChanged;

    for (const file of filesChanged) {
      if (file.endsWith('.py')) {
        const adaptation = await this.adaptMFPFile(file, targetPatterns);
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

  async adaptMFPFile(filePath, targetPatterns) {
    const fullPath = path.join(this.workingDir, filePath);

    try {
      const content = await fs.readFile(fullPath, 'utf8');

      // Check file type and adapt accordingly
      if (filePath.includes('/service/')) {
        return await this.adaptServiceFile(content, filePath, targetPatterns);
      }

      if (filePath.includes('/routes/')) {
        return await this.adaptRouteFile(content, filePath, targetPatterns);
      }

      if (filePath.includes('/utils/')) {
        return await this.adaptUtilsFile(content, filePath, targetPatterns);
      }

      if (filePath.includes('/constants/')) {
        return await this.adaptConstantsFile(content, filePath, targetPatterns);
      }

      return null; // No adaptation needed

    } catch (error) {
      console.warn(`   ⚠️  Error adapting file ${filePath}: ${error.message}`);
      return null;
    }
  }

  async adaptServiceFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Check for proper service class structure
    if (!content.includes('class ')) {
      changes.push('WARNING: File should contain a service class');
    }

    // Check for database integration if applicable
    if (content.includes('def ') && !content.includes('database') && !content.includes('mysql') && !content.includes('synapse')) {
      changes.push('NOTE: Verify database integration patterns if data access is needed');
    }

    // Check for proper method signatures
    const methods = content.match(/def\s+(\w+)\s*\(/g) || [];
    if (methods.length === 0) {
      changes.push('WARNING: Service class should have methods');
    }

    return {
      file: filePath,
      type: 'Service Class',
      changes,
      adaptedContent
    };
  }

  async adaptRouteFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Check for Flask route patterns
    if (!content.includes('@app.route') && !content.includes('@route')) {
      changes.push('NOTE: Verify route decorator patterns (@app.route or @route)');
    }

    // Check for proper route handlers
    const routes = content.match(/@app\.route|@route/g) || [];
    const handlers = content.match(/def\s+\w+\s*\(/g) || [];

    if (routes.length > handlers.length) {
      changes.push('WARNING: Some routes may be missing handler methods');
    }

    return {
      file: filePath,
      type: 'Route File',
      changes,
      adaptedContent
    };
  }

  async adaptUtilsFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Check for utility function patterns
    const functions = content.match(/def\s+(\w+)\s*\(/g) || [];
    if (functions.length === 0) {
      changes.push('WARNING: Utils file should contain utility functions');
    }

    // Check for static method decorators
    if (content.includes('def ') && !content.includes('@staticmethod') && !content.includes('@classmethod')) {
      changes.push('NOTE: Consider using @staticmethod for pure utility functions');
    }

    return {
      file: filePath,
      type: 'Utils File',
      changes,
      adaptedContent
    };
  }

  async adaptConstantsFile(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Check for constant naming conventions
    const lines = content.split('\n');
    const nonConstantLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#') && !trimmed.match(/^[A-Z][A-Z_]*\s*=/);
    });

    if (nonConstantLines.length > 0) {
      changes.push('NOTE: Constants should follow ALL_CAPS naming convention');
    }

    return {
      file: filePath,
      type: 'Constants File',
      changes,
      adaptedContent
    };
  }

  generateImplementationNotes(commit, adaptations) {
    const notes = [];

    if (adaptations.some(a => a.type === 'Service Class')) {
      notes.push('Verify database connection patterns match target environment');
      notes.push('Ensure forecasting algorithms maintain accuracy');
      notes.push('Check service method signatures and return types');
    }

    if (adaptations.some(a => a.type === 'Route File')) {
      notes.push('Verify Flask route decorators follow target patterns');
      notes.push('Check API endpoint URLs and HTTP methods');
      notes.push('Ensure proper error handling in route handlers');
    }

    if (adaptations.some(a => a.type === 'Utils File')) {
      notes.push('Verify utility functions are properly tested');
      notes.push('Check for @staticmethod usage where appropriate');
      notes.push('Ensure business logic accuracy in calculations');
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

    // MFP-specific validation rules would go here
    // Since MFP follows repository-specific patterns, validation is more lenient

    if (adaptations.some(a => a.type === 'Service Class')) {
      const hasMethods = adaptations.every(a =>
        a.type !== 'Service Class' ||
        a.adaptedContent.match(/def\s+\w+\s*\(/g)?.length > 0
      );

      if (!hasMethods) {
        validationResults.issues.push('Service classes should have methods');
        validationResults.patternCompliance = false;
      }
    }

    return validationResults;
  }
}

module.exports = MFPMigrationStrategy;
