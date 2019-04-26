import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { designSystem } from '../utils/designSystem'
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
  margin-bottom: ${designSystem.spacing(10)};
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

interface Props {
  name: string
  slug: string
  image: string;
}

const Product = ({ image, name, slug }: Props) => {
  return (
    <Grid item xs={12} md={4} lg={4}>
    <Post backgroundimage={image}>
      <Link to={`${slug}`}></Link>
    </Post>
    </Grid>
  )
}

export default Product
