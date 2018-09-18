import React from "react"
import { connect } from "redux-zero/react"
import Event from "../components/event/"
import Navbar from "../components/navbar"
import actions from "../actions"
import { Link } from "react-router-dom"

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
      <>
        <Link
          to="/event/create"
          className="bg-orange-lighter hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline inline-block"
        >
          Crea un evento
        </Link>
        {events.length > 0 ? (
          events.map((event, i) => <Event key={i} event={event} />)
        ) : (
          <p>Parece que no tienes eventos, crea uno</p>
        )}
      </>
    )
  }
}

export default connect(
  ({ data }) => ({ data }),
  actions
)(Dashboard)
