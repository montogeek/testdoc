import React from "react"
import { connect } from "react-redux"
import { withFormik } from "formik"
import { push } from "connected-react-router"
import {
  EuiForm,
  EuiCallOut,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui"
import moment from "moment"
import * as Yup from "yup"

import { createEvent } from "../redux/actions/events"
import Page from "../components/Page"
import { ReactComponent as CreateEventIllustration } from "../styles/illustrations/undraw_events_2p66.svg"

let EventCreate = props => {
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
    <Page title="Crear evento" loading={loading}>
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
                      onChange={value => {
                        const endDate = value.isAfter(values.endDate) ? value : values.endDate

                        setValues({
                          ...values,
                          startDate: value,
                          endDate
                        })
                      }}
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
                      minDate={values.startDate}
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
                  Crear evento
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

EventCreate = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    location: Yup.string().required("Requerido")
  }),
  mapPropsToValues: () => ({
    name: "",
    startDate: moment(),
    endDate: moment(),
    location: ""
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .createEvent(values)
      .then(() => {
        props.push("/dashboard")
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: "Error creando evento" })
        setErrors(e)
      })
  }
})(EventCreate)

export default connect(
  ({ events }) => ({ loading: events.loading }),
  dispatch => ({
    createEvent: data => dispatch(createEvent(data)),
    push: () => dispatch(push("/dashboard"))
  })
)(EventCreate)
