import React from "react"
import { connect } from "redux-zero/react"
import actions from "../actions"

const LogoutComponent = ({ logout }) => {
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  )
}

const Logout = connect(
  () => {},
  actions
)(LogoutComponent)

class Navbar extends React.Component {
  render() {
    return (
      <div className="flex bg-white border-b border-grey-lighter fixed pin-t pin-x z-100 h-16 items-center">
        <div className="w-full max-w-2xl relative mx-auto px-6">
          <div className="flex items-center justify-between -mx-6">
            <div className="border-b-2 py-6 border-blue text-blue">
              Eventos
            </div>
            <Logout />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  () => {},
  actions
)(Navbar)
