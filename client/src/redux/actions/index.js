import ky from "ky"
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE
} from "../constants"

function loginUserRequest(email, password) {
  return {
    type: LOGIN_USER_REQUEST,
    loading: true
  }
}

function loginUserSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    loading: false,
    data
  }
}

function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    loading: false,
    error
  }
}

export function loginUser(email, password) {
  return async function(dispatch) {
    dispatch(loginUserRequest(email, password))

    try {
      const res = await ky.post(`http://localhost/login`, {
        json: { email, password },
        credentials: "include"
      })

      return dispatch(loginUserSuccess(await res.json()))
    } catch (e) {
      return dispatch(loginUserFailure(e))
    }
  }
}

export function getEvents() {
  return async function(dispatch, getState) {
    dispatch({ type: GET_EVENTS_REQUEST, loading: true })

    try {
      const res = await ky.post("http://localhost/api/events", {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: GET_EVENTS_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: GET_EVENTS_FAILURE, loading: false, error: e })
    }
  }
}

export function getUser() {
  return async function(dispatch, getState) {
    dispatch({ type: GET_USER_REQUEST, loading: true })

    try {
      const res = await ky.get("http://localhost/api/user", {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: GET_USER_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: GET_USER_FAILURE, loading: false, error: e })
    }
  }
}

export function logout() {
  return async function(dispatch, getState) {
    dispatch({ type: LOGOUT_REQUEST, loading: true })

    try {
      const res = await ky.post("http://localhost/api/logout", {
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
      const res = await ky.post("http://localhost/login/refresh", {
        credentials: "include"
      })

      return dispatch({ type: REFRESH_TOKEN_SUCCESS, data: await res.json() })
    } catch (e) {
      return dispatch({ type: REFRESH_TOKEN_FAILURE, error: e })
    }
  }
}
