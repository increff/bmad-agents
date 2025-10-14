# Export Learning Data Task

## Task Overview
Export learning data for analysis, reporting, and external processing.

## Prerequisites
- Learning data is available
- User has appropriate access permissions
- Export format is specified

## Task Steps

### Step 1: Data Collection
**auto: true**
```python
# Load all learning data
feedback_data = load_feedback_data("examples.json")
learning_data = load_learning_data("learning-history.json")
patterns_data = load_patterns_data("feedback-patterns.json")
improvement_suggestions = load_improvement_suggestions()
```

### Step 2: Export Format Selection
**elicit: true**
```
What format would you like to export the learning data?

1. JSON (structured data)
2. CSV (spreadsheet format)
3. Excel (Excel workbook)
4. HTML (web report)
5. PDF (document format)
6. XML (structured markup)
```

### Step 3: Data Filtering
**elicit: true**
```
What data would you like to export?

1. All learning data
2. Feedback entries only
3. Learning patterns only
4. Improvement suggestions only
5. Specific date range
6. Specific agent data
7. Custom selection
```

### Step 4: Data Processing
**auto: true**
```python
# Process data based on selection
if export_all:
    export_data = {
        "feedback_entries": feedback_data,
        "learning_entries": learning_data,
        "patterns": patterns_data,
        "improvement_suggestions": improvement_suggestions
    }
elif export_feedback_only:
    export_data = feedback_data
elif export_patterns_only:
    export_data = patterns_data
elif export_suggestions_only:
    export_data = improvement_suggestions
elif export_date_range:
    export_data = filter_by_date_range(all_data, start_date, end_date)
elif export_agent_data:
    export_data = filter_by_agent(all_data, selected_agent)
```

### Step 5: Data Transformation
**auto: true**
```python
# Transform data for export
if export_format == "json":
    transformed_data = transform_to_json(export_data)
elif export_format == "csv":
    transformed_data = transform_to_csv(export_data)
elif export_format == "excel":
    transformed_data = transform_to_excel(export_data)
elif export_format == "html":
    transformed_data = transform_to_html(export_data)
elif export_format == "pdf":
    transformed_data = transform_to_pdf(export_data)
elif export_format == "xml":
    transformed_data = transform_to_xml(export_data)
```

### Step 6: Metadata Addition
**auto: true**
```python
# Add metadata to export
metadata = {
    "export_timestamp": get_current_timestamp(),
    "export_format": export_format,
    "data_source": "BMAD Feedback System",
    "total_records": len(export_data),
    "export_version": "1.0",
    "filters_applied": applied_filters
}

export_package = {
    "metadata": metadata,
    "data": transformed_data
}
```

### Step 7: File Generation
**auto: true**
```python
# Generate export file
filename = generate_filename(export_format, timestamp)
file_path = create_export_file(export_package, filename)

# Validate export file
validation_result = validate_export_file(file_path)
if not validation_result["valid"]:
    fix_export_issues(file_path, validation_result["issues"])
```

### Step 8: Export Confirmation
**auto: true**
```python
# Confirm export completion
export_summary = {
    "filename": filename,
    "file_path": file_path,
    "file_size": get_file_size(file_path),
    "record_count": len(export_data),
    "export_format": export_format,
    "export_timestamp": get_current_timestamp()
}
```

## Output
- Exported learning data file
- Export metadata
- Validation results
- Export summary

## Success Criteria
- [ ] Learning data collected and processed
- [ ] Export format selected and applied
- [ ] Data filtered and transformed
- [ ] Export file generated
- [ ] File validated
- [ ] Export confirmed

## Notes
- Ensure data privacy and security
- Validate exported data for accuracy
- Provide clear file naming and organization
- Include metadata for traceability
- Support multiple export formats

