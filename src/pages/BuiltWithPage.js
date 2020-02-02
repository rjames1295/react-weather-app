import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
// import IconButton from "@material-ui/core/IconButton"

import ImageIcon from "@material-ui/icons/Image"
import CodeIcon from "@material-ui/icons/Code"
import CloudIcon from "@material-ui/icons/Cloud"
import StorageIcon from "@material-ui/icons/Storage"
import CallMadeIcon from "@material-ui/icons/CallMade"
// import WorkIcon from "@material-ui/icons/Work"
// import BeachAccessIcon from "@material-ui/icons/BeachAccess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}))

const ListItemLink = props => {
    return <ListItem button component={"a"} {...props} />
}

const frontendEndTechStackList = [
    {
        name: "React",
        description: "JavaScript framework",
        link: "https://reactjs.org/",
        icon: <CodeIcon />
    },
    {
        name: "React Redux",
        description: "Global data store",
        link: "https://react-redux.js.org/",
        icon: <StorageIcon />
    },
    {
        name: "Material UI",
        description: "UI Framework",
        link: "https://material-ui.com/",
        icon: ""
    }
    // {
    //     name: "notistack",
    //     link: "https://github.com/iamhosseindhv/notistack"
    // },
    // {
    //     name: "Axios",
    //     link: "https://github.com/axios/axios"
    // }
]

export default function SimpleExpansionPanel() {
    const classes = useStyles()

    const [isFrontendPanelOpen, setIsFrontendPanelOpen] = useState(true)
    const [isAPIPanelOpen, setIsAPIPanelOpen] = useState(false)

    return (
        <Container>
            <div className={classes.root}>
                <ExpansionPanel
                    expanded={isFrontendPanelOpen}
                    onChange={() => {
                        setIsFrontendPanelOpen(!isFrontendPanelOpen)
                    }}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Website</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item lg={12}>
                                <List className={classes.root}>
                                    {frontendEndTechStackList.map((tech, index) => {
                                        const uniqKey = `tech-stack-${index}`
                                        return (
                                            <ListItemLink
                                                key={uniqKey}
                                                href={tech.link}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>{tech.icon ? tech.icon : <ImageIcon />}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={tech.name} secondary={tech.description} />
                                                <ListItemSecondaryAction className="cursor-pointer">
                                                    <a href={tech.link}>
                                                        {/* <IconButton edge="end" aria-label="delete"> */}
                                                        <CallMadeIcon />
                                                        {/* </IconButton> */}
                                                    </a>
                                                </ListItemSecondaryAction>
                                            </ListItemLink>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    expanded={isAPIPanelOpen}
                    onChange={() => {
                        setIsAPIPanelOpen(!isAPIPanelOpen)
                    }}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>APIs</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item lg={12}>
                                <List className={classes.root}>
                                    <ListItemLink
                                        href={"https://openweathermap.org"}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CloudIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={"OpenWeatherMap API"} secondary={"Weather API"} />
                                        <ListItemSecondaryAction className="cursor-pointer">
                                            <a href={"owo"}>
                                                <CallMadeIcon />
                                            </a>
                                        </ListItemSecondaryAction>
                                    </ListItemLink>
                                </List>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Container>
    )
}
