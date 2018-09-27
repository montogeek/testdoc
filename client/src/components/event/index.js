import React from "react"
import { DateTime } from "luxon"
import { Transition } from "react-spring"
import { Link } from "react-router-dom"
import Details from "./details"

class Event extends React.Component {
  constructor() {
    super()

    this.state = {
      showDetails: false
    }

    this.showDetails = this.showDetails.bind(this)
  }

  showDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    const { event } = this.props
    const { showDetails } = this.state

    return (
      <div className="rounded shadow bg-white max-w-2xl p-6 my-6">
        <div className="flex justify-between cursor-pointer" onClick={this.showDetails}>
          <div className="flex flex-row">
            <div className="h-24 w-24 bg-orange-lighter rounded flex flex-col items-center justify-center mr-4">
              <p className="text-5xl text-orange-dark font-thin">{event.day}</p>
              <p className="text-xl text-orange-dark font-thin">{event.month_year}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
              <p>
                {event.date.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
              </p>
              <p>{event.location}</p>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center">
            <Link
              to={`/event/update/${event.id}`}
              className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
            >
              Editar
            </Link>
            <Link
              to={`/event/${event.id}/assistants`}
              className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
            >
              Invitados
            </Link>
            <Link
              to={`/event/${event.id}/menu`}
              className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
            >
              Menu
            </Link>
          </div>
        </div>
        <Transition
          native
          from={{ overflow: "hidden", opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: "auto" }}
          leave={{ opacity: 0, height: 0 }}
        >
          {showDetails && (styles => <Details styles={styles} summary={event.summary} />)}
        </Transition>
      </div>
    )
  }
}

export default Event
