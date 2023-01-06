import React, { Children } from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainMusicBar from "../component/main/MainMusicBar";
import MainPostList from "../component/main/MainPostList";
const MainPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
      <MainContainer>
        <Header />
        <MainPostList />
      </MainContainer>
      {/* <MusicBarContainer>
        <MusicBar />
      </MusicBarContainer> */}
      <MainMusicBar />
    </Flex>
  );
};

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
  padding: 0 2rem;
`;
// const MusicBar = styled.div`
//   margin-left: 0;
//   width: 50%;
//   z-index: 2;
//   margin-bottom: -0.1rem;
//   border: 1px solid var(--ec-main-color);
// `;
// const MusicBarContainer = styled.div`
//   background-color: var(--ec-secondary-text);
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
// `;
