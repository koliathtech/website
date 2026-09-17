#!/usr/bin/env node
/**
 * Shipping-bar guard: App.tsx must register Adverts BrandConfig legal paths.
 * Invoked from .github/workflows/frontend-api-guard.yml so the check is
 * visible in CI, not only a unit test.
 */
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const appPath = path.join(frontend, "src/App.tsx")
const footerPath = path.join(frontend, "src/components/LandingPage.tsx")
const app = readFileSync(appPath, "utf8")
const footer = readFileSync(footerPath, "utf8")

const requiredRoutes = ["/legal/privacy", "/legal/terms", "/legal/account-erasure"]
let failed = false

for (const route of requiredRoutes) {
    if (!app.includes(route)) {
        console.error(`FAIL: ${path.relative(frontend, appPath)} does not contain route ${route}`)
        failed = true
    } else {
        console.log(`OK: App.tsx contains ${route}`)
    }
}

const requiredFooterSymbols = ["LEGAL_PRIVACY", "LEGAL_TERMS", "LEGAL_ACCOUNT_ERASURE"]
for (const symbol of requiredFooterSymbols) {
    if (!footer.includes(symbol)) {
        console.error(
            `FAIL: SiteFooter (components/LandingPage.tsx) is missing ${symbol} legal link`
        )
        failed = true
    } else {
        console.log(`OK: SiteFooter uses ${symbol}`)
    }
}

if (failed) process.exit(1)
