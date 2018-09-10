import React from "react"

const Event = ({ event }) => {
  return (
    <div className="max-w-2xl rounded overflow-hidden shadow-lg flex p-4">
      <div className="h-24 w-24 bg-red-lighter rounded flex flex-col items-center justify-center mr-4">
        <p className="text-5xl text-red-dark font-thin">{event.day}</p>
        <p className="text-xl text-red-dark font-thin">{event.month_year}</p>
      </div>
      <div className="flex flex-col justify-around">
        <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
        <p>{event.duration} horas</p>
        <p>{event.location}</p>
      </div>
    </div>
  )
}

export default Event
