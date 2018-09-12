import React, { Component } from "react"
import Login from "./containers/login"
// import { hot } from "react-hot-loader"
import { Provider, connect } from "redux-zero/react"
import './styles/app.css';

import store from "./store"
import actions from "./actions";

const LogoutComponent = ({ logout }) => {
  return (<div>
    <button onClick={logout}>Logout</button>
  </div>)
}

const Logout = connect(() => {}, actions)(LogoutComponent)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container mx-auto">
          <Logout />
          <Login />
        </div>
      </Provider>
    )
  }
}

export default App
