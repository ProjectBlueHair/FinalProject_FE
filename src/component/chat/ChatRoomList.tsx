import React from "react";
import ChatRoomItem from "./ChatRoomItem";
import { ChatItem } from "../../model/ChatModel";
import Flex, { StFlex } from "../elem/Flex";
import styled from "styled-components";

const ChatItemList: ChatItem [] = [
  { nickname: "test1", profileImg: "testRandomPost/1.jpg" },
  { nickname: "test2", profileImg: "testRandomPost/2.jpg" },
];

const ChatRoomList = () => {
  return (
    <ChatRoomListContainer >
      {ChatItemList.map((item, index) => (
        <ChatRoomItem key={index} {...item} />
      ))}
    </ChatRoomListContainer>
  );
};

export default ChatRoomList;

const ChatRoomListContainer = styled(StFlex)`
  
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  justify-content: flex-start;

`