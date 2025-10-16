# Agent Interaction Patterns in VIRAT

## Overview

VIRAT uses a multi-agent architecture where specialized agents collaborate to accomplish complex development workflows. This document describes how agents interact, communicate, and delegate tasks.

---

## Agent Hierarchy

```
VIRAT (Orchestrator)
  ├── Generic Personas (from bmad-core)
  │   ├── Analyst
  │   ├── PM (Product Manager)
  │   ├── Dev (Developer)
  │   ├── QA (Quality Assurance)
  │   └── Architect
  │
  ├── Domain Expert Agents (VIRAT-specific)
  │   ├── Algorithm Pattern Expert
  │   ├── LoadAPI Pattern Expert
  │   └── Config Pattern Expert
  │
  └── Specialized Agents (VIRAT-specific)
      ├── Deployment Agent
      └── Feedback Agent
```

---

## Interaction Patterns

### Pattern 1: Orchestration (VIRAT → Persona)

**Use Case:** VIRAT delegates a workflow phase to a generic persona

```
┌────────┐                           ┌──────────┐
│ VIRAT  │──── "analyze requirement" │ Analyst  │
│        │◄─── analysis results      │ Persona  │
└────────┘                           └──────────┘
```

**Algorithm:**
1. VIRAT identifies workflow phase (e.g., Phase 1: Analysis)
2. Loads appropriate persona from bmad-core: `bmad-core/agents/analyst.md`
3. Provides context (requirement document, environment, rules)
4. Persona executes analysis using its methodology
5. Returns structured results to VIRAT
6. VIRAT incorporates results into workflow

**Example:**
```yaml
# virat.md Phase 1, Step 6
6. **Deep Requirement Analysis with Analyst**: 
   - Load analyst persona
   - Provide requirement document
   - Analyst classifies requirement type
   - Analyst identifies affected repositories
   - Returns classification and scope
```

**Context Passed:**
- Requirement document path
- Environment configuration
- Base branch information
- Applicable rules (by semantic name)

**Results Expected:**
- Requirement classification (config-only, loadapi-only, algorithm-only, cross-repo)
- Affected repositories list
- Complexity assessment
- Risk factors

---

### Pattern 2: Expert Delegation (VIRAT → Domain Expert)

**Use Case:** VIRAT needs specialized domain knowledge

```
┌────────┐                           ┌──────────────────────┐
│ VIRAT  │──── "analyze algorithm"   │ Algorithm Pattern    │
│        │     patterns"              │ Expert               │
│        │◄─── pattern analysis       │                      │
└────────┘                           └──────────────────────┘
```

**Algorithm:**
1. VIRAT identifies repository-specific analysis needed
2. Loads appropriate expert agent from local `agents/` folder
3. Expert agent references comprehensive analysis docs from `data/`
4. Expert provides patterns, conventions, dependencies
5. VIRAT uses expert's guidance for implementation planning

**Example:**
```yaml
# virat.md Phase 1, Step 8
8. **Selective Expert Analysis**:
   - IF requirement affects Algorithm → Load algorithm-pattern-expert.md
   - IF requirement affects LoadAPI → Load loadapi-pattern-expert.md
   - IF requirement affects Config → Load config-pattern-expert.md
   - Expert provides: existing patterns, naming conventions, validation rules
```

**Context Passed:**
- Repository path
- Modified entities (tables, modules, classes)
- Base branch name
- Related rules (by semantic name)

**Results Expected:**
- Existing patterns discovered
- Naming conventions to follow
- Required registrations (Module, LoadAPI, Config)
- Cross-repository dependencies

---

### Pattern 3: Parallel Expert Consultation (VIRAT → Multiple Experts)

**Use Case:** Cross-repository requirement needs multiple expert inputs

```
                    ┌──────────────────────┐
              ┌────▶│ Algorithm Expert     │────┐
              │     └──────────────────────┘    │
┌────────┐   │     ┌──────────────────────┐    │   ┌────────┐
│ VIRAT  │───┼────▶│ LoadAPI Expert       │────┼──▶│ VIRAT  │
└────────┘   │     └──────────────────────┘    │   └────────┘
              │     ┌──────────────────────┐    │
              └────▶│ Config Expert        │────┘
                    └──────────────────────┘
                    
         (Parallel delegation)        (Consolidation)
```

**Algorithm:**
1. VIRAT determines all affected repositories
2. Invokes all relevant expert agents in parallel
3. Each expert analyzes their repository independently
4. VIRAT consolidates results
5. Identifies cross-repository dependencies
6. Creates unified implementation plan

**Example:**
```yaml
# virat.md Phase 1, Step 99 (Expert Pattern Analysis)
99. **Expert Pattern Analysis**:
   - Invoke ALL expert agents in parallel
   - Each expert researches their repository
   - Consolidate patterns and conventions
   - Identify integration points
```

**Consolidation Logic:**
- Match naming conventions across repositories
- Validate type consistency (Java → Python → SQL)
- Ensure header alignment (LoadAPI → SQL → Template)
- Plan execution order (Algorithm → LoadAPI → Config)

