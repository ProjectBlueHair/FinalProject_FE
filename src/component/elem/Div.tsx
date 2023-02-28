import styled, { StyledComponent } from "styled-components";
import { DivProps } from "./StyleModel.types";


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
  margin: ${({ mg }) => mg || "none"};
  padding: ${({ pd }) => pd || "none"};
`;
