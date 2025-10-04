import { useState } from "react"
import Home from "./components/LandingPage"
import BlogComponent from "./components/Blog"
import Navbar from "./components/Navbar"
import { About } from "./components/About"
import { Careers } from "./components/Careers"

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState("Home")

    const renderSection = () => {
        switch (activeSection) {
            case "Home":
                return <Home />
            case "Blog":
                return <BlogComponent />
            case "About":
                return <About></About>
            case "Careers":
                return <Careers></Careers>
            default:
                return <Home />
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            <div className="transition-opacity duration-300">
                {renderSection()}
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
