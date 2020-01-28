import { combineReducers } from "redux"
import { StoreConstants as SC } from "./StoreConstants"

/**
 * @param {object} state initial state
 * @param {object} action 
 */
const _geolocationReducer = (state = {}, action) => {
    switch (action.type) {
        case(SC.SET_CURRENT_USER_GEOLOCATION):
            return { ...state, ...action.payload }
        case(SC.UNSET_CURRENT_USER_GEOLOCATION):
            return { }
        default:
            return state
    }
}

export default combineReducers({
    currentUserGeolocation: _geolocationReducer
})
