import styled from 'styled-components'
import React, { ReactNode } from 'react'

import { SectionTitle } from './'
import { designSystem } from '../utils/designSystem'
import { media } from '../utils/media'

const TitleHeader = styled.div`
  grid-column: 2;
  display: block;
  clear: both;
  overflow: hidden;
  h1 {
    display: inline-block;
    float: left;
    margin: 0;
  }
  margin-bottom: 3.5rem; /* from h1 */
  @media ${media.phone} {
    h1 {
      font-size: 2.25rem;
    }
  }
`
const ButtonWrapper = styled.div`
  transform: translateY(${designSystem.spacing(2)});
  margin-left: ${designSystem.spacing(2)};
  float: left;
  @media ${media.phone} {
    margin: 0;
    transform: unset;
  }
`

interface Props {
  text: string
  white: string
  children?: ReactNode
}

const LinkHeader = ({ text, children }: Props) => {
  return (
    <TitleHeader>
      <SectionTitle text={text} />
      <ButtonWrapper>{children}</ButtonWrapper>
    </TitleHeader>
  )
}

export default LinkHeader
