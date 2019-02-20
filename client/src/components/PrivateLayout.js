import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  EuiPage,
  EuiPageBody,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiShowFor,
  EuiSideNav,
} from "@elastic/eui"

import UserMenu from "./user_menu"
import { getUser, logout } from "../redux/actions/user"

import Styles from "./PrivateLayout.module.scss"

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
      openOnMobile: false
    }

    this.sidebarItems = [
      {
        id: "eventos",
        name: "Eventos",
        href: "/dashboard",
        icon: <EuiIcon type="canvasApp" />,
        isSelected: this.isActive("/dashboard")
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

  toggleOpen = () => {
    this.setState({
      openOnMobile: !this.state.openOnMobile
    })
  }

  isActive = path => {
    return window.location.pathname === path
  }

  render() {
    const { openOnMobile } = this.state
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
          <EuiPage style={{ padding: "0" }}>
            <aside className={Styles["aside"]}>
              <EuiSideNav
                mobileTitle="Navegacion"
                toggleOpenOnMobile={this.toggleOpen}
                isOpenOnMobile={openOnMobile}
                items={this.sidebarItems}
                renderItem={item => <Link to={item.href} className={item.className}>{item.children}</Link>}
              />
            </aside>
            <main className={Styles["body"]}>
              <EuiPageBody>
                <div className={Styles["content"]}>{children}</div>
              </EuiPageBody>
            </main>
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
