import styled from "styled-components";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import MainAudioPlayer from "../component/main/MainAudioPlayer";
import MainPostList from "../component/main/MainPostList";
const MainPage = () => {

  return (
    <Flex direction="column" justify="flex-start" hg="100vh" gap="0">
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
