import React from 'react'
// import { graphql } from 'gatsby'

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        image: string
        name: string
        position: string
        bio: string
        twitter: string
        github: string
      }
    }
  }
}

const Person = ({ data: { markdownRemark } }: Props) => {
  const person = markdownRemark.frontmatter

  return <div>Todo</div>
}

export default Person

// export const personQuery = graphql``
