import React from 'react'
import { Grid, Card, CardContent, ExpansionPanel } from '@material-ui/core';
import styled from 'styled-components';
import { designSystem } from '../utils/designSystem';
import { media } from '../utils/media';

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
  flex: 1;
  height: 100%;
  &::after {
    background: linear-gradient(115deg, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%), url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    mix-blend-mode: multiply;
    content: "";
    position:absolute;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
`;

const buttonBase = `
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
`

const Button = styled.a`
  background: ${designSystem.color('yellow')};
  ${buttonBase}
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

const GhostButton = styled.button`
  ${buttonBase}
  background-color: ${props => `${designSystem.color(props.backgroundColor)}`};
  color: ${designSystem.color('black')};
  border: 3px solid ${designSystem.color('black')};
  &:hover {
    background-color: ${designSystem.color('white')};
  }
`

const Title = styled.h3`
  font-size: ${designSystem.fs('l')}px;
  word-break:break-word;
  @media ${media.tablet} {
      font-size: 3vw;
    }
  @media ${media.phone} {
      font-size: 5vw;
  }
`

const Subtitle = styled.h4`
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-weight: 200;
  text-transform: unset;
  margin-bottom: ${designSystem.spacing(1)};
  word-break:break-word;
  padding:0;
`
const Inner = styled.div`
  position: relative;
  z-index: 2;
  /* height: 100%; */
`;

const _CardContent = styled(CardContent)`
  height: 100%;
`;
const _ExpansionPanel = styled(ExpansionPanel)`
  background: transparent;
  box-shadow:none;
  border:0px;
  &:before {
    display:none;
  }
`
const Padding = styled.div`
  padding: ${designSystem.spacing(2)} 0;
`

export class ServiceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRef: null,
    };
  }
  render() {
  const ExpandTrigger = this.props.content.length > 0 ?  <Grid item><GhostButton onClick={this.props.handleExpand} backgroundColor={this.props.color}>Learn more</GhostButton></Grid> : null;
  return (
      <CustomCard backgroundColor={this.props.color} backgroundImage={this.props.bg}>
      <Inner>
        <_CardContent>
        <Grid container justify="space-between" direction="column" spacing={16}>
          <Grid item xs={8}>
          <Subtitle>{this.props.subtitle}</Subtitle>
          <Title>{this.props.title}</Title>
          {this.props.excerpt}
          <_ExpansionPanel expanded={this.props.expanded}>
          <Padding>
          {this.props.content.map((para: string, index: number) => {
            return <p key={index+para} dangerouslySetInnerHTML={{ __html: para}} />
          })}
          </Padding>
        </_ExpansionPanel>
        </Grid>
        <Grid item>
        <Grid container spacing={8} justify="flex-end">
          {ExpandTrigger}
          <Grid item><BlackButton target="_blank" href={this.props.mailto}>Contact us</BlackButton></Grid>
        </Grid>
        </Grid>
        </Grid>
        </_CardContent>
        </Inner>
      </CustomCard>
    )
  }
}

export default ServiceCard
