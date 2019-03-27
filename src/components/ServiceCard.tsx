import React from 'react'
import { Grid, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Texture from './Texture';

import { designSystem } from '../utils/designSystem';

interface Props {
  title: string
  content: Array<any>,
  subtitle:string,
  excerpt: string
}


const CustomCard = styled(Card)`
  background-color: ${props => `${designSystem.color(props.backgroundColor)}`};
  padding: ${designSystem.spacing(2)};
  /* TODO MOVE TO MATERIAL THEME */
  border-radius: 0px;
  box-shadow: none;
  position:relative;
  height: 100%;
  &::after {
    background: linear-gradient(115deg, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%), url(${props => props.backgroundImage});
    mix-blend-mode: multiply;
    content: "";
    position:absolute;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.a`
  background: ${designSystem.color('yellow')};
  border: none;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(2)};
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: '1rem';
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`

const BlackButton = styled(Button)`
  background: ${designSystem.color('black')};
  color: ${designSystem.color('white')};
  border: 3px solid ${designSystem.color('black')};
`

const GhostButton = styled(Button)`
  background-color: ${props => `${designSystem.color(props.backgroundColor)}`};
  color: ${designSystem.color('black')};
  border: 3px solid ${designSystem.color('black')};
  &:hover {
    background-color: ${designSystem.color('white')};
  }
`



const Title = styled.h3`
  font-size: ${designSystem.fs('l')}px;
`

const Subtitle = styled.h4`
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-weight: 200;
  text-transform: unset;
  margin-bottom: ${designSystem.spacing(1)};
  padding:0;
`
const Inner = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
`;

const _CardContent = styled(CardContent)`
  height: 80%;
`;


const ServiceCard = ({ title, color, bg, content, mailto, subtitle, excerpt }: Props) => {
  return (
    <CustomCard backgroundColor={color} backgroundImage={bg}>
    <Inner>
      <_CardContent>
      <Grid container>
        <Grid item xs={8}>
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
        {excerpt}
        </Grid>
      </Grid>
      </_CardContent>
      <Grid container spacing={8} justify="flex-end">
        <Grid item><Texture type="grid" /></Grid>
        {/* <Grid item><GhostButton backgroundColor={color} >Learn more</GhostButton></Grid> */}
        <Grid item><BlackButton target="_blank" href={mailto}>Contact us</BlackButton></Grid>
      </Grid>
      </Inner>
    </CustomCard>
  )
}

export default ServiceCard
