import React, { Component } from 'react';
import Auth from './containers/login'
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <Auth />
      </div>
    );
  }
}

export default hot(module)(App)
