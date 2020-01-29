import React from "react"
import { withRouter } from "react-router-dom"
import Container from "../components/landing_page/Container"
import { OWM_API_KEY_STR } from "../config/config"

class LandingPage extends React.Component {
    render = () => {
        const apiKey = localStorage.getItem(OWM_API_KEY_STR)

        if (apiKey) {
            return <Container {...this.props} />
        }
        
        return <></>
    }
}

/**
 * Exporting using withRouter() allows the component
 * to receive router props
 * @param {object} history
 * @param {object} location
 * @param {object} match
 */
export default withRouter(LandingPage)
