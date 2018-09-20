import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { connect } from "redux-zero/react"

import Navbar from "../components/navbar"

const RedirectRoute = props => {
  const { Component, auth, ...rest } = props
  return (
    <>
      {auth.authenticated ? (
        <div className="bg-grey-lightest font-sans">
          <Navbar />
          <div className="w-full max-w-2xl mx-auto px-6 pt-24">
            <div className="pb-8 w-full relative">
              <Component {...rest} />
            </div>
          </div>
        </div>
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
