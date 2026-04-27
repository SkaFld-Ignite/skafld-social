# Project Audit — skafld-social

Generated: 2026-04-26 | Commit: `876be6f8` | Branch: `main`

## Project Classification

| Field | Value |
|-------|-------|
| **Name** | skafld-social |
| **Type** | Monorepo (PNPM workspaces) |
| **Platform** | Web (SaaS) |
| **Primary Languages** | TypeScript (100%) |
| **Frameworks** | NestJS (backend/orchestrator), Next.js (frontend), Temporal (workflows) |
| **Database** | PostgreSQL (Prisma ORM, 959-line schema) |
| **Cache/Queue** | Redis (ioredis) |
| **Architecture** | Monorepo with 6 apps + 3 shared libraries |
| **Deployment** | Docker Compose, Railway, GitHub Actions CI |
| **License** | AGPL-3.0 |
| **Node Version** | >=22.12.0 <23.0.0 |
| **Package Manager** | pnpm@10.6.1 |

## Repository Structure

```
skafld-social/
 apps/
   backend/          # NestJS API server (Controller >> Service >> Repository)
   frontend/         # Next.js web app (NOT Vite as CLAUDE.md claims)
   orchestrator/     # Temporal background job processing (NestJS)
   extension/        # Chrome browser extension
   commands/         # CLI commands
   sdk/              # Public SDK
 libraries/
   helpers/          # Shared utilities (useFetch, custom hooks)
   nestjs-libraries/ # Shared backend services, Prisma schema, integrations
   react-shared-libraries/  # Shared React components, Sentry init
 .github/workflows/  # 7 CI workflows (build, CodeQL, PR quality, etc.)
 Jenkins/            # Jenkins pipeline configs
 docker-compose.yaml # Production Docker setup
 docker-compose.dev.yaml # Dev Docker setup (Postgres, Redis, Temporal)
```

## Git State

| Field | Value |
|-------|-------|
| Branch | `main` |
| Status | Clean |
| Origin | `https://github.com/SkaFld-Ignite/skafld-social.git` |
| Latest Tag | `v2.21.6` |
| Commits since tag | ~35 (unreleased) |

## Services & Configuration

### Internal Services
- **Backend API** — NestJS, port 3000
- **Frontend** — Next.js, port 4200
- **Orchestrator** — NestJS + Temporal worker
- **Chrome Extension** — Browser extension for cookie-based integrations

### External Services
- PostgreSQL (required)
- Redis (required)
- Temporal (required for orchestrator)
- Cloudflare R2 (file storage, optional — local fallback)
- Stripe (payments)
- Resend (email)
- OpenAI (AI features)
- Sentry (error tracking)
- PostHog (analytics)
- 20+ social media platform APIs (X, LinkedIn, Facebook, Instagram, YouTube, TikTok, Pinterest, Discord, Slack, Mastodon, Reddit, Threads, BlueSky, etc.)

### Environment Variables
- **Required**: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `FRONTEND_URL`, `NEXT_PUBLIC_BACKEND_URL`, `BACKEND_INTERNAL_URL`
- **Storage**: `CLOUDFLARE_*` or `STORAGE_PROVIDER=local`
- **Social APIs**: 30+ social media API key/secret pairs
- **Payments**: `STRIPE_*` keys
- **Email**: `RESEND_API_KEY`
- `.env.example` is comprehensive (123 lines)

## Dependencies Summary

- **Total dependencies**: ~180 (dependencies) + ~40 (devDependencies)
- **Key frameworks**: NestJS 10, Next.js 16.2.1, React 19.2.4, Prisma 6.5.0
- **AI/ML**: LangChain, Mastra, OpenAI, CopilotKit
- **UI**: Tailwind CSS 3.4.17, Mantine 5, TipTap (rich text), Polotno (design editor)
- **Background Jobs**: Temporal SDK
- **File Upload**: Uppy, Sharp
- **Monitoring**: Sentry (nestjs, nextjs, react)
- **Testing**: Jest (configured but NO test files exist)

## Documentation Inventory

| Path | Category | Status | Action |
|------|----------|--------|--------|
| `README.md` | Governance | Current | Keep |
| `CLAUDE.md` | AI Context | **Stale** | **Update** — claims frontend is "Vite ReactJS", it's actually Next.js |
| `CONTRIBUTING.md` | Governance | Current | Keep |
| `CODE_OF_CONDUCT.md` | Governance | Current | Keep |
| `SECURITY.md` | Governance | Current | Keep (recently updated) |
| `apps/frontend/README.md` | Package Doc | Unknown | Review |
| `apps/sdk/README.md` | Package Doc | Unknown | Review |
| `libraries/nestjs-libraries/README.md` | Package Doc | Unknown | Review |
| `libraries/react-shared-libraries/README.md` | Package Doc | Unknown | Review |

### Missing Documentation
- No CLAUDE.md in apps/backend/, apps/frontend/, or libraries/
- No AGENTS.md anywhere
- No architecture documentation
- No ADRs/DECISIONS.md

## Inline TODOs

Only 9 TODOs found across 2 files (both in mastodon provider files) — very clean codebase.

## Serena Memory Health

No `.serena/` directory — Serena is not configured for this project.
