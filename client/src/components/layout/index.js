import React, { Component } from "react"
import { DragSource } from "react-dnd"

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: "card"
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    // CardActions.moveCardToList(item.id, dropResult.listId)
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

function Card(props) {
  // Your component receives its own props as usual
  const { id } = props

  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource } = props

  return connectDragSource(
    <div>
      I am a draggable card number {id}
      {isDragging && " (and I am being dragged now)"}
    </div>
  )
}

const CardDrag = DragSource(Types.CARD, cardSource, collect)(Card)

class Layout extends Component {
  render() {
    const size = 33
    const dimention = "30px"

    return (
      <div style={{ display: "flex" }}>
        {Array.from({ length: size }).map((_, i) => {
          return (
            <div>
              {Array.from({ length: size }).map((_, j) => (
                <div
                  style={{
                    borderTop: "1px solid #69707D",
                    borderRight: "1px solid #69707D",
                    borderLeft: i === 0 ? "1px solid #69707D" : "none",
                    borderBottom: j === size - 1 ? "1px solid #69707D" : "none",
                    width: dimention,
                    height: dimention
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Layout
