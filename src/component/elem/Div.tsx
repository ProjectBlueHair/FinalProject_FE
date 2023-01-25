import styled, { StyledComponent } from "styled-components";

interface DivProps {
  fc?: string;
  fs?: string;
  fw?: string;
  mg?: string;
  pd?: string;
  children?: React.ReactNode;
  type?: string;
}
interface DivContainer {
  [key: string]: StyledComponent<"div", any, DivProps, never>;
}
const Div: React.FC<DivProps> = (props) => {
  const DIV_CONTAINER: DivContainer = {};

  const Div = props.type ? DIV_CONTAINER[props.type] : StDiv;
  return <Div {...props} children={props.children} />;
};

export default Div;
const StDiv = styled.div<DivProps>`
  word-break: break-all;
  font-size: ${({ fs }) => fs || "inherit"};
  font-weight: ${({ fw }) => fw || "inherit"};
  color: ${({ fc }) => fc || "inherit"};
  margin: ${({ mg }) => mg || "inherit"};
  padding: ${({ pd }) => pd || "inherit"};
`;
