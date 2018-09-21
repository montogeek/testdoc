import React, { Component } from "react"
import { Provider } from "react-redux"
import configureStore from './redux/store'

import Login from "./containers/login"
import "./styles/app.css"

const store = configureStore()

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
