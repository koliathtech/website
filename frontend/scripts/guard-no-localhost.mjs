#!/usr/bin/env node
/**
 * Shipping-bar guard: frontend/src must never hardcode the local API.
 * vite.config.ts may still proxy to the backend in development.
 */
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const SRC_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src")
const FORBIDDEN = /localhost:3000|127\.0\.0\.1:3000|\[::1\]:3000/i
const SOURCE = /\.(ts|tsx|js|jsx|mjs|cjs)$/

/** @param {string} dir @param {string[]} hits */
async function walk(dir, hits) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            await walk(full, hits)
            continue
        }
        if (!SOURCE.test(entry.name)) continue
        const text = await readFile(full, "utf8")
        const lines = text.split("\n")
        for (let i = 0; i < lines.length; i++) {
            if (FORBIDDEN.test(lines[i])) {
                hits.push(`${path.relative(SRC_ROOT, full)}:${i + 1}: ${lines[i].trim()}`)
            }
        }
    }
}

const hits = []
await walk(SRC_ROOT, hits)
if (hits.length > 0) {
    console.error("Forbidden loopback API host in frontend/src:\n" + hits.join("\n"))
    process.exit(1)
}
console.log("OK: no localhost:3000 (or 127.0.0.1:3000) in frontend/src")
