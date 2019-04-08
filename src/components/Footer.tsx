import React, { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { IntlContextConsumer } from 'gatsby-plugin-intl'

import { getLanguage, setLanguage } from '../utils/language'
import { designSystem } from '../utils/designSystem'
import config from '../../config/SiteConfig'
import { media } from '../utils/media'

type ButtonProps = {
  big: string
}

const button = `
  border: none;
  align-items: center;
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(2)};
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${(props: ButtonProps) => (props.big ? '1.2rem' : '1rem')};
`
const SocialMedia = styled.div`
  display:flex;
  justify-content: center;
  max-width: 100%;
  a {
    text-transform: uppercase;
    ${button}
    margin-top: ${designSystem.spacing(1)};
    background: ${designSystem.color('white')};
    color: ${designSystem.color('black')};
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: 0.85;
      color: ${designSystem.color('blue')};
    }
  }
  @media ${media.phone} {
    right: 0;
    flex-wrap: wrap;
  }
`

const Wrapper = styled.header`
  grid-column: 2;
  padding: ${designSystem.spacing(4)} 0 ${designSystem.spacing(10)} 0;
  overflow: hidden;
`

const onHover = (e: SyntheticEvent<HTMLAnchorElement>) => {
  return ((e.target as HTMLAnchorElement).href = `mailto:info@exodevhub.com`)
}

interface Props {
  children?: ReactNode
  buildTime: string
}

const Content = styled.footer`
  text-align: center;
  padding: 3rem 0;
  opacity: 1;
  color: ${designSystem.color('white', 'darker')};
  span {
    font-size: 0.9rem;
  }
  small {
    opacity: 0.4;
  }
`

const Footer = (props: Props) => {
  return (
    <Wrapper>
      <IntlContextConsumer>
        {({ messages }: any) => {
          return (
            <Content>
              <span>{messages.footer_company}</span>
              <br />
              <span>{messages.footer_copyright}</span>
              <span>{new Date().getFullYear()}</span>
              <span>{messages.footer_rights}</span>
              <br />
              <SocialMedia>
                <a
                  rel="noopener"
                  target="_blank"
                  href={`http://twitter.com/${config.userTwitter}`}
                >
                  twitter
                </a>
                <a
                  rel="noopener"
                  target="_blank"
                  href={`https://medium.com/${config.medium}`}
                >
                  Medium
                </a>
                <a rel="noopener" target="_blank" href={`${config.discord}`}>
                  discord
                </a>
                <a
                  rel="noopener"
                  target="_blank"
                  href={`https://dev.to/${config.devto}`}
                >
                  dev.to
                </a>
                <a onMouseOver={onHover} href="mailto:#@exodevhub.com">
                  Email
                </a>
              </SocialMedia>
              <small>
                {messages.footer_build}: {props.buildTime}
              </small>
            </Content>
          )
        }}
      </IntlContextConsumer>
    </Wrapper>
  )
}

export default Footer
