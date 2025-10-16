# VIRAT System Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VIRAT - Multi-Agent Orchestrator                      │
│                    (Virtual Intelligent Repository Analysis                  │
│                       & Transformation System)                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
            ┌───────▼────────┐ ┌──────▼──────┐ ┌──────▼──────┐
            │   Algorithm    │ │   LoadAPI   │ │    Config   │
            │   Repository   │ │  Repository │ │  Repository │
            │  (Java/Spring) │ │  (Python)   │ │  (SQL/JSON) │
            └────────────────┘ └─────────────┘ └─────────────┘
```

---

## Detailed Component Architecture

### Layer 1: User Interface & Entry Points

```
┌─────────────────────────────────────────────────────────────┐
│  User Interface Layer                                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  *implement REQ-1234.md  →  VIRAT Orchestrator              │
│  *deploy REQ-1234.md     →  VIRAT → Deployment Agent        │
│  *research "pattern"     →  VIRAT → Research Workflow       │
│  *validate-rules         →  Validation Script               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Layer 2: VIRAT Orchestrator (Core)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  VIRAT Orchestrator (agents/virat.md)                                    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Workflow Engine                                                │     │
│  │  ├─ Phase 0: Repository Preparation                             │     │
│  │  ├─ Phase 1: Intelligent Analysis                               │     │
│  │  ├─ Phase 2: Implementation Planning                            │     │
│  │  ├─ Phase 3: Development Execution                              │     │
│  │  ├─ Phase 4: Quality Assurance                                  │     │
│  │  ├─ Phase 5: QA Testing & Documentation                         │     │
│  │  └─ Phase 6: Learning & Feedback                                │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Multi-Environment Support                                      │     │
│  │  ├─ Environment Detection (prod/reliance/phoenix)               │     │
│  │  ├─ Base Branch Selection                                       │     │
│  │  └─ Sequential Environment Processing                           │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Rule Validation Engine                                         │     │
│  │  ├─ Load core-implementation-rules.yaml                         │     │
│  │  ├─ Reference rules by semantic names                           │     │
│  │  └─ Validate at every stage                                     │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Layer 3: Agent Delegation Layer

