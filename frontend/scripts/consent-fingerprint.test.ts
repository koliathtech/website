import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"
import { parseTrackingConsent } from "../src/lib/consent.ts"

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "src")

test("parseTrackingConsent only accepts explicit grant/deny", () => {
    assert.equal(parseTrackingConsent(undefined), "unset")
    assert.equal(parseTrackingConsent(null), "unset")
    assert.equal(parseTrackingConsent(""), "unset")
    assert.equal(parseTrackingConsent("yes"), "unset")
    assert.equal(parseTrackingConsent("granted"), "granted")
    assert.equal(parseTrackingConsent("denied"), "denied")
})

test("FingerprintJS is dynamically imported only after consent", () => {
    const src = readFileSync(join(srcRoot, "hooks/useReferralTracker.ts"), "utf8")
    assert.equal(
        /^\s*import .+from ['"]@fingerprintjs\/fingerprintjs['"]/m.test(src),
        false,
        "useReferralTracker must not statically import FingerprintJS"
    )
    assert.match(src, /import\(\s*['"]@fingerprintjs\/fingerprintjs['"]\s*\)/)
    assert.match(src, /consent !== ['"]granted['"]/)
})

test("privacy and terms routes are registered", () => {
    const app = readFileSync(join(srcRoot, "App.tsx"), "utf8")
    assert.match(app, /path="\/privacy"/)
    assert.match(app, /path="\/terms"/)
    assert.match(app, /ConsentBanner/)
})
