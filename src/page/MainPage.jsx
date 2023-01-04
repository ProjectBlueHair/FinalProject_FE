import React, { Children } from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainMusicBar from "../component/main/MainMusicBar";
import MainPostList from "../component/main/MainPostList";
const MainPage = () => {
  return (
    <Flex type="columnStart" hg="100vh">
      {/* <Flex type="columnStart" flex="1" pd="1.5rem 2rem" gap='3rem'> */}
      <MainContainer>
        <Header />
        <MainPostList/>
        </MainContainer>
      {/* </Flex> */}
      <MainMusicBar />
    </Flex>
  );
};

export default MainPage;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
  padding: 1.5rem 2rem 0;
  gap: 3rem;


`;
