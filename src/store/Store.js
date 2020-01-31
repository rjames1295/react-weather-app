import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
// import logger from "redux-logger"
import reducers from "./Reducers"

const initialState = {}
/**
 * Honestly don't know the config for redux
 * Will have to read documentation
 */
// const store = applyMiddleware(thunk, logger)(createStore)(reducers, initialState)
const store = applyMiddleware(thunk)(createStore)(reducers, initialState)

// So store is accessible via browser console
window.store = store

export default store
