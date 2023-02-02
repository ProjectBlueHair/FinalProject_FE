import React, { useEffect } from "react";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import styled from "styled-components";
import MainPostList from "../component/main/MainPostList";
import MainAudioPlayer from "../component/main/MainAudioPlayer";
import { useDispatch } from "react-redux";
import { __cleanUp } from "../redux/slice/postingSlice";
import { __mainCleanUp } from "../redux/slice/mainSlice";
import ErrorCheck from "../util/ErrorCheck";
const MainPage = () => {

  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
      {/* header, main 패딩 같아서 main container 로 감싸줌 */}
      <ErrorCheck/>
      <Header />
      <MainContainer>
        <MainPostList />
      </MainContainer>
      <MainAudioPlayer />
    </Flex>
  );
};

export default MainPage;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
  padding: 0 2rem;
`;
