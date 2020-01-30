import { createMuiTheme } from "@material-ui/core/styles"
import orange from "@material-ui/core/colors/orange"
// import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
// import dark from "@material-ui/core/colors"

import { THEME_SETTING_STR } from "../config/config"
const themeSetting = localStorage.getItem(THEME_SETTING_STR) || ""
const isLightTheme = themeSetting === "light" ? true : false

const darkTheme = {
    palette: {
        type: "dark",
        primary: orange,
        secondary: green,
        text: {
            primary: "#fff",
            secondary: "#fff !important", //"rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
            hint: "rgba(255, 255, 255, 0.5)",
            icon: "rgba(255, 255, 255, 0.5)"
        }
    }
}

const lightTheme = {}

const materialTheme = isLightTheme ? createMuiTheme(lightTheme) : createMuiTheme(darkTheme)

export default materialTheme
