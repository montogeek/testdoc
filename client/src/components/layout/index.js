import React, { Component } from "react"
import { connect } from "react-redux"

import Boardr from "./Board"
import Page from "../../components/Page"

import { getEvents } from "../../redux/actions/events"

class Layout extends Component {
  componentDidMount() {
    const { getEvents, event } = this.props

    if (typeof event === "undefined") {
      getEvents()
    }
  }

  render() {
    const { event } = this.props

    return (
      <Page title="Sillas" loading={!event}>
        {() => {
          return <Boardr event={event} />
        }}
      </Page>
    )
  }
}

Layout = connect(
  ({ events }, props) => ({
    event: events.data.find(event => event.id === parseInt(props.match.params.id, 10)),
    loading: events.loading
  }),
  {
    getEvents
  }
)(Layout)

export default Layout
