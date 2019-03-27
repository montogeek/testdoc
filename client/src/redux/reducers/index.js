import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import user from "./user"
import events from "./events"
import layout from "./layout"
import history from "../../history"

export default combineReducers({
  user,
  events,
  layout,
  router: connectRouter(history)
})
