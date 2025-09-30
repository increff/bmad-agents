<!-- Powered by BMAD™ Core -->

# Configuration Management - Enhanced Implementation

## Purpose

Implement comprehensive configuration management system including YAML-based configuration files, repository path management, and pattern customization to reduce hard-coding and improve system flexibility.

## Task Instructions

### 1. Configuration System Framework

**CRITICAL:** This task implements the configuration management improvements as defined in Epic 3.1 and 3.2 of the PRD.

**Prerequisites:**
- Enhanced ADS Orchestrator must be available
- YAML parsing library must be available
- Configuration validation system must be functional

**Step 1: Configuration File Structure**
1. **Main Configuration File (config/ads-orchestrator.yaml):**
   ```yaml
   # ADS Orchestrator Configuration
   version: "1.0"
   
   # Repository Configuration
   repositories:
     irisx-algo:
       path: "/Users/viratbansal/IdeaProjects/irisx-algo"
       type: "java"
       branch: "main"
       access: "git"
     
     ms-loadapis-ril-final:
       path: "/Users/viratbansal/IdeaProjects/ms-loadapis-ril-final"
       type: "python"
       branch: "main"
       access: "git"
     
     irisx-config:
       path: "/Users/viratbansal/IdeaProjects/irisx-config"
       type: "config"
       branch: "main"
       access: "git"
   
   # Pattern Configuration
   patterns:
     java:
       module_path: "src/main/java/com/increff/irisx/module"
       template_path: "templates/java"
       naming_convention: "camelCase"
     
     python:
       module_path: "loadapi"
       template_path: "templates/python"
       naming_convention: "snake_case"
     
     config:
       template_path: "template"
       sql_path: "view-creation"
       naming_convention: "snake_case"
   
   # Environment Configuration
   environments:
     development:
       repositories:
         irisx-algo:
           path: "/dev/irisx-algo"
         ms-loadapis-ril-final:
           path: "/dev/ms-loadapis-ril-final"
         irisx-config:
           path: "/dev/irisx-config"
     
     staging:
       repositories:
         irisx-algo:
           path: "/staging/irisx-algo"
         ms-loadapis-ril-final:
           path: "/staging/ms-loadapis-ril-final"
         irisx-config:
           path: "/staging/irisx-config"
   
   # User Preferences
   preferences:
     default_environment: "development"
     auto_confirm: false
     progress_display: true
     error_recovery: "interactive"
   ```

2. **Pattern Configuration File (config/patterns.yaml):**
   ```yaml
   # Custom Pattern Definitions
   patterns:
     allocation_module:
       java_template: "AllocationModule.java.template"
       python_template: "LoadApi.py.template"
       config_template: "module_template.tsv"
       validation_rules:
         - "must_extend_AbstractAllocationModule"
         - "must_have_Component_annotation"
         - "must_follow_naming_convention"
     
     data_class:
       java_template: "DataClass.java.template"
       validation_rules:
         - "must_have_getters_and_setters"
         - "must_follow_naming_convention"
         - "must_implement_serializable"
     
     load_api:
       python_template: "LoadApi.py.template"
       validation_rules:
         - "must_extend_LoadApi"
         - "must_define_header"
         - "must_follow_naming_convention"
   ```

**Step 2: Configuration Validation**
1. **Schema Validation:**
   ```yaml
   # Configuration Schema
   schema:
     repositories:
       type: "object"
       required: ["path", "type", "branch", "access"]
       properties:
         path:
           type: "string"
           pattern: "^/.+"
         type:
           type: "string"
           enum: ["java", "python", "config"]
         branch:
           type: "string"
           default: "main"
         access:
           type: "string"
           enum: ["git", "local"]
     
     patterns:
       type: "object"
       required: ["template_path", "naming_convention"]
       properties:
         template_path:
           type: "string"
         naming_convention:
           type: "string"
           enum: ["camelCase", "snake_case", "kebab-case"]
   ```

