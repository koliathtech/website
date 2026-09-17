"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleIdToken = verifyGoogleIdToken;
exports.requireAuth = requireAuth;
exports.optionalAuth = optionalAuth;
exports.requireAppWebhook = requireAppWebhook;
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("./config");
const client = new google_auth_library_1.OAuth2Client(config_1.config.googleClientId);
function verifyGoogleIdToken(idToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!config_1.config.googleClientId) {
            throw Object.assign(new Error("Google Sign-In is not configured"), { status: 503 });
        }
        const ticket = yield client.verifyIdToken({
            idToken,
            audience: config_1.config.googleClientId,
        });
        const payload = ticket.getPayload();
        if (!(payload === null || payload === void 0 ? void 0 : payload.sub) || !payload.email) {
            throw Object.assign(new Error("Invalid Google token"), { status: 401 });
        }
        if (payload.email_verified === false) {
            throw Object.assign(new Error("Email not verified with Google"), { status: 401 });
        }
        return {
            googleSub: payload.sub,
            email: payload.email.toLowerCase(),
            name: (_a = payload.name) !== null && _a !== void 0 ? _a : payload.email,
            picture: payload.picture,
            emailVerified: true,
        };
    });
}
function extractBearer(req) {
    const header = req.headers.authorization;
    if (!(header === null || header === void 0 ? void 0 : header.startsWith("Bearer ")))
        return null;
    return header.slice(7).trim() || null;
}
/** Requires a valid Google ID token in Authorization: Bearer <token> */
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = extractBearer(req);
            if (!token) {
                return res.status(401).json({ success: false, message: "Authentication required" });
            }
            req.authUser = yield verifyGoogleIdToken(token);
            return next();
        }
        catch (e) {
            const status = typeof e === "object" && e && "status" in e ? Number(e.status) : 401;
            const message = e instanceof Error ? e.message : "Unauthorized";
            return res.status(status).json({ success: false, message });
        }
    });
}
/** Optional auth — attaches user when token present, otherwise continues. */
function optionalAuth(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = extractBearer(req);
            if (token) {
                req.authUser = yield verifyGoogleIdToken(token);
            }
        }
        catch (_a) {
            // ignore invalid optional tokens
        }
        return next();
    });
}
/**
 * Shared secret for trusted mobile/backend webhooks.
 * In production the secret is required. In development an empty secret
 * allows local app wiring without blocking signup flows.
 */
function requireAppWebhook(req, res, next) {
    if (!config_1.config.appWebhookSecret) {
        if (config_1.config.isProd) {
            return res.status(503).json({ success: false, message: "Webhook secret not configured" });
        }
        return next();
    }
    const secret = req.headers["x-koliath-webhook-secret"];
    if (typeof secret !== "string" || secret !== config_1.config.appWebhookSecret) {
        return res.status(401).json({ success: false, message: "Invalid webhook secret" });
    }
    return next();
}
