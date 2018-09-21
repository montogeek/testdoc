import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"

import rootReducer from "./reducers"
import { refreshToken } from "./actions"

const loggerMiddleware = createLogger()

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, refreshTokenMiddleware))
  )
}
