import React, { Fragment } from "react";
import styled from "styled-components";
import Flex, { StFlex } from "../component/elem/Flex";
import Header from "../component/header/Header";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingFormImage from "../component/posting/PostingFormImage";
import PostingTitle from "../component/posting/PostingTitle";
import PostingTotalPlay from "../component/posting/PostingTotalPlay";
import PostingFormCollabo from "../component/posting/PostingFormCollabo";
import PostingForm from "../component/posting/PostingForm";
import PostingCollaboRequested from "../component/posting/PostingCollabReqeusted";

import { PATH } from "../Router";
import UserCheck from "../util/UserCheck";
import ErrorCheck from "../util/ErrorCheck";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/config";
import { formSelector } from "../redux/slice/postingSlice";

export const imgTitleBoxSize = "23rem";
const PostingPageNext = () => {
  const location = useLocation();
  const CURRENT_PATH = location.pathname.split("/")[1];
  const POSTPAGE = PATH.post.split("/")[1] === CURRENT_PATH;
  const EDITPAGE = PATH.edit.split("/")[1] === CURRENT_PATH;
  const COLLABOPAGE = PATH.collabo.split("/")[1] === CURRENT_PATH;
  const COLLABOREQUESTED = PATH.collaboRequested.split("/")[1] === CURRENT_PATH;
  const postImg = useAppSelector(formSelector.postImg);

  return (
    <Fragment>
      <Header /> 
      <UserCheck />
      <ErrorCheck />
      <Flex justify="flex-start" direction="column" pd="0 2rem" gap="1.5rem">
        <Flex data-name="top" gap="1rem" hg="40rem" align="flex-start">
          <PostingImageAndTitle wd="23rem" hg="100%" direction="column">
            <Flex className="postingImg">
              <PostingFormImage />
            </Flex>
            <Flex className="postingTitle" align="flex-start" pd="1rem">
              <PostingTitle />
            </Flex>
          </PostingImageAndTitle>
          <PostingAudioSection>
            <PostingTotalPlay />
            <PostingAudioBars />
            <PostingFormAudio />
          </PostingAudioSection>
        </Flex>
        {POSTPAGE && <PostingForm isEdit={EDITPAGE} />}
        {COLLABOPAGE && <PostingFormCollabo />}
        {COLLABOREQUESTED && <PostingCollaboRequested />}
      </Flex>
    </Fragment>
  );
};

export default PostingPageNext;
// export const PostingTopBackground = styled.div<{ postImg: string }>`
//   display: flex;
//   gap: 1rem;
//   height: 40rem;
//   flex-direction: row;
//   align-items: flex-start;
//   justify-content: center;
//   width: 100%;
//   background-image: linear-gradient(
//       rgba(240, 240, 240, 0.5),
//       rgba(255, 255, 255, 1)
//     ),
//     url(${(props) => props.postImg});
// `;
const PostingImageAndTitle = styled(StFlex)`
  direction: column;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.rgbaBg1};
  .postingImg {
    height: 21rem;
  }
  .postingTitle {
    margin-top: -3rem;
    background-color: ${(props) => props.theme.color.rgbaBg2noAlpha};
    border-radius: 20px;
    flex: 1;
    z-index: 1;
  }
`;
const PostingAudioSection = styled(StFlex)`
  border-radius: 20px;
  flex-direction: column;
  height: 100%;
  gap: 1.3rem;
  justify-content: flex-start;
  overflow-y: auto;
  flex: 1;
  background-color: ${(props) => props.theme.color.rgbaBg2};
  padding: 1.2rem 2rem 2rem;
`;
