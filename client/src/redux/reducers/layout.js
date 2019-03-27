import { MOVE_PIECE } from "../constants"

const initialState = {
  squares: Array.from({ length: 256 }).map((_, i) => {
    const x = i % 16
    const y = Math.floor(i / 16)

    return {
      x,
      y,
      piece: null
    }
  })
}

export default function layout(state = initialState, action) {
  switch (action.type) {
    case MOVE_PIECE:
      return {
        ...state,
        squares: state.squares.map(square => {
          if (square.x === action.position.kx && square.y === action.position.ky) {
            return {
              ...square,
              piece: action.piece.config
            }
          }

          if (square.x === action.piece.x && square.y === action.piece.y) {
            return {
              ...square,
              piece: null
            }
          }

          return square
        })
      }

    default:
      return state
  }
}
