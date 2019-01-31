import React from 'react'
import { lastIndexOf } from 'lodash'

interface Props {
  text: string
  white: string
}

const SectionTitle = ({ text, white }: Props) => {
  const title = text.split('')
  const index = lastIndexOf(title, white)
  const start = Object.assign([], title.splice(0, index))
  title.splice(0, 1) // the white
  return (
    <h1>
      {start}
      <span className="white">{white}</span>
      {title}
    </h1>
  )
}

export default SectionTitle
