import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import Navbar from "../components/navbar"

const RedirectRoute = props => {
  const { Component, user, ...rest } = props
  return (
    <>
      {user.data.authenticated ? (
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
  ({ user }) => ({ user }),
  {}
)(RedirectRoute)

const PrivateRoute = Component => {
  return function ConnectedPrivateRoute(props) {
    return <ConnectedRoute {...props} Component={Component} />
  }
}

export default PrivateRoute
