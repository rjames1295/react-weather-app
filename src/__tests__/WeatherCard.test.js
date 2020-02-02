import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import WeatherCard from "../components/shared/WeatherCard"
import { fakeCurrentWeatherData, day } from "../__mocks__/current_weather"

describe("<WeatherCard />", () => {
    let container = null

    beforeEach(() => {
        container = document.createElement("div")
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
        container = null
    })

    it("renders the <WeatherCard /> component without crashing", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeCurrentWeatherData)
            })
        )

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<WeatherCard weatherInfo={fakeCurrentWeatherData} day={day} />, container)
        })

        global.fetch.mockRestore()
    })

    it("renders the <WeatherCard /> component with weather info in correct areas", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeCurrentWeatherData)
            })
        )

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<WeatherCard weatherInfo={fakeCurrentWeatherData} day={day} />, container)
        })

        expect(container.querySelector("#weather-card-title").textContent).toBe(fakeCurrentWeatherData.name)
        expect(container.querySelector("#weather-card-sub-title").textContent).toBe(fakeCurrentWeatherData.name)
        expect(container.querySelector("#weather-card-day").textContent).toBe(day)

        global.fetch.mockRestore()
    })
})
