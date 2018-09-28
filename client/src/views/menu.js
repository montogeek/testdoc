import React, { Component } from "react"
import { connect } from "react-redux"
import { Table } from "antd"
import FoodList from "../components/menu/foodlist"
import OtherList from "../components/menu/otherlist"

class Menu extends Component {
  render() {
    const { event, loading } = this.props

    if (!event) return "loading"

    return (
      <div className="rounded shadow bg-white max-w-4xl p-6 my-6">
        <FoodList {...event.menu.food} />

        {event.menu.other.map(category => {
          return <OtherList loading={loading} {...category} />
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
