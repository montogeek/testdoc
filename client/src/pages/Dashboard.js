import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  EuiPageHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageHeaderSection,
  EuiPageContentBody,
  EuiPageContent,
  EuiLoadingChart,
  EuiEmptyPrompt,
  EuiButton
} from "@elastic/eui"

import Event from "../components/event/"
import { getEvents } from "../redux/actions/events"

class Dashboard extends React.Component {
  async componentDidMount() {
    const { getEvents } = this.props
    getEvents()
  }

  render() {
    const { events } = this.props

    if (events.loading) {
      return (
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiLoadingChart size="xl" mono />
        </EuiPageContent>
      )
    }

    if (events.error) {
      return <p>Error!</p>
    }

    return (
      <>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Eventos</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          {events.data.length > 0 ? (
            events.data.map((event, i) => (
              <>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiTitle>
                      <h2>Eventos activos</h2>
                    </EuiTitle>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <Event key={i} event={event} />
                </EuiPageContentBody>
              </>
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
        </EuiPageContent>
      </>
    )
  }
}

export default connect(
  ({ events }) => ({ events }),
  {
    getEvents
  }
)(Dashboard)
