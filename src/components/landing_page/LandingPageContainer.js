import React from "react"
import { _toast } from "../../utils/_toast"
import { _getUserGeolocation } from "../../utils/_geolocation"
import { _weatherAPI } from "../../api_service/weather"
import { _actionSetCurrentUserGeolocation, _actionUnsetCurrentUserGeolocation } from "../../store/Actions"
import { connect } from "react-redux"

import RecursiveData from "../shared/RecursiveData"

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

class LandingPageContainer extends React.Component {
    state = {
        currentWeatherInfo: {}
    }

    componentDidMount = () => {
        this._fetchData()
    }

    _fetchData = async () => {
        let geolocation = await _getUserGeolocation().catch(err => {
            /* 
             * No need to show the error in the catch block, since axios interceptor
             * is configured to show a toastr on error
             */
            console.error(err)
        })

        if (geolocation) {
            // Save the geolocation in redux
            this.props.setCurrentUserGeolocation(geolocation)

            const weatherResponse = await _weatherAPI.getCurrentWeatherByGeolocation(geolocation).catch(err => {
                console.error(err)
            })
            
            this.setState({
                currentWeatherInfo: weatherResponse.data
            })
        } else {
            _toast("error", "Error retrieving current location")
        }
    }

    render = () => {
        const { currentWeatherInfo } = this.state
        return (
            <React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer)
