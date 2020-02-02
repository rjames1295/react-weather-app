import React, { useEffect } from "react"
import { useSnackbar } from "notistack"
import { _getUserGeolocation } from "../../utils/_geolocation"
import { _actionSetCurrentUserGeolocation, _actionUnsetCurrentUserGeolocation } from "../../store/Actions"
import { connect } from "react-redux"


import CurrentWeather from "../weather/CurrentWeather"
import ForecastedWeatherFiveDays from "../weather/ForecastedWeatherFiveDays"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation
})

const mapDispatchToProps = dispatch => ({
    setCurrentUserGeolocation(data) {
        dispatch(_actionSetCurrentUserGeolocation(data))
    },
    unsetCurrentUserGeolocation(data) {
        dispatch(_actionUnsetCurrentUserGeolocation(data))
    }
})

const WeatherContainer = props => {
    const { setCurrentUserGeolocation, currentUserGeolocation } = props
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const _fetchData = async () => {
            let geolocation = await _getUserGeolocation().catch(err => {
                console.error(err)
                enqueueSnackbar(err.message, { variant: "error" })
            })

            geolocation
                ? // Save the geolocation in redux
                  setCurrentUserGeolocation(geolocation)
                : enqueueSnackbar("Error retrieving current location", { variant: "error" })
        }

        if (!currentUserGeolocation.lat || !currentUserGeolocation.lng) {
            _fetchData()
        }
    }, [setCurrentUserGeolocation, enqueueSnackbar, currentUserGeolocation])

    return (
        <>
            <CurrentWeather />
            <ForecastedWeatherFiveDays />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)
