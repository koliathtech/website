import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { LEGAL_ACCOUNT_ERASURE, LEGAL_PRIVACY, LEGAL_TERMS } from "../lib/legalRoutes"

function LegalNav() {
    return (
        <nav className="pt-4 text-sm flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal documents">
            <Link to={LEGAL_PRIVACY}>Privacy Policy</Link>
            <Link to={LEGAL_TERMS}>Terms of Use</Link>
            <Link to={LEGAL_ACCOUNT_ERASURE}>Account erasure</Link>
        </nav>
    )
}

function LegalShell({
    title,
    updated,
    children,
}: {
    title: string
    updated: string
    children: ReactNode
}) {
    return (
        <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
            <p className="text-sm tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Legal</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-3">
                {title}
            </h1>
            <p className="text-sm text-[var(--ink)]/60 mb-10">Last updated {updated}</p>
            <div className="space-y-8 text-[var(--ink)] leading-relaxed [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline [&_a]:text-[var(--accent)]">
                {children}
                <LegalNav />
            </div>
        </article>
    )
}

export function PrivacyPage() {
    return (
        <LegalShell title="Privacy Policy" updated="17 September 2026">
            <section>
                <h2>Who we are</h2>
                <p>
                    Koliath Technology operates the company site and rewards hub for Sapient,
                    Adverts, Diabetic Buddy, and related apps. Contact:{" "}
                    <a href="mailto:hello@koliath.in">hello@koliath.in</a>.
                </p>
            </section>
            <section>
                <h2>What we collect</h2>
                <ul>
                    <li>
                        <strong>Account data</strong> when you sign in with Google on{" "}
                        <Link to="/reward">/reward</Link>: email, name, avatar, and Google subject
                        identifier. We verify the ID token server-side. This runs only when you
                        choose Sign in.
                    </li>
                    <li>
                        <strong>Referral codes</strong> you share or enter (including a <code>?ref=</code>{" "}
                        query parameter).
                    </li>
                    <li>
                        <strong>Device fingerprint (FingerprintJS visitorId)</strong> and referral
                        visit/click events — <em>only after you accept tracking</em> in the consent
                        banner. We do not load FingerprintJS or send tracking requests before
                        consent, or if you reject.
                    </li>
                    <li>
                        <strong>Career applications</strong> you submit (name, email, contact,
                        LinkedIn).
                    </li>
                    <li>
                        <strong>Necessary storage:</strong> your tracking choice (
                        <code>koliath_tracking_consent</code>) and, if you sign in, a Google ID
                        token in localStorage for the session.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Cookies and similar technologies</h2>
                <p>
                    We do not set advertising cookies. Non-essential device fingerprinting and
                    referral analytics cookies/storage are off until you tap{" "}
                    <strong>Accept tracking</strong>. Theme preference, sign-in session, and the
                    consent record itself are first-party and used to operate the site. Google
                    Sign-In may set cookies on Google&apos;s domains when you use that button —
                    covered by Google&apos;s policy.
                </p>
                <p>
                    Change or withdraw tracking consent anytime via{" "}
                    <strong>Cookie settings</strong> in the footer. Rejecting tracking does not
                    block browsing or Google Sign-In.
                </p>
            </section>
            <section>
                <h2>Why we process data</h2>
                <ul>
                    <li>Provide the website, rewards dashboard, and career form.</li>
                    <li>Attribute referrals and limit duplicate reward claims (with consent).</li>
                    <li>Secure the API (auth, rate limits, webhook secrets on the server).</li>
                </ul>
            </section>
            <section>
                <h2>Sharing</h2>
                <p>
                    We do not sell personal data. Processors may include our hosting provider,
                    Postgres host, and Google (Sign-In). Trusted Koliath app backends may send
                    qualification events with a server-side webhook secret — not your Google
                    password.
                </p>
            </section>
            <section>
                <h2>Retention and rights</h2>
                <p>
                    Account and ledger data are kept while the rewards program operates or until
                    you ask us to delete them. Email{" "}
                    <a href="mailto:hello@koliath.in">hello@koliath.in</a> to access, correct, or
                    delete your data. Full erasure instructions:{" "}
                    <Link to={LEGAL_ACCOUNT_ERASURE}>Account erasure</Link>. You may also withdraw
                    tracking consent in Cookie settings.
                </p>
            </section>
            <section>
                <h2>Related</h2>
                <p>
                    Use of the site is also governed by our{" "}
                    <Link to={LEGAL_TERMS}>Terms of Use</Link>.
                </p>
            </section>
        </LegalShell>
    )
}

