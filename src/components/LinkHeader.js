import styled from 'styled-components';
import React from 'react';
import { lastIndexOf } from 'lodash';

const SectionTitle = ({ text, white }) => {
  const title = text.split("");
  const index = lastIndexOf(title, white);
  return (<h1>{title.splice(0,index)}<span className="white">{white}</span>{title.splice(1,index)}</h1>);
};

export default SectionTitle;
