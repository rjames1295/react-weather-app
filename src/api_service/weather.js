/**
 * Weather API provided by
 * https://openweathermap.org/
 * 
 * Sample endpoint:
 *      api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 * 
 * Every endpoint must include APPID param 
 * @param {string} weatherMapAPIKey &APPID=weatherMapAPIKey
 * @param {string} units optional param. enum [metric, imperial] defaults to Kelvin
 */

import axios from "./_axios"
import {
    weatherMapAPIKey,
    baseAPIURL
} from "../config/config"

export const _weatherAPI = {
    /**
     * @param {string} cityName
     * @param {string} countryCode
     */
    getCurrentWeatherByCityName: (cityName, countryCode) => {
        if (!countryCode) return axios.get(`${baseAPIURL}/data/2.5/weather?q=${cityName}&units=metric&APPID=${weatherMapAPIKey}`)

        return axios.get(`${baseAPIURL}/data/2.5/weather?q=${cityName},${countryCode}&units=metric&APPID=${weatherMapAPIKey}`)
    },
    /**
     * @param {number} cityId
     */
    getCurrentWeatherByCityId: (cityId) => {
        return axios.get(`${baseAPIURL}/data/2.5/weather?id=${cityId}&units=metric&APPID=${weatherMapAPIKey}`)
    },
    /**
     * @param {object} geolocation required fields {lat, lng}
     */
    getCurrentWeatherByGeolocation: (geolocation = {}) => {
        return axios.get(`${baseAPIURL}/data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lng}&units=metric&APPID=${weatherMapAPIKey}`)
    },

}
