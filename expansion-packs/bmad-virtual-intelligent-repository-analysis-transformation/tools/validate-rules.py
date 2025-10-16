#!/usr/bin/env python3
"""
Automated Rule Validation Script for VIRAT
Validates implementation against core-implementation-rules.yaml

Usage:
  python validate-rules.py --check all
  python validate-rules.py --check row_file_sync
  python validate-rules.py --workflow pre_deployment
  python validate-rules.py --rule mandatory_file_class_synchronization
"""

import argparse
import subprocess
import sys
import yaml
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple, Any

# Color codes for terminal output
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

class ValidationResult:
    def __init__(self, passed: bool, message: str, severity: str = "INFO", details: Dict = None):
        self.passed = passed
        self.message = message
        self.severity = severity
        self.details = details or {}

class RuleValidator:
    def __init__(self, repo_root: str, validation_lib_path: str, error_messages_path: str):
        self.repo_root = Path(repo_root)
        self.validation_lib = self._load_yaml(validation_lib_path)
        self.error_messages = self._load_yaml(error_messages_path)
        self.results = []
        
    def _load_yaml(self, path: str) -> Dict:
        """Load YAML file"""
        with open(path, 'r') as f:
            return yaml.safe_load(f)
    
    def _run_command(self, command: str) -> Tuple[int, str]:
        """Run shell command and return exit code and output"""
        try:
            result = subprocess.run(
                command, 
                shell=True, 
                capture_output=True, 
                text=True, 
                cwd=self.repo_root
            )
            return result.returncode, result.stdout + result.stderr
        except Exception as e:
            return 1, str(e)
    
    def validate_row_file_sync(self) -> ValidationResult:
        """Validate Row-File class synchronization (Rule 44)"""
        print(f"{Colors.CYAN}[RUNNING]{Colors.END} Validating Row-File synchronization...")
        
        # Get modified Row files
        exit_code, output = self._run_command("git diff --name-only HEAD | grep 'Row\\.java$'")
        if exit_code != 0 or not output.strip():
            return ValidationResult(True, "No Row files modified", "INFO")
        
        row_files = [line.strip() for line in output.strip().split('\n')]
        failures = []
        
        for row_file in row_files:
            # Extract base name (without 'Row.java')
            base_name = row_file.replace('Row.java', '')
            file_class = base_name + 'File.java'
            
            # Check if corresponding File class exists in diff
            exit_code, _ = self._run_command(f"git diff --name-only HEAD | grep '{file_class}'")
            if exit_code != 0:
                failures.append(f"{row_file} → Missing {file_class}")
        
        if failures:
            error = self.error_messages['critical_errors']['file_sync_missing']
            return ValidationResult(
                False, 
                f"Row-File synchronization failed: {len(failures)} mismatches",
                "CRITICAL",
                {"failures": failures, "error_code": error['code']}
            )
        
        return ValidationResult(True, f"Row-File synchronization validated: {len(row_files)} pairs", "INFO")
    
    def validate_args_parameters(self) -> ValidationResult:
        """Validate Args parameter registration in post_deployment.sql (Rule 45)"""
        print(f"{Colors.CYAN}[RUNNING]{Colors.END} Validating Args parameter registration...")
        
        # Get new Args fields from diff
        exit_code, output = self._run_command(
            "git diff HEAD -- '*Args.java' | grep '^+.*private' | sed 's/.*private\\s\\+\\w\\+\\s\\+\\(\\w\\+\\);.*/\\1/'"
        )
        
        if exit_code != 0 or not output.strip():
            return ValidationResult(True, "No new Args fields detected", "INFO")
        
        new_fields = [line.strip() for line in output.strip().split('\n')]
        post_deployment_path = self.repo_root / "irisx-config/export/post_deployment.sql"
        
        if not post_deployment_path.exists():
            return ValidationResult(
                False,
                f"post_deployment.sql not found at {post_deployment_path}",
                "CRITICAL"
            )
        
        with open(post_deployment_path, 'r') as f:
            post_deployment_content = f.read()
        
        failures = []
        for field in new_fields:
            # Check for a_input INSERT
            if f"a_input` (name" not in post_deployment_content or f"'{field}'" not in post_deployment_content:
                failures.append(f"{field}: Missing a_input INSERT")
            
            # Check for a_description English
            if not re.search(f"a_description.*'{field}'.*'en'", post_deployment_content):
                failures.append(f"{field}: Missing a_description English INSERT")
            
            # Check for a_description Spanish
            if not re.search(f"a_description.*'{field}'.*'en-mx'", post_deployment_content):
                failures.append(f"{field}: Missing a_description Spanish INSERT")
        
        if failures:
            error = self.error_messages['critical_errors']['args_parameter_missing']
            return ValidationResult(
                False,
                f"Args parameter registration failed: {len(failures)} issues",
                "CRITICAL",
                {"failures": failures, "error_code": error['code']}
            )
        
        return ValidationResult(True, f"Args parameters validated: {len(new_fields)} fields", "INFO")
    
    def validate_header_consistency(self) -> ValidationResult:
        """Validate header consistency across LoadAPI, SQL, Template (Rule 7)"""
        print(f"{Colors.CYAN}[RUNNING]{Colors.END} Validating header consistency...")
        
        # This is a placeholder - would need actual file parsing logic
        # For now, return a warning to manually check
        return ValidationResult(
            True, 
            "Header consistency check: Manual verification recommended",
            "WARNING",
            {"note": "Automated check requires specific LoadAPI/SQL/Template file references"}
        )
    
    def validate_compilation(self) -> ValidationResult:
        """Validate code compilation"""
        print(f"{Colors.CYAN}[RUNNING]{Colors.END} Validating compilation...")
        
        results = []
        
        # Check Algorithm repository (Maven)
        algo_path = self.repo_root / "irisx-algo"
        if algo_path.exists():
            print(f"  {Colors.BLUE}→{Colors.END} Compiling Algorithm repository...")
            exit_code, output = self._run_command(f"cd {algo_path} && mvn clean compile -DskipTests -q")
            if exit_code != 0:
                results.append(("Algorithm", False, output[:500]))
            else:
                results.append(("Algorithm", True, ""))
        
        # Check LoadAPI repository (Python syntax)
        loadapi_path = self.repo_root / "ms-loadapis-ril-final"
        if loadapi_path.exists():
            print(f"  {Colors.BLUE}→{Colors.END} Checking LoadAPI Python syntax...")
            exit_code, output = self._run_command(
                f"cd {loadapi_path} && find . -name '*.py' -exec python3 -m py_compile {{}} \\; 2>&1"
            )
            if exit_code != 0:
                results.append(("LoadAPI", False, output[:500]))
            else:
                results.append(("LoadAPI", True, ""))
        
        failures = [r for r in results if not r[1]]
        if failures:
            error = self.error_messages['critical_errors']['compilation_failed']
            return ValidationResult(
                False,
                f"Compilation failed in {len(failures)} repository(-ies)",
                "CRITICAL",
                {"failures": failures, "error_code": error['code']}
            )
        
        return ValidationResult(True, f"Compilation successful: {len(results)} repositories", "INFO")
    
    def validate_multiple_loadapis(self, table_name: str = None) -> ValidationResult:
        """Check for multiple LoadAPIs for a table (Rule 6)"""
        if not table_name:
            return ValidationResult(True, "Skipping LoadAPI check (no table specified)", "INFO")
        
        print(f"{Colors.CYAN}[RUNNING]{Colors.END} Checking for multiple LoadAPIs for table '{table_name}'...")
        
        loadapi_path = self.repo_root / "ms-loadapis-ril-final"
        if not loadapi_path.exists():
            return ValidationResult(True, "LoadAPI repository not found, skipping", "WARNING")
        
        exit_code, output = self._run_command(
            f"cd {loadapi_path} && grep -r 'TABLE_NAME.*{table_name}' . | grep -o '[^/]*LoadApi'"
        )
        
        if exit_code == 0 and output.strip():
            loadapis = list(set(output.strip().split('\n')))
            if len(loadapis) > 1:
                return ValidationResult(
                    True,
                    f"Multiple LoadAPIs found for '{table_name}': {len(loadapis)}",
                    "WARNING",
                    {"loadapis": loadapis, "note": "Ensure ALL are updated"}
                )
        
        return ValidationResult(True, f"Single LoadAPI found for '{table_name}'", "INFO")
    
    def run_workflow(self, workflow_name: str) -> List[ValidationResult]:
        """Run a complete validation workflow"""
        workflows = self.validation_lib.get('validation_workflows', {})
        workflow = workflows.get(workflow_name)
        
        if not workflow:
            print(f"{Colors.RED}[ERROR]{Colors.END} Workflow '{workflow_name}' not found")
            return []
        
        print(f"\n{Colors.BOLD}{Colors.CYAN}Running workflow: {workflow_name}{Colors.END}\n")
        
        validation_list = workflow.get('validations', [])
        results = []
        
        for validation_name in validation_list:
            if validation_name == 'row_file_sync':
                result = self.validate_row_file_sync()
            elif validation_name == 'args_parameter_registration':
                result = self.validate_args_parameters()
            elif validation_name == 'header_consistency':
                result = self.validate_header_consistency()
            elif validation_name == 'compilation':
                result = self.validate_compilation()
            elif validation_name == 'all_loadapis_check':
                result = self.validate_multiple_loadapis()
            else:
                result = ValidationResult(True, f"Validation '{validation_name}' not implemented", "WARNING")
            
            results.append(result)
            self._print_result(result)
        
        return results
    
    def _print_result(self, result: ValidationResult):
        """Print validation result with colors"""
        if result.severity == "CRITICAL":
            icon = f"{Colors.RED}✗{Colors.END}"
            severity_color = Colors.RED
        elif result.severity == "ERROR":
            icon = f"{Colors.RED}✗{Colors.END}"
            severity_color = Colors.RED
        elif result.severity == "WARNING":
            icon = f"{Colors.YELLOW}⚠{Colors.END}"
            severity_color = Colors.YELLOW
        else:
            icon = f"{Colors.GREEN}✓{Colors.END}"
            severity_color = Colors.GREEN
        
        print(f"{icon} [{severity_color}{result.severity}{Colors.END}] {result.message}")
        
        if result.details:
            for key, value in result.details.items():
                if key == "failures" and isinstance(value, list):
                    for failure in value:
                        print(f"    {Colors.RED}→{Colors.END} {failure}")
                elif key != "error_code":
                    print(f"    {Colors.BLUE}{key}:{Colors.END} {value}")
    
    def print_summary(self, results: List[ValidationResult]):
        """Print validation summary"""
        total = len(results)
        passed = sum(1 for r in results if r.passed)
        critical = sum(1 for r in results if not r.passed and r.severity == "CRITICAL")
        errors = sum(1 for r in results if not r.passed and r.severity == "ERROR")
        warnings = sum(1 for r in results if r.severity == "WARNING")
        
        print(f"\n{Colors.BOLD}{'='*60}{Colors.END}")
        print(f"{Colors.BOLD}VALIDATION SUMMARY{Colors.END}")
        print(f"{Colors.BOLD}{'='*60}{Colors.END}")
        print(f"Total Checks: {total}")
        print(f"{Colors.GREEN}Passed: {passed}{Colors.END}")
        if critical > 0:
            print(f"{Colors.RED}Critical: {critical}{Colors.END}")
        if errors > 0:
            print(f"{Colors.RED}Errors: {errors}{Colors.END}")
        if warnings > 0:
            print(f"{Colors.YELLOW}Warnings: {warnings}{Colors.END}")
        
        if critical > 0 or errors > 0:
            print(f"\n{Colors.RED}{Colors.BOLD}❌ VALIDATION FAILED{Colors.END}")
            print(f"{Colors.RED}Fix critical errors and errors before proceeding{Colors.END}")
            return False
        elif warnings > 0:
            print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠ VALIDATION PASSED WITH WARNINGS{Colors.END}")
            print(f"{Colors.YELLOW}Review warnings before deploying{Colors.END}")
            return True
        else:
            print(f"\n{Colors.GREEN}{Colors.BOLD}✓ ALL VALIDATIONS PASSED{Colors.END}")
            return True

