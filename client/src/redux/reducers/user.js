import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS
} from "../constants"

const initialState = {
  data: {
    authenticated: localStorage.getItem("authenticated") === "true" ? true : false,
    access_token: localStorage.getItem("access_token") || "",
    expires_in: localStorage.getItem("expires_in") || ""
  },
  error: null,
  loading: false
}

export default function userSession(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: action.loading }

    case LOGIN_USER_SUCCESS:
      localStorage.setItem("access_token", action.data.access_token)
      localStorage.setItem("expires_in", Date.now() + action.data.expires_in * 1000)
      localStorage.setItem("authenticated", true)

      return {
        ...state,
        data: {
          access_token: action.data.access_token,
          expires_in: Date.now() + action.data.expires_in * 1000,
          authenticated: true
        },
        loading: action.loading
      }

    case GET_USER_REQUEST:
      return { ...state, loading: action.loading }

    case GET_USER_SUCCESS:
      return { ...state, loading: action.loading, data: { ...state.data, ...action.data } }

    case LOGOUT_REQUEST:
      localStorage.removeItem("access_token")
      localStorage.removeItem("expires_in")
      localStorage.removeItem("authenticated")

      return { ...state, loading: action.loading }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: {
          authenticated: false
        }
      }

    case REFRESH_TOKEN_REQUEST:
      return state

    case REFRESH_TOKEN_SUCCESS:
      return { ...state, data: { ...state.data, ...action.data } }

    default:
      return state
  }
}
