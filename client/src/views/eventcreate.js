import React, { Component } from "react"
import { connect } from "react-redux"
import { Formik, Form, Field } from "formik"
import DateTimePicker from "react-datetime-picker"
import { push } from "connected-react-router"
import { createEvent } from "../redux/actions"

class EventCreate extends Component {
  constructor() {
    super()

    this.state = {
      date: ""
    }
  }

  render() {
    const { createEvent } = this.props

    return (
      <Formik
        initialValues={{ name: "", date: "", location: "" }}
        onSubmit={values => {
          return createEvent({
            ...values,
            date: values.date.toISOString()
          })
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

export default connect(
  () => ({}),
  dispatch => ({
    createEvent: data => {
      dispatch(createEvent(data))
      dispatch(push("/dashboard"))
    }
  })
)(EventCreate)
