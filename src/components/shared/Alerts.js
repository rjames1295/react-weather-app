import React, { useState } from "react"
import { connect } from "react-redux"
import { OWM_API_KEY_STR } from "../../config/config"

import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"
import AddAPIKeyModal from "../modals/AddAPIKeyModal"
import { withRouter } from "react-router"

const mapStateToProps = state => ({
    warningList: state.warningList || [],
    errorList: state.errorList || []
})

const Alerts = props => {
    const { warningList, location } = props
    const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

    const [isAddAPIKeyModalOpen, setIsAddAPIKeyModalOpen] = useState(false)

    return (
        <>
            <AddAPIKeyModal
                isOpen={isAddAPIKeyModalOpen}
                _closeHandler={() => {
                    setIsAddAPIKeyModalOpen(false)
                }}
                _toggleHandler={() => {
                    setIsAddAPIKeyModalOpen(!isAddAPIKeyModalOpen)
                }}
            />
            <div className="pl-5 pr-5 pb-3 pt-3">
                {
                    // Only show API key alert when on main page/landing page
                location.pathname === '/' && !apiKey && (
                    <Alert variant="filled" severity="info" className="mb-2" action={
                        <Button onClick={() => {
                            setIsAddAPIKeyModalOpen(!isAddAPIKeyModalOpen)
                        }}>
                            Add API Key
                        </Button>
                    }>
                        You will need to provide an API key before you can access weather info!

                    </Alert>
                )}
                {warningList &&
                    warningList.map((warning, index) => {
                        return (
                            <Alert variant="filled" severity="warning" className="mb-2" key={index}>
                                {String(warning)}
                            </Alert>
                        )
                    })}

                {props.errorList &&
                    props.errorList.map((error, index) => {
                        return (
                            <>
                                <Alert variant="filled" severity="error" className="mb-2" key={index} action={
                                    <Button>
                                        Send an e-mail about this error
                                    </Button>
                                }>
                                    {String(error)}
                                </Alert>
                            </>
                        )
                    })}
            </div>
        </>
    )
}

export default connect(mapStateToProps, "")(withRouter(Alerts))
