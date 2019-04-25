import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Wrapper, Header } from '../components'
import { media } from '../utils/media'
import '../utils/prismjs-theme.css'

const Content = styled.article`
  grid-column: 2;
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

interface Props {
  pageContext?: {
    slug: string
  }
  data: {
    markdownRemark: {
      frontmatter: {
        fullName: string
      }
    }
  },
  location:any
}

const Person = ({
  data: {
    markdownRemark: { frontmatter },
  },
  location
}: Props) => {
  const person = frontmatter
  return (
    <Layout>
      <Wrapper>
        <Header location={location} />
        <Content>{person.fullName}</Content>
      </Wrapper>
    </Layout>
  )
}

export default Person

export const postQuery = graphql`
  query PersonPage($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { posttype: { eq: "person" } }
    ) {
      frontmatter {
        fullName
      }
    }
  }
`
