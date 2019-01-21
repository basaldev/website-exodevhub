import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { designSystem } from 'utils/designSystem';
import { Button } from 'components';
import { Link } from 'gatsby';
import config from '../../config/SiteConfig';

const Dropdown = styled.div`
  float:right;
  position: absolute;
  right: ${designSystem.spacing(2)};
  top: ${designSystem.spacing(1)};
  & *:first-child {
    display: block;
  }
  & * {
    display:none;
  }
  &:hover * {
    display:block;
  }
`
const Wrapper = styled.header`
  grid-column: 1 / -1;
  padding: ${designSystem.spacing(4)}  ${designSystem.spacing(2)};
`;

const Content = styled.div`
  margin: 0 auto;
  position: relative;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`;

const Header = ({children}) => (
  <Wrapper>
    <Content>
      <Link to="/"><img src={config.siteLogo} /></Link>
      {/* <Dropdown>
        <Button>socials</Button>
        <Button>socials</Button>
      </Dropdown> */}
      {children}
    </Content>
  </Wrapper>
);

export default Header;
