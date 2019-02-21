import React from "react"
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiLoadingChart,
  EuiErrorBoundary
} from "@elastic/eui"

function Page(props) {
  if (props.loading) {
    return <EuiLoadingChart size="xl" mono />
  }

  if (props.error) {
    return <EuiErrorBoundary>{JSON.stringify(props.error)}</EuiErrorBoundary>
  }

  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{props.title}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        {props.titleRight && <EuiPageHeaderSection>{props.titleRight}</EuiPageHeaderSection>}
      </EuiPageHeader>
      {props.children}
    </>
  )
}

export default Page
