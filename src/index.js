import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Router from "./router/router"
import { Provider } from "react-redux"
import store from "./store/Store"
import * as serviceWorker from "./serviceWorker"
import { ToastContainer } from "react-toastify"
import NavBar from "./components/shared/NavBar"
import Footer from "./components/shared/Footer"
import Alerts from  "./components/shared/Alerts"

// Start CSS imports
import "./assets/main.scss"
import "react-toastify/dist/ReactToastify.min.css"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
    <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
            <NavBar />
            <Alerts />
            <Router />
            <Footer />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
