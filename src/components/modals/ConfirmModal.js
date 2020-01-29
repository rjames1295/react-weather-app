import React from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalFooter, Row, Col } from "reactstrap"

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: true
        }
    }

    handleCancel = e => {
        this.props.onDecide(false)
        this.setState({
            showModal: false
        })
    }

    handleYes = e => {
        this.props.onDecide(true)
        this.setState({
            showModal: false
        })
    }

    render() {
        const { text } = this.props
        const { showModal } = this.state
        return showModal ? (
            <>
                <Modal isOpen={showModal} size="sm" toggle={this.handleCancel} className="confirm-modal">
                    <ModalHeader>
                        <span>{text}</span>
                    </ModalHeader>
                    <ModalFooter>
                        <Row className="mt-4">
                            <Col lg="6" md="6" sm="6">
                                <Button className="default-btn-solid danger" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <Button className="default-btn-solid success" onClick={this.handleYes}>
                                    Yes
                                </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </>
        ) : (
            <></>
        )
    }
}

export default connect("", "")(ConfirmModal)
