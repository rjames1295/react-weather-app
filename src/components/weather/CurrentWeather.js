import React, { useEffect } from "react"

import CircularProgress from "@material-ui/core/CircularProgress"

import { useHttpGet } from "../../hooks/_useHttpGet"
import { _weatherAPI } from "../../api_service/weather"
import { connect } from "react-redux"
// import RecursiveData from "../shared/RecursiveData"
import WeatherCard from "../shared/WeatherCard"
// import ErrorCard from "../shared/ErrorCard"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation
})

const CurrentWeather = props => {
    const { currentUserGeolocation } = props
    const [
        { fetchedData: currentWeatherInfo, isLoading: isWeatherInfoLoading, errMessage: currentWeatherErrMsg },
        setUrl
    ] = useHttpGet()

    useEffect(() => {
        // Fetch data when geolocation changes
        const _fetchWeatherInfo = () => {
            if (currentUserGeolocation && currentUserGeolocation.lat && currentUserGeolocation.lng) {
                setUrl(_weatherAPI.getCurrentWeatherByGeolocation(currentUserGeolocation))
            }
        }

        _fetchWeatherInfo()
    }, [currentUserGeolocation, setUrl])

    if (currentWeatherErrMsg) {
        return <div className="text-center">{String(currentWeatherErrMsg)}</div>
    }

    if (isWeatherInfoLoading) {
        return <div className="text-center"><CircularProgress /></div>
    }

    if (currentWeatherInfo) {
        return (
            <div className="text-center">
                Currently the weather info is
                <WeatherCard weatherInfo={currentWeatherInfo} _key={"w-card"} />
                {/* <RecursiveData
                    property={currentWeatherInfo}
                    propertyName="Weather info"
                    excludeBottomBorder={false}
                    rootProperty={true}
                /> */}
            </div>
        )
    }

    return (
        <>
            {/* <ErrorCard message={"Error loading current weather info"} /> */}
        </>
    )
}

export default connect(
    mapStateToProps,
    null
)(
    React.memo(CurrentWeather, (prevProps, nextProps) => {
        return prevProps.currentUserGeolocation === nextProps.currentUserGeolocation
    })
)
