import { useRef } from "react"
import Home from "./components/LandingPage"
import BlogComponent from "./components/Blog"
import Navbar from "./components/Navbar"
import { About } from "./components/About"
import { Careers } from "./components/Careers"

const App: React.FC = () => {
    const homeRef = useRef<HTMLDivElement>(null)
    const blogRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const careersRef = useRef<HTMLDivElement>(null)

    const scrollToSection = (section: string) => {
        let targetRef: React.RefObject<HTMLDivElement> | null = null

        switch (section) {
            case "Home":
                targetRef = homeRef
                break
            case "Blog":
                targetRef = blogRef
                break
            case "About":
                targetRef = aboutRef
                break
            case "Careers":
                targetRef = careersRef
            default:
                targetRef = homeRef
        }

        if (targetRef?.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar onSectionChange={scrollToSection} />

            <div ref={homeRef}>
                <Home />
            </div>

            <div ref={blogRef}>
                <BlogComponent />
            </div>

            <div ref={aboutRef}>
                <About />
            </div>
            <div ref={careersRef}>
                <Careers />
            </div>

            <footer className="bg-white text-gray-600 border-t border-gray-200">
                <div className="max-w-5xl mx-auto py-12 px-4 text-center">
                    <p className="text-sm">
                        © 2025 Koliath Technology. All rights reserved.
                    </p>
                </div>
            </footer>
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
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
        </div>
    )
}

export default App
