import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom"
import qs from "querystring"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "../router"
import { connect } from "redux-zero/react"
import actions from "../actions"
import store from "../store"

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/dashboard",
    component: PrivateRoute(Dashboard)
  },
  {
    path: "/event/create",
    component: PrivateRoute(EventCreate)
  },
  {
    path: "*",
    component: () => "404"
  }
]

const AuthExample = () => (
  <Router>
    <Switch>
      {routes.map(route => {
        return <Route path={route.path} exact={route.exact} component={route.component} />
      })}
    </Switch>
  </Router>
)

export default AuthExample
