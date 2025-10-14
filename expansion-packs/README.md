# BMAD™ Method Expansion Packs

Expansion packs extend BMAD™ (Brownfield Multi-Agent Development) beyond traditional software development, providing specialized agent teams, templates, and workflows for specific domains and industries. Each pack is a self-contained ecosystem designed to bring the power of AI-assisted workflows to any field.

## Standard Components

### 🔧 bmad-feedback - Feedback & Continuous Learning System

**Status**: Standard across all expansion packs  
**Path**: `expansion-packs/bmad-feedback/`

Universal feedback collection and learning system that enables continuous improvement across all BMAD agents. This is a **standard component** that should be integrated into all expansion packs.

**Key Features**:
- Comprehensive feedback collection when implementations don't meet expectations
- Automatic pattern recognition and learning from mistakes
- Knowledge base updates for agent improvement
- Data-driven improvement suggestions
- Quality assurance through feedback integration

**Quick Start**:
```bash
@bmad-feedback/agents/feedback-agent.md
*collect-feedback
```

**Documentation**:
- [README](bmad-feedback/README.md) - Complete overview
- [QUICKSTART](bmad-feedback/QUICKSTART.md) - Get started in 5 minutes
- [INTEGRATION_GUIDE](bmad-feedback/docs/INTEGRATION_GUIDE.md) - Integration instructions

---

## Domain-Specific Expansion Packs

### 📊 bmad-ads-automation - ADS Automation

Specialized expansion pack for automating ADS (Automated Development System) workflows with intelligent repository analysis and transformation.

**Path**: `expansion-packs/bmad-ads-automation/`

**Key Features**:
- VIRAT agent for intelligent repository analysis
- Multi-repository coordination
- Pattern-based development
- Rule-driven implementation

**Status**: Production Ready

---

### 🔄 bmad-advanced-response-yield-assistant - ARYA

Advanced Response Yield Assistant for complex workflow orchestration including WSSI/MFP workflows.

**Path**: `expansion-packs/bmad-advanced-response-yield-assistant/`

**Key Features**:
- WSSI workflow automation
- MFP workflow management
- Pattern expert agents (Algorithm, LoadAPI, Config, MFP)
- PR generation automation

**Status**: Production Ready

---

### 🐛 bmad-algorithm-debugger

Specialized debugging and analysis tools for algorithm repositories.

**Path**: `expansion-packs/bmad-algorithm-debugger/`

**Key Features**:
- Algorithm debugging
- Performance bottleneck analysis
- Business logic validation
- Comprehensive code review

**Status**: Production Ready

---

### 🏗️ bmad-infrastructure-devops

Infrastructure and DevOps automation for platform management.

**Path**: `expansion-packs/bmad-infrastructure-devops/`

**Key Features**:
- Infrastructure review and validation
- Platform architecture management
- DevOps workflow automation
- Infrastructure checklists

**Status**: Production Ready

---

### 🧪 bmad-regression-testing

Comprehensive regression testing orchestration and quality assurance.

**Path**: `expansion-packs/bmad-regression-testing/`

**Key Features**:
- Risk area identification
- Failure likelihood assessment
- Test case prioritization
- Quality gate checklists

**Status**: Production Ready

---

### 🔬 bmad-virtual-intelligent-repository-analysis-transformation - VIRAT

Virtual Intelligent Repository Analysis and Transformation for systematic, rule-guided development across multiple repositories.

**Path**: `expansion-packs/bmad-virtual-intelligent-repository-analysis-transformation/`

**Key Features**:
- 45 comprehensive implementation rules
- Multi-repository coordination
- Pattern expert delegation
- Complete development flow (10 steps, 4 phases)
- Intelligent requirement classification

**Status**: Production Ready

---

## Integration Requirements

All expansion packs **MUST** integrate with `bmad-feedback` to enable:
- Continuous learning from mistakes
- Pattern recognition across implementations
- Quality improvement over time
- Knowledge sharing across agents

See [bmad-feedback Integration Guide](bmad-feedback/docs/INTEGRATION_GUIDE.md) for details.

---

## Expansion Pack Structure

Standard structure for all expansion packs:

```
expansion-packs/{pack-name}/
├── README.md                    # Pack overview and documentation
├── QUICKSTART.md                # Quick start guide
├── config.yaml                  # Pack configuration
├── agents/                      # Agent definitions
├── checklists/                  # Process checklists
├── tasks/                       # Task definitions
├── templates/                   # Template files
├── workflows/                   # Workflow definitions
├── personas/                    # Persona definitions (optional)
├── data/                        # Data and knowledge files
└── docs/                        # Additional documentation
```

---

## Creating New Expansion Packs

When creating a new expansion pack:

1. ✅ Follow the standard structure above
2. ✅ Integrate with `bmad-feedback` for continuous learning
3. ✅ Create comprehensive README and QUICKSTART
4. ✅ Define clear agent capabilities and commands
5. ✅ Include checklists for key processes
6. ✅ Provide example workflows
7. ✅ Document integration points with other packs

See individual expansion pack READMEs for detailed examples.

---

## License

Part of the BMAD™ (Brownfield Multi-Agent Development) ecosystem.
