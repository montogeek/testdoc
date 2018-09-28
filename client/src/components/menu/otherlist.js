import React, { Component } from 'react'
import { Table } from "antd"

class OthersList extends Component {
  constructor() {
    super()
    this.columns = [
      {
        title: "Articulo",
        dataIndex: "name",
        key: "name",
        editable: true
      },
      {
        title: "Coste",
        dataIndex: "cost",
        key: "cost",
        editable: true
      },
      {
        title: "Comprado",
        dataIndex: "bought",
        key: "bought",
        editable: true
      },
      {
        title: "Apuntes",
        dataIndex: "notes",
        key: "notes"
      }
    ]
  }
  render() {
    const { name, items, loading } = this.props

    return (
      <div>
        <h1>{name}</h1>
        <Table dataSource={items} loading={loading} columns={this.columns} />
      </div>
    )
  }
}

export default OthersList