2. **Validation Rules:**
   - Repository paths must exist and be accessible
   - Pattern templates must exist and be valid
   - Naming conventions must be supported
   - Environment configurations must be consistent

### 2. Repository Path Management

**Step 3: Dynamic Repository Resolution**
1. **Repository Path Resolution:**
   ```python
   def resolve_repository_path(repo_name, environment=None):
       """Resolve repository path based on configuration and environment"""
       config = load_configuration()
       env = environment or config['preferences']['default_environment']
       
       if env in config['environments']:
           env_config = config['environments'][env]
           if repo_name in env_config['repositories']:
               return env_config['repositories'][repo_name]['path']
       
       return config['repositories'][repo_name]['path']
   ```

2. **Path Validation:**
   ```python
   def validate_repository_path(path):
       """Validate that repository path exists and is accessible"""
       if not os.path.exists(path):
           raise ConfigurationError(f"Repository path does not exist: {path}")
       
       if not os.path.isdir(path):
           raise ConfigurationError(f"Repository path is not a directory: {path}")
       
       if not os.access(path, os.R_OK):
           raise ConfigurationError(f"Repository path is not readable: {path}")
       
       return True
   ```

**Step 4: Environment Management**
1. **Environment Switching:**
   ```python
   def switch_environment(environment):
       """Switch to specified environment configuration"""
       config = load_configuration()
       
       if environment not in config['environments']:
           raise ConfigurationError(f"Environment not found: {environment}")
       
       # Update active environment
       config['preferences']['default_environment'] = environment
       save_configuration(config)
       
       # Validate all repository paths
       for repo_name in config['repositories']:
           path = resolve_repository_path(repo_name, environment)
           validate_repository_path(path)
       
       return True
   ```

2. **Environment Validation:**
   ```python
   def validate_environment(environment):
       """Validate environment configuration"""
       config = load_configuration()
       
       if environment not in config['environments']:
           return False, f"Environment not found: {environment}"
       
       env_config = config['environments'][environment]
       
       for repo_name, repo_config in env_config['repositories'].items():
           if repo_name not in config['repositories']:
               return False, f"Repository not defined: {repo_name}"
           
           path = repo_config['path']
           if not validate_repository_path(path):
               return False, f"Invalid repository path: {path}"
       
       return True, "Environment configuration is valid"
   ```

### 3. Pattern Configuration

**Step 5: Custom Pattern Management**
1. **Pattern Definition:**
   ```python
   def define_pattern(pattern_name, pattern_config):
       """Define a custom pattern"""
       patterns = load_patterns()
       
       # Validate pattern configuration
       validate_pattern_config(pattern_config)
       
       # Add pattern to configuration
       patterns['patterns'][pattern_name] = pattern_config
       save_patterns(patterns)
       
       return True
   ```

2. **Pattern Validation:**
   ```python
   def validate_pattern_config(pattern_config):
       """Validate pattern configuration"""
       required_fields = ['java_template', 'python_template', 'config_template']
       
       for field in required_fields:
           if field not in pattern_config:
               raise ConfigurationError(f"Missing required field: {field}")
       
       # Validate template files exist
       for template_type, template_path in pattern_config.items():
           if template_type.endswith('_template'):
               if not os.path.exists(template_path):
                   raise ConfigurationError(f"Template file not found: {template_path}")
       
       return True
   ```

**Step 6: Pattern Inheritance**
1. **Pattern Inheritance System:**
   ```yaml
   # Pattern Inheritance Example
   patterns:
     base_allocation:
       java_template: "BaseAllocationModule.java.template"
       python_template: "BaseLoadApi.py.template"
       config_template: "base_module_template.tsv"
       validation_rules:
         - "must_follow_base_pattern"
     
     custom_allocation:
       extends: "base_allocation"
       java_template: "CustomAllocationModule.java.template"
       additional_validation_rules:
         - "must_have_custom_methods"
   ```

