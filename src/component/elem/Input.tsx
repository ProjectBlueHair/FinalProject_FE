import React, { ChangeEvent, CSSProperties, HTMLAttributes } from "react";
import styled, { StyledComponent } from "styled-components";

interface Props extends HTMLAttributes<HTMLInputElement> {
  type?: string;
}
interface InputContainer {
  [key: string]: StyledComponent<
    "input",
    any,
    Props,
    never
  >;
}
const Input: React.FC<Props> = (props) => {
  const INPUT: InputContainer = {
  };
  if (props.type && !INPUT[props.type]) {
  }
  const Input = props.type ? INPUT[props.type] : StInput;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e);
  };
  return <Input {...props} onChange={onChangeHandler} />;
};

export default Input;
export const StInput = styled.input<Props>`
  border: none;
  background-color: transparent;

  width: ${({ width }) => width || "100%"};
  font-size: 1.5rem;
  color: ${props=>props.theme.color.primaryText};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-weight: 400;
    color: var(--ec-secondary-text);
  }
`;

