import React from "react"
import { _weatherAPI } from "../../api_service/weather"
import { connect } from "react-redux"

import RecursiveData from "../shared/RecursiveData"
import { _toast } from "../../utils/_toast"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation
})

class CurrentWeather extends React.Component {
    state = {
        currentWeatherInfo: {}
    }

    componentDidUpdate = (prevProps) => {
        // Fetch new data when geolocation changes
        if (this.props.currentUserGeolocation !== prevProps.currentUserGeolocation) {
            this._fetchData()
        }
    }

    _fetchData = async () => {
        const { currentUserGeolocation } = this.props
        if (currentUserGeolocation &&
            currentUserGeolocation.lat &&
            currentUserGeolocation.lng) {
            const weatherResponse = await _weatherAPI.getCurrentWeatherByGeolocation(currentUserGeolocation).catch(err => {
                console.error(err)
                return null
            })

            if (weatherResponse) {
                this.setState({
                    currentWeatherInfo: weatherResponse.data
                })    
            } else {
                _toast("error", "Error loading current weather info")
            }
        }
    }

    render = () => {
        const { currentWeatherInfo } = this.state
        return (
            <React.Fragment>
                Currently the weather info is
                <RecursiveData
                    property={currentWeatherInfo}
                    propertyName="Weather info"
                    excludeBottomBorder={false}
                    rootProperty={true}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(CurrentWeather)
