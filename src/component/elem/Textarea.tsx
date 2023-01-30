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
  bg?:string
  border?: string
  radius?: string
  mhg?: string;
  pd?: string;
  mg?: string;
  fs? : string
  fc? : string
  fw? : string
  hg? : string
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
  height: ${({ hg }) => hg || "none"};
  resize: none;
  font-size: ${({ fs }) => fs || "1.4rem"};
  min-height: ${({ mhg }) => mhg || "none"};
  padding: ${({ pd }) => pd || "none"};
  margin: ${({ mg }) => mg || "none"};
  background-color : ${(props) => props.bg || 'none'};
  border : ${(props) => props.border || ''};
  border-radius : ${(props) => props.radius || ''};
  color: ${(props) => props.theme.color.primaryText};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.color.secondaryText};
  }
`;
