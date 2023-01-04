import React, { Children } from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainMusicBar from "../component/main/MainMusicBar";
import MainPostList from "../component/main/MainPostList";
const MainPage = () => {
  return (
    <Flex type="columnStart" hg="100vh">
      <Flex type="columnStart" flex="1" pd="1rem 2rem">
        <Header />
        <MainPostList/>
      </Flex>
      <MainMusicBar />
    </Flex>
  );
};

export default MainPage;

const MainContainer = styled.div``;
