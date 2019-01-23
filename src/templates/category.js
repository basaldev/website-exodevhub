import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header, Subline, LinkHeader, Button, Article, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import { designSystem } from 'utils/designSystem';

const Content = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  width: 70vw;
  margin:0 auto;
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: auto;
  }
`;
const ArticleWrapper = styled.div`
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media ${media.tablet} {
    flex-direction: column;
  }
  @media ${media.phone} {
    flex-direction: column;
  }
`;
const Meta = styled.div`
font-family: ${designSystem.get(`type.fontFamily.mono`)};
color: ${designSystem.color('white', 'darker')};
text-align: right;
margin-left: ${designSystem.spacing(6)};
margin-bottom: ${designSystem.spacing(4)};

`
const TitleHeader = styled.div`
grid-column: 2;
display:block;
clear:both;
overflow:hidden;
h1 {
  display:inline-block;
  float:left;
}
a {
  transform: translateY(${designSystem.spacing(2)})
}
`

const Category = ({ pageContext: { category }, data: { allMarkdownRemark } }) => {
  const { edges, totalCount } = allMarkdownRemark;
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'}`;

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${category} | ${config.siteTitle}`} />
        <Header></Header>
        <Content>
        <LinkHeader text={'#'+category } white={category.split("")[category.length - 4]}>
        <Button to="/categories">all categories</Button>
        </LinkHeader>
          <ArticleWrapper>
          {edges.map(post => (
            <Article
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              timeToRead={post.node.timeToRead}
              slug={post.node.fields.slug}
              category={post.node.frontmatter.category}
              shape={post.node.frontmatter.shape}
              key={post.node.fields.slug}
            />
          ))}
          </ArticleWrapper>
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Category;

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export const postQuery = graphql`
  query CategoryPage($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
            shape
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