```
┌───────────────────────────────────────────────────────────────────────────┐
│  Agent Delegation Layer                                                    │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────┐        │
│  │  Generic Personas (from bmad-core)                            │        │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │        │
│  │  │  Analyst    │  │     PM      │  │    Dev      │          │        │
│  │  │  (Analysis) │  │  (Planning) │  │(Implement)  │          │        │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │        │
│  │  ┌─────────────┐  ┌─────────────┐                           │        │
│  │  │     QA      │  │  Architect  │                           │        │
│  │  │  (Testing)  │  │  (Design)   │                           │        │
│  │  └─────────────┘  └─────────────┘                           │        │
│  └──────────────────────────────────────────────────────────────┘        │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────┐        │
│  │  Domain Expert Agents (VIRAT-specific)                        │        │
│  │  ┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  │  Algorithm        │  │    LoadAPI       │  │     Config       │  │
│  │  │  Pattern Expert   │  │  Pattern Expert  │  │  Pattern Expert  │  │
│  │  │  (irisx-algo)     │  │(ms-loadapis-ril) │  │  (irisx-config)  │  │
│  │  └───────────────────┘  └──────────────────┘  └──────────────────┘  │
│  └──────────────────────────────────────────────────────────────┘        │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────┐        │
│  │  Specialized Agents (VIRAT-specific)                          │        │
│  │  ┌───────────────────┐  ┌──────────────────┐                 │        │
│  │  │  Deployment       │  │   Feedback       │                 │        │
│  │  │  Agent            │  │   Agent          │                 │        │
│  │  │  (Azure/DB)       │  │  (Learning)      │                 │        │
│  │  └───────────────────┘  └──────────────────┘                 │        │
│  └──────────────────────────────────────────────────────────────┘        │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### Layer 4: Data & Knowledge Layer

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Data & Knowledge Layer                                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Core Implementation Rules (data/)                           │        │
│  │  ┌────────────────────────────────────────────────────────┐ │        │
│  │  │  core-implementation-rules.yaml (45 rules)             │ │        │
│  │  │  ├─ rule_map (semantic name → number mapping)          │ │        │
│  │  │  ├─ Core Rules (1-10)                                  │ │        │
│  │  │  ├─ Repository Coordination (11-15)                    │ │        │
│  │  │  ├─ Pattern Management (16-20)                         │ │        │
│  │  │  ├─ Error & Testing (21-22)                            │ │        │
│  │  │  ├─ Documentation (23)                                 │ │        │
│  │  │  ├─ Development Flow (24)                              │ │        │
│  │  │  ├─ Class Management (25-34)                           │ │        │
│  │  │  ├─ Advanced Patterns (35-43)                          │ │        │
│  │  │  └─ Critical Patterns (44-45)                          │ │        │
│  │  └────────────────────────────────────────────────────────┘ │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Repository Analysis & Patterns (data/)                      │        │
│  │  ├─ algorithm-repository-analysis.md                         │        │
│  │  ├─ loadapi-pattern-analysis.md                              │        │
│  │  ├─ config-repository-analysis.md                            │        │
│  │  ├─ requirement-types-analysis.md                            │        │
│  │  ├─ dependency-patterns.md                                   │        │
│  │  └─ pattern-recognition-patterns.md                          │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Learning Database (data/)                                   │        │
│  │  └─ example.json (Collected learnings from implementations)  │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Layer 5: Utilities & Validation

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Utilities & Validation Layer                                             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Shared Validation (utils/)                                  │        │
│  │  ├─ validation-library.yaml                                  │        │
│  │  │  ├─ Validation Patterns                                   │        │
│  │  │  ├─ Validation Workflows                                  │        │
│  │  │  └─ Validation Helpers                                    │        │
│  │  │                                                            │        │
│  │  └─ error-messages.yaml                                      │        │
│  │     ├─ Critical Errors (VIR-001-003)                         │        │
│  │     ├─ Errors (VIR-101-104)                                  │        │
│  │     ├─ Warnings (VIR-201-203)                                │        │
│  │     └─ Info Messages (VIR-301-303)                           │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Automation Tools (tools/)                                   │        │
│  │  ├─ validate-rules.py (Automated validation script)          │        │
│  │  └─ granularity-mismatch-detector.py                         │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Layer 6: Target Repositories

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Target Repositories (Managed by VIRAT)                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  irisx-algo (Algorithm Repository)                              │     │
│  │  ├─ Language: Java/Spring Boot                                  │     │
│  │  ├─ Files: 1,174 Java files                                     │     │
│  │  ├─ Structure: 30+ modules, 25+ group modules                   │     │
│  │  ├─ Patterns: Row/File classes, Args, Validation modules        │     │
│  │  └─ Base Branches:                                              │     │
│  │     ├─ prod: caas-release                                       │     │
│  │     ├─ reliance: master-ril                                     │     │
│  │     └─ phoenix: master-adidas-reliance-prod                     │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  ms-loadapis-ril-final (LoadAPI Repository)                     │     │
│  │  ├─ Language: Python                                            │     │
│  │  ├─ Files: 159 Python files                                     │     │
│  │  ├─ Structure: 98+ LoadAPIs, denormalization logic              │     │
│  │  ├─ Patterns: LoadAPI classes, ObjectMaps, validation           │     │
│  │  └─ Base Branches:                                              │     │
│  │     ├─ prod: release_optimised                                  │     │
│  │     ├─ reliance: caas-ril-uploads                               │     │
│  │     └─ phoenix: caas-phoenix-uploads                            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  irisx-config (Configuration Repository)                        │     │
│  │  ├─ Language: SQL/JSON/TSV                                      │     │
│  │  ├─ Files: 200+ SQL views, 100+ TSV templates                   │     │
│  │  ├─ Structure: View definitions, export queries, templates      │     │
│  │  ├─ Patterns: SQL views, TSV templates, JSON configs            │     │
│  │  └─ Base Branches:                                              │     │
│  │     ├─ prod: caas-staging_fix                                   │     │
│  │     ├─ reliance: master-ril                                     │     │
│  │     └─ phoenix: master-adidas-ril                               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Complete *implement Command

```
┌──────────────┐
│ User invokes │
│ *implement   │
│ REQ-1234.md  │
└───────┬──────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│ VIRAT: Load requirement document                │
│  ├─ Parse metadata (REQ-ID, ENV, Title)         │
│  ├─ Detect environment(s): prod                 │
│  └─ Load core-implementation-rules.yaml         │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 0: Repository Preparation                 │
│  ├─ Switch Algorithm → caas-release             │
│  ├─ Switch LoadAPI → release_optimised          │
│  ├─ Switch Config → caas-staging_fix            │
│  └─ Verify clean working directories            │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 1: Intelligent Analysis                   │
│  │                                               │
│  ├─→ Analyst Persona: Classify requirement      │
│  │   └─← Classification: "cross-repository"     │
│  │                                               │
│  ├─→ Analyst Persona: Crawl repositories        │
│  │   └─← Patterns discovered                    │
│  │                                               │
│  ├─→ Algorithm Expert: Analyze patterns         │
│  ├─→ LoadAPI Expert: Analyze patterns           │
│  ├─→ Config Expert: Analyze patterns            │
│  │   └─← All patterns consolidated              │
│  │                                               │
│  └─→ Validate against rules:                    │
│      {new_input_integration,                    │
│       data_consistency_structure,               │
│       cross_repo_type_safety}                   │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 2: Implementation Planning                │
│  │                                               │
│  ├─→ PM Persona: Create implementation plan     │
│  │   ├─ List files to modify                    │
│  │   ├─ Plan execution order                    │
│  │   └─ Identify risks                          │
│  │   └─← Detailed implementation plan           │
│  │                                               │
│  ├─→ PM Persona: Validate plan                  │
│  │   └─← Validated plan                         │
│  │                                               │
│  └─→ Create feature branches:                   │
│      ├─ algo: feature/REQ-1234-description      │
│      ├─ loadapi: feature/REQ-1234-description   │
│      └─ config: feature/REQ-1234-description    │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 3: Development Execution                  │
│  │                                               │
│  ├─→ Dev Persona: Implement in Algorithm        │
│  │   ├─ Create Row/File classes                 │
│  │   ├─ Update Args                             │
│  │   ├─ Register modules                        │
│  │   └─ Validate: {mandatory_file_class_sync}   │
│  │                                               │
│  ├─→ Dev Persona: Implement in LoadAPI          │
│  │   ├─ Create LoadAPI class                    │
│  │   ├─ Add denormalization logic               │
│  │   ├─ Register in __init__.py                 │
│  │   └─ Validate: {data_consistency_structure}  │
│  │                                               │
│  ├─→ Dev Persona: Implement in Config           │
│  │   ├─ Create SQL view                         │
│  │   ├─ Create TSV template                     │
│  │   ├─ Update post_deployment.sql              │
│  │   └─ Validate: {post_deployment_param_reg}   │
│  │                                               │
│  └─→ Commit changes to feature branches         │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 4: Quality Assurance                      │
│  │                                               │
│  ├─→ Run validate-rules.py (workflow: pre_dep)  │
│  │   ├─ Check: row_file_sync ✓                  │
│  │   ├─ Check: header_consistency ✓             │
│  │   ├─ Check: args_parameter_registration ✓    │
│  │   ├─ Check: all_loadapis_check ⚠             │
│  │   └─ Check: compilation ✓                    │
│  │   └─← Validation summary                     │
│  │                                               │
│  └─→ Git push feature branches                  │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 5: QA Testing & Documentation             │
│  │                                               │
│  ├─→ QA Persona: Create unit tests              │
│  │   └─← Test suite + coverage report           │
│  │                                               │
│  ├─→ Generate feature documentation             │
│  │   └─← User-facing documentation              │
│  │                                               │
│  └─→ Generate business release notes            │
│      └─← Release notes with use cases           │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Phase 6: Learning & Feedback                    │
│  │                                               │
│  └─→ Feedback Agent: Collect learnings          │
│      ├─ Analyze implementation artifacts        │
│      ├─ Gather developer feedback               │
│      └─ Store in data/example.json              │
│      └─← Learnings stored for future use        │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Implementation Complete │
│ ✓ All 3 repos updated   │
│ ✓ All validations pass  │
│ ✓ Documentation ready   │
│ ✓ Learnings captured    │
└─────────────────────────┘
```

---

## Rule Validation Flow

```
┌──────────────────────────────────────────────────────────┐
│ Rule Validation Architecture                              │
└──────────────────────────────────────────────────────────┘

