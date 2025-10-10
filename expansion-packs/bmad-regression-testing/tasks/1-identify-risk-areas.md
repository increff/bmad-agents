---
id: identify-risk-areas
name: Identify High-Risk Areas
description: Systematically identifies components and features that pose the highest risk of failure.
---

# Task: Identify High-Risk Areas

## Objective
To systematically identify components and features across the `irisx-algo`, `irisx-config`, and `ms-loadapis` repositories that pose the highest risk if they fail.

## Actions
1.  **Analyze Codebase Structure**: Scan the directory structure of each repository to identify critical paths and core components (e.g., modules, helpers, APIs, migration scripts).
2.  **Review Recent Changes**: Use `git log` to review recent commits (e.g., within the last week) to identify areas of active development, which may have a higher likelihood of introducing regressions.
3.  **Identify Dependencies**: Analyze dependencies and integration points both within and between repositories.
4.  **Map Business-Critical Functionality**: Correlate technical components with business-critical features.
5.  **Review Historical Data**: Analyze error logs and historical failure patterns to find recurring issues.

## Implementation Details
-   **`irisx-algo`**: Focus on core algorithmic modules (`distribution`, `otb`, `reordering`), Spring Boot configuration, and database integration points.
-   **`irisx-config`**: Pay close attention to database migration scripts, export/sync queries, and core module configurations.
-   **`ms-loadapis`**: Prioritize Azure authentication, core API integration logic, and test orchestration scripts.
-   The orchestrator will use `find` and `git log` commands to gather initial data and delegate deeper analysis to the respective expert agents.
