import React from "react"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import history from "./history"
import routes from "./routes"
import Layout from "./components/layout"

const Root = () => (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        {routes.map((route, i) => {
          return <Route key={i} path={route.path} exact={route.exact} component={route.component} />
        })}
      </Switch>
    </Layout>
  </ConnectedRouter>
)

export default Root
