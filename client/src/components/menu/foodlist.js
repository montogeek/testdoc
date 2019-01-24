import React, { Component } from "react"
import { Table, Modal, Form, Input, InputNumber, Button } from "antd"
import { connect } from "react-redux"
import { addItem } from "../../redux/actions/items"

const FormItem = Form.Item

class AddItem extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const { validateFields } = this.props.form
    const { id } = this.props.event
    const { addItem, category_id } = this.props

    validateFields(async (error, values) => {
      if (error) return
      await addItem(values, id, category_id)
      this.props.onOk()
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { visible } = this.props
    const { loading, onCancel } = this.props
    return (
      <Modal
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onCancel}
        confirmLoading={loading}
        destroyOnClose
        title="Agregar item"
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Nombre">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="Coste total">
            {getFieldDecorator("cost", {
              rules: [
                {
                  required: true,
                  type: "number"
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="Racion por nino">
            {getFieldDecorator("shareKid", {
              rules: [
                {
                  required: true,
                  type: "number"
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="Racion por adulto">
            {getFieldDecorator("shareAdult", {
              rules: [
                {
                  required: true,
                  type: "number"
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="Notas">
            {getFieldDecorator("notes", {
              rules: [
                {
                  required: false
                }
              ]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const AddItemForm = Form.create()(
  connect(
    ({ events }) => ({ loading: events.loading }),
    {
      addItem
    }
  )(AddItem)
)

class FoodList extends Component {
  constructor() {
    super()
    this.state = {
      visibleModal: false
    }
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
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  showModal() {
    this.setState({
      visibleModal: true
    })
  }

  handleOk() {
    this.setState({
      visibleModal: false
    })
  }

  handleCancel() {
    this.setState({
      visibleModal: false
    })
  }

  render() {
    const { name, items, loading } = this.props
    const { visibleModal } = this.state

    return (
      <div>
        <h1>{name}</h1>
        <Button
          type="dashed"
          style={{ width: "100%", marginBottom: 8 }}
          icon="plus"
          onClick={this.showModal}
        >
          Agregar item
        </Button>
        <AddItemForm visible={visibleModal} onCancel={this.handleCancel} onOk={this.handleOk} />
        <Table dataSource={items} loading={loading} columns={this.columns} />
      </div>
    )
  }
}

export default FoodList
