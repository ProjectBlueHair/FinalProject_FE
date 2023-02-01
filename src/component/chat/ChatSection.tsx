import React, { useEffect } from "react";
import styled from "styled-components";
import { StFlex } from "../elem/Flex";
import ChatBubbleList from "./ChatBubbleList";
import ChatForm from "./ChatForm";

const ChatSection = () => {

  return (
    <ChatSectionContainer>
      <ChatBubbleList />
      <ChatForm />
    </ChatSectionContainer>
  );
};

export default ChatSection;

const ChatSectionContainer = styled(StFlex)`
  flex-direction: column;
  padding: 2rem 5rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.rgbaBorder1};
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;
