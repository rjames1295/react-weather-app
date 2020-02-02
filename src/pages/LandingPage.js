import React from "react"
import WeatherContainer from "../components/landing_page/WeatherContainer"
import Container from "@material-ui/core/Container"
import { OWM_API_KEY_STR } from "../config/config"

const LandingPage = props => {
    const apiKey = localStorage.getItem(OWM_API_KEY_STR)
    if (apiKey) {
        return (
            <Container>
                <WeatherContainer {...props} />
            </Container>
        )
    }

    return <></>
}

export default LandingPage
