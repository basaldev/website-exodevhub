import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Header, Article, Wrapper, Button, SectionTitle, LinkHeader } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import { designSystem } from '../utils/designSystem';

const Content = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  @media ${media.tablet} {}
  @media ${media.phone} {}
  overflow: hidden;
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


const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 0 6rem 0;
  color: ${props => props.theme.colors.grey.dark};
  h1 {
    @media ${media.phone} {
      font-size: 10vw;
    }
  }
  p {
    font-size: 1rem;
    margin-top: -1rem;
    width: 45%;
    @media ${media.phone} {
      font-size: 1rem;

    }
    @media ${media.tablet} {
      font-size: 1rem;
      width: 100%;
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
        <Header />
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
        <Header />
        <Content>
        <LinkHeader text={'writings'} white="g"><Button to="/categories">all categories</Button></LinkHeader>
          <ArticleWrapper>
          {postEdges.map(post => (
            <Article
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              shape={post.node.frontmatter.shape || 'diamond'}
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

export default IndexPage;

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
            shape
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
