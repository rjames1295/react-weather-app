import React from "react"
import { _weatherAPI } from "../../api_service/weather"
import { connect } from "react-redux"
import { _groupWeatherByDay } from "../../utils/_helpers"

import RecursiveData from "../shared/RecursiveData"
import { _toast } from "../../utils/_toast"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation
})

class ForecastedWeatherFiveDays extends React.Component {
    state = {
        forecastWeatherCity: {},
        forecastWeatherInfo: {}
    }

    componentDidUpdate = (prevProps) => {
        // Fetch new data when geolocation changes
        if (this.props.currentUserGeolocation !== prevProps.currentUserGeolocation) {
            this._fetchData()
        }
    }

    _fetchData = async () => {
        const { currentUserGeolocation } = this.props
        if (currentUserGeolocation && currentUserGeolocation.lat && currentUserGeolocation.lng) {
            const weatherResponse = await _weatherAPI
                .getForecastedWeatherFiveDaysByGeolocation(currentUserGeolocation)
                .catch(err => {
                    console.error(err)
                    return null
                })

            if (weatherResponse) {
                if (weatherResponse.data &&
                    weatherResponse.data.list) {
                    /**
                     * Segregate the forecast list by days
                     */
                    const groupedWeatherData = _groupWeatherByDay(weatherResponse.data.list)
                    // console.log(groupedWeatherData)
                    this.setState({
                        forecastWeatherCity: weatherResponse.data.city,
                        forecastWeatherInfo: groupedWeatherData
                    })
                } else {
                    _toast("error", "Forecast is empty")
                }
            } else {
                _toast("error", "Error loading 5 day forecast info")
            }
        }
    }

    render = () => {
        const { forecastWeatherInfo } = this.state
        return (
            <React.Fragment>
                Forecasted weather for the next 5 days 
                <RecursiveData
                    property={forecastWeatherInfo}
                    propertyName="Weather info"
                    excludeBottomBorder={false}
                    rootProperty={true}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(ForecastedWeatherFiveDays)
