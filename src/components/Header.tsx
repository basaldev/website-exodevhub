import React, { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { designSystem } from '../utils/designSystem'
import config from '../../config/SiteConfig'
import { media } from '../utils/media'

const button = `
  border: none;
  align-items: center;
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(2)};
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${props => (props.big ? '1.2rem' : '1rem')};
`
const Dropdown = styled.div`
  float: right;
  position: absolute;
  right: ${designSystem.spacing(2)};
  top: ${designSystem.spacing(1)};
  & *:first-child {
    display: block;
  }
  & * {
    display: none;
  }
  &:hover * {
    display: block;
  }
  a {
    ${button}
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
  a {
    margin-top: ${designSystem.spacing(1)};
    background: ${designSystem.color('black')};
    color: ${designSystem.color('white')};
  }
  @media ${media.phone} {
    right: 0;
  }
`
const Wrapper = styled.header`
  grid-column: 2;
  padding: ${designSystem.spacing(4)} 0 ${designSystem.spacing(10)} 0;
`

const Content = styled.div`
  margin: 0 auto;
  position: relative;
`
const FakeButton = styled.span`
  ${button}
  background: ${designSystem.color('yellow')};
`
const Logo = styled.img`
  @media ${media.phone} {
    width: 55vw;
  }
`

const onHover = (e: SyntheticEvent<HTMLAnchorElement>) => {
  return ((e.target as HTMLAnchorElement).href = `mailto:info@exodevhub.com`)
}

interface Props {
  children?: ReactNode
}

const Header = ({ children }: Props) => (
  <Wrapper>
    <Content>
      <Link to="/">
        <Logo src={config.siteLogo} />
      </Link>
      <Dropdown>
        <FakeButton>socials</FakeButton>
        <a target="_blank" href={`http://twitter.com/${config.userTwitter}`}>
          twitter
        </a>
        <a onMouseOver={onHover} href="mailto:#@exodevhub.com">
          Email
        </a>
      </Dropdown>
      {children}
    </Content>
  </Wrapper>
)

export default Header
