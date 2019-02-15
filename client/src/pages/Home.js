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
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldPassword
} from "@elastic/eui"

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

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    }

    this.register = this.register.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  register(data) {
    const { onSubmit } = this.props
    return onSubmit(data)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, password_confirm } = this.state

    if (password !== password_confirm) {
      console.error("Passwords dont match")
    }

    try {
      this.register({ name, email, password })
    } catch (e) {
      throw e
    }
  }

  render() {
    return (
      <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            onChange={this.handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Correo electronico
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password_confirm"
          >
            Confirmar contraseña
          </label>
          <input
            className="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password_confirm"
            type="password"
            name="password_confirm"
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarme
          </button>
        </div>
      </form>
    )
  }
}

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
        setStatus({ error: "Usuario invalido" })
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
    dirty,
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
      <DisplayFormikState {...props} />
    </EuiForm>
  )
}

RegisterForm = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    email: Yup.string()
      .email("Email invalido")
      .required("Requerido"),
    password: Yup.string().min(6).required("Contraseña es requerida"),
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
      .then(() => {
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
                  <h2>Eventos</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiTabbedContent tabs={this.tabs} initialSelectedTab={this.tabs[1]} expand={true} />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
  }
}

export default connect(mapStateToProps)(Home)
