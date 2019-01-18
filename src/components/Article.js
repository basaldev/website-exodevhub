import React from 'react';
import PropTypes, { shape } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Subline } from 'components';
import { designSystem } from 'utils/designSystem';


const shapeSize = 120;
const Post = styled.article`
  flex: 1;
  margin: ${designSystem.spacing(4)};
  max-width: 50vw;
  clear:both;
`;

const Title = styled.h2`
  position: relative;
  margin-bottom: 0.75rem;
  text-transform: capitalize;
  font-weight:bold;
  font-size: ${designSystem.fontSize('l')}px;
  border: ${designSystem.get('border.width')}px solid;
  padding: ${designSystem.spacing(3)};
  clear:both;
  background: white;
  min-height: 110px;
  text-shadow:
  -0.5px -0.5px 0 #000,
  0.5px -0.5px 0 #000,
   -0.5px 0.5px 0 #000,
   0.5px 0.5px 0 #000;
`;
//REPLCAE with SVG
const Shape = styled.div`
  width: ${shapeSize}px;
  height: ${shapeSize}px;
  display:block;
  position:absolute;
  top:0px;
  left:0px;
  ${props => {
   switch (props.type) {
     case 'square':
     return `
      overflow:hidden;
      background: ${designSystem.color('pink')}
     `;
     case 'corner':
     return `
      overflow:hidden;
      top: -15px;
      left: -20px;
      border-radius: 100% 0 0 0;
      background: ${designSystem.color('orange')}
     `;
     case 'diamond':
     return `
      overflow:hidden;
      transform: rotate(45deg);
      background: ${designSystem.color('navy')}
     `;
     default:
     case 'circle':
     return `
      overflow:hidden;
      border-radius: 100%;
      background: ${designSystem.color('blue')}
     `;
   }
  }};
`
const ShapeFence = styled.div`
  padding-left: ${designSystem.spacing(5)};
  position:relative;
  clear:both;
`

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
font-family: ${designSystem.get(`type.fontFamily.mono`)};
float:right;
clear:both;
display:block;
opacity: 0.3;
`

const Article = ({ title, date, excerpt, slug, timeToRead, category, shape }) => {
  const firstChar = title.charAt(0);

  return (
    <Post>

      <ShapeFence>
      <Shape type={shape}></Shape>
      <Meta>
        <span>{date} &mdash; {timeToRead} Min Read</span>
        <Link to={`/categories/${kebabCase(category)}`}>In{' '} #{category}</Link>
      </Meta>
      <Title>
        <Link to={slug}>{title}</Link>
      </Title>
      </ShapeFence>
    </Post>
  );
};

export default Article;

Article.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
