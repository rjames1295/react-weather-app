import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import Brightness6 from "@material-ui/icons/Brightness6"
import GitHub from "@material-ui/icons/GitHub"

import { Link } from "react-router-dom"
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
                        {/* <MenuIcon /> */}
                    </IconButton>

                    <Typography variant="h6" className={"title"}>
                        <Link to="/">ReWeather</Link>
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={_setTheme}>
                        <Brightness6 />
                    </IconButton>
                    <div className="ml-5">
                        <a
                            href="https://github.com/rjames1295/react-weather-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHub />
                        </a>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBarMaterial
