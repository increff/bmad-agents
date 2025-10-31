# VIRAT Testing Commands

## Environment Setup
node utils/env-loader.js verify  # Verify .env setup
node utils/env-loader.js load    # Load environment variables

## VIRAT Testing Commands
*validate-rules              # Validate against all 45 rules
*validate-core-rules         # Validate core implementation rules
*validate-repo-rules         # Validate repository coordination
*validate-pattern-rules      # Validate pattern compliance
*validate-testing-rules      # Validate testing framework
*mcp-validate-implementation # Use MCP tools to validate implementations
*test-implementation         # Execute comprehensive testing

## Automated Validation Tools
python3 tools/validate-rules.py --workflow pre_deployment  # Full pre-deployment validation
python3 tools/validate-rules.py --check row_file_sync     # Check Row-File synchronization
python3 tools/validate-rules.py --check compilation       # Check code compilation

## Checklists
- checklists/validation-checklist.md     # Comprehensive validation checklist
- checklists/implementation-checklist.md # Implementation checklist
- checklists/environment-validation-checklist.md # Environment validation
