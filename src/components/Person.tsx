import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { GithubOutline, TwitterOutline } from '@ant-design/icons';
import AntdIcon from '@ant-design/icons-react'
import { designSystem } from '../utils/designSystem'
import { media } from '../utils/media'
AntdIcon.add(GithubOutline, TwitterOutline);


const Person = styled.article`
  grid-column: auto;
  grid-row: auto;
  clear: both;
  width: 100%;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  border: ${designSystem.get('border.width')}px solid;
  margin-right: ${designSystem.spacing(4)};
  background: ${designSystem.color('black')};
  &:last-of-type {
    margin-right: 0;
    margin-bottom: 0;
  }
  @media ${media.phone} {
    width: auto;
    margin-right: 0;
  }
`

const Title = styled.h2`
  position: relative;
  text-transform: capitalize;
  font-weight: normal;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  margin: 0;
  padding: ${designSystem.spacing(1)};
  color: #fff;
  font-size: ${designSystem.fontSize('xs')}px;
  background-color: ${designSystem.color('blue')};
  display:inline-block;
  position:absolute;
  bottom: 0;
`
const Meta = styled.div`
  color: ${designSystem.color('white')};
  font-size: ${designSystem.fontSize('xxs')}px;
  padding: ${designSystem.spacing(1)};
  a {
    display:block;
    color: ${designSystem.color('white')};
    &:hover {
      color:${designSystem.color('yellow')};
    }
  }
`
const ImageWrapper = styled.div`
width: 100%;
clear:both;
display:block;
min-height: 200px;
position: relative;
background: white;
`
const DisplayPicture = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position:center;
  width: 100%;
  min-height: 200px;
  transition: ease all 0.5s;
  -webkit-filter: grayscale(100%) contrast(2);
  filter: grayscale(100%) contrast(2);
  opacity: 0.8;
  &:hover {
    filter: unset;
    opacity: 1;
  }
`

interface Props {
  fullName: string
  slug: string
  github:string
  twitter: string
  image: string
}

const Article = ({
  fullName,
  slug,
  github,
  twitter,
  image
}: Props) => {
  return (
    <Person>
        <ImageWrapper >
        <DisplayPicture image={image} />
          <Title>
            <span>{fullName}</span>
          </Title>
        </ImageWrapper>

        <Meta>
          <a href={`//github.com/${github}`}>{github} <AntdIcon type={GithubOutline} /></a>
          <a  href={`//twitter.com/${twitter}`}>{twitter} <AntdIcon type={TwitterOutline} /></a>
        </Meta>
    </Person>
  )
}

export default Article
