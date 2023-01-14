import { Part } from "aws-sdk/clients/s3";
import React, { useState } from "react";
import styled from "styled-components";
import { muteButton, soloButton } from "../../asset/pic";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import { StInput } from "../elem/Input";
import Span from "../elem/Span";
export interface Props {
  fs: string;
  wd: string;
  hg: string;
  radius: string;
}
export const part: Props = {
  fs: "1.2rem",
  wd: "5rem",
  hg: "1.8rem",
  radius: "10px",
};
const PostingAudioControlBox: React.FC<{ isNew: boolean }> = (props) => {
  const BOX_NICK_FS = "1.4rem";
  const BOX_ICON_WD = "2.2rem";

  const [value, setValue] = useState("");

  return (
    <Flex
      radius="5rem"
      pd="1rem 2rem"
      bg="var(--ec-main-color)"
      wd="none"
      hg="100%"
      direction="column"
      gap="0.5rem"
    >
      <Flex gap="1rem">
        {props.isNew ? (
          <PartInput
            {...part}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <PartDiv {...part}>Bass</PartDiv>
        )}
        <Span fw="300" fc="white" fs={BOX_NICK_FS}>
          nickname
        </Span>
      </Flex>
      <Flex gap="1rem">
        <Img wd={BOX_ICON_WD} src={muteButton} />
        <Img wd={BOX_ICON_WD} src={soloButton} />
      </Flex>
    </Flex>
  );
};

export default PostingAudioControlBox;
const PartInput = styled(StInput).attrs({ maxLength: 6 })<Props>`
  border: 1px dashed white;
  text-align: center;
  color: white;
  border-radius: ${({ radius }) => radius};
  height: ${({ hg }) => hg};
  max-width: ${({ wd }) => wd};
  font-size: ${({ fs }) => fs};
  &::placeholder {
    color: var(--ec-secondary-text);
    font-weight: 300;
    font-size: ${({ fs }) => fs};
    color: white;
  }
`;
const PartDiv = styled(Flex)<Props>`
  background-color: white;
  border-radius: ${({ radius }) => radius};
  height: ${({ hg }) => hg};
  width: ${({ wd }) => wd};
  font-size: ${({ fs }) => fs};
  color: var(--ec-main-color);
  box-sizing: border-box;
  line-height: none;
`;
