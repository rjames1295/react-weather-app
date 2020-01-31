import React from "react"
import { makeStyles } from "@material-ui/core"

import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles({
    footer: {
        bottom: 0,
        position: "absolute",
        width: "100%",
        // minHeight: "100px",
        backgroundColor: "#424242"
        // paddingTop: "10px"
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item lg={4} className="">
                    {/* <Container>uwu</Container> */}
                </Grid>
                <Grid item lg={4} className="text-center">
                    <Container>
                        <Link
                            href="https://github.com/rjames1295/react-weather-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Tooltip title={"View the project on GitHub"}>
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <GitHubIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Container>{" "}
                </Grid>
                <Grid item lg={4} className="">
                    {/* <Container>uwu</Container>{" "} */}
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
