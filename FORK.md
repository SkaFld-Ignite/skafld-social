# Fork Relationship — skafld-social

## Overview

This repository is a **tracking fork** of [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) (the open-source Postiz social media scheduling platform).

| | |
|---|---|
| **Origin** | `https://github.com/SkaFld-Ignite/skafld-social.git` |
| **Upstream** | `https://github.com/gitroomhq/postiz-app.git` |
| **Fork Type** | Thin tracking fork — no Skafld-specific source code changes |
| **Divergence** | 0 commits ahead, 5 commits behind upstream (as of 2026-04-26) |

## What's Skafld-Specific

Currently, this fork has **zero source code customizations**. The only Skafld-specific additions are project tooling:

- `CLAUDE.md` — AI coding context
- `.project-state/` — Project health tracking
- `PROJECT_STATUS.html` — Interactive status report
- `FORK.md` — This file
- `apps/backend/jest.config.ts` + test files — Test infrastructure
- `docs/architecture.md` — Architecture documentation

All application code, configuration, and CI workflows come directly from upstream.

## Sync Strategy

### Current Process
Upstream changes are merged manually via periodic `git merge upstream/main`. Recent cadence has been roughly every 2-3 days.

### How to Sync
```bash
# Fetch latest from upstream
git fetch upstream

# Check what's pending
git log --oneline upstream/main --not origin/main

# Merge upstream changes
git merge upstream/main

# Push to origin
git push origin main
```

### Conflict Resolution
Since there are no Skafld-specific source code changes, merge conflicts should be rare. If conflicts occur in tooling files (CLAUDE.md, .project-state/), prefer keeping the Skafld version.

## Pending Upstream Commits

As of 2026-04-26, 5 upstream commits are not yet merged:
- `fd655319` — Merge PR #1465 (X_URL env variable)
- `90b25810` — Better developer documentation
- `4e7864c9` — Better MCP options
- `b91ffdc9` — Remove duplicate X_URL in docker-compose
- `d75662b5` — Add X_URL to docker-compose and .env.example

## Future Customization

When Skafld-specific features are added, document them here:

1. **What was changed** — file paths and description
2. **Why** — business reason for diverging from upstream
3. **Merge impact** — will this conflict with upstream changes?

This helps maintain awareness of what must be preserved during upstream syncs.
