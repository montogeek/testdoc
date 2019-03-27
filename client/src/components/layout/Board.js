import React, { Component } from "react"
import { connect } from "react-redux"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import Knight from "./Knight"
import BoardSquare from "./Drop/BoardSquare"
import { moveTable } from "../../redux/actions/layout"
import Constants from "./constants"
import TablePiece from "./Drag/TablePiece"

class Board extends Component {
  canMove = (x, y) => {
    const { kx, ky } = this.props.event.position

    const dx = x - kx
    const dy = y - ky

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  }

  movePiece = (x, y) => {
    if (!this.canMove(x, y)) return false
    this.props.moveTable(x, y, this.props.event.id)
  }

  renderPiece(x, y) {
    const { kx, ky } = this.props.event.position
    if (x === kx && y === ky) {
      return <Knight />
    }
  }

  renderSquare(i) {
    const x = i % 16
    const y = Math.floor(i / 16)

    return (
      <div key={i} style={{ width: "50px", height: "50px" }}>
        <BoardSquare canMovePiece={this.canMove} movePiece={this.movePiece} position={{ x, y }}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }

  render() {
    const squares = []
    for (let i = 0; i < 256; i++) {
      squares.push(this.renderSquare(i))
    }

    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "800px",
            height: "800px",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {squares}
        </div>
        {Object.keys(Constants.TableImage).map(type => (
          <TablePiece type={type} image={Constants.TableImage[type]} />
        ))}
      </div>
    )
  }
}

Board = DragDropContext(HTML5Backend)(Board)
Board = connect(
  null,
  { moveTable }
)(Board)

export default Board
