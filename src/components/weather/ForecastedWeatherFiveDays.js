import React, { useEffect } from "react"
import { connect } from "react-redux"

import CircularProgress from "@material-ui/core/CircularProgress"

import { useHttpGet } from "../../hooks/_http"
import { _weatherAPI } from "../../api_service/weather"
import { _groupWeatherByDay } from "../../utils/_helpers"
import RecursiveData from "../shared/RecursiveData"
import { Grid, Typography } from "@material-ui/core"

import WeatherCard from "../shared/WeatherCard"
// import ErrorCard from "../shared/ErrorCard"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation
})

const ForecastedWeatherFiveDays = props => {
    const { currentUserGeolocation } = props
    const [{ fetchedData: weatherResponse, isLoading, errorMessage }, setUrl] = useHttpGet()

    useEffect(() => {
        // Fetch data when geolocation changes
        const _fetchForecastInfo = () => {
            if (currentUserGeolocation && currentUserGeolocation.lat && currentUserGeolocation.lng) {
                setUrl(_weatherAPI.getForecastedWeatherFiveDaysByGeolocation(currentUserGeolocation))
            }
        }

        _fetchForecastInfo()
    }, [currentUserGeolocation, setUrl])

    if (errorMessage) {
        return <div className="text-center">{String(errorMessage)}</div>
    }

    if (isLoading) {
        return <div className="text-center"><CircularProgress /></div>
    }

    if (weatherResponse) {
        if (weatherResponse.list) {
            /**
             * Segregate the forecast list by days
             */
            const groupedWeatherData = _groupWeatherByDay(weatherResponse.list)
            const forecastWeatherCity = weatherResponse.city

            return (
                <div className="text-center">
                    <hr />
                    <Typography variant="h5" component="h2">
                        Forecasted weather for the next 5 days
                    </Typography>
                    <Grid container spacing={7}>
                        {/**
                         * Since groupedWeather data always returns and array with 5 objects,
                         * Size the columns accordingly
                         */
                        Object.keys(groupedWeatherData).map((key, index) => {
                            if (index > 0) {
                                return (
                                    <Grid item lg={4} md={4} sm={4} key={`gw-grid-${index}`}>
                                        {groupedWeatherData[key].map((weatherInfo, _index) => {
                                            const uniqKey = `w-card-${index}-${_index}`
                                            return (
                                                <WeatherCard day={key} weatherInfo={weatherInfo} _key={uniqKey} key={uniqKey} />
                                            )
                                        })}
                                    </Grid>
                                )
                            }
                            return <React.Fragment key={`gw-grid-${index}`}></React.Fragment>
                        })}
                    </Grid>
                    {/* <RecursiveData
                        property={groupedWeatherData}
                        propertyName="Forecasted weather info"
                        excludeBottomBorder={false}
                        rootProperty={true}
                    /> */}
                    <hr />
                    <RecursiveData
                        property={forecastWeatherCity}
                        propertyName="Forecasted city info"
                        excludeBottomBorder={false}
                        rootProperty={true}
                    />
                </div>
            )
        }
    }

    return <>{/* <ErrorCard message={"Error loading forecast info"} /> */}</>
}

export default connect(mapStateToProps, null)(ForecastedWeatherFiveDays)
