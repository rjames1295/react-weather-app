/**
 * Weather API provided by
 * https://openweathermap.org/
 *
 * Sample endpoint:
 *      api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 *
 * Every endpoint must include APPID param
 * @param {string} OWMAPIKey &APPID=OWMAPIKey
 * @param {string} units optional param. enum [metric, imperial] defaults to Kelvin
 */

import axios from "./_axios"
import { OWMAPIKey, baseAPIURL } from "../config/config"

export const _weatherAPI = {
    /**
     * @param {string} cityName
     * @param {string} countryCode
     */
    getCurrentWeatherByCityName: (cityName, countryCode) => {
        if (!countryCode)
            return axios.get(`${baseAPIURL}data/2.5/weather?q=${cityName}&units=metric&APPID=${OWMAPIKey}`)

        return axios.get(
            `${baseAPIURL}data/2.5/weather?q=${cityName},${countryCode}&units=metric&APPID=${OWMAPIKey}`
        )
    },
    /**
     * @param {object} geolocation required fields {lat, lng}
     */
    getCurrentWeatherByGeolocation: (geolocation = {}) => {
        return axios.get(
            `${baseAPIURL}data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lng}&units=metric&APPID=${OWMAPIKey}`
        )
    },
    /**
     * @param {string} cityName
     * @param {string} countryCode
     */
    getForecastedWeatherFiveDaysByCityName: (cityName, countryCode) => {
        if (!countryCode)
            return axios.get(`${baseAPIURL}data/2.5/forecast?q=${cityName}&units=metric&APPID=${OWMAPIKey}`)

        return axios.get(
            `${baseAPIURL}data/2.5/forecast?q=${cityName},${countryCode}&units=metric&APPID=${OWMAPIKey}`
        )
    },
    /**
     * @param {object} geolocation required fields {lat, lng}
     */
    getForecastedWeatherFiveDaysByGeolocation: (geolocation = {}) => {
        return axios.get(
            `${baseAPIURL}data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lng}&units=metric&APPID=${OWMAPIKey}`
        )
    }
}
