import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"

const ConfirmModal = props => {
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
                    <DialogTitle id="alert-dialog-title">{"Openweathermap API key"}</DialogTitle>
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
