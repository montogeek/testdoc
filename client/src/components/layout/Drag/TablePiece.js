import React from "react"
import { DragSource } from "react-dnd"
import Constants from "../constants"

const boxSource = {
  beginDrag(props) {
    return {
      type: props.type
    }
  }
}

class TablePiece extends React.Component {
  render() {
    const { connectDragSource } = this.props
    return connectDragSource(<div className="tablePiece">{this.props.image}</div>)
  }
}

export default DragSource(Constants.BoardTypes.TABLE, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(TablePiece)
