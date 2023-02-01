import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { StFlex } from "../elem/Flex";
import ChatRoomItem from "./ChatRoomItem";
import { chatRoomsSelector, __getChatRooms } from "./chatSlice";

const ChatRoomList = () => {
  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector(chatRoomsSelector);
  useEffect(() => {
    dispatch(__getChatRooms());
  }, []);

  return (
    <ChatRoomListContainer>
      {chatRooms.map((item, index) => (
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
