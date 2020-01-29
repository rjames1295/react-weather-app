import React from "react"
import { OWM_API_KEY_STR } from "../../config/config"
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ModalBody
} from "reactstrap"

class AddAPIKeyModal extends React.Component {
    state = {
        apiKey: ""
    }

    _setOWMAPIKey = () => {
        const { apiKey } = this.state
        localStorage.setItem(OWM_API_KEY_STR, apiKey)
        window.location.reload()
    }

    _unsetOWMAPIKey = () => {
        localStorage.setItem(OWM_API_KEY_STR, "")
        window.location.reload()
    }

    _setStateFromInput = event => {
        const obj = {}
        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name
        obj[name] = value
        this.setState(obj)
    }

    render() {
        const { _closeHandler, _toggleHandler, isOpen } = this.props
        return isOpen ? (
            <>
                <Modal isOpen={isOpen} size="md" toggle={_toggleHandler} className="confirm-modal">
                    <ModalHeader>
                        <span>
                            Don't have an API key? Head over to{" "}
                            <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
                                Open Weather Map
                            </a>{" "}
                            and create a free acount
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            {/* <InputGroupAddon addonType="prepend">
                                <InputGroupText>Key!</InputGroupText>
                            </InputGroupAddon> */}
                            <Input
                                type="text"
                                name={"apiKey"}
                                value={this.state.apiKey}
                                onChange={this._setStateFromInput}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="success" onClick={this._setOWMAPIKey}>
                                    Set API key
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </ModalBody>
                </Modal>
            </>
        ) : (
            <></>
        )
    }
}

export default AddAPIKeyModal
