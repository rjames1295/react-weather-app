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

    _fetchData = () => {
        _getUserGeolocation()
            .then(geolocation => {
                if (geolocation) {
                    this.props.setCurrentUserGeolocation(geolocation)
                    _weatherAPI.getCurrentWeatherByGeolocation(geolocation).then(response => {
                        // console.log(response)
                        this.setState({
                            currentWeatherInfo: response.data
                        })
                    })
                } else {
                    _toast("error", "Error retrieving current location")
                }
            })
            .catch(err => {
                _toast("error", err)
            })
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
