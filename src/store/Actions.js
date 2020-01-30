import { StoreConstants as SC } from "./StoreConstants"

/**
 * @param {object} payload required fields {lat, lng}
 * @returns {object} fields {type, payload}
 */
const _actionSetCurrentUserGeolocation = payload => {
    return {
        type: SC.SET_CURRENT_USER_GEOLOCATION,
        payload: payload
    }
}

/**
 * @returns {object} fields {type}
 */
const _actionUnsetCurrentUserGeolocation = () => {
    return {
        type: SC.UNSET_CURRENT_USER_GEOLOCATION,
        payload: null
    }
}

/**
 *
 */
const _actionAddToErrors = payload => {
    return {
        type: SC.ADD_TO_ERROR_LIST,
        payload: payload
    }
}

const _actionUnsetErrors = () => {
    return {
        type: SC.UNSET_ERROR_LIST,
        payload: null
    }
}

export { _actionSetCurrentUserGeolocation, _actionUnsetCurrentUserGeolocation, _actionAddToErrors, _actionUnsetErrors }
