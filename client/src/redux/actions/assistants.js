import ky from "ky"

import {
  ADD_ASSISTANT_REQUEST,
  ADD_ASSISTANT_SUCCESS,
  ADD_ASSISTANT_FAILURE,
  UPDATE_ASSISTANT_REQUEST,
  UPDATE_ASSISTANT_SUCCESS,
  UPDATE_ASSISTANT_FAILURE,
  REMOVE_ASSISTANT_REQUEST,
  REMOVE_ASSISTANT_SUCCESS,
  REMOVE_ASSISTANT_FAILURE,
  IMPORT_ASSISTANTS_REQUEST,
  IMPORT_ASSISTANTS_SUCCESS,
  IMPORT_ASSISTANTS_FAILURE
} from "../constants"

export function updateAssistant(data) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_ASSISTANT_REQUEST, loading: true })

    try {
      const res = await ky.put(`${process.env.REACT_APP_API_URL}/api/assistants/${data.id}`, {
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
      await ky.delete(`${process.env.REACT_APP_API_URL}/api/assistants/${id}`, {
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

export function addAssistant(data, event_id) {
  return async function(dispatch, getState) {
    dispatch({ type: ADD_ASSISTANT_REQUEST, loading: true })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/api/assistants/`, {
        json: { ...data, event_id },
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      if (res.ok) {
        return dispatch({ type: ADD_ASSISTANT_SUCCESS, loading: false, data: await res.json() })
      }

      throw res
    } catch (e) {
      dispatch({ type: ADD_ASSISTANT_FAILURE, loading: false, error: e.message })

      throw e
    }
  }
}

export function importAssistants(data, event_id) {
  return async function(dispatch, getState) {
    dispatch({ type: IMPORT_ASSISTANTS_REQUEST, loading: true })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/api/assistants/importador/`, {
        body: data,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/assistants/importador/`, {
      //   method: "POST",
      //   // body: data,
      //   mode: "cors", // no-cors
      //   body: JSON.stringify({ foo: "bar" }),
      //   headers: {
      //     Authorization: "Bearer " + getState().user.data.access_token
      //   }
      // })

      // const res = await ky.post(`${process.env.REACT_APP_API_URL}/api/assistants/importador`, {
      //   json: { event_id },
      //   headers: {
      //     Authorization: "Bearer " + getState().user.data.access_token
      //   }
      // })

      if (res.ok) {
        return dispatch({ type: IMPORT_ASSISTANTS_SUCCESS, loading: false, data: await res.json() })
      }

      throw res
    } catch (e) {
      dispatch({ type: IMPORT_ASSISTANTS_FAILURE, loading: false, error: e.message })
      throw e
    }
  }
}
