import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css"
import LandingPage from "./components/LandingPage"
import About from "./components/About" 
import Blog from "./components/Blog"
import CareersPage from "./pages/CareersPage"
import { ThemeToggle } from './components/ui/toggleTheme'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <Input type="email" placeholder="Email" />
        </div>
    )
}

export default App
