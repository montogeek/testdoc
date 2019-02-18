import React from "react"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import history from "./history"
import routes from "./routes"

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
