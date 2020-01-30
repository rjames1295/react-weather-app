import React from "react"
import { withRouter } from "react-router-dom"

const NotFound = props => {
    console.log(props)
    const {
        // history,
        location
        // match
    } = props
    return <>{`Looks like the page "${location.pathname}" could not be found :(`}</>
}

export default withRouter(NotFound)
