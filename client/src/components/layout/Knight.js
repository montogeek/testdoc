import React, { Component } from "react"
import { DragSource } from "react-dnd"
import Constants from "./constants";

const knightSource = {
  beginDrag(props, dnd, element) {
    console.log("props of knight, since these aren't in the docs")
    console.log(props, dnd, element)
    return {}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    // connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {
  componentDidMount() {
    // const img = new Image()
    // img.src = knightImage
    // this.props.connectDragPreview(img)
  }

  render() {
    const { connectDragSource, isDragging } = this.props

    return connectDragSource(
      <div
        action={this.action}
        style={{
          backgroundColor: isDragging ? "transparent" : "transparent",
          opacity: isDragging ? 0.25 : 1,
          fontSize: 40,
          fontWeight: "bold",
          cursor: "move",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        K
      </div>
    )
  }
}

export default DragSource(Constants.BoardTypes.TABLE, knightSource, collect)(Knight)
