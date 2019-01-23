import styled from 'styled-components';
import React from 'react';
import { lastIndexOf } from 'lodash';
import { Button, SectionTitle } from 'components';
import { designSystem } from '../utils/designSystem';
import { media } from '../utils/media';

const TitleHeader = styled.div`
grid-column: 2;
display:block;
clear:both;
overflow:hidden;
h1 {
  display:inline-block;
  float:left;
  margin: 0;
}
margin-bottom: 3.5rem; //from h1
`
const ButtonWrapper = styled.div`
  transform: translateY(${designSystem.spacing(2)});
  margin-left: ${designSystem.spacing(2)};
  float:left;
  @media ${media.phone} {
    margin: 0;
    transform: unset;
  }
`

const LinkHeader = ({ text, white, children }) => {
  return (
    <TitleHeader>
    <SectionTitle text={text} white={white} ></SectionTitle>
    <ButtonWrapper>{children}</ButtonWrapper>
    </TitleHeader >
  );
};

export default LinkHeader;
