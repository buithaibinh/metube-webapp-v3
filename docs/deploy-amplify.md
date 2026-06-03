# Deploy on AWS Amplify

Standalone repo — **no monorepo settings**.

## Connect repository

1. Amplify Console → **Create new app** → Host web app.
2. Connect Git provider and select this repo.
3. **Uncheck** “My app is a monorepo” (or leave app root empty).
4. Build uses root `amplify.yml`:

```yaml
preBuild: npm ci
build: npm run generate
artifacts: .output/public
```

## Environment variables

| Variable | Example |
|----------|---------|
| `NUXT_PUBLIC_SITE_URL` | `https://www.metube.one` |

Optional overrides: see `.env.example` (yt-dlp API, Cognito, AppSync keys).

## SPA routing

Amplify → **Rewrites and redirects**:

| Source | Target | Type |
|--------|--------|------|
| `/<*>` | `/index.html` | 200 (Rewrite) |

## Go-live checklist

- [ ] Build succeeds; artifact is `.output/public`
- [ ] `/`, `/youtube`, `/terms`, `/policy` open directly
- [ ] Paste URL → video info loads
- [ ] Queue download + AppSync update (or Refresh button)
- [ ] `https://www.metube.one/og/og-default.png` loads
