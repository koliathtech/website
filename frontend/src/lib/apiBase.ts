import { resolveApiRoot } from "./resolveApiRoot"

/**
 * Build-time API origin. Empty in local `vite` dev (same-origin + proxy).
 * Production bundles throw at module load if `VITE_API_BASE` is missing,
 * not HTTPS, or points at loopback — never silently call localhost.
 */
export const API_ROOT = resolveApiRoot(
    import.meta.env.VITE_API_BASE,
    import.meta.env.PROD
)

export function apiUrl(path: string): string {
    const suffix = path.startsWith("/") ? path : `/${path}`
    return `${API_ROOT}${suffix}`
}
