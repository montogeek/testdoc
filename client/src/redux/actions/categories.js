import ky from "ky";
import {
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE
} from "./constants"

export function addCategory(data, eventId) {
  return async function(dispatch, getState) {
    dispatch({ type: UPDATE_CATEGORY_REQUEST, loading: true })

    try {

    } catch (e) {
      const error = await e.json()

      dispatch()
    }
  }
}