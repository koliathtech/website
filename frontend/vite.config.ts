import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path" // <-- import path

// https://vite.dev/config/
export default defineConfig({
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
                target: "http://localhost:3000/",
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy) => {
                    proxy.on("error", (err) => {
                        console.log("proxy error", err)
                    })
                    proxy.on("proxyReq", (_proxyReq, req) => {
                        console.log(
                            "Sending Request to the Target:",
                            req.method,
                            req.url
                        )
                    })
                    proxy.on("proxyRes", (proxyRes, req) => {
                        console.log(
                            "Received Response from the Target:",
                            proxyRes.statusCode,
                            req.url
                        )
                    })
                },
            },
        },
    },
})
