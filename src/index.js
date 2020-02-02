import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { SnackbarProvider } from "notistack"

import { Provider } from "react-redux"
import store from "./store/Store"
import * as serviceWorker from "./serviceWorker"

import App from "./App"

import materialTheme from "./assets/material-theme"

// Start CSS imports
import "./assets/main.scss"
import CssBaseline from "@material-ui/core/CssBaseline"

ReactDOM.render(
    <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Provider store={store}>
            <BrowserRouter basename={'/react-weather-app'}>
                <SnackbarProvider maxSnack={5}>
                    <App />
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
