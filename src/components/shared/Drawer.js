import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
// import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Cancel from "@material-ui/icons/Cancel"
import Help from "@material-ui/icons/Help"
import VpnKey from "@material-ui/icons/VpnKey"
// import InboxIcon from "@material-ui/icons/MoveToInbox"
// import MailIcon from "@material-ui/icons/Mail"
import MenuIcon from "@material-ui/icons/Menu"

import AddAPIKeyModal from "../modals/AddAPIKeyModal"
import ConfirmModal from "../modals/ConfirmModal"

import { OWM_API_KEY_STR } from "../../config/config"
import { truncateString } from "../../utils/_helpers"

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
})

const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

const Drawer = () => {
    const classes = useStyles()
    const [isAddAPIKeyModalOpen, setIsAddAPIKeyModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const _toggleDrawer = open => event => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setIsDrawerOpen(open)
    }

    const _toggleAddAPIKeyModal = () => {
        setIsAddAPIKeyModalOpen(!isAddAPIKeyModalOpen)
    }

    const _toggleConfirmModal = () => {
        setIsConfirmModalOpen(!isConfirmModalOpen)
    }

    const _renderAPIKeyDrawerItem = () => {
        if (apiKey) {
            return (
                <ListItem>
                    <ListItemIcon>
                        <VpnKey />
                    </ListItemIcon>
                    <ListItemText color="red">API key: {truncateString(apiKey, 5)}</ListItemText>
                </ListItem>
            )
        }
        return (
            <ListItem
                button
                onClick={() => {
                    _toggleAddAPIKeyModal()
                    // _handleClose()
                }}
            >
                <ListItemIcon>
                    <VpnKey />
                </ListItemIcon>
                <ListItemText>Add API key</ListItemText>
            </ListItem>
        )
    }

    const _renderDrawerItems = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={_toggleDrawer(false)}
            onKeyDown={_toggleDrawer(false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/about">About</Link>
                    </ListItemText>
                </ListItem>
                {_renderAPIKeyDrawerItem()}
            </List>
            <Divider />
            <List>
                {apiKey ? (
                    <ListItem button onClick={_toggleConfirmModal}>
                        <ListItemIcon>
                            <Cancel />
                        </ListItemIcon>
                        <ListItemText primary={"Remove API key"} />
                    </ListItem>
                ) : (
                    <></>
                )}
            </List>
        </div>
    )

    return (
        <>
            <AddAPIKeyModal
                isOpen={isAddAPIKeyModalOpen}
                _closeHandler={() => {
                    setIsAddAPIKeyModalOpen(false)
                }}
                _toggleHandler={_toggleAddAPIKeyModal}
            />
            <ConfirmModal
                message={"Are you sure you want to remove your API key?"}
                _closeHandler={() => {
                    setIsConfirmModalOpen(false)
                }}
                _toggleHandler={_toggleConfirmModal}
                _onDecide={isConfirmed => {
                    if (isConfirmed) {
                        localStorage.setItem(OWM_API_KEY_STR, "")
                        window.location.reload()
                    }
                }}
                isOpen={isConfirmModalOpen}
            />
            <MenuIcon onClick={_toggleDrawer(true)} />
            <SwipeableDrawer open={isDrawerOpen} onClose={_toggleDrawer(false)} onOpen={_toggleDrawer(true)}>
                {_renderDrawerItems()}
            </SwipeableDrawer>
        </>
    )
}

export default connect("", "")(Drawer)
