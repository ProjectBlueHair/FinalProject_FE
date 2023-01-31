import React from "react";
import styled from "styled-components";
import { useStomp } from "../../hook/useStomp";
import useTextArea from "../../hook/useTextArea";
import Button from "../elem/Button";
import Flex from "../elem/Flex";
import { StTextarea } from "../elem/Textarea";

const ChatForm = () => {
  const { send } = useStomp();
  const messageInput = useTextArea("");
  const handleSubmit = () => {
    send("/topic/chat/room/1", { message: messageInput.value});
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