---

### Pattern 4: Persona Chain (VIRAT → Persona 1 → Persona 2)

**Use Case:** Sequential workflow phases with different personas

```
┌────────┐    ┌──────────┐    ┌─────┐    ┌──────────┐    ┌────────┐
│ VIRAT  │───▶│ Analyst  │───▶│ PM  │───▶│ Dev      │───▶│ QA     │
└────────┘    └──────────┘    └─────┘    └──────────┘    └────────┘
   Phase 1       Phase 2       Phase 3      Phase 4
   Analysis      Planning      Implementation  Validation
```

**Algorithm:**
1. VIRAT executes Phase 1: Analyst analyzes requirement
2. Analyst output becomes PM input
3. PM creates implementation plan
4. PM output becomes Dev input
5. Dev implements changes
6. Dev output becomes QA input
7. QA validates implementation

**Data Flow:**
```
Requirement Doc → Analyst → Analysis Report → PM → Implementation Plan 
              → Dev → Code Changes → QA → Test Report → VIRAT
```

**Example:**
```yaml
# virat.md *implement command
Phase 1: Analyst classifies requirement
         → Output: classification, scope, complexity
         
Phase 2: PM validates plan against requirements
         → Input: Analyst's classification
         → Output: validated plan, risks
         
Phase 3: Dev implements following plan
         → Input: PM's validated plan
         → Output: code changes, commits
         
Phase 5: QA creates unit tests
         → Input: Dev's implementation
         → Output: test suite, coverage report
```

---

### Pattern 5: Specialized Agent Invocation (VIRAT → Specialist)

**Use Case:** Specific workflow needs specialized agent

```
┌────────┐                           ┌──────────────────┐
│ VIRAT  │──── "deploy to QC"        │ Deployment       │
│        │     environment"           │ Agent            │
│        │◄─── deployment status      │                  │
└────────┘                           └──────────────────┘
```

**Algorithm:**
1. VIRAT reaches deployment phase
2. Loads deployment-agent.md
3. Passes requirement document with implementation details
4. Deployment agent handles Azure upload, DB updates
5. Returns deployment status and URLs

**Example:**
```yaml
# virat.md *deploy command
1. Load deployment-agent.md
2. Pass requirement document with:
   - Feature branch names
   - Changed files
   - Args parameters
   - Input tables
   - Export reports
3. Deployment agent:
   - Uploads to Azure Storage
   - Updates database records
   - Validates deployment
4. Returns deployment summary
```

**Context Passed:**
- Requirement document path
- Feature branch names
- Implementation details
- Credentials (from config)

**Results Expected:**
- Deployment status (success/failure)
- Azure storage URLs
- Database update status
- Validation results

---

### Pattern 6: Feedback Collection (VIRAT → Feedback Agent)

**Use Case:** Post-implementation learning collection

```
┌────────┐                           ┌──────────────────┐
│ VIRAT  │──── "collect learnings"   │ Feedback Agent   │
│        │     from implementation    │                  │
│        │◄─── learnings + feedback   │                  │
└────────┘                           └──────────────────┘
```

**Algorithm:**
1. VIRAT completes implementation (Phase 5)
2. Loads feedback-agent.md
3. Feedback agent analyzes implementation artifacts
4. Prompts developer for feedback
5. Stores learnings in `data/example.json`
6. VIRAT uses learnings in future implementations

**Example:**
```yaml
# virat.md Phase 6: Feedback Collection
31. **Learning Extraction**:
    - Load feedback-agent.md
    - Execute collect-learnings command
    - Analyze: git diffs, commits, rule violations, patterns
    
32. **Developer Feedback**:
    - feedback-agent.md gather-feedback
    - Present questionnaire
    - Collect ratings, challenges, solutions
    
33. **Knowledge Storage**:
    - feedback-agent.md store-knowledge
    - Store in data/example.json
    - Tag by: requirement type, repositories, rules
```

---

## Communication Protocols

### 1. Rule References

**All agents use semantic rule names:**

```yaml
# VIRAT delegates with rule context
"Validate against {mandatory_file_class_synchronization}"

# Expert agent responds with rule compliance
"Pattern follows {data_consistency_structure}"

# Persona validates against rules
"This violates {comprehensive_error_handling}"
```

### 2. Context Passing

**Standard context structure:**

```yaml
context:
  requirement:
    id: "REQ-1234"
    path: "/path/to/requirement.md"
    classification: "cross-repository"
  
  environment:
    name: "prod"
    base_branches:
      algorithm: "caas-release"
      loadapi: "release_optimised"
      config: "caas-staging_fix"
  
  repositories:
    affected: ["algorithm", "loadapi", "config"]
    paths:
      algorithm: "../irisx-algo"
      loadapi: "../ms-loadapis-ril-final"
      config: "../irisx-config"
  
  rules:
    applicable: [
      "new_input_integration",
      "data_consistency_structure",
      "cross_repo_type_safety"
    ]
  
  previous_phase_output:
    # Output from previous agent/phase
```

### 3. Result Format

