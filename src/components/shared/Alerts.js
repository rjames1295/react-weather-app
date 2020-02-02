import React, { useState } from "react"
import { connect } from "react-redux"

import { useLocation } from "react-router-dom"

import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"
import AddAPIKeyModal from "../modals/AddAPIKeyModal"

import { OWM_API_KEY_STR } from "../../config/config"

const mapStateToProps = state => ({
    warningList: state.warningList || [],
    errorList: state.errorList || []
})

const Alerts = props => {
    const { warningList, errorList } = props
    const location = useLocation()
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
                        const uniqKey = `alert-warning-${index}`
                        return (
                            <Alert variant="filled" severity="warning" className="mb-2" key={uniqKey}>
                                {String(warning)}
                            </Alert>
                        )
                    })}

                {errorList &&
                    errorList.map((error, index) => {
                        const uniqKey = `alert-error-${index}`
                        return (
                            <Alert variant="filled" severity="error" className="mb-2" key={uniqKey} action={
                                <Button>
                                    Send an e-mail about this error
                                </Button>
                            }>
                                {String(error)}
                            </Alert>
                        )
                    })}
            </div>
        </>
    )
}

export default connect(mapStateToProps, "")(Alerts)
