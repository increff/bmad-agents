# Notion API Integration Guide

## Overview

This guide provides comprehensive information for integrating with the Notion API, including authentication, endpoints, data structures, and best practices.

## Authentication

### Integration Token

Notion uses integration tokens for API authentication.

**Format:**
```
secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Give it a name and select workspace
4. Copy the "Internal Integration Token"
5. Add to `.env` as `NOTION_API_KEY`

### Granting Access

Integrations must be explicitly granted access to databases/pages:

1. Open database in Notion
2. Click ••• menu (top right)
3. Click "Add connections"
4. Select your integration

## API Endpoints

### Base URL
```
https://api.notion.com/v1
```

### Required Headers
```
Authorization: Bearer {NOTION_API_KEY}
Notion-Version: 2022-06-28
Content-Type: application/json
```

### Key Endpoints

#### 1. Retrieve Database
```
GET /v1/databases/{database_id}
```

**Response:** Database object with schema

#### 2. Query Database
```
POST /v1/databases/{database_id}/query
```

**Body:**
```json
{
  "filter": {
    "property": "No ID",
    "title": {
      "equals": "REQ-994"
    }
  },
  "page_size": 100
}
```

#### 3. Retrieve Page
```
GET /v1/pages/{page_id}
```

**Response:** Page object with properties

#### 4. Retrieve Page Content (Blocks)
```
GET /v1/blocks/{block_id}/children
```

**Response:** List of child blocks

#### 5. Append Blocks to Page
```
PATCH /v1/blocks/{block_id}/children
```

**Body:**
```json
{
  "children": [
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "Implementation Complete"
            }
          }
        ]
      }
    }
  ]
}
```

#### 6. Update Page Properties
```
PATCH /v1/pages/{page_id}
```

**Body:**
```json
{
  "properties": {
    "Status": {
      "select": {
        "name": "Implemented"
      }
    }
  }
}
```

## Data Structures

### Property Types

#### Title
```json
{
  "title": [
    {
      "type": "text",
      "text": {
        "content": "REQ-994"
      }
    }
  ]
}
```

#### Select
```json
{
  "select": {
    "id": "...",
    "name": "active",
    "color": "blue"
  }
}
```

#### Multi-Select
```json
{
  "multi_select": [
    {
      "id": "...",
      "name": "Feature 1",
      "color": "blue"
    },
    {
      "id": "...",
      "name": "Feature 2",
      "color": "green"
    }
  ]
}
```

#### Date
```json
{
  "date": {
    "start": "2025-10-14T10:30:00Z",
    "end": null,
    "time_zone": null
  }
}
```

#### People
```json
{
  "people": [
    {
      "object": "user",
      "id": "...",
      "name": "John Doe",
      "avatar_url": "...",
      "type": "person",
      "person": {
        "email": "john@example.com"
      }
    }
  ]
}
```

#### Relation
```json
{
  "relation": [
    {
      "id": "page-id-1"
    },
    {
      "id": "page-id-2"
    }
  ]
}
```

#### Rich Text
```json
{
  "rich_text": [
    {
      "type": "text",
      "text": {
        "content": "This is some text",
        "link": null
      },
      "annotations": {
        "bold": false,
        "italic": false,
        "strikethrough": false,
        "underline": false,
        "code": false,
        "color": "default"
      }
    }
  ]
}
```

### Block Types

#### Heading 1
```json
{
  "type": "heading_1",
  "heading_1": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Main Title"
        }
      }
    ]
  }
}
```

#### Heading 2
```json
{
  "type": "heading_2",
  "heading_2": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Section Title"
        }
      }
    ]
  }
}
```

#### Paragraph
```json
{
  "type": "paragraph",
  "paragraph": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "This is a paragraph of text."
        }
      }
    ]
  }
}
```

#### Bulleted List
```json
{
  "type": "bulleted_list_item",
  "bulleted_list_item": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "List item"
        }
      }
    ]
  }
}
```

#### Numbered List
```json
{
  "type": "numbered_list_item",
  "numbered_list_item": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Numbered item"
        }
      }
    ]
  }
}
```

#### To-Do
```json
{
  "type": "to_do",
  "to_do": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Task item"
        }
      }
    ],
    "checked": false
  }
}
```

#### Toggle
```json
{
  "type": "toggle",
  "toggle": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Toggle title"
        }
      }
    ],
    "children": [
      {
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Hidden content"
              }
            }
          ]
        }
      }
    ]
  }
}
```

#### Code Block
```json
{
  "type": "code",
  "code": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "const x = 10;"
        }
      }
    ],
    "language": "javascript"
  }
}
```

## Rate Limits

Notion API enforces rate limits:

- **Rate**: 3 requests per second
- **Burst**: Up to 5 requests in quick succession
- **Response**: 429 Too Many Requests when exceeded

**Best Practices:**
1. Add 350ms delay between requests
2. Implement exponential backoff on 429 errors
3. Batch operations when possible
4. Cache frequently accessed data

## Error Handling

### Common Errors

#### 400 Bad Request
- Invalid request body
- Missing required fields
- Invalid property types

**Action:** Validate request structure

#### 401 Unauthorized
- Invalid API key
- Expired token

**Action:** Verify API key in .env

#### 403 Forbidden
- Integration doesn't have access
- Insufficient permissions

**Action:** Share database with integration

#### 404 Not Found
- Page/database doesn't exist
- Wrong ID format

**Action:** Verify IDs are correct

#### 409 Conflict
- Concurrent modification
- Database locked

**Action:** Retry with backoff

#### 429 Too Many Requests
- Rate limit exceeded

**Action:** Implement rate limiting

#### 500 Internal Server Error
- Notion API issue

**Action:** Retry with backoff

### Error Response Format
```json
{
  "object": "error",
  "status": 400,
  "code": "validation_error",
  "message": "body failed validation: ..."
}
```

## Pagination

Large results are paginated:

**Request:**
```json
{
  "page_size": 100,
  "start_cursor": "abc123"
}
```

**Response:**
```json
{
  "object": "list",
  "results": [...],
  "next_cursor": "def456",
  "has_more": true
}
```

**Implementation:**
```javascript
let allResults = [];
let cursor = undefined;

