import moment from "moment"

const truncateString = (str, num = 10) => {
    if (str.length <= num) return str
    return str.slice(0, num) + "..."
}

/**
 * Convert 'thisSentence' to 'This sentence'
 * @param {string} str camel cased string to convert in to normal case with spacing
 */
const camelCaseToNormalCase = str => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, str2 => str2.toUpperCase())
}

/**
 * Convert 'This sentence' to 'thisSentence'
 * @param {string} str
 */
const stringToCamelCase = str => {
    if (!str) return null
    str = str.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
        return match.charAt(match.length - 1).toUpperCase()
    })
    return str.charAt(0).toLowerCase() + str.substring(1)
}

/**
 * Search recursively through a list of objects for objects that match keyword
 * @param {array} obj original array to search through
 * @param {string} key keyword to search for
 * @param {array} list new list to append results that match the keyword
 * @returns {array}
 */
const objectFindRecursive = (obj, key, list) => {
    if (!obj) return []
    if (Array.isArray(obj)) {
        for (let i in obj) {
            list = list.concat(objectFindRecursive(obj[i], key, []))
        }
        return list
    }
    if (obj[key]) list.push(obj[key])

    if (typeof obj === "object" && obj !== null) {
        const children = Object.keys(obj)
        if (children.length > 0) {
            for (let i in children) {
                list = list.concat(objectFindRecursive(obj[children[i]], key, []))
            }
        }
    }
    return list
}

/**
 * @param {array} list array of weather objects from openweathermap API
 * @returns {array}
 */
const _groupWeatherByDay = list => {
    if (!list || !list.length) return []

    const days = new Map() // Use Map to mantain insertion order of dates

    /**
     * Loop through the objects in the list,
     * Convert the dt into dddd Do MMMM format (Wednesday 29th January)
     * For every different [day], push the weather info
     */
    for (const weather of list) {
        const day = moment(weather.dt * 1000).format("dddd Do MMMM")
        if (!days[day]) days[day] = []
        days[day].push(weather)
    }

    return days
}

/**
 *
 * @param {object} data weather info object
 */
const mapDataToWeatherInterface = data => {
    const mapped = {
        city: data.name,
        country: data.sys.country,
        date: data.dt * 1000,
        humidity: data.main.humidity,
        icon_id: data.weather[0].id,
        temperature: data.main.temp,
        description: data.weather[0].description,
        wind_speed: data.wind.speed * 3.6,
        //   wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
        condition: data.cod
    }

    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) mapped.dt_txt = data.dt_txt

    if (data.weather[0].icon) mapped.icon = data.weather[0].icon

    if (data.main.temp_min && data.main.temp_max) {
        mapped.max = data.main.temp_max
        mapped.min = data.main.temp_min
    }

    // remove undefined fields
    Object.keys(mapped).forEach(key => mapped[key] === undefined && delete data[key])

    return mapped
}

export {
    truncateString,
    camelCaseToNormalCase,
    stringToCamelCase,
    objectFindRecursive,
    _groupWeatherByDay,
    mapDataToWeatherInterface
}
