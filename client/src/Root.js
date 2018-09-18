import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "redux-zero/react"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import EventCreate from "./views/eventcreate"
import PrivateRoute from "./containers/router"
import actions from "./actions"
import store from "./store"

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

const Root = () => (
  <Router>
    <Switch>
      {routes.map(route => {
        return <Route path={route.path} exact={route.exact} component={route.component} />
      })}
    </Switch>
  </Router>
)

export default Root
