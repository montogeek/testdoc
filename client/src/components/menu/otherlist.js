import React, { Component } from "react"
import {
  EuiButton,
  EuiButtonEmpty,
  EuiBasicTable,
  EuiFieldText,
  EuiFieldNumber,
  EuiCheckbox,
  EuiFormErrorText,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui"
import { Comparators } from "@elastic/eui/es/services/sort"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { withFormik } from "formik"
import { mapValues } from "lodash"

import { updateItem, removeItem } from "../../redux/actions/items"
import Title from "./title"

let OthersList = class OthersList extends Component {
  state = {
    pageIndex: 0,
    pageSize: 10,
    confirmationOpen: {},
    editingId: null
  }

  columns = [
    {
      name: "Articulo",
      field: "name",
      footer: () => "Total",
      render: (value, item) => this.renderCell(value, item, "name", "text")
    },
    {
      name: "Coste",
      field: "cost",
      footer: ({ items, pagination }) => items.reduce((acc, item) => acc + item.cost, 0),
      render: (value, item) => this.renderCell(value, item, "cost", "number")
    },
    {
      name: "Comprado",
      field: "bought",
      render: (value, item) => this.renderCell(value, item, "bought", "checkbox")
    },
    {
      name: "Apuntes",
      field: "notes",
      render: (value, item) => this.renderCell(value, item, "notes", "text")
    },
    {
      name: "Acciones",
      actions: [
        {
          render: item => {
            const isEditing = this.isEditing(item.id)
            const isValid = this.props.isValid

            return isEditing ? (
              <EuiButtonEmpty
                size="s"
                iconType="save"
                isDisabled={!isValid}
                onClick={() => {
                  this.props.setFieldValue("id", item.id, false)
                  this.props.handleSubmit()

                  this.setState({ editingId: null })
                }}
              >
                Guardar
              </EuiButtonEmpty>
            ) : (
              <EuiButtonEmpty iconType="pencil" size="s" onClick={() => this.edit(item.id)}>
                Editar
              </EuiButtonEmpty>
            )
          }
        },
        {
          render: item => {
            const isEditing = this.isEditing(item.id)

            return isEditing ? (
              <EuiButtonEmpty
                size="s"
                iconType="editorUndo"
                onClick={() => {
                  this.props.resetForm()
                  this.setState({ editingId: null })
                }}
              >
                Cancelar
              </EuiButtonEmpty>
            ) : (
              <>
                <EuiButtonEmpty
                  iconType="trash"
                  color="danger"
                  size="s"
                  onClick={() => this.showConfirmation(item.id)}
                >
                  Eliminar
                </EuiButtonEmpty>
                {this.state.confirmationOpen[item.id] && (
                  <EuiOverlayMask>
                    <EuiConfirmModal
                      title="¿Eliminar ítem?"
                      onCancel={() => this.hideConfirmation(item.id)}
                      onConfirm={() => {
                        this.props.removeItem(
                          item.id,
                          parseInt(this.props.eventId, 10),
                          this.props.categoryId
                        )
                      }}
                      cancelButtonText="Cancelar"
                      confirmButtonText="Confirmar"
                    >
                      <p>Esta seguro de eliminar este ítem</p>
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

  renderCell = (value, item, column, inputType) => {
    const { isInvalid, errorMessage } = this.getErrorMessage(column, item.id)
    const isEditing = this.isEditing(item.id)

    return isEditing ? (
      <>
        {inputType === "text" && (
          <EuiFieldText
            name={`itemsList.${item.id}.${column}`}
            value={value}
            isInvalid={isInvalid}
            onChange={this.handleChange}
          />
        )}
        {inputType === "number" && (
          <EuiFieldNumber
            min={0}
            name={`itemsList.${item.id}.${column}`}
            value={value}
            isInvalid={isInvalid}
            onChange={this.handleChange}
          />
        )}
        {inputType === "checkbox" && (
          <EuiCheckbox
            id={`itemsList.${item.id}.${column}`}
            name={`itemsList.${item.id}.${column}`}
            checked={Boolean(value)}
            onChange={this.handleChange}
          />
        )}

        {errorMessage}
      </>
    ) : inputType === "checkbox" ? (
      value ? (
        <EuiIcon type="checkInCircleFilled" color="secondary" />
      ) : (
        <EuiIcon type="crossInACircleFilled" color="danger" />
      )
    ) : (
      value
    )
  }

  getErrorMessage = (field, id) => {
    const {
      errors: { itemsList }
    } = this.props

    const isInvalid = itemsList && itemsList[id] && itemsList[id][field] !== undefined
    const error = itemsList && itemsList[id] && itemsList[id][field]
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
      values: { itemsList }
    } = this.props

    let copyItems = Object.keys(itemsList).map(key => itemsList[key])

    let items

    if (sortField) {
      items = copyItems
        .slice(0)
        .sort(Comparators.property(sortField, Comparators.default(sortDirection)))
    } else {
      items = copyItems
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
    const { name, budget, eventId, categoryId, loading } = this.props

    const { pageIndex, pageSize } = this.state

    let { pageOfItems, totalItemCount } = this.getPageItems(pageIndex, pageSize)

    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount,
      hidePerPageOptions: true
    }

    return (
      <>
        <EuiFlexGroup alignItems={"center"}>
          <EuiFlexItem grow={5}>
            <EuiFlexGroup alignItems={"center"}>
              <Title
                name={name}
                budget={budget}
                id={categoryId}
                eventId={eventId}
                loading={loading}
              />
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={8} />
          <EuiFlexItem grow={false}>
            <Link
              to={{
                pathname: `/event/${eventId}/menu/create`,
                state: {
                  category: categoryId
                }
              }}
            >
              <EuiButton color="primary" fill size="s">
                Agregar ítem
              </EuiButton>
            </Link>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiBasicTable
          items={pageOfItems}
          columns={this.columns}
          pagination={pagination}
          onChange={this.onTableChange}
          hasActions={true}
          cellProps={this.getCellProps}
          noItemsMessage={"No hay items, agrega uno!"}
        />
        <EuiSpacer size="xxl" />
      </>
    )
  }
}

OthersList = withFormik({
  validationSchema: Yup.object().shape({
    itemsList: Yup.lazy(obj =>
      Yup.object(
        mapValues(obj, () =>
          Yup.object({
            name: Yup.string().required("Requerido"),
            cost: Yup.number().min(0, "Debe ser mayor a 0"),
            notes: Yup.string().required("Requerido")
          })
        )
      )
    )
  }),
  mapPropsToValues: ({ items }) => {
    return items && items.length !== 0
      ? {
          itemsList: items.reduce((acc, food) => {
            acc[food.id] = food
            return acc
          }, {})
        }
      : { itemsList: [] }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const item = values.itemsList[values.id]
    props.updateItem(item)
    setSubmitting(false)
  },
  enableReinitialize: true,
  displayName: "othersList"
})(OthersList)

OthersList = connect(
  ({ events }) => ({ loading: events.loading }),
  {
    updateItem,
    removeItem
  }
)(OthersList)

export default OthersList
