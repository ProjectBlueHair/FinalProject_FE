import React from "react";
import styled from "styled-components";

function Flex(props) {
  const FLEX_CONTAINER = {
    rowCenter: FlexRow,
    columnCenter: FlexColumn,
    rowStart: FlexRowStart,
    columnStart: FlexColumnStart,
    rowFull: FlexRowFullHeight,
    columnFull: FlexColumnFullHeight,
  };

  const Flex = props.type ? FLEX_CONTAINER[props.type] : StFlex;
  return <Flex {...props} children = {props.children}/>
}

export default Flex;
const StFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ wd }) => wd || "none"};
  height: ${({ hg }) => hg || "none"};
`;
const FlexRow = styled(StFlex)`
  flex-direction: row;
`;
const FlexColumn = styled(StFlex)`
  flex-direction: column;
`;
const FlexRowStart = styled(FlexRow)`
  justify-content: flex-start;
  align-items: flex-start;
`;
const FlexColumnStart = styled(FlexColumn)`
  justify-content: flex-start;
  align-items: flex-start;
`;
const FlexRowFullHeight = styled(FlexRow)`
  height: 100%;
`;
const FlexColumnFullHeight = styled(FlexColumn)`
  height: 100%;
`;
