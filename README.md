# Koliath website + rewards platform (`koliath.in`)

Company site and global referral hub for Sapient, Adverts, Advert Cohort,
Adverts Rewards, and Diabetic Buddy.

## Stack

- **Frontend:** React + Vite + Tailwind (`frontend/`)
- **Backend:** Express + Postgres (`backend/`)
- **Auth:** Google Sign-In (ID token verified server-side)

## Routes

| Path | Purpose |
|------|---------|
| `/` | Company homepage |
| `/products` | Product briefs for every Koliath app |
| `/reward` | Google login + points dashboard + gift catalog |
| `/privacy` | Privacy Policy (FingerprintJS, cookies, account data) |
| `/terms` | Terms of Use |
| `/service`, `/about`, `/careers`, `/blog` | Studio pages |

`/rewards` and `/referrals` redirect to the same reward experience.

## Referral rules (server-enforced)

| App | Points confirm when |
|-----|---------------------|
| Sapient | Referred user is active for one full day (`day_active`) |
| Adverts | Successful purchase (`purchase` — webhook ready, app wiring later) |
| Diabetic Buddy | Signup / first onboarding (`signup`) |
| Adverts Rewards | First verified watch day |
| Advert Cohort | Profile + rate card activity |

Apps post qualification events to:

```http
POST /api/referrals/qualify
Header: X-Koliath-Webhook-Secret: <APP_WEBHOOK_SECRET>
Body: { referrerCode, referredEmail, deviceId, sourceApp, event }
```

## Local setup

### 1. Postgres

```bash
# DATABASE_URL default: postgres://postgres:postgres@localhost:5433/mydb
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# set GOOGLE_CLIENT_ID, APP_WEBHOOK_SECRET, DATABASE_URL
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# set VITE_GOOGLE_CLIENT_ID to the same OAuth Web client ID
# leave VITE_API_BASE empty so Vite proxies /api to the local backend
npm install
npm run dev
```

### Google Cloud console

1. Create an OAuth 2.0 **Web** client.
2. Authorized JavaScript origins: `http://localhost:5173`, `https://koliath.in`
3. Authorized redirect URIs: same origins (GIS popup flow).

## Production (koliath.in)

See **[DEPLOY.md](./DEPLOY.md)** for the full runbook (required `VITE_API_BASE`,
`DATABASE_URL`, `APP_WEBHOOK_SECRET`, dummy CI build, and secret handling).

1. Set `VITE_API_BASE` to an **https://** origin (for example `https://koliath.in` when `/api` is reverse-proxied on the same host, or `https://api.koliath.in` for a subdomain). Production builds fail if this is missing, `http://`, or loopback.
2. Build frontend: `cd frontend && npm run build` → serve `dist/` on the domain.
3. Run backend behind HTTPS (Node, Docker, or Cloud Run) with `NODE_ENV=production`.
4. Set remaining env vars from `.env.example` files; never commit `.env` files or secrets. Production backend refuses to boot without `DATABASE_URL` and `APP_WEBHOOK_SECRET`.
5. Point `CORS_ORIGINS` at `https://koliath.in,https://www.koliath.in`.

CI proves a production `vite build` with dummy `VITE_API_BASE=https://example.com` (not a secret).

## Privacy and tracking consent

FingerprintJS and referral visit tracking are **off until the visitor accepts**
the site-wide consent banner. Rejecting tracking still allows browsing and
Google Sign-In. Policies: `/privacy`, `/terms`. Cookie settings in the footer
re-opens the banner.

## Security practices included

- Google ID tokens verified with `google-auth-library` (audience-bound)
- Helmet, CORS allowlist, JSON body size limit, rate limits
- Redeem / stats require authenticated ownership of the global account
- Qualification and register endpoints require webhook secret in production
- Env-based DB URL (no hardcoded production credentials)
- Frontend API origin from `VITE_API_BASE` (HTTPS required in production; no localhost fallback)
- Production backend requires `DATABASE_URL` and `APP_WEBHOOK_SECRET` (no empty defaults)
- FingerprintJS / referral tracking only after explicit consent
- Parameterized SQL only

## Linking mobile apps

After Google sign-in on `/reward`, apps can call (with the user’s Google ID token):

```http
POST /api/me/link-app
Authorization: Bearer <google-id-token>
{ "sourceApp": "sapient", "appUid": "<firebase-uid>", "referralCode": "SP-XXXX" }
```

Using the **same Google email** across apps is what unifies the global ledger.
