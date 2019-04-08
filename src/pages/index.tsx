import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { filter } from 'lodash'
import { Grid, Hidden } from '@material-ui/core'
import 'katex/dist/katex.min.css'
import { FormattedMessage, withIntl } from 'gatsby-plugin-intl'

import {
  Layout,
  Header,
  Article,
  Wrapper,
  Button,
  SectionTitle,
  LinkHeader,
  ServiceCard,
  Person,
  SignUpCommunity,
  SEO,
} from '../components'
import { media } from '../utils/media'
import { designSystem } from '../utils/designSystem'

const Content = styled.div`
  grid-column: 2;
  width: 70vw;
  margin: 0 auto;
  @media ${media.smallLaptop} {
    width: 80vw;
  }
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: 100%;
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
    padding-bottom: ${designSystem.spacing(4)};
    width: auto;
  }
`
const PeopleWrapper = styled.div`
  grid-column: 4;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(6, 1fr);

  @media ${media.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${media.phone} {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Section = styled.div`
  grid-column: 2;
  padding: ${designSystem.spacing(5)} 0 ${designSystem.spacing(5)};
  @media ${media.tablet} {
    width: auto;
  }
  @media ${media.phone} {
    width: auto;
    padding: ${designSystem.spacing(4)} 0 ${designSystem.spacing(4)};
  }
  h1 {
    @media ${media.phone} {
      font-size: 10vw;
      margin: ${designSystem.spacing(0)} 0 ${designSystem.spacing(3)};
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
const ClientLogo = styled(Grid)`
  padding: 0 0 0 ${designSystem.spacing(4)};
  opacity: 0.3;
  img {
    max-width: 100%;
    height: 40px;
    @media ${media.tablet} {
      height: auto;
      max-height: 40px;
    }
    @media (min-width: 960px) {
      height: auto;
      max-height: 40px;
    }
  }
`
const ClientList = styled(Grid)`
  padding-top: ${designSystem.spacing(2)};
  display: flex;
  justify-content: flex-start;
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

const AboutSection = styled.div`
  @media ${media.sm} {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.9) 100%
      ),
      ${props => `url(${props.background})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
  }
`

interface Props {
  data: {
    allMarkdownRemark: {
      group: any[]
    }
  }
  location: any
  intl: any // from `gatsby-plugin-intl`
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { group },
  },
  location,
  intl,
}: Props) => {
  let posts: Array<{ node: any }> = []
  let people: Array<{ node: any }> = []

  group.forEach(postType => {
    switch (postType.edges[0].node.frontmatter.type) {
      case 'post':
        posts = filter(
          postType.edges,
          o => o.node.frontmatter.language === intl.locale
        )
        break
      case 'person':
        people = postType.edges
        break
    }
  })

  const [expandedCard, setExpandedCard] = useState(false)
  const updateExpandedCard = () => setExpandedCard(!expandedCard)

  return (
    <Layout>
      <SEO />
      <Wrapper>
        <Header location={location} selectedLanguage={intl.locale} />
        <Content>
          <AboutSection id="about" background="/assets/about.png">
            <Grid container justify="space-between">
              <Grid item xs={12} md={6}>
                <h1>
                  <FormattedMessage id="index_about_title" />
                </h1>
                <p>
                  <FormattedMessage
                    id="index_about_content_para1"
                    values={{
                      link: (
                        <a href="https://exponentialorgs.com/">
                          exponential organizations
                        </a>
                      ),
                    }}
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="index_about_content_para2"
                    values={{
                      link: (
                        <a href="https://exponentialorgs.com/">
                          exponential organization
                        </a>
                      ),
                    }}
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="index_about_content_para3"
                    values={{
                      link: <a href="https://www.openexo.com/">OpenExO</a>,
                      emphasis: <strong>ExO Dev</strong>,
                    }}
                  />
                </p>
                <ClientList container>
                  <Grid item xs={12} md={5}>
                    <ClientListHeader>
                      <FormattedMessage id="index_clients_title" />
                    </ClientListHeader>
                  </Grid>
                  <ClientLogo item md={3}>
                    <img
                      src="/clients/boston-scientific.png"
                      alt="Boston Scientific"
                    />
                  </ClientLogo>
                  <ClientLogo item md={3}>
                    <img src="/clients/rakuten.svg" alt="Rakuten" />
                  </ClientLogo>
                </ClientList>
              </Grid>
              <Hidden smDown={true}>
                <Grid item xs={6}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <img
                        style={{
                          width: `600px`,
                          padding: designSystem.spacing(2),
                        }}
                        src="/assets/about.png"
                        alt="about exodev"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
            <Section id="services">
              <SectionTitle
                text={<FormattedMessage id="index_services_title" />}
              />
              <Grid container spacing={32} alignItems="stretch">
                <Grid item md={6}>
                  <ServiceCard
                    expanded={expandedCard}
                    handleExpand={updateExpandedCard}
                    color="green"
                    bg="/assets/scale.png"
                    mailto="mailto:contact@exodev.team?subject=Tell me about your [SCALE DEVELOPMENT] service"
                    title="SCALE DEVELOPMENT"
                    subtitle={
                      <FormattedMessage id="index_services_content_1_subtitle" />
                    }
                    excerpt={
                      <FormattedMessage id="index_services_content_1_excerpt" />
                    }
                    content={
                      <>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_1_para1_title" />
                          </b>
                          <br />
                          <FormattedMessage id="index_services_content_1_para1_body" />
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_1_para2_title" />
                          </b>
                          <br />
                          <FormattedMessage id="index_services_content_1_para2_body" />
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_1_para3_title" />
                          </b>
                          <br />
                          <FormattedMessage id="index_services_content_1_para3_body" />
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_1_para4_title" />
                          </b>
                          <br />
                          <FormattedMessage id="index_services_content_1_para4_body" />
                        </p>
                      </>
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <ServiceCard
                    expanded={expandedCard}
                    handleExpand={updateExpandedCard}
                    color="cornflower"
                    bg="/assets/sprint.png"
                    mailto="mailto:contact@exodev.team?subject=Tell me about your [EXODEV SPRINT] service"
                    title="EXODEV SPRINT"
                    subtitle={
                      <FormattedMessage id="index_services_content_2_subtitle" />
                    }
                    excerpt={
                      <FormattedMessage id="index_services_content_2_excerpt" />
                    }
                    content={
                      <>
                        <p>
                          <FormattedMessage id="index_services_content_2_para1_title" />
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_2_para2_numbering" />
                          </b>
                          <FormattedMessage id="index_services_content_2_para2_text" />{' '}
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_2_para3_numbering" />
                          </b>
                          <FormattedMessage id="index_services_content_2_para3_text" />{' '}
                        </p>
                        <p>
                          <FormattedMessage id="index_services_content_2_para4_text" />
                          <br />
                        </p>
                        <p>
                          <b>
                            <FormattedMessage id="index_services_content_2_para5_text_1" />
                          </b>
                          <br />
                          <b>
                            <FormattedMessage id="index_services_content_2_para5_text_2" />
                          </b>
                          <br />
                          <b>
                            <FormattedMessage id="index_services_content_2_para5_text_3" />
                          </b>
                          <br />
                        </p>
                      </>
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <ServiceCard
                    expanded={expandedCard}
                    handleExpand={updateExpandedCard}
                    color="amber"
                    bg="/assets/workshop.png"
                    mailto="mailto:contact@exodev.team?subject=Tell me about your [EXODEV WORKSHOP] service"
                    title="EXODEV WORKSHOP"
                    subtitle={
                      <FormattedMessage id="index_services_content_3_subtitle" />
                    }
                    excerpt={
                      <FormattedMessage id="index_services_content_3_excerpt" />
                    }
                  />
                </Grid>
              </Grid>
            </Section>
          </AboutSection>
          <Section id="team">
            <SectionTitle
              text={<FormattedMessage id="index_community_title" />}
            />
            <PeopleWrapper>
              {people.map(post => (
                <Person
                  {...post.node.frontmatter}
                  slug={post.node.fields.slug}
                  key={post.node.fields.slug}
                />
              ))}
              <SignUpCommunity />
            </PeopleWrapper>
          </Section>
          <Section id="blog">
            <LinkHeader text={<FormattedMessage id="index_writing_title" />}>
              <Button to="/categories">
                <FormattedMessage id="index_writing_button" />
              </Button>
            </LinkHeader>

            <ArticleWrapper>
              {posts.map(post => (
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
          </Section>
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default withIntl(IndexPage)

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: frontmatter___type, order: DESC }) {
      group(field: frontmatter___type) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD")
              category
              shape
              type
              fullName
              github
              twitter
              image
              language
            }
            timeToRead
          }
        }
      }
    }
  }
`
