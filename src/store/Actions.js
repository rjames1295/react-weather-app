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

export { _actionSetCurrentUserGeolocation, _actionUnsetCurrentUserGeolocation }
