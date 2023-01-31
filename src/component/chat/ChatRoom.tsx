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

import { Client } from "@stomp/stompjs";
const getChatRooms = async () => {
  return await instanceAxios.get("/chat/rooms");
};
const ChatRoom = () => {
  const AccessToken = getCookies("accesstoken");
  


  useEffect(() => {
    const client = new Client({
      brokerURL: `wss://jaymild.shop/ws/chat`,
      connectHeaders: {
        AccessToken: AccessToken,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    
    client.onConnect = function (frame) {
      console.log("frame", frame);
    };
  
    client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };
    client.activate();
    getChatRooms().then((data) => console.log("data", data));

    return () => {
      client.deactivate();
    };
  }, []);
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
