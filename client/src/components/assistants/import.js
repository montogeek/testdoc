import React from "react"
import { withFormik } from "formik"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import {
  EuiForm,
  EuiCallOut,
  EuiFormRow,
  EuiButton,
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui"
import * as Yup from "yup"

import { ReactComponent as SpreadSheetsIllustration } from "../../styles/illustrations/undraw_spreadsheets_xdjy.svg"
import Page from "../Page"
import { importAssistants } from "../../redux/actions/assistants"

let AssistantsImport = props => {
  const {
    touched,
    errors,
    status,
    isValid,
    isSubmitting,
    handleSubmit,
    loading,
    setFieldValue,
    setTouched
  } = props

  return (
    <Page title="Importar asistentes">
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
                label="Archivo CSV"
                isInvalid={!isValid && errors.file && touched.file}
                error={errors.file}
                id="file"
              >
                <EuiFilePicker
                  id="file"
                  initialPromptText="Selecciona o suelta un archivo"
                  onChange={files => {
                    setFieldValue("file", files[0])
                    setTouched({ ...touched, file: true })
                  }}
                />
              </EuiFormRow>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" isDisabled={isSubmitting} isLoading={loading} fill>
                  Importar asistentes
                </EuiButton>
              </EuiFormRow>
            </form>
          </EuiForm>
        </EuiFlexItem>
        <DisplayFormikState {...props} />
        <EuiFlexItem grow={false}>
          <SpreadSheetsIllustration width="500px" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Page>
  )
}

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

AssistantsImport = withFormik({
  validationSchema: Yup.object().shape({
    file: Yup.mixed()
      .required("Archivo CSV is requerido")
      .test("fileSize", "Archivo es muy grande", value => value && value.size <= 5 * 1024 * 1024)
      .test("fileFormat", "Formato invalido", value => value && value.type === "text/csv")
  }),
  mapPropsToValues: () => ({
    file: undefined
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    const formData = new FormData()
    formData.append("file", values.file)
    formData.append("event_id", props.match.params.id)

    props
      .importAssistants(formData)
      .then(() => {
        // props.push(`/event/${props.match.params.id}/assistants`)
      })
      .catch(e => {
        console.log("e", e)
        setSubmitting(false)
        setStatus({ error: "Error importando asistentes" })
        setErrors(e)
      })
  },
  displayName: "assistantsImport"
})(AssistantsImport)

export default connect(
  null,
  dispatch => ({
    importAssistants: (data, id) => dispatch(importAssistants(data, id)),
    push: path => dispatch(push(path))
  })
)(AssistantsImport)
