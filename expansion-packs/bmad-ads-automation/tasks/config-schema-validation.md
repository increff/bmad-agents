# Configuration Schema Validation & Consistency

## Overview

This task implements configuration schema validation and consistency checks to prevent configuration errors that cause data loading failures.

## Steps

### 1. Validate JSON Schemas

- Ensure all JSON configs follow proper schema structure
- Validate `module_input.json` and `module_output.json` schemas
- Check for proper JSON syntax and structure
- Verify required fields and data types

### 2. Detect Config Inconsistencies

- Find mismatches between input and output configurations
- Identify inconsistent module references across config files
- Detect missing or duplicate configuration entries
- Validate cross-reference consistency

### 3. Validate Template Consistency

- Ensure TSV templates match config expectations
- Check template headers against configuration schemas
- Validate template data types and formats
- Verify template completeness and accuracy

### 4. Check SQL View Consistency

- Validate SQL views match config data structures
- Ensure view creation scripts align with configurations
- Check for missing or incorrect view definitions
- Verify SQL view consistency with data schemas

### 5. Auto-Fix Config Errors

- Automatically correct common configuration issues
- Fix JSON syntax errors and structural problems
- Resolve configuration inconsistencies
- Generate corrected configuration files

## Expected Outcomes

- 100% configuration schema compliance
- Zero configuration inconsistencies
- Automated configuration validation
- Complete template and SQL view consistency

## Validation Criteria

- All JSON configs follow proper schemas
- Input and output configurations are consistent
- Templates match configuration expectations
- SQL views align with data structures
- All configuration errors are automatically fixed
