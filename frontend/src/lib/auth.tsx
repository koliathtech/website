import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google"
import { exchangeGoogleToken, fetchMe, type DashboardUser } from "./api"

const TOKEN_KEY = "koliath_google_id_token"
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

interface AuthContextValue {
    user: DashboardUser | null
    idToken: string | null
    loading: boolean
    configured: boolean
    signInWithCredential: (credential: string) => Promise<void>
    signOut: () => void
    refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthInner({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<DashboardUser | null>(null)
    const [idToken, setIdToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
    const [loading, setLoading] = useState(true)

    const refresh = useCallback(async () => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (!token) {
            setUser(null)
            setIdToken(null)
            setLoading(false)
            return
        }
        try {
            const me = await fetchMe(token)
            setUser(me)
            setIdToken(token)
        } catch {
            localStorage.removeItem(TOKEN_KEY)
            setUser(null)
            setIdToken(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void refresh()
    }, [refresh])

    const signInWithCredential = useCallback(async (credential: string) => {
        setLoading(true)
        try {
            const dashboard = await exchangeGoogleToken(credential)
            localStorage.setItem(TOKEN_KEY, credential)
            setIdToken(credential)
            setUser(dashboard)
        } finally {
            setLoading(false)
        }
    }, [])

    const signOut = useCallback(() => {
        googleLogout()
        localStorage.removeItem(TOKEN_KEY)
        setIdToken(null)
        setUser(null)
    }, [])

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            idToken,
            loading,
            configured: Boolean(CLIENT_ID),
            signInWithCredential,
            signOut,
            refresh,
        }),
        [user, idToken, loading, signInWithCredential, signOut, refresh]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    if (!CLIENT_ID) {
        return (
            <AuthContext.Provider
                value={{
                    user: null,
                    idToken: null,
                    loading: false,
                    configured: false,
                    signInWithCredential: async () => undefined,
                    signOut: () => undefined,
                    refresh: async () => undefined,
                }}
            >
                {children}
            </AuthContext.Provider>
        )
    }

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <AuthInner>{children}</AuthInner>
        </GoogleOAuthProvider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}
