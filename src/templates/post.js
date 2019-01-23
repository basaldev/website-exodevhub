import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, Subline, SEO, PrevNext } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import { designSystem } from '../utils/designSystem';

const Content = styled.article`
  grid-column: 2;
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  h2 {
    text-transform: capitalize;
  }
`;
const Grid = styled.div`
    justify-items: center;
`;
const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight:bold;
  text-shadow:
  -0.5px -0.5px 0 #000,
  0.5px -0.5px 0 #000,
   -0.5px 0.5px 0 #000,
   0.5px 0.5px 0 #000;
   text-transform: capitalize;
`;

const PostContent = styled.div`
padding: 2rem;
margin-top: ${designSystem.spacing(6)};
border: 5px solid ${designSystem.color('black')};
`;

const Post = ({ pageContext: { slug, prev, next }, data: { markdownRemark: postNode } }) => {
  const post = postNode.frontmatter;

  return (
    <Layout>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <Header></Header>
        <Content>
          <Subline>
            <span>{post.date} &mdash; {postNode.timeToRead} Min Read </span>
            <Link to={`/categories/${kebabCase(post.category)}`}>#{post.category}</Link>
          </Subline>
          <Title>{post.title}</Title>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <PrevNext prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

Post.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
};

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        category
      }
      timeToRead
    }
  }
`;
