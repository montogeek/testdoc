import React, { useState } from "react"
import { DateTime } from "luxon"
import { useTransition } from "react-spring"
import { Link } from "react-router-dom"
import { EuiPanel, EuiStat, EuiFlexItem, EuiFlexGroup, EuiText, EuiButton } from "@elastic/eui"

import Details from "./details"

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => setShowDetails(showDetails => !showDetails)

  const animatedDetails = useTransition(showDetails, null, {
    from: { overflow: "hidden", opacity: 0, height: 0 },
    enter: { opacity: 1, height: "auto" },
    leave: { opacity: 0, height: 0 }
  })

  return (
    <EuiPanel>
      <EuiFlexGroup gutterSize="l" onClick={toggleShowDetails}>
        <EuiFlexItem grow={1}>
          <EuiStat title={event.day} description={event.month_year} textAlign="center" reverse />
        </EuiFlexItem>
        <EuiFlexItem grow={10}>
          <EuiText size="m">
            <h3>{event.name}</h3>
            <p>
              {event.date.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
            </p>
            {event.location}
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <Link to={`/event/update/${event.id}`}>
                <EuiButton>Editar</EuiButton>
              </Link>
            </EuiFlexItem>
            <EuiFlexItem>
              <Link to={`/event/${event.id}/assistants`}>
                <EuiButton>Invitados</EuiButton>
              </Link>
            </EuiFlexItem>
            <EuiFlexItem>
              <Link to={`/event/${event.id}/menu`}>
                <EuiButton>Menu</EuiButton>
              </Link>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      {showDetails && (
        <EuiFlexGroup>
          {/* {animatedDetails.map(({ item, props, key }) => { */}
            {/* return showDetails && <Details key={key} styles={props} summary={event.summary} /> */}
          {/* })} */}
          <Details summary={event.summary} />
        </EuiFlexGroup>
      )}
    </EuiPanel>
  )
}

export default Event
