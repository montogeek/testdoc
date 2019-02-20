import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiTitle,
  EuiNavDrawer,
  EuiNavDrawerMenu,
  EuiNavDrawerFlyout,
  EuiListGroup,
  EuiListGroupItem,
  EuiHorizontalRule,
  EuiShowFor,
  EuiHideFor,
  EuiOutsideClickDetector
} from "@elastic/eui"

import UserMenu from "./user_menu"
import { getUser, logout } from "../redux/actions/user"

const LogoutComponent = ({ logout }) => {
  return (
    <>
      <button onClick={logout}>Cerrar sesion</button>
    </>
  )
}

const Logout = connect(
  () => ({}),
  { logout }
)(LogoutComponent)

const User = ({ user }) => {
  return (
    <div className="border-l-2 py-6 px-6">
      Hola, {user.name}! <Logout />
    </div>
  )
}

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true,
      flyoutIsCollapsed: true,
      flyoutIsAnimating: false,
      navFlyoutTitle: undefined,
      navFlyoutContent: [],
      mobileIsHidden: true,
      showScrollbar: false,
      outsideClickDisabled: true,
      isManagingFocus: false
    }

    this.sidebar = [
      {
        label: "Eventos",
        href: "/dashboard",
        iconType: "canvasApp",
        size: "s",
        style: { color: "inherit" },
        "aria-label": "Eventos"
      }
    ]
  }

  renderLogo() {
    return <EuiHeaderLogo iconType="visTable" aria-label="Ir a Dashboard" />
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton aria-label="Open nav" onClick={this.toggleOpen}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    )
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: "Management",
        href: "#",
        onClick: e => {
          e.preventDefault()
          console.log("You clicked management")
        },
        "data-test-subj": "breadcrumbsAnimals",
        className: "customClass"
      },
      {
        text: "Truncation test is here for a really long item",
        href: "#",
        onClick: e => {
          e.preventDefault()
          console.log("You clicked truncation test")
        }
      },
      {
        text: "hidden",
        href: "#",
        onClick: e => {
          e.preventDefault()
          console.log("You clicked hidden")
        }
      },
      {
        text: "Users",
        href: "#",
        onClick: e => {
          e.preventDefault()
          console.log("You clicked users")
        }
      },
      {
        text: "Create"
      }
    ]

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
  }

  timeoutID

  toggleOpen = () => {
    this.setState({
      mobileIsHidden: !this.state.mobileIsHidden
    })

    setTimeout(() => {
      this.setState({
        outsideClickDisabled: this.state.mobileIsHidden ? true : false
      })
    }, 350)
  }

  expandDrawer = () => {
    this.setState({ isCollapsed: false })

    setTimeout(() => {
      this.setState({
        showScrollbar: true
      })
    }, 350)

    // This prevents the drawer from collapsing when tabbing through children
    // by clearing the timeout thus cancelling the onBlur event (see focusOut).
    // This means isManagingFocus remains true as long as a child element
    // has focus. This is the case since React bubbles up onFocus and onBlur
    // events from the child elements.
    clearTimeout(this.timeoutID)

    if (!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true
      })
    }
  }

  collapseDrawer = () => {
    this.setState({
      flyoutIsAnimating: false
    })

    setTimeout(() => {
      this.setState({
        isCollapsed: true,
        flyoutIsCollapsed: true,
        mobileIsHidden: true,
        showScrollbar: false,
        outsideClickDisabled: true
      })
    }, 350)

    // Scrolls the menu and flyout back to top when the nav drawer collapses
    setTimeout(() => {
      document.getElementById("navDrawerMenu").scrollTop = 0
      document.getElementById("navDrawerFlyout").scrollTop = 0
    }, 300)
  }

  focusOut = () => {
    // This collapses the drawer when no children have focus (i.e. tabbed out).
    // In other words, if focus does not bubble up from a child element, then
    // the drawer will collapse. See the corresponding block in expandDrawer
    // (called by onFocus) which cancels this operation via clearTimeout.
    this.timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false
        })

        this.collapseDrawer()
      }
    }, 0)
  }

  expandFlyout = (links, title) => {
    const content = links

    this.setState(prevState => ({
      flyoutIsCollapsed: prevState.navFlyoutTitle === title ? !this.state.flyoutIsCollapsed : false
    }))

    this.setState({
      flyoutIsAnimating: true,
      navFlyoutTitle: title,
      navFlyoutContent: content
    })
  }

  collapseFlyout = () => {
    this.setState({ flyoutIsAnimating: true })

    setTimeout(() => {
      this.setState({
        flyoutIsCollapsed: true,
        navFlyoutTitle: null,
        navFlyoutContent: null
      })
    }, 250)
  }

  isActive = path => {
    return window.location.pathname === path
  }

  render() {
    const {
      isCollapsed,
      flyoutIsCollapsed,
      flyoutIsAnimating,
      navFlyoutTitle,
      navFlyoutContent,
      mobileIsHidden,
      showScrollbar,
      outsideClickDisabled
    } = this.state

    const { children } = this.props

    return (
      <Fragment>
        <div>
          <EuiHeader>
            <EuiHeaderSection grow={false}>
              <EuiShowFor sizes={["xs", "s"]}>
                <EuiHeaderSectionItem border="right">
                  {this.renderMenuTrigger()}
                </EuiHeaderSectionItem>
              </EuiShowFor>
              <EuiHeaderSectionItem border="right">{this.renderLogo()}</EuiHeaderSectionItem>
            </EuiHeaderSection>

            {this.renderBreadcrumbs()}

            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem>
                <UserMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiOutsideClickDetector
            onOutsideClick={() => this.collapseDrawer()}
            isDisabled={outsideClickDisabled}
          >
            <EuiNavDrawer
              isCollapsed={isCollapsed}
              flyoutIsCollapsed={flyoutIsCollapsed}
              flyoutIsAnimating={flyoutIsAnimating}
              onMouseOver={this.expandDrawer}
              onFocus={this.expandDrawer}
              onBlur={this.focusOut}
              onMouseLeave={this.collapseDrawer}
              mobileIsHidden={mobileIsHidden}
              showScrollbar={showScrollbar}
            >
              <EuiNavDrawerMenu id="navDrawerMenu">
                <EuiListGroup>
                  {this.sidebar.map((link, i) => {
                    return (
                      <EuiListGroupItem key={i} {...link} isActive={this.isActive(link.href)} />
                    )
                  })}
                </EuiListGroup>
              </EuiNavDrawerMenu>
              <EuiNavDrawerFlyout
                id="navDrawerFlyout"
                title={navFlyoutTitle}
                isCollapsed={flyoutIsCollapsed}
                listItems={navFlyoutContent}
                onMouseLeave={this.collapseFlyout}
                wrapText={true}
              />
            </EuiNavDrawer>
          </EuiOutsideClickDetector>
          <EuiPage style={{ height: "100%" }}>
            <EuiPageBody style={{ marginLeft: "64px" }}>{children}</EuiPageBody>
          </EuiPage>
        </div>
      </Fragment>
    )
  }
}

export default connect(
  ({ user }) => ({ user }),
  {
    getUser
  }
)(Layout)
