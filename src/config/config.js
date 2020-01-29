const OWM_API_KEY_STR = "OWM_API_KEY"
const OWMAPIKey = localStorage.getItem(OWM_API_KEY_STR) || ""
const baseAPIURL = "https://api.openweathermap.org/"

export { OWM_API_KEY_STR, OWMAPIKey, baseAPIURL }
