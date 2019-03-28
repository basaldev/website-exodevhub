import React from 'react';
import styled from 'styled-components';
import { designSystem } from '../utils/designSystem';
import { Language } from '../utils/language';
import { media } from '../utils/media'

interface Props {
  languages: {
    en: boolean
    ja: boolean
  };
  selectedLanguage: string;
  onClick: (langKey: Language, e: any) => void;
}

const Wrapper = styled.div`
  margin-bottom: ${designSystem.spacing(2)};
  @media ${media.phone} {
    position:absolute;
    z-index: 9;
    top: ${designSystem.spacing(1)};
    right: ${designSystem.spacing(1)};
  }
`

const LanguageSwitch = styled.span`
  margin-right: ${designSystem.spacing(2)};
  color: ${designSystem.color('white', 'darker')};
  cursor: pointer;
  &.active {
    border-bottom: 2px dashed;
    font-weight: bold;
    color: ${designSystem.color('blue')};
  }


`

const LanguageSwitcher = function({ selectedLanguage, languages, onClick }: Props) {
  if (languages === null) {
    return null
  }
  return (
    <Wrapper>
      {Object.keys(languages).map((langKey: Language) => {
        return (
          <LanguageSwitch
            key={langKey}
            className={selectedLanguage === langKey ? 'active' : ''}
            onClick={(e: any) => onClick(langKey, e)}
          >
            {langKey}
          </LanguageSwitch>
        );
      })}
    </Wrapper>
  )
}

export default LanguageSwitcher
