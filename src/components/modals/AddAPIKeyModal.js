import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"

import CloseIcon from "@material-ui/icons/Close"

import { OWM_API_KEY_STR } from "../../config/config"
import { useSnackbar } from "notistack"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1)
    }
}))

const AddAPIKeyModal = props => {
    const classes = useStyles()
    const {
        _closeHandler,
        // _toggleHandler,
        isOpen
    } = props
    const [apiKey, setApiKey] = useState("")
    const { enqueueSnackbar } = useSnackbar()

    const _setOWMAPIKey = () => {
        if (!apiKey) {
            enqueueSnackbar("Please enter your API key", { variant: "error" })
            return
        }
        localStorage.setItem(OWM_API_KEY_STR, apiKey)
        window.location.reload()
    }

    const _setStateFromInput = event => {
        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value
        setApiKey(value)
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={_closeHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.root} id="alert-dialog-title">
                    {"OpenWeatherMap API key"}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={_closeHandler}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span>
                            Don't have an API key? Head over to{" "}
                            <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
                                Open Weather Map
                            </a>{" "}
                            and create a free account
                        </span>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="api-key"
                        label="API Key"
                        // type="email"
                        fullWidth
                        required
                        onChange={_setStateFromInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={_setOWMAPIKey} color="primary">
                        Set API key
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddAPIKeyModal
