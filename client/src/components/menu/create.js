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
  EuiFlexItem
} from "@elastic/eui"
import * as Yup from "yup"

import { ReactComponent as AssistantCreateIllustration } from "../../styles/illustrations/undraw_team_spirit_hrr4.svg"
import Page from "../Page"
import { addItem } from "../../redux/actions/items"

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

let MenuItemCreate = props => {
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
    <Page title="Agregar item">
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
                label="Coste total"
                isInvalid={!isValid && errors.cost && touched.cost}
                error={errors.cost}
                id="cost"
              >
                <EuiFieldNumber
                  min={0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.cost}
                  isInvalid={!isValid && errors.cost && touched.cost}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Racion por niño"
                isInvalid={!isValid && errors.shareKid && touched.shareKid}
                error={errors.shareKid}
                id="shareKid"
              >
                <EuiFieldNumber
                  min={0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.shareKid}
                  isInvalid={!isValid && errors.shareKid && touched.shareKid}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Racion por adulto"
                isInvalid={!isValid && errors.shareAdult && touched.shareAdult}
                error={errors.shareAdult}
                id="shareAdult"
              >
                <EuiFieldNumber
                  min={0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.shareAdult}
                  isInvalid={!isValid && errors.shareAdult && touched.shareAdult}
                />
              </EuiFormRow>
              <EuiFormRow
                label="Notas"
                isInvalid={!isValid && errors.notes && touched.notes}
                error={errors.notes}
                id="notes"
              >
                <EuiFieldText
                  icon="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.notes}
                  isInvalid={!isValid && errors.notes && touched.notes}
                />
              </EuiFormRow>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" isDisabled={isSubmitting} isLoading={loading} fill>
                  Agregar item
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

MenuItemCreate = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    cost: Yup.number().min(0, "Debe ser mayor a 0"),
    shareKid: Yup.number().min(0, "Debe ser mayor a 0"),
    shareAdult: Yup.number().min(0, "Debe ser mayor a 0"),
    notes: Yup.string().required("Requerido"),
  }),
  mapPropsToValues: () => ({
    name: "",
    cost: null,
    shareKid: null,
    shareAdult: null,
    notes: ""
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .addItem(values, props.match.params.id, 1)
      .then(() => {
        props.push(`/event/${props.match.params.id}/menu`)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: "Error agregando invitado" })
        setErrors(e)
      })
  },
  displayName: "menuItemCreate"
})(MenuItemCreate)

export default connect(
  null,
  dispatch => ({
    addItem: (data, id, category_id) => dispatch(addItem(data, id, category_id)),
    push: path => dispatch(push(path))
  })
)(MenuItemCreate)
