import { useState } from "react"
import "./App.css"
import { Input } from "./components/ui/input"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <Input type="email" placeholder="Email" />
        </div>
    )
}

export default App
