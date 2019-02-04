import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

import { designSystem } from '../utils/designSystem'
import { media } from '../utils/media'

const shapeSize = 120

const Post = styled.article`
  flex: 45% 0 0;
  clear: both;
  margin-bottom: ${designSystem.spacing(10)};
  margin-right: ${designSystem.spacing(4)};
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
  margin-bottom: 0.75rem;
  text-transform: capitalize;
  font-weight: bold;
  font-size: ${designSystem.fontSize('s')}px;
  border: ${designSystem.get('border.width')}px solid;
  display: table;
  width: 100%;
  & a {
    padding: 0 ${designSystem.spacing(3)};
    vertical-align: middle;
    display: table-cell;
    @media ${media.phone} {
      padding: ${designSystem.spacing(3)};
    }
  }
  clear: both;
  background: white;
  height: 110px; //Firefox fix
`

// TODO: Replace with SVG
const Shape = styled.div`
  width: ${shapeSize}px;
  height: ${shapeSize}px;
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  ${props => {
    switch (props.type) {
      case 'square':
        return `
      overflow:hidden;
      background: ${designSystem.color('pink')}
     `
      case 'corner':
        return `
      overflow:hidden;
      top: -5px;
      border-radius: 100% 0 0 0;
      background: ${designSystem.color('orange')}
     `
      case 'diamond':
        return `
      overflow:hidden;
      transform: rotate(45deg);
      left: 24px;
      top: 6px;
      width: 110px;
      height: 110px;
      background: ${designSystem.color('blue')}
     `
      default:
      case 'circle':
        return `
      overflow:hidden;
      border-radius: 100%;
      background: ${designSystem.color('green')}
     `
    }
  }};
`

const ShapeFence = styled.div`
  padding-left: ${designSystem.spacing(5)};
  position: relative;
  clear: both;
`

const Meta = styled.div`
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  color: ${designSystem.color('white', 'darker')};
  font-size: ${designSystem.fontSize('xxs')}px;
  float: right;
  clear: both;
  display: block;
  text-align: right;
  margin-left: ${designSystem.spacing(6)};
  @media ${media.phone} {
    margin-left: ${designSystem.spacing(10)};
  }
`

interface Props {
  title: string
  date: string
  excerpt: string
  slug: string
  timeToRead: number
  category: string
  shape: string
}

const Article = ({
  title,
  date,
  excerpt = '' /* PropTypes indicated that this props is a required string */,
  slug,
  timeToRead,
  category,
  shape,
}: Props) => {
  console.log('DATE', date)
  return (
    <Post>
      <ShapeFence>
        <Shape type={shape} />
        <Meta>
          <span>
            {date} &mdash; {timeToRead} Min Read - In{' '}
          </span>
          <Link to={`/categories/${kebabCase(category)}`}> #{category}</Link>
        </Meta>
        <Title>
          <Link to={slug}>{title}</Link>
        </Title>
      </ShapeFence>
    </Post>
  )
}

export default Article
