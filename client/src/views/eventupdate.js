import React, { Component } from "react"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { withFormik } from "formik"
import {
  EuiForm,
  EuiCallOut,
  EuiFieldText,
  EuiButton,
  EuiDatePickerRange,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDatePicker,
  EuiFormRow
} from "@elastic/eui"
import moment from "moment"

import { updateEvent } from "../redux/actions/events"
import Page from "../components/Page"
import { ReactComponent as CreateEventIllustration } from "../styles/illustrations/undraw_events_2p66.svg"

const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem"
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)

let EventUpdate = props => {
  const {
    values,
    touched,
    errors,
    status,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    setValues
  } = props

  return (
    <Page title="Actualizar evento" loading={loading}>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiForm>
            <form onSubmit={handleSubmit}>
              {status && status.error && (
                <EuiCallOut
                  size="s"
                  title={status.error}
                  color="danger"
                  className="euiForm__errors"
                >
                  {Array.isArray(errors) && (
                    <ul>
                      {errors.map((error, i) => (
                        <li className="euiForm__error" key={i}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                </EuiCallOut>
              )}
              <EuiFormRow
                label="Nombre"
                isInvalid={!isValid && errors.name && touched.name}
                error={errors.name}
                id="name"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={!isValid && errors.name && touched.name}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Fecha"
                isInvalid={!isValid && errors.startDate && touched.startDate}
                error={errors.startDate}
                id="date"
              >
                <EuiDatePickerRange
                  startDateControl={
                    <EuiDatePicker
                      selected={values.startDate}
                      onChange={value =>
                        setValues({
                          ...values,
                          startDate: value
                        })
                      }
                      startDate={values.startDate}
                      endDate={values.endDate}
                      isInvalid={!isValid && errors.startDate && touched.startDate}
                      showTimeSelect
                      inline
                      minDate={moment()}
                    />
                  }
                  endDateControl={
                    <EuiDatePicker
                      selected={values.endDate}
                      onChange={value =>
                        setValues({
                          ...values,
                          endDate: value
                        })
                      }
                      startDate={values.startDate}
                      endDate={values.endDate}
                      isInvalid={!isValid && errors.endDate && touched.endDate}
                      showTimeSelect
                      inline
                      minDate={moment()}
                    />
                  }
                />
              </EuiFormRow>
              <EuiFormRow
                label="Ubicacion"
                isInvalid={!isValid && errors.location && touched.location}
                error={errors.location}
                id="location"
              >
                <EuiFieldText
                  icon="mapMarker"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  isInvalid={!isValid && errors.location && touched.location}
                />
              </EuiFormRow>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" isDisabled={isSubmitting} isLoading={loading} fill>
                  Actualizar evento
                </EuiButton>
              </EuiFormRow>
            </form>
          </EuiForm>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <CreateEventIllustration width="500px" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Page>
  )
}

EventUpdate = withFormik({
  mapPropsToValues: ({ event }) => ({
    name: event.name || "",
    startDate: moment(event.startDate || new Date()),
    endDate: moment(event.endDate || new Date()),
    location: event.location || ""
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .updateEvent({ ...values, id: props.event.id })
      .then(() => {
        props.push("/dashboard")
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: "Error actualizando evento" })
        setErrors(e)
      })
  }
})(EventUpdate)

EventUpdate = connect(
  (
    { events },
    {
      match: {
        params: { id }
      }
    }
  ) => {
    return {
      event: events.data.find(event => event.id === parseInt(id, 10)) || {},
      loading: events.loading
    }
  },
  dispatch => ({
    updateEvent: data => dispatch(updateEvent(data)),
    push: () => dispatch(push("/dashboard"))
  })
)(EventUpdate)

export default EventUpdate
