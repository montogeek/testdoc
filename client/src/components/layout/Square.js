import React from "react"

class Square extends React.Component {
  render() {
    return (
      <div
        style={{
          // border: "1px solid grey"
          // borderTop: "1px solid #69707D",
          // borderRight: "1px solid #69707D",
          // borderLeft: i === 0 ? "1px solid #69707D" : "none",
          // borderBottom: j === size - 1 ? "1px solid #69707D" : "none",
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Square
