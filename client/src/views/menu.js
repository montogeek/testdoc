import React, { Component } from "react"
import { connect } from "react-redux"
import { Table } from "antd"

import { getEvents } from "../redux/actions/events"
import FoodList from "../components/menu/foodlist"
import OtherList from "../components/menu/otherlist"
import Page from "../components/Page"

class Menu extends Component {
  componentDidMount() {
    const { getEvents } = this.props
    getEvents()
  }

  render() {
    const { event, loading } = this.props

    return (
      <Page title="Menu" loading={!event}>
        {() => (
          <>
            <FoodList {...event.menu.food} totalKids={event.kids} totalAdults={event.adults} />

            {/* {event.menu.other.map(category => {
              return <OtherList loading={loading} {...category} />
            })} */}
          </>
        )}
      </Page>
    )
  }
}

export default connect(
  ({ events }, props) => {
    const event = events.data.find(event => event.id === parseInt(props.match.params.id, 10))

    return {
      event: event,
      loading: events.loading
    }
  },
  {
    getEvents
  }
)(Menu)
