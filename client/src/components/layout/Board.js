import React, { Component } from "react"
import { connect } from "react-redux"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import BoardSquare from "./Drop/BoardSquare"
import { moveTable, removePiece } from "../../redux/actions/layout"
import Constants from "./constants"
import TablePiece from "./Drag/TablePiece"

class Board extends Component {
  movePiece = (x, y, item) => {
    this.props.moveTable(x, y, this.props.event.id, item)
  }

  removePiece = (x, y, item) => {
    this.props.removePiece(x, y, this.props.event.id, item)
  }

  renderPiece(x, y, piece) {
    if (piece !== null) {
      return <TablePiece x={x} y={y} config={piece} removePiece={this.removePiece} />
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
        <BoardSquare
          hasPiece={!(piece === null)}
          canMovePiece={this.canMove}
          movePiece={this.movePiece}
          position={{ x, y }}
        >
          {this.renderPiece(x, y, piece)}
        </BoardSquare>
      </div>
    )
  }

  render() {
    const {
      event: { chairs },
      squares
    } = this.props

    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "800px",
              height: "800px",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {((chairs && chairs.layout) || squares).map(square => this.renderSquare(square))}
          </div>
          <div style={{ position: "relative" }}>
            {Object.keys(Constants.TableImage).map((type, i) => (
              <TablePiece key={i} type={type} config={Constants.TableImage[type]} />
            ))}
          </div>
        </div>
      </DndProvider>
    )
  }
}

Board = connect(
  ({ layout }) => ({ squares: layout.squares }),
  { moveTable, removePiece }
)(Board)

export default Board