**Standard result structure:**

```yaml
result:
  status: "success"  # or "failure", "warning"
  phase: "analysis"
  agent: "analyst"
  
  data:
    # Phase-specific results
  
  next_actions:
    - "Action for next phase"
  
  validations:
    passed: ["rule1", "rule2"]
    failed: ["rule3"]
    warnings: ["rule4"]
  
  metadata:
    duration: "5 minutes"
    timestamp: "2025-10-16T10:30:00Z"
```

---

## Error Handling & Escalation

### Agent Error → VIRAT

```
Agent encounters error
  ↓
References error-messages.yaml
  ↓
Maps to error code (VIR-###)
  ↓
Returns to VIRAT with context
  ↓
VIRAT displays formatted error
  ↓
VIRAT decides: retry / abort / manual
```

### Validation Failure → Expert Consultation

```
Validation fails
  ↓
VIRAT identifies affected repository
  ↓
Loads appropriate expert agent
  ↓
Expert analyzes violation
  ↓
Expert provides remediation steps
  ↓
VIRAT presents to user with context
```

---

## Workflow Example: Complete `*implement` Flow

### Phase 0: Repository Preparation
```
VIRAT
  └─→ Detect environment from requirement doc
  └─→ Switch to base branches (direct git operations)
```

### Phase 1: Analysis
```
VIRAT
  ├─→ Analyst Persona: Classify requirement
  │   └─← classification: "cross-repository"
  │
  ├─→ Analyst Persona: Crawl repositories
  │   └─← discovered patterns, existing code
  │
  ├─→ Algorithm Expert: Pattern analysis
  ├─→ LoadAPI Expert: Pattern analysis
  ├─→ Config Expert: Pattern analysis
  │   └─← all experts return patterns
  │
  └─→ Consolidate results → Implementation scope
```

### Phase 2: Planning
```
VIRAT
  ├─→ PM Persona: Create implementation plan
  │   └─← detailed plan with file list
  │
  ├─→ PM Persona: Validate plan
  │   └─← validated plan, risk assessment
  │
  └─→ Create feature branches (direct git operations)
```

### Phase 3: Implementation
```
VIRAT
  ├─→ Dev Persona: Implement changes
  │   ├─→ References expert patterns
  │   ├─→ Validates against rules
  │   └─← code changes, commits
  │
  └─→ Run validation (direct validation-library.yaml checks)
```

### Phase 4: Quality Assurance
```
VIRAT
  ├─→ Run automated validation (validate-rules.py)
  │   └─← validation results
  │
  ├─→ QA Persona: Create unit tests
  │   └─← test suite
  │
  └─→ Git push (direct git operations)
```

### Phase 5: Documentation
```
VIRAT
  ├─→ QA Persona: Create feature docs
  │   └─← user documentation
  │
  └─→ Generate release notes (direct generation)
```

### Phase 6: Learning
```
VIRAT
  └─→ Feedback Agent: Collect learnings
      ├─→ Analyze implementation
      ├─→ Gather developer feedback
      └─← learnings stored in example.json
```

---

## Best Practices

### For VIRAT (Orchestrator):
1. ✅ Always provide full context to delegated agents
2. ✅ Validate results before passing to next phase
3. ✅ Use semantic rule names in all communications
4. ✅ Log all agent interactions for feedback collection
5. ✅ Handle errors gracefully with user-friendly messages

### For Expert Agents:
1. ✅ Reference comprehensive analysis docs from `data/`
2. ✅ Return structured, parseable results
3. ✅ Include rule compliance information
4. ✅ Provide examples with recommendations
5. ✅ Flag potential issues proactively

### For Personas:
1. ✅ Follow persona guidelines from bmad-core
2. ✅ Work within defined scope
3. ✅ Return results in expected format
4. ✅ Document decisions and rationale
5. ✅ Validate against provided rules

---

## Debugging Agent Interactions

### Logging Agent Calls

```python
# Log in virat.md activation
log_agent_interaction(
    agent="algorithm-pattern-expert",
    action="analyze_patterns",
    input=context,
    output=results
)
```

### Tracing Workflow

```
[VIRAT] Phase 1 Started
  [Analyst] Analyzing requirement REQ-1234
  [Analyst] Classification: cross-repository
[VIRAT] Phase 1 Complete

[VIRAT] Phase 2 Started
  [PM] Creating implementation plan
  [PM] Validating against rules
[VIRAT] Phase 2 Complete

... etc
```

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Agent not loading | Wrong path reference | Check file path in dependencies |
| Context missing | Incomplete context object | Validate context structure |
| Rule not found | Semantic name typo | Check rule_map in core-implementation-rules.yaml |
| Validation fails | Error in validation logic | Check validation-library.yaml definition |

---

## Related Documentation

- [Complete Development Flow](complete-development-flow.md)
- [Adding New Rules Guide](adding-new-rules-guide.md)
- [Validation Library](../../utils/validation-library.yaml)
- [Error Messages](../../utils/error-messages.yaml)

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2025-10-16 | Initial documentation | VIRAT Team |

