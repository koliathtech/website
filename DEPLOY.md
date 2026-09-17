# Production deploy (`koliath.in`)

This is the runbook for a real production deploy. **Do not commit secrets.** Copy
examples below into your host’s secret store / CI variables only.

The production frontend **will not build** unless `VITE_API_BASE` is a public
`https://` origin (never localhost, never `http://`). The production backend
**will not boot** unless `DATABASE_URL` and `APP_WEBHOOK_SECRET` are set.

## Required variables

### Frontend (build time — baked into the static bundle)

| Variable | Example (not a real secret) | Notes |
|----------|-----------------------------|--------|
| `VITE_API_BASE` | `https://koliath.in` or `https://api.koliath.in` | Required `https://` origin. Same-host reverse-proxy: use the site origin. CI uses `https://example.com` as a dummy. |
| `VITE_GOOGLE_CLIENT_ID` | `123-abc.apps.googleusercontent.com` | OAuth Web client; must match backend `GOOGLE_CLIENT_ID`. |

### Backend (runtime)

| Variable | Example (not a real secret) | Notes |
|----------|-----------------------------|--------|
| `NODE_ENV` | `production` | Enables fail-closed checks. |
| `DATABASE_URL` | `postgres://app:CHANGE_ME@db.internal:5432/koliath` | Required in production. No default. |
| `APP_WEBHOOK_SECRET` | `CHANGE_ME_to_a_long_random_string` | Required in production. Trusted apps send `X-Koliath-Webhook-Secret`. |
| `GOOGLE_CLIENT_ID` | same as `VITE_GOOGLE_CLIENT_ID` | Audience for ID-token verification. |
| `CORS_ORIGINS` | `https://koliath.in,https://www.koliath.in` | Allowlist only. |
| `PORT` | `3000` | Optional; platform may inject this. |

Never put production passwords, webhook secrets, or live OAuth clients in git.
`.env` files are gitignored; only `.env.example` is tracked.

## Prove the production frontend build

CI (`.github/workflows/frontend-api-guard.yml`) runs:

```bash
cd frontend
npm ci
VITE_API_BASE=https://example.com npm run build
```

That is a real `vite build` in production mode. The dummy origin is public
HTTPS and is **not** a credential.

Locally, before a release:

```bash
cd frontend
VITE_API_BASE=https://koliath.in npm run build
# serve frontend/dist behind HTTPS; reverse-proxy /api to the Node service
# OR set VITE_API_BASE=https://api.koliath.in if the API is on a subdomain
```

A missing / `http://` / loopback `VITE_API_BASE` fails the build on purpose.

## Prove the production backend config

```bash
cd backend
cp .env.example .env   # local only; fill real values in the host secret store
npm install
npm run build          # emits backend/dist (gitignored)

# These must fail (no secrets in the environment):
env -u DATABASE_URL -u APP_WEBHOOK_SECRET NODE_ENV=production node dist/index.js
# Expected: Missing required environment variable: DATABASE_URL
# (or APP_WEBHOOK_SECRET once DATABASE_URL is set)
```

Boot for real only with all three of `NODE_ENV=production`, `DATABASE_URL`, and
`APP_WEBHOOK_SECRET` provided by the platform (Cloud Run, Fly, systemd, etc.).

## Suggested topology

1. TLS terminator (CDN or load balancer) for `https://koliath.in`.
2. Static `frontend/dist` on the same host or object storage.
3. Reverse-proxy `/api`, `/health`, `/careers` to Node, **or** point
   `VITE_API_BASE` at `https://api.koliath.in` and set CORS.
4. Postgres reachable only on a private network.
5. Rotate `APP_WEBHOOK_SECRET` independently of Google client IDs.

## Privacy / tracking in production

FingerprintJS and referral visit tracking run **only after** the visitor
accepts the consent banner. Privacy Policy: `/privacy`. Terms: `/terms`.
This is independent of the env vars above.
