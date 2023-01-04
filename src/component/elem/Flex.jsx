import React from "react";
import styled from "styled-components";

function Flex(props) {
  const FLEX_CONTAINER = {
    rowCenter: FlexRow,
    columnCenter: FlexColumn,
    rowStart: FlexRowStart,
    columnStart: FlexColumnStart,
    card:FlexCard,
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
  padding: ${({ pd }) => pd || "none"};
  flex: ${({ flex }) => flex || "none"};
`;
const FlexRow = styled(StFlex)`
  flex-direction: row;
`;
const FlexColumn = styled(StFlex)`
  flex-direction: column;
`;
const FlexRowStart = styled(FlexRow)`
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "flex-start"};
`;
const FlexColumnStart = styled(FlexColumn)`
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "flex-start"};
`;
const FlexCard = styled(StFlex)`
  background-color: ${({ bg }) => bg || "rgba(0,0,0,0.12)"};
  border-radius: ${({ radius }) => radius || "20px"};
`;
