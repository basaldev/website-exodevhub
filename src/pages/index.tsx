import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import {
  Layout,
  Header,
  Article,
  Wrapper,
  Button,
  SectionTitle,
  LinkHeader,
  Person,
  DiscordWidget
} from '../components'
import { media } from '../utils/media'
import { designSystem } from '../utils/designSystem'
const discordLink = `https://discord.gg/kYn4NjR`;
const Content = styled.div`
  grid-column: 2;
  // overflow: hidden;
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
const PeopleWrapper = styled.div`
  grid-column: 4;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(6, 1fr);
  @media ${media.tablet} {
    grid-template-columns: repeat(4, 1fr);

  }
  @media ${media.phone} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 0 6rem 0;
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
const SignUpCommunity = styled.div`
  grid-column: auto;
  grid-row: auto;
  clear: both;
  width: 100%;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  border: ${designSystem.get('border.width')}px solid;
  margin-right: ${designSystem.spacing(4)};
  background: url(${designSystem.color('grid')});
  background-repeat:repeat;
  background-size: 19px;
  position: relative;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & a {
    overflow:hidden;
    width: 80%;
    background: ${designSystem.color('black')};
    color: ${designSystem.color('white')};
    text-align:center;
    padding: ${designSystem.spacing(1)};
    &:hover {
      color: ${designSystem.color('blue')};
    }
  }
  `

interface Props {
  data: {
    allMarkdownRemark: {
      group: any[]
    }
  }
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { group }
  },
}: Props) => {
  let posts:Array<{node:any}> = [];
  let people: Array<{node:any}> = [];
  group.forEach(postType => {
    switch (postType.edges[0].node.frontmatter.type) {
      case 'post':
        posts = postType.edges;
        break;
      case 'person':
        people = postType.edges;
        break;
    }
  })
  return (
    <Layout>
      <Wrapper>
        <Header />
        <Content>
          <LinkHeader text={'writings'} white="g">
            <Button to="/categories">all categories</Button>
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
        </Content>
        <Content>
          <SectionTitle text={'community'} white="u" />
          <PeopleWrapper>
          {people.map(post => (
            <Person
              {...post.node.frontmatter }
              slug={post.node.slug}
              key={post.node.slug}
            />
          ))}
          <SignUpCommunity >
            <a href={discordLink}>Join the community</a>
            <DiscordWidget />
          </SignUpCommunity>
          </PeopleWrapper>
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
        </Content>

      </Wrapper>
    </Layout>
  )}

export default IndexPage

export const IndexQuery = graphql`
  query IndexQuery {
  allMarkdownRemark(sort:{fields:frontmatter___type, order: DESC}) {
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
            }
          	timeToRead
          }
        }
      }
    }
  }
`
