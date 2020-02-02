import React, { useState } from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
// import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"

import Build from "@material-ui/icons/Build"
import Help from "@material-ui/icons/Help"
import VpnKey from "@material-ui/icons/VpnKey"
import DeleteIcon from "@material-ui/icons/Delete"
import MenuIcon from "@material-ui/icons/Menu"
// import InboxIcon from "@material-ui/icons/MoveToInbox"
// import MailIcon from "@material-ui/icons/Mail"

import AddAPIKeyModal from "../modals/AddAPIKeyModal"
import ConfirmModal from "../modals/ConfirmModal"

import { OWM_API_KEY_STR } from "../../config/config"
import { truncateString } from "../../utils/_helpers"
import { routes } from "../../router/routes"

const useStyles = makeStyles({
    list: {
        width: 350
    },
    fullList: {
        width: "auto"
    }
})

const apiKey = localStorage.getItem(OWM_API_KEY_STR) || ""

const ListItemLink = props => {
    return <ListItem button component={Link} {...props} />
}

const Drawer = props => {
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
                    <ListItemText color="red">API key: {truncateString(apiKey, 15)}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={_toggleConfirmModal}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
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
                <ListItemLink to={routes.about}>
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText>About</ListItemText>
                </ListItemLink>
                <ListItemLink to={routes.builtWith}>
                    <ListItemIcon>
                        <Build />
                    </ListItemIcon>
                    <ListItemText>Built using</ListItemText>
                </ListItemLink>
            </List>
            <Divider />
            <List>{_renderAPIKeyDrawerItem()}</List>
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
            <SwipeableDrawer
                anchor="left"
                open={isDrawerOpen}
                onClose={_toggleDrawer(false)}
                onOpen={_toggleDrawer(true)}
            >
                {_renderDrawerItems()}
            </SwipeableDrawer>
        </>
    )
}

export default Drawer
