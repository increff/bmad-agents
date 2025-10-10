# BMAD Regression Testing Expansion Pack

## Overview
This expansion pack provides a comprehensive, automated regression testing workflow for the Increff ecosystem. It works across the `irisx-algo`, `irisx-config`, and `ms-loadapis` repositories to ensure software quality and stability.

## Contents
- `agents/`
  - `regression-orchestrator.md`
  - `java-test-expert.md`
  - `sql-test-expert.md`
  - `python-test-expert.md`
- `tasks/`
  - `1-identify-risk-areas.md`
  - `2-assess-failure-likelihood.md`
  - `3-prioritize-test-cases.md`
  - `4-execute-tests.md`
  - `5-iterate-and-refine.md`
- `checklists/`
  - `quality-gate-checklist.md`
- `templates/`
  - `test-generation-templates.yaml`
  - `regression-report-tmpl.md`
  - `priority-matrix.yaml` (add your priorities)
  - `risk-assessment-matrix.yaml` (add your scoring)
- `docs/`
  - `QUICKSTART.md`
  - `WORKFLOW_DETAILS.md`
  - `COMMAND_REFERENCE.md`
  - `SETUP.md`
  - `CI_EXAMPLES.md`
- `config.yaml` – set absolute repository paths and test flags

## Agents
- `regression-orchestrator`: runs the end-to-end workflow and enforces quality gates
- `java-test-expert`: runs Maven/JUnit/JaCoCo
- `sql-test-expert`: validates SQL, migrations, regression SQL
- `python-test-expert`: runs unittest/coverage and integration checks

## Configuration
Edit `config.yaml`:
- `repositories.*`: absolute paths to local repos
- `testing.parallel` and `testing.fail-fast`
- default branches for each repo

## Usage
See `docs/QUICKSTART.md` for installation and `/regression-test` examples.
See `docs/COMMAND_REFERENCE.md` for all commands and flags.

## CI/CD
Reference snippets for Bitbucket/GitHub in `docs/CI_EXAMPLES.md`.

## Quality Gates
Criteria are defined in `checklists/quality-gate-checklist.md`. Adjust thresholds to your needs.
