/**
 * @returns {object} with fields {lat, lng}
 */
const _getUserGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    if (position.coords) {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    }
                },
                err => {
                    console.error(err)
                    reject(err)
                }
            )
        } else {
            reject("Your browser does not support geolocation")
        }
    })
}

/**
 * @param {string} cityName name of city
 * @param {string} countryName name of country
 * @returns {}
 */
const _getUserGeolocationFromCity = (cityName, countryName) => {
    return new Promise((resolve, reject) => {
        resolve({})
    })
}

/**
 * @param {number} zipCode zip code of area
 * @returns {}
 */
const _getUserGeolocationFromZipCode = zipCode => {
    return new Promise((resolve, reject) => {
        resolve({})
    })
}

export { _getUserGeolocation, _getUserGeolocationFromCity, _getUserGeolocationFromZipCode }
