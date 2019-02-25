import React, { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import { getLanguage, setLanguage } from '../utils/language';
import LanguageSwitcher from '../components/LanguageSwitcher';
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
const Dropdown = styled.div`
  position: absolute;
  float: right;
  right: ${designSystem.spacing(2)};
  top: ${designSystem.spacing(1)};

  .sub-menu {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    margin-top: ${designSystem.spacing(2)};
    transform: translateY(-2em);
    z-index: -1;
    transition: all 0.2s ease-in-out 0s, visibility 0s linear 0.2s, z-index 0s linear 0.01s;
  }

  :focus .sub-menu,
  :focus-within .sub-menu,
  :hover .sub-menu {
    visibility: visible;
    opacity: 1;
    z-index: 1;
    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s; /* this removes the transition delay so the menu will be visible while the other styles transition */
  }

  a {
    display: block;
    ${button}
    margin-top: ${designSystem.spacing(1)};
    background: ${designSystem.color('black')};
    color: ${designSystem.color('white')};
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
const LogoLink = styled(Link)`
  overflow:hidden;
  display:inline-block;
`
const Logo = styled.img`
  display: inline;
  overflow:hidden;
  min-height: 67px;
  @media ${media.phone} {
    width: 55vw;
  }
`
const LanguageSwitcherWrapper = styled.div`
  position:absolute;
  display:inline-block;
  right: 160px;
  top: ${designSystem.spacing(1)};
  @media ${media.phone} {
    right: 8px;
    top: 64px;
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
      <LogoLink to="/">
        <Logo alt="Exo Devhub" src={config.siteLogo} />
      </LogoLink>
      <LanguageSwitcherWrapper>
        <LanguageSwitcher
              languages={{
                en: true,
                ja: true
              }}
              onClick={(langKey: string) => {
                setLanguage(langKey);
                navigate('/');
              }}
              selectedLanguage={getLanguage()}
            />
        </LanguageSwitcherWrapper>
      <Dropdown>
        <FakeButton>socials</FakeButton>
        <div className="sub-menu">
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
        </div>
      </Dropdown>
      {children}
    </Content>
  </Wrapper>
)

export default Header
