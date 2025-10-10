# Clear Feedback Data Task

## Task Overview
Clear old or unnecessary feedback data with appropriate safeguards and confirmations.

## Prerequisites
- User has appropriate permissions
- Data backup is available
- Clear criteria for data removal

## Task Steps

### Step 1: Data Assessment
**auto: true**
```python
# Assess current data
data_assessment = {
    "total_feedback_entries": len(feedback_data),
    "total_learning_entries": len(learning_data),
    "oldest_entry": min(entry["timestamp"] for entry in feedback_data),
    "newest_entry": max(entry["timestamp"] for entry in feedback_data),
    "data_size": calculate_data_size()
}
```

### Step 2: Clear Criteria Selection
**elicit: true**
```
What criteria would you like to use for clearing data?

1. Clear all data (WARNING: This will delete everything)
2. Clear data older than specified date
3. Clear data by status (processed, archived, etc.)
4. Clear data by agent
5. Clear data by repository
6. Clear data by issue type
7. Custom criteria
```

### Step 3: Safety Confirmation
**elicit: true**
```
⚠️ WARNING: This action will permanently delete data.

Please confirm:
1. You have backed up important data
2. You understand this action cannot be undone
3. You have appropriate permissions
4. You want to proceed with data clearing

Type 'CONFIRM' to proceed or 'CANCEL' to abort.
```

### Step 4: Data Backup
**auto: true**
```python
# Create backup before clearing
if user_confirmed:
    backup_filename = create_backup_filename()
    backup_data = {
        "feedback_data": feedback_data,
        "learning_data": learning_data,
        "patterns_data": patterns_data,
        "backup_timestamp": get_current_timestamp()
    }
    create_backup(backup_data, backup_filename)
```

### Step 5: Data Filtering
**auto: true**
```python
# Filter data to be cleared
if clear_all:
    data_to_clear = all_data
elif clear_by_date:
    data_to_clear = filter_by_date_range(all_data, before_date)
elif clear_by_status:
    data_to_clear = filter_by_status(all_data, status_to_clear)
elif clear_by_agent:
    data_to_clear = filter_by_agent(all_data, agent_to_clear)
elif clear_by_repository:
    data_to_clear = filter_by_repository(all_data, repository_to_clear)
elif clear_by_issue_type:
    data_to_clear = filter_by_issue_type(all_data, issue_type_to_clear)
```

### Step 6: Final Confirmation
**elicit: true**
```
Final confirmation required:

Data to be cleared:
- Records: {len(data_to_clear)}
- Date range: {date_range}
- Criteria: {clear_criteria}

This action cannot be undone.

Type 'DELETE' to proceed or 'CANCEL' to abort.
```

### Step 7: Data Clearing
**auto: true**
```python
# Clear data if confirmed
if user_confirmed_delete:
    clear_feedback_data(data_to_clear)
    update_data_files()
    log_clearing_action(data_to_clear, user, timestamp)
```

### Step 8: Verification
**auto: true**
```python
# Verify clearing was successful
verification_result = verify_data_clearing()
if verification_result["success"]:
    remaining_data = load_remaining_data()
    clearing_summary = {
        "records_cleared": len(data_to_clear),
        "records_remaining": len(remaining_data),
        "clearing_timestamp": get_current_timestamp(),
        "backup_created": backup_filename
    }
else:
    handle_clearing_error(verification_result["error"])
```

## Output
- Data cleared according to criteria
- Backup created
- Clearing summary
- Verification results

## Success Criteria
- [ ] Data assessment completed
- [ ] Clear criteria selected
- [ ] Safety confirmations received
- [ ] Backup created
- [ ] Data cleared successfully
- [ ] Verification completed

## Notes
- Always create backup before clearing
- Require multiple confirmations for safety
- Log all clearing actions
- Verify clearing was successful
- Provide clear feedback on results

