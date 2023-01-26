import React from "react";
import styled from "styled-components";
import useTextArea from "../../hook/useTextArea";
import Button from "../elem/Button";
import Flex from "../elem/Flex";
import { StTextarea } from "../elem/Textarea";

const ChatForm = () => {
  const messageInput = useTextArea("");
  const handleSubmit = ()=>{
    
  }
  return (
    <Flex align="flex-start" gap="1rem">
      <ChatTextArea {...messageInput} />
      <Button  pd="1rem 2rem" btnType="basic">전송하기</Button>
    </Flex>
  );
};

export default ChatForm;
const ChatTextArea = styled(StTextarea)`
border: 1px solid ${props => props.theme.color.rgbaBorder1};
border-radius: 20px;
min-height: 10rem;
width: none;
flex: 1;
padding: 1rem 1.5rem;

`;
