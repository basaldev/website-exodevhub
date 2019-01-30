import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  margin: 6rem auto 0 auto;
  a {
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
  }
  justify-items: center;
`

const Prev = styled.div`
  span {
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.grey.light};
  }
`

const Next = styled.div`
  margin-left: auto;
  text-align: right;
  span {
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.grey.light};
  }
`

interface Props {
  next: object | null
  prev: object | null
}

const PrevNext = ({ next = null, prev = null }: Props) => (
  <Wrapper>
    {prev && (
      <Prev>
        <span>Previous</span>
        <Link to={prev.fields.slug}>{prev.frontmatter.title}</Link>
      </Prev>
    )}

    {next && (
      <Next>
        <span>Next</span>
        <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
      </Next>
    )}
  </Wrapper>
)

export default PrevNext
