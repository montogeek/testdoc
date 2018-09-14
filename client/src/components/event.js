import React from "react"

const Event = ({ event }) => {
  return (
    <div className="max-w-2xl rounded overflow-hidden shadow-md flex p-6 my-6 justify-between">
      <div className="flex flex-row">
        <div className="h-24 w-24 bg-orange-lighter rounded flex flex-col items-center justify-center mr-4">
          <p className="text-5xl text-orange-dark font-thin">{event.day}</p>
          <p className="text-xl text-orange-dark font-thin">{event.month_year}</p>
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
          <p>{event.duration} horas</p>
          <p>{event.location}</p>
          {/* <p>Adultos {event.kids}</p> */}
          {/* <p>Ninos {event.adults}</p> */}
        </div>
      </div>
      <div className="flex flex-col justify-around">
        <a
          href="#"
          className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
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
  )
}

export default Event
