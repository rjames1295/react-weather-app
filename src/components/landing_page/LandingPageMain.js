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

const LandingPageMain = props => {
    const { setCurrentUserGeolocation } = props
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const _fetchData = async () => {
            let geolocation = await _getUserGeolocation().catch(err => {
                /**
                 * No need to show the toastr in the catch block, since axios interceptor
                 * is configured to show a toastr on error
                 */
                console.error(err)
            })

            geolocation
                ? // Save the geolocation in redux
                  setCurrentUserGeolocation(geolocation)
                : enqueueSnackbar("Error retrieving current location", { variant: "error" })
        }

        _fetchData()
    }, [setCurrentUserGeolocation, enqueueSnackbar])

    return (
        <>
            <CurrentWeather />
            <ForecastedWeatherFiveDays />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageMain)
