# VIRAT Multi-Environment Quick Reference

## 🌍 Supported Environments

| Environment | Status | Use Case |
|-------------|--------|----------|
| **prod** | ✅ Prod | Live prod environment |
| **reliance** | ✅ Client/Reliance | Reliance client environment |
| **phoenix** | ✅ Client/Phoenix | Phoenix client environment |

---

## 🚀 Quick Start

### Deploy to Single Environment

**Prod only:**
```markdown
**Environment**: prod
```

**Reliance only:**
```markdown
**Environment**: reliance
```

**Phoenix only:**
```markdown
**Environment**: phoenix
```

### Deploy to Multiple Environments

**Prod and Reliance:**
```markdown
**Environment**: prod, reliance
```

**Prod and Phoenix:**
```markdown
**Environment**: prod, phoenix
```

**Phoenix and Reliance:**
```markdown
**Environment**: phoenix, reliance
```

**All three environments:**
```markdown
**Environment**: prod, reliance, phoenix
```

---

## 📊 Environment Branch Mappings

### Prod (prod)
- Algorithm: `caas-release`
- LoadAPI: `release_optimised`
- Config: `caas-staging_fix`
- MFP: `release` (if ms-mfp configured)

### Reliance
- Algorithm: `master-ril`
- LoadAPI: `caas-ril-uploads`
- Config: `master-ril`
- MFP: `release-ril` (if ms-mfp configured)

### Phoenix
- Algorithm: `master-adidas-reliance-prod`
- LoadAPI: `caas-phoenix-uploads`
- Config: `master-adidas-ril`
- MFP: `release-pheonix` (if ms-mfp configured)

---

## 🔄 Multi-Environment Processing

When you specify multiple environments, VIRAT processes them **sequentially**:

1. **Environment 1**: Switch → Implement → Test → Push
2. **Environment 2**: Switch → Implement → Test → Push
3. **Environment 3**: Switch → Implement → Test → Push (if specified)

Each environment gets:
- ✅ Environment-specific feature branch (`feature/REQ-1234-{env}`)
- ✅ Complete workflow execution (Phases 0-6)
- ✅ Proper base branch switching
- ✅ Independent testing and validation
- ✅ Documented results

---

## 📝 Example Requirement Document

```markdown
# Add Store Validation

**Requirement ID**: REQ-7890  
**Environment**: prod, reliance, phoenix  
**Status**: In Progress

## Description
Add validation logic across all environments.
```

**Run:** `*implement REQ-7890.md`

**Result:**
- `feature/REQ-7890-add-store-validation-prod` (from `caas-release`)
- `feature/REQ-7890-add-store-validation-reliance` (from `master-ril`)
- `feature/REQ-7890-add-store-validation-phoenix` (from `master-adidas-reliance-prod`)

---

## 🎯 Common Scenarios

### Scenario 1: Prod-Only Hotfix
```markdown
**Environment**: prod
```
Deploy urgent fix to prod only.

### Scenario 2: Staged Rollout
```markdown
**Environment**: prod, reliance, phoenix
```
Deploy to prod first, then validate in reliance, then phoenix.

### Scenario 3: Client Deployment
```markdown
**Environment**: reliance, phoenix
```
Deploy to both client environments simultaneously.

### Scenario 4: Selective Deployment
```markdown
**Environment**: prod, phoenix
```
Deploy to prod and phoenix, skip reliance.

### Scenario 5: Phoenix and Reliance Only
```markdown
**Environment**: phoenix, reliance
```
Deploy to both client environments, skip prod.

---

## ✅ Verification Checklist

Before running `*implement`:

- [ ] Requirement document has correct `**Environment**: ...` field
- [ ] Environment name is one of: `prod`, `reliance`, `phoenix`
- [ ] Multiple environments are comma-separated: `prod, reliance, phoenix`
- [ ] Feature description is clear and environment-aware

---

## 🔍 Debugging Environment Issues

### Check Current Configuration
```bash
*show-env
```

### Test Single Environment First
If having issues with multiple environments, test one at a time:
```markdown
**Environment**: prod
```

Then move to multiple:
```markdown
**Environment**: prod, reliance
```

### Verify Branch Names
Feature branches should include environment suffix:
- `feature/REQ-XXXX-description-prod`
- `feature/REQ-XXXX-description-reliance`
- `feature/REQ-XXXX-description-phoenix`

---

## 📚 Full Documentation

For complete details, see:
- [`docs/guides/multi-environment-support.md`](docs/guides/multi-environment-support.md)
- [`README.md`](README.md)
- [`config.yaml`](config.yaml)

---

## 🚀 You're Ready!

**All three environments (prod, reliance, phoenix) are fully integrated and ready for multi-environment deployments!**

Start with your first multi-environment requirement! 🎯
