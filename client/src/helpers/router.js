import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

const RedirectRoute = props => {
  const { Component, user, ...rest } = props
  return (
    <>
      {user.data.isAuthenticated ? (
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
  ({ user }) => ({ user }),
  {}
)(RedirectRoute)

const PrivateRoute = Component => {
  return function ConnectedPrivateRoute(props) {
    return <ConnectedRoute {...props} Component={Component} />
  }
}

export default PrivateRoute
