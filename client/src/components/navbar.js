import React from "react"
import { connect } from "redux-zero/react"
import actions from "../actions"

class Navbar extends React.Component {
  render() {
    return <div className="h-10">Eventos to</div>
  }
}

export default connect(
  () => {},
  actions
)(Navbar)
