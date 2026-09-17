export const TRACKING_CONSENT_KEY = "koliath_tracking_consent"
export const CONSENT_CHANGE_EVENT = "koliath-tracking-consent"

export type TrackingConsent = "unset" | "granted" | "denied"

export function parseTrackingConsent(raw: string | null | undefined): TrackingConsent {
    if (raw === "granted" || raw === "denied") return raw
    return "unset"
}

export function readTrackingConsent(): TrackingConsent {
    if (typeof window === "undefined") return "unset"
    try {
        return parseTrackingConsent(window.localStorage.getItem(TRACKING_CONSENT_KEY))
    } catch {
        return "unset"
    }
}

export function writeTrackingConsent(value: "granted" | "denied"): void {
    window.localStorage.setItem(TRACKING_CONSENT_KEY, value)
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}

export function onTrackingConsentChange(listener: (value: TrackingConsent) => void): () => void {
    const onCustom = (event: Event) => {
        const detail = (event as CustomEvent<TrackingConsent>).detail
        listener(parseTrackingConsent(detail))
    }
    const onStorage = (event: StorageEvent) => {
        if (event.key === TRACKING_CONSENT_KEY) {
            listener(parseTrackingConsent(event.newValue))
        }
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onCustom)
    window.addEventListener("storage", onStorage)
    return () => {
        window.removeEventListener(CONSENT_CHANGE_EVENT, onCustom)
        window.removeEventListener("storage", onStorage)
    }
}
