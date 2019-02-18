import React from 'react'
import styled from 'styled-components'
import { designSystem } from '../utils/designSystem'
import { Link } from 'gatsby'

interface Props {
  languages: {
    en: string
    ja: string
  }
  selectedLanguage: string
}

const Wrapper = styled.div`
  margin-bottom: ${designSystem.spacing(2)};
`

const LanguageSwitch = styled(Link)`
  margin-right: ${designSystem.spacing(2)};
  color: ${designSystem.color('white', 'darker')};
  &.active {
    border-bottom: 2px dashed;
    font-weight: bold;
    color: ${designSystem.color('blue')};
  }
`

const LanguageSwitcher = function({ selectedLanguage, languages }: Props) {
  if (languages === null) {
    return null
  }
  return (
    <Wrapper>
      {Object.keys(languages).map((langKey: string) => {
        return (
          <LanguageSwitch
            className={selectedLanguage === langKey ? 'active' : ''}
            to={languages[langKey]}
          >
            {langKey}
          </LanguageSwitch>
        )
      })}
    </Wrapper>
  )
  debugger
}

export default LanguageSwitcher
