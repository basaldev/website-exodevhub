import React, { Component } from 'react'
import styled from 'styled-components'
import { IntlContextConsumer } from 'gatsby-plugin-intl'

import { designSystem } from '../utils/designSystem'

const Widget = styled.div`
  background: ${designSystem.color('white')};
  border: none;
  display: inline-flex;
  align-items: center;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(1)};
  margin-top: ${designSystem.spacing(1)};

  border: 1px solid;
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: 1em;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`
const Online = styled.span`
  color: ${designSystem.color('white')};
  background: ${designSystem.color('green')};
  margin: 0 ${designSystem.spacing(1)};
  padding: ${designSystem.spacing(1)};
`
const User = styled.img`
  border-radius: 100%;
  margin: 0 ${designSystem.spacing(1)} ${designSystem.spacing(1)}
    ${designSystem.spacing(1)};
  width: ${designSystem.spacing(4)};
  height: ${designSystem.spacing(4)};
`
const UserWrapper = styled.div`
  margin: ${designSystem.spacing(1)};
`

type User = {
  avatar_url: string
  username: string
  status: string
}

const DiscordWidget = class Welcome extends Component<{}> {
  state = {
    members: [],
  }

  async getMembers() {
    const thisComponent = this
    fetch('https://discordapp.com/api/guilds/542136882369265675/widget.json', {
      mode: 'cors',
      cache: 'force-cache',
    })
      .then(function(response) {
        return response.text()
      })
      .then(function(body) {
        const members = JSON.parse(body).members
        thisComponent.setState({
          members,
        })
      })
  }

  componentDidMount() {
    this.getMembers()
  }

  render() {
    const online = this.state.members.filter(
      (user: User) => user.status === 'online'
    )

    return (
      <IntlContextConsumer>
        {({ messages }: any) => {
          return (
            <>
              <Widget>
                <span>{messages.discord_subtitle}</span>{' '}
                <Online>{online.length}</Online>
              </Widget>
              <UserWrapper>
                {online.slice(0, 10).map((user: User) => {
                  return (
                    <User
                      src={user.avatar_url}
                      key={user.username}
                      alt={user.username}
                    />
                  )
                })}
              </UserWrapper>
            </>
          )
        }}
      </IntlContextConsumer>
    )
  }
}

export default DiscordWidget
