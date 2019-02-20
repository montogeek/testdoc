import ky from "ky"
import { push } from "connected-react-router"
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from "../constants"

export function loginUser(email, password) {
  return async function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
      loading: true
    })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/login`, {
        json: { email, password },
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      })

      if (res.ok) {
        return dispatch({
          type: LOGIN_USER_SUCCESS,
          loading: false,
          data: await res.json()
        })
      }

      throw res
    } catch (e) {
      const error = await e.json()

      dispatch({
        type: LOGIN_USER_FAILURE,
        loading: false,
        error: error.message
      })

      throw e
    }
  }
}

export function registerUser(name, email, password, password_confirmation) {
  return async function(dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
      loading: true
    })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/register`, {
        json: { name, email, password, password_confirmation },
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      })

      if(res.ok) {
        return dispatch({
          type: REGISTER_USER_SUCCESS,
          loading: false,
          data: await res.json()
        })
      }

      throw res
    } catch (e) {
      const error = await e.json()

      dispatch({
        type: REGISTER_USER_FAILURE,
        loading: false,
        error: error.message
      })

      throw error
    }
  }
}

export function getUser() {
  return async function(dispatch, getState) {
    dispatch({ type: GET_USER_REQUEST, loading: true })

    try {
      const res = await ky.get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      if (!res.ok) {
        dispatch(logoutUser())
        dispatch(push("/"))
      }

      return dispatch({ type: GET_USER_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: GET_USER_FAILURE, loading: false, error: e })
    }
  }
}

export function logoutUser() {
  return async function(dispatch, getState) {
    dispatch({ type: LOGOUT_REQUEST, loading: true })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/api/logout`, {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: LOGOUT_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: LOGOUT_FAILURE, loading: false, error: e })
    }
  }
}

export function refreshToken() {
  return async function(dispatch) {
    dispatch({ type: REFRESH_TOKEN_REQUEST })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/login/refresh`, {
        credentials: "include"
      })

      return dispatch({ type: REFRESH_TOKEN_SUCCESS, data: await res.json() })
    } catch (e) {
      return dispatch({ type: REFRESH_TOKEN_FAILURE, error: e })
    }
  }
}
