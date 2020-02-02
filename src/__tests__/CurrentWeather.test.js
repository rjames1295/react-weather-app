import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import createMockStore from "redux-mock-store"

import CurrentWeather from "../components/weather/CurrentWeather"
import { fakeCurrentWeatherData } from "../__mocks__/current_weather"
import { currentUserGeolocation } from "../__mocks__/current_user_geolocation"
import { Provider } from "react-redux"

const mockStore = createMockStore([])

describe("<CurrentWeather />", () => {
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
        store = null
        container.remove()
        container = null
    })

    it("renders the <CurrentWeather /> component without crashing", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeCurrentWeatherData)
            })
        )

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(
                <Provider store={store}>
                    <CurrentWeather />
                </Provider>,
                container
            )
        })

        global.fetch.mockRestore()
    })
})
