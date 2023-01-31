import React, { useEffect } from "react";
import styled from "styled-components";
import {
  instanceAxios,
  serverURL,
  socketURL,
} from "../../dataManager/apiConfig";
import { StFlex } from "../elem/Flex";
import ChatBubbleList from "./ChatBubbleList";
import ChatForm from "./ChatForm";
import { getCookies } from "../../dataManager/cookie";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const ChatRoomTest = () => {
  const AccessToken = getCookies("accesstoken");

  useEffect(() => {
    console.log("test~~~");

    const socket = new SockJS(`${socketURL}/ws/chat`);
    const client = Stomp.over(function () {
      // return socket
      return new WebSocket(`${socketURL}/ws/chat`);
    });
    client.connect(
      {
        AccessToken: AccessToken,
      },
      (frame: any) => {
        console.log("connected? ", frame);
        client.subscribe("/topic/chat/room/1", (tick) => {
          console.log(tick.body);
        });
      },
      (error: unknown) => {
        console.log("연결실패");
        console.log(error);
      }
    );
    client.onWebSocketError = (e) => {
      console.log("error", e);
    };
    client.onStompError = (e) => {
      console.log("stomperror", e);
    };

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);
  return (
    <ChatContainer>
      <ChatBubbleList />
      <ChatForm />
    </ChatContainer>
  );
};

export default ChatRoomTest;

const ChatContainer = styled(StFlex)`
  flex-direction: column;
  padding: 2rem 5rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.rgbaBorder1};
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;
