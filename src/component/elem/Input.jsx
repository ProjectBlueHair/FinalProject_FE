import React from "react";
import styled from "styled-components";

const Input = (props) => {
const INPUT = {

}
  const Input = props.type ? INPUT[props.type] : StInput;

  const onChangeHandler = (e) => {
    props.onChange(e);
  };
      return <Input {...props} />;
};


export default Input;
export const StInput = styled.input`
  border: none;
  width: 100%;
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
