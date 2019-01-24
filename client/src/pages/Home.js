import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import cx from "classnames"
import { loginUser } from "../redux/actions/user"

class Login extends React.Component {
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
    const { onSubmit } = this.props
    return onSubmit(email, password)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state

    try {
      this.login(email, password)
    } catch (e) {
      throw e
    }
  }

  render() {
    return (
      <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
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
    )
  }
}

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    }

    this.register = this.register.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  register(data) {
    const { onSubmit } = this.props
    return onSubmit(data)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, password_confirm } = this.state

    if (password !== password_confirm) {
      console.error("Passwords dont match")
    }

    try {
      this.register({ name, email, password })
    } catch (e) {
      throw e
    }
  }

  render() {
    return (
      <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            onChange={this.handleInputChange}
            required
            autoFocus
          />
        </div>
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
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password_confirm"
          >
            Confirmar contraseña
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password_confirm"
            type="password"
            name="password_confirm"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarme
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      tab: "login"
    }
  }

  showTab(tab) {
    this.setState({
      tab: tab
    })
  }

  render() {
    const { tab } = this.state
    const { user, loginUser, registerUser } = this.props
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    }

    if (user.data.authenticated) {
      return <Redirect to={from} />
    }

    const activeTab = "border-b-2 border-blue text-blue font-bold"

    return (
      <div className="max-w-sm mx-auto flex items-center justify-center h-screen">
        <div className="w-full shadow-md rounded">
          <nav className="flex justify-around align-middle mb-4">
            <button
              onClick={() => this.showTab("login")}
              className={cx("py-4", { [activeTab]: tab === "login" })}
            >
              Iniciar sesion
            </button>
            <button
              onClick={() => this.showTab("register")}
              className={cx("py-4", { [activeTab]: tab === "register" })}
            >
              Registro
            </button>
          </nav>
          {tab === "login" ? <Login onSubmit={loginUser} /> : <Register onSubmit={registerUser} />}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Home)
