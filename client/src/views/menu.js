import React, { Component } from "react"
import { connect } from "react-redux"

import { getEvents } from "../redux/actions/events"
import FoodList from "../components/menu/foodlist"
import OtherList from "../components/menu/otherlist"
import Details from "../components/event/details"
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
      <Page
        title="Menu del evento"
        loading={!event}
      >
        {() => {
          const list =
            event.menu.length > 0
              ? event.menu.map(category => {
                  if (category.name === "Comida y bebida") {
                    return (
                      <FoodList
                        name={category.name}
                        items={category.items}
                        budget={category.budget}
                        categoryId={category.id}
                        eventId={params.id}
                        totalKids={event.kids}
                        totalAdults={event.adults}
                      />
                    )
                  }

                  return (
                    <OtherList
                      key={category.id}
                      name={category.name}
                      items={category.items}
                      budget={category.budget}
                      categoryId={category.id}
                      eventId={params.id}
                      loading={loading}
                    />
                  )
                })
              : "No hay menu"

          return (
            <>
              <Details event={event} />
              {list}
            </>
          )
        }}
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
