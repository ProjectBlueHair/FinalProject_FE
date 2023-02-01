import { useEffect } from "react";
import styled from "styled-components";
import { ChatBubbleModel } from "../../model/ChatModel";
import { useAppSelector } from "../../redux/config";
import { userSelector } from "../../redux/slice/userSlice";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";

import { useStomp } from "../../hook/useStomp";
import { roomIdSelector } from "./chatSlice";
const ChatBubbleList = () => {
  const user = useAppSelector(userSelector);
  const roomId = useAppSelector(roomIdSelector);
  const { isConnected, subscribe, unsubscribe, subscriptions } = useStomp();
  useEffect(() => {
    isConnected &&
      subscribe({ path: "/topic/chat/room", roomId: roomId }, (body) => {
        console.log("subscribe callback ... body", body);
      });
    return () => {
      if (subscriptions["/topic/chat/room"]) {
        unsubscribe("/topic/chat/room");
      }
    };
  }, [isConnected, roomId]);

  const chatList: ChatBubbleModel[] = [
    {
      id: 1,
      from: "mcho",
      profileImg: "testRandomPost/1.jpg",
      message: [
        "hi mcho 1",
        "hi mcho 2",
        "hi mcho 3 hi mcho 3 hi mcho 3 hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3",
      ],
      time: "11:33pm",
    },
    {
      id: 2,
      from: "mcho1",
      profileImg: "testRandomPost/1.jpg",
      message: [
        "hi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mcho",
        "hi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi  mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mchohi mcho",
      ],
      time: "11:33pm",
    },
  ];
  return (
    <Flex flex="1" direction="column" gap="2rem" justify="flex-start">
      {chatList.map((bubble, index) =>
        user.nickname === bubble.from ? (
          //my chat
          <Flex key={bubble.id} justify="flex-end" gap="1rem" align="flex-end">
            <Div>{bubble.time}</Div>
            <Flex wd="none" direction="column" gap="1rem" align="flex-end">
              <ChatBubble key={index} isMine={true}>
                {bubble.message}
              </ChatBubble>
            </Flex>
          </Flex>
        ) : (
          <Flex
            key={bubble.id}
            justify="flex-start"
            gap="1rem"
            align="flex-start"
          >
            <Img
              wd="3rem"
              hg="3rem"
              type={ImgType.shadowProfile}
              src={bubble.profileImg}
            />
            <Flex wd="none" direction="column" gap="1rem" align="flex-start">
              <ChatBubble key={index} isMine={false}>
                {bubble.message}
              </ChatBubble>
            </Flex>
            <Flex wd="none" align="flex-end" hg="100%">
              {bubble.time}
            </Flex>
          </Flex> //others chat
        )
      )}
    </Flex>
  );
};

export default ChatBubbleList;
const ChatBubble = styled.div<{ isMine: boolean }>`
  background-color: ${(props) =>
    props.isMine
      ? props.theme.color.chatBubbleMine
      : props.theme.color.chatBubbleOther};
  padding: 1rem 2rem;
  word-break: break-all;
  border-radius: 20px;
  max-width: 55rem;
`;
