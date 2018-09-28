import React, { Component } from "react"
import Root from "./Root"
import { Provider } from "react-redux"

import configureStore, { loadState, saveState } from "./redux/store"

import "./styles/app.css"

const persistedState = loadState()

const store = configureStore(persistedState)

store.subscribe(() => {
  saveState(store.getState())
})

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
