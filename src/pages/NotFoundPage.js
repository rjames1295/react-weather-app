import React, { useEffect } from "react"
import Container from "@material-ui/core/Container"
import { useLocation } from "react-router"

const NotFound = props => {
    const location = useLocation()

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

export default NotFound
