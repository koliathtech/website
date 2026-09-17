import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

/**
 * Production builds must bake in an https:// API origin.
 * Keep this aligned with `src/lib/resolveApiRoot.ts` (that module is the runtime source of truth;
 * this check fails the build before a loopback/cleartext URL can ship).
 */
function assertProductionApiBase(raw: string | undefined) {
    const trimmed = (raw ?? "").trim()
    if (!trimmed) {
        throw new Error(
            "VITE_API_BASE is required for production builds. Set it to an https:// origin such as https://koliath.in."
        )
    }
    let url: URL
    try {
        url = new URL(trimmed)
    } catch {
        throw new Error(`VITE_API_BASE must be a full https:// URL in production (got "${trimmed}").`)
    }
    if (url.protocol !== "https:") {
        throw new Error(
            `VITE_API_BASE must use HTTPS in production; cleartext ${url.protocol}// is not allowed.`
        )
    }
    const host = url.hostname.toLowerCase()
    const isLoopback =
        host === "localhost" ||
        host === "::1" ||
        host === "0.0.0.0" ||
        host.endsWith(".localhost") ||
        /^127(?:\.\d{1,3}){3}$/.test(host)
    if (isLoopback) {
        throw new Error(`VITE_API_BASE must not target loopback (${url.host}) in production.`)
    }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "")
    if (command === "build" && mode === "production") {
        assertProductionApiBase(env.VITE_API_BASE)
    }

    return {
        plugins: [
            react({
                babel: {
                    plugins: [["babel-plugin-react-compiler"]],
                },
            }),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                "@": path.resolve(process.cwd(), "src"),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    secure: false,
                },
                "/careers": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                },
                "/health": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                },
            },
        },
    }
})
