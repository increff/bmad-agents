# Setup: BMAD Regression Testing

## Prerequisites
- Node.js 16+
- Git installed and configured
- Access to local clones of:
  - `irisx-algo` (Java, Maven, JDK 8/11)
  - `irisx-config` (PostgreSQL or compatible local DB client `psql`)
  - `ms-loadapis` (Python 3.9+, pip)

## Tooling
- Java: Maven (`mvn`), JDK 8/11
- SQL: PostgreSQL client (`psql`) or your DB tooling
- Python: `pip`, `coverage`

## Configure Repository Paths
Edit `expansion-packs/bmad-regression-testing/config.yaml`:
```yaml
repositories:
  irisx-algo: "/absolute/path/to/irisx-algo"
  irisx-config: "/absolute/path/to/irisx-config"
  ms-loadapis: "/absolute/path/to/ms-loadapis-ril-final"
```

## Branches
Ensure repos are on expected base branches (customize as needed):
- `irisx-algo`: `caas-release`
- `irisx-config`: `caas-staging_fix`
- `ms-loadapis`: `release_optimised`

## Database (for SQL tests)
- Install PostgreSQL locally
- Create a test DB, e.g. `test_db`
- Ensure `psql` is in PATH

## Python environment (for loadapis)
```bash
python -m venv .venv && source .venv/bin/activate
pip install -U pip coverage
pip install -r requirements.txt  # if present in ms-loadapis
```

## Sanity Checks
- `mvn -v`, `java -version`
- `psql --version`
- `python --version`, `pip --version`

## First Run
See `docs/QUICKSTART.md` to run `/regression-test`.
