#!/usr/bin/env python3
"""
MCP Excel Server Health Check Script

This script validates that the MCP Excel Server is properly installed and functional
before running regression testing workflows.

Usage:
    python mcp-server-validation.py [--config config.yaml] [--verbose]

Returns:
    0: MCP server is healthy and ready
    1: MCP server has issues but fallback is possible
    2: MCP server is critically broken, cannot proceed
"""

import subprocess
import json
import sys
import tempfile
import os
import time
import argparse
from pathlib import Path

class MCPHealthChecker:
    def __init__(self, config_path=None, verbose=False):
        self.verbose = verbose
        self.config = self._load_config(config_path)
        self.results = {
            "overall_status": "unknown",
            "checks": {},
            "recommendations": [],
            "performance_metrics": {}
        }

    def _load_config(self, config_path):
        """Load MCP configuration from config.yaml"""
        if not config_path:
            config_path = Path(__file__).parent.parent / "config.yaml"

        try:
            import yaml
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
            return config.get('mcp_excel_server', {})
        except Exception as e:
            if self.verbose:
                print(f"Warning: Could not load config: {e}")
            return {"enabled": True, "command": "uvx", "args": ["mcp-excel-server"]}

    def log(self, message, level="info"):
        """Log message if verbose mode is enabled"""
        if self.verbose:
            print(f"[{level.upper()}] {message}")

    def check_installation(self):
        """Check if MCP Excel Server is installed"""
        self.log("Checking MCP Excel Server installation...")

        try:
            # Try running the server command
            cmd = self.config.get('command', 'uvx')
            args = self.config.get('args', ['mcp-excel-server'])

            result = subprocess.run(
                [cmd] + args + ['--help'],
                capture_output=True,
                text=True,
                timeout=10
            )

            if result.returncode == 0:
                self.results["checks"]["installation"] = "PASS"
                self.log("✅ MCP Excel Server is installed and accessible")
                return True
            else:
                self.results["checks"]["installation"] = "FAIL"
                self.results["recommendations"].append(
                    f"Install MCP Excel Server: uv tool install mcp-excel-server"
                )
                self.log("❌ MCP Excel Server installation check failed")
                return False

        except (subprocess.TimeoutExpired, FileNotFoundError, subprocess.SubprocessError) as e:
            self.results["checks"]["installation"] = "FAIL"
            self.results["recommendations"].append(
                f"MCP Excel Server not found: {str(e)}"
            )
            self.log(f"❌ MCP Excel Server installation error: {e}")
            return False

    def check_server_initialization(self):
        """Test server initialization and basic communication"""
        self.log("Testing MCP server initialization...")

        start_time = time.time()
        try:
            # Start server process
            cmd = self.config.get('command', 'uvx')
            args = self.config.get('args', ['mcp-excel-server'])

            process = subprocess.Popen(
                [cmd] + args,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )

            # Send initialize request
            init_request = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {},
                    "clientInfo": {"name": "health-check", "version": "1.0"}
                }
            }

            process.stdin.write(json.dumps(init_request) + '\n')
            process.stdin.flush()

            # Read response with timeout
            response = process.stdout.readline().strip()

            init_time = time.time() - start_time
            self.results["performance_metrics"]["initialization_time"] = f"{init_time:.2f}s"

            if init_time > 5.0:
                self.results["checks"]["initialization_performance"] = "WARNING"
                self.results["recommendations"].append(
                    f"Slow initialization ({init_time:.2f}s), consider checking system resources"
                )

            # Parse response
            response_data = json.loads(response)

            if 'result' in response_data:
                server_info = response_data['result'].get('serverInfo', {})
                version = server_info.get('version', 'unknown')
                self.log(f"✅ Server initialized successfully (v{version})")

                # Check capabilities
                capabilities = response_data['result'].get('capabilities', {})
                if 'tools' in capabilities:
                    self.results["checks"]["server_initialization"] = "PASS"
                    self.results["checks"]["capabilities_check"] = "PASS"
                    return True
                else:
                    self.results["checks"]["capabilities_check"] = "FAIL"
                    self.results["recommendations"].append("Server missing tools capability")
            else:
                self.results["checks"]["server_initialization"] = "FAIL"
                if 'error' in response_data:
                    error = response_data['error']
                    self.results["recommendations"].append(f"Server error: {error.get('message', 'Unknown error')}")
                self.log("❌ Server initialization failed")
                return False

        except (json.JSONDecodeError, subprocess.SubprocessError, Exception) as e:
            self.results["checks"]["server_initialization"] = "FAIL"
            self.results["recommendations"].append(f"Server communication error: {str(e)}")
            self.log(f"❌ Server initialization error: {e}")
            return False
        finally:
            try:
                process.terminate()
                process.wait(timeout=2)
            except:
                try:
                    process.kill()
                except:
                    pass

    def check_tools_availability(self):
        """Check that all required tools are available"""
        self.log("Checking available tools...")

        required_tools = [
            'read_excel', 'write_excel', 'update_excel', 'analyze_excel',
            'filter_excel', 'pivot_table', 'export_chart', 'data_summary'
        ]

        try:
            cmd = self.config.get('command', 'uvx')
            args = self.config.get('args', ['mcp-excel-server'])

            process = subprocess.Popen(
                [cmd] + args,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )

            # Initialize first
            init_request = {
                "jsonrpc": "2.0", "id": 1, "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05", "capabilities": {},
                    "clientInfo": {"name": "health-check", "version": "1.0"}
                }
            }
            process.stdin.write(json.dumps(init_request) + '\n')
            process.stdin.flush()
            process.stdout.readline()  # Consume init response

            # Request tools list
            tools_request = {
                "jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}
            }
            process.stdin.write(json.dumps(tools_request) + '\n')
            process.stdin.flush()

            tools_response = process.stdout.readline().strip()
            tools_data = json.loads(tools_response)

            if 'result' in tools_data and 'tools' in tools_data['result']:
                available_tools = [tool['name'] for tool in tools_data['result']['tools']]
                self.log(f"Found {len(available_tools)} tools: {', '.join(available_tools)}")

                missing_tools = [tool for tool in required_tools if tool not in available_tools]
                extra_tools = [tool for tool in available_tools if tool not in required_tools]

                if not missing_tools:
                    self.results["checks"]["tools_availability"] = "PASS"
                    self.log("✅ All required tools are available")
                    return True
                else:
                    self.results["checks"]["tools_availability"] = "FAIL"
                    self.results["recommendations"].append(f"Missing tools: {', '.join(missing_tools)}")
                    self.log(f"❌ Missing required tools: {missing_tools}")
                    return False
            else:
                self.results["checks"]["tools_availability"] = "FAIL"
                self.results["recommendations"].append("Could not retrieve tools list")
                self.log("❌ Failed to get tools list")
                return False

        except Exception as e:
            self.results["checks"]["tools_availability"] = "FAIL"
            self.results["recommendations"].append(f"Tools check error: {str(e)}")
            self.log(f"❌ Tools availability check error: {e}")
            return False
        finally:
            try:
                process.terminate()
                process.wait(timeout=2)
            except:
                pass

    def test_functionality(self):
        """Test basic functionality with a sample TSV file"""
        self.log("Testing basic functionality with sample TSV...")

        # Create temporary test file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.tsv', delete=False) as f:
            f.write("id\tname\tvalue\tcategory\n")
            f.write("1\tAlice\t100.5\tA\n")
            f.write("2\tBob\t250.3\tB\n")
            f.write("3\tCharlie\t75.8\tA\n")
            temp_file = f.name

        try:
            cmd = self.config.get('command', 'uvx')
            args = self.config.get('args', ['mcp-excel-server'])

            process = subprocess.Popen(
                [cmd] + args,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )

            # Initialize
            init_request = {
                "jsonrpc": "2.0", "id": 1, "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05", "capabilities": {},
                    "clientInfo": {"name": "health-check", "version": "1.0"}
                }
            }
            process.stdin.write(json.dumps(init_request) + '\n')
            process.stdin.flush()
            process.stdout.readline()  # Consume init response

            # Test read_excel
            read_request = {
                "jsonrpc": "2.0", "id": 2, "method": "tools/call",
                "params": {
                    "name": "read_excel",
                    "arguments": {"file_path": temp_file, "header": 0}
                }
            }
            process.stdin.write(json.dumps(read_request) + '\n')
            process.stdin.flush()

            read_response = process.stdout.readline().strip()
            read_data = json.loads(read_response)

            if 'result' in read_data:
                # Check if data was read correctly
                if 'content' in read_data['result']:
                    content = read_data['result']['content']
                    if content and len(content) > 0 and 'text' in content[0]:
                        text_data = content[0]['text']
                        if 'Alice' in text_data and 'Bob' in text_data:
                            self.results["checks"]["tsv_reading"] = "PASS"
                            self.log("✅ TSV file reading works correctly")
                        else:
                            self.results["checks"]["tsv_reading"] = "FAIL"
                            self.results["recommendations"].append("TSV reading returned incorrect data")
                    else:
                        self.results["checks"]["tsv_reading"] = "FAIL"
                        self.results["recommendations"].append("TSV reading returned empty content")
                else:
                    self.results["checks"]["tsv_reading"] = "FAIL"
                    self.results["recommendations"].append("Unexpected TSV read response format")
            else:
                self.results["checks"]["tsv_reading"] = "FAIL"
                self.results["recommendations"].append("TSV reading failed")

            # Test data_summary
            summary_request = {
                "jsonrpc": "2.0", "id": 3, "method": "tools/call",
                "params": {
                    "name": "data_summary",
                    "arguments": {"file_path": temp_file}
                }
            }
            process.stdin.write(json.dumps(summary_request) + '\n')
            process.stdin.flush()

            summary_response = process.stdout.readline().strip()
            summary_data = json.loads(summary_response)

            if 'result' in summary_data:
                self.results["checks"]["data_summary"] = "PASS"
                self.log("✅ Data summary generation works")
            else:
                self.results["checks"]["data_summary"] = "FAIL"
                self.results["recommendations"].append("Data summary generation failed")

            return self.results["checks"].get("tsv_reading") == "PASS"

        except Exception as e:
            self.results["checks"]["functionality_test"] = "FAIL"
            self.results["recommendations"].append(f"Functionality test error: {str(e)}")
            self.log(f"❌ Functionality test error: {e}")
            return False
        finally:
            # Clean up
            try:
                os.unlink(temp_file)
            except:
                pass
            try:
                process.terminate()
                process.wait(timeout=2)
            except:
                pass

    def run_all_checks(self):
        """Run all health checks and determine overall status"""
        self.log("Starting MCP Excel Server health check...")

        checks = [
            ("installation", self.check_installation),
            ("server_initialization", self.check_server_initialization),
            ("tools_availability", self.check_tools_availability),
            ("functionality_test", self.test_functionality)
        ]

        all_passed = True
        critical_failures = 0

        for check_name, check_func in checks:
            try:
                result = check_func()
                if check_name in ["installation", "server_initialization", "tools_availability"]:
                    if not result:
                        critical_failures += 1
                        all_passed = False
                elif check_name == "functionality_test":
                    if not result:
                        all_passed = False
            except Exception as e:
                self.log(f"Error during {check_name}: {e}")
                self.results["checks"][check_name] = "ERROR"
                critical_failures += 1
                all_passed = False

        # Determine overall status
        if critical_failures > 0:
            self.results["overall_status"] = "CRITICAL"
        elif not all_passed:
            self.results["overall_status"] = "WARNING"
        else:
            self.results["overall_status"] = "PASS"

        return self.results

    def print_report(self):
        """Print detailed health check report"""
        print("\n" + "="*60)
        print("MCP EXCEL SERVER HEALTH CHECK REPORT")
        print("="*60)

        status_colors = {
            "PASS": "✅",
            "WARNING": "⚠️",
            "FAIL": "❌",
            "ERROR": "💥",
            "CRITICAL": "🚨"
        }

        print(f"\nOverall Status: {status_colors.get(self.results['overall_status'], '❓')} {self.results['overall_status']}")

        print("\nCheck Results:")
        for check, status in self.results["checks"].items():
            print(f"  {status_colors.get(status, '❓')} {check.replace('_', ' ').title()}: {status}")

        if self.results["performance_metrics"]:
            print("\nPerformance Metrics:")
            for metric, value in self.results["performance_metrics"].items():
                print(f"  • {metric.replace('_', ' ').title()}: {value}")

        if self.results["recommendations"]:
            print("\nRecommendations:")
            for rec in self.results["recommendations"]:
                print(f"  • {rec}")

        print("\n" + "="*60)

    def get_exit_code(self):
        """Get appropriate exit code based on health check results"""
        status = self.results["overall_status"]
        if status == "PASS":
            return 0
        elif status == "WARNING":
            return 1
        else:  # CRITICAL, FAIL, ERROR
            return 2


def main():
    parser = argparse.ArgumentParser(description="MCP Excel Server Health Check")
    parser.add_argument("--config", help="Path to config.yaml file")
    parser.add_argument("--verbose", "-v", action="store_true", help="Enable verbose output")

    args = parser.parse_args()

    checker = MCPHealthChecker(config_path=args.config, verbose=args.verbose)
    results = checker.run_all_checks()
    checker.print_report()

    sys.exit(checker.get_exit_code())


if __name__ == "__main__":
    main()
