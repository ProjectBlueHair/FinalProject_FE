import React from "react";
import styled, { css } from "styled-components";

function Img(props) {
  const IMG = {
    circle: Circle,
    shadowCircle: ShadowCircle,
    shadowProfile: ShadowProfile,
    radius: Radius,
    icon: IconButton,
    iconSmall: IconSmall,
    profileCount:ProfileCount
  };

  const Img = props.type ? IMG[props.type] : StImg;
  return <Img {...props} />;
}

export default Img;
const StImg = styled.img`
  width: ${({ wd }) => wd || "none"};
  height: ${({ hg }) => hg || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  min-height: ${({ mhg }) => mhg || "none"};
  margin: ${({ mg }) => mg || "0"};
  z-index: ${({ z }) => z || "none"};
  cursor: ${({ cursor }) => cursor || "default"};
`;
const Circle = styled(StImg)`
  border-radius: 50%;
`;
const ShadowCircle = styled(Circle)`
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.26)"};
`;
const ShadowProfile = styled(ShadowCircle)`
  width: ${({ wd }) => wd || "3.5rem"};
  height: ${({ hg }) => hg || "3rem"};
`;
const Radius = styled(StImg)`
  border-radius: ${({ radius }) => radius || "15px"};
  width: ${({ wd }) => wd || "100%"};
`;
const IconButton = styled(StImg)`
  &:hover {
    background-color: ${({ bg }) => bg || "rgba(0, 0, 0, 0.04)"};
    border-radius: 50%;
    cursor: pointer;
  }
`;
const IconSmall = styled(StImg)`
  &:hover {
    filter: ${({ bg }) => bg || css`var(--ec-secondary-filter)`};
    cursor: pointer;
  }
`;
const ProfileCount = styled.div`
  width: ${({ wd }) => wd || "3rem"};
  height: ${({ hg }) => hg || "3rem"};
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.26)"};
  border-radius: 50%;
  margin: ${({ mg }) => mg || "0 0 0 -1rem"};
  z-index: -3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--ec-primary-text);
  font-size: 1rem;
  padding: 0 0.4rem 0 0;
  background-color: rgba(0, 0, 0, 0.1);
`;
