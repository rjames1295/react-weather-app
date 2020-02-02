import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"

import Brightness6 from "@material-ui/icons/Brightness6"
// import GitHub from "@material-ui/icons/GitHub"

import { Link as RouterLink } from "react-router-dom"
import Drawer from "./Drawer"

import { THEME_SETTING_STR } from "../../config/config"

const NavBarMaterial = () => {
    // const [anchorEl, setAnchorEl] = useState(null)
    const themeSetting = localStorage.getItem(THEME_SETTING_STR) || ""

    const _setTheme = () => {
        themeSetting === "light"
            ? localStorage.setItem(THEME_SETTING_STR, "")
            : localStorage.setItem(THEME_SETTING_STR, "light")
        window.location.reload()
    }

    return (
        <div className={"nav-bar"}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton edge="start" className={"menu-button"} color="inherit" aria-label="menu">
                        <Drawer />
                    </IconButton>

                    <Typography variant="h6" className={"title"}>
                        <RouterLink to="/">ReWeather</RouterLink>
                    </Typography>

                    <Tooltip title={themeSetting === "light" ? "Switch to dark theme" : "Switch to light theme"}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={_setTheme}>
                            <Brightness6 />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBarMaterial
