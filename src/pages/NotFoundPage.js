import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import Container from "@material-ui/core/Container"

const NotFound = props => {
    // console.log(props)
    const {
        // history,
        location
        // match
    } = props

    useEffect(() => {
        document.body.classList.add("bg-sad-face")

        const cleanup = () => {
            document.body.classList.remove("bg-sad-face")
        }
        return cleanup
    }, [location])

    return (
        <Container className="text-center bg-sad-face">{`Couldn't find the page "${location.pathname}"`}</Container>
    )
}

export default withRouter(NotFound)
