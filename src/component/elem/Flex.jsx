import React from "react";
import styled from "styled-components";

function Flex(props) {
  const FLEX_CONTAINER = {
    card: FlexCard,
  };

  const Flex = props.type ? FLEX_CONTAINER[props.type] : StFlex;
  return <Flex {...props} children={props.children} />;
}

export default Flex;
const StFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ wd }) => wd || "100%"};
  height: ${({ hg }) => hg || "none"};
  min-height: ${({ mhg }) => mhg || "none"};
  padding: ${({ pd }) => pd || "none"};
  flex: ${({ flex }) => flex || "none"};
  overflow: ${({ overflow }) => overflow || "none"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "none"};
  flex-grow: ${({ flexGrow }) => flexGrow || "none"};
  background-color: ${({ bg }) => bg || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  border-radius: ${({ radius }) => radius || "none"};
  border: ${({ border }) => border || "none"};
  border-bottom: ${({ borderBottom }) => borderBottom || "none"};
  border-top: ${({ borderTop }) => borderTop || "none"};
  border-right: ${({ borderRight }) => borderRight || "none"};
  border-left: ${({ borderLeft }) => borderLeft || "none"};
`;

const FlexCard = styled(StFlex)`
  background-color: ${({ bg }) => bg || "rgba(0,0,0,0.12)"};
  border-radius: ${({ radius }) => radius || "20px"};
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.1)"};
`;
