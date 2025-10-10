# CI Examples: BMAD Regression Testing

## irisx-algo (Bitbucket Pipelines)
```yaml
image: maven:3.8.4-openjdk-8
pipelines:
  branches:
    master:
      - step:
          name: Run Unit & Integration Tests
          script:
            - mvn -B -q clean test -Dtest="**/module/**/*Test" -DfailIfNoTests=false
            - mvn -B -q test -Dtest="**/it/**/*Test" -DfailIfNoTests=false
            - mvn -B -q jacoco:report surefire-report:report
```

## irisx-config (Bitbucket Pipelines)
```yaml
image: postgres:13
pipelines:
  branches:
    master:
      - step:
          name: Validate SQL & Migrations
          services:
            - postgres
          script:
            - psql -U postgres -c 'CREATE DATABASE test_db;'
            - find db/migration/ -name "*.sql" -exec psql -d test_db -U postgres -f {} \;
            - find export/ -name "*.sql" -exec psql -d test_db -U postgres -f {} \;
            - find sync/ -name "*.sql" -exec psql -d test_db -U postgres -f {} \;
```

## ms-loadapis (GitHub Actions)
```yaml
name: MS Load API Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install deps
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
          pip install coverage
      - name: Run tests
        run: |
          python -m coverage run -m unittest discover -s test
          python -m coverage report --show-missing --fail-under=80
```
