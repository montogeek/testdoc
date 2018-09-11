import React from "react"
import { connect } from "redux-zero/react"
import Event from '../components/event'
import Navbar from "../components/navbar";
import actions from "../actions"

class Dashboard extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const { getEvents } = this.props

    getEvents()
  }

  render() {
    const { data: { events } } = this.props

    if (events.length > 0) {
      return (
        <div>
          <Navbar />
          {events.map((event, i) => (
            <Event key={i} event={event} />
          ))}
        </div>
      )
    }

    return "Loading..."
  }
}

export default connect(
  ({ data }) => ({ data }),
  actions
)(Dashboard)
