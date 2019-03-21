import React, { Component } from "react"
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiBasicTable, EuiTextColor } from "@elastic/eui"

class Details extends Component {
  assistantsColumns = [
    {
      field: "name",
      name: ""
    },
    {
      field: "count",
      name: ""
    },
    {
      field: "food",
      name: "Comida"
    },
    {
      field: "other",
      name: "Otros"
    },
    {
      field: "total",
      name: "Total"
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
      footer: ({ items }) => items.reduce((acc, item) => acc + item.budget, 0)
    },
    {
      field: "cost",
      name: "Coste total",
      footer: ({ items }) => items.reduce((acc, item) => acc + item.cost, 0)
    },
    {
      field: "diff",
      name: "Diferencia",
      footer: ({ items }) => items.reduce((acc, item) => acc + item.diff, 0),
      render: value =>
        value > 0 ? (
          <EuiTextColor color="secondary">{value}</EuiTextColor>
        ) : (
          <EuiTextColor color="danger">({Math.abs(value)})</EuiTextColor>
        )
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
