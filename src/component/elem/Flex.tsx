import React, {
  CSSProperties,
  MouseEventHandler,
  MutableRefObject
} from "react";
import styled, { StyledComponent } from "styled-components";
import theme from "../../styles/theme";
interface DivProps {
  display?: string;
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  wd?: string;
  hg?: string;
  mhg?: string;
  pd?: string;
  mg?: string;
  fc? : string;
  fw? : string;
  fs? : string;
  flex?: string;
  overFlow?: string;
  flexWrap?: string;
  flexGrow?: string;
  bg?: string | number;
  shadow?: string;
  radius?: string;
  border?: string;
  borderBottom?: string;
  borderTop?: string;
  borderRight?: string;
  borderLeft?: string;
  type?: string;
  id?: string;
  children?: React.ReactNode;
  ref?: MutableRefObject<any>;
  cursor?: string;
  isNewAudio?: boolean;
  isFormAudio?: boolean;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  className?: string;
}
interface FlexContainer {
  [key: string]: StyledComponent<"div", any, DivProps, never>;
}

const Flex: React.FC<DivProps> = (props) => {
  const FLEX_CONTAINER: FlexContainer = {
    card: FlexCard,
    audioBar: AudioBarWrapper,
    audioBarRight: AudioBarRightWrapper,
  };

  const Flex = props.type ? FLEX_CONTAINER[props.type] : StFlex;
  return <Flex {...props} children={props.children} />;
};

export default Flex;
export const StFlex = styled.div<DivProps>`
  display: flex;
  font-size: ${({ fs }) => fs || "inherit"};
  font-weight: ${({ fw }) => fw || "inherit"};

  color: ${({ fc }) => fc || "inherit"};
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ wd }) => wd || "100%"};
  height: ${({ hg }) => hg || "none"};
  min-height: ${({ mhg }) => mhg || "none"};
  padding: ${({ pd }) => pd || "none"};
  margin: ${({ mg }) => mg || "none"};
  flex: ${({ flex }) => flex || "none"};
  overflow: ${({ overFlow }) => overFlow || "none"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "none"};
  flex-grow: ${({ flexGrow }) => flexGrow || "none"};
  background-color: ${({ bg }) => bg || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  border-radius: ${({ radius }) => radius || "none"};
  border: ${({ border }) => border || ""};
  border-bottom: ${({ borderBottom }) => borderBottom || ""};
  border-top: ${({ borderTop }) => borderTop || ""};
  border-right: ${({ borderRight }) => borderRight || ""};
  cursor: ${({ cursor }) => cursor || ""};
`;

const FlexCard = styled(StFlex)`
  background-color: ${({ bg }) => bg || "rgba(0,0,0,0.12)"};
  border-radius: ${({ radius }) => radius || "20px"};
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.1)"};
`;
const AudioBarWrapper = styled(StFlex)`
  border-radius: 5rem;
  border: ${({ isNewAudio, theme }) =>
    isNewAudio ? `1px solid ${theme.color.rgbaBorder1}` : "none"};
  background-color: ${(props) =>
    props.isFormAudio ? theme.color.rgbaBg1 : "none"};
`;
const AudioBarRightWrapper = styled(StFlex)`
  flex: 1;
`;
