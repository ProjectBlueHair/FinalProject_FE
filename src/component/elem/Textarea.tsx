import React, { ChangeEvent, CSSProperties } from "react";
import styled, { StyledComponent } from "styled-components";

interface TextAreaProps {
  wd?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: CallableFunction;
  style? : CSSProperties
}
interface TextAreaContainer {
  [key: string]: StyledComponent<"textarea", any, TextAreaProps, never>;
}
const TEXTAREA_MAX_LENGTH = 2000;
const TextArea: React.FC<TextAreaProps> = (props) => {
  const TEXTAREA: TextAreaContainer = {
    
  };
  if(props.type && !TEXTAREA[props.type]){
    console.log(`wrong type : ${props.type}`);
  }
  const TextArea = props.type ? TEXTAREA[props.type] : StTextarea;

  const onChangeHandler = (e: ChangeEvent) => {
    props.onChange && props.onChange(e);
  };
  return <TextArea {...props} onChange={onChangeHandler} />;
};

export default TextArea;

const StTextarea = styled.textarea.attrs({ maxLength: TEXTAREA_MAX_LENGTH })<TextAreaProps>`
  border: none;
  width: 100%;
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

