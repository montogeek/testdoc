import ky from "ky"
import { ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE } from "../constants"

export function addItem(data, event_id, category_id) {
  return async function(dispatch, getState) {
    dispatch({ type: ADD_ITEM_REQUEST, loading: true })

    try {
      const res = await ky.post(`${API_URL}/api/items/`, {
        json: { ...data, event_id, category_id },
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      return dispatch({ type: ADD_ITEM_SUCCESS, loading: false, data: await res.json() })
    } catch (e) {
      return dispatch({ type: ADD_ITEM_FAILURE, loading: false, error: e })
    }
  }
}
