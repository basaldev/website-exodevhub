import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import { Layout, Wrapper, Header, LinkHeader, Button, SEO } from '../components'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import { designSystem } from '../utils/designSystem'

const Content = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  z-index: 9000;
  width: 70vw;
  margin: 0 auto;
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: auto;
  }
`

const Title = styled.span`
  position: relative;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${designSystem.fs('l')}px;
  clear: both;
  width: 100%;
  display: block;
`

interface Props {
  data: {
    allMarkdownRemark: {
      group: any[]
    }
  }
}

const Category = ({
  data: {
    allMarkdownRemark: { group },
  },
}: Props) => {
  const seoNode = {
    frontmatter: {
      title: `Categories | ${config.siteTitle}`
    }
  }
  return (
  <Layout>
    <SEO postPath={`/categories`} postNode={seoNode} postSEO />
    <Wrapper>
      <Helmet title={seoNode.frontmatter.title} />
      <Header />
      <Content>
        <LinkHeader text={'Categories'} white="o">
        </LinkHeader>
        {group.map(category => (
          <Title key={category.fieldValue}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}`}>
              #{category.fieldValue}
            </Link>{' '}
            ({category.totalCount})
          </Title>
        ))}
      </Content>
    </Wrapper>
  </Layout>
)}

export default Category

export const postQuery = graphql`
  query CategoriesPage {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
