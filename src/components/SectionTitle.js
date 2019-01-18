import styled from 'styled-components';
import React from 'react';
import { indexOf } from 'lodash';

const SectionTitle = ({ text, white }) => {
  const title = text.split("");
  const index = indexOf(title, white);
  return (<h1>{title.splice(0,index)}<span class="white">{white}</span>{title.splice(1, index)}</h1>);
};

export default SectionTitle;
