import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import {
  Layout,
  Header,
  Article,
  Wrapper,
  Button,
  SectionTitle,
  LinkHeader,
} from '../components'
import { media } from '../utils/media'

const Content = styled.div`
  grid-column: 2;
  overflow: hidden;
  width: 70vw;
  margin: 0 auto;
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: auto;
  }
`

const ArticleWrapper = styled.div`
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media ${media.tablet} {
    flex-direction: column;
    width: auto;
  }
  @media ${media.phone} {
    flex-direction: column;
    width: auto;
  }
`

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 0 6rem 0;
  margin: 0 auto;
  width: 70vw;
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: auto;
  }
  h1 {
    @media ${media.phone} {
      font-size: 10vw;
    }
  }
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
`

interface Props {
  data: {
    allMarkdownRemark: {
      edges: any[]
    }
  }
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}: Props) => (
  <Layout>
    <Wrapper>
      <Header />
      <Content>
        <LinkHeader text={'writings'} white="g">
          <Button to="/categories">all categories</Button>
        </LinkHeader>
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
        <SectionTitle text="about" white="o" />
        <p>
          ExoDevHub provides businesses with the software tools and mindset
          necessary to transform themselves into exponential organizations.
        </p>
        <p>
          An <a href="https://exponentialorgs.com/">exponential organization</a>{' '}
          is a new breed of business proven to be capable of unlocking the
          abundance provided by emerging technologies and readily adaptable to a
          rapidly changing business environment. The term “exponential
          organization” has been coined for organizations whose impact (or
          output) is disproportionately large—at least 10x as large—compared to
          its peers because of the use of new organization techniques that
          leverage accelerating technologies.
        </p>
        <p>
          Regardless of whether your current organization is an industry leader
          or a smaller player, it must transform itself if it is to thrive in
          the face of industry disruption from unexpected external sources. New
          players should build agility in from the start.{' '}
          <a href="https://www.openexo.com/">OpenExO</a> will guide you through
          the process of transforming your business into an exponential one, and{' '}
          <strong>ExoDevHub</strong> will assist you with cutting-edge technical
          solutions.
        </p>
      </Hero>
    </Wrapper>
  </Layout>
)

export default IndexPage

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
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
`
