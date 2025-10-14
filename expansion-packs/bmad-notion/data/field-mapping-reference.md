# Notion Field Mapping Reference

## Overview

This document provides detailed reference for mapping Notion database properties to requirement document fields.

## Standard Field Mappings

### Core Identification Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| No ID | Title/Text | requirement_id | Unique requirement identifier (e.g., REQ-994) |
| Name | Title | title | Full requirement title |

### Status and Progress Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Stage | Select | stage | Current stage (e.g., "3. Dev In-Progress") |
| Phase | Select | phase | Current phase (e.g., "II. Development") |
| Status | Select | status | Status flag (e.g., "active", "completed") |

### Priority and Planning Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Priority (Auto-populated) | Select | priority | Priority level (e.g., "0 - Critical", "1 - High") |
| Ranking | Number | ranking | Numeric ranking/ordering |
| Effort | Select/Text | effort | Estimated effort |

### People and Ownership Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Lead | Person | lead | Person responsible for development |
| Approver | Person | approver | Person who approves/reviews |

### Date and Timeline Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Development ETA | Date | development_eta | Original estimated completion date |
| Updated Development ETA | Date | updated_development_eta | Updated/actual completion date |

### Project and Sprint Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Project | Relation | project | Related project |
| Sprint | Relation | sprint | Associated sprint (e.g., "MS_Sprint_8_Oct_2025") |

### Content Fields

| Notion Property | Type | Requirement Field | Description |
|----------------|------|-------------------|-------------|
| Request Description | Rich Text / Multi-Select | description | Main requirement description with items |
| III. DEVELOPMENT | Toggle Block | development_details | Development stages and tasks |

## Property Type Extraction

### Title Property
```json
// Notion API Response
{
  "No ID": {
    "id": "...",
    "type": "title",
    "title": [
      {
        "type": "text",
        "text": {
          "content": "REQ-994"
        }
      }
    ]
  }
}

// Extracted Value
requirement_id: "REQ-994"
```

### Select Property
```json
// Notion API Response
{
  "Status": {
    "id": "...",
    "type": "select",
    "select": {
      "id": "...",
      "name": "active",
      "color": "blue"
    }
  }
}

// Extracted Value
status: "active"
```

### Multi-Select Property
```json
// Notion API Response
{
  "Tags": {
    "id": "...",
    "type": "multi_select",
    "multi_select": [
      {
        "id": "...",
        "name": "Backend",
        "color": "blue"
      },
      {
        "id": "...",
        "name": "Critical",
        "color": "red"
      }
    ]
  }
}

// Extracted Value
tags: ["Backend", "Critical"]
```

### Date Property
```json
// Notion API Response
{
  "Development ETA": {
    "id": "...",
    "type": "date",
    "date": {
      "start": "2025-10-21",
      "end": null,
      "time_zone": null
    }
  }
}

// Extracted Value
development_eta: "2025-10-21"
```

### People Property
```json
// Notion API Response
{
  "Lead": {
    "id": "...",
    "type": "people",
    "people": [
      {
        "object": "user",
        "id": "...",
        "name": "Harshith Kollukuduru",
        "avatar_url": "...",
        "type": "person",
        "person": {
          "email": "harshith@example.com"
        }
      }
    ]
  }
}

// Extracted Value
lead: "Harshith Kollukuduru"
lead_email: "harshith@example.com"
```

### Relation Property
```json
// Notion API Response
{
  "Sprint": {
    "id": "...",
    "type": "relation",
    "relation": [
      {
        "id": "sprint-page-id"
      }
    ]
  }
}

// Need to fetch related page to get title
// Follow-up Request: GET /v1/pages/sprint-page-id

// Extracted Value
sprint: "MS_Sprint_8_Oct_2025"
sprint_id: "sprint-page-id"
```

### Rich Text Property
```json
// Notion API Response
{
  "Notes": {
    "id": "...",
    "type": "rich_text",
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "This is a note with ",
          "link": null
        },
        "annotations": {
          "bold": false,
          "italic": false
        }
      },
      {
        "type": "text",
        "text": {
          "content": "bold text",
          "link": null
        },
        "annotations": {
          "bold": true,
          "italic": false
        }
      }
    ]
  }
}

// Extracted Value
notes: "This is a note with **bold text**"
```

### Number Property
```json
// Notion API Response
{
  "Ranking": {
    "id": "...",
    "type": "number",
    "number": 1
  }
}

// Extracted Value
ranking: 1
```

## Content Block Extraction

### Request Description

**Expected Structure:**
```
Request Description
1. Multiple ROS periods & factorization
2. Closing WH stock combine in Reordering
3. MOQ bound Reorder Qty
```

**Block Structure:**
```json
[
  {
    "type": "heading_3",
    "heading_3": {
      "rich_text": [
        {
          "text": {
            "content": "Request Description"
          }
        }
      ]
    }
  },
  {
    "type": "numbered_list_item",
    "numbered_list_item": {
      "rich_text": [
        {
          "text": {
            "content": "Multiple ROS periods & factorization"
          }
        }
      ]
    }
  },
  {
    "type": "numbered_list_item",
    "numbered_list_item": {
      "rich_text": [
        {
          "text": {
            "content": "Closing WH stock combine in Reordering"
          }
        }
      ]
    }
  }
]
```

