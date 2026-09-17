import { Link } from "react-router-dom"
import { useConsent } from "../lib/ConsentProvider"

export function CookieSettingsButton({ underline = false }: { underline?: boolean }) {
    const { openPreferences } = useConsent()
    return (
        <button
            type="button"
            onClick={openPreferences}
            className={`hover:text-[var(--ink)] text-left ${underline ? "underline" : ""}`}
        >
            Cookie settings
        </button>
    )
}

export function ConsentBanner() {
    const { grant, deny, bannerVisible } = useConsent()
    if (!bannerVisible) return null

    return (
        <aside
            role="region"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
            className="fixed bottom-0 inset-x-0 z-[80] border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl shadow-[0_-12px_40px_-20px_rgba(15,40,35,0.45)]"
        >
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <h2 id="cookie-consent-title" className="font-semibold text-[var(--ink)] mb-1.5">
                        Tracking & device fingerprint
                    </h2>
                    <p id="cookie-consent-desc" className="text-sm text-[var(--muted)] leading-relaxed">
                        We use FingerprintJS and referral visit events only after you accept. This is
                        optional: it helps attribute invites and reduce duplicate rewards. Rejecting
                        still lets you browse, sign in, and use the site. Read our{" "}
                        <Link to="/privacy" className="underline text-[var(--ink)] hover:text-[var(--accent)]">
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link to="/terms" className="underline text-[var(--ink)] hover:text-[var(--accent)]">
                            Terms
                        </Link>
                        . You can change this anytime via Cookie settings in the footer.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={deny}
                        className="px-4 py-2.5 rounded-full border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:bg-black/[0.04]"
                    >
                        Reject tracking
                    </button>
                    <button
                        type="button"
                        onClick={grant}
                        className="px-4 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-medium hover:opacity-90"
                    >
                        Accept tracking
                    </button>
                </div>
            </div>
        </aside>
    )
}
