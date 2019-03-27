import React from "react"
import { DragSource } from "react-dnd"
import Constants from "../constants"

const SIZE = 2

const boxSource = {
  beginDrag(props) {
    return {
      type: props.type,
      config: props.config,
      x: props.x,
      y: props.y
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export function Piece(props) {
  const { rounded, size, count, isDragging, insideGrid } = props

  const [width, height] = rounded ? [size / SIZE, size / SIZE] : [75, size / SIZE]

  return (
    <div
      style={{
        backgroundColor: "#006BB4",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        borderRadius: rounded ? "50%" : 0,
        width: `${width}px`,
        height: `${height}px`,
        position: insideGrid ? "absolute" : "relative"
      }}
    >
      {size} x {count}
    </div>
  )
}

class TablePiece extends React.Component {
  render() {
    const { connectDragSource, isDragging, config } = this.props
    const insideGrid = this.props.x && this.props.y

    return connectDragSource(
      <div className="tablePiece">
        {/* {config}2 */}
        <Piece {...config} insideGrid={insideGrid} isDragging={isDragging} />
      </div>
    )
  }
}

export default DragSource(Constants.BoardTypes.TABLE, boxSource, collect)(TablePiece)
