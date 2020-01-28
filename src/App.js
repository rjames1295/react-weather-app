import React from "react"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import { ToastContainer } from "react-toastify"


function App({ store }) {
    return (
        <div className="App">
            <ToastContainer />
            <LandingPage store={store} />
        </div>
    )
}

export default App
