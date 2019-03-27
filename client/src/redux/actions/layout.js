import { MOVE_TABLE } from "../constants"

export function moveTable(kx, ky, eventId, config) {
  return {
    type: MOVE_TABLE,
    position: { kx, ky },
    eventId,
    config
  }
}