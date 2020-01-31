import React from "react"
import LandingPageMain from "../components/landing_page/LandingPageMain"
import Container from "@material-ui/core/Container"
import { OWM_API_KEY_STR } from "../config/config"

const LandingPage = props => {
    const apiKey = localStorage.getItem(OWM_API_KEY_STR)
    if (apiKey) {
        return (
            <Container>
                <LandingPageMain {...props} />
            </Container>
        )
    }

    return <></>
}

export default LandingPage
