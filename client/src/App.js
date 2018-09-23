import React, { Component } from "react"
import Root from "./Root"
import { Provider } from "react-redux"

import configureStore from "./redux/store"

import "./styles/app.css"

const store = configureStore()

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
