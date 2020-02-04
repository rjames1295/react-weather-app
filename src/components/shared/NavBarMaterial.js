import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Grid from "@material-ui/core/Grid"
import Switch from "@material-ui/core/Switch"

import Brightness6 from "@material-ui/icons/Brightness6"
// import GitHub from "@material-ui/icons/GitHub"

import { Link as RouterLink } from "react-router-dom"
import Drawer from "./Drawer"

import { THEME_SETTING_STR, DISPLAY_UNIT_METHOD_STR } from "../../config/config"

const NavBarMaterial = () => {
    const themeSetting = localStorage.getItem(THEME_SETTING_STR) || ""
    const displayUnit = localStorage.getItem(DISPLAY_UNIT_METHOD_STR) || ""

    const isMetricDisplayed = displayUnit === "imperial" ? true : false

    const _setTheme = () => {
        themeSetting === "light"
            ? localStorage.removeItem(THEME_SETTING_STR)
            : localStorage.setItem(THEME_SETTING_STR, "light")
        window.location.reload()
    }

    const _setDisplayUnit = () => {
        displayUnit === "imperial"
            ? localStorage.removeItem(DISPLAY_UNIT_METHOD_STR)
            : localStorage.setItem(DISPLAY_UNIT_METHOD_STR, "imperial")
        window.location.reload()
    }

    return (
        <div className={"nav-bar"}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Drawer />

                    <Typography variant="h6" className={"title"}>
                        <RouterLink to="/">ReWeather</RouterLink>
                    </Typography>

                    <Tooltip title={themeSetting === "light" ? "Switch to dark theme" : "Switch to light theme"}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={_setTheme}>
                            <Brightness6 />
                        </IconButton>
                    </Tooltip>

                    {/* <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>&#176; C</Grid>
                            <Grid item>
                                <Switch
                                    checked={isMetricDisplayed}
                                    onChange={_setDisplayUnit}
                                    value="checkedB"
                                    color="primary"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </Grid>
                            <Grid item>&#176; F</Grid>
                        </Grid>
                    </Typography> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBarMaterial
