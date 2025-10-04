import { useState } from "react"
import "./App.css"
import { Input } from "./components/ui/input"
import LandingPage from "./components/LandingPage"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <LandingPage />
            <Input type="email" placeholder="Email" />
        </div>
    )
}

export default App
