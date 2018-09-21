import React, { Component } from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "./redux/reducers"

import Login from "./containers/login"
import "./styles/app.css"

const store = createStore(reducers)

console.log(store.getState())

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
