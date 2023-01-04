import React from "react";
import styled from "styled-components";

function Flex(props) {
  const FLEX_CONTAINER = {
    rowCenter: RowCenter,
    columnCenter: ColumnCenter,
    rowStart: RowStart,
    columnStart: ColumnStart,
    rowFull: RowFullHeight,
    columnFull: ColumnFullHeight,
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
const RowCenter = styled(StFlex)`
  flex-direction: row;
`;
const ColumnCenter = styled(StFlex)`
  flex-direction: column;
`;
const RowStart = styled(StFlex)`
  justify-content: flex-start;
  align-items: flex-start;
`;
const ColumnStart = styled(StFlex)`
  justify-content: flex-start;
  align-items: flex-start;
`;
const RowFullHeight = styled(RowCenter)`
  height: 100%;
`;
const ColumnFullHeight = styled(ColumnCenter)`
  height: 100%;
`;
