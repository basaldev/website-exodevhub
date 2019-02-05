import styled from 'styled-components'

import { designSystem } from '../utils/designSystem'
import React from 'react'

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
`;
const User = styled.img`
  border-radius: 100%;
  margin: 0 ${designSystem.spacing(1)} ${designSystem.spacing(1)} ${designSystem.spacing(1)};
  width: ${designSystem.spacing(4)};
  height: ${designSystem.spacing(4)};
`
const UserWrapper = styled.div`
  margin: ${designSystem.spacing(1)};
`
const DiscordWidget = class Welcome extends React.Component {
  super(){
  }
  state = {
    members: []
  }
  async getMembers(){
    const thisComponent = this;
    fetch('https://discordapp.com/api/guilds/542136882369265675/widget.json', {
      mode: "cors",
      cache: "force-cache",
    })
    .then(function(response) {
      return response.text()
    }).then(function(body) {
      const members = JSON.parse(body).members;
      thisComponent.setState({
        members
      });
    })
  }
  componentDidMount(){
    this.getMembers();
  }
  render(){
    const online = this.state.members.filter(user => user.status === 'online');
    return (
      <>
      <Widget>
        <span>Online</span> <Online>{online.length}</Online>
      </Widget>
      <UserWrapper>
      {this.state.members.slice(0, 10).map(user => {
          return <User src={user.avatar_url} key={user.username} alt={user.username} />
        })}
      </UserWrapper>
      </>

    )
  }
}

export default DiscordWidget
