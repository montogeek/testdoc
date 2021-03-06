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
    return <EuiErrorBoundary>{props.error.message || "Error"}</EuiErrorBoundary>
  }

  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{props.title}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        {props.titleRight && (
          <EuiPageHeaderSection>
            {typeof props.titleRight === "function" ? props.titleRight() : props.titleRight}
          </EuiPageHeaderSection>
        )}
      </EuiPageHeader>
      {typeof props.children === "function" ? props.children() : props.children}
    </>
  )
}

export default Page
