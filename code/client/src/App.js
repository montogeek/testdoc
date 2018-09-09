import React, { Component } from 'react'
import Login from './containers/login'
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <Login />
      </div>
    );
  }
}

export default hot(module)(App)
