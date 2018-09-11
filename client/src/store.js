import createStore from "redux-zero"
import { applyMiddleware } from "redux-zero/middleware"
import { connect } from "redux-zero/devtools"

const initialState = {
  auth: {
    authenticated: false,
    access_token: "",
    expires_in: ""
  },
  data: {
    events: []
  },
  user: {}
}

const middlewares = connect ? applyMiddleware(connect(initialState)) : []

const store = createStore(initialState, middlewares)

export default store
