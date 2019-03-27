import { MOVE_PIECE } from "../constants"

export function moveTable(kx, ky, eventId, piece) {
  return {
    type: MOVE_PIECE,
    position: { kx, ky },
    eventId,
    piece
  }
}