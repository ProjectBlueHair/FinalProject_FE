import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useStomp } from "../../hook/useStomp";
import useTextArea from "../../hook/useTextArea";
import Button from "../elem/Button";
import Flex from "../elem/Flex";
import { StTextarea } from "../elem/Textarea";
import { chatSelector, roomIdSelector } from "./chatSlice";
import { userSelector } from "../../redux/slice/userSlice";
import { useAppSelector } from "../../redux/config";
import {
  instanceAxios,
  serverURL,
  socketURL,
} from "../../dataManager/apiConfig";
import { keyboardKey } from "@testing-library/user-event";

const ChatForm = () => {
  const user = useAppSelector(userSelector);
  const roomId = useAppSelector(roomIdSelector);
  const { send } = useStomp();
  const messageInput = useTextArea("");

  const handleSubmit = () => {
    send(`/app/chat/message/${roomId}`, {
      nickname: user.nickname,
      profileImg: user.profileImg,
      message: messageInput.value,
      time: "",
      date: "",
    });
    messageInput.setValue('')
  };
  const keyDownHandler = (event: React.KeyboardEvent<Element>) => {

    if (event.key === "Enter") {
      event.preventDefault()
      handleSubmit();
    }
  };
  return (
    <Flex align="flex-start" gap="1rem">
      <ChatTextArea
        {...messageInput}
        onKeyDown={keyDownHandler as React.KeyboardEventHandler<Element>}
      />
      <Button
        disabled={messageInput.value.length === 0}
        onClick={handleSubmit}
        pd="1rem 2rem"
        btnType="basic"
      >
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
