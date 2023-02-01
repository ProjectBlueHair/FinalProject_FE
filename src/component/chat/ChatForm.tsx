import React from "react";
import styled from "styled-components";
import { useStomp } from "../../hook/useStomp";
import useTextArea from "../../hook/useTextArea";
import Button from "../elem/Button";
import Flex from "../elem/Flex";
import { StTextarea } from "../elem/Textarea";
import { chatSelector, roomIdSelector } from "./chatSlice";
import { userSelector } from "../../redux/slice/userSlice";
import { useAppSelector } from "../../redux/config";
import { serverURL } from "../../dataManager/apiConfig";

const ChatForm = () => {
  const user = useAppSelector(userSelector);
  const roomId = useAppSelector(roomIdSelector);
  const { send } = useStomp();
  const messageInput = useTextArea("");
  const handleSubmit = () => {
    send(`/topic/chat/room/${roomId}`, {
    // send(`/app/api/chat/message`, {
      nickname: user.nickname,
      profileImg: user.profileImg,
      message: messageInput.value,
      time: "",
      date: "",
    });
  };
  return (
    <Flex align="flex-start" gap="1rem">
      <ChatTextArea {...messageInput} />
      <Button onClick={handleSubmit} pd="1rem 2rem" btnType="basic">
        전송하기
      </Button>
    </Flex>
  );
};

export default ChatForm;
const ChatTextArea = styled(StTextarea)`
  border: 1px solid ${(props) => props.theme.color.rgbaBorder1};
  border-radius: 20px;
  min-height: 10rem;
  width: none;
  flex: 1;
  padding: 1rem 1.5rem;
`;
