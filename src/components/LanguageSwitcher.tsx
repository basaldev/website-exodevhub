import React from 'react'
import styled from 'styled-components'
import { IntlContextConsumer, Link } from 'gatsby-plugin-intl'

import { designSystem } from '../utils/designSystem'
import { media } from '../utils/media'

const Wrapper = styled.div`
  margin-bottom: ${designSystem.spacing(2)};
  @media ${media.phone} {
    position: absolute;
    z-index: 9;
    top: ${designSystem.spacing(1)};
    right: ${designSystem.spacing(1)};
  }
`

const LanguageSwitch = styled(Link)`
  margin-right: ${designSystem.spacing(2)};
  color: ${designSystem.color('white', 'darker')};
  cursor: pointer;
  &.active {
    border-bottom: 2px dashed;
    font-weight: bold;
    color: ${designSystem.color('blue')};
  }
`

interface IProps {
  selectedLanguage: string
}

interface IntlContextConsumerProps {
  languages: string[]
  originalPath: string
}

const LanguageSwitcher = ({ selectedLanguage }: IProps) => {
  return (
    <IntlContextConsumer>
      {({ languages, originalPath }: IntlContextConsumerProps) => {
        return (
          <Wrapper>
            {languages.map(language => {
              return (
                <LanguageSwitch
                  id={`lang-${language}`}
                  key={language}
                  language={language}
                  to={originalPath}
                  className={selectedLanguage === language ? 'active' : ''}
                >
                  {language}
                </LanguageSwitch>
              )
            })}
          </Wrapper>
        )
      }}
    </IntlContextConsumer>
  )
}

export default LanguageSwitcher
