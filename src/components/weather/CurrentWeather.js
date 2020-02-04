import React, { useEffect, memo} from "react"

import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import { useHttpGet } from "../../hooks/_use-http-get"
import { _weatherAPI } from "../../api_service/_weather"
import { connect } from "react-redux"
import RecursiveData from "../shared/RecursiveData"
// import WeatherCard from "../shared/WeatherCard"

// import ErrorCard from "../shared/ErrorCard"

const mapStateToProps = state => ({
    currentUserGeolocation: state.currentUserGeolocation,
    selectedLocation: state.selectedLocation
})

const CurrentWeather = props => {
    const { currentUserGeolocation, selectedLocation } = props
    const [
        { fetchedData: currentWeatherInfo, isLoading: isWeatherInfoLoading, errMessage: currentWeatherErrMsg },
        setUrl
    ] = useHttpGet()

    useEffect(() => {
        // Fetch data when geolocation changes, or user selects a different location
        const _fetchWeatherInfo = () => {
            if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
                console.log("LOCATION!!!!!!!!!")
                setUrl(_weatherAPI.getCurrentWeatherByGeolocation(selectedLocation))
            } else if (currentUserGeolocation && currentUserGeolocation.lat && currentUserGeolocation.lng) {
                setUrl(_weatherAPI.getCurrentWeatherByGeolocation(currentUserGeolocation))
            }
        }

        _fetchWeatherInfo()
    }, [currentUserGeolocation, selectedLocation, setUrl])

    if (currentWeatherErrMsg) {
        return <div className="text-center">{String(currentWeatherErrMsg)}</div>
    }

    if (isWeatherInfoLoading) {
        return (
            <div className="text-center">
                <CircularProgress />
            </div>
        )
    }

    if (currentWeatherInfo) {
        return (
            <div className="text-center">
                <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={8}>
                        Currently the weather info is
                        <Card className={"classes.card mb-3"} key={"_key"}>
                            <CardContent>
                                <Typography
                                    className={"classes.title"}
                                    color="textSecondary"
                                    gutterBottom
                                    id="current-weather-location-name"
                                >
                                    {currentWeatherInfo.name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {currentWeatherInfo.name}
                                </Typography>
                                <Typography
                                    className={"classes.pos"}
                                    color="textSecondary"
                                    id="current-weather-info-day"
                                >
                                    {currentWeatherInfo.day}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={2}></Grid>
                </Grid>
                <RecursiveData
                    property={currentWeatherInfo}
                    propertyName="Weather info"
                    excludeBottomBorder={false}
                    rootProperty={true}
                />
            </div>
        )
    }

    return <>{/* <ErrorCard message={"Error loading current weather info"} /> */}</>
}

export default connect(
    mapStateToProps,
    null
)(
    memo(CurrentWeather, (prevProps, nextProps) => {
        // Only update the component on location change
        return (
            prevProps.currentUserGeolocation === nextProps.currentUserGeolocation &&
            prevProps.selectedLocation === nextProps.selectedLocation
        )
    })
)
