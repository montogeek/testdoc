import React, { Component } from "react"
import { connect } from "react-redux"
import { Formik, Form, Field } from "formik"
import DateTimePicker from "react-datetime-picker"
import { push } from "connected-react-router"
import { DateTime } from "luxon"
import { createEvent, updateEvent } from "../redux/actions"

class EventUpdate extends Component {
  constructor() {
    super()

    this.state = {
      name: "",
      date: "",
      location: ""
    }
  }

  componentDidMount() {
    const {
      events,
      match: {
        params: { id }
      }
    } = this.props
    const event = events.find(event => event.id == id)

    this.setState({
      ...event,
      date: event.date.toJSDate()
    })
  }

  render() {
    const { updateEvent } = this.props
    const { name, date, location, id } = this.state

    return (
      <Formik
        enableReinitialize
        initialValues={{ name, date, location }}
        onSubmit={values => {
          return updateEvent({
            ...values,
            date: values.date.toISOString(),
            id
          })
        }}
      >
        {({ values }) => (
          <Form className="bg-white px-8 pt-6 pb-8 mb-4">
            <h1 className="text-lg font-semibold mb-6">Actualizar evento</h1>
            <div className="mb-6">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <Field
                type="name"
                name="name"
                className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={values.name}
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
        )}
      </Formik>
    )
  }
}

export default connect(
  ({ events }) => ({ events: events.data }),
  dispatch => ({
    updateEvent: async data => {
      await dispatch(updateEvent(data))
      dispatch(push("/dashboard"))
    }
  })
)(EventUpdate)
