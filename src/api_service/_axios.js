/**
 * Global axios config to intercept requests/response
 * and show toastrs on error
 */

import axios from "axios"
import { _actionAddToErrors } from "../store/Actions"
import store from "../store/Store"

const _axios = axios.create({})

_axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        if (err.message && !err.response.data) {
            store.dispatch(_actionAddToErrors(err.message))
        }

        if (err.message && err.response && err.response.data && err.response.data.message) {
            store.dispatch(_actionAddToErrors(`${err.message} ${err.response.data.message}`))
        }
        
        return Promise.reject(err)
    }
)

_axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.message && !err.response.data) {
            store.dispatch(_actionAddToErrors(err.message))
        }

        if (err.message && err.response && err.response.data && err.response.data.message) {
            store.dispatch(_actionAddToErrors(`${err.message} ${err.response.data.message}`))
        }
        
        return Promise.reject(err)
    }
)

export default _axios
