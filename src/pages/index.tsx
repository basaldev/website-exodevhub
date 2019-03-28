import React, { useState } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import { filter } from 'lodash';
import { Grid, Hidden } from '@material-ui/core';
import 'katex/dist/katex.min.css'
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
import { designSystem } from '../utils/designSystem';
import { getLanguage, setLanguage } from '../utils/language';
import { CONTENT_STRINGS } from '../utils/content-strings';
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

function randomWhite(text:string){
  const min = 0;
  const max = text.length;
  const rand = Math.floor(Math.random() * (+max - +min))
  return text.substring(rand, rand+1);
}

const AboutSection = styled.div`
    @media ${media.sm} {
  background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.9) 100%), ${props => `url(${props.background})`};
  background-size: contain;
  background-repeat:no-repeat;
  background-position:top;
  }
`

interface Props {
  data: {
    allMarkdownRemark: {
      group: any[]
    }
  }
  location:any
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { group },
  },
  location
}: Props) => {
  let posts: Array<{ node: any }> = [];
  let people: Array<{ node: any }> = [];

  let selectedLanguage: string = getLanguage();
  if(typeof window !== "undefined"){
  if(window.location.search === "?lang=ja"){
      selectedLanguage = 'ja';
      setLanguage('ja');
      window.location.href = '/'
    };
  }
  const wordings =  (CONTENT_STRINGS.index as any)[selectedLanguage];
  group.forEach(postType => {
    switch (postType.edges[0].node.frontmatter.type) {
      case 'post':
        posts = filter(postType.edges, o => o.node.frontmatter.language === selectedLanguage);
        break;
      case 'person':
        people = postType.edges;
        break
    }
  });
  const [expandedCard, setExpandedCard] = useState(false);
  const updateExpandedCard = () => setExpandedCard(!expandedCard);
  return (
    <Layout>
      <SEO />
      <Wrapper>
        <Header location={location} />
        <Content>
        <AboutSection id="about" background={wordings.about.image}>
          <Grid container justify="space-between" >
          <Grid item xs={12} md={6} >
          <h1>{wordings.about.title}</h1>

          {wordings.about.content.map((para: string, index: number) => {
            return <p key={index+para} dangerouslySetInnerHTML={{ __html: para}} />
          })}
          <ClientList container>
          <Grid item xs={12} md={5}><ClientListHeader>Recent Clients:</ClientListHeader></Grid>
          {wordings.clients.content.map((client: {name:string, logo:string}, index: number) => {
            return <ClientLogo item md={3} key={index+client.logo}><img src={client.logo} alt={client.logo}  /></ClientLogo>
          })}
          </ClientList>
          </Grid>
          <Hidden smDown={true}>
          <Grid item xs={6}>
          <Grid container justify="flex-end">
          <Grid item>
            <img style={{width:`600px`, padding: designSystem.spacing(2)}} src={wordings.about.image} alt="about exodev"/>
          </Grid>
          </Grid>
          </Grid>
          </Hidden>
          </Grid>
          <Section id="services">
            <SectionTitle text={`${wordings.services.title}`} />
            <Grid container spacing={32} alignItems="stretch">
            {wordings.services.content.map((service: {title:string }, index: number) => {
            return <Grid item md={6}><ServiceCard expanded={expandedCard} handleExpand={updateExpandedCard} key={index+service.title} {...service} /></Grid>
          })}
          </Grid>
          </Section>
          </AboutSection>
          <Section  id="team">
            <SectionTitle text={`${wordings.community.title}`} />
            <PeopleWrapper>
              {people.map(post => (
                <Person
                  {...post.node.frontmatter }
                  slug={post.node.fields.slug}
                  key={post.node.fields.slug}
                />
              ))}
              <SignUpCommunity contentStrings={wordings.community.discord} />
            </PeopleWrapper>
          </Section>
          <Section id="blog">
          <LinkHeader text={`${wordings.writing.title}`} white={`${randomWhite(wordings.writing.title)}`}>
            <Button to="/categories">{`${wordings.writing.button}`}</Button>
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

export default IndexPage

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
