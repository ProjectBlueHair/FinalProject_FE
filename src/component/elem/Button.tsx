import React from "react";
import styled, { StyledComponent } from "styled-components";
import { ButtonProps } from "../../model/StyleModel";
import theme from "../../styles/theme";

interface ButtonType {
  [key: string]: StyledComponent<"button", any, ButtonProps, never>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const ButtonType: ButtonType = {
    pointer: CursorPointer,
    basic: BasicButton,
    link:LinkButton
  };

  const Button = !props.btnType ? CursorPointer : ButtonType[props.btnType];

  return <Button {...props}>{props.children}</Button>;
};

export default Button;
const CursorPointer = styled.button<ButtonProps>`
  margin: ${({ mg }) => mg || "none"};
  padding: ${({ pd }) => pd || "none"};
  font-size: ${({ fs }) => fs || "1.4rem"};
  font-weight: ${({ fw }) => fw || "inherit"};
  color: ${(props) => props.fc || props.theme.color.primaryText};
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.4rem;
  cursor: pointer;
`;

const BasicButton = styled(CursorPointer)`
  color: #ffffff;
  background-color: ${({ theme }) => theme.color.main};
  padding: ${({ pd }) => pd || "1.2rem 3.5rem"};
  border-radius: 20rem;
  /* margin-top: 2rem; */

  &:hover([disabled]) {
  }
  &:hover:not([disabled]) {
    color: ${({ theme }) => theme.color.rgbaText1};
    background-color: ${({ theme }) => theme.color.rgbaBg1};
  }
  &:disabled {
    color: ${({ theme }) => theme.color.rgbaText1};
    background-color: ${({ theme }) => theme.color.rgbaBg1};
    cursor: default;
  }

  &:active:enabled {
    color: #ffffff;
    background-color: ${(props) => props.theme.color.main};
  }
  &:hover:enabled {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.main};
    opacity: 0.9;
  }
  &:disabled {
    color: ${({ theme }) => theme.color.rgbaText1};
    background-color: ${({ theme }) => theme.color.rgbaBg1};
    cursor: default;
  }
  &:focus {
    outline: none;
  }
`;

const LinkButton = styled(CursorPointer)`
  color: ${(props)=>props.fc || theme.color.main};
  background-color: ${({ theme }) => theme.color.rgbaBg1};
  padding: ${({ pd }) => pd || "1.2rem 3.5rem"};
  border-radius: 20rem;

  &:active:enabled {
    color: #ffffff;
    background-color: ${(props) => props.theme.color.main};
  }
  &:hover:enabled {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.main};
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
`;
