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
import { useReferralTracker } from "./hooks/useReferralTracker"

const App: React.FC = () => {
    useReferralTracker()

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
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            <SiteFooter />
        </div>
    )
}

export default App
