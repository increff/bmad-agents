# Changelog

All notable changes to the BMAD Notion Integration will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-14

### Added

#### Core Features
- **`*notion_implement`** command for extracting requirements from Notion and executing complete implementation workflow
- **`*notion_push`** command for pushing generated documentation back to Notion tickets
- **`*notion_test`** command for testing Notion API connectivity and credentials
- **`*notion_fetch`** command for previewing requirement extraction without implementing
- **`*notion_status`** command for viewing current Notion integration status

#### Integration Capabilities
- Seamless integration with VIRAT's `*implement` workflow
- Automatic bidirectional sync between Notion and BMAD
- Support for both Notion page URLs and requirement IDs as input
- Comprehensive field mapping from Notion properties to requirement fields
- Intelligent extraction of nested content blocks and toggle sections

#### Notion API Support
- Complete Notion API v2022-06-28 integration
- Authentication using integration tokens
- Database queries with filters and sorting
- Page property extraction and updates
- Block retrieval and appending
- Rate limiting and retry logic with exponential backoff

#### Field Mappings
- Requirement ID (No ID)
- Title (Name)
- Stage, Phase, Status
- Priority, Ranking, Effort
- Lead, Approver (Person fields)
- Development ETA, Updated ETA (Date fields)
- Project, Sprint (Relation fields)
- Request Description (Rich text/Multi-select)
- Development sections (Toggle blocks)

#### Documentation Features
- Automatic identification of generated documentation files
- Markdown to Notion block conversion
- Support for headings, paragraphs, lists, code blocks, checkboxes
- Organized upload with category toggles
- Implementation summary generation
- Property updates (status, timestamps, tags)

#### Templates
- Notion requirement document template
- Notion documentation block template
- Field mapping templates
- Summary block templates

#### Documentation
- Comprehensive README with full feature reference
- Quickstart guide for 5-minute setup
- Notion API integration guide
- Field mapping reference
- Extraction and push checklists
- .env.example for easy configuration

#### Error Handling
- Graceful handling of API errors (401, 403, 404, 429, 500)
- Missing field detection and warnings
- Invalid format handling
- Rate limit management
- Retry mechanisms with backoff
- User-friendly error messages

#### Tracking and Monitoring
- `.notion-tracking.json` file for page ID tracking
- Extraction timestamps and status tracking
- Implementation and push timestamps
- Files pushed tracking
- Operation logging

### Configuration
- `config.yaml` with Notion API settings
- Customizable field mappings
- Documentation file patterns
- Upload strategies
- Rate limiting settings

### Tasks
- `notion-fetch-requirements`: Extract requirements from Notion
- `notion-push-documentation`: Push documentation back to Notion
- `integrate-with-virat`: Pass requirements to VIRAT workflow
- `notion-test-connection`: Test API connectivity

### Checklists
- Notion extraction checklist (pre-extraction, extraction, post-extraction validation)
- Notion push checklist (pre-push, upload, post-push verification)

### Data/Knowledge Base
- Notion API guide with complete endpoint reference
- Field mapping reference with examples
- Property type extraction guide
- Block type conversion reference
- Best practices and troubleshooting

### Agent
- Notion Integrator agent with complete persona definition
- Command structure for all Notion operations
- Integration strategies with VIRAT
- Error handling and recovery procedures
- User feedback mechanisms

## [Unreleased]

### Planned Features
- Bi-directional sync for status updates
- Bulk requirement processing
- Advanced filtering and querying
- Custom webhook support
- Multi-workspace support

## [1.0.2] - 2025-10-14

### Changed - Simplified Extraction and Push
- **Extraction**: Now extracts ONLY "Request Description" field (no other metadata)
- **Push Target**: Documentation now pushed INSIDE "III. DEVELOPMENT" section only
- **No Property Updates**: Does not modify any Notion page properties (Status, dates, tags, etc.)
- Simplified requirement template to include only essential fields
- Updated all task files to reflect simplified workflow

### Added
- **`*notion-help`** command for displaying comprehensive help for all Notion commands
- **`@notion`** orchestrator alias for quick activation of Notion Integrator
- Detailed command reference with examples and options
- Quick start guide in help display
- Clear documentation of what gets extracted vs. what doesn't

## [1.0.1] - 2025-10-14

### Changed
- Replaced `NOTION_WORKSPACE` environment variable with `NOTION_VIEW_ID`
- Updated configuration to use `notion_view_id` instead of workspace name
- `NOTION_VIEW_ID` is now optional and used for specifying a particular database view

### Future Enhancements
- Support for Notion formulas
- Integration with other project management tools
- Advanced field mapping with transformations
- Custom automation rules
- Team collaboration features
- Version control for Notion content

## Support

For issues, questions, or feature requests:
- Check the README.md for comprehensive documentation
- Review QUICKSTART.md for setup instructions
- Consult notion-api-guide.md for API details
- Visit https://developers.notion.com for Notion API documentation

## License

MIT License - See LICENSE file for details

