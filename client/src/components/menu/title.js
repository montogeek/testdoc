import React, { Component } from "react"
import {
  EuiFieldText,
  EuiFieldNumber,
  EuiTitle,
  EuiIcon,
  EuiFlexItem,
  EuiStat,
  EuiLoadingSpinner,
  EuiButtonIcon
} from "@elastic/eui"
import { connect } from "react-redux"
import * as Yup from "yup"
import { withFormik } from "formik"

import { updateCategory } from "../../redux/actions/categories"

let CategoryTitle = class CategoryTitle extends Component {
  state = {
    editing: false
  }

  toggleEditing = () => {
    this.setState(state => ({ editing: !state.editing }))
  }

  handleSubmit = () => {
    this.toggleEditing()
    this.props.handleSubmit()
  }

  render() {
    const { name, budget, values, handleChange, loading } = this.props
    const { editing } = this.state

    if (loading) {
      return (
        <EuiFlexItem>
          <EuiLoadingSpinner size="xl" />
        </EuiFlexItem>
      )
    }

    if (editing) {
      return (
        <>
          <EuiFlexItem grow={1}>
            <EuiFieldText name={"name"} value={values.name} onChange={handleChange} />
            <EuiFieldNumber name={"budget"} value={values.budget} onChange={handleChange} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon onClick={this.handleSubmit} iconType="save" iconSize="l" />
          </EuiFlexItem>
        </>
      )
    }

    return (
      <>
        <EuiFlexItem grow={4}>
          <EuiTitle>
            <h2>{name}</h2>
          </EuiTitle>
          <EuiStat title={`$ ${budget}`} description="" titleSize="m" titleColor="secondary" />
        </EuiFlexItem>
        <EuiFlexItem grow={8}>
          <EuiIcon type="pencil" onClick={this.toggleEditing} size="l" />
        </EuiFlexItem>
      </>
    )
  }
}

CategoryTitle = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    budget: Yup.number().required()
  }),
  mapPropsToValues: ({ name, budget }) => ({ name, budget }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.updateCategory({ ...values, id: props.id }, props.eventId)
    setSubmitting(false)
  },
  enableReinitialize: true,
  displayName: "categoryTitle"
})(CategoryTitle)

CategoryTitle = connect(
  null,
  {
    updateCategory
  }
)(CategoryTitle)

export default CategoryTitle;