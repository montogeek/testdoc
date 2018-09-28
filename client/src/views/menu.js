import React, { Component } from "react"
import { connect } from "react-redux"
import { Table } from "antd"

console.log(Table)

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
class FoodList extends Component {
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
        title: "Coste total",
        dataIndex: "cost",
        key: "cost",
        editable: true
      },
      {
        title: "Racion por nino",
        dataIndex: "shareKid",
        key: "shareKid",
        editable: true
      },
      {
        title: "Racion por adulto",
        dataIndex: "shareAdult",
        key: "shareAdult",
        editable: true
      },
      {
        title: "Total de raciones",
        dataIndex: "totalshare",
        key: "totalshare"
      },
      {
        title: "Coste por racion",
        dataIndex: "costShare",
        key: "costShare"
      },
      {
        title: "Coste por nino",
        dataIndex: "costKid",
        key: "costKid",
        render: (_, record) => record.costShare * record.shareKid
      },
      {
        title: "Coste por adulto",
        dataIndex: "costAdult",
        key: "costAdult",
        render: (_, record) => record.costShare * record.shareAdult
      },
      {
        title: "Notas",
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
        <Table
          dataSource={items}
          loading={loading}
          columns={this.columns}
        />
      </div>
    )
  }
}

class Menu extends Component {
  render() {
    const { event, loading } = this.props

    if (!event) return "loading"

    return (
      <div className="rounded shadow bg-white max-w-4xl p-6 my-6">
        <FoodList {...event.menu.food} />

        {event.menu.other.map(category => {
          return <OthersList loading={loading} {...category} />
        })}
      </div>
    )
  }
}

export default connect(({ events }, props) => {
  const event = events.data.find(event => event.id === parseInt(props.match.params.id, 10))

  return {
    event: event,
    loading: events.loading
  }
})(Menu)
