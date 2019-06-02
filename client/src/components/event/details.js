import React, { Component } from "react"
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiBasicTable, EuiTextColor } from "@elastic/eui"
import numbro from "numbro"

const numberFormat = { thousandSeparated: true, mantissa: 2 }

const formatCurrency = value => {
  if (isNaN(value)) return numbro(0).formatCurrency(numberFormat)
  return numbro(value).formatCurrency(numberFormat)
}

class Details extends Component {
  assistantsColumns = [
    {
      field: "name",
      name: "",
      footer: () => "Total"
    },
    {
      field: "count",
      name: "",
      footer: ({ items }) => items.reduce((acc, item) => acc + item.count, 0)
    },
    {
      field: "food",
      name: "Comida",
      render: value => formatCurrency(value),
      footer: ({ items }) => {
        const total = items.reduce((acc, item, _, array) => acc + item.food, 0) / items.length
        return formatCurrency(total)
      }
    },
    {
      field: "other",
      name: "Otros",
      render: value => formatCurrency(value),
      footer: ({ items }) => {
        const total = items.reduce((acc, item) => acc + item.other, 0) / items.length
        return formatCurrency(total)
      }
    },
    {
      field: "total",
      name: "Total",
      render: (_, item) => {
        const total = (item.food + item.other) * item.count
        return formatCurrency(total)
      },
      footer: ({ items }) => {
        const total = items.reduce((acc, item) => acc + (item.food + item.other) * item.count, 0)
        return formatCurrency(total)
      }
    }
  ]

  budgetColumns = [
    {
      field: "name",
      name: "Articulo",
      footer: () => "Total"
    },
    {
      field: "count",
      name: "Recuento",
      footer: ({ items }) => items.reduce((acc, item) => acc + item.count, 0)
    },
    {
      field: "budget",
      name: "Importe de presupuesto",
      render: value => formatCurrency(value),
      footer: ({ items }) => {
        const total = items.reduce((acc, item) => acc + item.budget, 0)
        return formatCurrency(total)
      }
    },
    {
      field: "cost",
      name: "Coste total",
      render: value => formatCurrency(value),
      footer: ({ items }) => {
        const total = items.reduce((acc, item) => acc + item.cost, 0)
        return formatCurrency(total)
      }
    },
    {
      field: "diff",
      name: "Diferencia",
      render: value =>
        value > 0 ? (
          <EuiTextColor color="secondary">{formatCurrency(value)}</EuiTextColor>
        ) : (
          <EuiTextColor color="danger">({formatCurrency(Math.abs(value))})</EuiTextColor>
        ),
      footer: ({ items }) => {
        const total = items.reduce((acc, item) => acc + item.diff, 0)
        if (total === 0) {
          return formatCurrency(total)
        } else if (total > 0) {
          return <EuiTextColor color="secondary">{formatCurrency(total)}</EuiTextColor>
        }
        return <EuiTextColor color="danger">({formatCurrency(Math.abs(total))})</EuiTextColor>
      }
    }
  ]

  render() {
    const { event } = this.props

    const budget = event.menu.map(category => {
      const cost = category.items.reduce((acc, item) => acc + item.cost, 0)

      return {
        name: category.name,
        count: category.items.length,
        budget: category.budget,
        cost,
        diff: category.budget - cost
      }
    })

    const adults = {
      name: "Adultos",
      count: event.assistants
        .filter(assistant => assistant.rsvp)
        .reduce((acc, assistant) => acc + assistant.adults, 0),
      food: event.menu.reduce((acc, category) => {
        if (category.id === 1) {
          acc =
            acc +
            category.items.reduce((acc, item) => {
              const shareTotal = item.shareKid * event.kids + item.shareAdult * event.adults
              acc = acc + item.shareAdult * (item.cost / shareTotal)

              return acc
            }, 0)
        }

        return acc
      }, 0),
      other:
        event.menu
          .filter(category => category.id !== 1)
          .reduce((acc, category) => {
            return acc + category.items.reduce((acc, item) => acc + item.cost, 0)
          }, 0) /
        event.assistants
          .filter(assistant => assistant.rsvp)
          .reduce((acc, assistant) => acc + (assistant.adults + assistant.kids), 0)
    }

    const kids = {
      name: "Niños",
      count: event.assistants
        .filter(assistant => assistant.rsvp)
        .reduce((acc, assistant) => acc + assistant.kids, 0),
      food: event.menu.reduce((acc, category) => {
        if (category.id === 1) {
          acc =
            acc +
            category.items.reduce((acc, item) => {
              const shareTotal = item.shareKid * event.kids + item.shareAdult * event.adults
              acc = acc + item.shareKid * (item.cost / shareTotal)

              return acc
            }, 0)
        }

        return acc
      }, 0),
      other:
        event.menu
          .filter(category => category.id !== 1)
          .reduce((acc, category) => {
            return acc + category.items.reduce((acc, item) => acc + item.cost, 0)
          }, 0) /
        event.assistants
          .filter(assistant => assistant.rsvp)
          .reduce((acc, assistant) => acc + (assistant.adults + assistant.kids), 0)
    }

    const assistants = [adults, kids]

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="m">
            <h3>Asistentes Confirmados</h3>
            <EuiBasicTable items={assistants || []} columns={this.assistantsColumns} />
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="m">
            <h3>Presupuesto</h3>
            <EuiBasicTable items={budget || []} columns={this.budgetColumns} />
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    )
  }
}

export default Details
