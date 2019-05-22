import kys from "ky"
import { MOVE_PIECE, REMOVE_PIECE } from "../constants"

export function moveTable(kx, ky, eventId, piece) {
  return async function(dispatch, getState) {
    dispatch({
      type: MOVE_PIECE,
      position: { kx, ky },
      eventId,
      piece
    })

    try {
      const res = await kys.put(`${process.env.REACT_APP_API_URL}/api/layout/${eventId}`, {
        json: getState().events.data.find(event => event.id === eventId).chairs.layout,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })

      if (res.ok) {
        return {
          type: MOVE_PIECE,
          position: { kx, ky },
          eventId,
          piece
        }
      }
    } catch (e) {
      throw e
    }
  }
}

export function removePiece(kx, ky, eventId, piece) {
  return async function(dispatch, getState) {
    dispatch({
      type: REMOVE_PIECE,
      position: { kx, ky },
      eventId,
      piece
    })

    try {
      const res = await kys.put(`${process.env.REACT_APP_API_URL}/api/layout/${eventId}`, {
        json: getState().events.data.find(event => event.id === eventId).chairs.layout,
        headers: {
          Authorization: "Bearer " + getState().user.data.access_token
        }
      })
      if (res.ok) {
        return {
          type: REMOVE_PIECE,
          position: { kx, ky },
          eventId,
          piece
        }
      }
    } catch (e) {
      throw e
    }
  }
}
