import React, { Component } from "react"
import {
  EuiButton,
  EuiBasicTable,
  EuiFieldText,
  EuiFieldNumber,
  EuiCheckbox,
  EuiFormErrorText,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiTitle,
  EuiIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiStat,
  EuiLoadingSpinner,
  EuiButtonIcon
} from "@elastic/eui"
import { Comparators } from "@elastic/eui/es/services/sort"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { withFormik } from "formik"
import { mapValues } from "lodash"

import { updateItem, removeItem } from "../../redux/actions/items"
import { updateCategory } from "../../redux/actions/categories"

let CategoryTitle = class CategoryTitle extends Component {
  state = {
    editing: false
  }

  toggleEditing = () => {
    this.setState(state => ({ editing: !state.editing }))
  }

  handleSubmit = () => {
    this.toggleEditing()
    this.props.handleSubmit()
  }

  render() {
    const { name, budget, values, handleChange, loading } = this.props
    const { editing } = this.state

    if (loading) {
      return (
        <EuiFlexItem>
          <EuiLoadingSpinner size="xl" />
        </EuiFlexItem>
      )
    }

    if (editing) {
      return (
        <>
          <EuiFlexItem grow={1}>
            <EuiFieldText name={"name"} value={values.name} onChange={handleChange} />
            <EuiFieldNumber name={"budget"} value={values.budget} onChange={handleChange} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon onClick={this.handleSubmit} iconType="save" iconSize="l" />
          </EuiFlexItem>
        </>
      )
    }

    return (
      <>
        <EuiFlexItem grow={4}>
          <EuiTitle>
            <h2>{name}</h2>
          </EuiTitle>
          <EuiStat title={`$ ${budget}`} description="" titleSize="m" titleColor="secondary" />
        </EuiFlexItem>
        <EuiFlexItem grow={8}>
          <EuiIcon type="pencil" onClick={this.toggleEditing} size="l" />
        </EuiFlexItem>
      </>
    )
  }
}

CategoryTitle = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    budget: Yup.number().required()
  }),
  mapPropsToValues: ({ name, budget }) => ({ name, budget }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.updateCategory({ ...values, id: props.id }, props.eventId)
    setSubmitting(false)
  },
  enableReinitialize: true,
  displayName: "categoryTitle"
})(CategoryTitle)

CategoryTitle = connect(
  null,
  {
    updateCategory
  }
)(CategoryTitle)

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
      render: (value, item) => this.renderCell(value, item, "name", "text")
    },
    {
      name: "Coste",
      field: "cost",
      footer: ({ items }) => <span>{items.reduce((acc, item) => acc + item.cost, 0)}</span>,
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
                      title="¿Eliminar item?"
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
                      <p>Esta seguro de eliminar este item</p>
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
              <CategoryTitle
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
                Agregar item
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
