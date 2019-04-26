import React from 'react'
import styled from 'styled-components';
import { designSystem } from '../utils/designSystem'

interface Props {
  name: string
}
const ImgPopover = styled('div')`
  position:relative;
  overflow:visable;
  span {
    display: none;
    width:max-content;
  }
  &:hover span {
    position:absolute;
    display:block;
    overflow:hidden;
    bottom: -10px;
    white-space: nowrap;
    left: 0;
    right: 0;
    margin:0 auto;
    background: #000;
    color: #fff;
    font-family: ${designSystem.get(`type.fontFamily.mono`)};
    text-transform:uppercase;
    padding: ${designSystem.spacing(1)};
  }
`

const TechLogo = ({ name }: Props) => {
  return (
    <ImgPopover>
    <img src={`/assets/tech/${name}.png`} ></img>
    <span>{name}</span>
   </ImgPopover>
  )
}

export default TechLogo;
