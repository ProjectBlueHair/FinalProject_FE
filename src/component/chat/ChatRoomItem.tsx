import React, { useState } from "react";
import styled from "styled-components";
import { ChatRoom } from "../../model/ChatModel";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";
import { more } from "../../asset/pic/index";
import { useStomp } from "../../hook/useStomp";
import { useAppDispatch } from "../../redux/config";
import { __selectChatRoom } from "./chatSlice";

const ChatRoomItem: React.FC<ChatRoom> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <ItemCard onClick={() => dispatch(__selectChatRoom(props.roomId))}>
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

const ItemCard = styled(StFlex)`
  justify-content: flex-start;
  background-color: ${(props) => props.theme.color.rgbaBg1};
  padding: 1rem;
  border-radius: 20px;
  gap: 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
