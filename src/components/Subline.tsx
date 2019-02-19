import styled from 'styled-components'

import { designSystem } from '../utils/designSystem'

interface SublineProps {
  sectionTitle?: string
  theme: {
    fontSize: {
      small: string
    }
    colors: {
      grey: {
        light: string
      }
    }
  }
}

const Subline = styled.div`
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-size: ${(props: SublineProps) => props.theme.fontSize.small};
  color: ${(props: SublineProps) => props.theme.colors.grey.light};
  ${(props: SublineProps) => props.sectionTitle && 'margin-top: -3rem'};
  ${(props: SublineProps) => props.sectionTitle && 'margin-bottom: 4rem'};
  ${(props: SublineProps) => props.sectionTitle && 'text-align: center'};
  a {
    float: right;
  }
`

export default Subline
