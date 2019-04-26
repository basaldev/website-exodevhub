import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { designSystem } from '../utils/designSystem'
import { media } from '../utils/media'

const Post = styled.article`
  flex:1;
  background-image: url(${props => `${props.backgroundimage}`});
  background-position:center;
  background-size:cover;
  min-height: 380px;
  max-width:33%;
  clear: both;
  overflow:hidden;
  margin-bottom: ${designSystem.spacing(10)};
  margin-right: ${designSystem.spacing(4)};
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
    max-width:none;
  }
`;

interface Props {
  name: string
  slug: string
  image: string;
}

const Product = ({ image, name, slug }: Props) => {
  return (
    <Post backgroundimage={image}>
      <Link to={`${slug}`}></Link>
    </Post>
  )
}

export default Product
