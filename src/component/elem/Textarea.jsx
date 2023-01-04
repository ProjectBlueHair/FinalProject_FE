import React from "react";
import styled from "styled-components";

export const TEXTAREA_MAX_LENGTH = 2200;
const Textarea = (props) => {
  const onChangeHandler = (e) => {
    props.onChange(e);
  };
  switch (props.type) {
    case "comment":
      return (
        <CommentArea {...props} />
      );
    default:
      return (
        <StTextarea {...props} />
      );
  }
};

export default Textarea;
const StTextarea = styled.textarea.attrs({ maxLength: TEXTAREA_MAX_LENGTH })`
  border: none;
  width: 100%;
  min-height: 15rem;
  resize: none;
  font-size: 1.5rem;
  color: var(--ec-primary-text);
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: var(--ec-secondary-text);
  }
`;

const CommentArea = styled(StTextarea)`
  min-height: 1rem;
  flex: 1;
`;
