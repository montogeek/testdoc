import ky from "ky"
import {
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE
} from "../constants"

export function getEvents() {
  return async function(dispatch, getState) {
    dispatch({ type: GET_EVENTS_REQUEST, loading: true })

    try {
      const res = await ky.get(`${API_URL}/api/events`, {
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

export function createEvent(data) {
  return async function(dispatch, getState) {
    dispatch({ type: CREATE_EVENT_REQUEST })
    try {
      const res = await ky.post(`${API_URL}/api/events`, {
        json: data,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: CREATE_EVENT_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: CREATE_EVENT_FAILURE, loading: false, error: e })
    }
  }
}

export function updateEvent(data) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_EVENT_REQUEST })
    try {
      const res = await ky.put(`${API_URL}/api/events/${data.id}`, {
        json: data,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: UPDATE_EVENT_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: UPDATE_EVENT_FAILURE, loading: false, error: e })
    }
  }
}
