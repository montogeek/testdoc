// import React, { Component } from "react"
// import { connect } from "react-redux"
// import { DateTime } from "luxon"
// import { getEvents } from "../../redux/actions/events"
// import { updateAssistant, removeAssistant, addAssistant } from "../../redux/actions/assistants"
// import { Table, Icon, Popconfirm, Button, Form, InputNumber, Input, Checkbox, Modal } from "antd"
// import "antd/lib/table/style/css"
// import "antd/lib/popconfirm/style/css"
// import "antd/lib/button/style/css"
// import "antd/lib/form/style/css"
// import "antd/lib/input-number/style/css"
// import "antd/lib/input/style/css"
// import "antd/lib/checkbox/style/css"
// import "antd/lib/modal/style/css"

// const FormItem = Form.Item
// const EditableContext = React.createContext()

// const EditableRow = ({ form, index, ...props }) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props} />
//   </EditableContext.Provider>
// )

// const EditableFormRow = Form.create()(EditableRow)

// const rules = {
//   email: { required: true, type: "email", message: `Ingresa un email` },
//   text: title => ({ required: true, message: `Ingresa ${title}` }),
//   number: { required: true, type: "integer", message: "Ingresa un numero" },
//   checkbox: { type: "boolean" }
// }

// class AddAssistant extends React.Component {
//   constructor() {
//     super()
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit() {
//     const { validateFields } = this.props.form
//     const { id } = this.props.event
//     const { addAssistant } = this.props
//     validateFields(async (error, values) => {
//       if (error) return
//       await addAssistant(values, id)
//       this.props.onOk()
//     })
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form
//     const { visible } = this.props
//     const { loading, onCancel } = this.props
//     return (
//       <Modal
//         visible={visible}
//         onOk={this.handleSubmit}
//         onCancel={onCancel}
//         confirmLoading={loading}
//         destroyOnClose
//         title="Agregar asistente"
//       >
//         <Form onSubmit={this.handleSubmit}>
//           <FormItem label="Nombre">
//             {getFieldDecorator("name", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Dirección">
//             {getFieldDecorator("address", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Ciudad">
//             {getFieldDecorator("city", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Estado">
//             {getFieldDecorator("state", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Codigo postal">
//             {getFieldDecorator("zip", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Telefono">
//             {getFieldDecorator("phonenumber", {
//               rules: [
//                 {
//                   required: true
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Email">
//             {getFieldDecorator("email", {
//               rules: [
//                 {
//                   required: true,
//                   type: "email"
//                 }
//               ]
//             })(<Input />)}
//           </FormItem>
//           <FormItem label="Niños">
//             {getFieldDecorator("kids", {
//               rules: [
//                 {
//                   type: "integer",
//                   required: true,
//                   min: 0
//                 }
//               ]
//             })(<InputNumber />)}
//           </FormItem>
//           <FormItem label="Adultos">
//             {getFieldDecorator("adults", {
//               rules: [
//                 {
//                   type: "integer",
//                   required: true,
//                   min: 0
//                 }
//               ]
//             })(<InputNumber />)}
//           </FormItem>
//           <FormItem label="Atendera?">
//             {getFieldDecorator("rsvp", {
//               rules: [
//                 {
//                   required: false,
//                   type: "boolean"
//                 }
//               ],
//               initialValue: false,
//               valuePropName: "checked"
//             })(<Checkbox />)}
//           </FormItem>
//         </Form>
//       </Modal>
//     )
//   }
// }

// const AddAssistantForm = Form.create()(
//   connect(
//     ({ events }) => ({ loading: events.loading }),
//     {
//       addAssistant
//     }
//   )(AddAssistant)
// )

// class EditableCell extends React.Component {
//   getInput = () => {
//     if (this.props.inputType === "number") {
//       return <InputNumber />
//     }

//     if (this.props.inputType === "checkbox") {
//       return <Checkbox />
//     }

//     return <Input />
//   }

//   render() {
//     const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props
//     return (
//       <EditableContext.Consumer>
//         {form => {
//           const { getFieldDecorator } = form
//           return (
//             <td {...restProps}>
//               {editing ? (
//                 <FormItem style={{ margin: 0 }}>
//                   {getFieldDecorator(dataIndex, {
//                     rules: [
//                       typeof rules[inputType] === "function"
//                         ? rules[inputType](title)
//                         : rules[inputType]
//                     ],
//                     initialValue:
//                       dataIndex === "rsvp" ? Boolean(record[dataIndex]) : record[dataIndex],
//                     valuePropName: dataIndex === "rsvp" ? "checked" : "value"
//                   })(this.getInput())}
//                 </FormItem>
//               ) : (
//                 restProps.children
//               )}
//             </td>
//           )
//         }}
//       </EditableContext.Consumer>
//     )
//   }
// }

// class Assistants extends Component {
//   constructor() {
//     super()
//     this.state = { editingId: null, visibleModal: false }
//     this.isEditing = this.isEditing.bind(this)
//     this.handleDelete = this.handleDelete.bind(this)
//     this.cancel = this.cancel.bind(this)
//     this.edit = this.edit.bind(this)
//     this.save = this.save.bind(this)
//     this.showModal = this.showModal.bind(this)
//     this.handleOk = this.handleOk.bind(this)
//     this.handleCancel = this.handleCancel.bind(this)

//     this.columns = [
//       {
//         title: "Invitado",
//         dataIndex: "name",
//         key: "name",
//         editable: true
//       },
//       {
//         title: "Direccion",
//         dataIndex: "address",
//         key: "address",
//         editable: true
//       },
//       {
//         title: "Telefono",
//         dataIndex: "phonenumber",
//         key: "phonenumber",
//         editable: true
//       },
//       {
//         title: "Email",
//         dataIndex: "email",
//         key: "email",
//         editable: true
//       },
//       {
//         title: "Asistira?",
//         dataIndex: "rsvp",
//         key: "rsvp",
//         editable: true,
//         filters: [
//           {
//             text: "Si",
//             value: 0
//           },
//           {
//             text: "No",
//             value: 1
//           }
//         ],
//         onFilter: (value, record) => record.rsvp != value,
//         render: rsvp =>
//           rsvp ? (
//             <Icon type="check-circle" className="text-green" />
//           ) : (
//             <Icon type="close-circle" className="text-red" />
//           )
//       },
//       {
//         title: "Niños",
//         dataIndex: "kids",
//         key: "kids",
//         editable: true
//       },
//       {
//         title: "Adultos",
//         dataIndex: "adults",
//         key: "adults",
//         editable: true
//       },
//       {
//         title: "Total",
//         dataIndex: "total",
//         key: "total",
//         render: (_, record) => record.kids + record.adults,
//         sorter: (a, b) => a.adults + a.kids - (b.adults + b.kids)
//       },
//       {
//         title: "Opciones",
//         key: "action",
//         render: (_, record) => {
//           const editable = this.isEditing(record)
//           return (
//             <div className="flex">
//               {editable ? (
//                 <span>
//                   <EditableContext.Consumer>
//                     {form => (
//                       <a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }}>
//                         Guardar
//                       </a>
//                     )}
//                   </EditableContext.Consumer>
//                   <Popconfirm title="Esta seguro?" onConfirm={() => this.cancel(record.id)}>
//                     <a>Cancelar</a>
//                   </Popconfirm>
//                 </span>
//               ) : (
//                 <>
//                   <Button
//                     onClick={() => this.edit(record.id)}
//                     type="primary"
//                     icon="edit"
//                     size="small"
//                     className="rounded"
//                   >
//                     Editar
//                   </Button>
//                   <Popconfirm title="Esta seguro?" onConfirm={() => this.handleDelete(record.id)}>
//                     <Button type="danger" icon="delete" size="small" className="rounded">
//                       Eliminar
//                     </Button>
//                   </Popconfirm>
//                 </>
//               )}
//             </div>
//           )
//         }
//       }
//     ]
//   }

//   componentDidMount() {
//     const { getEvents } = this.props
//     getEvents()
//   }

//   async handleDelete(id) {
//     const { removeAssistant, event } = this.props
//     await removeAssistant(id, event.id)
//   }

//   handleOk() {
//     this.setState({
//       visibleModal: false
//     })
//   }

//   handleCancel() {
//     this.setState({
//       visibleModal: false
//     })
//   }

//   isEditing(record) {
//     return record.id === this.state.editingId
//   }

//   edit(id) {
//     this.setState({ editingId: id })
//   }

//   cancel() {
//     this.setState({ editingId: null })
//   }

//   save(form, id) {
//     const { updateAssistant } = this.props
//     form.validateFields(async (error, row) => {
//       if (error) return
//       await updateAssistant({ ...row, id: id })
//       this.setState({ editingId: null })
//     })
//   }

//   getInputType(type) {
//     switch (type) {
//       case "kids":
//       case "adults":
//         return "number"

//       case "email":
//         return "email"

//       case "rsvp":
//         return "checkbox"

//       default:
//         return "text"
//     }
//   }

//   showModal() {
//     this.setState({
//       visibleModal: true
//     })
//   }

//   render() {
//     const { event, loading } = this.props
//     const { visibleModal } = this.state

//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell
//       }
//     }

//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           inputType: this.getInputType(col.dataIndex),
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: this.isEditing(record)
//         })
//       }
//     })

//     if (!event) return "Loading"

//     return (
//       <div className="rounded shadow bg-white max-w-4xl p-6 my-6">
//         <div className="flex justify-between">
//           <div className="flex flex-row">
//             <div className="h-24 w-24 bg-orange-lighter rounded flex flex-col items-center justify-center mr-4">
//               <p className="text-5xl text-orange-dark font-thin">{event.day}</p>
//               <p className="text-xl text-orange-dark font-thin">{event.month_year}</p>
//             </div>
//             <div className="flex flex-col justify-around">
//               <p className="text-xl text-grey-darkest font-bold">{event.name}</p>
//               <p>
//                 {event.date.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
//               </p>
//               <p>{event.location}</p>
//             </div>
//           </div>
//         </div>
//         <Button
//           type="dashed"
//           style={{ width: "100%", marginBottom: 8 }}
//           icon="plus"
//           onClick={this.showModal}
//         >
//           Agregar asistente
//         </Button>
//         <AddAssistantForm visible={visibleModal} event={event} onCancel={this.handleCancel} onOk={this.handleOk}/>
//         <Table
//           components={components}
//           loading={loading}
//           columns={columns}
//           dataSource={event.assistants}
//         />
//       </div>
//     )
//   }
// }

// export default connect(
//   ({ events }, props) => ({
//     event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
//     loading: events.loading
//   }),
//   {
//     getEvents,
//     updateAssistant,
//     removeAssistant
//   }
// )(Assistants)

import React, { Component } from "react"
import {
  EuiBadge,
  EuiHealth,
  EuiButton,
  EuiButtonIcon,
  EuiCheckbox,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableFooter,
  EuiTableFooterCell,
  EuiToolTip,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTablePagination,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
  EuiTableSortMobile,
  EuiTableHeaderMobile,
  EuiBasicTable,
  EuiInMemoryTable
} from "@elastic/eui"
import { Comparators } from "@elastic/eui/es/services/sort"
import { connect } from "react-redux"

import Page from "../Page"
import { getEvents } from "../../redux/actions/events"
import { updateAssistant, removeAssistant } from "../../redux/actions/assistants"

class Assistants extends Component {
  state = {
    pageIndex: 0,
    pageSize: 10,
    sortField: "name",
    sortDirection: "asc",
    confirmationOpen: false
  }

  columns = [
    {
      name: "Invitado",
      field: "name",
      sortable: true,
      editable: true
    },
    {
      name: "Direccion",
      field: "address",
      sortable: true,
      editable: true
    },
    {
      name: "Telefono",
      field: "phonenumber",
      sortable: true,
      editable: true
    },
    {
      name: "Email",
      field: "email",
      sortable: true,
      editable: true
    },
    {
      name: "Asistira?",
      field: "rsvp",
      sortable: true,
      render: (rsvp, item) =>
        rsvp ? (
          <EuiIcon type="checkInCircleFilled" color="secondary" />
        ) : (
          <EuiIcon type="crossInACircleFilled" color="danger" />
        ),
      editable: true
    },
    {
      name: "Niños",
      field: "kids",
      sortable: true,
      editable: true
    },
    {
      name: "Adultos",
      field: "adults",
      sortable: true,
      editable: true
    },
    {
      name: "Total",
      field: "total",
      sortable: true
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Editar",
          description: "Editar invitado",
          type: "icon",
          icon: "pencil",
          onClick: () => ""
        },
        {
          render: item => {
            return (
              <EuiPopover
                id="popover"
                button={
                  <EuiToolTip content="Eliminar invitado" position="left">
                    <EuiIcon
                      onClick={() => this.showConfirmation(item.id)}
                      type="trash"
                      color="danger"
                    />
                  </EuiToolTip>
                }
                isOpen={this.state.confirmationOpen[item.id]}
                closePopover={() => this.hideConfirmation(item.id)}
                anchorPosition="upCenter"
              >
                Yes, no
              </EuiPopover>
            )
          }
        }
      ]
    }
  ]

  componentDidMount() {
    const { getEvents } = this.props
    getEvents()
  }

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

  getRowProps = item => {
    const { id } = item
    return {
      className: "customRowClass",
      onClick: () => console.log(`Clicked row ${id}`)
    }
  }

  getCellProps = (item, column) => {
    const { id } = item
    const { field } = column
    return {
      className: "customCellClass",
      textOnly: true
    }
  }

  getPageItems = (pageIndex, pageSize, sortField, sortDirection) => {
    const {
      event: { assistants }
    } = this.props

    let items

    if (sortField) {
      items = assistants
        .slice(0)
        .sort(Comparators.property(sortField, Comparators.default(sortDirection)))
    } else {
      items = assistants
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
    const { event, loading } = this.props
    const { pageIndex, pageSize, sortField, sortDirection } = this.state

    if (!event) return null

    const { pageOfItems, totalItemCount } = this.getPageItems(
      pageIndex,
      pageSize,
      sortField,
      sortDirection
    )

    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount,
      hidePerPageOptions: true
    }

    const sorting = {
      sort: {
        field: sortField,
        direction: sortDirection
      }
    }

    return (
      <Page loading={loading} title="Asistentes">
        <EuiBasicTable
          items={pageOfItems}
          columns={this.columns}
          pagination={pagination}
          sorting={sorting}
          onChange={this.onTableChange}
          hasActions={true}
          rowProps={this.getRowProps}
          cellProps={this.getCellProps}
        />
      </Page>
    )
  }
}

export default connect(
  ({ events }, props) => ({
    event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
    loading: events.loading
  }),
  {
    getEvents,
    updateAssistant,
    removeAssistant
  }
)(Assistants)
