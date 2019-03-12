import ky from "ky"
import { ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE } from "../constants"

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
