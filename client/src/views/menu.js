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
          components={{
            body: {
              wrapper: props => {
                return (
                  <tbody {...props}>
                    <React.Fragment>
                      {props.children}
                      <tr className="ant-table-row">
                        <td class="">
                          <span class="ant-table-row-indent indent-level-0" />
                          Little Bacon Cheeseburger
                        </td>
                        <td class="">193</td>
                        <td class="">0.2</td>
                        <td class="">0</td>
                        <td class="">13.200000000000001</td>
                        <td class="">14.62121212121212</td>
                        <td class="">2.924242424242424</td>
                        <td class="">0</td>
                        <td class="">Alice noticed, had powdered.</td>
                      </tr>
                    </React.Fragment>
                  </tbody>
                )
              }
            }
          }}
          dataSource={items}
          loading={loading}
          columns={this.columns}
          footer={data => {
            return "footer"
            // return (
            // <div className="flex justify-around">
            //   <div>Total</div>
            //   <div>{data.reduce((a, b) => a + b.cost, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.shareKid, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.shareAdult, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.totalshare, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.costShare, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.costShare * b.shareKid, 0)}</div>
            //   <div>{data.reduce((a, b) => a + b.costShare * b.shareAdult, 0)}</div>
            //   <div className="w-10" />
            // </div>
            // <tbody className="ant-table-tbody">
            //   <tr class="ant-table-row">
            //     <td class="">
            //       <span class="ant-table-row-indent indent-level-0" />
            //       Little Bacon Cheeseburger
            //     </td>
            //     <td class="">193</td>
            //     <td class="">0.2</td>
            //     <td class="">0</td>
            //     <td class="">13.200000000000001</td>
            //     <td class="">14.62121212121212</td>
            //     <td class="">2.924242424242424</td>
            //     <td class="">0</td>
            //     <td class="">Alice noticed, had powdered.</td>
            //   </tr>
            // </tbody>
            // )
          }}
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
      <div>
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
