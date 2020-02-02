import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import NavBarMaterial from "./components/shared/NavBarMaterial"
import Footer from "./components/shared/Footer"
import Alerts from "./components/shared/Alerts"
import Router from "./router/router"

import { usePrevious } from "./hooks/_usePrevious"

import store from "./store/Store"
import { _actionUnsetErrors } from "./store/Actions"

const App = () => {
    const currentLocation = useLocation()
    const prevLocation = usePrevious(currentLocation)

    useEffect(() => {
        const _onRouteChangeHandler = () => {
            store.dispatch(_actionUnsetErrors())
        }

        if (prevLocation !== undefined && currentLocation.pathname !== prevLocation.pathname)
            _onRouteChangeHandler()
    }, [currentLocation, prevLocation])

    return (
        <div id="main-container">
            <NavBarMaterial />
            <Alerts />
            <Router />
            <Footer />
        </div>
    )
}

export default App
