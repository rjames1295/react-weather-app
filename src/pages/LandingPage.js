import React from "react"
// import logo from "../logo.svg"
import LandingPageContainer from "../components/landing_page/LandingPageContainer"


class LandingPage extends React.Component {
    state = {}

    render = () => {
        return (
            <>
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header> */}
                <LandingPageContainer />
            </>
        )
    }
}

export default LandingPage
