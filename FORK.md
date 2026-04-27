# Origin — skafld-social

## Overview

This repository originated from [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) (the open-source Postiz social media scheduling platform). It is now a **standalone project** under the SkaFld-Ignite organization.

| | |
|---|---|
| **Repository** | `https://github.com/SkaFld-Ignite/skafld-social.git` |
| **Original Source** | `gitroomhq/postiz-app` (no longer tracked as upstream) |
| **Status** | Standalone — all development happens within SkaFld-Ignite |

## Relationship with Postiz

- The upstream remote has been **removed**. This repo no longer tracks or syncs from `gitroomhq/postiz-app`.
- All future development, features, and fixes happen directly in this repository.
- The codebase retains some Postiz/Gitroom naming in internal module aliases (`@gitroom/*`) and the Prisma schema — these are cosmetic and will be updated as needed.

## Internal Naming

Legacy internal aliases still reference the original project name:

- `@gitroom/backend/*` — Backend app imports
- `@gitroom/frontend/*` — Frontend app imports
- `@gitroom/nestjs-libraries/*` — Shared backend library
- `@gitroom/helpers/*` — Shared utilities
- `@gitroom/react/*` — Shared React components

These are defined in `tsconfig.base.json` and are functional. Renaming them is a low-priority cosmetic task.
