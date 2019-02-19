import React from 'react'
import styled from 'styled-components';
import { designSystem } from '../utils/designSystem';
import { Link } from 'gatsby';
interface Props {
  languages: {
    en: string;
    ja: string;
  };
  selectedLanguage: string
}
const Wrapper = styled.div`
margin-bottom: ${designSystem.spacing(2)};
`
const LanguageSwitch = styled.span`
  margin-right: ${designSystem.spacing(2)};
  color: ${designSystem.color("white", 'darker')};
  cursor: pointer;
  &.active {
    border-bottom: 2px dashed;
    font-weight:bold;
    color: ${designSystem.color("blue")};
  }
`

const LanguageSwitcher = function({ selectedLanguage, languages, onClick }: Props) {
  if(languages === null){
    return null
  }
  return (
    <Wrapper>
    {Object.keys(languages).map((langKey:string) => {
          return <LanguageSwitch
                    key={langKey}
                    className={selectedLanguage === langKey ? 'active' : ''}
                    onClick={(e) => onClick(langKey, e)} >{langKey}</LanguageSwitch>
        })}
    </Wrapper>
  )
}

export default LanguageSwitcher
