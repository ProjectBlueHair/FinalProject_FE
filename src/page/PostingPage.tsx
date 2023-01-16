import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Flex from "../component/elem/Flex";
import Header from "../component/header/Header";
import PostingAudioBars from "../component/posting/PostingAudioBars";
import PostingFormAudio from "../component/posting/PostingFormAudio";
import PostingFormCollabo from "../component/posting/PostingFormCollabo";
import PostingFormNew from "../component/posting/PostingFormNew";
import PostingTitle from "../component/posting/PostingTitle";
import PostingTotalPlay from "../component/posting/PostingTotalPlay";
import { useAppSelector } from "../redux/config";
import { PATH } from "../Router";
import { MainContainer } from "./MainPage";

export const AUDIO_BAR_GAP = "1.5rem";

const PostingPage = () => {
  const location = useLocation();
  const CURRENT_PATH = location.pathname.split("/")[1];
  const POSTPAGE = PATH.post.split("/")[1] === CURRENT_PATH;
  const EDITPAGE = PATH.edit.split("/")[1] === CURRENT_PATH;
  const COLLABOPAGE = PATH.collabo.split("/")[1] === CURRENT_PATH;

  return (
    <Flex direction="column" justify="flex-start" hg="100vh">
      <Header />
      <AudioBarsBackground gap={AUDIO_BAR_GAP}>
        <PostingTitle />
        <PostingTotalPlay />
        <PostingAudioBars />
        <PostingFormAudio />
      </AudioBarsBackground>
      {POSTPAGE && <PostingFormNew />}
      {COLLABOPAGE && <PostingFormCollabo />}
    </Flex>
  );
};

export default PostingPage;
const AudioBarsBackground = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem 4rem;
  gap: ${({gap})=> gap};
  background-image: linear-gradient(
      rgba(240, 240, 240, 0.5),
      rgba(255, 255, 255, 1)
    ),
    url("audio-bars-bg.png");
`
