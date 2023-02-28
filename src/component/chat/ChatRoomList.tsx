import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import Flex, { StFlex } from "../elem/Flex";
import ChatRoomItem from "./ChatRoomItem";
import { chatRoomsSelector, __getChatRooms } from "../../redux/slice/chatSlice";

const ChatRoomList = () => {
  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector(chatRoomsSelector);
  useEffect(() => {
    dispatch(__getChatRooms());
  }, [dispatch]);

  return (
    <ChatRoomListContainer>
      {chatRooms.length === 0 ? (
        <Flex hg="100%">채팅방이 존재하지 않습니다</Flex>
      ) : (
        chatRooms.map((item, index) => <ChatRoomItem key={index} {...item} />)
      )}
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
