import React from "react"
import { Switch, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import NotFoundPage from "../pages/NotFoundPage"
import AboutPage from "../pages/AboutPage"
import { routes } from "./routes"

const Router = props => {
    return (
        <Switch>
            {/* Landing page route */}
            <Route exact path={routes.home} render={() => <LandingPage />} />

            {/* About page route */}
            <Route exact path={routes.about} component={AboutPage} />

            {/* 404 route */}
            <Route path="*" component={NotFoundPage} />
        </Switch>
    )
}

export default Router
