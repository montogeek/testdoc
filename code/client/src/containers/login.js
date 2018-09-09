import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import ky from "ky"
import Ziggy from "../ziggy"

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

console.log(fakeAuth)

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"))
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      redirectToReferrer: false,
      email: "",
      password: ""
    }
    this.login = this.login.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  login() {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
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

    const data = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'VbDNUl4c9XLxVPQiW6hZM5XQ654AG6YgUtmXx0j5',
      username: email,
      password
    }


    try {
      const res = await ky.post('/oauth/token', { json: data }).json()

      const res1 = await ky.post('/api/events/1', { headers: {
        'Authorization': `Bearer ${res.refresh_token}`
      } }).json()

      console.log(res)
      console.log(res1)
    } catch (e) {
      throw e
    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
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

export default AuthExample
