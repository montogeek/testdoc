import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { connect } from "redux-zero/react"

const RedirectRoute = props => {
  const { Component, auth, ...rest } = props
  return (
    <>
      {auth.authenticated ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )}
    </>
  )
}

const ConnectedRoute = connect(
  ({ auth }) => ({ auth }),
  {}
)(RedirectRoute)

const PrivateRoute = Component => {
  return function ConnectedPrivateRoute(props) {
    return <ConnectedRoute {...props} Component={Component} />
  }
}

export default PrivateRoute
