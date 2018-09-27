import React from "react"
import { connect } from "react-redux"
import Event from "../components/event/"
import { Link } from "react-router-dom"
import { getEvents } from "../redux/actions/events"

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
      <div className="max-w-2xl mx-auto">
        <Link
          to="/event/create"
          className="bg-orange-lighter hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline inline-block"
        >
          Crea un evento
        </Link>
        {events.data.length > 0 ? (
          events.data.map((event, i) => <Event key={i} event={event} />)
        ) : (
          <p>Parece que no tienes eventos, crea uno</p>
        )}
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
