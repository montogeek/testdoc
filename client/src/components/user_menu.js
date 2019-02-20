import React, { Component } from "react"
import { connect } from "react-redux"
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiPopover
} from "@elastic/eui"

import { getUser, logoutUser } from "../redux/actions/user"

class Usermenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    const { getUser, user } = this.props
    if (user.data.isAuthenticated && !user.data.name) {
      getUser()
    }
  }

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { user, logoutUser } = this.props

    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="headerUserMenu"
        aria-expanded={this.state.isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={this.onMenuButtonClick}
      >
        <EuiAvatar name={user.data.name || ""} size="s" />
      </EuiHeaderSectionItemButton>
    )

    return (
      <EuiPopover
        id="headerUserMenu"
        ownFocus
        button={button}
        isOpen={this.state.isOpen}
        anchorPosition="downRight"
        closePopover={this.closeMenu}
        panelPaddingSize="none"
      >
        <div style={{ width: 320 }}>
          <EuiFlexGroup gutterSize="m" className="euiHeaderProfile" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiAvatar name={user.data.name} size="xl" />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiText>
                <p>{user.data.name}</p>
              </EuiText>

              <EuiSpacer size="m" />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink href="" onClick={() => logoutUser()}>
                        Cerrar sesion
                      </EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    )
  }
}

Usermenu = connect(
  ({ user }) => ({ user }),
  {
    getUser,
    logoutUser
  }
)(Usermenu)

export default Usermenu
