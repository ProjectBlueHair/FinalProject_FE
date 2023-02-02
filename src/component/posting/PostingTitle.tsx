import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { formSelector,  __form } from "../../redux/slice/postingSlice";
import theme from "../../styles/theme";
import TextArea from "../elem/Textarea";

const PostingTitle: React.FC = () => {
  const title = useAppSelector(formSelector.title);
  console.log('title',title);
  
  const dispatch = useAppDispatch()
  const defaultTitle = "제목";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    dispatch(__form({title:e.target.value}))
  }
  return (
    <TextArea
      radius="20px"
      pd="1.5rem"
      hg="100%"
      fs="1.8rem"
      onChange={handleChange}
      placeholder={defaultTitle}
      border={`1px solid ${theme.color.rgbaBorder1}`}
      value={title}
      bg={'transparent'}
    />
  );
};

export default PostingTitle;
