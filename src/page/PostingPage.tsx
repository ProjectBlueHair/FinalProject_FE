import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Flex, { StFlex } from "../component/elem/Flex";
import Header from "../component/header/Header";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingCollaboRequested from "../component/posting/PostingCollabReqeusted";
import PostingForm from "../component/posting/PostingForm";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingFormCollabo from "../component/posting/PostingFormCollabo";
import PostingFormImage from "../component/posting/PostingFormImage";
import PostingTitle from "../component/posting/PostingTitle";
import PostingTotalPlay from "../component/posting/PostingTotalPlay";
import { PATH } from "../Router";
import ErrorCheck from "../util/ErrorCheck";
import UserCheck from "../util/UserCheck";
export const AUDIO_BAR_GAP = "1.5rem";
export const imgTitleBoxSize = "23rem";
const PostingPage = () => {
  const location = useLocation();
  const CURRENT_PATH = location.pathname.split("/")[1];
  const POSTPAGE = PATH.post.split("/")[1] === CURRENT_PATH;
  const EDITPAGE = PATH.edit.split("/")[1] === CURRENT_PATH;
  const COLLABOPAGE = PATH.collabo.split("/")[1] === CURRENT_PATH;
  const COLLABOREQUESTED = PATH.collaboRequested.split("/")[1] === CURRENT_PATH;


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
            {COLLABOREQUESTED ? null : <PostingFormAudio />}
          </PostingAudioSection>
        </Flex>
        {POSTPAGE && <PostingForm isEdit={EDITPAGE} />}
        {COLLABOPAGE && <PostingFormCollabo />}
        {COLLABOREQUESTED && <PostingCollaboRequested />}
      </Flex>
    </Fragment>
  );
};

export default PostingPage;
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
