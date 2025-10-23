---
id: analyze-output-files
name: Analyze Algorithm Output Files
description: Scans and analyzes algorithm output files to understand their structure and content.
---

# Task: Analyze Algorithm Output Files

## Objective
To scan and analyze all algorithm output files in the configured directory to understand their structure, format, and content patterns.

## Actions
1.  **File Discovery**: Scan the algorithm outputs directory to identify all output files by supported file types (CSV, JSON, TXT, XLSX, TSV).
2.  **Structure Analysis**: Analyze file structure, headers, data types, and format consistency across files.
3.  **Content Sampling**: Sample data from each file to understand content patterns and data quality.
4.  **Metadata Collection**: Collect file metadata including size, modification time, and creation patterns.
5.  **Baseline Establishment**: Identify baseline files for regression comparison if available.

## Implementation Details
-   Scan the configured `algorithm_outputs_path` directory recursively for supported file types.
-   Analyze file headers, data structure, and content patterns.
-   Identify files that appear to be baselines or reference outputs.
-   Generate a comprehensive inventory of all output files with their characteristics.
