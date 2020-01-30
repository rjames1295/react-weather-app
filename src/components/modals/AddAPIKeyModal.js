import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import { OWM_API_KEY_STR } from "../../config/config"
import { useSnackbar } from "notistack"

const AddAPIKeyModal = props => {
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
                <DialogTitle id="alert-dialog-title">{"Openweathermap API key"}</DialogTitle>
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