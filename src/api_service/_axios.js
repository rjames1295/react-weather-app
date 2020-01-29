/**
 * Global axios config to intercept requests/response
 * and show toastrs on error
 */

import axios from "axios"
import { _toast as toast } from "../utils/_toast"

const _axios = axios.create({})

_axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        toast("error", err.message)
        return Promise.reject(err)
    }
)

_axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        toast("error", err.message)
        return Promise.reject(err)
    }
)

export default _axios
