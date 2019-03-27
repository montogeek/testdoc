import React, { Component } from "react"
import { connect } from "react-redux"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

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

  movePiece = (x, y, item) => {
    // if (!this.canMove(x, y)) return false
    this.props.moveTable(x, y, this.props.event.id, item)
  }

  renderPiece(x, y, piece) {
    if (piece !== null) {
      return <TablePiece x={x} y={y} config={piece} />
    }

    return null
  }

  renderSquare({ x, y, piece }) {
    return (
      <div
        key={x + y * 16}
        style={{
          width: "50px",
          height: "50px",
          borderTop: "1px solid #69707D",
          borderRight: "1px solid #69707D",
          borderLeft: x === 0 ? "1px solid #69707D" : "none", // first column
          borderBottom: y === 15 ? "1px solid #69707D" : "none" // last row
        }}
      >
        <BoardSquare canMovePiece={this.canMove} movePiece={this.movePiece} position={{ x, y }}>
          {this.renderPiece(x, y, piece)}
        </BoardSquare>
      </div>
    )
  }

  render() {
    const { squares } = this.props

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
          {squares.map(square => this.renderSquare(square))}
        </div>
        <div style={{ position: "relative" }}>
          {Object.keys(Constants.TableImage).map(type => (
            <TablePiece type={type} config={Constants.TableImage[type]} />
          ))}
        </div>
      </div>
    )
  }
}

Board = DragDropContext(HTML5Backend)(Board)
Board = connect(
  ({ layout }) => ({ squares: layout.squares }),
  { moveTable }
)(Board)

export default Board
