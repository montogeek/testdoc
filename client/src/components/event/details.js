import React, { Component } from "react"
import {
  EuiFlexGroup,
  EuiPanel,
  EuiFlexItem,
  EuiText,
  EuiBasicTable,
  EuiTextColor
} from "@elastic/eui"

class Details extends Component {
  render() {
    const { summary } = this.props

    const assistantsColumns = [
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

    const budgetColumns = [
      {
        field: "name",
        name: ""
      },
      {
        field: "count",
        name: ""
      },
      {
        field: "budget",
        name: "Disponible"
      },
      {
        field: "cost",
        name: "Coste"
      },
      {
        field: "diff",
        name: "Difference",
        render: value =>
          value > 0 ? (
            <EuiTextColor color="secondary">{value}</EuiTextColor>
          ) : (
            <EuiTextColor color="danger">({Math.abs(value)})</EuiTextColor>
          )
      }
    ]

    return (
      // <EuiPanel>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText size="m">
              <h3>Asistentes Confirmados</h3>
              <EuiBasicTable items={summary.assistants || []} columns={assistantsColumns} />
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText size="m">
              <h3>Presupuesto</h3>
              <EuiBasicTable items={summary.budget || []} columns={budgetColumns} />
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      // </EuiPanel>
    )
  }
}

export default Details
