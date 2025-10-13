#!/usr/bin/env python3
"""
Input Granularity Mismatch Detection Tool

This tool performs static analysis on Java codebases to detect
granularity mismatches between input schemas and map key structures.

Usage:
    python granularity-mismatch-detector.py <repo_path> [options]

Options:
    --output <file>     Output report file (JSON)
    --severity <level>  Filter by severity (HIGH, MEDIUM, LOW)
    --module <name>     Analyze specific module only
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple
from dataclasses import dataclass, asdict
from collections import defaultdict


@dataclass
class InputSchema:
    """Represents an input file schema"""
    file_name: str
    file_path: str
    natural_key_columns: List[str]
    value_columns: List[str]
    granularity_level: str


@dataclass
class MapKeyStructure:
    """Represents a map key structure found in code"""
    variable_name: str
    file_path: str
    line_number: int
    key_components: List[str]
    class_name: str


@dataclass
class GetterSignature:
    """Represents a getter method signature"""
    method_name: str
    file_path: str
    line_number: int
    parameters: List[str]
    return_type: str


@dataclass
class GranularityIssue:
    """Represents a detected granularity mismatch"""
    severity: str  # HIGH, MEDIUM, LOW
    issue_type: str  # PATTERN_A, PATTERN_B, PATTERN_C
    description: str
    input_schema: str
    map_variable: str
    missing_dimensions: List[str]
    affected_files: List[str]
    recommendations: List[str]
    risk_score: float


class GranularityMismatchDetector:
    """Main detector class for finding granularity mismatches"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.input_schemas: Dict[str, InputSchema] = {}
        self.map_structures: Dict[str, List[MapKeyStructure]] = {}
        self.getter_signatures: Dict[str, List[GetterSignature]] = {}
        self.issues: List[GranularityIssue] = []
        
    def analyze(self) -> List[GranularityIssue]:
        """Perform complete analysis"""
        print(f"Analyzing repository: {self.repo_path}")
        
        # Step 1: Discover input schemas
        print("\n[1/5] Discovering input schemas...")
        self._discover_input_schemas()
        print(f"Found {len(self.input_schemas)} input schemas")
        
        # Step 2: Extract map key structures
        print("\n[2/5] Extracting map key structures...")
        self._extract_map_structures()
        print(f"Found {sum(len(v) for v in self.map_structures.values())} map structures")
        
        # Step 3: Analyze getter signatures
        print("\n[3/5] Analyzing getter signatures...")
        self._analyze_getter_signatures()
        print(f"Found {sum(len(v) for v in self.getter_signatures.values())} getter methods")
        
        # Step 4: Detect mismatches
        print("\n[4/5] Detecting granularity mismatches...")
        self._detect_pattern_a_issues()
        self._detect_pattern_b_issues()
        self._detect_pattern_c_issues()
        print(f"Detected {len(self.issues)} potential issues")
        
        # Step 5: Calculate risk scores
        print("\n[5/5] Calculating risk scores...")
        self._calculate_risk_scores()
        
        return sorted(self.issues, key=lambda x: x.risk_score, reverse=True)
    
    def _discover_input_schemas(self):
        """Discover all input file schemas from Row classes"""
        row_input_path = self.repo_path / "src/main/java/com/increff/irisx/row/input"
        
        if not row_input_path.exists():
            print(f"Warning: Input row path not found: {row_input_path}")
            return
        
        for java_file in row_input_path.rglob("*.java"):
            self._parse_row_class(java_file)
    
    def _parse_row_class(self, file_path: Path):
        """Parse a Row class to extract schema information"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract class name
            class_match = re.search(r'public\s+class\s+(\w+Row)\s+', content)
            if not class_match:
                return
            
            class_name = class_match.group(1)
            
            # Extract field declarations
            field_pattern = r'private\s+(\w+)\s+(\w+);'
            fields = re.findall(field_pattern, content)
            
            if not fields:
                return
            
            # Heuristic: fields ending with 'id' or containing dimension keywords are natural keys
            natural_key_keywords = ['id', 'code', 'group', 'channel', 'category', 'type', 'store', 'style', 'sku']
            natural_keys = []
            value_fields = []
            
            for field_type, field_name in fields:
                is_key = any(keyword in field_name.lower() for keyword in natural_key_keywords)
                if is_key:
                    natural_keys.append(field_name)
                else:
                    value_fields.append(field_name)
            
            if natural_keys:
                schema = InputSchema(
                    file_name=class_name,
                    file_path=str(file_path.relative_to(self.repo_path)),
                    natural_key_columns=natural_keys,
                    value_columns=value_fields,
                    granularity_level=self._infer_granularity_level(natural_keys)
                )
                self.input_schemas[class_name] = schema
                
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
    
    def _infer_granularity_level(self, natural_keys: List[str]) -> str:
        """Infer human-readable granularity level from keys"""
        keys_str = '-'.join([k.replace('Id', '').replace('Code', '') for k in natural_keys])
        return keys_str.title() + " Level"
    
    def _extract_map_structures(self):
        """Extract map key structures from Data classes"""
        data_path = self.repo_path / "src/main/java/com/increff/irisx/data"
        
        if not data_path.exists():
            print(f"Warning: Data path not found: {data_path}")
            return
        
        for java_file in data_path.rglob("*.java"):
            self._parse_data_class_maps(java_file)
    
    def _parse_data_class_maps(self, file_path: Path):
        """Parse Data class to find map declarations and Key structures"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            class_name = None
            class_match = re.search(r'public\s+class\s+(\w+Data)\s+', ''.join(lines))
            if class_match:
                class_name = class_match.group(1)
            
            for i, line in enumerate(lines, 1):
                # Find map declarations
                map_match = re.search(r'Map<Key,\s*(\w+)>\s+(\w+)', line)
                if map_match:
                    map_type, map_var = map_match.groups()
                    
                    # Search for Key construction in setter methods
                    key_components = self._find_key_construction(lines, map_var)
                    
                    if key_components:
                        structure = MapKeyStructure(
                            variable_name=map_var,
                            file_path=str(file_path.relative_to(self.repo_path)),
                            line_number=i,
                            key_components=key_components,
                            class_name=class_name or "Unknown"
                        )
                        
                        if map_type not in self.map_structures:
                            self.map_structures[map_type] = []
                        self.map_structures[map_type].append(structure)
                        
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
    
    def _find_key_construction(self, lines: List[str], map_var: str) -> List[str]:
        """Find Key construction pattern for a given map variable"""
        # Look for patterns like: map.put(new Key(a, b, c), value)
        content = ''.join(lines)
        
        # Pattern to match Key construction
        pattern = rf'{map_var}\.put\(\s*new\s+Key\((.*?)\)'
        matches = re.findall(pattern, content)
        
        if matches:
            # Take first match and extract parameters
            params = matches[0].split(',')
            return [p.strip() for p in params]
        
        return []
    
    def _analyze_getter_signatures(self):
        """Analyze getter method signatures in Data classes"""
        data_path = self.repo_path / "src/main/java/com/increff/irisx/data"
        
        if not data_path.exists():
            return
        
        for java_file in data_path.rglob("*.java"):
            self._parse_getter_methods(java_file)
    
    def _parse_getter_methods(self, file_path: Path):
        """Parse getter methods from Data class"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            for i, line in enumerate(lines, 1):
                # Match getter methods: public RowType getXxx(param1, param2, ...)
                getter_match = re.search(r'public\s+(\w+)\s+(get\w+)\s*\((.*?)\)', line)
                if getter_match:
                    return_type, method_name, params_str = getter_match.groups()
                    
                    # Parse parameters
                    if params_str.strip():
                        params = [p.strip().split()[-1] for p in params_str.split(',')]
                    else:
                        params = []
                    
                    signature = GetterSignature(
                        method_name=method_name,
                        file_path=str(file_path.relative_to(self.repo_path)),
                        line_number=i,
                        parameters=params,
                        return_type=return_type
                    )
                    
                    if return_type not in self.getter_signatures:
                        self.getter_signatures[return_type] = []
                    self.getter_signatures[return_type].append(signature)
                    
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
    
    def _detect_pattern_a_issues(self):
        """Detect Pattern A: Input Table Granularity Loss"""
        for schema_name, schema in self.input_schemas.items():
            # Find corresponding map structures
            if schema_name in self.map_structures:
                for map_struct in self.map_structures[schema_name]:
                    # Compare natural keys vs map key components
                    schema_keys = set(schema.natural_key_columns)
                    map_keys = set(map_struct.key_components)
                    
                    missing_dimensions = list(schema_keys - map_keys)
                    
                    if missing_dimensions:
                        issue = GranularityIssue(
                            severity="HIGH",
                            issue_type="PATTERN_A",
                            description=f"Input schema has dimensions {missing_dimensions} that are missing from map key",
                            input_schema=schema_name,
                            map_variable=map_struct.variable_name,
                            missing_dimensions=missing_dimensions,
                            affected_files=[schema.file_path, map_struct.file_path],
                            recommendations=[
                                f"Add missing dimensions to Key construction: new Key({', '.join(schema.natural_key_columns)})",
                                f"Update getter method to accept additional parameters: {', '.join(missing_dimensions)}",
                                "Update all call sites to pass the additional dimensions"
                            ],
                            risk_score=0.0  # Will be calculated later
                        )
                        self.issues.append(issue)
    
    def _detect_pattern_b_issues(self):
        """Detect Pattern B: Cross-Level Data Usage"""
        for return_type, getters in self.getter_signatures.items():
            if return_type in self.map_structures:
                for getter in getters:
                    for map_struct in self.map_structures[return_type]:
                        # Check if getter parameters match map key components
                        getter_params = set(getter.parameters)
                        map_components = set(map_struct.key_components)
                        
                        missing_in_getter = list(map_components - getter_params)
                        
                        if missing_in_getter:
                            issue = GranularityIssue(
                                severity="MEDIUM",
                                issue_type="PATTERN_B",
                                description=f"Getter method {getter.method_name} doesn't require dimensions {missing_in_getter} that are part of map key",
                                input_schema=return_type,
                                map_variable=map_struct.variable_name,
                                missing_dimensions=missing_in_getter,
                                affected_files=[getter.file_path, map_struct.file_path],
                                recommendations=[
                                    f"Update getter signature to include: {', '.join(missing_in_getter)}",
                                    "Ensure callers have context to provide missing dimensions",
                                    "Consider if dimension can be resolved from calling context"
                                ],
                                risk_score=0.0
                            )
                            self.issues.append(issue)
    
    def _detect_pattern_c_issues(self):
        """Detect Pattern C: Validation vs Storage Inconsistency"""
        # Search for validation warnings that should be errors
        validation_path = self.repo_path / "src/main/java/com/increff/irisx/validation"
        
        if not validation_path.exists():
            return
        
        for java_file in validation_path.rglob("*.java"):
            self._check_validation_warnings(java_file)
    
    def _check_validation_warnings(self, file_path: Path):
        """Check validation files for warnings that should be errors"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            for i, line in enumerate(lines, 1):
                # Look for warning patterns related to multi-dimensional data
                if 'addWarning' in line and any(keyword in line.lower() for keyword in ['multiple', 'different', 'channel', 'group']):
                    issue = GranularityIssue(
                        severity="MEDIUM",
                        issue_type="PATTERN_C",
                        description=f"Validation warning at line {i} may indicate granularity mismatch that should be an error",
                        input_schema="Unknown",
                        map_variable="Unknown",
                        missing_dimensions=[],
                        affected_files=[str(file_path.relative_to(self.repo_path))],
                        recommendations=[
                            "Review if warning should be upgraded to error",
                            "Check if storage handles multi-dimensional case",
                            "Consider if validation prevents data loss"
                        ],
                        risk_score=0.0
                    )
                    self.issues.append(issue)
                    
        except Exception as e:
            print(f"Error checking validation {file_path}: {e}")
    
    def _calculate_risk_scores(self):
        """Calculate risk scores for all issues"""
        for issue in self.issues:
            score = 0.0
            
            # Data Loss (40%)
            if issue.severity == "HIGH":
                score += 4.0
            elif issue.severity == "MEDIUM":
                score += 2.0
            
            # Pattern Type weighting (30%)
            if issue.issue_type == "PATTERN_A":
                score += 3.0
            elif issue.issue_type == "PATTERN_B":
                score += 1.5
            
            # Number of missing dimensions (20%)
            score += min(len(issue.missing_dimensions) * 0.5, 2.0)
            
            # Number of affected files (10%)
            score += min(len(issue.affected_files) * 0.25, 1.0)
            
            issue.risk_score = score
    
    def generate_report(self, output_file: str = None):
        """Generate analysis report"""
        report = {
            "summary": {
                "total_issues": len(self.issues),
                "high_severity": len([i for i in self.issues if i.severity == "HIGH"]),
                "medium_severity": len([i for i in self.issues if i.severity == "MEDIUM"]),
                "low_severity": len([i for i in self.issues if i.severity == "LOW"]),
                "input_schemas_analyzed": len(self.input_schemas),
                "map_structures_found": sum(len(v) for v in self.map_structures.values())
            },
            "issues": [asdict(issue) for issue in self.issues],
            "prioritized_fixes": self._generate_prioritized_fixes()
        }
        
        if output_file:
            with open(output_file, 'w') as f:
                json.dump(report, f, indent=2)
            print(f"\nReport saved to: {output_file}")
        
        return report
    
    def _generate_prioritized_fixes(self) -> List[Dict]:
        """Generate prioritized fix list"""
        prioritized = []
        
        # Group by priority
        p0_issues = [i for i in self.issues if i.risk_score >= 8.0]
        p1_issues = [i for i in self.issues if 6.0 <= i.risk_score < 8.0]
        p2_issues = [i for i in self.issues if 4.0 <= i.risk_score < 6.0]
        p3_issues = [i for i in self.issues if i.risk_score < 4.0]
        
        if p0_issues:
            prioritized.append({
                "priority": "P0_CRITICAL",
                "count": len(p0_issues),
                "action": "Fix immediately - potential data loss",
                "issues": [i.description for i in p0_issues[:5]]  # Top 5
            })
        
        if p1_issues:
            prioritized.append({
                "priority": "P1_HIGH",
                "count": len(p1_issues),
                "action": "Fix in current sprint",
                "issues": [i.description for i in p1_issues[:5]]
            })
        
        if p2_issues:
            prioritized.append({
                "priority": "P2_MEDIUM",
                "count": len(p2_issues),
                "action": "Fix in next sprint",
                "issues": [i.description for i in p2_issues[:3]]
            })
        
        if p3_issues:
            prioritized.append({
                "priority": "P3_LOW",
                "count": len(p3_issues),
                "action": "Add to backlog",
                "issues": []
            })
        
        return prioritized
    
    def print_summary(self):
        """Print analysis summary to console"""
        print("\n" + "="*80)
        print("GRANULARITY MISMATCH DETECTION SUMMARY")
        print("="*80)
        
        print(f"\nRepository: {self.repo_path}")
        print(f"Input Schemas Analyzed: {len(self.input_schemas)}")
        print(f"Map Structures Found: {sum(len(v) for v in self.map_structures.values())}")
        print(f"\nTotal Issues Found: {len(self.issues)}")
        print(f"  - HIGH Severity: {len([i for i in self.issues if i.severity == 'HIGH'])}")
        print(f"  - MEDIUM Severity: {len([i for i in self.issues if i.severity == 'MEDIUM'])}")
        print(f"  - LOW Severity: {len([i for i in self.issues if i.severity == 'LOW'])}")
        
        # Show top 5 issues
        print("\n" + "-"*80)
        print("TOP 5 ISSUES BY RISK SCORE")
        print("-"*80)
        
        for i, issue in enumerate(self.issues[:5], 1):
            print(f"\n{i}. [{issue.severity}] {issue.issue_type}")
            print(f"   Risk Score: {issue.risk_score:.2f}/10.0")
            print(f"   {issue.description}")
            print(f"   Input: {issue.input_schema}, Map: {issue.map_variable}")
            print(f"   Missing Dimensions: {', '.join(issue.missing_dimensions)}")
        
        print("\n" + "="*80)


def main():
    parser = argparse.ArgumentParser(
        description="Detect input granularity mismatches in Java codebase"
    )
    parser.add_argument("repo_path", help="Path to repository root")
    parser.add_argument("--output", "-o", help="Output JSON report file")
    parser.add_argument("--severity", "-s", choices=["HIGH", "MEDIUM", "LOW"], 
                        help="Filter by severity")
    parser.add_argument("--module", "-m", help="Analyze specific module only")
    
    args = parser.parse_args()
    
    # Validate repository path
    repo_path = Path(args.repo_path)
    if not repo_path.exists():
        print(f"Error: Repository path does not exist: {repo_path}")
        return 1
    
    # Run analysis
    detector = GranularityMismatchDetector(args.repo_path)
    issues = detector.analyze()
    
    # Filter by severity if specified
    if args.severity:
        issues = [i for i in issues if i.severity == args.severity]
    
    # Generate report
    detector.print_summary()
    
    if args.output:
        detector.generate_report(args.output)
    
    return 0


if __name__ == "__main__":
    exit(main())

