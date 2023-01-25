import React from "react";
import styled from "styled-components";
import { StFlex } from "../elem/Flex";
import ChatBubbleList from "./ChatBubbleList";
import ChatForm from "./ChatForm";

const ChatRoom = () => {
  return (
    <ChatContainer>
      <ChatBubbleList />
      <ChatForm />
    </ChatContainer>
  );
};

export default ChatRoom;

const ChatContainer = styled(StFlex)`
  flex-direction: column;
  padding: 2rem 5rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.rgbaBorder1};
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;
