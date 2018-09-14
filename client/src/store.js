import createStore from "redux-zero"
import { applyMiddleware } from "redux-zero/middleware"
import { connect } from "redux-zero/devtools"
import ky from "ky"

const initialState = {
  auth: {
    authenticated: localStorage.getItem("authenticated", true),
    access_token: localStorage.getItem("access_token") || "",
    expires_in: localStorage.getItem("expires_in") || ""
  },
  data: {
    events: []
  },
  user: {}
}

const refreshToken = store => next => action => {
  const nextAction = next(action)

  const expires = parseInt(localStorage.getItem("expires_in"), 10)
  const now = Date.now()

  const refreshToken = async () => {
    const res = await ky
      .post("http://localhost/login/refresh", {
        credentials: "include"
      })
      .json()

    localStorage.setItem("access_token", res.access_token)
    localStorage.setItem("expires_in", Date.now() + res.expires_in * 1000)
    localStorage.setItem("authenticated", true)

    store.setState({
      auth: {
        authenticated: true,
        ...res
      }
    })
  }

  if (expires) {
    if (now > expires - 30000) { // If token is about to expire (30 seconds), refresh it.
      refreshToken()
      return nextAction
    }
  }

  return nextAction
}

const middlewares = connect ? applyMiddleware(connect(initialState), refreshToken) : []

const store = createStore(initialState, middlewares)

export default store
