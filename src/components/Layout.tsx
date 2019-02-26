/* eslint no-unused-expressions:0 */

import React, { ReactNode } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../../config/Theme'
import { media } from '../utils/media'
import { designSystem } from '../utils/designSystem'
import { CONTENT_STRINGS } from '../utils/content-strings';
import { getLanguage } from '../utils/language';


const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  @font-face {
    font-family: 'Big John PRO';
    src: url('/fonts/BigJohnPRO-Bold.woff2') format('woff2'),
        url('/fonts/BigJohnPRO-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display:block;
  }
  @font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhGq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhPq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhHq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhIq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhEq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhFq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhLq3-cXbKD.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq8f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq1f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq9f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmqyf7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq-f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq_f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmqxf7-pAVU_.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
  body {
    font-display:block;
    background: ${theme.colors.bg};
    font-display: swap;
    transition: 0.5s ease all;
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

const Footer = styled.footer`
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
    render={data => (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          {children}
          <Footer>
            <span dangerouslySetInnerHTML={{ __html: CONTENT_STRINGS.footer[getLanguage()].company }}></span>
            <br />
            <span dangerouslySetInnerHTML={{ __html: CONTENT_STRINGS.footer[getLanguage()].copyright }}></span>
            <br />
            <small>{CONTENT_STRINGS.footer[getLanguage()].build}: {data.site.buildTime}</small>
          </Footer>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout
