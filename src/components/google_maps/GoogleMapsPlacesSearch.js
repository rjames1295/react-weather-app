import React, { useState, useEffect, useRef, useMemo } from "react"
import { connect } from "react-redux"

import parse from "autosuggest-highlight/parse"
import throttle from "lodash/throttle"

import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import {useDebounce} from "../../hooks/_use-debounce"
import { _gMapsAPI } from "../../api_service/_google-maps"
import { useHttpGet } from "../../hooks/_use-http-get"
import { _actionSetSelectedLocation, _actionUnsetSelectedLocation } from "../../store/Actions"

function loadScript(src, position, id) {
    if (!position) return

    const script = document.createElement("script")
    script.setAttribute("async", "")
    script.setAttribute("id", id)
    script.src = src
    position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2)
    }
}))

const mapDispatchToProps = dispatch => ({
    setSelectedLocation(data) {
        dispatch(_actionSetSelectedLocation(data))
    },
    unsetSelectedLocation() {
        dispatch(_actionUnsetSelectedLocation())
    }
})

const GoogleMapsPlacesSearch = props => {
    const classes = useStyles()

    const { setSelectedLocation, unsetSelectedLocation } = props
    const [searchTerm, setSearchTerm] = useState("")
    const [options, setOptions] = useState([])
    const loadedWindow = useRef(false)

    const [
        {
            fetchedData: placesDetail,
            isLoading: isPlacesDetailLoading,
            errorMessage: placesErrorMessage,
            responseCode: placesResponseCode
        },
        setPlacesUrl
    ] = useHttpGet()

    /**
     * Debounce the input. Wait for 600ms after user stops typing,
     * then send fetch request
     */
    const debouncedSearchTerm = useDebounce(searchTerm, 600)

    if (typeof window !== "undefined" && !loadedWindow.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(_gMapsAPI.getPlacesURL(), document.querySelector("head"), "google-maps")
        }

        loadedWindow.current = true
    }

    const _inputChangeHandler = event => {
        setSearchTerm(event.target.value)

        if (event.target.value === "") {
            console.log('LOCATION CLEARED')
            unsetSelectedLocation()
        }
    }

    const _getPlacePredictions = useMemo(() => {
        return throttle((input, callback) => {
            autocompleteService.current.getPlacePredictions(input, callback)
        }, 200)
    }, [])

    const _getPlaceDetails = placeId => {
        setPlacesUrl(_gMapsAPI.getPlaceInfoByPlaceIdURL(placeId))
    }

    useEffect(() => {
        let active = true

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService()
        }
        if (!autocompleteService.current) return undefined

        if (debouncedSearchTerm === "") {
            setOptions([])
            return undefined
        }

        _getPlacePredictions({ input: debouncedSearchTerm }, results => {
            console.log(results)
            if (active) {
                setOptions(results || [])
            }
        })

        return () => {
            active = false
        }
    }, [debouncedSearchTerm, _getPlacePredictions])

    useEffect(() => {
        if (placesDetail) {
            const loc = placesDetail.results[0].geometry.location
            // console.log(loc)
            setSelectedLocation({
                lat: loc.lat,
                lng: loc.lng
            })
        }
    }, [placesDetail, setSelectedLocation])

    return (
        <Autocomplete
            id="google-map-demo"
            getOptionLabel={option => (typeof option === "string" ? option : option.description)}
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            freeSolo
            disableOpenOnFocus
            disabled={isPlacesDetailLoading ? true : false}
            clearOnEscape={true}
            clearText="Clear location search"
            renderInput={params => (
                <TextField
                    {...params}
                    label="Search for a city or country!"
                    variant="outlined"
                    fullWidth
                    onChange={_inputChangeHandler}
                />
            )}
            renderOption={option => {
                const matches = option.structured_formatting.main_text_matched_substrings
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map(match => [match.offset, match.offset + match.length])
                )

                return (
                    <Grid
                        container
                        alignItems="center"
                        onClick={() => {
                            _getPlaceDetails(option.place_id)
                        }}
                    >
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }}
        />
    )
}

export default connect("", mapDispatchToProps)(GoogleMapsPlacesSearch)
