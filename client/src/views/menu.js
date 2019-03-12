import React, { Component } from "react"
import { connect } from "react-redux"

import { getEvents } from "../redux/actions/events"
import FoodList from "../components/menu/foodlist"
import OtherList from "../components/menu/otherlist"
import Page from "../components/Page"

class Menu extends Component {
  componentDidMount() {
    const { getEvents, event } = this.props

    if (typeof event === "undefined") {
      getEvents()
    }
  }

  render() {
    const {
      event,
      loading,
      match: { params }
    } = this.props

    return (
      <Page title="Menu" loading={!event}>
        {() => (
          <>
            <FoodList
              {...event.menu.food}
              categoryId={event.menu.food.id}
              eventId={params.id}
              totalKids={event.kids}
              totalAdults={event.adults}
            />

            {event.menu.other.map((category, index) => {
              return <OtherList key={index} loading={loading} {...category} />
            })}
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
