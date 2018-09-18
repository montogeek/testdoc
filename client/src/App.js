import React, { Component } from "react"
import Login from "./containers/login"
import { Provider, connect } from "redux-zero/react"
import "./styles/app.css"

import store from "./store"
import actions from "./actions"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

export default App
