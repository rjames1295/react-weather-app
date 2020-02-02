import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"

import CloseIcon from "@material-ui/icons/Close"

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

const ConfirmModal = props => {
    const classes = useStyles()
    const { message, _closeHandler, _onDecide, isOpen } = props

    const _handleAffirm = () => {
        _onDecide(true)
        _closeHandler()
    }

    const _handleDeny = () => {
        _onDecide(false)
        _closeHandler()
    }

    if (isOpen) {
        return (
            <>
                <Dialog
                    open={isOpen}
                    onClose={_closeHandler}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className={classes.root} id="alert-dialog-title">
                        {"Openweathermap API key"}
                        <IconButton aria-label="close" className={classes.closeButton} onClick={_closeHandler}>
                        <CloseIcon />
                    </IconButton>
                        </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <span>{message}</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className="default-btn-solid danger" onClick={_handleDeny}>
                            Cancel
                        </Button>
                        <Button className="default-btn-solid success" onClick={_handleAffirm}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return <></>
}

export default ConfirmModal
