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
 * @param {any} key keyword to search for
 * @param {array} list new list to append results that match the keyword
 * @returns {array}
 */
const objectFindRecursive = (obj, key, list) => {
    //    key = stringToCamelCase(key);
    if (!obj) return []
    if (obj instanceof Array) {
        for (let i in obj) {
            list = list.concat(objectFindRecursive(obj[i], key, []))
        }
        return list
    }
    if (obj[key]) list.push(obj[key])

    if (typeof obj == "object" && obj !== null) {
        const children = Object.keys(obj)
        if (children.length > 0) {
            for (let i in children) {
                list = list.concat(objectFindRecursive(obj[children[i]], key, []))
            }
        }
    }
    return list
}

export { camelCaseToNormalCase, stringToCamelCase, objectFindRecursive }
