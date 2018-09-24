import React, { Component } from "react"
import { connect } from "react-redux"
import { DateTime } from "luxon"
import { getEvents } from "../../redux/actions"
import { Table, Icon, Popconfirm, Button, Form, InputNumber, Input } from "antd"
import "antd/lib/table/style/css"
import "antd/lib/popconfirm/style/css"
import "antd/lib/button/style/css"
import "antd/lib/form/style/css"
import "antd/lib/input-number/style/css"
import "antd/lib/input/style/css"

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

const rules = {
  email: { required: true, type: "email", message: `Ingresa un email` },
  text: title => ({ required: true, message: `Ingresa ${title}` }),
  number: { required: true, type: "integer", message: "Ingresa un numero" }
}

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />
    }
    return <Input />
  }

  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form
          console.log(dataIndex, inputType)
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      typeof rules[inputType] === "function"
                        ? rules[inputType](title)
                        : rules[inputType]
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

class Assistants extends Component {
  constructor() {
    super()
    this.state = { editingId: null }
    this.isEditing = this.isEditing.bind(this)
    this.cancel = this.cancel.bind(this)
    this.edit = this.edit.bind(this)

    this.columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        editable: true
      },
      {
        title: "Direccion",
        dataIndex: "address",
        key: "address",
        editable: true
      },
      {
        title: "Telefono",
        dataIndex: "phonenumber",
        key: "phonenumber",
        editable: true
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        editable: true
      },
      {
        title: "Asistira?",
        dataIndex: "rsvp",
        key: "rsvp",
        filters: [
          {
            text: "Si",
            value: 0
          },
          {
            text: "No",
            value: 1
          }
        ],
        onFilter: (value, record) => record.rsvp != value,
        render: rsvp =>
          rsvp ? (
            <Icon type="check-circle" className="text-green" />
          ) : (
            <Icon type="close-circle" className="text-red" />
          )
      },
      {
        title: "Niños",
        dataIndex: "kids",
        key: "kids",
        editable: true
      },
      {
        title: "Adultos",
        dataIndex: "adults",
        key: "adults",
        editable: true
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: (_, record) => record.kids + record.adults,
        sorter: (a, b) => a.adults + a.kids - (b.adults + b.kids)
      },
      {
        title: "Opciones",
        key: "action",
        render: (_, record) => {
          const editable = this.isEditing(record)
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }}>
                        Guardar
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="Esta seguro?" onConfirm={() => this.cancel(record.id)}>
                    <a>Cancelar</a>
                  </Popconfirm>
                </span>
              ) : (
                <Button
                  onClick={() => this.edit(record.id)}
                  type="primary"
                  icon="edit"
                  size="small"
                  className="rounded"
                >
                  Editar
                </Button>
              )}
              <Popconfirm title="Esta seguro?" onConfirm={() => this.handleDelete(record.id)}>
                <Button type="danger" icon="delete" size="small" className="rounded">
                  Eliminar
                </Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }
  componentDidMount() {
    const { getEvents } = this.props
    getEvents()
    // getAssistants()
  }

  isEditing = record => {
    return record.id === this.state.editingId
  }

  edit(id) {
    this.setState({ editingId: id })
  }

  cancel = () => {
    this.setState({ editingId: null })
  }

  render() {
    const { event, loading } = this.props

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType:
            col.dataIndex === "kids" || col.dataIndex === "adults"
              ? "number"
              : col.dataIndex === "email"
                ? "email"
                : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    if (!event) return "Loading"

    return (
      <div className="rounded shadow bg-white max-w-4xl p-6 my-6">
        <div className="flex justify-between">
          <div className="flex flex-row">
            <div className="h-24 w-24 bg-orange-lighter rounded flex flex-col items-center justify-center mr-4">
              <p className="text-5xl text-orange-dark font-thin">{event.day}</p>
              <p className="text-xl text-orange-dark font-thin">{event.month_year}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
              <p>
                {event.date.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
              </p>
              <p>{event.location}</p>
            </div>
          </div>
        </div>
        <Table
          components={components}
          loading={loading}
          columns={columns}
          dataSource={event.assistants}
        />
      </div>
    )
  }
}

export default connect(
  ({ events }, props) => ({
    event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
    loading: events.loading
  }),
  {
    getEvents
  }
)(Assistants)