**Extracted Value:**
```markdown
## Request Description

1. Multiple ROS periods & factorization
2. Closing WH stock combine in Reordering
3. MOQ bound Reorder Qty
```

### Development Section

**Expected Structure:**
```
▼ III. DEVELOPMENT
  Pod will be responsible for development...
  
  ▼ Stage 7 - [req] Plan
    ☐ PM/EM to Review...
    📁 Plan Review
  
  ▼ Stage 8 - [req] In-Progress
    ☐ PM/EM to Review...
    🔄 In-Pogress
```

**Block Structure:**
```json
[
  {
    "type": "toggle",
    "toggle": {
      "rich_text": [
        {
          "text": {
            "content": "III. DEVELOPMENT"
          }
        }
      ],
      "children": [
        {
          "type": "paragraph",
          "paragraph": {
            "rich_text": [...]
          }
        },
        {
          "type": "toggle",
          "toggle": {
            "rich_text": [
              {
                "text": {
                  "content": "Stage 7 - [req] Plan"
                }
              }
            ],
            "children": [...]
          }
        }
      ]
    }
  }
]
```

**Extracted Value:**
```markdown
## Development Details

### III. DEVELOPMENT

Pod will be responsible for development...

### Stage 7 - [req] Plan

- [ ] PM/EM to Review...
- 📁 Plan Review

### Stage 8 - [req] In-Progress

- [ ] PM/EM to Review...
- 🔄 In-Pogress
```

## Handling Missing or Empty Fields

### Strategy

| Scenario | Action | Default Value |
|----------|--------|---------------|
| Required field missing | Prompt user | Error/abort |
| Optional field missing | Use default | "Not set" |
| Empty description | Prompt user | "Description pending" |
| Empty date | Use null | "Not scheduled" |
| Empty person | Use null | "Not assigned" |
| Empty relation | Use null | "Not linked" |

### Examples

**Missing Priority:**
```markdown
**Priority**: Not set
```

**Empty Lead:**
```markdown
**Lead**: Not assigned
```

**Missing Description:**
```markdown
## Request Description

⚠️ **Warning**: No description provided in Notion.
Please provide requirement details manually.
```

## Custom Field Mapping

Users can customize field mappings in `config.yaml`:

```yaml
field_mappings:
  # Custom property names
  requirement_id: "Ticket ID"  # Instead of "No ID"
  description: "Requirements"  # Instead of "Request Description"
  
  # Additional custom fields
  customer: "Customer Name"
  complexity: "Complexity Score"
  
  # Custom development section
  development_section: "Development Plan"
```

## Validation Rules

### Required Fields
- `requirement_id`: Must be non-empty
- `title`: Must be non-empty
- `description`: Must have at least one item

### Optional Fields
All other fields are optional and will use defaults if missing.

### Format Validation
- `requirement_id`: Must match pattern (e.g., REQ-\d+)
- `dates`: Must be valid ISO 8601 dates
- `numbers`: Must be valid numeric values
- `emails`: Must be valid email format

## Example Complete Extraction

**Notion Database Page:**
```
No ID: REQ-994
Name: Multiple ROS & Factorization Features
Stage: 3. Dev In-Progress
Phase: II. Development
Status: active
Priority: 0 - Critical
Lead: Harshith Kollukuduru
Approver: Virat
Ranking: 1
Project: Others
Sprint: MS_Sprint_8_Oct_2025

Request Description:
1. Multiple ROS periods & factorization
2. Closing WH stock combine in Reordering
3. MOQ bound Reorder Qty

[Development toggle block with stages]
```

**Extracted Requirement Document:**
```markdown
# Requirement: REQ-994 - Multiple ROS & Factorization Features

## Metadata

| Field | Value |
|-------|-------|
| Requirement ID | REQ-994 |
| Title | Multiple ROS & Factorization Features |
| Stage | 3. Dev In-Progress |
| Phase | II. Development |
| Status | active |
| Priority | 0 - Critical |
| Lead | Harshith Kollukuduru |
| Approver | Virat |
| Ranking | 1 |
| Project | Others |
| Sprint | MS_Sprint_8_Oct_2025 |

## Request Description

1. Multiple ROS periods & factorization
2. Closing WH stock combine in Reordering
3. MOQ bound Reorder Qty

## Development Details

[Extracted development section content]
```

## Troubleshooting

### Property Not Found
**Issue**: "Property 'No ID' not found in database"

**Solution:**
1. Check property name in Notion (case-sensitive)
2. Update `field_mappings` in config.yaml
3. Verify database is shared with integration

### Empty Property Value
**Issue**: Property exists but has no value

**Solution:**
1. Use default value
2. Prompt user if required field
3. Log warning for optional fields

### Wrong Property Type
**Issue**: Expected select, got rich_text

**Solution:**
1. Check database schema
2. Update field mapping
3. Implement type conversion if possible

### Relation Not Resolved
**Issue**: Relation property returns ID but not title

**Solution:**
1. Fetch related page: GET /v1/pages/{id}
2. Extract title from related page
3. Cache result to avoid repeated calls

