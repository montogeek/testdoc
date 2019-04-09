import ky from "ky"
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE
} from "../constants"

export function addItem(data, event_id, category_id) {
  return async function(dispatch, getState) {
    dispatch({ type: ADD_ITEM_REQUEST, loading: true })

    try {
      const res = await ky.post(`${process.env.REACT_APP_API_URL}/api/items/`, {
        json: { ...data, event_id, category_id },
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      if (res.ok) {
        return dispatch({ type: ADD_ITEM_SUCCESS, loading: false, data: await res.json() })
      }

      throw res
    } catch (e) {
      const error = await e.json()

      dispatch({ type: ADD_ITEM_FAILURE, loading: false, error: error.message })

      throw e
    }
  }
}

export function updateItem(data) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_ITEM_REQUEST, loading: true })

    try {
      const res = await ky.put(`${process.env.REACT_APP_API_URL}/api/items/${data.id}`, {
        json: data,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: UPDATE_ITEM_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: UPDATE_ITEM_FAILURE, loading: false, error: e })
    }
  }
}

export function removeItem(id, eventId, categoryId) {
  return async function(dispatch, getState) {
    dispatch({ type: REMOVE_ITEM_REQUEST, loading: true })

    try {
      await ky.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({
        type: REMOVE_ITEM_SUCCESS,
        loading: false,
        data: { id, eventId, categoryId }
      })
    } catch (e) {
      dispatch({ type: REMOVE_ITEM_FAILURE, loading: false, error: e })
      throw e
    }
  }
}
