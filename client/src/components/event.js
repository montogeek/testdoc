import React from "react"

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

  showAssistants(e) {
    e.stopPropagation()
  }

  render() {
    const { event } = this.props
    const { showDetails } = this.state

    return (
      <div className="rounded overflow-hidden shadow-md max-w-2xl p-6 my-6">
        <div className="flex justify-between" onClick={this.showDetails}>
          <div className="flex flex-row">
            <div className="h-24 w-24 bg-orange-lighter rounded flex flex-col items-center justify-center mr-4">
              <p className="text-5xl text-orange-dark font-thin">{event.day}</p>
              <p className="text-xl text-orange-dark font-thin">{event.month_year}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
              <p>{event.duration} horas</p>
              <p>{event.location}</p>
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <a
              href="#"
              className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
              onClick={this.showAssistants}
            >
              Invitados
            </a>
            <a
              href="#"
              className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
            >
              Menu
            </a>
          </div>
        </div>
        {showDetails && (
          <div>
            <h2>Asistentes</h2>
            <ul>
              {event.summary.assistants.map(assistant => {
                return (
                  <li>
                    {assistant.name} |
                    {assistant.total} |
                    {assistant.food} |
                    {assistant.other}
                  </li>
                )
              })}
            </ul>
            <h2>Presupuesto</h2>
            <ul>
              {event.summary.budget.map(item => {
                return (
                  <li>
                    {item.name} |
                    {item.count} |
                    {item.budget} |
                    {item.cost}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Event
