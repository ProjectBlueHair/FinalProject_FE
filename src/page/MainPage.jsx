import React from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainMusicBar from "../component/main/MainMusicBar";
const MainPage = () => {
  return (
    <Flex type="columnStart" hg='100vh'>
      <Header />
      <MainContainer>main</MainContainer>
      <MainMusicBar />
    </Flex>
  );
};

export default MainPage;

const MainContainer = styled.div`
  flex: 1;
`;
