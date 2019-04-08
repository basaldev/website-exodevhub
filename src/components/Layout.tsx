/* eslint no-unused-expressions:0 */

import React, { ReactNode } from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../../config/Theme'
import { media } from '../utils/media'
import { designSystem } from '../utils/designSystem'
import { Footer } from '../components'

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    font-display:block;
    background: ${theme.colors.bg};
    font-display: swap;
    transition: 1s ease all;
    opacity: 1 !important;
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a:visited;
  a {
    color: ${designSystem.color('blue')};
    text-decoration: none;
  }
  a:hover {
    opacity:1;
    color: ${designSystem.color('blue')};
  }
  h1 a,
  h4 a,
  h3 a,
  h2 a {
    color: inherit;
  }
  h1, h2, h3, h4 {
    text-transform: uppercase;
    color: ${theme.colors.grey.dark};
  }
  @media ${media.phone} {
    h1 {
      font-size: 2.25rem;
    }
  }
  h1 span.white {
    color:white
    text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
     -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  blockquote {
    position: relative;
    margin-left: 0;
    background: ${designSystem.color('white')};
    font-size: 1.2rem;
    padding: ${designSystem.spacing(4)};
    border: 1px solid #efefef;
  }
  blockquote:before {
    content: "";
    position: absolute;
    background: ${designSystem.color('red')};
    height: 100%;
    width: 6px;
    top:0px;
    left: 0px;
  }
  iframe {
    max-width: 100%;
    border: 0px;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
`

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          buildTime(formatString: "YYYY-MM-DD")
        }
      }
    `}
    render={data => {
      let content = null
      let footer = null
      if (typeof window !== 'undefined') {
        if (window.location.search === '?lang=ja') {
          setLanguage('ja')
          navigate('/')
        }
        content = children
        footer = <Footer buildTime={data.site.buildTime} />
      }
      return (
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <GlobalStyle />
            {content}
            {footer}
          </React.Fragment>
        </ThemeProvider>
      )
    }}
  />
)

export default Layout
