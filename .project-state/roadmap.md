# Roadmap Reconciliation

Generated: 2026-04-26 | Commit: `876be6f8` | Branch: `main`

## Recent Activity Themes (since v2.21.6)

Based on 35 unreleased commits, the project is actively working on:

1. **Provider Preview System** — New iframe-based provider edit preview (7d9b99ab + 10 follow-up fixes)
2. **Mobile App Integration** — OAuth callbacks, auth changes, bridge communication (5257f2fa, 88006a76)
3. **Security Hardening** — SSRF protection, insecure workflow removal, security policy updates (071143dc, da448012)
4. **Media Improvements** — Search in media library (ec8c0f6f), AI video generation fixes (386fc7b0)
5. **API Enhancements** — Post status change API, public integrations controller updates

## Inline TODOs

| File | Count | Summary |
|------|-------|---------|
| `libraries/nestjs-libraries/src/integrations/social/mastodon.custom.provider.ts` | 2 | Implementation TODOs |
| `libraries/nestjs-libraries/src/integrations/social/mastodon.provider.ts` | 7 | Implementation TODOs |

**Recommendation**: These are in Mastodon provider files — likely inherited and represent incomplete integration features.

## Prioritized Next Steps

### 1. Critical Path — Testing Infrastructure
**Why**: 671 source files, zero tests. Any refactoring or security fix is flying blind.
- Add at least integration tests for the backend API layer
- Add component tests for critical frontend flows (post creation, scheduling)
- Wire up Jest with the existing config

### 2. Critical Path — Fix CLAUDE.md Accuracy
**Why**: CLAUDE.md is loaded in every AI session. Incorrect info (Vite vs Next.js) causes wrong suggestions.
- Update framework description
- Add development commands section

### 3. High Value — Tag a Release
**Why**: 35 commits since v2.21.6 include security fixes and significant features. These should be versioned.
- Consider tagging v2.22.0 for the provider preview + mobile app + security work

### 4. Nice to Have — Complete Mastodon Integration
**Why**: 9 TODOs in mastodon providers suggest incomplete feature.
- Review whether Mastodon is Skafld-relevant
- Complete or remove the TODOs

### 5. Defer — Rename Internal @gitroom Aliases
**Why**: Internal module aliases still reference the old project name. Low priority cosmetic change.
- Update `tsconfig.base.json` paths from `@gitroom/*` to `@skafld/*`
- Update all import statements across the codebase
