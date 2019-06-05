import React, { Component } from "react"
import { DropTarget } from "react-dnd"

import Constants from "../constants"

const squareTarget = {
  canDrop(props, monitor) {
    const { hasPiece } = props

    return !hasPiece
  },

  drop(props, monitor) {
    const {
      movePiece,
      position: { x, y }
    } = props

    const item = monitor.getItem()

    movePiece(x, y, item)
  }
}

function collect(connect, monitor) {
  const info = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }

  return info
}

class BoardSquare extends Component {
  renderOverlay(color) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color
        }}
      />
    )
  }

  render() {
    const { connectDropTarget } = this.props

    const dropStyle = {
      position: "relative",
      width: "100%",
      height: "100%"
    }

    return connectDropTarget(
      <div style={dropStyle}>
        {this.props.children}
      </div>
    )
  }
}

export default DropTarget(Constants.BoardTypes.TABLE, squareTarget, collect)(BoardSquare)
