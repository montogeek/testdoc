import React from "react"
import { withFormik } from "formik"
import { connect } from "react-redux"
import {
  EuiForm,
  EuiCallOut,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiCheckbox,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui"

import { ReactComponent as AssistantCreateIllustration } from "../../styles/illustrations/undraw_team_spirit_hrr4.svg"
import Page from "../Page"
import { addAssistant } from "../../redux/actions/assistants"

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
    loading,
    setValues
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
                <EuiCheckbox id="rsvp" checked={Boolean(values.rsvp)} onChange={handleChange} />
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
      <DisplayFormikState {...props} />
    </Page>
  )
}

AssistantCreate = withFormik({
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
    rsvp: false
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .addAssistant(values, props.match.params.id)
      .then(() => {
        console.log("all good")
        // props.push("/dashboard")
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
  {
    addAssistant
  }
)(AssistantCreate)
