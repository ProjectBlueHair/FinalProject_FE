import React, { Fragment } from "react";
import styled from "styled-components";
import Flex, { StFlex } from "../component/elem/Flex";
import Header from "../component/header/Header";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingFormImage from "../component/posting/PostingFormImage";
import PostingFormImageTItle from "../component/posting/PostingFormImageTItle";
import PostingTitle from "../component/posting/PostingTitle";
import PostingTotalPlay from "../component/posting/PostingTotalPlay";

const PostingPageNext = () => {
  return (
    <Fragment>
      <Header />
      <Flex justify="flex-start" direction="column" pd="0 2rem">
        <Flex gap="1rem" hg="40rem" align="flex-start">
          <PostingImageAndTitle wd="23rem" direction="column" hg="100%">
            <PostingFormImageTItle/>
          </PostingImageAndTitle>
          <PostingAudioSection direction="column" flex="1" hg="100%">
            <PostingTotalPlay />
            <PostingAudioBars />
            <PostingFormAudio />
          </PostingAudioSection>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default PostingPageNext;
const PostingImageAndTitle = styled(StFlex)`
  direction: column;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.rgbaBg1};
  .postingImg {
    height: 18rem;
  }
  .postingTitle {
    background-color: ${(props) => props.theme.color.rgbaBg2};
    border-radius: 20px;
    flex: 1;
  }
`;
const PostingAudioSection = styled(StFlex)`
  border-radius: 20px;
  direction: column;
  justify-content: flex-start;
  flex: 1;
  background-color: ${(props) => props.theme.color.rgbaBg2};
  padding: 2rem;
`;
