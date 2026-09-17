import "dotenv/config"

function required(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

const isProd = process.env.NODE_ENV === "production"

export const config = {
    port: Number(process.env.PORT ?? 3000),
    isProd,
    databaseUrl: required(
        "DATABASE_URL",
        isProd ? undefined : "postgres://postgres:postgres@localhost:5433/mydb"
    ),
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
    /** Shared secret for trusted app backends (Sapient, Adverts, Diabetic) to post qualification events. */
    appWebhookSecret: process.env.APP_WEBHOOK_SECRET ?? "",
    corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:5173,https://koliath.in,https://www.koliath.in")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    cookieSecure: isProd,
}

export const POINTS_PER_REFERRAL = 100
