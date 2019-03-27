import React, { Component } from "react"
import { DragSource, DropTarget } from "react-dnd"
import { connect } from "react-redux"

import Boardr from "./Board"
import Page from "../../components/Page"

import { moveTable } from "../../redux/actions/layout"
import { getEvents } from "../../redux/actions/events"

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const TYPES = {
  ROUNDED140: "ROUNDED140",
  ROUNDED150: "ROUNDED150",
  ROUNDED180: "ROUNDED180",
  SQUARED180: "SQUARED180",
  SQUARED240: "SQUARED240",
  TABLE: "table"
}

const SIZE = 2

const squareTarget = {
  drop(props, monitor) {
    props.moveTable(props.x, props.y)
  }
}

function collectSquare(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

function LayoutSquare({ x, y, connectDropTarget, isOver, children }) {
  return connectDropTarget(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      {children}
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        />
      )}
    </div>
  )
}

const LayoutSquareDrap = DropTarget(TYPES.TABLE, squareTarget, collectSquare)(LayoutSquare)

const tableSource = {
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
function collectTable(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

function TablePiece(props) {
  const { rounded, size, count, isDragging } = props

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
        height: `${height}px`
      }}
    >
      {count} x {size}
    </div>
  )
}

function Table(props) {
  // Your component receives its own props as usual
  const { rounded, size, count } = props

  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource } = props

  return connectDragSource(
    <div>
      <TablePiece rounded={rounded} size={size} count={count} isDragging={isDragging} />
    </div>
  )
}

const TableDrag = DragSource(TYPES.TABLE, tableSource, collectTable)(Table)
// const Rounded150Drag = DragSource(Types.ROUNDED150, cardSource, collect)(Card)
// const Rounded180Drag = DragSource(Types.ROUNDED180, cardSource, collect)(Card)
// const Squared180Drag = DragSource(Types.SQUARED180, cardSource, collect)(Card)
// const Squared240Drag = DragSource(Types.SQUARED240, cardSource, collect)(Card)

function Square({ i, j, size, children }) {
  const dimention = "30px"
  return (
    <div
      style={{
        borderTop: "1px solid #69707D",
        borderRight: "1px solid #69707D",
        borderLeft: i === 0 ? "1px solid #69707D" : "none",
        borderBottom: j === size - 1 ? "1px solid #69707D" : "none",
        width: dimention,
        height: dimention
      }}
    >
      {children}
    </div>
  )
}

function Board() {
  const size = 33

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: size }).map((_, i) => {
        return (
          <div>
            {Array.from({ length: size }).map((_, j) => (
              <Square i={i} j={j} size={size}>
                <TablePiece />
              </Square>
            ))}
          </div>
        )
      })}
    </div>
  )
}

class Layout extends Component {
  componentDidMount() {
    const { getEvents, event } = this.props

    if (typeof event === "undefined") {
      getEvents()
    }
  }

  render() {
    const { moveTable, event } = this.props

    return (
      <Page title="Sillas" loading={!event}>
        {() => {
          return <Boardr event={event} />
        }}
      </Page>
    )

    // return (
    //   <>
    //     <Board />
    //     <LayoutSquareDrap moveTable={moveTable} />
    //     <TableDrag rounded size={140} count={8} />
    //     <TableDrag rounded size={150} count={6} />
    //     <TableDrag rounded size={180} count={5} />
    //     <TableDrag size={180} count={8} />
    //     <TableDrag size={240} count={6} />
    //   </>
    // )
  }
}

Layout = connect(
  ({ events }, props) => ({
    event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
    loading: events.loading
  }),
  {
    getEvents
  }
)(Layout)

export default Layout
