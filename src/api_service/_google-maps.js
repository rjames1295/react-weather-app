/**
 * Google Maps API endpoints
 */

import { GOOGLE_MAPS_API_KEY } from "../config/config"


export const _gMapsAPI = {
    /**
     * @param {string} placeId placeId of location from maps search
     */
    getPlacesURL: () => {
        return `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
    },
    getPlaceInfoByPlaceIdURL: (placeId) => {
        return `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
    }
}

