import React, { ReactNode } from 'react'

interface Props {
  text: ReactNode | string
}

const SectionTitle = ({ text }: Props) => {
  return <h1>{text}</h1>
}

export default SectionTitle
