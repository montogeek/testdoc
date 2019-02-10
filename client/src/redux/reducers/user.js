import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from "../constants"

const initialState = {
  data: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false,
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
      localStorage.setItem("isAuthenticated", true)

      return {
        ...state,
        data: {
          access_token: action.data.access_token,
          expires_in: Date.now() + action.data.expires_in * 1000,
          isAuthenticated: true
        },
        loading: action.loading
      }

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      }

    case REGISTER_USER_REQUEST:
      return { ...state, loading: action.loading }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        data: {
          isAuthenticated: false
        },
        loading: action.loading
      }

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      }

    case GET_USER_REQUEST:
      return { ...state, loading: action.loading }

    case GET_USER_SUCCESS:
      return { ...state, loading: action.loading, data: { ...state.data, ...action.data } }

    case LOGOUT_REQUEST:
      localStorage.removeItem("access_token")
      localStorage.removeItem("expires_in")
      localStorage.removeItem("isAuthenticated")

      return { ...state, loading: action.loading }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: {
          isAuthenticated: false
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
