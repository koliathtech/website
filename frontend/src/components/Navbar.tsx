import React, { useState } from "react"

interface NavbarProps {
    activeSection: string
    onSectionChange: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null)

    const sections = ["Home", "Blog", "Careers", "About"]

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 text-blue-600">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8.41 15l2.58 2.59L11 19.93zm6.91-1.45L13.41 14 12 12.59 14.59 10l4.32 4.32c-.41 1.29-1.12 2.44-2.09 3.42z"></path>
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            Koliath Technology
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1 relative">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => onSectionChange(section)}
                                onMouseEnter={() => setHoveredSection(section)}
                                onMouseLeave={() => setHoveredSection(null)}
                                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                <span
                                    className={`relative z-10 ${
                                        activeSection === section
                                            ? "text-gray-900"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {section}
                                </span>

                                {/* Active indicator */}
                                {activeSection === section && (
                                    <div
                                        className="absolute inset-0 bg-gray-100 rounded-lg"
                                        style={{
                                            animation: "slideIn 0.3s ease-out",
                                        }}
                                    />
                                )}

                                {/* Hover indicator */}
                                {hoveredSection === section &&
                                    activeSection !== section && (
                                        <div
                                            className="absolute inset-0 bg-gray-50 rounded-lg"
                                            style={{
                                                animation:
                                                    "fadeIn 0.2s ease-out",
                                            }}
                                        />
                                    )}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </header>
    )
}

export default Navbar
