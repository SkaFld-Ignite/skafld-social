# CLAUDE.md — Project Context
<!-- PROJECT_STATE: commit=876be6f8 timestamp=2026-04-26T00:00:00Z health=63 -->

## Project Identity
- **Name**: skafld-social
- **Type**: Monorepo (PNPM workspaces)
- **Platform**: Web SaaS — social media scheduling to 28+ channels
- **Stack**: TypeScript, NestJS 10, Next.js 16, React 19, Prisma 6, Temporal, Redis
- **Architecture**: 6 apps + 3 shared libraries, 3-layer backend (Controller >> Service >> Repository)
- **Health**: 63/100 (red — zero tests, CLAUDE.md was inaccurate)

## Development Commands
```bash
# Install
pnpm install

# Dev (all services)
pnpm run dev:docker   # Start Postgres, Redis, Temporal
pnpm run dev          # Start backend, frontend, orchestrator, extension

# Dev (individual)
pnpm run dev:backend
pnpm run dev:frontend
pnpm run dev:orchestrator

# Build
pnpm run build

# Database
pnpm run prisma-generate    # Generate Prisma client
pnpm run prisma-db-push     # Push schema changes
pnpm run prisma-db-pull     # Pull schema from DB

# Lint (must run from root)
pnpm eslint .

# Test (no tests exist yet)
pnpm test
```

## Project Structure
- `apps/backend` — NestJS API server
- `apps/frontend` — Next.js web app (port 4200)
- `apps/orchestrator` — Temporal background job processing (NestJS)
- `apps/extension` — Chrome browser extension
- `apps/commands` — CLI commands
- `apps/sdk` — Public SDK
- `libraries/helpers` — Shared utilities (useFetch, custom hooks)
- `libraries/nestjs-libraries` — Shared backend services, Prisma schema, integrations
- `libraries/react-shared-libraries` — Shared React components, Sentry

## Active Issues
1. **Zero test coverage** — 671 source files, no test files
2. **Docker uses `latest` tag** — docker-compose.yaml should pin versions
3. **35 unreleased commits** since v2.21.6 (security fixes, provider preview, mobile support)

## Next Action
Add integration tests for the backend API layer — this is the highest-impact improvement.

## Coding Standards

### Package Manager
- Use only pnpm. Never use npm or yarn.
- Never install frontend components from npmjs — write native components.

### Backend Pattern (3 layers, no shortcuts)
```
Controller >> Service >> Repository
Controller >> Manager >> Service >> Repository (when needed)
```
Most server logic goes in `libraries/nestjs-libraries/`.

### Frontend Pattern
- UI components: `/apps/frontend/src/components/ui`
- Routing: `/apps/frontend/src/app`
- Components: `/apps/frontend/src/components`
- Always use SWR for data fetching with `useFetch` from `/libraries/helpers/src/utils/custom.fetch.tsx`

### SWR Rules
Each SWR call must be in a separate hook. Never nest SWR calls or disable eslint rules.

Valid:
```ts
const useCommunity = () => {
   return useSWR....
}
```

Invalid:
```ts
const useCommunity = () => {
  return {
    communities: () => useSWR<CommunitiesListResponse>("communities", getCommunities),
    providers: () => useSWR<ProvidersListResponse>("providers", getProviders),
  };
}
```

### Styling
Uses Tailwind CSS 3. Before writing components, check:
- `/apps/frontend/src/app/colors.scss`
- `/apps/frontend/src/app/global.scss`
- `/apps/frontend/tailwind.config.cjs`

All `--color-custom*` CSS variables are deprecated — do not use them.
Check existing components for design consistency.

### Linting
Linting can only run from the project root.

## Full Context
For detailed audit, health scorecard, roadmap, and changelog, see `.project-state/`:
- `.project-state/audit.md` — Full discovery findings and docs analysis
- `.project-state/health.md` — Structural health scorecard with remediation steps
- `.project-state/roadmap.md` — Reconciled roadmap with prioritized next steps
- `.project-state/changelog.md` — Generated changelog since last release