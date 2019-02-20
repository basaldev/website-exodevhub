import React from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import { filter } from 'lodash'

import {
  Layout,
  Header,
  Article,
  Wrapper,
  Button,
  SectionTitle,
  LinkHeader,
  Person,
  SignUpCommunity,
  SEO,
} from '../components'
import { media } from '../utils/media'
import { designSystem } from '../utils/designSystem';
import { getLanguage, setLanguage } from '../utils/language';
import { CONTENT_STRINGS } from '../utils/content-strings';
import LanguageSwitcher from '../components/LanguageSwitcher';
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

function randomWhite(text:string){
  const min = 0;
  const max = text.length;
  const rand = Math.floor(Math.random() * (+max - +min))
  return text.substring(rand, rand+1);
}

interface Props {
  data: {
    allMarkdownRemark: {
      group: any[]
    }
  }
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}: Props) => {
  let posts: Array<{ node: any }> = [];
  let people: Array<{ node: any }> = [];
  let selectedLanguage: string = getLanguage();
  group.forEach(postType => {
    switch (postType.edges[0].node.frontmatter.type) {
      case 'post':
        posts = filter(postType.edges, o => o.node.frontmatter.language === selectedLanguage);
        break;
      case 'person':
        people = postType.edges;
        break
    }
  })
  return (
    <Layout>
      <SEO />
      <Wrapper>
        <Header />
        <Content>
          <LinkHeader text={`${CONTENT_STRINGS.index[selectedLanguage].writing.title}`} white={`${randomWhite(CONTENT_STRINGS.index[selectedLanguage].writing.title)}`}>
            <Button to="/categories">{`${CONTENT_STRINGS.index[selectedLanguage].writing.button}`}</Button>
          </LinkHeader>
          <LanguageSwitcher languages={{
            en: true,
            ja: true
          }}
          onClick={(langKey) => {
            setLanguage(langKey);
            navigate('/');
          }}
          selectedLanguage={selectedLanguage} />
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
          <Section>
            <SectionTitle text={`${CONTENT_STRINGS.index[selectedLanguage].community.title}`} white={`${randomWhite(CONTENT_STRINGS.index[selectedLanguage].community.title)}`} />
            <PeopleWrapper>
              {people.map(post => (
                <Person
                  {...post.node.frontmatter }
                  slug={post.node.fields.slug}
                  key={post.node.fields.slug}
                />
              ))}
              <SignUpCommunity contentStrings={CONTENT_STRINGS.index[selectedLanguage].community.discord} />
            </PeopleWrapper>
          </Section>

          <Section>
          <SectionTitle text={`${CONTENT_STRINGS.index[selectedLanguage].about.title}`} white={`${randomWhite(CONTENT_STRINGS.index[selectedLanguage].about.title)}`} />
          {CONTENT_STRINGS.index[selectedLanguage].about.content.map((para, index) => {
            return <p key={index} dangerouslySetInnerHTML={{ __html: para}} />
          })}
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
