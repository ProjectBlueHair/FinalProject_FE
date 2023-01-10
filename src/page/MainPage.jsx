import React from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainPostList from "../component/main/MainPostList";
import MainAudioPlayer from "../component/main/MainAudioPlayer";
const MainPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
      {/* header, main 패딩 같아서 main container 로 감싸줌 */}
      <MainContainer>
        <Header />
        <MainPostList />
      </MainContainer>
      <MainAudioPlayer />
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
