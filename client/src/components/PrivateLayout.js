import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { matchPath } from "react-router"
import {
  EuiPage,
  EuiPageBody,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
  EuiShowFor,
  EuiSideNav
} from "@elastic/eui"

import UserMenu from "./user_menu"

import Styles from "./PrivateLayout.module.scss"

class PrivateLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openOnMobile: false
    }

    this.sidebarItems = [
      {
        id: "events",
        name: "Eventos",
        href: "/dashboard",
        icon: <EuiIcon type="canvasApp" />,
        isSelected: this.isActive("/dashboard"),
        items: [
          {
            id: "event",
            name: "Evento",
            href: "/dashboard",
            isSelected: this.isActive("/event/:id"),
            items: [
              {
                id: "assistants",
                name: "Asistentes",
                href: "/event/:id/assistants",
                isSelected: this.isActive("/event/:id/assistants")
              },
              {
                id: "menu",
                name: "Menu",
                href: "/event/:id/menu",
                isSelected: this.isActive("/event/:id/menu")
              },
              {
                id: "chairs",
                name: "Sillas",
                href: "/event/:id/layout",
                isSelected: this.isActive("/event/:id/layout")
              }
            ]
          }
        ]
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

  toggleOpen = () => {
    this.setState({
      openOnMobile: !this.state.openOnMobile
    })
  }

  isActive = path => !!matchPath(window.location.pathname, { path })

  render() {
    const { openOnMobile } = this.state
    const { children, match } = this.props

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
                renderItem={item => (
                  <Link to={item.href.replace(":id", match.params.id)} className={item.className}>
                    {item.children}
                  </Link>
                )}
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

export default PrivateLayout
