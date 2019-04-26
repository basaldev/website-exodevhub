import React from 'react'
import { Grid, Card, CardContent, Chip } from '@material-ui/core';
import AntdIcon from '@ant-design/icons-react';
import { StarFill, ForkOutline } from '@ant-design/icons';
import styled from 'styled-components';
import { designSystem } from '../utils/designSystem';
import { media } from '../utils/media';

AntdIcon.add(StarFill, ForkOutline);

interface Props {
  title: string;
  description: string;
  tags: string[];
  repo: string;
  stars: number;
  forks: number;
}

const _Card = styled(Card)`
  width: 100%;
  border-radius: 0;
  border: 3px solid black;
  box-shadow: none;
`;

const _CardContent = styled(CardContent)`
  padding: 24px;
`;

const Description = styled.p`
  && {
    margin-top: 0;
    height: 3.5em;
    margin-bottom: 0.5em;
  
    @media ${media.sm} {
      height: auto;
    }
  }
`;

const Title = styled.a`
  display: block;
  font-family: 'Big John Pro',sans-serif;
  font-size: ${designSystem.fs('l')}px;
  color: #000;
  text-transform: uppercase;
  word-break: break-word;

  @media ${media.tablet} {
    font-size: 3vw;
  }

  @media ${media.phone} {
    font-size: 8vw;
  }
`;

const _Chip = styled(Chip)`
  margin: 0 0.6em 0.6em 0;
  vertical-align: top;
  border-radius: 3px;
`;

const Count = styled.a`
  padding: 0 1em;
  color: #000;
  vertical-align: top;
  font-size: 0.9em;
`;

export default function OpensourceCard({ title, description, tags, repo, stars, forks }: Props) {
  return (
    <_Card>
      <_CardContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Grid container>
          {tags.map(tag =>
            <Grid item key={tag}>
              <_Chip variant="outlined" label={tag} />
            </Grid>
          )}
        </Grid>
        <Grid container>
          <Grid item>
            <AntdIcon type={StarFill} /><Count href={repo} target="_blank">{stars}</Count>
          </Grid>
          <Grid item>
            <AntdIcon type={ForkOutline} /><Count href={repo} target="_blank">{forks}</Count>
          </Grid>
        </Grid>
      </_CardContent>
    </_Card>
  );
}