def main():
    parser = argparse.ArgumentParser(description='Validate implementation against VIRAT rules')
    parser.add_argument('--check', help='Run specific validation check')
    parser.add_argument('--workflow', help='Run validation workflow (pre_commit, pre_deployment, post_implementation)')
    parser.add_argument('--rule', help='Validate against specific rule (by semantic name)')
    parser.add_argument('--repo-root', default='.', help='Repository root path')
    parser.add_argument('--table', help='Table name for LoadAPI check')
    
    args = parser.parse_args()
    
    # Locate validation library and error messages
    script_dir = Path(__file__).parent
    validation_lib = script_dir.parent / 'utils' / 'validation-library.yaml'
    error_messages = script_dir.parent / 'utils' / 'error-messages.yaml'
    
    if not validation_lib.exists() or not error_messages.exists():
        print(f"{Colors.RED}[ERROR]{Colors.END} Validation files not found")
        print(f"  validation-library.yaml: {validation_lib}")
        print(f"  error-messages.yaml: {error_messages}")
        sys.exit(1)
    
    validator = RuleValidator(args.repo_root, validation_lib, error_messages)
    
    results = []
    
    if args.workflow:
        results = validator.run_workflow(args.workflow)
    elif args.check:
        if args.check == 'all':
            results.extend([
                validator.validate_row_file_sync(),
                validator.validate_args_parameters(),
                validator.validate_header_consistency(),
                validator.validate_compilation()
            ])
        elif args.check == 'row_file_sync':
            results.append(validator.validate_row_file_sync())
        elif args.check == 'args_parameter_registration':
            results.append(validator.validate_args_parameters())
        elif args.check == 'compilation':
            results.append(validator.validate_compilation())
        elif args.check == 'multiple_loadapis':
            results.append(validator.validate_multiple_loadapis(args.table))
        else:
            print(f"{Colors.RED}[ERROR]{Colors.END} Unknown check: {args.check}")
            sys.exit(1)
    else:
        print(f"{Colors.YELLOW}[INFO]{Colors.END} No check specified, running pre_deployment workflow")
        results = validator.run_workflow('pre_deployment')
    
    # Print results
    if not args.workflow:
        for result in results:
            validator._print_result(result)
    
    # Print summary
    success = validator.print_summary(results)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()

