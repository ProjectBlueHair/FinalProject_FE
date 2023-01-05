import React from "react";
import styled from "styled-components";
import Img from "../elem/Img";
import { mockData, mockText } from "./MockData";
import Flex from "../elem/Flex";
import { like, playButton, view } from "../../asset/pic";
const MainPostList = () => {
  const profile_margin='0 0 0 -1rem'
  return (
    <Grid>
      {mockData().map((obj) => (
        // <GridWrapper>
        <Flex direction="column" align="flex-start" gap='1rem'>
          <Img hg="20rem" type="radius" src={obj.postImg} />
          <Flex direction="row" justify="flex-start" gap='1rem'>
            <Img mg='1rem' wd="15%" src={playButton} />
            <Flex flex="1" direction="column" align="flex-start" gap="1rem">
              <div>{obj.title}</div>
              <GridWrapper>
                <Flex align='center' justify='flex-start'>
                  <Img
                    z="3"
                    type="shadowProfile"
                    wd="3rem"
                    src={obj.collabo[0].profile}
                  />
                  <Img
                    z="2"
                    type="shadowProfile"
                    wd="3rem"
                    mg={profile_margin}
                    src={obj.collabo[1].profile}
                  />
                  <Img
                    z="1"
                    type="shadowProfile"
                    wd="3rem"
                    mg={profile_margin}
                    src={obj.collabo[2].profile}
                  />
                </Flex>
                <Flex justify='flex-start' gap='0.5rem'>
                  <Img wd='1.8rem' src={view} />
                  <span style={{color:'var(--ec-secondary-text', fontSize:'1.2rem'}}>{obj.view}</span>
                </Flex>
                <Flex justify='flex-start' gap='0.5rem'>
                  <Img wd='1.5rem' src={like} />
                  <span style={{color:'var(--ec-secondary-text', fontSize:'1.2rem'}}>{obj.like}</span>
                </Flex>
              </GridWrapper>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Grid>
  );
};

export default MainPostList;
const Grid = styled.div`
  overflow-y: scroll;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  padding: 0 0 2rem;
`;
const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1.5fr 1fr 1fr;
`;