export function TermsPage() {
    return (
        <LegalShell title="Terms of Use" updated="17 September 2026">
            <section>
                <h2>Agreement</h2>
                <p>
                    By using this site you agree to these terms and the{" "}
                    <Link to={LEGAL_PRIVACY}>Privacy Policy</Link>. If you do not agree, do not use
                    the site or rewards program.
                </p>
            </section>
            <section>
                <h2>The service</h2>
                <p>
                    We publish product information and a rewards hub. Features may change. Gift
                    catalog items are subject to availability; redemptions are reviewed and may be
                    refused for fraud, duplicate accounts, or rule violations.
                </p>
            </section>
            <section>
                <h2>Referral rules</h2>
                <p>
                    Points are awarded only when the referred person meets the per-app rule (for
                    example a full day of genuine Sapient use). Bare installs are not enough.
                    Manipulation, fake devices, or self-referrals may forfeit points. Device
                    fingerprinting, when you consent, is one signal we may use to enforce this.
                </p>
            </section>
            <section>
                <h2>Accounts</h2>
                <p>
                    You must use a Google account you control. You are responsible for activity
                    under that account. We may suspend access for abuse or security reasons. You
                    can request deletion at{" "}
                    <Link to={LEGAL_ACCOUNT_ERASURE}>Account erasure</Link>.
                </p>
            </section>
            <section>
                <h2>Acceptable use</h2>
                <ul>
                    <li>No scraping, attacking, or overloading the API.</li>
                    <li>No reverse-engineering of app qualification webhooks.</li>
                    <li>No unlawful content in career applications or other submissions.</li>
                </ul>
            </section>
            <section>
                <h2>Disclaimer</h2>
                <p>
                    The site and apps are provided “as is.” We do not warrant uninterrupted
                    availability or that rewards will have any particular value. To the extent
                    permitted by law, Koliath is not liable for indirect or consequential loss.
                </p>
            </section>
            <section>
                <h2>Contact</h2>
                <p>
                    Questions: <a href="mailto:hello@koliath.in">hello@koliath.in</a>. Privacy:{" "}
                    <Link to={LEGAL_PRIVACY}>Privacy Policy</Link>.
                </p>
            </section>
        </LegalShell>
    )
}

export function AccountErasurePage() {
    return (
        <LegalShell title="Account erasure" updated="17 September 2026">
            <section>
                <h2>How to request deletion</h2>
                <p>
                    Email{" "}
                    <a href="mailto:hello@koliath.in?subject=Account%20erasure">hello@koliath.in</a>{" "}
                    with the subject line <strong>Account erasure</strong>. Include the Google
                    account email you used on <Link to="/reward">koliath.in/reward</Link> (and, if
                    relevant, the Koliath app: Sapient, Adverts, Diabetic Buddy, or others). We
                    may ask you to confirm control of that inbox.
                </p>
            </section>
            <section>
                <h2>What we delete</h2>
                <p>For the website and global rewards hub, a completed request covers:</p>
                <ul>
                    <li>Your global Koliath profile (Google subject, email, name, avatar URL).</li>
                    <li>Referral codes, points ledger, redemption requests, and linked-app records.</li>
                    <li>
                        Referral visit/click events and FingerprintJS visitorIds stored for
                        attribution (only collected if you accepted tracking — see{" "}
                        <Link to={LEGAL_PRIVACY}>Privacy Policy</Link>).
                    </li>
                    <li>Career applications submitted through this site, if you ask us to include them.</li>
                </ul>
                <p>
                    We cannot delete your Google account itself, or data Google holds under its
                    own Sign-In cookies. In-app data inside Sapient, Adverts, or Diabetic Buddy
                    may need a separate in-app delete (or we will forward the request to that
                    product team). Backups may retain copies until the next scheduled purge.
                </p>
            </section>
            <section>
                <h2>Timeline</h2>
                <p>
                    We aim to confirm receipt within <strong>5 business days</strong> and complete
                    erasure of production records within <strong>30 days</strong> of a verified
                    request, unless a longer period is required by law (for example pending fraud
                    review of a redemption). You will get a short email when the production
                    deletion is done.
                </p>
            </section>
            <section>
                <h2>Related</h2>
                <p>
                    Tracking consent can be withdrawn immediately via Cookie settings without
                    deleting your account. See the <Link to={LEGAL_PRIVACY}>Privacy Policy</Link>{" "}
                    and <Link to={LEGAL_TERMS}>Terms of Use</Link>.
                </p>
            </section>
        </LegalShell>
    )
}