2. **Pattern Resolution:**
   ```python
   def resolve_pattern(pattern_name):
       """Resolve pattern with inheritance"""
       patterns = load_patterns()
       
       if pattern_name not in patterns['patterns']:
           raise ConfigurationError(f"Pattern not found: {pattern_name}")
       
       pattern = patterns['patterns'][pattern_name]
       
       # Handle inheritance
       if 'extends' in pattern:
           base_pattern = resolve_pattern(pattern['extends'])
           pattern = merge_patterns(base_pattern, pattern)
       
       return pattern
   ```

### 4. Configuration Commands

**Step 7: Configuration Management Commands**
1. **Configuration Display:**
   ```python
   def show_configuration():
       """Display current configuration"""
       config = load_configuration()
       
       print("📋 ADS Orchestrator Configuration")
       print("=" * 40)
       print(f"Version: {config['version']}")
       print(f"Environment: {config['preferences']['default_environment']}")
       print()
       
       print("Repositories:")
       for repo_name, repo_config in config['repositories'].items():
           path = resolve_repository_path(repo_name)
           print(f"  {repo_name}: {path}")
       
       print()
       print("Patterns:")
       for pattern_name, pattern_config in config['patterns'].items():
           print(f"  {pattern_name}: {pattern_config['template_path']}")
   ```

2. **Configuration Validation:**
   ```python
   def validate_configuration():
       """Validate entire configuration"""
       config = load_configuration()
       errors = []
       
       # Validate repositories
       for repo_name, repo_config in config['repositories'].items():
           try:
               path = resolve_repository_path(repo_name)
               validate_repository_path(path)
           except ConfigurationError as e:
               errors.append(f"Repository {repo_name}: {str(e)}")
       
       # Validate patterns
       for pattern_name, pattern_config in config['patterns'].items():
           try:
               validate_pattern_config(pattern_config)
           except ConfigurationError as e:
               errors.append(f"Pattern {pattern_name}: {str(e)}")
       
       # Validate environments
       for env_name in config['environments']:
           try:
               validate_environment(env_name)
           except ConfigurationError as e:
               errors.append(f"Environment {env_name}: {str(e)}")
       
       if errors:
           print("❌ Configuration Validation Failed")
           for error in errors:
               print(f"  - {error}")
           return False
       else:
           print("✅ Configuration is valid")
           return True
   ```

**Step 8: Configuration Templates**
1. **Template Generation:**
   ```python
   def generate_configuration_template():
       """Generate configuration template with examples"""
       template = """
   # ADS Orchestrator Configuration Template
   version: "1.0"
   
   # Repository Configuration
   repositories:
     example-repo:
       path: "/path/to/your/repository"
       type: "java"  # java, python, config
       branch: "main"
       access: "git"  # git, local
   
   # Pattern Configuration
   patterns:
     java:
       module_path: "src/main/java/com/example"
       template_path: "templates/java"
       naming_convention: "camelCase"
   
   # Environment Configuration
   environments:
     development:
       repositories:
         example-repo:
           path: "/dev/example-repo"
   
   # User Preferences
   preferences:
     default_environment: "development"
     auto_confirm: false
     progress_display: true
     error_recovery: "interactive"
   """
       
       with open('config/ads-orchestrator.yaml.template', 'w') as f:
           f.write(template)
       
       print("✅ Configuration template generated: config/ads-orchestrator.yaml.template")
   ```

## Success Criteria

- YAML-based configuration system implemented
- Repository path management functional
- Pattern configuration and validation working
- Environment switching implemented
- Configuration validation and error handling working
- Configuration templates and examples provided
- Backward compatibility maintained

## Error Handling

- **Configuration File Not Found**: Provide template and creation guidance
- **Invalid YAML Syntax**: Clear error messages with line numbers
- **Repository Path Issues**: Validation with specific error messages
- **Pattern Validation Failures**: Detailed validation error reporting
- **Environment Configuration Errors**: Clear environment-specific error messages

## Notes

- This task implements configuration management from Epic 3.1 and 3.2
- Maintains backward compatibility with existing hard-coded paths
- Provides flexible configuration system for different environments
- Supports custom pattern definitions and validation
- Integrates with existing error handling and validation systems
