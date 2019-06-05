import React, { Component } from "react"
import {
  EuiCheckbox,
  EuiIcon,
  EuiButton,
  EuiBasicTable,
  EuiFieldText,
  EuiFieldNumber,
  EuiFormErrorText,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiFlexItem,
  EuiFlexGroup,
  EuiButtonEmpty
} from "@elastic/eui"
import { Comparators } from "@elastic/eui/es/services/sort"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from "yup"

import Page from "../Page"
import { getEvents } from "../../redux/actions/events"
import { updateAssistant, removeAssistant } from "../../redux/actions/assistants"
import { withFormik } from "formik"
import { mapValues } from "lodash"

let Assistants = class Assistants extends Component {
  state = {
    pageIndex: 0,
    pageSize: 20,
    confirmationOpen: {},
    editingId: null
  }

  columns = [
    {
      name: "Invitado",
      field: "name",
      sortable: true,
      render: (name, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("name", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldText
              name={`assistants.${item.id}.name`}
              value={name}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          name
        )
      }
    },
    {
      name: "Direccion",
      field: "address",
      sortable: true,
      render: (address, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("address", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldText
              name={`assistants.${item.id}.address`}
              value={address}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          address
        )
      }
    },
    {
      name: "Telefono",
      field: "phonenumber",
      sortable: true,
      render: (phonenumber, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("phonenumber", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldText
              name={`assistants.${item.id}.phonenumber`}
              value={phonenumber}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          phonenumber
        )
      }
    },
    {
      name: "Email",
      field: "email",
      sortable: true,
      render: (email, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("email", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldText
              name={`assistants.${item.id}.email`}
              value={email}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          email
        )
      }
    },
    {
      name: "Asistira?",
      field: "rsvp",
      sortable: true,
      render: (rsvp, item) => {
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <EuiCheckbox
            id={`assistants.${item.id}.rsvp`}
            checked={Boolean(rsvp)}
            onChange={this.handleChange}
          />
        ) : rsvp ? (
          <EuiIcon type="checkInCircleFilled" color="secondary" />
        ) : (
          <EuiIcon type="crossInACircleFilled" color="danger" />
        )
      }
    },
    {
      name: "Niños",
      field: "kids",
      sortable: true,
      render: (kids, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("kids", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldNumber
              min={0}
              name={`assistants.${item.id}.kids`}
              value={kids}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          kids
        )
      }
    },
    {
      name: "Adultos",
      field: "adults",
      sortable: true,
      render: (adults, item) => {
        const { isInvalid, errorMessage } = this.getErrorMessage("adults", item.id)
        const isEditing = this.isEditing(item.id)

        return isEditing ? (
          <>
            <EuiFieldNumber
              min={0}
              name={`assistants.${item.id}.adults`}
              value={adults}
              isInvalid={isInvalid}
              onChange={this.handleChange}
            />
            {errorMessage}
          </>
        ) : (
          adults
        )
      }
    },
    {
      name: "Total",
      field: "total",
      sortable: true,
      render: (total, item) => item.kids + item.adults
    },
    {
      name: "Acciones",
      actions: [
        {
          render: item => {
            const isEditing = this.isEditing(item.id)
            const isValid = this.props.isValid

            return isEditing ? (
              <EuiButton
                size="s"
                fill
                isDisabled={!isValid}
                onClick={() => {
                  this.props.setFieldValue("id", item.id, false)
                  this.props.handleSubmit()

                  this.setState({ editingId: null })
                }}
              >
                Guardar
              </EuiButton>
            ) : (
              <EuiButton size="s" fill onClick={() => this.edit(item.id)}>
                Editar
              </EuiButton>
            )
          }
        },
        {
          render: item => {
            const isEditing = this.isEditing(item.id)

            return isEditing ? (
              <EuiButton
                size="s"
                onClick={() => {
                  this.props.resetForm()
                  this.setState({ editingId: null })
                }}
              >
                Cancelar
              </EuiButton>
            ) : (
              <>
                <EuiButton color="danger" size="s" onClick={() => this.showConfirmation(item.id)}>
                  Eliminar
                </EuiButton>
                {this.state.confirmationOpen[item.id] && (
                  <EuiOverlayMask>
                    <EuiConfirmModal
                      title="¿Eliminar invitado?"
                      onCancel={() => this.hideConfirmation(item.id)}
                      onConfirm={() => {
                        this.props.removeAssistant(item.id, this.props.event.id)
                      }}
                      cancelButtonText="Cancelar"
                      confirmButtonText="Confirmar"
                    >
                      <p>Esta seguro de eliminar este invitado</p>
                    </EuiConfirmModal>
                  </EuiOverlayMask>
                )}
              </>
            )
          }
        }
      ]
    }
  ]

  componentDidMount() {
    const { getEvents, event } = this.props

    if (typeof event === "undefined") {
      getEvents()
    }
  }

  getErrorMessage = (field, id) => {
    const {
      errors: { assistants }
    } = this.props

    const isInvalid = assistants && assistants[id] && assistants[id][field] !== undefined
    const error = assistants && assistants[id] && assistants[id][field]
    const errorMessage = error && <EuiFormErrorText color="danger">{error}</EuiFormErrorText>

    return { isInvalid, errorMessage }
  }

  handleChange = event => {
    this.props.handleChange(event)
  }

  isEditing = id => {
    return this.state.editingId === id
  }

  edit = id => this.setState({ editingId: id })

  showConfirmation = id => {
    this.setState({
      confirmationOpen: {
        [id]: true
      }
    })
  }

  hideConfirmation = id => {
    this.setState({
      confirmationOpen: {
        [id]: false
      }
    })
  }

  onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page

    const { field: sortField, direction: sortDirection } = sort

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    })
  }

  getCellProps = () => {
    return {
      textOnly: true
    }
  }

  getPageItems = (pageIndex, pageSize, sortField, sortDirection) => {
    const {
      values: { assistants }
    } = this.props

    let copyAssistants = Object.keys(assistants).map(key => assistants[key])

    let items

    if (sortField) {
      items = copyAssistants
        .slice(0)
        .sort(Comparators.property(sortField, Comparators.default(sortDirection)))
    } else {
      items = copyAssistants
    }

    let pageOfItems

    if (!pageIndex && !pageSize) {
      pageOfItems = items
    } else {
      const startIndex = pageIndex * pageSize
      pageOfItems = items.slice(startIndex, Math.min(startIndex + pageSize, items.length))
    }

    return {
      pageOfItems,
      totalItemCount: items.length
    }
  }

  render() {
    const { event } = this.props
    const { pageIndex, pageSize } = this.state

    let { pageOfItems, totalItemCount } = this.getPageItems(pageIndex, pageSize)

    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount,
      hidePerPageOptions: true
    }

    return (
      <Page
        loading={!event}
        title="Asistentes"
        titleRight={() => (
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <Link to={`/event/${event.id}/assistants/import`}>
                <EuiButtonEmpty>Importar asistentes</EuiButtonEmpty>
              </Link>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Link to={`/event/${event.id}/assistants/create`}>
                <EuiButton color="primary" fill>
                  Agregar asistente
                </EuiButton>
              </Link>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
      >
        <EuiBasicTable
          items={pageOfItems}
          columns={this.columns}
          pagination={pagination}
          onChange={this.onTableChange}
          hasActions={true}
          cellProps={this.getCellProps}
          noItemsMessage={"No hay invitados, invita uno!"}
        />
      </Page>
    )
  }
}

Assistants = withFormik({
  validationSchema: Yup.object().shape({
    assistants: Yup.lazy(obj =>
      Yup.object(
        mapValues(obj, () =>
          Yup.object({
            name: Yup.string().required("Requerido"),
            address: Yup.string().required("Requerido"),
            phonenumber: Yup.string().required("Requerido"),
            email: Yup.string()
              .email("Email invalido")
              .required("Requerido"),
            kids: Yup.nullable().number().min(0, "Debe ser mayor a 0"),
            adults: Yup.number().min(0, "Debe ser mayor a 0")
          })
        )
      )
    )
  }),
  mapPropsToValues: ({ event }) => {
    return event && event.assistants.length !== 0
      ? {
          assistants: event.assistants.reduce((acc, assistant) => {
            acc[assistant.id] = assistant
            return acc
          }, {})
        }
      : { assistants: [] }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const assistant = values.assistants[values.id]
    props.updateAssistant(assistant)
    setSubmitting(false)
  },
  isInitialValid: true,
  enableReinitialize: true,
  displayName: "assistant"
})(Assistants)

export default connect(
  ({ events }, props) => ({
    event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
    loading: events.loading
  }),
  {
    getEvents,
    updateAssistant,
    removeAssistant
  }
)(Assistants)
