import React, { useEffect } from "react";
import styled from "styled-components";
import { socketURL } from "../../dataManager/apiConfig";
import { StFlex } from "../elem/Flex";
import ChatBubbleList from "./ChatBubbleList";
import ChatForm from "./ChatForm";

import { useStomp } from "../../hook/useStomp";
const ChatRoom = () => {
  const {
    isConnected,
    subscribe,
    unsubscribe,
    subscriptions,
  } = useStomp();
  useEffect(() => {
    isConnected && subscribe("/topic/chat/room/1", (body) => {
      console.log("subscribe callback ... body", body);
    });
    return () => {
      if (subscriptions["/topic/chat/room/1"]) {
        unsubscribe("/topic/chat/room/1");
      }
    };
  }, [isConnected]);

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
