import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { designSystem } from '../utils/designSystem';
import { Button } from '../components';

import { media } from '../utils/media'
import { Grid } from '@material-ui/core';

const Post = styled.article`
  position:relative;
  flex: 1;
  background-image: url(${props => `${props.backgroundimage}`});
  background-position:center;
  background-size:cover;
  min-height: 380px;
  clear: both;
  overflow:hidden;
  color: #fff;
  position:relative;
  & a {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
  }

  @media ${media.smallLaptop} {
  }
  @media ${media.tablet} {
  }
  @media ${media.phone} {
    width:100%;
    margin-bottom: 0;
  }
`;
const Caption = styled('div')`
  background: #000;
  border-top: 2px solid ${designSystem.color('yellow')};
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-weight: 200;
  text-transform: unset;

  padding: ${designSystem.spacing(2)};
  h3 {
    color: #fff;
    font-weight:200;
    font-family: ${designSystem.get(`type.fontFamily.mono`)};
  }
  p,strong {
    color: #fff;
    margin-bottom: 0;
  }
`;
const WhiteButton = styled(Button)`
  background: #fff;
  color: #000;
`;

interface Props {
  name: string
  slug: string
  image: string;
  excerpt: string;
  platform: string[];
}

const Product = ({ image, name, slug, excerpt, platform }: Props) => {
  return (
    <Grid item xs={12} md={4} lg={4}>
    <Post backgroundimage={image}>
      <Link to={`${slug}`}></Link>
    </Post>
    <Caption>
      <h3>{name}</h3>
      <p>{excerpt}</p>
      <strong>PLATFORM: {platform.join(',')}</strong>
      <Grid container justify="flex-end">
      <Grid item>
      <WhiteButton to={`${slug}`}>Learn More</WhiteButton></Grid>
      </Grid>
    </Caption>
    </Grid>
  )
}

export default Product
