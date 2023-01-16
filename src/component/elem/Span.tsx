import React from "react";
import styled, { StyledComponent } from "styled-components";

interface SpanProps {
  fc?: string;
  fs?: string;
  fw?: string;
  children?: React.ReactNode;
  type?: string;
}
interface SpanContainer {
  [key: string]: StyledComponent<"div", any, SpanProps, never>;
}
const Span: React.FC<SpanProps> = (props) => {
  const SPAN_CONTAINER: SpanContainer = {};

  const Span = props.type ? SPAN_CONTAINER[props.type] : StSpan;
  return <Span {...props} children={props.children} />;
};

export default Span;
const StSpan = styled.span<SpanProps>`
  font-size: ${({ fs }) => fs || "inherit"};
  font-weight: ${({ fw }) => fw || "inherit"};
  color: ${({ fc }) => fc || "inherit"};
`;
