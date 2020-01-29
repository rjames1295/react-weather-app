import React from "react"
import { truncateString } from "../../utils/_helpers"
import { OWM_API_KEY_STR } from "../../config/config"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from "reactstrap"
import { Link } from "react-router-dom"
import { routes } from "../../router/routes"
import AddAPIKeyModal from "../modals/AddAPIKeyModal"
import ConfirmModal from "../modals/ConfirmModal"

class NavBar extends React.Component {
    state = {
        isOpen: false,
        addAPIKeyModalOpen: false,

        apiKey: ""
    }

    _toggle = () => this.setState(!this.state.isOpen)

    _setOWMAPIKey = () => {
        const { apiKey } = this.state
        localStorage.setItem(OWM_API_KEY_STR, apiKey)
        window.location.reload()
    }

    _unsetOWMAPIKey = () => {
        localStorage.setItem(OWM_API_KEY_STR, "")
        window.location.reload()
    }

    _renderAPIKey = () => {
        const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

        if (apiKey) {
            return <DropdownItem className="cursor-normal">{truncateString(apiKey)}</DropdownItem>
        }

        return (
            <DropdownItem className="cursor-normal">
                <i>No API key set</i>
            </DropdownItem>
        )
    }

    _renderDropdownAction = () => {
        const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

        if (apiKey) {
            return (
                <DropdownItem onClick={this._unsetOWMAPIKey}>
                    <span className="text-danger">Remove API key</span>
                </DropdownItem>
            )
        }

        return (
            <DropdownItem
                onClick={() => {
                    this.setState({ addAPIKeyModalOpen: true })
                }}
            >
                Add API key
            </DropdownItem>
        )
    }

    render = () => {
        const { isOpen, addAPIKeyModalOpen } = this.state

        return (
            <div>
                <AddAPIKeyModal
                    isOpen={addAPIKeyModalOpen}
                    _closeHandler={() => {
                        this.setState({ addAPIKeyModalOpen: false })
                    }}
                    _toggleHandler={() => {
                        this.setState({ addAPIKeyModalOpen: !addAPIKeyModalOpen })
                    }}
                />
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">RWA</NavbarBrand>

                    <NavbarToggler onClick={this._toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to={routes.about} className="nav-link">
                                    About
                                    {/* <NavLink>Components</NavLink> */}
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://github.com/rjames1295/react-weather-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <UncontrolledDropdown inNavbar>
                                <DropdownToggle caret>API Key</DropdownToggle>
                                <DropdownMenu right>
                                    {this._renderAPIKey()}
                                    <DropdownItem divider />
                                    {this._renderDropdownAction()}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavbarText>
                        {/* <NavbarText>Simple Text</NavbarText> */}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar
