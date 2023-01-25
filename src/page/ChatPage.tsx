import React from "react";
import styled from "styled-components";
import ChatRoom from "../component/chat/ChatRoom";
import ChatRoomList from "../component/chat/ChatRoomList";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import MainAudioPlayer from "../component/main/MainAudioPlayer";

const ChatPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh">
      <Header />
      <ChatGrid>
        <ChatRoomList />
        <ChatRoom />
      </ChatGrid>
      <MainAudioPlayer/>
    </Flex>
  );
};

export default ChatPage;
const ChatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  padding: 0 2rem 2rem;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;
