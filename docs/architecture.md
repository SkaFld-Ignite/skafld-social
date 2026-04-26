# Architecture — skafld-social (Postiz)

## System Overview

Postiz is a social media scheduling platform that allows users to schedule, manage, and analyze posts across 28+ social channels. It's built as a TypeScript monorepo with three main runtime services.

```
┌─────────────┐     ┌──────────────┐     ┌────────────────┐
│   Frontend   │────▶│   Backend    │────▶│  Orchestrator  │
│  (Next.js)   │     │  (NestJS)    │     │  (Temporal)    │
│  Port 4200   │     │  Port 3000   │     │                │
└─────────────┘     └──────┬───────┘     └───────┬────────┘
                           │                      │
                    ┌──────┴───────┐       ┌──────┴────────┐
                    │  PostgreSQL  │       │    Redis       │
                    │  (Prisma)    │       │  (ioredis)     │
                    └──────────────┘       └───────────────┘
```

## Monorepo Structure

### Apps (`apps/`)

| App | Framework | Purpose |
|-----|-----------|---------|
| `backend` | NestJS 10 | REST API server with Swagger docs |
| `frontend` | Next.js 16 + React 19 | Web application (SSR) |
| `orchestrator` | NestJS + Temporal | Background job processing (post scheduling, analytics) |
| `extension` | Vite + CRXJS | Chrome extension for cookie-based platform integrations |
| `commands` | NestJS CLI | One-off CLI commands |
| `sdk` | TypeScript | Public SDK for external integrations |

### Libraries (`libraries/`)

| Library | Purpose | Import Alias |
|---------|---------|-------------|
| `nestjs-libraries` | Shared backend code — Prisma schema, services, repositories, integrations, DTOs | `@gitroom/nestjs-libraries/*` |
| `helpers` | Shared utilities — auth, subdomain management, custom fetch hooks | `@gitroom/helpers/*` |
| `react-shared-libraries` | Shared React components, Sentry initialization | `@gitroom/react/*` |

## Backend Architecture

### 3-Layer Pattern

All backend code follows a strict layered architecture. No shortcuts allowed.

```
Controller  →  Service  →  Repository  →  Database (Prisma)
     │              │
     └── DTOs       └── Business Logic
```

Some features use an additional Manager layer:

```
Controller  →  Manager  →  Service  →  Repository
```

**Rules:**
- Controllers live in `apps/backend/src/api/routes/`
- Controllers import services from `libraries/nestjs-libraries/`
- Services contain business logic
- Repositories handle database operations via Prisma
- DTOs validate request/response shapes

### Key Controllers (20 routes)

| Controller | Path | Purpose |
|-----------|------|---------|
| `auth.controller.ts` | `/auth` | Registration, login, OAuth, password reset |
| `posts.controller.ts` | `/posts` | Post CRUD, scheduling, AI generation |
| `integrations.controller.ts` | `/integrations` | Social media account connections |
| `media.controller.ts` | `/media` | Media library management |
| `billing.controller.ts` | `/billing` | Stripe subscription management |
| `settings.controller.ts` | `/settings` | Organization settings |
| `analytics.controller.ts` | `/analytics` | Post performance analytics |
| `public.controller.ts` | `/public` | Public API (API key auth) |

### Authentication & Authorization

- JWT-based authentication (`JWT_SECRET` env var)
- Cookie-based session management
- CASL-based authorization (`@casl/ability`)
- Rate limiting via `@nestjs/throttler` with Redis storage
- Public API uses API key authentication

### Database (Prisma)

- **Schema**: `libraries/nestjs-libraries/src/database/prisma/schema.prisma` (959 lines)
- **Key Models**: Organization, User, Post, Integration, Media, Subscription, Tags, Comments
- **Relationships**: Organization-centric — most models belong to an Organization
- **Commands**: `pnpm run prisma-generate`, `pnpm run prisma-db-push`

## Orchestrator Architecture (Temporal)

The orchestrator handles background jobs via Temporal workflows:

- **Post Scheduling**: Queue posts for publication at scheduled times
- **Social Media Publishing**: Execute posts across connected platforms
- **Analytics Collection**: Gather post performance metrics
- **Token Refresh**: Maintain OAuth token freshness

Temporal configuration:
- Server: `temporal:7233` (Docker)
- Namespace: `default`
- UI: Port 8080

## Frontend Architecture

### Next.js App Router

The frontend uses Next.js 16 with the App Router pattern:

```
apps/frontend/src/app/
├── (app)/          # Main application routes (authenticated)
├── (extension)/    # Chrome extension popup UI
├── (provider)/     # Provider preview iframe routes
└── global.scss     # Global styles
```

### Data Fetching

- **SWR** for client-side data fetching
- **useFetch** hook from `libraries/helpers/src/utils/custom.fetch.tsx`
- Each SWR call must be in its own hook (enforced convention)

### Styling

- Tailwind CSS 3.4.17 (`apps/frontend/tailwind.config.cjs`)
- SCSS for global styles and color definitions
- Mantine 5 for some UI components
- `--color-custom*` variables are **deprecated** — do not use

## Integration / Provider System

The social media integration system is the core domain logic:

```
libraries/nestjs-libraries/src/integrations/social/
├── *.provider.ts           # One file per social platform
├── social.abstract.ts      # Base abstract class
└── social.integrations.manager.ts  # Provider registry
```

Each provider implements:
- OAuth connection flow
- Post creation/publishing
- Analytics retrieval
- Token refresh

Supported platforms include: X/Twitter, LinkedIn, Facebook, Instagram, YouTube, TikTok, Pinterest, Discord, Slack, Mastodon, Reddit, Threads, BlueSky, GitHub, Dribbble, and more.

## External Services

| Service | Purpose | Required |
|---------|---------|----------|
| PostgreSQL | Primary database | Yes |
| Redis | Caching, rate limiting, queues | Yes |
| Temporal | Background job orchestration | Yes |
| Cloudflare R2 | File storage (avatars, media) | No (local fallback) |
| Stripe | Subscription billing | No |
| Resend | Transactional email | No |
| OpenAI | AI content generation | No |
| Sentry | Error tracking & performance | No |
| PostHog | Product analytics | No |

## AI Features

The platform includes AI-powered capabilities:

- **Content Generation**: LangChain + OpenAI for post content
- **Agent System**: Mastra-based agent framework (`libraries/nestjs-libraries/src/agent/`)
- **CopilotKit**: In-app AI assistant
- **Video Generation**: AI-powered video creation from content

## Deployment

- **Docker Compose**: Production (`docker-compose.yaml`) and development (`docker-compose.dev.yaml`)
- **Railway**: Configured via `railway.toml`
- **CI/CD**: GitHub Actions (build, CodeQL analysis, PR quality checks)
- **Container Registry**: `ghcr.io/gitroomhq/postiz-app`
