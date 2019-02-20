import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { EuiEmptyPrompt, EuiButton } from "@elastic/eui"

import Event from "../components/event/"
import { getEvents } from "../redux/actions/events"
import { EuiSpacer } from "@elastic/eui"
import Page from "../components/Page"

class Dashboard extends React.Component {
  async componentDidMount() {
    const { getEvents, events } = this.props

    if (events.data.length === 0) {
      getEvents()
    }
  }

  render() {
    const { events } = this.props

    return (
      <Page
        loading={events.loading}
        error={events.error}
        title="Eventos"
        titleRight={
          <Link to="/event/create">
            <EuiButton color="primary" fill>
              Crear evento
            </EuiButton>
          </Link>
        }
      >
        {events.data.length > 0 ? (
          events.data.map((event, i) => (
            <React.Fragment key={i}>
              <Event key={i} event={event} />
              <EuiSpacer />
            </React.Fragment>
          ))
        ) : (
          <EuiEmptyPrompt
            iconType="editorStrike"
            title={<h2>No tienes eventos</h2>}
            body={<p>Empieza a crear eventos ahora mismo</p>}
            actions={
              <Link to="/event/create">
                <EuiButton color="primary" fill>
                  Crear evento
                </EuiButton>
              </Link>
            }
          />
        )}
      </Page>
    )
  }
}

export default connect(
  ({ events }) => ({ events }),
  {
    getEvents
  }
)(Dashboard)
