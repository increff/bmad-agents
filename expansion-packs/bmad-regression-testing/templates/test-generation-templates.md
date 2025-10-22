# Algorithm Output Validation Templates

<<<<<<< HEAD:expansion-packs/bmad-regression-testing/templates/test-generation-templates.yaml
templates:
  csv_validation:
    description: "CSV File Validation Template"
    code: |
      import pandas as pd

      def validate_csv_output(file_path, baseline_path=None):
          """Validate CSV algorithm output file"""
          # Schema validation
          df = pd.read_csv(file_path)
          expected_columns = ['column1', 'column2', 'column3']  # Define expected schema
          assert list(df.columns) == expected_columns, f"Column mismatch in {file_path}"

          # Data quality checks
          assert not df.isnull().any().any(), f"Null values found in {file_path}"
          assert len(df) > 0, f"Empty file: {file_path}"

          # Regression comparison
          if baseline_path:
              baseline_df = pd.read_csv(baseline_path)
              assert df.shape == baseline_df.shape, f"Shape mismatch: {file_path}"
              # Add more regression checks as needed

  json_validation:
    description: "JSON File Validation Template"
    code: |
      import json
      try:
          from jsonschema import validate
      except ImportError:
          validate = None

      def validate_json_output(file_path, schema_path=None):
          """Validate JSON algorithm output file"""
          with open(file_path, 'r') as f:
              data = json.load(f)

          # Schema validation
          if schema_path and validate:
              with open(schema_path, 'r') as f:
                  schema = json.load(f)
              validate(instance=data, schema=schema)

          # Data quality checks
          assert isinstance(data, dict), f"JSON must be object: {file_path}"
          assert len(data) > 0, f"Empty JSON object: {file_path}"

  performance_validation:
    description: "Performance Validation Template"
    code: |
      import os
      import pandas as pd

      def validate_performance(file_path, max_size_mb=100, max_rows=1000000):
          """Validate file performance characteristics"""
          file_size = os.path.getsize(file_path) / (1024 * 1024)  # MB
          assert file_size <= max_size_mb, f"File too large: {file_size:.2f}MB > {max_size_mb}MB"

          if file_path.endswith('.csv'):
              df = pd.read_csv(file_path)
              assert len(df) <= max_rows, f"Too many rows: {len(df)} > {max_rows}"

  regression_detection:
    description: "Regression Detection Template"
    code: |
      import pandas as pd

      def detect_regression(current_file, baseline_file, tolerance=0.01):
          """Detect regressions by comparing current vs baseline"""
          current_df = pd.read_csv(current_file)
          baseline_df = pd.read_csv(baseline_file)

          # Compare key metrics
          current_sum = current_df['value'].sum()
          baseline_sum = baseline_df['value'].sum()

          diff_pct = abs(current_sum - baseline_sum) / baseline_sum
          assert diff_pct <= tolerance, f"Regression detected: {diff_pct:.2%} change"
=======
# CSV File Validation
```python
def validate_csv_output(file_path, baseline_path=None):
    """Validate CSV algorithm output file"""
    # Schema validation
    df = pd.read_csv(file_path)
    expected_columns = ['column1', 'column2', 'column3']  # Define expected schema
    assert list(df.columns) == expected_columns, f"Column mismatch in {file_path}"
    
    # Data quality checks
    assert not df.isnull().any().any(), f"Null values found in {file_path}"
    assert len(df) > 0, f"Empty file: {file_path}"
    
    # Regression comparison
    if baseline_path:
        baseline_df = pd.read_csv(baseline_path)
        assert df.shape == baseline_df.shape, f"Shape mismatch: {file_path}"
        # Add more regression checks as needed
```

# JSON File Validation
```python
def validate_json_output(file_path, schema_path=None):
    """Validate JSON algorithm output file"""
    import json
    from jsonschema import validate
    
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    # Schema validation
    if schema_path:
        with open(schema_path, 'r') as f:
            schema = json.load(f)
        validate(instance=data, schema=schema)
    
    # Data quality checks
    assert isinstance(data, dict), f"JSON must be object: {file_path}"
    assert len(data) > 0, f"Empty JSON object: {file_path}"
```

# Performance Validation
```python
def validate_performance(file_path, max_size_mb=100, max_rows=1000000):
    """Validate file performance characteristics"""
    import os
    
    file_size = os.path.getsize(file_path) / (1024 * 1024)  # MB
    assert file_size <= max_size_mb, f"File too large: {file_size:.2f}MB > {max_size_mb}MB"
    
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
        assert len(df) <= max_rows, f"Too many rows: {len(df)} > {max_rows}"
```

# Regression Detection
```python
def detect_regression(current_file, baseline_file, tolerance=0.01):
    """Detect regressions by comparing current vs baseline"""
    current_df = pd.read_csv(current_file)
    baseline_df = pd.read_csv(baseline_file)
    
    # Compare key metrics
    current_sum = current_df['value'].sum()
    baseline_sum = baseline_df['value'].sum()
    
    diff_pct = abs(current_sum - baseline_sum) / baseline_sum
    assert diff_pct <= tolerance, f"Regression detected: {diff_pct:.2%} change"
```
>>>>>>> 1876d91 (🔧 NEW FILES:):expansion-packs/bmad-regression-testing/templates/test-generation-templates.md
