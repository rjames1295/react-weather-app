import { combineReducers } from "redux"
import { StoreConstants as SC } from "./StoreConstants"

/**
 * @param {object} state initial state
 * @param {object} action
 */
const _geolocationReducer = (state = {}, action) => {
    switch (action.type) {
        case SC.SET_CURRENT_USER_GEOLOCATION:
            return { ...action.payload }
        case SC.UNSET_CURRENT_USER_GEOLOCATION:
            return {}
        default:
            return state
    }
}

const _selectedLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case SC.SET_SELECTED_LOCATION:
            return { ...action.payload }
        case SC.UNSET_SELECTED_LOCATION:
            return {}
        default:
            return state
    }
}

/**
 * @param {array} state array of strings
 * @param {*} action 
 */
const _warningsReducer = (state = [], action) => {
    switch (action.type) {
        case SC.ADD_TO_WARNING_LIST:
            return [...state, ...action.payload]
        case SC.UNSET_WARNING_LIST:
            return []
        default:
            return state
    }
}
/**
 * @param {array} state array of strings
 * @param {*} action 
 */
const _errorsReducer = (state = [], action) => {
    switch (action.type) {
        case SC.ADD_TO_ERROR_LIST:
            return [...state, action.payload]
        case SC.UNSET_ERROR_LIST:
            return []
        default:
            return state
    }
}

export default combineReducers({
    currentUserGeolocation: _geolocationReducer,
    selectedLocation: _selectedLocationReducer,
    warningList: _warningsReducer,
    errorList: _errorsReducer
})
