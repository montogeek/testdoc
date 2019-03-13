import React, { Component } from "react"
import {
  EuiButton,
  EuiBasicTable,
  EuiFieldText,
  EuiFieldNumber,
  EuiFormErrorText,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiTitle
} from "@elastic/eui"
import { Comparators } from "@elastic/eui/es/services/sort"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { withFormik } from "formik"
import { mapValues } from "lodash"

import { updateItem, removeItem } from "../../redux/actions/items"

let FoodList = class FoodList extends Component {
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
      name: "Coste total",
      field: "cost",
      render: (value, item) => this.renderCell(value, item, "cost", "number")
    },
    {
      name: "Racion por nino",
      field: "shareKid",
      render: (value, item) => this.renderCell(value, item, "shareKid", "number")
    },
    {
      name: "Racion por adulto",
      field: "shareAdult",
      render: (value, item) => this.renderCell(value, item, "shareAdult", "number")
    },
    {
      name: "Notas",
      field: "notes",
      render: (value, item) => this.renderCell(value, item, "notes", "text")
    },
    {
      name: "Total de raciones",
      field: "totalshare",
      render: (value, item) =>
        this.formatNumber(
          item.shareKid * this.props.totalKids + item.shareAdult * this.props.totalAdults
        )
    },
    {
      name: "Costo por racion",
      field: "costShare",
      render: (value, item) =>
        this.formatNumber(
          item.cost /
            (item.shareKid * this.props.totalKids + item.shareAdult * this.props.totalAdults)
        )
    },
    {
      name: "Costo por niño",
      field: "costKid",
      render: (costKid, item) =>
        this.formatNumber(
          (item.cost /
            (item.shareKid * this.props.totalKids + item.shareAdult * this.props.totalAdults)) *
            item.shareKid
        )
    },
    {
      name: "Costo por adulto",
      field: "costKid",
      render: (costKid, item) =>
        this.formatNumber(
          (item.cost /
            (item.shareKid * this.props.totalKids + item.shareAdult * this.props.totalAdults)) *
            item.shareAdult
        )
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

  formatNumber = value =>
    value === Infinity ? 0 : parseFloat(Math.round(value * 100) / 100).toFixed(2)

  renderCell = (value, item, column, inputType) => {
    const { isInvalid, errorMessage } = this.getErrorMessage(column, item.id)
    const isEditing = this.isEditing(item.id)

    return isEditing ? (
      <>
        {inputType === "text" ? (
          <EuiFieldText
            name={`foodList.${item.id}.${column}`}
            value={value}
            isInvalid={isInvalid}
            onChange={this.handleChange}
          />
        ) : (
          <EuiFieldNumber
            min={0}
            name={`foodList.${item.id}.${column}`}
            value={value}
            isInvalid={isInvalid}
            onChange={this.handleChange}
          />
        )}

        {errorMessage}
      </>
    ) : (
      value
    )
  }

  getErrorMessage = (field, id) => {
    const {
      errors: { foodList }
    } = this.props

    const isInvalid = foodList && foodList[id] && foodList[id][field] !== undefined
    const error = foodList && foodList[id] && foodList[id][field]
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
      values: { foodList }
    } = this.props

    let copyItems = Object.keys(foodList).map(key => foodList[key])

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
    const { name, eventId } = this.props

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
        <EuiTitle>
          <h2>{name}</h2>
        </EuiTitle>
        <Link to={`/event/${eventId}/menu/create`}>
          <EuiButton color="primary" fill>
            Agregar item
          </EuiButton>
        </Link>
        <EuiBasicTable
          items={pageOfItems}
          columns={this.columns}
          pagination={pagination}
          onChange={this.onTableChange}
          hasActions={true}
          cellProps={this.getCellProps}
        />
      </>
    )
  }
}

FoodList = withFormik({
  validationSchema: Yup.object().shape({
    foodList: Yup.lazy(obj =>
      Yup.object(
        mapValues(obj, () =>
          Yup.object({
            name: Yup.string().required("Requerido"),
            cost: Yup.number().min(0, "Debe ser mayor a 0"),
            shareKid: Yup.number().min(0, "Debe ser mayor a 0"),
            shareAdult: Yup.number().min(0, "Debe ser mayor a 0")
          })
        )
      )
    )
  }),
  mapPropsToValues: ({ items }) => {
    return items && items.length !== 0
      ? {
          foodList: items.reduce((acc, food) => {
            acc[food.id] = food
            return acc
          }, {})
        }
      : { foodList: [] }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const item = values.foodList[values.id]
    props.updateItem(item)
    setSubmitting(false)
  },
  enableReinitialize: true,
  displayName: "foodList"
})(FoodList)

FoodList = connect(
  null,
  {
    updateItem,
    removeItem
  }
)(FoodList)

export default FoodList
