import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user'
import events from './events'
import history from '../../history';


export default combineReducers({
  user,
  events,
  router: connectRouter(history)
})
