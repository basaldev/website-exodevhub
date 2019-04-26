import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Wrapper, Header, SEO, TechLogo } from '../components'
import { media } from '../utils/media';
import config from '../../config/SiteConfig'
import '../utils/prismjs-theme.css'
import { designSystem } from '../utils/designSystem'
import { Grid, Hidden } from '@material-ui/core';
import Slider from "react-slick";


const Content = styled.article`
  grid-column: 2;
  overflow: hidden;
  padding: 1rem 0rem;
  z-index: 9000;
  position:relative;
  max-width: 55vw;
  margin: 0 auto;
  @media ${media.smallLaptop} {
    max-width: 75vw;
  }
  @media ${media.tablet} {
    max-width: 75vw;
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
const GridContainer = styled('div')`
  min-width: 55vw;
  @media ${media.tablet} {
    min-width: 65vw;
  }
`

const ClientLogo = styled(Grid)`
  padding: 0 0 0 ${designSystem.spacing(1)};
  img {
    max-width: 100%;
    height: 40px;
    @media ${media.tablet} {
      height: auto;
      max-height: 60px;
    }
    @media (min-width: 960px) {
      height: auto;
      max-height: 60px;
    }
  }
`
const ClientList = styled(Grid)`
  padding-top: ${designSystem.spacing(2)};
  display:flex;
  justify-content:flex-start;
`
const ClientListHeader = styled.h3`
line-height: 50px;
  @media ${media.tablet} {
      font-size: ${designSystem.fs('sm')}px;
    }
  @media ${media.smallLaptop} {
      font-size: ${designSystem.fs('sm')}px;
  }
`
const Slide = styled('div')`
padding: ${designSystem.spacing(1)};
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
        name: string
        technology: string[];
        programinglanguage: string;
        platform: string;
        images: string[];
        status: string;
      }
    }
  },
  location: any
}
const settings = {
  dots: false,
  arrows:false,
  autoplay:true,
  infinite: true,
  speed: 700,
  slidesToShow: 2,
  slidesToScroll: 2
};

const product = ({
  pageContext: { slug },
  data: { markdownRemark: productNode },
  location,
}: Props) => {
  const product = productNode.frontmatter
  return (
    <Layout>
      <Wrapper>
        <SEO productPath={slug} productNode={productNode} productSEO />
        <Helmet title={`${product.name} | ${config.siteTitle}`} />
        <Header location={location} />
        <Content>
          <GridContainer>
            <Grid container justify="space-between" >
              <Grid item xs={12} lg={6} >
                <h1>{product.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: productNode.html }} />
                <ClientList container>
                  <Grid item xs={12} md={12}><ClientListHeader>Technology used</ClientListHeader></Grid>
                  {product.technology.map((name: string, index: number) => {
                    return <ClientLogo item key={index + name}><TechLogo name={name} /></ClientLogo>
                  })}
                </ClientList>
              </Grid>
              <Grid item xs={12} lg={6} >
                <Slider {...settings}>
                  {product.images.map(src =>  <Slide key={src}><img src={src} ></img></Slide>)}
                </Slider>
              </Grid>
            </Grid>
          </GridContainer>
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default product

export const productQuery = graphql`
  query productBySlug($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { posttype: { eq: "product" } }
    ) {
      frontmatter {
        name
        programinglanguage
        platform
        technology
        images
        status
      }
      excerpt
      html
    }
  }
`
