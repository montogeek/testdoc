import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { connectRouter, routerMiddleware } from "connected-react-router"
import rootReducer from "./reducers"
import { refreshToken } from "./actions/user"
import history from "../history"

export function loadState() {
  try {
    const state = localStorage.getItem("state")

    if (state === null) {
      return undefined
    }

    return JSON.parse(state)
  } catch (e) {
    return undefined
  }
}

export function saveState(state) {
  try {
    const stateJSON = JSON.stringify(state)
    localStorage.setItem("state", stateJSON)
  } catch (e) {
    throw e
  }
}

const refreshTokenMiddleware = store => next => action => {
  const expires = parseInt(store.getState().user.data.expires_in, 10)
  const now = Date.now()

  if (expires) {
    if (now > expires - 30000) {
      next(refreshToken())
    }
  }

  return next(action)
}

const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware,
        refreshTokenMiddleware
      )
    )
  )
}
