/* eslint no-unused-expressions:0 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { SEO } from 'components';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import { designSystem } from '../utils/designSystem';

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
  body {
    font-display:block;
    background: ${theme.colors.bg};
    color: ${theme.default};
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
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          buildTime(formatString: "DD.MM.YYYY")
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <SEO />
          <GlobalStyle />
          {children}
          <Footer>
            ExO Lever Asia 合同会社 &copy;{data.site.buildTime.split('.')[2]} All rights reserved. <br />
            <span>Last build: {data.site.buildTime}</span>
          </Footer>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
