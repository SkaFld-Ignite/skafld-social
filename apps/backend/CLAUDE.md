# Backend — NestJS API Server

## Architecture
- NestJS 10 REST API with Swagger documentation
- Strict 3-layer pattern: Controller >> Service >> Repository
- Controllers live here in `src/api/routes/`
- Services and repositories live in `libraries/nestjs-libraries/`

## Key Files
- `src/app.module.ts` — Root module, imports all feature modules
- `src/main.ts` — Server bootstrap (port 3000)
- `src/api/routes/*.controller.ts` — 20 route controllers
- `src/services/auth/` — Authentication service, providers, middleware

## Patterns

### Adding a New Endpoint
1. Create/update controller in `src/api/routes/`
2. Create/update service in `libraries/nestjs-libraries/src/database/prisma/`
3. Create/update repository in the same location
4. Add DTOs in `libraries/nestjs-libraries/src/dtos/`

### Authentication
- JWT-based via `JWT_SECRET`
- `@GetOrgFromRequest()` decorator to get current organization
- `@GetUserFromRequest()` decorator to get current user
- `@CheckPolicies()` for CASL-based authorization
- Public API routes use API key auth (`public.controller.ts`)

### Rate Limiting
- `@nestjs/throttler` with Redis storage
- Default: 30 requests/hour (configurable via `API_LIMIT` env)

## Commands
```bash
pnpm run dev:backend    # Dev with hot reload
pnpm run build:backend  # Production build
pnpm run test           # Run tests (from this directory)
```

## Testing
- Jest with ts-jest transform
- Config: `jest.config.ts`
- Tests: `src/__tests__/*.spec.ts`
- Mock services in tests, don't hit the database
