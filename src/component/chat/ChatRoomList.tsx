import styled from "styled-components";
import { ChatItem } from "../../model/ChatModel";
import { StFlex } from "../elem/Flex";
import ChatRoomItem from "./ChatRoomItem";

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