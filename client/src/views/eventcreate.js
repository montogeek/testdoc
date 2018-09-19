import React, { Component } from "react"
import { Formik, Form, Field } from "formik"
import DateTimePicker from "react-datetime-picker"

import "react-day-picker/lib/style.css"

class EventCreate extends Component {
  constructor() {
    super()

    this.state = {
      date: ""
    }
  }

  render() {
    return (
      <Formik
        initialValues={{ name: "", date: "", location: "" }}
        onSubmit={values => {
          console.log(values)
        }}
      >
        <Form className="bg-white px-8 pt-6 pb-8 mb-4">
          <h1 className="text-lg font-semibold mb-6">Crear evento</h1>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <Field
              type="name"
              name="name"
              className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="date">
              Fecha
            </label>
            <Field
              component={props => (
                <DateTimePicker
                  name="date"
                  minDate={new Date()}
                  required
                  className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={date => props.form.setFieldValue("date", date)}
                  value={props.form.values.date}
                />
              )}
            />
            {/* <Field
              component={props => (
                <DayPickerInput
                  dayPickerProps={{
                    disabledDays: { before: new Date() },
                    fromMonth: new Date(new Date().getFullYear(), new Date().getMonth())
                  }}
                  onDayChange={day => props.form.setFieldValue("date", day)}
                  inputProps={{
                    className:
                      "shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline",
                    name: "date",
                    id: "date",
                    required: true
                  }}
                />
              )}
            /> */}
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="location">
              Ubicacion
            </label>
            <Field
              type="location"
              name="location"
              className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear
            </button>
          </div>
        </Form>
      </Formik>
    )
  }
}

export default EventCreate
