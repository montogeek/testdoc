import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getUser, logout } from "../redux/actions/user"

const LogoutComponent = ({ logout }) => {
  return (
    <>
      <button onClick={logout}>Cerrar sesion</button>
    </>
  )
}

const Logout = connect(
  () => ({}),
  { logout }
)(LogoutComponent)

const User = ({ user }) => {
  return (
    <div className="border-l-2 py-6 px-6">
      Hola, {user.name}! <Logout />
    </div>
  )
}

class Navbar extends React.Component {
  componentDidMount() {
    const { getUser } = this.props
    getUser()
  }
  render() {
    const { user } = this.props
    return (
      <div className="flex bg-white border-b-2 border-grey-lighter fixed pin-t pin-x z-100 h-16 items-center">
        <div className="w-full max-w-2xl relative mx-auto px-6">
          <div className="flex items-center justify-between -mx-6">
            <Link to="/dashboard" className="no-underline cursor-pointer">
              <div className="border-b-2 py-6 border-blue text-blue">Eventos</div>
            </Link>
            <User user={user.data} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  {
    getUser
  }
)(Navbar)
