import React from "react"
import { connect } from "react-redux"
import Event from "../components/event/"
import Navbar from "../components/navbar"
import { getEvents } from "../redux/actions"

class Dashboard extends React.Component {
  async componentDidMount() {
    const { getEvents } = this.props
    getEvents()
  }

  render() {
    const { events } = this.props

    if (events.error) {
      return <p>Error!</p>
    }

    return (
      <div className="bg-grey-lightest font-sans">
        <Navbar />
        <div className="w-full max-w-2xl mx-auto px-6">
          <div className="pt-24 pb-8 w-full">
            {events.data.length > 0
              ? events.data.map((event, i) => <Event key={i} event={event} />)
              : "Agrega un evento"}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ events }) => ({ events }),
  {
    getEvents
  }
)(Dashboard)
