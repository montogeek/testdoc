import { loginUser } from "../actions"
import { LOGIN_USER } from "../constants"

const initialState = {
  user: null
}

function userSession(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload }
      break

    default:
      return state
      break
  }
}

export default userSession
