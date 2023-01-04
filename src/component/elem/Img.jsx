import React from "react";
import styled from "styled-components";

function Img(props) {
  const IMG = {
    circle: Circle,
    shadowCircle: ShadowCircle,
    shadowProfile : ShadowProfile
  };

  const Img = props.type ? IMG[props.type] : StImg;
  return <Img {...props} children={props.children} />;
}

export default Img;
const StImg = styled.img`
  width: ${({ wd }) => wd || "none"};
  height: ${({ hg }) => hg || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
`;
const Circle = styled(StImg)`
  border-radius: 50%;
`;
const ShadowCircle = styled(Circle)`
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.26)"};
`;
const ShadowProfile = styled(ShadowCircle)`
  width: ${({ wd }) => wd || "3.5rem"};
  height: ${({ hg }) => hg || "3rem"};`;