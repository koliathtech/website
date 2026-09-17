const LOOPBACK_HOSTS = new Set(["localhost", "0.0.0.0", "::1"])

/** True for localhost, RFC-1918-adjacent loopback, and *.localhost. */
export function isLoopbackHostname(hostname: string): boolean {
    const host = hostname.trim().toLowerCase()
    const bare = host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host
    if (LOOPBACK_HOSTS.has(bare) || bare.endsWith(".localhost")) return true
    return /^127(?:\.\d{1,3}){3}$/.test(bare)
}

function normalizeRaw(raw: string | undefined): string {
    return (raw ?? "").trim().replace(/\/+$/, "")
}

/** Origin only; a trailing `/api` path is stripped so callers can always prefix `/api/...`. */
function canonicalRoot(url: URL): string {
    const path = url.pathname.replace(/\/+$/, "")
    const prefix = path === "/api" || path === "" ? "" : path
    return `${url.origin}${prefix}`
}

/**
 * Resolve the API origin used by referral tracking and rewards clients.
 *
 * - Development: empty `VITE_API_BASE` → same-origin (`""`) so Vite can proxy `/api`.
 *   Loopback HTTP is allowed when explicitly configured.
 * - Production: `VITE_API_BASE` is required, must be `https://`, and must not be loopback.
 */
export function resolveApiRoot(raw: string | undefined, isProd: boolean): string {
    const trimmed = normalizeRaw(raw)

    if (!isProd) {
        if (!trimmed) return ""
        try {
            return canonicalRoot(new URL(trimmed))
        } catch {
            return trimmed
        }
    }

    if (!trimmed) {
        throw new Error(
            "VITE_API_BASE is required for production builds. Set it to an https:// origin such as https://koliath.in (do not commit secrets)."
        )
    }

    let url: URL
    try {
        url = new URL(trimmed)
    } catch {
        throw new Error(
            `VITE_API_BASE must be a full https:// URL in production (got "${trimmed}").`
        )
    }

    if (url.protocol !== "https:") {
        throw new Error(
            `VITE_API_BASE must use HTTPS in production; cleartext ${url.protocol}// is not allowed.`
        )
    }

    if (isLoopbackHostname(url.hostname)) {
        throw new Error(
            `VITE_API_BASE must not target loopback (${url.host}) in production.`
        )
    }

    return canonicalRoot(url)
}
