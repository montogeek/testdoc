import React, { Component } from "react"
import Root from "./Root"
import { Provider } from "react-redux"

import configureStore, { loadState } from "./redux/store"

import "./styles/app.scss"

const persistedState = loadState()

const store = configureStore(persistedState)

// store.subscribe(() => {
//   saveState(store.getState())
// })

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
