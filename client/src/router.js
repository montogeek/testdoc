import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { connect } from "redux-zero/react"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.auth.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default connect(
  ({ auth }) => ({ auth }),
  {}
)(PrivateRoute)
