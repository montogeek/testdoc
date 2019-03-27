import React from "react"

const SIZE = 2

function TablePiece(size, count, rounded) {
  // const { rounded, size, count, isDragging } = props

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
        // opacity: isDragging ? 0.5 : 1,
        borderRadius: rounded ? "50%" : 0,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {count} x {size}
    </div>
  )
}

export default {
  BoardTypes: {
    SQUARE: "square"
  },
  TableTypes: {
    ROUNDED140: "ROUNDED140",
    ROUNDED150: "ROUNDED150",
    ROUNDED180: "ROUNDED180",
    SQUARED180: "SQUARED180",
    SQUARED240: "SQUARED240"
  },
  TableImage: {
    ROUNDED140: TablePiece(140, 8, true),
    ROUNDED150: TablePiece(150, 6, true),
    ROUNDED180: TablePiece(180, 5, true),
    SQUARED180: TablePiece(180, 8),
    SQUARED240: TablePiece(240, 6)
  }
}
