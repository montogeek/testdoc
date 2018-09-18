import React, { Component } from "react"
import Root from "./Root"
import { Provider, connect } from "redux-zero/react"
import "./styles/app.css"

import store from "./store"
import actions from "./actions"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App
