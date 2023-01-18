import { type } from "os";
import React from "react";
import styled, { CSSProperties, StyledComponent } from "styled-components";

interface ButtonProps {
  btnType?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}
interface ButtonType {
  [key: string]: StyledComponent<"button", any, ButtonProps, never>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const ButtonType: ButtonType = {
    pointer: CursorPointer,
    basic: BasicButton,
  };

  const Button = !props.btnType ? CursorPointer : ButtonType[props.btnType];

  return <Button {...props}>{props.children}</Button>;
};

export default Button;
const CursorPointer = styled.button<ButtonProps>`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.4rem;
  color: var(--ec-primary-text);
  cursor: pointer;
`;

const BasicButton = styled(CursorPointer)`
  color: #ffffff;
  background-color: var(--ec-main-color);
  padding: 1.2rem 3.5rem;
  border-radius: 20rem;
  margin-top: 2rem;

  &:hover([disabled]) {
  }
  &:hover:not([disabled]) {
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  &:active:enabled {
    color: #ffffff;
    background-color: var(--ec-main-color);
  }
  &:hover:enabled {
    color: #ffffff;
    background-color: var(--ec-main-color);
    opacity: 0.9;
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.1);
    cursor: default;
  }
  &:focus {
    outline: none;
  }
`;
