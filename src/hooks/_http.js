import { useState, useEffect } from "react"
import axios from "../api_service/_axios"

export const useHttpGet = () => {
    const [url, setUrl] = useState(null)
    const [params, setParams] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)
    const [responseCode, setResponseCode] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const _fetchData = async () => {
            setIsLoading(true)
            let response = await axios.get(url, { params: { ...params } }).catch(err => {
                console.error("wtfffff", err)
                setErrorMessage(err.message)
                setResponseCode(err.status)
                setIsLoading(false)
            })
            if (response) {
                console.log(response)
                setFetchedData(response.data)
                setResponseCode(response.status)
                setIsLoading(false)
            } else {
                setErrorMessage("No response received")
                setIsLoading(false)
            }
        }

        if (url) {
            console.log("SENDING HTTP REQUEST")
            _fetchData()
        }
    }, [url, params])

    return [{ fetchedData, isLoading, errorMessage, responseCode }, setUrl, setParams]
}
