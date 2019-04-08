import React from 'react'
import styled from 'styled-components'
import { IntlContextConsumer } from 'gatsby-plugin-intl'

import config from '../../config/SiteConfig'
import { designSystem } from '../utils/designSystem'
import { DiscordWidget } from '../components'

const Wrapper = styled.div`
  grid-column: auto;
  grid-row: auto;
  clear: both;
  width: 100%;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  border: ${designSystem.get('border.width')}px solid;
  margin-right: ${designSystem.spacing(4)};
  background: url(${designSystem.color('grid')});
  background-repeat: repeat;
  background-size: 19px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & a {
    overflow: hidden;
    width: 80%;
    background: ${designSystem.color('black')};
    color: ${designSystem.color('white')};
    text-align: center;
    padding: ${designSystem.spacing(1)};
    &:hover {
      color: ${designSystem.color('blue')};
    }
  }
`
const SignUpCommunity = () => {
  return (
    <Wrapper>
      <IntlContextConsumer>
        {({ messages }: any) => {
          return (
            <>
              <a rel="noopener" target="_blank" href={config.discord}>
                {messages.signupcommunity_button}
              </a>
              <DiscordWidget />
            </>
          )
        }}
      </IntlContextConsumer>
    </Wrapper>
  )
}

export default SignUpCommunity
