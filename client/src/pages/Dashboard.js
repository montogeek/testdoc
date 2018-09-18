import React from "react"
import { connect } from "redux-zero/react"
import Event from "../components/event/"
import Navbar from "../components/navbar"
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
    const {
      data: { events }
    } = this.props

    return (
      <div className="bg-grey-lightest font-sans">
        <Navbar />
        <div className="w-full max-w-2xl mx-auto px-6">
          <div className="pt-24 pb-8 w-full">
            {events.length > 0
              ? events.map((event, i) => <Event key={i} event={event} />)
              : "Agrega un evento"}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ data }) => ({ data }),
  actions
)(Dashboard)
