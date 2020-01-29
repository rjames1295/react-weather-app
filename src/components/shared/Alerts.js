import React from "react"
import { connect } from "react-redux"
import { Alert } from "reactstrap"
import { OWM_API_KEY_STR } from "../../config/config"


const mapStateToProps = state => ({
    warningList: state.warningList,
    errorList: state.errorList
})

class Alerts extends React.Component {
    
    render = () => {
        const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

        return (
            <div className="p-3">
                {
                    !apiKey && <Alert color="danger" className="mb-2">You will need to provide an API key before using this site!</Alert>
                }
                {this.props.warningList &&
                    this.props.warningList.map(warning => {
                        return (
                            <>
                                <Alert color="warning" className="mb-2">{String(warning)}</Alert>
                            </>
                        )
                    })}

                {this.props.errorList &&
                    this.props.errorList.map(error => {
                        return (
                            <>
                                <Alert color="danger" className="mb-2">{String(error)}</Alert>
                            </>
                        )
                    })}
            </div>
        )
    }
}

export default connect(mapStateToProps, "")(Alerts)
