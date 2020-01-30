import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Router from "./router/router"
import { Provider } from "react-redux"
import store from "./store/Store"
import * as serviceWorker from "./serviceWorker"
import { SnackbarProvider } from "notistack"
// import NavBar from "./components/shared/NavBar"
import NavBarMaterial from "./components/shared/NavBarMaterial"
import Footer from "./components/shared/Footer"
import Alerts from "./components/shared/Alerts"
import { ThemeProvider } from "@material-ui/core/styles"
import materialTheme from "./assets/material-theme"

// Start CSS imports
import "./assets/main.scss"
import CssBaseline from "@material-ui/core/CssBaseline"

ReactDOM.render(
    <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={5}>
                    {/* <NavBar /> */}
                    <NavBarMaterial />
                    <Alerts />
                    <Router />
                    <Footer />
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
