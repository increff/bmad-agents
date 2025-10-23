---
id: generate-html-report
name: Generate HTML Error Visualization Report
description: Creates an interactive HTML report with charts and graphs visualizing all errors, their locations, and causes.
---

# Task: Generate HTML Error Visualization Report

## Objective
To create a comprehensive, self-contained HTML report that visualizes all algorithm output validation errors, their locations, and underlying causes through interactive charts and graphs.

## Actions
1. **Collect Error Data**: Gather all validation results, error details, and metadata from previous validation tasks.
2. **Categorize Errors**: Organize errors by type, severity, file location, and root cause.
3. **Generate Visualizations**: Create interactive charts showing:
   - Error distribution by file type and category
   - Error locations and frequencies
   - Trend analysis of error occurrences
   - Error severity breakdown
   - File-by-file error summaries
4. **Create Self-Contained HTML**: Generate a single HTML file with embedded CSS, JavaScript, and data for offline viewing.
5. **Add Interactive Features**: Include filtering, searching, and drill-down capabilities.

## Implementation Details

### Data Collection
- Aggregate results from all validation tasks (schema, data quality, regression, performance)
- Extract error details including file paths, line numbers, error types, and descriptions
- Include metadata about validation runs and timestamps

### Visualization Components
- **Error Overview Dashboard**: Pie charts and bar graphs showing error distribution
- **File Error Map**: Interactive visualization of errors by file location
- **Error Timeline**: Charts showing error patterns over time
- **Severity Matrix**: Heatmap of errors by severity and category
- **Root Cause Analysis**: Charts showing common error patterns and causes

### HTML Generation Requirements
- Self-contained single file (no external dependencies)
- Responsive design that works on different screen sizes
- Interactive charts using embedded Chart.js or similar library
- Search and filter functionality
- Expandable/collapsible sections for detailed error information
- Export capabilities for filtered data

### Technical Implementation
- Use Python with libraries like matplotlib/seaborn for chart generation
- Convert charts to embedded base64 images or use JavaScript charting libraries
- Generate HTML with proper semantic structure and accessibility features
- Include CSS for styling and JavaScript for interactivity

## Output
- Single HTML file (`algorithm-validation-report.html`) containing all visualizations
- Embedded data and interactive features for offline viewing
- Comprehensive error analysis with visual insights