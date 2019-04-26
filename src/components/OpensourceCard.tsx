import React from 'react'
import { Grid, Card, CardContent, CardActions, Chip } from '@material-ui/core';
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

const Icon = styled(AntdIcon)`
  fill: #fff;
  vertical-align: middle;
`;

const _Card = styled(Card)`
  width: 100%;
  border-radius: 0;
  border: 3px solid black;
  box-shadow: none;
`;

const _CardContent = styled(CardContent)`
  padding: 24px 24px 12px;
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
  cursor: pointer;

  @media ${media.tablet} {
    font-size: 3vw;
  }

  @media ${media.phone} {
    font-size: 8vw;
  }
`;

const _Chip = styled(Chip)`
  margin: 0 0.6em 0.6em 0;
  padding: ${designSystem.spacing(1)};
  border-radius: 0;
  color: #fff;
  font-family: ${designSystem.get(`type.fontFamily.mono`)};
  font-size: ${designSystem.fontSize('xs')}px;
  background-color: ${designSystem.color('blue')};
`;

const TagsGrid = styled(Grid)`
  flex-wrap: nowrap;
  overflow: auto;
`;

const TagGridContainer = styled.div`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
`;

const StatGrid = styled(Grid)`
  padding: 0 18px;
  line-height: 1;
`;

const _CardActions = styled(CardActions)`
  background: #000;
`;

const Count = styled.a`
  padding: 0 1em;
  color: ${designSystem.color('white')};
  font-size: 0.9em;
  &:hover {
    color: ${designSystem.color('yellow')};
  }
`;

export default function OpensourceCard({ title, description, tags, repo, stars, forks }: Props) {
  return (
    <_Card>
      <_CardContent>
        <Title href={repo} target="_blank">{title}</Title>
        <Description>{description}</Description>
        <TagGridContainer>
          <TagsGrid container>
            {tags.map(tag =>
              <Grid item key={tag}>
                <_Chip label={tag} />
              </Grid>
            )}
          </TagsGrid>
        </TagGridContainer>
      </_CardContent>
      <_CardActions>
        <StatGrid container>
          <Grid item>
            <Icon type={StarFill} /><Count href={repo} target="_blank">{stars}</Count>
          </Grid>
          <Grid item>
            <Icon type={ForkOutline} /><Count href={repo} target="_blank">{forks}</Count>
          </Grid>
        </StatGrid>
      </_CardActions>
    </_Card>
  );
}