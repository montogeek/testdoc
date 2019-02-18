import React, { useState } from "react"
import { DateTime } from "luxon"
import { useTransition } from "react-spring"
import { Link } from "react-router-dom"
import {
  EuiPanel,
  EuiStat,
  EuiFlexItem,
  EuiTitle,
  EuiFlexGroup,
  EuiText,
  EuiButton
} from "@elastic/eui"
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
    <EuiPanel onClick={toggleShowDetails}>
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem grow={1}>
          <EuiStat title={event.day} description={event.month_year} textAlign="center" />
        </EuiFlexItem>
        <EuiFlexItem grow={10}>
          <EuiText size="l">
            <h3>{event.name}</h3>
            <p>
              {event.date.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
            </p>
            <p>{event.location}</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <EuiButton>
                <Link
                  to={`/event/update/${event.id}`}
                  className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
                >
                  Editar
                </Link>
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton>
                <Link
                  to={`/event/${event.id}/assistants`}
                  className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
                >
                  Invitados
                </Link>
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton>
                <Link
                  to={`/event/${event.id}/menu`}
                  className="bg-white hover:bg-orange-lightest text-grey-darkest font-semibold py-2 px-4 rounded shadow no-underline"
                >
                  Menu
                </Link>
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        {animatedDetails.map(({ item, props, key }) => {
          return showDetails && <Details key={key} styles={props} summary={event.summary} />
        })}
      </EuiFlexGroup>
    </EuiPanel>
  )
}

export default Event
