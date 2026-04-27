# Structural Health Scorecard

Generated: 2026-04-26 | Commit: `876be6f8` | Branch: `main`

## Health Score: 63/100 (Unhealthy)

### Universal Checks

| Category | Check | Status | Weight | Notes |
|----------|-------|--------|--------|-------|
| Version Control | Git initialized | PASS | — | |
| | .gitignore exists | PASS | — | Comprehensive |
| | No secrets committed | PASS | — | .env in .gitignore |
| | Clean working tree | PASS | — | |
| Testing | Test files exist | **FAIL** | -10 | Zero test files found |
| | Tests pass | **FAIL** | -10 | No tests to run |
| | Coverage configured | WARN | -2 | jest.config.ts exists but unused |
| CI/CD | Pipeline exists | PASS | — | 7 GitHub Actions workflows |
| | CI passing | UNKNOWN | — | Cannot verify without `gh` |
| Dependencies | Lock file present | PASS | — | pnpm-lock.yaml |
| | Deps pinned | PASS | — | Uses ^ ranges (standard) |
| | Dev deps separated | PASS | — | |
| Documentation | README exists | PASS | — | |
| | README current | PASS | — | |
| | Contributing guide | PASS | — | |
| Code Quality | Linter configured | PASS | — | eslint.config.mjs |
| | Formatter configured | PASS | — | .prettierrc |
| | Type checking | PASS | — | tsconfig.base.json |

### Stack-Specific Checks (Node/TypeScript)

| Check | Status | Weight | Notes |
|-------|--------|--------|-------|
| engines field specified | PASS | — | `>=22.12.0 <23.0.0` |
| node_modules in .gitignore | PASS | — | |
| tsconfig.json for .ts files | PASS | — | |

### Stack-Specific Checks (Docker)

| Check | Status | Weight | Notes |
|-------|--------|--------|-------|
| .dockerignore exists | PASS | — | |
| No `latest` tag in FROM | PASS | — | Pinned to `v2.21.6` and `2.13.0` |

### Additional Issues Found

| Issue | Weight | Notes |
|-------|--------|-------|
| CLAUDE.md inaccuracy | -5 | Claims frontend is "Vite ReactJS" — it's Next.js 16 |
| No architecture docs | -5 | Complex monorepo with no documented architecture |

### Score Calculation

```
Base: 100
- No test files: -10
- Tests don't pass: -10
- Coverage configured but unused: -2
- Docker uses `latest` tag: -5
- CLAUDE.md inaccuracy: -5
- No architecture docs: -5
= 63/100
```

## Remediation Priority

### Critical (blocks quality)
1. **Add test files** — Zero tests in a production app with 671 source files is the biggest risk
2. **Fix CLAUDE.md** — Frontend framework is incorrectly documented as "Vite ReactJS" (it's Next.js 16)

### High (significant improvement)
3. **Pin Docker image versions** — Replace `latest` tag with specific version in docker-compose.yaml
4. **Create architecture documentation** — Document the 3-layer backend pattern, Temporal workflow patterns, and integration system

### Medium (nice to have)
5. **Add per-app CLAUDE.md files** — Especially for backend and frontend apps
6. **Remove unused jest configuration** — Or start writing tests
7. **Document env var requirements per service** — Which vars does backend need vs frontend vs orchestrator?
