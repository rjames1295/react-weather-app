/**
 * Weather info API endpoints from
 * https://openweathermap.org/
 *
 * Sample endpoint:
 *      api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 *
 * Every endpoint must include APPID param
 * @param {string} OWMAPIKey &APPID=OWMAPIKey
 * @param {string} units optional param. enum [metric, imperial] defaults to Kelvin
 */

import { OWM_API_KEY_STR, DEFAULT_UNITS_STR, baseAPIURL } from "../config/config"
const OWMAPIKey = localStorage.getItem(OWM_API_KEY_STR) || ""
const defaultUnit = localStorage.getItem(DEFAULT_UNITS_STR) || "metric"

export const _weatherAPI = {
    /**
     * @param {string} cityName
     * @param {string} countryCode
     */
    getCurrentWeatherByCityName: (cityName, countryCode) => {
        if (!countryCode) return `${baseAPIURL}data/2.5/weather?q=${cityName}&units=${defaultUnit}&APPID=${OWMAPIKey}`

        return `${baseAPIURL}data/2.5/weather?q=${cityName},${countryCode}&units=${defaultUnit}&APPID=${OWMAPIKey}`
    },
    /**
     * @param {object} geolocation required fields {lat, lng}
     */
    getCurrentWeatherByGeolocation: (geolocation = {}) => {
        return `${baseAPIURL}data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lng}&units=${defaultUnit}&APPID=${OWMAPIKey}`
    },
    /**
     * @param {string} cityName
     * @param {string} countryCode
     */
    getForecastedWeatherFiveDaysByCityName: (cityName, countryCode) => {
        if (!countryCode) return `${baseAPIURL}data/2.5/forecast?q=${cityName}&units=${defaultUnit}&APPID=${OWMAPIKey}`

        return `${baseAPIURL}data/2.5/forecast?q=${cityName},${countryCode}&units=${defaultUnit}&APPID=${OWMAPIKey}`
    },
    /**
     * @param {object} geolocation required fields {lat, lng}
     */
    getForecastedWeatherFiveDaysByGeolocation: (geolocation = {}) => {
        return `${baseAPIURL}data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lng}&units=${defaultUnit}&APPID=${OWMAPIKey}`
    }
}
