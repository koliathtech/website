import assert from "node:assert/strict"
import { test } from "node:test"
import { isLoopbackHostname, resolveApiRoot } from "../src/lib/resolveApiRoot.ts"

test("dev: empty env uses same-origin (Vite proxy)", () => {
    assert.equal(resolveApiRoot(undefined, false), "")
    assert.equal(resolveApiRoot("  ", false), "")
})

test("dev: explicit loopback origin is allowed", () => {
    assert.equal(resolveApiRoot("http://localhost:3000", false), "http://localhost:3000")
    assert.equal(resolveApiRoot("http://localhost:3000/api", false), "http://localhost:3000")
})

test("prod: missing VITE_API_BASE fails loudly", () => {
    assert.throws(() => resolveApiRoot(undefined, true), /required for production/)
    assert.throws(() => resolveApiRoot("", true), /required for production/)
})

test("prod: HTTPS origin is required", () => {
    assert.equal(resolveApiRoot("https://koliath.in", true), "https://koliath.in")
    assert.equal(resolveApiRoot("https://koliath.in/", true), "https://koliath.in")
    assert.equal(resolveApiRoot("https://koliath.in/api", true), "https://koliath.in")
    assert.equal(resolveApiRoot("https://api.koliath.in", true), "https://api.koliath.in")
})

test("prod: cleartext HTTP is rejected", () => {
    assert.throws(() => resolveApiRoot("http://koliath.in", true), /HTTPS/)
})

test("prod: loopback is rejected even over HTTPS", () => {
    assert.throws(() => resolveApiRoot("https://localhost", true), /loopback/)
    assert.throws(() => resolveApiRoot("https://127.0.0.1", true), /loopback/)
    assert.throws(() => resolveApiRoot("http://localhost:3000", true), /HTTPS|loopback/)
})

test("prod: relative or garbage values fail", () => {
    assert.throws(() => resolveApiRoot("/api", true), /https:\/\//)
    assert.throws(() => resolveApiRoot("koliath.in", true), /https:\/\//)
})

test("loopback hostname detection", () => {
    assert.equal(isLoopbackHostname("localhost"), true)
    assert.equal(isLoopbackHostname("127.0.0.1"), true)
    assert.equal(isLoopbackHostname("::1"), true)
    assert.equal(isLoopbackHostname("[::1]"), true)
    assert.equal(isLoopbackHostname("app.localhost"), true)
    assert.equal(isLoopbackHostname("koliath.in"), false)
    assert.equal(isLoopbackHostname("api.koliath.in"), false)
})
