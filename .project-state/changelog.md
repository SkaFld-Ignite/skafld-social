# Changelog

Generated: 2026-04-26 | Window: v2.21.6..HEAD | Branch: `main`

## Unreleased (35 commits since v2.21.6)

### Features
- `7d9b99ab` (2026-04-17) — Provider edit preview system — new iframe-based preview with bridge communication (9 files, +405/-9)
- `88006a76` (2026-04-19) — Mobile app iframe integration for add provider flow (6 files, +123/-32)
- `5257f2fa` (2026-04-17) — OAuth redirect URL support for mobile callbacks (8 files, +45/-46)
- `ec8c0f6f` (2026-04-14) — Search in media library (4 files, +61/-33)
- `288a4d42` (2026-04-13) — Change post status via public API (3 files, +42)

### Fixes
- `071143dc` (2026-04-22) — Security: SSRF-safe dispatcher for webhooks & upload validation (5 files, +68/-7)
- `e51cae16` (2026-04-22) — Fix Instagram analytics (1 file)
- `fa5d7f4c` (2026-04-22) — Fix LinkedIn page integration popup (2 files)
- `89512894` (2026-04-20) — Fix previous agent messages display (1 file)
- `386fc7b0` (2026-04-15) — Fix AI video generation (4 files, +59/-74)
- `027c9caa` — `2ae29391` — `71b2e2e7` — `e5947034` (2026-04-17/18) — Multiple provider validity check and bridge fixes
- `846954f0` — `65d23707` — `0a8fa5bf` (2026-04-18) — Bridge communication fixes
- `c7996571` (2026-04-18) — Auth context changes for provider flow
- `45e55c54` (2026-04-18) — Add auth header to backend
- `8a7e8eb8` (2026-04-18) — Fix empty object handling in provider preview
- `0ecca529` (2026-04-17) — Remove gap in provider preview

### Security
- `da448012` (2026-04-22) — Remove insecure & unnecessary PR Docker build workflow
- `0eddfb33` — `55a54248` — `8cfb634b` — `c61e0611` — `ec4759e9` (2026-04-19/20) — Security policy updates (SECURITY.md)

### Monitoring
- `1145e51e` (2026-04-13) — Enable Sentry session replay

### Merges
- `876be6f8` (2026-04-22), `0b554e68` (2026-04-20), `eb0334d9` (2026-04-13) — Remote tracking branch merges

## v2.21.6

- `3ea30220` — Fix advisory
- `e3b3b82f` — Instagram better error handling
- `318e9da8` — Refresh token, show error
- `186d3370` — Instagram refresh fix
- `98c32c3d` — Subreddit posting fix with API
