# Frontend — Next.js Web Application

## Architecture
- Next.js 16 with App Router (NOT Vite — despite historical references)
- React 19 with SWR for data fetching
- Tailwind CSS 3.4 for styling
- Port 4200 in development

## Key Directories
- `src/app/(app)/` — Main authenticated application routes
- `src/app/(extension)/` — Chrome extension popup UI
- `src/app/(provider)/` — Provider preview iframe routes
- `src/components/` — React components
- `src/components/ui/` — Shared UI primitives

## Patterns

### Data Fetching
Always use SWR with `useFetch` from `@gitroom/helpers`:

```tsx
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';

const useMyData = () => {
  const fetch = useFetch();
  return useSWR('/api/my-data', () => fetch('/api/my-data'));
};
```

**Rules:**
- Each SWR call must be in its own hook
- Never nest SWR calls inside return objects
- Never use `eslint-disable-next-line` for hooks

### Styling
- Check `src/app/colors.scss` and `src/app/global.scss` before creating components
- Check `tailwind.config.cjs` for custom theme values
- Do NOT use `--color-custom*` CSS variables (deprecated)
- Check existing components in `src/components/ui/` for design consistency
- Never install frontend component libraries from npm — write native components

### Adding a New Page
1. Create route in `src/app/(app)/` following Next.js App Router conventions
2. Create components in `src/components/`
3. Create SWR hooks for data fetching
4. Use existing UI components from `src/components/ui/`

## Commands
```bash
pnpm run dev:frontend    # Dev server on port 4200
pnpm run build:frontend  # Production build
```

## Environment
Uses `dotenv -e ../../.env` to load root .env file.
Key frontend env vars: `FRONTEND_URL`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY`
