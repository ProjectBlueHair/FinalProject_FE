import React from "react";
import styled, { keyframes } from "styled-components";
import { more } from "../../asset/pic/index";
import { useStomp } from "../../hook/useStomp";
import { ChatRoom } from "./ChatModel.types";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { isEmptyObj } from "../../util/funcs";
import Flex, { StFlex } from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";
import { currentRoomIdSelector, __selectChatRoom } from "../../redux/slice/chatSlice";

const ChatRoomItem: React.FC<ChatRoom> = (props) => {
  const dispatch = useAppDispatch();
  const currentRoomId = useAppSelector(currentRoomIdSelector);
  const {subscriptions} = useStomp()
  return (
    <ItemCard
      isCurrent={currentRoomId === props.roomId}
      onClick={() => dispatch(__selectChatRoom(props.roomId))}
    >
      <Img
        wd="3.5rem"
        hg="3.5rem"
        type={ImgType.shadowProfile}
        src={props.profileImg}
      />
      <Flex flex="1" justify="flex-start">
        {props.nickname}
      </Flex>
      <Img wd="3.5rem" type="icon" src={more} />
    </ItemCard>
  );
};

export default ChatRoomItem;

const ItemCard = styled(StFlex)<{ isCurrent: boolean }>`
  justify-content: flex-start;
  background-color: ${(props) =>
    props.isCurrent ? props.theme.color.main : props.theme.color.rgbaBg1};
  padding: 1rem;
  border-radius: 20px;
  gap: 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
