"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.POINTS_PER_REFERRAL = exports.config = void 0;
require("dotenv/config");
function required(name, fallback) {
    var _a;
    const value = (_a = process.env[name]) !== null && _a !== void 0 ? _a : fallback;
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
const isProd = process.env.NODE_ENV === "production";
exports.config = {
    port: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
    isProd,
    databaseUrl: required("DATABASE_URL", isProd ? undefined : "postgres://postgres:postgres@localhost:5433/mydb"),
    googleClientId: (_b = process.env.GOOGLE_CLIENT_ID) !== null && _b !== void 0 ? _b : "",
    /** Shared secret for trusted app backends (Sapient, Adverts, Diabetic) to post qualification events. */
    appWebhookSecret: (_c = process.env.APP_WEBHOOK_SECRET) !== null && _c !== void 0 ? _c : "",
    corsOrigins: ((_d = process.env.CORS_ORIGINS) !== null && _d !== void 0 ? _d : "http://localhost:5173,https://koliath.in,https://www.koliath.in")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    cookieSecure: isProd,
};
exports.POINTS_PER_REFERRAL = 100;
