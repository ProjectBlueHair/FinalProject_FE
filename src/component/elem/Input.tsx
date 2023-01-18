import React, { ChangeEvent, CSSProperties } from "react";
import styled, { StyledComponent } from "styled-components";

interface InputProps {
  wd?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: CallableFunction;
  style?: CSSProperties
  
}
interface InputContainer {
  [key: string]: StyledComponent<"input", any, InputProps, never>;
}
const Input: React.FC<InputProps> = (props) => {
  const INPUT: InputContainer = {
    postFormInput : PostFormInput, 
  };
  if(props.type && !INPUT[props.type]){
    console.log(`wrong type : ${props.type}`);
  }
  const Input = props.type ? INPUT[props.type] : StInput;

  const onChangeHandler = (e: ChangeEvent) => {
    props.onChange && props.onChange(e);
  };
  return <Input {...props} onChange={onChangeHandler} />;
};

export default Input;
export const StInput = styled.input<InputProps>`
  border: none;
  width: ${({ wd }) => wd || "100%"};
  background-color: transparent;
  font-size: 1.5rem;
  color: var(--ec-primary-text);
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-weight: 400;
    color: var(--ec-secondary-text);
  }
`;
const PostFormInput = styled(StInput)`
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 15px;
  width: 50rem;
  font-size: 1.4rem;
  padding: 6px 12px;
  margin-top: 1rem;
`
