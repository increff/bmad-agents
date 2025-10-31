/**
 * Java Algorithm Repository Migration Strategy
 *
 * Handles migration of Java/Spring Boot algorithm code following VIRAT patterns:
 * - Module classes and GroupModules
 * - AbstractUtilModuleGroup inheritance
 * - Args classes and validation
 * - ModuleProvider and SchemaProvider registration
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class JavaMigrationStrategy {
  constructor(workingDir, migrationEngine) {
    this.workingDir = workingDir;
    this.engine = migrationEngine;
    this.pomXml = null;
    this.modules = new Map();
    this.validationModules = new Map();
  }

  async analyzePatterns() {
    console.log('   🔍 Analyzing Java algorithm patterns...');

    // Read POM file
    this.pomXml = await this.readPomFile();

    // Analyze module structure
    await this.analyzeModuleStructure();

    // Analyze validation patterns
    await this.analyzeValidationPatterns();

    // Analyze args patterns
    await this.analyzeArgsPatterns();

    return this.generatePatternReport();
  }

  async readPomFile() {
    const pomPath = path.join(this.workingDir, 'pom.xml');
    try {
      return await fs.readFile(pomPath, 'utf8');
    } catch (error) {
      console.warn('   ⚠️  POM file not found, using default analysis');
      return null;
    }
  }

  async analyzeModuleStructure() {
    // Find all module classes
    const moduleFiles = await this.findFiles('**/*Module.java');

    for (const file of moduleFiles) {
      const content = await fs.readFile(file, 'utf8');
      const moduleInfo = this.extractModuleInfo(content, file);

      if (moduleInfo) {
        this.modules.set(moduleInfo.className, moduleInfo);
      }
    }
  }

  async analyzeValidationPatterns() {
    // Find validation modules
    const validationFiles = await this.findFiles('**/*ValidationModule.java');

    for (const file of validationFiles) {
      const content = await fs.readFile(file, 'utf8');
      const validationInfo = this.extractValidationInfo(content, file);

      if (validationInfo) {
        this.validationModules.set(validationInfo.className, validationInfo);
      }
    }
  }

  async analyzeArgsPatterns() {
    // Find Args classes
    const argsFiles = await this.findFiles('**/args/*Args.java');

    const argsClasses = [];
    for (const file of argsFiles) {
      const content = await fs.readFile(file, 'utf8');
      const argsInfo = this.extractArgsInfo(content, file);

      if (argsInfo) {
        argsClasses.push(argsInfo);
      }
    }

    return argsClasses;
  }

  extractModuleInfo(content, filePath) {
    const classNameMatch = content.match(/class\s+(\w+)\s+extends\s+(\w+)/);
    if (!classNameMatch) return null;

    const className = classNameMatch[1];
    const parentClass = classNameMatch[2];

    // Check if it's a group module or regular module
    const isGroupModule = parentClass.includes('AbstractUtilModuleGroup');
    const isRegularModule = parentClass.includes('AbstractModule');

    // Extract @Component annotation
    const hasComponent = content.includes('@Component');

    // Extract submodule registrations
    const submoduleMatches = content.match(/addSubModule\(new\s+(\w+)\(\)\)/g) || [];
    const submodules = submoduleMatches.map(match =>
      match.match(/addSubModule\(new\s+(\w+)\(\)\)/)[1]
    );

    return {
      className,
      parentClass,
      isGroupModule,
      isRegularModule,
      hasComponent,
      submodules,
      filePath,
      package: this.extractPackage(content)
    };
  }

  extractValidationInfo(content, filePath) {
    const classNameMatch = content.match(/class\s+(\w+)\s+extends\s+AbstractValidationModule/);
    if (!classNameMatch) return null;

    const className = classNameMatch[1];

    // Extract @Component annotation
    const hasComponent = content.includes('@Component');

    // Extract validate method
    const validateMethod = content.match(/public\s+void\s+validate\s*\([^)]*\)\s*{[^}]*}/s);

    return {
      className,
      hasComponent,
      hasValidateMethod: !!validateMethod,
      filePath,
      package: this.extractPackage(content)
    };
  }

  extractArgsInfo(content, filePath) {
    const classNameMatch = content.match(/class\s+(\w+)\s+extends\s+Args/);
    if (!classNameMatch) return null;

    const className = classNameMatch[1];

    // Extract fields
    const fieldMatches = content.match(/private\s+(String|Integer|Double|Boolean)\s+(\w+);/g) || [];
    const fields = fieldMatches.map(match => {
      const [, type, name] = match.match(/private\s+(String|Integer|Double|Boolean)\s+(\w+);/);
      return { name, type };
    });

    // Extract @PostConstruct method
    const hasPostConstruct = content.includes('@PostConstruct');

    // Extract @Autowired fields
    const autowiredMatches = content.match(/@Autowired\s+[^;]+/g) || [];

    return {
      className,
      fields,
      hasPostConstruct,
      autowiredDependencies: autowiredMatches.length,
      filePath,
      package: this.extractPackage(content)
    };
  }

  extractPackage(content) {
    const packageMatch = content.match(/package\s+([^;]+);/);
    return packageMatch ? packageMatch[1] : null;
  }

  async findFiles(pattern) {
    // Simple file finding - in production, use glob or similar
    const findCommand = `find ${this.workingDir} -name "*.java" -type f`;
    try {
      const result = execSync(findCommand, { encoding: 'utf8' });
      const files = result.trim().split('\n').filter(f => f);

      // Filter by pattern (simple implementation)
      return files.filter(file => {
        if (pattern.includes('**/*Module.java')) {
          return file.includes('Module.java');
        }
        if (pattern.includes('**/args/*Args.java')) {
          return file.includes('/args/') && file.includes('Args.java');
        }
        if (pattern.includes('*ValidationModule.java')) {
          return file.includes('ValidationModule.java');
        }
        return true;
      });
    } catch (error) {
      console.warn(`   ⚠️  Error finding files: ${error.message}`);
      return [];
    }
  }

  generatePatternReport() {
    const report = `# Java Algorithm Repository Patterns

## Module Structure Analysis

### Group Modules (${Array.from(this.modules.values()).filter(m => m.isGroupModule).length})
${Array.from(this.modules.values()).filter(m => m.isGroupModule).map(module => `
#### ${module.className}
- **Package**: ${module.package}
- **Parent Class**: ${module.parentClass}
- **Submodules**: ${module.submodules.join(', ') || 'None'}
- **Component**: ${module.hasComponent ? '✅' : '❌'}
- **File**: ${path.relative(this.workingDir, module.filePath)}
`).join('')}

### Regular Modules (${Array.from(this.modules.values()).filter(m => m.isRegularModule).length})
${Array.from(this.modules.values()).filter(m => m.isRegularModule).map(module => `
#### ${module.className}
- **Package**: ${module.package}
- **Parent Class**: ${module.parentClass}
- **Component**: ${module.hasComponent ? '✅' : '❌'}
- **File**: ${path.relative(this.workingDir, module.filePath)}
`).join('')}

## Validation Module Analysis

### Validation Modules (${this.validationModules.size})
${Array.from(this.validationModules.values()).map(validation => `
#### ${validation.className}
- **Package**: ${validation.package}
- **Component**: ${validation.hasComponent ? '✅' : '❌'}
- **Validate Method**: ${validation.hasValidateMethod ? '✅' : '❌'}
- **File**: ${path.relative(this.workingDir, validation.filePath)}
`).join('')}

## Args Classes Analysis

### Args Classes (${this.analyzeArgsPatterns ? 'Analysis available' : 'Not analyzed'})
Args classes follow the pattern: single Args class per Group Module, shared across all submodules.

## Key Patterns Identified

1. **Module Hierarchy**: Group modules extend AbstractUtilModuleGroup, regular modules extend AbstractModule
2. **Component Registration**: All modules must be annotated with @Component
3. **Validation Pattern**: Validation modules extend AbstractValidationModule and implement validate() method
4. **Args Pattern**: One Args class per Group Module with @Autowired injection and @PostConstruct initialization
5. **Registration Pattern**: Modules registered in ModuleProvider, validations in ValidationModuleNames

## Migration Considerations

- **Class Inheritance**: Ensure proper extension of abstract base classes
- **Annotation Requirements**: @Component, @Autowired, @PostConstruct as needed
- **Registration Updates**: Update ModuleProvider and ValidationModuleNames
- **Import Statements**: Maintain correct package imports
- **Args Dependencies**: Ensure Args classes are properly injected
`;

    return report;
  }

  async adaptCommitForTarget(commit, targetPatterns) {
    console.log(`   🔧 Adapting Java commit ${commit.hash} for target patterns...`);

    const adaptations = [];

    // Analyze what needs to be changed based on the commit
    const filesChanged = commit.filesChanged;

    for (const file of filesChanged) {
      if (file.endsWith('.java')) {
        const adaptation = await this.adaptJavaFile(file, targetPatterns);
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

  async adaptJavaFile(filePath, targetPatterns) {
    const fullPath = path.join(this.workingDir, filePath);

    try {
      const content = await fs.readFile(fullPath, 'utf8');

      // Check if it's a module class
      if (content.includes('extends AbstractModule') || content.includes('extends AbstractUtilModuleGroup')) {
        return await this.adaptModuleClass(content, filePath, targetPatterns);
      }

      // Check if it's a validation class
      if (content.includes('extends AbstractValidationModule')) {
        return await this.adaptValidationClass(content, filePath, targetPatterns);
      }

      // Check if it's an Args class
      if (content.includes('extends Args') && filePath.includes('/args/')) {
        return await this.adaptArgsClass(content, filePath, targetPatterns);
      }

      return null; // No adaptation needed

    } catch (error) {
      console.warn(`   ⚠️  Error adapting file ${filePath}: ${error.message}`);
      return null;
    }
  }

  async adaptModuleClass(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Ensure @Component annotation
    if (!content.includes('@Component')) {
      // Add @Component import if not present
      if (!content.includes('import org.springframework.stereotype.Component;')) {
        adaptedContent = adaptedContent.replace(
          /(package\s+[^;]+;)/,
          '$1\n\nimport org.springframework.stereotype.Component;'
        );
        changes.push('Added @Component import');
      }

      // Add @Component annotation
      adaptedContent = adaptedContent.replace(
        /(public\s+class\s+\w+)/,
        '@Component\n$1'
      );
      changes.push('Added @Component annotation');
    }

    // Ensure proper inheritance
    const classMatch = content.match(/class\s+(\w+)\s+extends\s+(\w+)/);
    if (classMatch) {
      const [, className, parentClass] = classMatch;

      if (!parentClass.includes('AbstractModule') && !parentClass.includes('AbstractUtilModuleGroup')) {
        console.warn(`   ⚠️  ${className} extends ${parentClass} - may need inheritance adjustment`);
      }
    }

    return {
      file: filePath,
      type: 'Module Class',
      changes,
      adaptedContent
    };
  }

  async adaptValidationClass(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Ensure @Component annotation
    if (!content.includes('@Component')) {
      if (!content.includes('import org.springframework.stereotype.Component;')) {
        adaptedContent = adaptedContent.replace(
          /(package\s+[^;]+;)/,
          '$1\n\nimport org.springframework.stereotype.Component;'
        );
        changes.push('Added @Component import');
      }

      adaptedContent = adaptedContent.replace(
        /(public\s+class\s+\w+)/,
        '@Component\n$1'
      );
      changes.push('Added @Component annotation');
    }

    // Ensure validate method exists
    if (!content.includes('public void validate(')) {
      console.warn(`   ⚠️  Validation class ${filePath} missing validate method`);
      changes.push('WARNING: Missing validate method - needs manual implementation');
    }

    return {
      file: filePath,
      type: 'Validation Class',
      changes,
      adaptedContent
    };
  }

  async adaptArgsClass(content, filePath, targetPatterns) {
    let adaptedContent = content;
    const changes = [];

    // Ensure @PostConstruct annotation import
    if (content.includes('@PostConstruct') && !content.includes('import javax.annotation.PostConstruct;')) {
      adaptedContent = adaptedContent.replace(
        /(package\s+[^;]+;)/,
        '$1\n\nimport javax.annotation.PostConstruct;'
      );
      changes.push('Added @PostConstruct import');
    }

    return {
      file: filePath,
      type: 'Args Class',
      changes,
      adaptedContent
    };
  }

  generateImplementationNotes(commit, adaptations) {
    const notes = [];

    if (adaptations.some(a => a.type === 'Module Class')) {
      notes.push('Register new module in ModuleProvider if creating new group module');
    }

    if (adaptations.some(a => a.type === 'Validation Class')) {
      notes.push('Register validation module in ValidationModuleNames');
      notes.push('Update ValidationModuleNames enum with new validation module name');
    }

    if (adaptations.some(a => a.changes.some(c => c.includes('WARNING')))) {
      notes.push('Manual implementation required for missing methods or patterns');
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

    // Check Rule 3: New Module Creation
    if (adaptations.some(a => a.type === 'Module Class')) {
      const hasComponent = adaptations.every(a =>
        a.type !== 'Module Class' || a.adaptedContent.includes('@Component')
      );

      if (!hasComponent) {
        validationResults.issues.push('Rule 3 violation: Missing @Component annotation on module class');
        validationResults.ruleCompliance = false;
      }
    }

    // Check Rule 8: Validation Naming
    if (adaptations.some(a => a.type === 'Validation Class')) {
      const hasComponent = adaptations.every(a =>
        a.type !== 'Validation Class' || a.adaptedContent.includes('@Component')
      );

      if (!hasComponent) {
        validationResults.issues.push('Rule 8 violation: Missing @Component annotation on validation module');
        validationResults.ruleCompliance = false;
      }
    }

    return validationResults;
  }
}

module.exports = JavaMigrationStrategy;
