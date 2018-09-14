import React from "react"
import { connect } from "redux-zero/react"
import actions from "../actions"

const LogoutComponent = ({ logout }) => {
  return (
    <>
      <button onClick={logout}>Cerrar sesion</button>
    </>
  )
}

const Logout = connect(
  () => {},
  actions
)(LogoutComponent)

const User = ({ user }) => {
  return (
    <div className="border-l-2 py-6 px-6">
      Hola, {user.name}! <Logout />
    </div>
  )
}

class Navbar extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const { getUser } = this.props
    getUser()
  }
  render() {
    const { user } = this.props
    console.log(user)
    return (
      <div className="flex bg-white border-b-2 border-grey-lighter fixed pin-t pin-x z-100 h-16 items-center">
        <div className="w-full max-w-2xl relative mx-auto px-6">
          <div className="flex items-center justify-between -mx-6">
            <div className="border-b-2 py-6 border-blue text-blue">Eventos</div>
            <User user={user} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  actions
)(Navbar)
