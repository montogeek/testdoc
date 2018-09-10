import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom"
import qs from "querystring"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from '../router'
import { connect } from "redux-zero/react"
import actions from "../actions"
import store from '../store'

const AuthExample = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
)

const AuthButton = withRouter(
  ({ history }) =>
    store.getState().auth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            console.log('LOGOUT')
          }}
        >
          Sign out
        </button>
      </p>
    ) : null
)

export default AuthExample
