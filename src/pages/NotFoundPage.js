import React from "react"
import { withRouter } from "react-router-dom"

class NotFound extends React.Component {
    render = () => {
        console.log(this.props)
        const {
            // history,
            location
            // match
        } = this.props

        return <>{`Looks like the page "${location.pathname}" could not be found :(`}</>
    }
}

export default withRouter(NotFound)
