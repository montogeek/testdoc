import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "redux-zero/react"
import actions from "../actions"

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
    this.login = this.login.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  login(email, password) {
    const { login } = this.props
    return login(email, password)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state

    try {
      this.login(email, password)
    } catch (e) {
      throw e
    }
  }

  render() {
    const { auth } = this.props
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    }

    if (auth.authenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="max-w-sm mx-auto">
        <div className="w-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={this.handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-2 pb-4">Iniciar sesion</h1>
            <div className="mb-6">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                Correo electronico
              </label>
              <input
                className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                onChange={this.handleInputChange}
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <input className="mr-2 leading-tight" type="checkbox" name="remember" id="remember" />

              <label className="text-grey text-sm font-bold" htmlFor="remember">
                Recordarme
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar sesion
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                href="olvidocontrasena"
              >
                ¿Olvido su contrasena?
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  actions
)(Home)
