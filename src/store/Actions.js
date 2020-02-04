import { StoreConstants as SC } from "./StoreConstants"

/**
 * @param {object} payload required fields {lat, lng}
 */
const _actionSetCurrentUserGeolocation = payload => {
    return {
        type: SC.SET_CURRENT_USER_GEOLOCATION,
        payload: payload
    }
}

/**
 * @returns {object} empty
 */
const _actionUnsetCurrentUserGeolocation = () => {
    return {
        type: SC.UNSET_CURRENT_USER_GEOLOCATION,
        payload: {}
    }
}

/**
 * @param {string} payload location string i.e. Manama, Bahrain
 */
const _actionSetSelectedLocation = payload => {
    return {
        type: SC.SET_SELECTED_LOCATION,
        payload: payload
    }
}

const _actionUnsetSelectedLocation = () => {
    return {
        type: SC.UNSET_SELECTED_LOCATION,
        payload: ""
    }
}

/**
 * @param {array} payload error array of strings
 */
const _actionAddToErrors = payload => {
    return {
        type: SC.ADD_TO_ERROR_LIST,
        payload: payload
    }
}

/**
 * @returns {array} empty
 */
const _actionUnsetErrors = () => {
    return {
        type: SC.UNSET_ERROR_LIST,
        payload: []
    }
}

export {
    _actionSetCurrentUserGeolocation,
    _actionUnsetCurrentUserGeolocation,
    _actionSetSelectedLocation,
    _actionUnsetSelectedLocation,
    _actionAddToErrors,
    _actionUnsetErrors
}
