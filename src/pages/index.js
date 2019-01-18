import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Header, Article, Wrapper, Button, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import { designSystem } from '../utils/designSystem';

const Content = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  padding: 2rem 2rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const ArticleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  @media ${media.tablet} {
    flex-direction: column;
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    flex-direction: column;
  }
`;


const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-align:center;
  color: ${props => props.theme.colors.grey.dark};

  p {
    font-size: 1rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1rem;
    }
    @media ${media.tablet} {
      font-size: 1rem;
    }
  }
`;
const SplashPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
    <Layout>
      <Wrapper>
        <Header></Header>
        <Hero>
          <SectionTitle text="Coming Soon" white="S" ></SectionTitle>
          <p>
            We are currently building the website, it will be up any day now {`;)`}
        </p>
        </Hero>
      </Wrapper>
    </Layout>
  );

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
    <Layout>
      <Wrapper>
        <Header></Header>
        <Content>
          <SectionTitle text="writings" white="g" ></SectionTitle>
          <ArticleWrapper>
          {postEdges.map(post => (
            <Article
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              timeToRead={post.node.timeToRead}
              slug={post.node.fields.slug}
              category={post.node.frontmatter.category}
              key={post.node.fields.slug}
            />
          ))}
          </ArticleWrapper>
        </Content>
        <Hero>
          <SectionTitle text="about" white="o" ></SectionTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        </Hero>
      </Wrapper>
    </Layout>
  );

export default SplashPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
