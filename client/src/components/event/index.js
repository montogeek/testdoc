import React from "react"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"
import {
  EuiPanel,
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiButton,
  EuiAccordion
} from "@elastic/eui"

import Details from "./details"

import "./index.scss"

function Event({ event }) {
  return (
    <EuiPanel>
      <EuiAccordion
        id={event.id.toString()}
        paddingSize="xl"
        initialIsOpen={true}
        extraAction={
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
        }
        buttonContent={
          <EuiFlexGroup gutterSize="l">
            <EuiFlexItem grow={1}>
              <EuiStat
                title={event.day}
                description={event.month_year}
                textAlign="center"
                reverse
              />
            </EuiFlexItem>
            <EuiFlexItem grow={10}>
              <EuiText size="m">
                <h3>{event.name}</h3>
                <p>
                  {event.startDate.toLocaleString(DateTime.TIME_SIMPLE)} - {event.duration} horas
                </p>
                {event.location}
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      >
        <EuiFlexGroup>
          <Details event={event} />
        </EuiFlexGroup>
      </EuiAccordion>
    </EuiPanel>
  )
}

export default Event
