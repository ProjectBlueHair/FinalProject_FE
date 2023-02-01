import React, { useState } from "react";
import styled from "styled-components";
import { ChatItem } from "../../model/ChatModel";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";
import { more } from "../../asset/pic/index";
import { useStomp } from "../../hook/useStomp";
import { useAppDispatch } from "../../redux/config";
import { __selectChatRoom } from "./chatSlice";

const ChatRoomItem: React.FC<ChatItem> = (props) => {
  const { isConnected, subscribe, unsubscribe, subscriptions } = useStomp();
  const [roomId, setRoomId] = useState();
  const dispatch = useAppDispatch();
  const handleChatEnter = () => {
    // subscriptions && unsubscribe(subscriptions(path))
    // isConnected &&
    //   subscribe({ path: "/topic/chat/room", roomId: 1 }, (body) => {
    //     console.log("subscribe callback ... body", body);
    //   });
    // setRoomId(props.roomId)
    dispatch(__selectChatRoom(props.roomId));
  };

  return (
    <ItemCard onClick={handleChatEnter}>
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
