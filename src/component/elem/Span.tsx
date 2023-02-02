import React from "react";
import styled, {  StyledComponent } from "styled-components";
import { SpanProps } from "../../model/StyleModel";


interface SpanContainer {
  [key: string]: StyledComponent<"span", any, SpanProps, never>;
}
const Span: React.FC<SpanProps> = (props) => {
  const SPAN_CONTAINER: SpanContainer = {};

  const Span = props.type ? SPAN_CONTAINER[props.type] : StSpan;
  return <Span {...props} children={props.children}></Span>;
};

export default Span;
const StSpan = styled.span<SpanProps>`
  font-size: ${({ fs }) => fs || "inherit"};
  font-weight: ${({ fw }) => fw || "inherit"};
  color: ${({ fc }) => fc || "inherit"};
`;
