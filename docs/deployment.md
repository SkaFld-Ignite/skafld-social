# Deployment — Railway

This project deploys to Railway as 3 separate services sharing a PostgreSQL database and Redis instance.

## Architecture

```
Railway Project: skafld-social
├── Service: backend        (NestJS API, port $PORT)
├── Service: frontend       (Next.js SSR, port $PORT)
├── Service: orchestrator   (Temporal worker, no port)
├── Plugin: PostgreSQL
├── Plugin: Redis
└── External: Temporal Cloud
```

## Prerequisites

- [Railway CLI](https://docs.railway.com/guides/cli) installed: `npm i -g @railway/cli`
- Railway account with a project created
- Temporal Cloud namespace and credentials
- Domain configured (optional)

## Step 1: Create Railway Project

```bash
railway login
railway init    # or link to existing project
```

## Step 2: Add Database Plugins

In the Railway dashboard, add:
1. **PostgreSQL** — click "New" > "Database" > "PostgreSQL"
2. **Redis** — click "New" > "Database" > "Redis"

Railway auto-provisions `DATABASE_URL` and `REDIS_URL` for connected services.

## Step 3: Create Services

Create 3 services in the Railway dashboard, all pointing to the same GitHub repo (`SkaFld-Ignite/skafld-social`). Configure each:

### Backend Service

| Setting | Value |
|---------|-------|
| **Name** | `backend` |
| **Root Directory** | `/` |
| **Build Command** | `pnpm install && pnpm run prisma-generate && pnpm run build:backend` |
| **Start Command** | `pnpm run start:prod:backend` |
| **Watch Paths** | `apps/backend/**`, `libraries/**` |

### Frontend Service

| Setting | Value |
|---------|-------|
| **Name** | `frontend` |
| **Root Directory** | `/` |
| **Build Command** | `pnpm install && pnpm run prisma-generate && pnpm run build:frontend` |
| **Start Command** | `pnpm run start:prod:frontend` |
| **Watch Paths** | `apps/frontend/**`, `libraries/**` |

### Orchestrator Service

| Setting | Value |
|---------|-------|
| **Name** | `orchestrator` |
| **Root Directory** | `/` |
| **Build Command** | `pnpm install && pnpm run prisma-generate && pnpm run build:orchestrator` |
| **Start Command** | `pnpm run start:prod:orchestrator` |
| **Watch Paths** | `apps/orchestrator/**`, `libraries/**` |

## Step 4: Environment Variables

Set these on **all 3 services** (use Railway's shared variables feature):

### Required (all services)

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}    # Auto-injected by Railway plugin
REDIS_URL=${{Redis.REDIS_URL}}             # Auto-injected by Railway plugin
JWT_SECRET=<generate-a-random-string>
IS_GENERAL=true
```

### Frontend-specific

```env
FRONTEND_URL=https://<your-frontend-domain>
NEXT_PUBLIC_BACKEND_URL=https://<your-backend-domain>
```

### Backend-specific

```env
FRONTEND_URL=https://<your-frontend-domain>
NEXT_PUBLIC_BACKEND_URL=https://<your-backend-domain>
BACKEND_INTERNAL_URL=http://localhost:${{PORT}}
```

### Orchestrator-specific

```env
BACKEND_INTERNAL_URL=https://<your-backend-domain>
```

### Temporal Cloud (backend + orchestrator)

```env
TEMPORAL_ADDRESS=<namespace>.tmprl.cloud:7233
TEMPORAL_NAMESPACE=<namespace>
TEMPORAL_TLS_CERT=<base64-encoded-cert>
TEMPORAL_TLS_KEY=<base64-encoded-key>
```

### Optional

```env
# Storage (Cloudflare R2 or local)
STORAGE_PROVIDER=local
UPLOAD_DIRECTORY=/uploads
NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY=/uploads

# Email
RESEND_API_KEY=<key>

# Payments
STRIPE_PUBLISHABLE_KEY=<key>
STRIPE_SECRET_KEY=<key>
STRIPE_SIGNING_KEY=<key>

# AI
OPENAI_API_KEY=<key>

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=<dsn>
SENTRY_AUTH_TOKEN=<token>

# Social media API keys (as needed)
X_API_KEY=<key>
X_API_SECRET=<secret>
# ... etc
```

## Step 5: Networking

1. **Backend** — Assign a public domain (e.g., `api.skafld.social`)
2. **Frontend** — Assign a public domain (e.g., `app.skafld.social`)
3. **Orchestrator** — No public domain needed (internal only)
4. Link PostgreSQL and Redis plugins to all 3 services

## Step 6: Deploy

Push to `main` — Railway auto-deploys on push.

```bash
git push origin main
```

Or deploy manually:
```bash
railway up
```

## Step 7: Database Migration

After first deploy, run the Prisma migration:

```bash
railway run pnpm run prisma-db-push
```

## Health Checks

- **Backend**: `GET /` returns 200
- **Frontend**: `GET /` returns 200
- **Orchestrator**: No HTTP endpoint — Railway monitors process health

## Troubleshooting

### Build fails with memory errors
Increase the service's build memory in Railway settings (default 8GB should be sufficient).

### Frontend can't reach backend
Ensure `NEXT_PUBLIC_BACKEND_URL` points to the backend's public Railway domain with `https://`.

### Orchestrator disconnects from Temporal
Check `TEMPORAL_ADDRESS` and TLS credentials. Ensure the orchestrator service has the Temporal env vars set.

### Database connection errors
Verify `DATABASE_URL` is using Railway's reference variable `${{Postgres.DATABASE_URL}}` — this auto-updates if the database is restarted.
