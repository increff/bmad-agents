# Requirement Document Template

## Requirement Header

**Requirement ID**: REQ-XXXX  
**Environment**: prod | reliance | phoenix  
**Title**: [Brief requirement title]  
**Date**: [Date]  
**Author**: [Author name]  

---

## Environment Configuration

VIRAT will automatically detect the environment from the `Environment` field above and use the corresponding base branches:

### PROD Environment
- **Algorithm Repository** (irisx-algo): `caas-release`
- **LoadAPI Repository** (ms-loadapis-ril-final): `release_optimised`
- **Config Repository** (irisx-config): `caas-staging_fix`

### Reliance Environment
- **Algorithm Repository** (irisx-algo): `master-ril`
- **LoadAPI Repository** (ms-loadapis-ril-final): `caas-ril-uploads`
- **Config Repository** (irisx-config): `master-ril`

### Phoenix Environment
- **Algorithm Repository** (irisx-algo): `master-adidas-reliance-prod`
- **LoadAPI Repository** (ms-loadapis-ril-final): `caas-phoenix-uploads`
- **Config Repository** (irisx-config): `master-adidas-ril`

---

## Requirement Description

[Your requirement details here...]

## Acceptance Criteria

1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

## Technical Details

[Any technical specifications...]

## Notes

[Additional notes...]

---

**IMPORTANT**: Always specify the `Environment` field in the header. VIRAT will use this to automatically switch to the correct base branches before starting any analysis or implementation work.

