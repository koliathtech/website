import { useState } from "react"
import "./App.css"
import { Input } from "./components/ui/input"
import LandingPage from "./components/LandingPage"
import Blog from "./components/Blog"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <LandingPage />
            <Blog />
            <Input type="email" placeholder="Email" />
        </div>
    )
}

export default App
