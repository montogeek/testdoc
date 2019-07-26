import React from "react"
import { withFormik } from "formik"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import {
  EuiForm,
  EuiCallOut,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiRadioGroup
} from "@elastic/eui"
import * as Yup from "yup"

import { ReactComponent as AssistantCreateIllustration } from "../../styles/illustrations/undraw_team_spirit_hrr4.svg"
import Page from "../Page"
import { addAssistant } from "../../redux/actions/assistants"

let AssistantCreate = props => {
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
    setValues,
    loading
  } = props

  return (
    <Page title="Agregar asistente">
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
                  values={values.name}
                  isInvalid={!isValid && errors.name && touched.name}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Direccion"
                isInvalid={!isValid && errors.address && touched.address}
                error={errors.address}
                id="address"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.address}
                  isInvalid={!isValid && errors.address && touched.address}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Ciudad"
                isInvalid={!isValid && errors.city && touched.city}
                error={errors.city}
                id="city"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.city}
                  isInvalid={!isValid && errors.city && touched.city}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Departamento"
                isInvalid={!isValid && errors.state && touched.state}
                error={errors.state}
                id="state"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.state}
                  isInvalid={!isValid && errors.state && touched.state}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Codigo postal"
                isInvalid={!isValid && errors.zip && touched.zip}
                error={errors.zip}
                id="zip"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.zip}
                  isInvalid={!isValid && errors.zip && touched.zip}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Telefono"
                isInvalid={!isValid && errors.phonenumber && touched.phonenumber}
                error={errors.phonenumber}
                id="phonenumber"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.phonenumber}
                  isInvalid={!isValid && errors.phonenumber && touched.phonenumber}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Correo electronico"
                isInvalid={!isValid && errors.email && touched.email}
                error={errors.email}
                id="email"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.email}
                  isInvalid={!isValid && errors.email && touched.email}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Niños"
                isInvalid={!isValid && errors.kids && touched.kids}
                error={errors.kids}
                id="kids"
              >
                <EuiFieldNumber
                  icon="user"
                  min={0}
                  name="kids"
                  value={values.kids}
                  isInvalid={!isValid && errors.kids && touched.kids}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Adultos"
                isInvalid={!isValid && errors.adults && touched.adults}
                error={errors.adults}
                id="adults"
              >
                <EuiFieldNumber
                  icon="user"
                  min={0}
                  name="adults"
                  value={values.adults}
                  isInvalid={!isValid && errors.adults && touched.adults}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </EuiFormRow>
              <EuiFormRow
                label="¿Asistira?"
                isInvalid={!isValid && errors.rsvp && touched.rsvp}
                error={errors.rsvp}
                id="rsvp"
              >
                <EuiRadioGroup
                  options={[
                    {
                      id: "true",
                      value: "true",
                      label: "Si"
                    },
                    {
                      id: "false",
                      value: "false",
                      label: "No"
                    }
                  ]}
                  idSelected={values.rsvp}
                  onChange={e => {
                    setValues({
                      ...values,
                      rsvp: e
                    })
                  }}
                />
              </EuiFormRow>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" isDisabled={isSubmitting} isLoading={loading} fill>
                  Agregar asistente
                </EuiButton>
              </EuiFormRow>
            </form>
          </EuiForm>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <AssistantCreateIllustration width="500px" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Page>
  )
}

AssistantCreate = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    address: Yup.string().required("Requerido"),
    city: Yup.string().required("Requerido"),
    state: Yup.string().required("Requerido"),
    zip: Yup.number().required("Requerido"),
    phonenumber: Yup.number().required("Requerido"),
    email: Yup.string()
      .email("Email invalido")
      .required("Requerido"),
    kids: Yup.number().min(0, "Debe ser mayor a 0"),
    adults: Yup.number().min(0, "Debe ser mayor a 0")
  }),
  mapPropsToValues: () => ({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phonenumber: "",
    email: "",
    kids: 0,
    adults: 0,
    rsvp: null
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .addAssistant(
        { ...values, rsvp: values.rsvp !== null ? values.rsvp === "true" : values.rsvp },
        props.match.params.id
      )
      .then(() => {
        props.push(`/event/${props.match.params.id}/assistants`)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: "Error agregando invitado" })
        setErrors(e)
      })
  },
  displayName: "assistantCreate"
})(AssistantCreate)

export default connect(
  null,
  dispatch => ({
    addAssistant: (data, id) => dispatch(addAssistant(data, id)),
    push: path => dispatch(push(path))
  })
)(AssistantCreate)
