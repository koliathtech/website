import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"
import {
    onTrackingConsentChange,
    readTrackingConsent,
    writeTrackingConsent,
    type TrackingConsent,
} from "./consent"

interface ConsentContextValue {
    consent: TrackingConsent
    bannerVisible: boolean
    grant: () => void
    deny: () => void
    openPreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<TrackingConsent>("unset")
    const [preferencesOpen, setPreferencesOpen] = useState(false)

    useEffect(() => {
        setConsent(readTrackingConsent())
        return onTrackingConsentChange(setConsent)
    }, [])

    const grant = useCallback(() => {
        writeTrackingConsent("granted")
        setConsent("granted")
        setPreferencesOpen(false)
    }, [])

    const deny = useCallback(() => {
        writeTrackingConsent("denied")
        setConsent("denied")
        setPreferencesOpen(false)
    }, [])

    const openPreferences = useCallback(() => {
        setPreferencesOpen(true)
    }, [])

    const bannerVisible = consent === "unset" || preferencesOpen

    const value = useMemo(
        () => ({ consent, bannerVisible, grant, deny, openPreferences }),
        [consent, bannerVisible, grant, deny, openPreferences]
    )

    useEffect(() => {
        document.body.style.paddingBottom = bannerVisible ? "13rem" : ""
        return () => {
            document.body.style.paddingBottom = ""
        }
    }, [bannerVisible])

    return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
    const ctx = useContext(ConsentContext)
    if (!ctx) throw new Error("useConsent must be used within ConsentProvider")
    return ctx
}