do {
  const response = await queryDatabase({
    page_size: 100,
    start_cursor: cursor
  });
  
  allResults = allResults.concat(response.results);
  cursor = response.next_cursor;
} while (response.has_more);
```

## Filters

Query databases with filters:

### Equals
```json
{
  "property": "Status",
  "select": {
    "equals": "active"
  }
}
```

### Contains
```json
{
  "property": "Title",
  "title": {
    "contains": "REQ"
  }
}
```

### Date Filters
```json
{
  "property": "Created",
  "date": {
    "after": "2025-10-01"
  }
}
```

### Compound Filters
```json
{
  "and": [
    {
      "property": "Status",
      "select": {
        "equals": "active"
      }
    },
    {
      "property": "Priority",
      "select": {
        "equals": "0 - Critical"
      }
    }
  ]
}
```

## Sorts

Sort query results:

```json
{
  "sorts": [
    {
      "property": "Created",
      "direction": "descending"
    },
    {
      "property": "Priority",
      "direction": "ascending"
    }
  ]
}
```

## Best Practices

### 1. Authentication
- Store API keys in environment variables
- Never commit API keys to version control
- Use separate integrations for dev/prod

### 2. Rate Limiting
- Implement request throttling
- Use exponential backoff on 429 errors
- Cache data when possible

### 3. Error Handling
- Catch and handle all API errors
- Provide user-friendly error messages
- Log errors for debugging

### 4. Data Validation
- Validate all inputs before API calls
- Check property types match expectations
- Handle missing/null values gracefully

### 5. Performance
- Batch operations when possible
- Use pagination for large datasets
- Minimize redundant API calls

### 6. Security
- Validate all user inputs
- Use HTTPS for all requests
- Implement proper access controls

## Limits

### API Limits
- **Request rate**: 3 requests/second
- **Page size**: 100 items max per query
- **File uploads**: 5MB max per file
- **Block children**: 100 blocks per append

### Content Limits
- **Rich text**: 2000 characters per text object
- **Title**: 2000 characters
- **Page content**: No hard limit, but performance degrades
- **Database rows**: No hard limit

## Testing

### Test Checklist
- ✅ Authentication with valid token
- ✅ Authentication with invalid token (401)
- ✅ Database query with valid ID
- ✅ Database query with invalid ID (404)
- ✅ Page retrieval with valid ID
- ✅ Page retrieval with invalid ID (404)
- ✅ Block append with valid data
- ✅ Block append with invalid data (400)
- ✅ Property update with valid data
- ✅ Rate limit handling (429)

### Test Environment
- Use separate test workspace
- Create test databases with sample data
- Use test integration tokens
- Mock API responses for unit tests

## Resources

- **Official Documentation**: https://developers.notion.com
- **API Reference**: https://developers.notion.com/reference
- **Examples**: https://github.com/makenotion/notion-sdk-js
- **Community**: https://community.notion.so

