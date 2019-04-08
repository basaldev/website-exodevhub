import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import { Layout, Wrapper, Header, Subline, SEO } from '../components'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import '../utils/prismjs-theme.css'
import { designSystem } from '../utils/designSystem'

const Content = styled.article`
  grid-column: 2;
  overflow: hidden;
  padding: 1rem 0rem;
  z-index: 9000;
  position: relative;
  max-width: 55vw;
  margin: 0 auto;
  @media ${media.tablet} {
    padding: 3rem 0rem;
    max-width: 100%;
  }
  @media ${media.phone} {
    padding: 0rem 0rem 2rem 0;
    max-width: 100%;
  }
  h2 {
    text-transform: capitalize;
  }
`

const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: bold;
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
  h2,
  h3,
  h4 {
    font-family: 'Noto Sans', sans-serif;
    text-transform: capitalize;
  }
  @media ${media.phone} {
    padding: 0rem;
    max-width: 100%;
    p,
    blockquote {
      font-size: ${designSystem.fs('sm')}px;
    }
  }
`

const outlineButton = `
  padding: ${designSystem.spacing(1)};
  font-weight:bold;
  display:inline-block;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-size: ${designSystem.fs(`xs`)}px;
`
const Author = styled.span`
${outlineButton}
border: 3px solid ${designSystem.color('black')};
margin-right: ${designSystem.spacing(1)};
`

const Discuss = styled.a`
  ${outlineButton}
  border: 3px solid ${designSystem.color('blue')};
  margin-right: ${designSystem.spacing(1)};
  &:hover {
    background: ${designSystem.color('blue')};
    color: ${designSystem.color('white')};
  }
`
const Clap = styled.a`
  ${outlineButton}
  color: ${designSystem.color('green')};
  border: 3px solid;
  &:hover {
    background: ${designSystem.color('green')};
    color: ${designSystem.color('white')};
    border: 3px solid ${designSystem.color('green')};
  }
`
interface Props {
  pageContext: {
    slug: string
    next: object | null
    prev: object | null
  }
  data: {
    markdownRemark: {
      html: string
      timeToRead: number
      frontmatter: {
        title: string
        category: string
        date: string
        banner: string
        author: string
        language: string
        languages: {
          en: boolean
          ja: boolean
        }
        medium: string
      }
    }
  }
  location: any
}

const Post = ({
  pageContext: { slug },
  data: { markdownRemark: postNode },
  location,
}: Props) => {
  const post = postNode.frontmatter
  const twitterDicuss = `https://twitter.com/search?q=exodevhub.com${slug}&src=typd`
  const MediumClap = post.medium ? (
    <Clap target="_blank" href={post.medium}>
      Clap on Medium
    </Clap>
  ) : (
    undefined
  )

  return (
    <Layout>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <Header location={location} />
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
          <div>
            <Author>{post.author}</Author>
            <Discuss target="_blank" href={twitterDicuss}>
              Discuss on twitter
            </Discuss>
            {MediumClap}
          </div>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <Discuss target="_blank" href={twitterDicuss}>
            Discuss on twitter
          </Discuss>
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { type: { eq: "post" } }
    ) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        category
        author
        banner
        medium
        language
        languages {
          en
          ja
        }
      }
      timeToRead
    }
  }
`
