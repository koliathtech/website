import React, { useState } from "react"
import { Code, Globe, Smartphone, Database, Shield, Zap } from "lucide-react"

interface Service {
    id: number
    icon: React.ReactNode
    title: string
    description: string
    features: string[]
}

const ServicesPage: React.FC = () => {
    const [activeService, setActiveService] = useState<number | null>(null)

    const services: Service[] = [
        {
            id: 1,
            icon: <Code size={32} />,
            title: "Custom Software Development",
            description:
                "Tailored software solutions designed to meet your unique business requirements and drive operational efficiency.",
            features: [
                "Enterprise Applications",
                "Legacy System Modernization",
                "API Development",
            ],
        },
        {
            id: 2,
            icon: <Globe size={32} />,
            title: "Web Development",
            description:
                "Modern, responsive websites and web applications built with cutting-edge technologies for optimal performance.",
            features: [
                "Full-Stack Development",
                "E-commerce Solutions",
                "Progressive Web Apps",
            ],
        },
        {
            id: 3,
            icon: <Smartphone size={32} />,
            title: "Mobile App Development",
            description:
                "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
            features: [
                "iOS & Android",
                "Cross-Platform Solutions",
                "UI/UX Design",
            ],
        },
        {
            id: 4,
            icon: <Database size={32} />,
            title: "Cloud Solutions",
            description:
                "Scalable cloud infrastructure and migration services to enhance your business agility and reduce costs.",
            features: [
                "Cloud Migration",
                "Infrastructure Management",
                "DevOps Services",
            ],
        },
        {
            id: 5,
            icon: <Shield size={32} />,
            title: "Cybersecurity",
            description:
                "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
            features: [
                "Security Audits",
                "Penetration Testing",
                "Compliance Management",
            ],
        },
        {
            id: 6,
            icon: <Zap size={32} />,
            title: "IT Consulting",
            description:
                "Strategic technology consulting to help you make informed decisions and achieve your business objectives.",
            features: [
                "Digital Transformation",
                "Technology Strategy",
                "Process Optimization",
            ],
        },
    ]

    return (
        <div className="font-sans min-h-screen text-gray-900 bg-slate-900">
            {/* Hero Section */}

            <section
                className="py-32 text-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZe37vGdGJbQOyyKveGhyrPmlLNijTYIsvrV_vliyYluQ9bkz3t859rH2RoW_OEjHBTfwvExx2_2PZufWimRe6UlLdozKQXM2C2zfgnIxK2LRsFYIEQ391ySyoU6qxvnpeTb8B7nlDs6dlkoTltzKaDYs9aLvKghd8DEZv_AA4o6oyFDMpubQK9bMUp-YQfsiVtBGLG-yxSHFg9a--QISz5AcVZoZejSZFa8WvqAU-FAB2l61WFkA1qzvQBgs5nia5mBa-OoXCq-4')",
                }}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-5xl font-bold text-stone-50 mb-4 animate-fadeIn">
                        Our Services
                    </h2>
                    <p className="text-xl text-neutral-200 leading-relaxed animate-fadeIn delay-200">
                        Empowering businesses with innovative technology
                        solutions
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto py-32 px-4">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`bg-slate-900 border border-sky-950 rounded-xl p-8 cursor-pointer transform transition-all duration-300 ${
                                activeService === service.id
                                    ? "shadow-xl -translate-y-2 border-gray-900"
                                    : "hover:shadow-lg hover:-translate-y-1"
                            }`}
                            onMouseEnter={() => setActiveService(service.id)}
                            onMouseLeave={() => setActiveService(null)}
                        >
                            <div className="text-blue-500 mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-slate-200 text-2xl font-semibold mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 mb-4">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-400 text-sm border-t border-gray-100 pt-2"
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-32 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4 animate-fadeIn">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 animate-fadeIn delay-200">
                        Let's discuss how our services can help you achieve your
                        goals
                    </p>
                    <button className="bg-blue-600 text-slate-50 px-10 py-4 font-semibold rounded-md hover:bg-slate-800 transition-all animate-fadeIn delay-100">
                        Get in Touch
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-sky-950 py-8 text-center">
                <p className="text-gray-400 text-sm">
                    ©️ 2025 Koliath Technology. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default ServicesPage