core-implementation-rules.yaml
  ├─ rule_map (semantic names)
  └─ Rule definitions (45 rules)
           │
           ▼
┌──────────────────────────────┐
│ Referenced by all agents:    │
│ ├─ VIRAT orchestrator        │
│ ├─ Expert agents             │
│ ├─ Personas                  │
│ └─ Validation scripts        │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ validation-library.yaml      │
│ ├─ Validation patterns       │
│ ├─ Validation workflows      │
│ └─ References rules by name  │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ validate-rules.py (tools/)   │
│ ├─ Executes validation       │
│ ├─ Checks rule compliance    │
│ └─ Returns results           │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ error-messages.yaml          │
│ ├─ Maps violations to errors │
│ ├─ Provides remediation      │
│ └─ References rules by name  │
└──────────────────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ User sees formatted error:   │
│ "Row class modified but      │
│  File class not updated"     │
│ Rule: {mandatory_file_class  │
│        _synchronization}     │
│ Remediation: [steps...]      │
└──────────────────────────────┘
```

---

## Configuration & Environment Flow

```
┌──────────────────────┐
│ config.yaml          │
│ ├─ Repository paths  │
│ ├─ Environments:     │
│ │  ├─ prod           │
│ │  ├─ reliance       │
│ │  └─ phoenix        │
│ └─ Base branches     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│ Requirement Document         │
│ ENV: prod, reliance          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ VIRAT detects:               │
│ ├─ Environment: prod         │
│ ├─ Base branches from config │
│ └─ Process sequentially      │
└──────────┬───────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ Iteration 1: prod environment      │
│ ├─ Switch to prod base branches    │
│ ├─ Execute Phases 0-5               │
│ └─ Push feature branches            │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│ Iteration 2: reliance environment  │
│ ├─ Switch to reliance base branches│
│ ├─ Execute Phases 0-5               │
│ └─ Push feature branches            │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│ Phase 6: Feedback (once for all)  │
│ └─ Collect learnings               │
└────────────────────────────────────┘
```

---

## File Organization Architecture

```
bmad-virtual-intelligent-repository-analysis-transformation/
│
├─ agents/                      # VIRAT-specific agents
│  ├─ virat.md                  # Main orchestrator
│  ├─ algorithm-pattern-expert.md
│  ├─ loadapi-pattern-expert.md
│  ├─ config-pattern-expert.md
│  ├─ deployment-agent.md
│  └─ feedback-agent.md
│
├─ data/                        # Knowledge base
│  ├─ core-implementation-rules.yaml  # 45 rules with rule_map
│  ├─ *-analysis.md             # Repository analyses
│  ├─ *-patterns.md             # Pattern documentation
│  └─ example.json              # Learning database
│
├─ utils/                       # NEW: Shared utilities
│  ├─ validation-library.yaml   # Validation patterns
│  └─ error-messages.yaml       # Error message templates
│
├─ tools/                       # Automation scripts
│  ├─ validate-rules.py         # NEW: Automated validation
│  └─ granularity-mismatch-detector.py
│
├─ docs/                        # Documentation
│  ├─ guides/
│  │  ├─ complete-development-flow.md
│  │  ├─ multi-environment-support.md
│  │  ├─ adding-new-rules-guide.md        # NEW
│  │  └─ agent-interaction-patterns.md    # NEW
│  ├─ migrations/
│  │  ├─ semantic-rule-names-migration.md
│  │  └─ before-after-comparison.md
│  └─ history/                  # Historical documentation
│
├─ tasks/                       # Executable workflows
├─ templates/                   # Document templates
├─ checklists/                  # Validation checklists
└─ workflows/                   # Workflow definitions
```

---

## Scalability & Extensibility

### Adding New Agents

```
1. Create agent file in agents/
2. Define agent capabilities
3. Register in VIRAT dependencies
4. Reference rules by semantic names
5. Implement communication protocol
```

### Adding New Rules

```
1. Add semantic name to rule_map
2. Define rule in core-implementation-rules.yaml
3. Add validation pattern (optional)
4. Add error messages (optional)
5. Update validation script (if automated)
```

### Adding New Repositories

```
1. Add repository to config.yaml
2. Create new expert agent
3. Document repository patterns
4. Define base branches per environment
5. Extend VIRAT workflow phases
```

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Orchestration | BMAD Framework (Markdown-based agents) |
| Agent Definition | YAML + Markdown |
| Validation | Python 3.8+ |
| Configuration | YAML |
| Target Repos | Java/Spring Boot, Python, SQL/JSON |
| Version Control | Git |
| Documentation | Markdown |

---

## Related Documentation

- [Agent Interaction Patterns](guides/agent-interaction-patterns.md)
- [Adding New Rules Guide](guides/adding-new-rules-guide.md)
- [Complete Development Flow](guides/complete-development-flow.md)
- [Multi-Environment Support](guides/multi-environment-support.md)

---

## Diagram Legend

```
┌──────┐  Component/Container
│      │  
└──────┘

───▶     Data flow / invocation

├─       Hierarchical relationship

┌────┐   
│    │◄─  Bidirectional communication
└────┘
```

---

**Last Updated:** October 16, 2025  
**Version:** 2.0 (Post-reorganization & modularity improvements)

