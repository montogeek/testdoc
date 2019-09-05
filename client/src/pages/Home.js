import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { withFormik } from "formik"
import * as Yup from "yup"

import { loginUser, registerUser } from "../redux/actions/user"

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiTabbedContent,
  EuiCallOut,
  EuiSpacer,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword
} from "@elastic/eui"

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

let LoginForm = props => {
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
    user
  } = props

  return (
    <EuiForm>
      <form onSubmit={handleSubmit}>
        {status && status.error && (
          <EuiCallOut size="s" title={status.error} color="danger" className="euiForm__errors" />
        )}
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
            value={values.email}
            isInvalid={!isValid && errors.email && touched.email}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Contraseña"
          isInvalid={!isValid && errors.password && touched.password}
          error={errors.password}
          id="password"
        >
          <EuiFieldPassword
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={!isValid && errors.password && touched.password}
          />
        </EuiFormRow>
        <EuiFormRow hasEmptyLabelSpace>
          <EuiButton type="submit" isDisabled={isSubmitting} isLoading={user.loading} fill>
            Iniciar sesion
          </EuiButton>
        </EuiFormRow>
      </form>
    </EuiForm>
  )
}

LoginForm = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email invalido")
      .required("Requerido"),
    password: Yup.string().required("Requerido")
  }),
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    props
      .loginUser(values.email, values.password)
      .then(t => {
        setSubmitting(false)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: e.message })
      })
  },
  displayName: "Login"
})(LoginForm)

LoginForm = connect(
  mapStateToProps,
  {
    loginUser
  }
)(LoginForm)

let RegisterForm = props => {
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
    user
  } = props

  return (
    <EuiForm>
      <form onSubmit={handleSubmit}>
        {status && status.error && (
          <EuiCallOut size="s" title={status.error} color="danger" className="euiForm__errors">
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
          label="Correo electronico"
          isInvalid={!isValid && errors.email && touched.email}
          error={errors.email}
          id="email"
        >
          <EuiFieldText
            icon="user"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            isInvalid={!isValid && errors.email && touched.email}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Contraseña"
          isInvalid={!isValid && errors.password && touched.password}
          error={errors.password}
          id="password"
        >
          <EuiFieldPassword
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={!isValid && errors.password && touched.password}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Contraseña"
          isInvalid={!isValid && errors.password_confirmation && touched.password_confirmation}
          error={errors.password_confirmation}
          id="password_confirmation"
        >
          <EuiFieldPassword
            id="password_confirmation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password_confirmation}
            isInvalid={!isValid && errors.password_confirmation && touched.password_confirmation}
          />
        </EuiFormRow>
        <EuiFormRow hasEmptyLabelSpace>
          <EuiButton type="submit" isDisabled={isSubmitting} isLoading={user.loading} fill>
            Registrarme
          </EuiButton>
        </EuiFormRow>
      </form>
    </EuiForm>
  )
}

RegisterForm = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    email: Yup.string()
      .email("Email invalido")
      .required("Requerido"),
    password: Yup.string()
      .min(6)
      .required("Contraseña es requerida"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Contraseñas deben ser iguales")
      .required("Confirmacion contraseña es requerida")
  }),
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    props
      .registerUser(values.name, values.email, values.password, values.password_confirmation)
      .then(res => {
        setSubmitting(false)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus({ error: "Error registrandose" })
        setErrors(e)
      })
  },
  displayName: "Register"
})(RegisterForm)

RegisterForm = connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterForm)

class Home extends React.Component {
  tabs = [
    {
      id: "login",
      name: "Iniciar sesion",
      content: (
        <>
          <EuiSpacer />
          <LoginForm />
        </>
      )
    },
    {
      id: "register",
      name: "Registrarse",
      content: (
        <>
          <EuiSpacer />
          <RegisterForm />
        </>
      )
    }
  ]

  render() {
    const { user } = this.props
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    }

    if (user.data.isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <EuiPage className="vh-100">
        <EuiPageBody>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2 style={{ textAlign: "center" }}>
                    Administración <br /> y Gestión de eventos académicos
                  </h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiTabbedContent tabs={this.tabs} initialSelectedTab={this.tabs[0]} expand={true} />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
  }
}

export default connect(mapStateToProps)(Home)
