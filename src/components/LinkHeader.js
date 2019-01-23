import styled from 'styled-components';
import React from 'react';
import { lastIndexOf } from 'lodash';
import { Button, SectionTitle } from 'components';
import { designSystem } from '../utils/designSystem';

const TitleHeader = styled.div`
grid-column: 2;
display:block;
clear:both;
overflow:hidden;
h1 {
  display:inline-block;
  float:left;
}
`
const ButtonWrapper = styled.div`
  transform: translateY(${designSystem.spacing(2)});
  margin-left: ${designSystem.spacing(2)};
  float:left;
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
