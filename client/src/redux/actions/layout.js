import { MOVE_TABLE } from "../constants"

export function moveTable(x, y) {
  return {
    type: MOVE_TABLE,
    x,
    y
  }
}
