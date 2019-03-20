import ky from "ky";
import {
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE
} from "../constants"

export function updateCategory(data, eventId) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_CATEGORY_REQUEST, loading: true })

    try {
      const res = await ky.put(`${process.env.REACT_APP_API_URL}/api/categories/${data.id}`, {
        json: { ...data, eventId },
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      if (res.ok) {
        return dispatch({ type: UPDATE_CATEGORY_SUCCESS, loading: false, data: await res.json() })
      }

      throw res
    } catch (e) {
      const error = await e.json()

      dispatch({ type: UPDATE_CATEGORY_FAILURE, loading: false, error: error.message })

      throw e
    }
  }
}