import React from "react"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import history from "./history"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import EventCreate from "./views/eventcreate"
import PrivateRoute from "./helpers/router"

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
  <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route, i) => {
          return <Route key={i} path={route.path} exact={route.exact} component={route.component} />
        })}
      </Switch>
  </ConnectedRouter>
)

export default Root
