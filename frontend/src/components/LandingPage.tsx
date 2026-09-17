import { HeroSection } from "./hero-section"
import { WhyWorkWithUs } from "./why-work-with-us"
import { ProductsShowcase } from "./ProductsPage"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
}

export default function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />

            <ProductsShowcase compact />

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="px-6 py-20"
            >
                <div className="max-w-6xl mx-auto rounded-[2rem] border border-[var(--line)] overflow-hidden relative reward-band">
                    <div className="relative z-10 p-10 md:p-14 max-w-2xl">
                        <p className="text-sm tracking-[0.18em] uppercase text-[var(--accent)] mb-3">
                            Rewards
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-[var(--ink)]">
                            Refer across every Koliath app
                        </h2>
                        <p className="text-[var(--muted)] mb-8 leading-relaxed">
                            One Google login. Separate qualification rules for Sapient, Adverts,
                            Diabetic Buddy, and more. Redeem gift cards when points confirm.
                        </p>
                        <Link
                            to="/reward"
                            className="inline-flex items-center rounded-full bg-[var(--ink)] text-white px-6 py-3 text-sm hover:opacity-90 transition-opacity"
                        >
                            Go to /reward
                        </Link>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <WhyWorkWithUs />
            </motion.section>
        </div>
    )
}

export function SiteFooter() {
    return (
        <footer className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]">
            <div className="max-w-6xl mx-auto py-16 px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <h3 className="font-display text-2xl font-semibold text-[var(--ink)] mb-4">
                            Koliath
                        </h3>
                        <p className="max-w-sm leading-relaxed">
                            AI product studio shipping Sapient, Adverts, and Diabetic Buddy —
                            with a shared rewards identity on koliath.in.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--ink)] mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products" className="hover:text-[var(--ink)]">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/reward" className="hover:text-[var(--ink)]">
                                    Reward
                                </Link>
                            </li>
                            <li>
                                <Link to="/service" className="hover:text-[var(--ink)]">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-[var(--ink)]">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--ink)] mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:hello@koliath.in" className="hover:text-[var(--ink)]">
                                    hello@koliath.in
                                </a>
                            </li>
                            <li>
                                <Link to="/careers" className="hover:text-[var(--ink)]">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-[var(--line)] text-sm">
                    © {new Date().getFullYear()} Koliath Technology. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
