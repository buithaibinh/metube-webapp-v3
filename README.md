# metube.one — Webapp

Nuxt 3 static frontend for [metube.one](https://www.metube.one). Uses **legacy production APIs** (yt-dlp API Gateway, Cognito video API, AppSync realtime) — same backend as v2.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run generate` | Static export → `.output/public` |
| `npm run preview` | Preview static build |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` → `.env`. Production defaults are baked into `nuxt.config.ts`; override only when needed.

Required for SEO in production:

```env
NUXT_PUBLIC_SITE_URL=https://www.metube.one
```

Google Analytics (v2 property, production only by default):

```env
NUXT_PUBLIC_GTAG_ID=G-SXH8ELV4BT
```

## Deploy (AWS Amplify)

1. Create a **new** Amplify app → connect **this repository** (repo root = this folder).
2. **Do not** enable monorepo — no `AMPLIFY_MONOREPO_APP_ROOT`.
3. Amplify auto-detects `amplify.yml` at repo root.
4. Set env: `NUXT_PUBLIC_SITE_URL=https://www.metube.one`
5. Add SPA rewrite: `/<*>` → `/index.html` (200).

See [docs/deploy-amplify.md](./docs/deploy-amplify.md) for checklist.

## i18n sync from v2 (optional)

```bash
V2_I18N_DIR=/path/to/v2/web-app/i18n node i18n/scripts/sync-locales.mjs
```
