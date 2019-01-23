import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, LinkHeader,Button } from 'components';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';
import { designSystem } from '../utils/designSystem';

const Content = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  padding: 2rem 0rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.span`
  position: relative;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${designSystem.fs('l')}px;
  clear:both;
  width: 100%;
  display:block;
`;

const Category = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout>
    <Wrapper>
      <Helmet title={`Categories | ${config.siteTitle}`} />
      <Header></Header>
      <LinkHeader text={'Categories'} white="o"><Button to="/categories">all categories</Button></LinkHeader>
      <Content>
        {group.map(category => (
          <Title key={category.fieldValue}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}`}>#{category.fieldValue}</Link> (
            {category.totalCount})
          </Title>
        ))}
      </Content>
    </Wrapper>
  </Layout>
);

export default Category;

Category.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const postQuery = graphql`
  query CategoriesPage {
    allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
