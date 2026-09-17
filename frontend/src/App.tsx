import { Routes, Route } from "react-router-dom"
import Home, { SiteFooter } from "./components/LandingPage"
import BlogComponent from "./components/Blog"
import Navbar from "./components/Navbar"
import { About } from "./components/About"
import CareersPage from "./components/Careers"
import ServicePage from "./components/ServicePage"
import DiabeticAppPage from "./components/DiabeticAppPage"
import RewardPage from "./components/RewardPage"
import ProductsPage from "./components/ProductsPage"
import { PrivacyPage, TermsPage } from "./components/LegalPages"
import { ConsentBanner } from "./components/ConsentBanner"
import { useReferralTracker } from "./hooks/useReferralTracker"
import { useConsent } from "./lib/ConsentProvider"

const App: React.FC = () => {
    useReferralTracker()
    const { bannerVisible } = useConsent()

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<BlogComponent />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/diabetic-app" element={<DiabeticAppPage />} />
                    <Route path="/reward" element={<RewardPage />} />
                    <Route path="/rewards" element={<RewardPage />} />
                    <Route path="/referrals" element={<RewardPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            <SiteFooter />
            {bannerVisible ? <div className="h-56 shrink-0" aria-hidden="true" /> : null}
            <ConsentBanner />
        </div>
    )
}

export default App
