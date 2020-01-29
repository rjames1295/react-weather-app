import React from "react"
import { _toast } from "../../utils/_toast"
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

class Container extends React.Component {
    componentDidMount = () => {
        this._fetchData()
    }

    _fetchData = async () => {
        let geolocation = await _getUserGeolocation().catch(err => {
            /**
             * No need to show the toastr in the catch block, since axios interceptor
             * is configured to show a toastr on error
             */
            console.error(err)
        })

        geolocation
            ? // Save the geolocation in redux
              this.props.setCurrentUserGeolocation(geolocation)
            : _toast("error", "Error retrieving current location")
    }

    render = () => {
        return (
            <React.Fragment>
                <CurrentWeather />
                <ForecastedWeatherFiveDays />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
