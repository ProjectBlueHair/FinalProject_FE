import React, { ChangeEvent, CSSProperties } from "react";
import styled, { StyledComponent } from "styled-components";

interface TextAreaProps {
  wd?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: CallableFunction;
  style?: CSSProperties;
  id?: string;
  readonly?: boolean;
}
interface TextAreaContainer {
  [key: string]: StyledComponent<"textarea", any, TextAreaProps, never>;
}
const TEXTAREA_MAX_LENGTH = 2000;
const TextArea: React.FC<TextAreaProps> = (props) => {
  const TEXTAREA: TextAreaContainer = {};
  if (props.type && !TEXTAREA[props.type]) {
    console.log(`wrong type : ${props.type}`);
  }
  const TextArea = props.type ? TEXTAREA[props.type] : StTextarea;

  const onChangeHandler = (e: ChangeEvent) => {
    props.onChange && props.onChange(e);
  };
  return <TextArea {...props} onChange={onChangeHandler} />;
};

export default TextArea;

export const StTextarea = styled.textarea.attrs({
  maxLength: TEXTAREA_MAX_LENGTH,
})<TextAreaProps>`
  border: none;
  width: 100%;
  resize: none;
  font-size: 1.4rem;
  color: ${props => props.theme.color.primaryText};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.color.secondaryText};
  }
`;
