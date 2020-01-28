import { toast } from "react-toastify"

/**
 * @param {string} variant required enum [success, info, warning, error]
 * @param {string} msg messaged to be displayed inside toastr
 * @param {object} params additional parameters
 */
const _toast = (variant = "info", msg = "", params = {}) => {
    if (Array.isArray(msg)) {
        for (let key in msg) {
            let singleErr = msg[key]
            for (let key_ in singleErr) toast[variant](singleErr[key_])
        }
    } else {
        toast[variant](msg)
    }
}

export { _toast }
