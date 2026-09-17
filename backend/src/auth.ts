import type { Request, Response, NextFunction } from "express"
import { OAuth2Client } from "google-auth-library"
import { config } from "./config"

const client = new OAuth2Client(config.googleClientId)

export interface AuthUser {
    googleSub: string
    email: string
    name: string
    picture?: string
    emailVerified: boolean
}

declare global {
    namespace Express {
        interface Request {
            authUser?: AuthUser
        }
    }
}

export async function verifyGoogleIdToken(idToken: string): Promise<AuthUser> {
    if (!config.googleClientId) {
        throw Object.assign(new Error("Google Sign-In is not configured"), { status: 503 })
    }

    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.googleClientId,
    })
    const payload = ticket.getPayload()
    if (!payload?.sub || !payload.email) {
        throw Object.assign(new Error("Invalid Google token"), { status: 401 })
    }
    if (payload.email_verified === false) {
        throw Object.assign(new Error("Email not verified with Google"), { status: 401 })
    }

    return {
        googleSub: payload.sub,
        email: payload.email.toLowerCase(),
        name: payload.name ?? payload.email,
        picture: payload.picture,
        emailVerified: true,
    }
}

function extractBearer(req: Request): string | null {
    const header = req.headers.authorization
    if (!header?.startsWith("Bearer ")) return null
    return header.slice(7).trim() || null
}

/** Requires a valid Google ID token in Authorization: Bearer <token> */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = extractBearer(req)
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required" })
        }
        req.authUser = await verifyGoogleIdToken(token)
        return next()
    } catch (e: unknown) {
        const status = typeof e === "object" && e && "status" in e ? Number((e as { status: number }).status) : 401
        const message = e instanceof Error ? e.message : "Unauthorized"
        return res.status(status).json({ success: false, message })
    }
}

/** Optional auth — attaches user when token present, otherwise continues. */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = extractBearer(req)
        if (token) {
            req.authUser = await verifyGoogleIdToken(token)
        }
    } catch {
        // ignore invalid optional tokens
    }
    return next()
}

/**
 * Shared secret for trusted mobile/backend webhooks.
 * In production the secret is required. In development an empty secret
 * allows local app wiring without blocking signup flows.
 */
export function requireAppWebhook(req: Request, res: Response, next: NextFunction) {
    if (!config.appWebhookSecret) {
        if (config.isProd) {
            return res.status(503).json({ success: false, message: "Webhook secret not configured" })
        }
        return next()
    }
    const secret = req.headers["x-koliath-webhook-secret"]
    if (typeof secret !== "string" || secret !== config.appWebhookSecret) {
        return res.status(401).json({ success: false, message: "Invalid webhook secret" })
    }
    return next()
}
