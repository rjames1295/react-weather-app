import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import createMockStore from "redux-mock-store"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { Provider } from "react-redux"

import App from "../App"
import { currentUserGeolocation } from "../__mocks__/current_user_geolocation"

const mockStore = createMockStore([])

describe("<App />", () => {
    let container = null
    let store = null

    beforeEach(() => {
        // Setup the store to set geolocation
        store = mockStore({
            currentUserGeolocation: currentUserGeolocation
        })
        container = document.createElement("div")
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
        container = null
    })

    it("renders the <App /> component crashing", () => {
        act(() => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </BrowserRouter>
                </Provider>,
                container
            )
        })
    })
})
