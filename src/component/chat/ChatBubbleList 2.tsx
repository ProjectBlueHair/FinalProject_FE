import React from "react";
import styled from "styled-components";
import { ChatBubbleModel } from "../../model/ChatModel";
import { useAppSelector } from "../../redux/config";
import { userSelector } from "../../redux/slice/userSlice";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";
const ChatBubbleList = () => {
  const user = useAppSelector(userSelector);
  const chatList: ChatBubbleModel[] = [
    {
      from: "mcho",
      profileImg: "testRandomPost/1.jpg",
      message: ["hi mcho 1", "hi mcho 2", "hi mcho 3 hi mcho 3 hi mcho 3 hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3hi mcho 3"],
      time: "11:33pm",
    },
    {
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
      {chatList.map((bubble) =>
        user.nickname === bubble.from ? (
          //my chat
          <Flex justify="flex-end" gap="1rem" align="flex-end">
            <Div>{bubble.time}</Div>
            <Flex wd="none" direction="column" gap="1rem" align="flex-end">
              {bubble.message.map((msg) => (
                <ChatBubble isMine={true}>{msg}</ChatBubble>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Flex justify="flex-start" gap="1rem" align="flex-start">
            <Img
              wd="3rem"
              hg="3rem"
              type={ImgType.shadowProfile}
              src={bubble.profileImg}
            />
            <Flex wd="none" direction="column" gap="1rem" align="flex-end">
              {bubble.message.map((msg) => (
                <ChatBubble isMine={false}>{msg}</ChatBubble>
              ))}
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
