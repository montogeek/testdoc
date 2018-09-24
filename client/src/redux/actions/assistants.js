import ky from "ky"

import {
  UPDATE_ASSISTANT_REQUEST,
  UPDATE_ASSISTANT_SUCCESS,
  UPDATE_ASSISTANT_FAILURE,
  REMOVE_ASSISTANT_REQUEST,
  REMOVE_ASSISTANT_SUCCESS,
  REMOVE_ASSISTANT_FAILURE
} from "../constants"

export function updateAssistant(data) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_ASSISTANT_REQUEST, loading: true })

    try {
      const res = await ky.put(`${API_URL}/api/assistants/${data.id}`, {
        json: data,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: UPDATE_ASSISTANT_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: UPDATE_ASSISTANT_FAILURE, loading: false, error: e })
    }
  }
}

export function removeAssistant(id, event_id) {
  return async function(dispatch, getState) {
    dispatch({ type: REMOVE_ASSISTANT_REQUEST, loading: true })

    try {
      const res = await ky.delete(`${API_URL}/api/assistants/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: REMOVE_ASSISTANT_SUCCESS, loading: false, data: { event_id, id } })
    } catch (e) {
      return dispatch({ type: REMOVE_ASSISTANT_FAILURE, loading: false, error: e })
    }
  }
}
