import styled from "styled-components";
import { ChatRoom } from "../../model/ChatModel";
import { StFlex } from "../elem/Flex";
import ChatRoomItem from "./ChatRoomItem";

const ChatItemList: ChatRoom[] = [
  // { roomId: 0, nickname: "test1", profileImg: "testRandomPost/1.jpg" },
  // { roomId: 1, nickname: "test2", profileImg: "testRandomPost/2.jpg" },
];

const ChatRoomList = () => {
  return (
    <ChatRoomListContainer>
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
`;
