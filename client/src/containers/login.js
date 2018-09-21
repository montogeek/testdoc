import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from '../router'

const AuthExample = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
)

export default AuthExample
