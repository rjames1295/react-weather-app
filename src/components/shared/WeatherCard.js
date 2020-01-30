import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
})

const WeatherCard = props => {
    const classes = useStyles()
    // const bull = <span className={classes.bullet}>•</span>
    const { weatherInfo = {}, _key } = props

    // console.log(weatherInfo)

    const _renderWeatherInfo = () => {
        const { main = {} } = weatherInfo
        return (
            <Grid container spacing={3}>
                <Grid item lg={4}>
                    <div>Temperature:</div>
                    <div>{main.temp}</div>
                </Grid>
                <Grid item lg={4}>
                    <div>Feels like:</div>
                    <div>{main.feels_like}</div>
                </Grid>
                <Grid item lg={4}>
                    <div>Minimum temp:</div>
                    <div>{main.temp_min}</div>
                </Grid>
                <Grid item lg={4}>
                    <div>Maximum temp:</div>
                    <div>{main.temp_max}</div>
                </Grid>
                <Grid item lg={4}>
                    <div>Pressure:</div>
                    <div>{main.pressure}</div>
                </Grid>
                <Grid item lg={4}>
                    <div>Humidity:</div>
                    <div>{main.humidity}</div>
                </Grid>
            </Grid>
        )
    }

    return (
        <Card className={classes.card + " mb-3"} key={_key}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {weatherInfo.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {weatherInfo.name}
                    {/* be{bull}nev{bull}o{bull}lent */}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                {/* <Typography variant="body2" component="p"> */}
                {/* well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'} */}
                {_renderWeatherInfo()}
                {/* </Typography> */}
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default WeatherCard
