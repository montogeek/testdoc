import React, { Component } from "react"
import Login from "./containers/login"
// import { hot } from "react-hot-loader"
import { Provider, connect } from "redux-zero/react"
import './styles/app.css';

import store from "./store"
import actions from "./actions";



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container mx-auto">
          <Login />
        </div>
      </Provider>
    )
  }
}

export default App
