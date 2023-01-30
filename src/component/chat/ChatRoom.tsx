import React, { useEffect } from "react";
import styled from "styled-components";
import { instanceAxios } from "../../dataManager/apiConfig";
import { StFlex } from "../elem/Flex";
import ChatBubbleList from "./ChatBubbleList";
import ChatForm from "./ChatForm";

const getChatRooms = async ()=>{
  return await instanceAxios.get('/chat/rooms')
}
const ChatRoom = () => {
  useEffect(()=>{
    getChatRooms().then(data=>console.log('data',data));
  },[])
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
