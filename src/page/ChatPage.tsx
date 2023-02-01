import styled from "styled-components";
import ChatRoomList from "../component/chat/ChatRoomList";
import Flex, { StFlex } from "../component/elem/Flex";
import Header from "../component/header/Header";
import MainAudioPlayer from "../component/main/MainAudioPlayer";
import ChatList from "../component/chat/ChatList";
import ChatForm from "../component/chat/ChatForm";

const ChatPage = () => {
  return (
    <Flex direction="column" justify="flex-start" hg="100vh">
      {/* <UserCheck/> */}
      <Header />
      <ChatGrid>
        <ChatRoomList />
        <ChatSectionContainer>
          <ChatList />
          <ChatForm />
        </ChatSectionContainer>
      </ChatGrid>
      <MainAudioPlayer />
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
  overflow: hidden;
  flex: 1;
`;
const ChatSectionContainer = styled(StFlex)`
  flex-direction: column;
  padding: 2rem 5rem;
  border-radius: 20px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.color.rgbaBorder1};
  align-items: flex-start;
  justify-content: flex-start;
`;

