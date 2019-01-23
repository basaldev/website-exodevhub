import styled from 'styled-components';
import React from 'react';
import { lastIndexOf } from 'lodash';

const SectionTitle = ({ text, white }) => {
  const title = text.split("");
  const index = lastIndexOf(title, white);
  const start = Object.assign([], title.splice(0,index));
  title.splice(0,1); //the white
  return (<h1>{start}<span className="white">{white}</span>{title}</h1>);
};

export default SectionTitle;
