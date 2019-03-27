import { MOVE_TABLE } from "../constants"

export function moveTable(kx, ky, eventId) {
  return {
    type: MOVE_TABLE,
    eventId,
    position: { kx, ky }
  }
}