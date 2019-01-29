import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import { Layout, Wrapper, Header, Subline, SEO, PrevNext } from '../components'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import '../utils/prismjs-theme.css'
import { designSystem } from '../utils/designSystem'

const Content = styled.article`
  grid-column: 2;
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem 4rem;
  z-index: 9000;
  max-width: 55vw;
  margin: 0 auto;
  @media ${media.tablet} {
    padding: 3rem 0rem;
    max-width: 100%;
  }
  @media ${media.phone} {
    padding: 2rem 0rem;
    max-width: 100%;
  }
  h2 {
    text-transform: capitalize;
  }
`

const Grid = styled.div`
  justify-items: center;
`

const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;
  text-transform: capitalize;
  @media ${media.phone} {
    padding: 0rem;
    font-size: ${designSystem.fs('m')}px;
    line-height: 1.2;
  }
`

const PostContent = styled.div`
  padding: 2rem 0;
  margin-top: ${designSystem.spacing(6)};
  @media ${media.phone} {
    padding: 0rem;
    max-width: 100%;
    p,
    blockquote {
      font-size: ${designSystem.fs('s')}px;
    }
  }
`

interface Props {
  pageContext: {
    slug: string
    next: object | null
    prev: object | null
  }
  data: {
    markdownRemark: object
  }
}

const Post = ({
  pageContext: { slug, prev = null, next = null },
  data: { markdownRemark: postNode },
}: Props) => {
  const post = postNode.frontmatter

  return (
    <Layout>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <Header />
        <Content>
          <Subline>
            <span>
              {post.date} &mdash; {postNode.timeToRead} Min Read{' '}
            </span>
            <Link to={`/categories/${kebabCase(post.category)}`}>
              #{post.category}
            </Link>
          </Subline>
          <Title>{post.title}</Title>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <PrevNext prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        category
      }
      timeToRead
    }
  }
`
